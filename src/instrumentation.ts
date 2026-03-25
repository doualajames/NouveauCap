/**
 * Next.js Instrumentation — server-side polyfills
 * Ce fichier s'exécute au démarrage du serveur (SSR / serverless).
 * Il est nécessaire car certains packages (framer-motion, recharts, @mdxeditor/editor)
 * référencent des APIs browser (DOMMatrix, etc.) même dans les composants 'use client'
 * qui sont pré-rendus côté serveur.
 */
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // Polyfill DOMMatrix
    if (typeof global.DOMMatrix === 'undefined') {
      // @ts-ignore
      global.DOMMatrix = class DOMMatrix {
        isIdentity = true; is2D = true
        a = 1; b = 0; c = 0; d = 1; e = 0; f = 0
        m11 = 1; m12 = 0; m13 = 0; m14 = 0
        m21 = 0; m22 = 1; m23 = 0; m24 = 0
        m31 = 0; m32 = 0; m33 = 1; m34 = 0
        m41 = 0; m42 = 0; m43 = 0; m44 = 1
        static fromMatrix() { return new DOMMatrix() }
        static fromFloat32Array() { return new DOMMatrix() }
        static fromFloat64Array() { return new DOMMatrix() }
        multiply() { return this }
        translate() { return this }
        scale() { return this }
        scale3d() { return this }
        rotate() { return this }
        rotateAxisAngle() { return this }
        skewX() { return this }
        skewY() { return this }
        flipX() { return this }
        flipY() { return this }
        inverse() { return this }
        transformPoint(p: DOMPointInit) { return p }
        toFloat32Array() { return new Float32Array(16) }
        toFloat64Array() { return new Float64Array(16) }
        toJSON() { return {} }
        toString() { return 'matrix(1, 0, 0, 1, 0, 0)' }
      }
    }

    // Polyfill DOMPoint (souvent utilisé avec DOMMatrix)
    if (typeof global.DOMPoint === 'undefined') {
      // @ts-ignore
      global.DOMPoint = class DOMPoint {
        x = 0; y = 0; z = 0; w = 1
        constructor(x = 0, y = 0, z = 0, w = 1) {
          this.x = x; this.y = y; this.z = z; this.w = w
        }
        static fromPoint(p: DOMPointInit = {}) {
          return new DOMPoint(p.x ?? 0, p.y ?? 0, p.z ?? 0, p.w ?? 1)
        }
        toJSON() { return { x: this.x, y: this.y, z: this.z, w: this.w } }
        matrixTransform() { return this }
      }
    }
  }
}
