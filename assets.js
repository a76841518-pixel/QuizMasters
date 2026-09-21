/* ============================================================
   ASSET SYSTEM v3 — IMAGE-FIRST
   ============================================================
   يدعم:
   - صورة واحدة (PNG / WebP / Data URL)
   - Sprite Sheet أفقي (frames متساوية)
   - نقاط ارتكاز (anchor)
   - تحميل مسبق مع progress
   - Cache ذكي مع رفض الصور المعطوبة
   ============================================================ */

const ASSET = {
  _cache: new Map(),        /* src → HTMLImageElement */
  _failed: new Set(),       /* srcs فشل تحميلها */
  _sprites: new Map(),      /* src → {frames, w, h} */
  _preloadQueue: [],

  /* ═══ جلب أو تحميل صورة ═══ */
  get(src){
    if(!src || typeof src !== 'string') return null;
    if(this._failed.has(src)) return null;
    if(this._cache.has(src)) return this._cache.get(src);

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img._ready = false;
    img._errored = false;

    img.onload = () => {
      img._ready = true;
      /* تسجيل كـ sprite إذا كان لديه metadata */
      if(img.dataset && img.dataset.frames){
        this._sprites.set(src, {
          frames: parseInt(img.dataset.frames, 10) || 1,
          w: img.naturalWidth,
          h: img.naturalHeight
        });
      }
    };
    img.onerror = () => {
      img._errored = true;
      this._failed.add(src);
      console.warn('[Asset] Failed:', src);
    };
    img.src = src;
    this._cache.set(src, img);
    return img;
  },

  /* ═══ Preload مسبق مع progress ═══ */
  preload(sources, onProgress){
    return new Promise(resolve => {
      const list = (sources || []).filter(Boolean);
      if(!list.length){ resolve({ ok: 0, fail: 0 }); return; }

      let done = 0, ok = 0, fail = 0;
      const check = (success) => {
        done++;
        if(success) ok++; else fail++;
        if(onProgress) onProgress(done, list.length);
        if(done === list.length) resolve({ ok, fail });
      };

      for(const src of list){
        const cached = this._cache.get(src);
        if(cached){
          if(cached._ready) check(true);
          else if(cached._errored) check(false);
          else {
            cached.addEventListener('load', () => check(true), { once: true });
            cached.addEventListener('error', () => check(false), { once: true });
          }
          continue;
        }
        const img = this.get(src);
        if(!img){ check(false); continue; }
        img.addEventListener('load', () => check(true), { once: true });
        img.addEventListener('error', () => check(false), { once: true });
      }
    });
  },

  /* ═══ استخراج صورة عنصر ═══ */
resolve(item){
  if(!item) return null;
  if(item.imageData) return item.imageData;

  if(item.imagePath){
    const p = String(item.imagePath).trim();
    if(!p) return null;

    /* مسار كامل أو data URL */
    if(p.startsWith('http') || p.startsWith('data:')) return p;
    if(p.startsWith('assets/')) return p;

    /* ✅ تحديد المجلد: من العنصر أو من التصنيف */
    let folder = item._folder;
    if(!folder && item.category && typeof CATEGORY_FOLDERS !== 'undefined'){
      folder = CATEGORY_FOLDERS[item.category];
    }
    if(!folder && item._sourceCat && typeof CATEGORY_FOLDERS !== 'undefined'){
      folder = CATEGORY_FOLDERS[item._sourceCat];
    }
    if(!folder) folder = 'misc';

    return 'assets/custom/' + folder + '/' + p.replace(/^\/+/, '');
  }
  return null;
},

  /* ═══ الحصول على عنصر الصورة (للاستخدام المباشر) ═══ */
  getImage(item){
    const src = this.resolve(item);
    if(!src) return null;
    const img = this.get(src);
    if(!img || !img._ready) return null;
    return img;
  },

  /* ═══ رسم عنصر كصورة كاملة (مع anchor) ═══ */
  drawItem(ctx, item, opts = {}){
    const img = this.getImage(item);
    if(!img) return false;

    const {
      x = 0, y = 0,
      size = 64,
      scale = 1,
      rotation = 0,
      alpha = 1,
      anchorX = 0.5,      /* 0..1 نسبة داخل الصورة */
      anchorY = 0.5,
      flipX = false,
      flipY = false,
      tint = null,        /* لون تلوين اختياري */
      blend = 'source-over'
    } = opts;

    const w = size * scale;
    const h = size * scale * (item.aspectRatio || (img.naturalHeight / img.naturalWidth || 1));

    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.globalCompositeOperation = blend;
    ctx.translate(x, y);
    if(rotation) ctx.rotate(rotation);
    if(flipX || flipY) ctx.scale(flipX ? -1 : 1, flipY ? -1 : 1);

    /* تلوين عبر canvas مؤقت */
    if(tint){
      const tmp = document.createElement('canvas');
      tmp.width = img.naturalWidth;
      tmp.height = img.naturalHeight;
      const tctx = tmp.getContext('2d');
      tctx.drawImage(img, 0, 0);
      tctx.globalCompositeOperation = 'multiply';
      tctx.fillStyle = tint;
      tctx.fillRect(0, 0, tmp.width, tmp.height);
      tctx.globalCompositeOperation = 'destination-in';
      tctx.drawImage(img, 0, 0);
      ctx.drawImage(tmp, -w * anchorX, -h * anchorY, w, h);
    } else {
      ctx.drawImage(img, -w * anchorX, -h * anchorY, w, h);
    }
    ctx.restore();
    return true;
  },

  /* ═══ رسم sprite (مع إطار متحرك) ═══ */
  drawSprite(ctx, item, opts = {}){
    const src = this.resolve(item);
    if(!src) return false;
    const img = this.get(src);
    if(!img || !img._ready) return false;

    const {
      x = 0, y = 0,
      size = 64,
      frame = 0,
      frames = item.frames || 1,
      frameRow = 0,         /* لو كان Sprite Sheet 2D */
      rows = item.rows || 1,
      rotation = 0,
      alpha = 1,
      anchorX = 0.5,
      anchorY = 0.5,
      flipX = false
    } = opts;

    const fw = img.naturalWidth / frames;
    const fh = img.naturalHeight / rows;
    const sx = (frame % frames) * fw;
    const sy = frameRow * fh;

    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.translate(x, y);
    if(rotation) ctx.rotate(rotation);
    if(flipX) ctx.scale(-1, 1);
    ctx.drawImage(
      img,
      sx, sy, fw, fh,
      -size * anchorX, -size * anchorY,
      size, size * (fh / fw)
    );
    ctx.restore();
    return true;
  },

  /* ═══ التحميل المسبق لمحتوى اللاعب الحالي ═══ */
  async preloadPlayerAssets(){
    const sources = [];
    const add = (item) => {
      const s = this.resolve(item);
      if(s) sources.push(s);
    };

    add(currentSkin());
    add(currentEyes());
    add(currentCrown());
    add(currentCape());
    add(currentCompanion());
    add(currentAura());
    add(currentTrail());
    add(currentSpark());
    add(currentJump());
    add(currentDeath());
    add(currentFootstep());
    if(typeof currentHeadItem === 'function') add(currentHeadItem());
    if(typeof currentBackItem === 'function') add(currentBackItem());
    if(typeof currentHeldItem === 'function') add(currentHeldItem());
    if(typeof currentNameTag === 'function') add(currentNameTag());

    return this.preload(sources);
  }
};

/* ═══ helper: رسم مع fallback برمجي ═══ */
function drawWithFallback(ctx, item, drawFallbackFn, opts = {}){
  if(item && ASSET.drawItem(ctx, item, opts)) return true;
  if(item && item.frames > 1 && ASSET.drawSprite(ctx, item, opts)) return true;
  if(drawFallbackFn) drawFallbackFn(ctx);
  return false;
}