/**
 * Polyfills serveur — à importer en tête de toute route qui utilise
 * pdf-parse / pdfjs-dist / canvas, car ces packages référencent des
 * globals browser (DOMMatrix, ImageData, Path2D) au chargement du module.
 *
 * Doit être le PREMIER import du fichier pour que les globals soient
 * définis avant que Node.js évalue les modules dépendants.
 */

// globalThis fonctionne dans Node.js, Edge runtime et le contexte d'analyse Turbopack
const g = globalThis as Record<string, unknown>

if (!g.DOMMatrix) {
  g.DOMMatrix = class DOMMatrix {
    isIdentity = true; is2D = true
    a = 1; b = 0; c = 0; d = 1; e = 0; f = 0
    m11 = 1; m12 = 0; m13 = 0; m14 = 0
    m21 = 0; m22 = 1; m23 = 0; m24 = 0
    m31 = 0; m32 = 0; m33 = 1; m34 = 0
    m41 = 0; m42 = 0; m43 = 0; m44 = 1
    static fromMatrix() { return new (g.DOMMatrix as new () => object)() }
    static fromFloat32Array() { return new (g.DOMMatrix as new () => object)() }
    static fromFloat64Array() { return new (g.DOMMatrix as new () => object)() }
    multiply() { return this }; translate() { return this }
    scale() { return this }; scale3d() { return this }
    rotate() { return this }; rotateAxisAngle() { return this }
    skewX() { return this }; skewY() { return this }
    flipX() { return this }; flipY() { return this }
    inverse() { return this }
    transformPoint(p: unknown) { return p }
    toFloat32Array() { return new Float32Array(16) }
    toFloat64Array() { return new Float64Array(16) }
    toJSON() { return {} }
    toString() { return 'matrix(1, 0, 0, 1, 0, 0)' }
  }
}

if (!g.DOMPoint) {
  g.DOMPoint = class DOMPoint {
    x = 0; y = 0; z = 0; w = 1
    constructor(x = 0, y = 0, z = 0, w = 1) {
      this.x = x; this.y = y; this.z = z; this.w = w
    }
    static fromPoint(p: { x?: number; y?: number; z?: number; w?: number } = {}) {
      return new (g.DOMPoint as new (x?: number, y?: number, z?: number, w?: number) => object)(
        p.x ?? 0, p.y ?? 0, p.z ?? 0, p.w ?? 1
      )
    }
    toJSON() { return { x: this.x, y: this.y, z: this.z, w: this.w } }
    matrixTransform() { return this }
  }
}

if (!g.Path2D) {
  g.Path2D = class Path2D {
    addPath() {}; arc() {}; arcTo() {}; bezierCurveTo() {}
    closePath() {}; ellipse() {}; lineTo() {}; moveTo() {}
    quadraticCurveTo() {}; rect() {}
  }
}

if (!g.ImageData) {
  g.ImageData = class ImageData {
    data: Uint8ClampedArray
    width: number
    height: number
    colorSpace: string = 'srgb'
    constructor(widthOrData: number | Uint8ClampedArray, width: number, height?: number) {
      if (typeof widthOrData === 'number') {
        this.width = widthOrData
        this.height = width
        this.data = new Uint8ClampedArray(widthOrData * width * 4)
      } else {
        this.data = widthOrData
        this.width = width
        this.height = height ?? widthOrData.length / (width * 4)
      }
    }
  }
}

export {}
