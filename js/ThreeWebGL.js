// ThreeWebGL.js r37 - http://github.com/mrdoob/three.js
var THREE = THREE || {};
THREE.Color = function(a) {
    this.setHex(a)
}
;
THREE.Color.prototype = {
    autoUpdate: !0,
    copy: function(a) {
        this.r = a.r;
        this.g = a.g;
        this.b = a.b;
        this.hex = a.hex;
        this.__styleString = a.__styleString
    },
    setRGB: function(a, b, c) {
        this.r = a;
        this.g = b;
        this.b = c;
        if (this.autoUpdate) {
            this.updateHex();
            this.updateStyleString()
        }
    },
    setHSV: function(a, b, c) {
        var f, e, h, j, p, n;
        if (c == 0)
            f = e = h = 0;
        else {
            j = Math.floor(a * 6);
            p = a * 6 - j;
            a = c * (1 - b);
            n = c * (1 - b * p);
            b = c * (1 - b * (1 - p));
            switch (j) {
            case 1:
                f = n;
                e = c;
                h = a;
                break;
            case 2:
                f = a;
                e = c;
                h = b;
                break;
            case 3:
                f = a;
                e = n;
                h = c;
                break;
            case 4:
                f = b;
                e = a;
                h = c;
                break;
            case 5:
                f = c;
                e = a;
                h = n;
                break;
            case 6:
            case 0:
                f = c;
                e = b;
                h = a
            }
        }
        this.r = f;
        this.g = e;
        this.b = h;
        if (this.autoUpdate) {
            this.updateHex();
            this.updateStyleString()
        }
    },
    setHex: function(a) {
        this.hex = ~~a & 16777215;
        if (this.autoUpdate) {
            this.updateRGB();
            this.updateStyleString()
        }
    },
    updateHex: function() {
        this.hex = ~~(this.r * 255) << 16 ^ ~~(this.g * 255) << 8 ^ ~~(this.b * 255)
    },
    updateRGB: function() {
        this.r = (this.hex >> 16 & 255) / 255;
        this.g = (this.hex >> 8 & 255) / 255;
        this.b = (this.hex & 255) / 255
    },
    updateStyleString: function() {
        this.__styleString = "rgb(" + ~~(this.r * 255) + "," + ~~(this.g * 255) + "," + ~~(this.b * 255) + ")"
    },
    clone: function() {
        return new THREE.Color(this.hex)
    }
};
THREE.Vector2 = function(a, b) {
    this.set(a || 0, b || 0)
}
;
THREE.Vector2.prototype = {
    set: function(a, b) {
        this.x = a;
        this.y = b;
        return this
    },
    copy: function(a) {
        this.set(a.x, a.y);
        return this
    },
    addSelf: function(a) {
        this.set(this.x + a.x, this.y + a.y);
        return this
    },
    add: function(a, b) {
        this.set(a.x + b.x, a.y + b.y);
        return this
    },
    subSelf: function(a) {
        this.set(this.x - a.x, this.y - a.y);
        return this
    },
    sub: function(a, b) {
        this.set(a.x - b.x, a.y - b.y);
        return this
    },
    multiplyScalar: function(a) {
        this.set(this.x * a, this.y * a);
        return this
    },
    negate: function() {
        this.set(-this.x, -this.y);
        return this
    },
    unit: function() {
        this.multiplyScalar(1 / this.length());
        return this
    },
    length: function() {
        return Math.sqrt(this.lengthSq())
    },
    lengthSq: function() {
        return this.x * this.x + this.y * this.y
    },
    clone: function() {
        return new THREE.Vector2(this.x,this.y)
    }
};
THREE.Vector3 = function(a, b, c) {
    this.set(a || 0, b || 0, c || 0)
}
;
THREE.Vector3.prototype = {
    set: function(a, b, c) {
        this.x = a;
        this.y = b;
        this.z = c;
        return this
    },
    copy: function(a) {
        this.set(a.x, a.y, a.z);
        return this
    },
    add: function(a, b) {
        this.set(a.x + b.x, a.y + b.y, a.z + b.z);
        return this
    },
    addSelf: function(a) {
        this.set(this.x + a.x, this.y + a.y, this.z + a.z);
        return this
    },
    addScalar: function(a) {
        this.set(this.x + a, this.y + a, this.z + a);
        return this
    },
    sub: function(a, b) {
        this.set(a.x - b.x, a.y - b.y, a.z - b.z);
        return this
    },
    subSelf: function(a) {
        this.set(this.x - a.x, this.y - a.y, this.z - a.z);
        return this
    },
    cross: function(a, b) {
        this.set(a.y * b.z - a.z * b.y, a.z * b.x - a.x * b.z, a.x * b.y - a.y * b.x);
        return this
    },
    crossSelf: function(a) {
        var b = this.x
          , c = this.y
          , f = this.z;
        this.set(c * a.z - f * a.y, f * a.x - b * a.z, b * a.y - c * a.x);
        return this
    },
    multiply: function(a, b) {
        this.set(a.x * b.x, a.y * b.y, a.z * b.z);
        return this
    },
    multiplySelf: function(a) {
        this.set(this.x * a.x, this.y * a.y, this.z * a.z);
        return this
    },
    multiplyScalar: function(a) {
        this.set(this.x * a, this.y * a, this.z * a);
        return this
    },
    divideSelf: function(a) {
        this.set(this.x / a.x, this.y / a.y, this.z / a.z);
        return this
    },
    divideScalar: function(a) {
        this.set(this.x / a, this.y / a, this.z / a);
        return this
    },
    negate: function() {
        this.set(-this.x, -this.y, -this.z);
        return this
    },
    dot: function(a) {
        return this.x * a.x + this.y * a.y + this.z * a.z
    },
    distanceTo: function(a) {
        return Math.sqrt(this.distanceToSquared(a))
    },
    distanceToSquared: function(a) {
        var b = this.x - a.x
          , c = this.y - a.y;
        a = this.z - a.z;
        return b * b + c * c + a * a
    },
    length: function() {
        return Math.sqrt(this.lengthSq())
    },
    lengthSq: function() {
        return this.x * this.x + this.y * this.y + this.z * this.z
    },
    lengthManhattan: function() {
        return this.x + this.y + this.z
    },
    normalize: function() {
        var a = this.length();
        a > 0 ? this.multiplyScalar(1 / a) : this.set(0, 0, 0);
        return this
    },
    setPositionFromMatrix: function(a) {
        this.x = a.n14;
        this.y = a.n24;
        this.z = a.n34
    },
    setRotationFromMatrix: function(a) {
        this.y = Math.asin(a.n13);
        var b = Math.cos(this.y);
        if (Math.abs(b) > 1.0E-5) {
            this.x = Math.atan2(-a.n23 / b, a.n33 / b);
            this.z = Math.atan2(-a.n13 / b, a.n11 / b)
        } else {
            this.x = 0;
            this.z = Math.atan2(a.n21, a.n22)
        }
    },
    setLength: function(a) {
        return this.normalize().multiplyScalar(a)
    },
    isZero: function() {
        return Math.abs(this.x) < 1.0E-4 && Math.abs(this.y) < 1.0E-4 && Math.abs(this.z) < 1.0E-4
    },
    clone: function() {
        return new THREE.Vector3(this.x,this.y,this.z)
    }
};
THREE.Vector4 = function(a, b, c, f) {
    this.set(a || 0, b || 0, c || 0, f || 1)
}
;
THREE.Vector4.prototype = {
    set: function(a, b, c, f) {
        this.x = a;
        this.y = b;
        this.z = c;
        this.w = f;
        return this
    },
    copy: function(a) {
        this.set(a.x, a.y, a.z, a.w || 1);
        return this
    },
    add: function(a, b) {
        this.set(a.x + b.x, a.y + b.y, a.z + b.z, a.w + b.w);
        return this
    },
    addSelf: function(a) {
        this.set(this.x + a.x, this.y + a.y, this.z + a.z, this.w + a.w);
        return this
    },
    sub: function(a, b) {
        this.set(a.x - b.x, a.y - b.y, a.z - b.z, a.w - b.w);
        return this
    },
    subSelf: function(a) {
        this.set(this.x - a.x, this.y - a.y, this.z - a.z, this.w - a.w);
        return this
    },
    multiplyScalar: function(a) {
        this.set(this.x * a, this.y * a, this.z * a, this.w * a);
        return this
    },
    divideScalar: function(a) {
        this.set(this.x / a, this.y / a, this.z / a, this.w / a);
        return this
    },
    lerpSelf: function(a, b) {
        this.set(this.x + (a.x - this.x) * b, this.y + (a.y - this.y) * b, this.z + (a.z - this.z) * b, this.w + (a.w - this.w) * b)
    },
    clone: function() {
        return new THREE.Vector4(this.x,this.y,this.z,this.w)
    }
};
THREE.Ray = function(a, b) {
    this.origin = a || new THREE.Vector3;
    this.direction = b || new THREE.Vector3
}
;
THREE.Ray.prototype = {
    intersectScene: function(a) {
        var b, c, f = a.objects, e = [];
        a = 0;
        for (b = f.length; a < b; a++) {
            c = f[a];
            c instanceof THREE.Mesh && (e = e.concat(this.intersectObject(c)))
        }
        e.sort(function(h, j) {
            return h.distance - j.distance
        });
        return e
    },
    intersectObject: function(a) {
        function b(P, L, ja, ma) {
            ma = ma.clone().subSelf(L);
            ja = ja.clone().subSelf(L);
            var sa = P.clone().subSelf(L);
            P = ma.dot(ma);
            L = ma.dot(ja);
            ma = ma.dot(sa);
            var U = ja.dot(ja);
            ja = ja.dot(sa);
            sa = 1 / (P * U - L * L);
            U = (U * ma - L * ja) * sa;
            P = (P * ja - L * ma) * sa;
            return U > 0 && P > 0 && U + P < 1
        }
        var c, f, e, h, j, p, n, s, x, z, C, y = a.geometry, J = y.vertices, K = [];
        c = 0;
        for (f = y.faces.length; c < f; c++) {
            e = y.faces[c];
            z = this.origin.clone();
            C = this.direction.clone();
            n = a.matrixWorld;
            h = n.multiplyVector3(J[e.a].position.clone());
            j = n.multiplyVector3(J[e.b].position.clone());
            p = n.multiplyVector3(J[e.c].position.clone());
            n = e instanceof THREE.Face4 ? n.multiplyVector3(J[e.d].position.clone()) : null;
            s = a.matrixRotationWorld.multiplyVector3(e.normal.clone());
            x = C.dot(s);
            if (x < 0) {
                s = s.dot((new THREE.Vector3).sub(h, z)) / x;
                z = z.addSelf(C.multiplyScalar(s));
                if (e instanceof THREE.Face3) {
                    if (b(z, h, j, p)) {
                        e = {
                            distance: this.origin.distanceTo(z),
                            point: z,
                            face: e,
                            object: a
                        };
                        K.push(e)
                    }
                } else if (e instanceof THREE.Face4 && (b(z, h, j, n) || b(z, j, p, n))) {
                    e = {
                        distance: this.origin.distanceTo(z),
                        point: z,
                        face: e,
                        object: a
                    };
                    K.push(e)
                }
            }
        }
        return K
    }
};
THREE.Rectangle = function() {
    function a() {
        h = f - b;
        j = e - c
    }
    var b, c, f, e, h, j, p = !0;
    this.getX = function() {
        return b
    }
    ;
    this.getY = function() {
        return c
    }
    ;
    this.getWidth = function() {
        return h
    }
    ;
    this.getHeight = function() {
        return j
    }
    ;
    this.getLeft = function() {
        return b
    }
    ;
    this.getTop = function() {
        return c
    }
    ;
    this.getRight = function() {
        return f
    }
    ;
    this.getBottom = function() {
        return e
    }
    ;
    this.set = function(n, s, x, z) {
        p = !1;
        b = n;
        c = s;
        f = x;
        e = z;
        a()
    }
    ;
    this.addPoint = function(n, s) {
        if (p) {
            p = !1;
            b = n;
            c = s;
            f = n;
            e = s
        } else {
            b = b < n ? b : n;
            c = c < s ? c : s;
            f = f > n ? f : n;
            e = e > s ? e : s
        }
        a()
    }
    ;
    this.add3Points = function(n, s, x, z, C, y) {
        if (p) {
            p = !1;
            b = n < x ? n < C ? n : C : x < C ? x : C;
            c = s < z ? s < y ? s : y : z < y ? z : y;
            f = n > x ? n > C ? n : C : x > C ? x : C;
            e = s > z ? s > y ? s : y : z > y ? z : y
        } else {
            b = n < x ? n < C ? n < b ? n : b : C < b ? C : b : x < C ? x < b ? x : b : C < b ? C : b;
            c = s < z ? s < y ? s < c ? s : c : y < c ? y : c : z < y ? z < c ? z : c : y < c ? y : c;
            f = n > x ? n > C ? n > f ? n : f : C > f ? C : f : x > C ? x > f ? x : f : C > f ? C : f;
            e = s > z ? s > y ? s > e ? s : e : y > e ? y : e : z > y ? z > e ? z : e : y > e ? y : e
        }
        a()
    }
    ;
    this.addRectangle = function(n) {
        if (p) {
            p = !1;
            b = n.getLeft();
            c = n.getTop();
            f = n.getRight();
            e = n.getBottom()
        } else {
            b = b < n.getLeft() ? b : n.getLeft();
            c = c < n.getTop() ? c : n.getTop();
            f = f > n.getRight() ? f : n.getRight();
            e = e > n.getBottom() ? e : n.getBottom()
        }
        a()
    }
    ;
    this.inflate = function(n) {
        b -= n;
        c -= n;
        f += n;
        e += n;
        a()
    }
    ;
    this.minSelf = function(n) {
        b = b > n.getLeft() ? b : n.getLeft();
        c = c > n.getTop() ? c : n.getTop();
        f = f < n.getRight() ? f : n.getRight();
        e = e < n.getBottom() ? e : n.getBottom();
        a()
    }
    ;
    this.instersects = function(n) {
        return Math.min(f, n.getRight()) - Math.max(b, n.getLeft()) >= 0 && Math.min(e, n.getBottom()) - Math.max(c, n.getTop()) >= 0
    }
    ;
    this.empty = function() {
        p = !0;
        e = f = c = b = 0;
        a()
    }
    ;
    this.isEmpty = function() {
        return p
    }
}
;
THREE.Matrix3 = function() {
    this.m = []
}
;
THREE.Matrix3.prototype = {
    transpose: function() {
        var a, b = this.m;
        a = b[1];
        b[1] = b[3];
        b[3] = a;
        a = b[2];
        b[2] = b[6];
        b[6] = a;
        a = b[5];
        b[5] = b[7];
        b[7] = a;
        return this
    },
    transposeIntoArray: function(a) {
        var b = this.m;
        a[0] = b[0];
        a[1] = b[3];
        a[2] = b[6];
        a[3] = b[1];
        a[4] = b[4];
        a[5] = b[7];
        a[6] = b[2];
        a[7] = b[5];
        a[8] = b[8];
        return this
    }
};
THREE.Matrix4 = function(a, b, c, f, e, h, j, p, n, s, x, z, C, y, J, K) {
    this.set(a || 1, b || 0, c || 0, f || 0, e || 0, h || 1, j || 0, p || 0, n || 0, s || 0, x || 1, z || 0, C || 0, y || 0, J || 0, K || 1);
    this.flat = Array(16);
    this.m33 = new THREE.Matrix3
}
;
THREE.Matrix4.prototype = {
    set: function(a, b, c, f, e, h, j, p, n, s, x, z, C, y, J, K) {
        this.n11 = a;
        this.n12 = b;
        this.n13 = c;
        this.n14 = f;
        this.n21 = e;
        this.n22 = h;
        this.n23 = j;
        this.n24 = p;
        this.n31 = n;
        this.n32 = s;
        this.n33 = x;
        this.n34 = z;
        this.n41 = C;
        this.n42 = y;
        this.n43 = J;
        this.n44 = K;
        return this
    },
    identity: function() {
        this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        return this
    },
    copy: function(a) {
        this.set(a.n11, a.n12, a.n13, a.n14, a.n21, a.n22, a.n23, a.n24, a.n31, a.n32, a.n33, a.n34, a.n41, a.n42, a.n43, a.n44);
        return this
    },
    lookAt: function(a, b, c) {
        var f = THREE.Matrix4.__v1
          , e = THREE.Matrix4.__v2
          , h = THREE.Matrix4.__v3;
        h.sub(a, b).normalize();
        if (h.length() === 0)
            h.z = 1;
        f.cross(c, h).normalize();
        if (f.length() === 0) {
            h.x += 1.0E-4;
            f.cross(c, h).normalize()
        }
        e.cross(h, f).normalize();
        this.n11 = f.x;
        this.n12 = e.x;
        this.n13 = h.x;
        this.n21 = f.y;
        this.n22 = e.y;
        this.n23 = h.y;
        this.n31 = f.z;
        this.n32 = e.z;
        this.n33 = h.z;
        return this
    },
    multiplyVector3: function(a) {
        var b = a.x
          , c = a.y
          , f = a.z
          , e = 1 / (this.n41 * b + this.n42 * c + this.n43 * f + this.n44);
        a.x = (this.n11 * b + this.n12 * c + this.n13 * f + this.n14) * e;
        a.y = (this.n21 * b + this.n22 * c + this.n23 * f + this.n24) * e;
        a.z = (this.n31 * b + this.n32 * c + this.n33 * f + this.n34) * e;
        return a
    },
    multiplyVector4: function(a) {
        var b = a.x
          , c = a.y
          , f = a.z
          , e = a.w;
        a.x = this.n11 * b + this.n12 * c + this.n13 * f + this.n14 * e;
        a.y = this.n21 * b + this.n22 * c + this.n23 * f + this.n24 * e;
        a.z = this.n31 * b + this.n32 * c + this.n33 * f + this.n34 * e;
        a.w = this.n41 * b + this.n42 * c + this.n43 * f + this.n44 * e;
        return a
    },
    rotateAxis: function(a) {
        var b = a.x
          , c = a.y
          , f = a.z;
        a.x = b * this.n11 + c * this.n12 + f * this.n13;
        a.y = b * this.n21 + c * this.n22 + f * this.n23;
        a.z = b * this.n31 + c * this.n32 + f * this.n33;
        a.normalize();
        return a
    },
    crossVector: function(a) {
        var b = new THREE.Vector4;
        b.x = this.n11 * a.x + this.n12 * a.y + this.n13 * a.z + this.n14 * a.w;
        b.y = this.n21 * a.x + this.n22 * a.y + this.n23 * a.z + this.n24 * a.w;
        b.z = this.n31 * a.x + this.n32 * a.y + this.n33 * a.z + this.n34 * a.w;
        b.w = a.w ? this.n41 * a.x + this.n42 * a.y + this.n43 * a.z + this.n44 * a.w : 1;
        return b
    },
    multiply: function(a, b) {
        var c = a.n11
          , f = a.n12
          , e = a.n13
          , h = a.n14
          , j = a.n21
          , p = a.n22
          , n = a.n23
          , s = a.n24
          , x = a.n31
          , z = a.n32
          , C = a.n33
          , y = a.n34
          , J = a.n41
          , K = a.n42
          , P = a.n43
          , L = a.n44
          , ja = b.n11
          , ma = b.n12
          , sa = b.n13
          , U = b.n14
          , A = b.n21
          , oa = b.n22
          , d = b.n23
          , Ba = b.n24
          , Ca = b.n31
          , Q = b.n32
          , N = b.n33
          , pa = b.n34;
        this.n11 = c * ja + f * A + e * Ca;
        this.n12 = c * ma + f * oa + e * Q;
        this.n13 = c * sa + f * d + e * N;
        this.n14 = c * U + f * Ba + e * pa + h;
        this.n21 = j * ja + p * A + n * Ca;
        this.n22 = j * ma + p * oa + n * Q;
        this.n23 = j * sa + p * d + n * N;
        this.n24 = j * U + p * Ba + n * pa + s;
        this.n31 = x * ja + z * A + C * Ca;
        this.n32 = x * ma + z * oa + C * Q;
        this.n33 = x * sa + z * d + C * N;
        this.n34 = x * U + z * Ba + C * pa + y;
        this.n41 = J * ja + K * A + P * Ca;
        this.n42 = J * ma + K * oa + P * Q;
        this.n43 = J * sa + K * d + P * N;
        this.n44 = J * U + K * Ba + P * pa + L;
        return this
    },
    multiplyToArray: function(a, b, c) {
        this.multiply(a, b);
        c[0] = this.n11;
        c[1] = this.n21;
        c[2] = this.n31;
        c[3] = this.n41;
        c[4] = this.n12;
        c[5] = this.n22;
        c[6] = this.n32;
        c[7] = this.n42;
        c[8] = this.n13;
        c[9] = this.n23;
        c[10] = this.n33;
        c[11] = this.n43;
        c[12] = this.n14;
        c[13] = this.n24;
        c[14] = this.n34;
        c[15] = this.n44;
        return this
    },
    multiplySelf: function(a) {
        this.multiply(this, a);
        return this
    },
    multiplyScalar: function(a) {
        this.n11 *= a;
        this.n12 *= a;
        this.n13 *= a;
        this.n14 *= a;
        this.n21 *= a;
        this.n22 *= a;
        this.n23 *= a;
        this.n24 *= a;
        this.n31 *= a;
        this.n32 *= a;
        this.n33 *= a;
        this.n34 *= a;
        this.n41 *= a;
        this.n42 *= a;
        this.n43 *= a;
        this.n44 *= a;
        return this
    },
    determinant: function() {
        var a = this.n11
          , b = this.n12
          , c = this.n13
          , f = this.n14
          , e = this.n21
          , h = this.n22
          , j = this.n23
          , p = this.n24
          , n = this.n31
          , s = this.n32
          , x = this.n33
          , z = this.n34
          , C = this.n41
          , y = this.n42
          , J = this.n43
          , K = this.n44;
        return f * j * s * C - c * p * s * C - f * h * x * C + b * p * x * C + c * h * z * C - b * j * z * C - f * j * n * y + c * p * n * y + f * e * x * y - a * p * x * y - c * e * z * y + a * j * z * y + f * h * n * J - b * p * n * J - f * e * s * J + a * p * s * J + b * e * z * J - a * h * z * J - c * h * n * K + b * j * n * K + c * e * s * K - a * j * s * K - b * e * x * K + a * h * x * K
    },
    transpose: function() {
        var a;
        a = this.n21;
        this.n21 = this.n12;
        this.n12 = a;
        a = this.n31;
        this.n31 = this.n13;
        this.n13 = a;
        a = this.n32;
        this.n32 = this.n23;
        this.n23 = a;
        a = this.n41;
        this.n41 = this.n14;
        this.n14 = a;
        a = this.n42;
        this.n42 = this.n24;
        this.n24 = a;
        a = this.n43;
        this.n43 = this.n34;
        this.n43 = a;
        return this
    },
    clone: function() {
        var a = new THREE.Matrix4;
        a.n11 = this.n11;
        a.n12 = this.n12;
        a.n13 = this.n13;
        a.n14 = this.n14;
        a.n21 = this.n21;
        a.n22 = this.n22;
        a.n23 = this.n23;
        a.n24 = this.n24;
        a.n31 = this.n31;
        a.n32 = this.n32;
        a.n33 = this.n33;
        a.n34 = this.n34;
        a.n41 = this.n41;
        a.n42 = this.n42;
        a.n43 = this.n43;
        a.n44 = this.n44;
        return a
    },
    flatten: function() {
        this.flat[0] = this.n11;
        this.flat[1] = this.n21;
        this.flat[2] = this.n31;
        this.flat[3] = this.n41;
        this.flat[4] = this.n12;
        this.flat[5] = this.n22;
        this.flat[6] = this.n32;
        this.flat[7] = this.n42;
        this.flat[8] = this.n13;
        this.flat[9] = this.n23;
        this.flat[10] = this.n33;
        this.flat[11] = this.n43;
        this.flat[12] = this.n14;
        this.flat[13] = this.n24;
        this.flat[14] = this.n34;
        this.flat[15] = this.n44;
        return this.flat
    },
    flattenToArray: function(a) {
        a[0] = this.n11;
        a[1] = this.n21;
        a[2] = this.n31;
        a[3] = this.n41;
        a[4] = this.n12;
        a[5] = this.n22;
        a[6] = this.n32;
        a[7] = this.n42;
        a[8] = this.n13;
        a[9] = this.n23;
        a[10] = this.n33;
        a[11] = this.n43;
        a[12] = this.n14;
        a[13] = this.n24;
        a[14] = this.n34;
        a[15] = this.n44;
        return a
    },
    flattenToArrayOffset: function(a, b) {
        a[b] = this.n11;
        a[b + 1] = this.n21;
        a[b + 2] = this.n31;
        a[b + 3] = this.n41;
        a[b + 4] = this.n12;
        a[b + 5] = this.n22;
        a[b + 6] = this.n32;
        a[b + 7] = this.n42;
        a[b + 8] = this.n13;
        a[b + 9] = this.n23;
        a[b + 10] = this.n33;
        a[b + 11] = this.n43;
        a[b + 12] = this.n14;
        a[b + 13] = this.n24;
        a[b + 14] = this.n34;
        a[b + 15] = this.n44;
        return a
    },
    setTranslation: function(a, b, c) {
        this.set(1, 0, 0, a, 0, 1, 0, b, 0, 0, 1, c, 0, 0, 0, 1);
        return this
    },
    setScale: function(a, b, c) {
        this.set(a, 0, 0, 0, 0, b, 0, 0, 0, 0, c, 0, 0, 0, 0, 1);
        return this
    },
    setRotationX: function(a) {
        var b = Math.cos(a);
        a = Math.sin(a);
        this.set(1, 0, 0, 0, 0, b, -a, 0, 0, a, b, 0, 0, 0, 0, 1);
        return this
    },
    setRotationY: function(a) {
        var b = Math.cos(a);
        a = Math.sin(a);
        this.set(b, 0, a, 0, 0, 1, 0, 0, -a, 0, b, 0, 0, 0, 0, 1);
        return this
    },
    setRotationZ: function(a) {
        var b = Math.cos(a);
        a = Math.sin(a);
        this.set(b, -a, 0, 0, a, b, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        return this
    },
    setRotationAxis: function(a, b) {
        var c = Math.cos(b)
          , f = Math.sin(b)
          , e = 1 - c
          , h = a.x
          , j = a.y
          , p = a.z
          , n = e * h
          , s = e * j;
        this.set(n * h + c, n * j - f * p, n * p + f * j, 0, n * j + f * p, s * j + c, s * p - f * h, 0, n * p - f * j, s * p + f * h, e * p * p + c, 0, 0, 0, 0, 1);
        return this
    },
    setPosition: function(a) {
        this.n14 = a.x;
        this.n24 = a.y;
        this.n34 = a.z;
        return this
    },
    setRotationFromEuler: function(a) {
        var b = a.x
          , c = a.y
          , f = a.z;
        a = Math.cos(b);
        b = Math.sin(b);
        var e = Math.cos(c);
        c = Math.sin(c);
        var h = Math.cos(f);
        f = Math.sin(f);
        var j = a * c
          , p = b * c;
        this.n11 = e * h;
        this.n12 = -e * f;
        this.n13 = c;
        this.n21 = p * h + a * f;
        this.n22 = -p * f + a * h;
        this.n23 = -b * e;
        this.n31 = -j * h + b * f;
        this.n32 = j * f + b * h;
        this.n33 = a * e;
        return this
    },
    setRotationFromQuaternion: function(a) {
        var b = a.x
          , c = a.y
          , f = a.z
          , e = a.w
          , h = b + b
          , j = c + c
          , p = f + f;
        a = b * h;
        var n = b * j;
        b *= p;
        var s = c * j;
        c *= p;
        f *= p;
        h *= e;
        j *= e;
        e *= p;
        this.n11 = 1 - (s + f);
        this.n12 = n - e;
        this.n13 = b + j;
        this.n21 = n + e;
        this.n22 = 1 - (a + f);
        this.n23 = c - h;
        this.n31 = b - j;
        this.n32 = c + h;
        this.n33 = 1 - (a + s);
        return this
    },
    scale: function(a) {
        var b = a.x
          , c = a.y;
        a = a.z;
        this.n11 *= b;
        this.n12 *= c;
        this.n13 *= a;
        this.n21 *= b;
        this.n22 *= c;
        this.n23 *= a;
        this.n31 *= b;
        this.n32 *= c;
        this.n33 *= a;
        this.n41 *= b;
        this.n42 *= c;
        this.n43 *= a;
        return this
    },
    extractPosition: function(a) {
        this.n14 = a.n14;
        this.n24 = a.n24;
        this.n34 = a.n34
    },
    extractRotation: function(a, b) {
        var c = 1 / b.x
          , f = 1 / b.y
          , e = 1 / b.z;
        this.n11 = a.n11 * c;
        this.n21 = a.n21 * c;
        this.n31 = a.n31 * c;
        this.n12 = a.n12 * f;
        this.n22 = a.n22 * f;
        this.n32 = a.n32 * f;
        this.n13 = a.n13 * e;
        this.n23 = a.n23 * e;
        this.n33 = a.n33 * e
    }
};
THREE.Matrix4.makeInvert = function(a, b) {
    var c = a.n11
      , f = a.n12
      , e = a.n13
      , h = a.n14
      , j = a.n21
      , p = a.n22
      , n = a.n23
      , s = a.n24
      , x = a.n31
      , z = a.n32
      , C = a.n33
      , y = a.n34
      , J = a.n41
      , K = a.n42
      , P = a.n43
      , L = a.n44;
    b === undefined && (b = new THREE.Matrix4);
    b.n11 = n * y * K - s * C * K + s * z * P - p * y * P - n * z * L + p * C * L;
    b.n12 = h * C * K - e * y * K - h * z * P + f * y * P + e * z * L - f * C * L;
    b.n13 = e * s * K - h * n * K + h * p * P - f * s * P - e * p * L + f * n * L;
    b.n14 = h * n * z - e * s * z - h * p * C + f * s * C + e * p * y - f * n * y;
    b.n21 = s * C * J - n * y * J - s * x * P + j * y * P + n * x * L - j * C * L;
    b.n22 = e * y * J - h * C * J + h * x * P - c * y * P - e * x * L + c * C * L;
    b.n23 = h * n * J - e * s * J - h * j * P + c * s * P + e * j * L - c * n * L;
    b.n24 = e * s * x - h * n * x + h * j * C - c * s * C - e * j * y + c * n * y;
    b.n31 = p * y * J - s * z * J + s * x * K - j * y * K - p * x * L + j * z * L;
    b.n32 = h * z * J - f * y * J - h * x * K + c * y * K + f * x * L - c * z * L;
    b.n33 = e * s * J - h * p * J + h * j * K - c * s * K - f * j * L + c * p * L;
    b.n34 = h * p * x - f * s * x - h * j * z + c * s * z + f * j * y - c * p * y;
    b.n41 = n * z * J - p * C * J - n * x * K + j * C * K + p * x * P - j * z * P;
    b.n42 = f * C * J - e * z * J + e * x * K - c * C * K - f * x * P + c * z * P;
    b.n43 = e * p * J - f * n * J - e * j * K + c * n * K + f * j * P - c * p * P;
    b.n44 = f * n * x - e * p * x + e * j * z - c * n * z - f * j * C + c * p * C;
    b.multiplyScalar(1 / a.determinant());
    return b
}
;
THREE.Matrix4.makeInvert3x3 = function(a) {
    var b = a.m33
      , c = b.m
      , f = a.n33 * a.n22 - a.n32 * a.n23
      , e = -a.n33 * a.n21 + a.n31 * a.n23
      , h = a.n32 * a.n21 - a.n31 * a.n22
      , j = -a.n33 * a.n12 + a.n32 * a.n13
      , p = a.n33 * a.n11 - a.n31 * a.n13
      , n = -a.n32 * a.n11 + a.n31 * a.n12
      , s = a.n23 * a.n12 - a.n22 * a.n13
      , x = -a.n23 * a.n11 + a.n21 * a.n13
      , z = a.n22 * a.n11 - a.n21 * a.n12;
    a = a.n11 * f + a.n21 * j + a.n31 * s;
    if (a == 0)
        throw "matrix not invertible";
    a = 1 / a;
    c[0] = a * f;
    c[1] = a * e;
    c[2] = a * h;
    c[3] = a * j;
    c[4] = a * p;
    c[5] = a * n;
    c[6] = a * s;
    c[7] = a * x;
    c[8] = a * z;
    return b
}
;
THREE.Matrix4.makeFrustum = function(a, b, c, f, e, h) {
    var j;
    j = new THREE.Matrix4;
    j.n11 = 2 * e / (b - a);
    j.n12 = 0;
    j.n13 = (b + a) / (b - a);
    j.n14 = 0;
    j.n21 = 0;
    j.n22 = 2 * e / (f - c);
    j.n23 = (f + c) / (f - c);
    j.n24 = 0;
    j.n31 = 0;
    j.n32 = 0;
    j.n33 = -(h + e) / (h - e);
    j.n34 = -2 * h * e / (h - e);
    j.n41 = 0;
    j.n42 = 0;
    j.n43 = -1;
    j.n44 = 0;
    return j
}
;
THREE.Matrix4.makePerspective = function(a, b, c, f) {
    var e;
    a = c * Math.tan(a * Math.PI / 360);
    e = -a;
    return THREE.Matrix4.makeFrustum(e * b, a * b, e, a, c, f)
}
;
THREE.Matrix4.makeOrtho = function(a, b, c, f, e, h) {
    var j, p, n, s;
    j = new THREE.Matrix4;
    p = b - a;
    n = c - f;
    s = h - e;
    j.n11 = 2 / p;
    j.n12 = 0;
    j.n13 = 0;
    j.n14 = -((b + a) / p);
    j.n21 = 0;
    j.n22 = 2 / n;
    j.n23 = 0;
    j.n24 = -((c + f) / n);
    j.n31 = 0;
    j.n32 = 0;
    j.n33 = -2 / s;
    j.n34 = -((h + e) / s);
    j.n41 = 0;
    j.n42 = 0;
    j.n43 = 0;
    j.n44 = 1;
    return j
}
;
THREE.Matrix4.__v1 = new THREE.Vector3;
THREE.Matrix4.__v2 = new THREE.Vector3;
THREE.Matrix4.__v3 = new THREE.Vector3;
THREE.Object3D = function() {
    this.parent = undefined;
    this.children = [];
    this.up = new THREE.Vector3(0,1,0);
    this.position = new THREE.Vector3;
    this.rotation = new THREE.Vector3;
    this.scale = new THREE.Vector3(1,1,1);
    this.rotationAutoUpdate = !0;
    this.matrix = new THREE.Matrix4;
    this.matrixWorld = new THREE.Matrix4;
    this.matrixRotationWorld = new THREE.Matrix4;
    this.matrixAutoUpdate = !0;
    this.matrixWorldNeedsUpdate = !0;
    this.quaternion = new THREE.Quaternion;
    this.useQuaternion = !1;
    this.boundRadius = 0;
    this.boundRadiusScale = 1;
    this.visible = !0;
    this._vector = new THREE.Vector3
}
;
THREE.Object3D.prototype = {
    translate: function(a, b) {
        this.matrix.rotateAxis(b);
        this.position.addSelf(b.multiplyScalar(a))
    },
    translateX: function(a) {
        this.translate(a, this._vector.set(1, 0, 0))
    },
    translateY: function(a) {
        this.translate(a, this._vector.set(0, 1, 0))
    },
    translateZ: function(a) {
        this.translate(a, this._vector.set(0, 0, 1))
    },
    lookAt: function(a) {
        this.matrix.lookAt(this.position, a, this.up);
        this.rotationAutoUpdate && this.rotation.setRotationFromMatrix(this.matrix)
    },
    addChild: function(a) {
        if (this.children.indexOf(a) === -1) {
            a.parent !== undefined && a.parent.removeChild(a);
            a.parent = this;
            this.children.push(a);
            for (var b = this; b instanceof THREE.Scene === !1 && b !== undefined; )
                b = b.parent;
            b !== undefined && b.addChildRecurse(a)
        }
    },
    removeChild: function(a) {
        var b = this.children.indexOf(a);
        if (b !== -1) {
            a.parent = undefined;
            this.children.splice(b, 1)
        }
    },
    updateMatrix: function() {
        this.matrix.setPosition(this.position);
        this.useQuaternion ? this.matrix.setRotationFromQuaternion(this.quaternion) : this.matrix.setRotationFromEuler(this.rotation);
        if (this.scale.x !== 1 || this.scale.y !== 1 || this.scale.z !== 1) {
            this.matrix.scale(this.scale);
            this.boundRadiusScale = Math.max(this.scale.x, Math.max(this.scale.y, this.scale.z))
        }
        this.matrixWorldNeedsUpdate = !0
    },
    update: function(a, b, c) {
        this.matrixAutoUpdate && this.updateMatrix();
        if (this.matrixWorldNeedsUpdate || b) {
            a ? this.matrixWorld.multiply(a, this.matrix) : this.matrixWorld.copy(this.matrix);
            this.matrixRotationWorld.extractRotation(this.matrixWorld, this.scale);
            this.matrixWorldNeedsUpdate = !1;
            b = !0
        }
        a = 0;
        for (var f = this.children.length; a < f; a++)
            this.children[a].update(this.matrixWorld, b, c)
    }
};
THREE.Quaternion = function(a, b, c, f) {
    this.set(a || 0, b || 0, c || 0, f !== undefined ? f : 1)
}
;
THREE.Quaternion.prototype = {
    set: function(a, b, c, f) {
        this.x = a;
        this.y = b;
        this.z = c;
        this.w = f;
        return this
    },
    setFromEuler: function(a) {
        var b = 0.5 * Math.PI / 360
          , c = a.x * b
          , f = a.y * b
          , e = a.z * b;
        a = Math.cos(f);
        f = Math.sin(f);
        b = Math.cos(-e);
        e = Math.sin(-e);
        var h = Math.cos(c);
        c = Math.sin(c);
        var j = a * b
          , p = f * e;
        this.w = j * h - p * c;
        this.x = j * c + p * h;
        this.y = f * b * h + a * e * c;
        this.z = a * e * h - f * b * c;
        return this
    },
    calculateW: function() {
        this.w = -Math.sqrt(Math.abs(1 - this.x * this.x - this.y * this.y - this.z * this.z));
        return this
    },
    inverse: function() {
        this.x *= -1;
        this.y *= -1;
        this.z *= -1;
        return this
    },
    length: function() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w)
    },
    normalize: function() {
        var a = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
        if (a == 0)
            this.w = this.z = this.y = this.x = 0;
        else {
            a = 1 / a;
            this.x *= a;
            this.y *= a;
            this.z *= a;
            this.w *= a
        }
        return this
    },
    multiplySelf: function(a) {
        var b = this.x
          , c = this.y
          , f = this.z
          , e = this.w
          , h = a.x
          , j = a.y
          , p = a.z;
        a = a.w;
        this.x = b * a + e * h + c * p - f * j;
        this.y = c * a + e * j + f * h - b * p;
        this.z = f * a + e * p + b * j - c * h;
        this.w = e * a - b * h - c * j - f * p;
        return this
    },
    multiplyVector3: function(a, b) {
        b || (b = a);
        var c = a.x
          , f = a.y
          , e = a.z
          , h = this.x
          , j = this.y
          , p = this.z
          , n = this.w
          , s = n * c + j * e - p * f
          , x = n * f + p * c - h * e
          , z = n * e + h * f - j * c;
        c = -h * c - j * f - p * e;
        b.x = s * n + c * -h + x * -p - z * -j;
        b.y = x * n + c * -j + z * -h - s * -p;
        b.z = z * n + c * -p + s * -j - x * -h;
        return b
    }
};
THREE.Quaternion.slerp = function(a, b, c, f) {
    var e = a.w * b.w + a.x * b.x + a.y * b.y + a.z * b.z;
    if (Math.abs(e) >= 1) {
        c.w = a.w;
        c.x = a.x;
        c.y = a.y;
        c.z = a.z;
        return c
    }
    var h = Math.acos(e)
      , j = Math.sqrt(1 - e * e);
    if (Math.abs(j) < 0.001) {
        c.w = 0.5 * (a.w + b.w);
        c.x = 0.5 * (a.x + b.x);
        c.y = 0.5 * (a.y + b.y);
        c.z = 0.5 * (a.z + b.z);
        return c
    }
    e = Math.sin((1 - f) * h) / j;
    f = Math.sin(f * h) / j;
    c.w = a.w * e + b.w * f;
    c.x = a.x * e + b.x * f;
    c.y = a.y * e + b.y * f;
    c.z = a.z * e + b.z * f;
    return c
}
;
THREE.Vertex = function(a) {
    this.position = a || new THREE.Vector3
}
;
THREE.Face3 = function(a, b, c, f, e, h) {
    this.a = a;
    this.b = b;
    this.c = c;
    this.normal = f instanceof THREE.Vector3 ? f : new THREE.Vector3;
    this.vertexNormals = f instanceof Array ? f : [];
    this.color = e instanceof THREE.Color ? e : new THREE.Color;
    this.vertexColors = e instanceof Array ? e : [];
    this.vertexTangents = [];
    this.materials = h instanceof Array ? h : [h];
    this.centroid = new THREE.Vector3
}
;
THREE.Face4 = function(a, b, c, f, e, h, j) {
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = f;
    this.normal = e instanceof THREE.Vector3 ? e : new THREE.Vector3;
    this.vertexNormals = e instanceof Array ? e : [];
    this.color = h instanceof THREE.Color ? h : new THREE.Color;
    this.vertexColors = h instanceof Array ? h : [];
    this.vertexTangents = [];
    this.materials = j instanceof Array ? j : [j];
    this.centroid = new THREE.Vector3
}
;
THREE.UV = function(a, b) {
    this.set(a || 0, b || 0)
}
;
THREE.UV.prototype = {
    set: function(a, b) {
        this.u = a;
        this.v = b;
        return this
    },
    copy: function(a) {
        this.set(a.u, a.v);
        return this
    }
};
THREE.Geometry = function() {
    this.id = "Geometry" + THREE.GeometryIdCounter++;
    this.vertices = [];
    this.colors = [];
    this.faces = [];
    this.faceUvs = [[]];
    this.faceVertexUvs = [[]];
    this.morphTargets = [];
    this.skinWeights = [];
    this.skinIndices = [];
    this.boundingSphere = this.boundingBox = null;
    this.hasTangents = !1
}
;
THREE.Geometry.prototype = {
    computeCentroids: function() {
        var a, b, c;
        a = 0;
        for (b = this.faces.length; a < b; a++) {
            c = this.faces[a];
            c.centroid.set(0, 0, 0);
            if (c instanceof THREE.Face3) {
                c.centroid.addSelf(this.vertices[c.a].position);
                c.centroid.addSelf(this.vertices[c.b].position);
                c.centroid.addSelf(this.vertices[c.c].position);
                c.centroid.divideScalar(3)
            } else if (c instanceof THREE.Face4) {
                c.centroid.addSelf(this.vertices[c.a].position);
                c.centroid.addSelf(this.vertices[c.b].position);
                c.centroid.addSelf(this.vertices[c.c].position);
                c.centroid.addSelf(this.vertices[c.d].position);
                c.centroid.divideScalar(4)
            }
        }
    },
    computeFaceNormals: function(a) {
        var b, c, f, e, h, j, p = new THREE.Vector3, n = new THREE.Vector3;
        f = 0;
        for (e = this.faces.length; f < e; f++) {
            h = this.faces[f];
            if (a && h.vertexNormals.length) {
                p.set(0, 0, 0);
                b = 0;
                for (c = h.vertexNormals.length; b < c; b++)
                    p.addSelf(h.vertexNormals[b]);
                p.divideScalar(3)
            } else {
                b = this.vertices[h.a];
                c = this.vertices[h.b];
                j = this.vertices[h.c];
                p.sub(j.position, c.position);
                n.sub(b.position, c.position);
                p.crossSelf(n)
            }
            p.isZero() || p.normalize();
            h.normal.copy(p)
        }
    },
    computeVertexNormals: function() {
        var a, b, c, f;
        if (this.__tmpVertices == undefined) {
            f = this.__tmpVertices = Array(this.vertices.length);
            a = 0;
            for (b = this.vertices.length; a < b; a++)
                f[a] = new THREE.Vector3;
            a = 0;
            for (b = this.faces.length; a < b; a++) {
                c = this.faces[a];
                if (c instanceof THREE.Face3)
                    c.vertexNormals = [new THREE.Vector3, new THREE.Vector3, new THREE.Vector3];
                else if (c instanceof THREE.Face4)
                    c.vertexNormals = [new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, new THREE.Vector3]
            }
        } else {
            f = this.__tmpVertices;
            a = 0;
            for (b = this.vertices.length; a < b; a++)
                f[a].set(0, 0, 0)
        }
        a = 0;
        for (b = this.faces.length; a < b; a++) {
            c = this.faces[a];
            if (c instanceof THREE.Face3) {
                f[c.a].addSelf(c.normal);
                f[c.b].addSelf(c.normal);
                f[c.c].addSelf(c.normal)
            } else if (c instanceof THREE.Face4) {
                f[c.a].addSelf(c.normal);
                f[c.b].addSelf(c.normal);
                f[c.c].addSelf(c.normal);
                f[c.d].addSelf(c.normal)
            }
        }
        a = 0;
        for (b = this.vertices.length; a < b; a++)
            f[a].normalize();
        a = 0;
        for (b = this.faces.length; a < b; a++) {
            c = this.faces[a];
            if (c instanceof THREE.Face3) {
                c.vertexNormals[0].copy(f[c.a]);
                c.vertexNormals[1].copy(f[c.b]);
                c.vertexNormals[2].copy(f[c.c])
            } else if (c instanceof THREE.Face4) {
                c.vertexNormals[0].copy(f[c.a]);
                c.vertexNormals[1].copy(f[c.b]);
                c.vertexNormals[2].copy(f[c.c]);
                c.vertexNormals[3].copy(f[c.d])
            }
        }
    },
    computeTangents: function() {
        function a(V, ha, ia, W, S, ta, ka) {
            p = V.vertices[ha].position;
            n = V.vertices[ia].position;
            s = V.vertices[W].position;
            x = j[S];
            z = j[ta];
            C = j[ka];
            y = n.x - p.x;
            J = s.x - p.x;
            K = n.y - p.y;
            P = s.y - p.y;
            L = n.z - p.z;
            ja = s.z - p.z;
            ma = z.u - x.u;
            sa = C.u - x.u;
            U = z.v - x.v;
            A = C.v - x.v;
            oa = 1 / (ma * A - sa * U);
            Q.set((A * y - U * J) * oa, (A * K - U * P) * oa, (A * L - U * ja) * oa);
            N.set((ma * J - sa * y) * oa, (ma * P - sa * K) * oa, (ma * ja - sa * L) * oa);
            Ba[ha].addSelf(Q);
            Ba[ia].addSelf(Q);
            Ba[W].addSelf(Q);
            Ca[ha].addSelf(N);
            Ca[ia].addSelf(N);
            Ca[W].addSelf(N)
        }
        var b, c, f, e, h, j, p, n, s, x, z, C, y, J, K, P, L, ja, ma, sa, U, A, oa, d, Ba = [], Ca = [], Q = new THREE.Vector3, N = new THREE.Vector3, pa = new THREE.Vector3, ya = new THREE.Vector3, Da = new THREE.Vector3;
        b = 0;
        for (c = this.vertices.length; b < c; b++) {
            Ba[b] = new THREE.Vector3;
            Ca[b] = new THREE.Vector3
        }
        b = 0;
        for (c = this.faces.length; b < c; b++) {
            h = this.faces[b];
            j = this.faceVertexUvs[0][b];
            if (h instanceof THREE.Face3)
                a(this, h.a, h.b, h.c, 0, 1, 2);
            else if (h instanceof THREE.Face4) {
                a(this, h.a, h.b, h.c, 0, 1, 2);
                a(this, h.a, h.b, h.d, 0, 1, 3)
            }
        }
        var qa = ["a", "b", "c", "d"];
        b = 0;
        for (c = this.faces.length; b < c; b++) {
            h = this.faces[b];
            for (f = 0; f < h.vertexNormals.length; f++) {
                Da.copy(h.vertexNormals[f]);
                e = h[qa[f]];
                d = Ba[e];
                pa.copy(d);
                pa.subSelf(Da.multiplyScalar(Da.dot(d))).normalize();
                ya.cross(h.vertexNormals[f], d);
                e = ya.dot(Ca[e]);
                e = e < 0 ? -1 : 1;
                h.vertexTangents[f] = new THREE.Vector4(pa.x,pa.y,pa.z,e)
            }
        }
        this.hasTangents = !0
    },
    computeBoundingBox: function() {
        var a;
        if (this.vertices.length > 0) {
            this.boundingBox = {
                x: [this.vertices[0].position.x, this.vertices[0].position.x],
                y: [this.vertices[0].position.y, this.vertices[0].position.y],
                z: [this.vertices[0].position.z, this.vertices[0].position.z]
            };
            for (var b = 1, c = this.vertices.length; b < c; b++) {
                a = this.vertices[b];
                if (a.position.x < this.boundingBox.x[0])
                    this.boundingBox.x[0] = a.position.x;
                else if (a.position.x > this.boundingBox.x[1])
                    this.boundingBox.x[1] = a.position.x;
                if (a.position.y < this.boundingBox.y[0])
                    this.boundingBox.y[0] = a.position.y;
                else if (a.position.y > this.boundingBox.y[1])
                    this.boundingBox.y[1] = a.position.y;
                if (a.position.z < this.boundingBox.z[0])
                    this.boundingBox.z[0] = a.position.z;
                else if (a.position.z > this.boundingBox.z[1])
                    this.boundingBox.z[1] = a.position.z
            }
        }
    },
    computeBoundingSphere: function() {
        for (var a = this.boundingSphere === null ? 0 : this.boundingSphere.radius, b = 0, c = this.vertices.length; b < c; b++)
            a = Math.max(a, this.vertices[b].position.length());
        this.boundingSphere = {
            radius: a
        }
    }
};
THREE.GeometryIdCounter = 0;
THREE.AnimationHandler = function() {
    var a = []
      , b = {}
      , c = {};
    c.update = function(e) {
        for (var h = 0; h < a.length; h++)
            a[h].update(e)
    }
    ;
    c.addToUpdate = function(e) {
        a.indexOf(e) === -1 && a.push(e)
    }
    ;
    c.removeFromUpdate = function(e) {
        e = a.indexOf(e);
        e !== -1 && a.splice(e, 1)
    }
    ;
    c.add = function(e) {
        b[e.name] !== undefined && console.log("THREE.AnimationHandler.add: Warning! " + e.name + " already exists in library. Overwriting.");
        b[e.name] = e;
        if (e.initialized !== !0) {
            for (var h = 0; h < e.hierarchy.length; h++) {
                for (var j = 0; j < e.hierarchy[h].keys.length; j++) {
                    if (e.hierarchy[h].keys[j].time < 0)
                        e.hierarchy[h].keys[j].time = 0;
                    if (e.hierarchy[h].keys[j].rot !== undefined && !(e.hierarchy[h].keys[j].rot instanceof THREE.Quaternion)) {
                        var p = e.hierarchy[h].keys[j].rot;
                        e.hierarchy[h].keys[j].rot = new THREE.Quaternion(p[0],p[1],p[2],p[3])
                    }
                }
                if (e.hierarchy[h].keys[0].morphTargets !== undefined) {
                    p = {};
                    for (j = 0; j < e.hierarchy[h].keys.length; j++)
                        for (var n = 0; n < e.hierarchy[h].keys[j].morphTargets.length; n++) {
                            var s = e.hierarchy[h].keys[j].morphTargets[n];
                            p[s] = -1
                        }
                    e.hierarchy[h].usedMorphTargets = p;
                    for (j = 0; j < e.hierarchy[h].keys.length; j++) {
                        var x = {};
                        for (s in p) {
                            for (n = 0; n < e.hierarchy[h].keys[j].morphTargets.length; n++)
                                if (e.hierarchy[h].keys[j].morphTargets[n] === s) {
                                    x[s] = e.hierarchy[h].keys[j].morphTargetsInfluences[n];
                                    break
                                }
                            n === e.hierarchy[h].keys[j].morphTargets.length && (x[s] = 0)
                        }
                        e.hierarchy[h].keys[j].morphTargetsInfluences = x
                    }
                }
                for (j = 1; j < e.hierarchy[h].keys.length; j++)
                    if (e.hierarchy[h].keys[j].time === e.hierarchy[h].keys[j - 1].time) {
                        e.hierarchy[h].keys.splice(j, 1);
                        j--
                    }
                for (j = 1; j < e.hierarchy[h].keys.length; j++)
                    e.hierarchy[h].keys[j].index = j
            }
            j = parseInt(e.length * e.fps, 10);
            e.JIT = {};
            e.JIT.hierarchy = [];
            for (h = 0; h < e.hierarchy.length; h++)
                e.JIT.hierarchy.push(Array(j));
            e.initialized = !0
        }
    }
    ;
    c.get = function(e) {
        if (typeof e === "string")
            if (b[e])
                return b[e];
            else {
                console.log("THREE.AnimationHandler.get: Couldn't find animation " + e);
                return null
            }
    }
    ;
    c.parse = function(e) {
        var h = [];
        if (e instanceof THREE.SkinnedMesh)
            for (var j = 0; j < e.bones.length; j++)
                h.push(e.bones[j]);
        else
            f(e, h);
        return h
    }
    ;
    var f = function(e, h) {
        h.push(e);
        for (var j = 0; j < e.children.length; j++)
            f(e.children[j], h)
    };
    c.LINEAR = 0;
    c.CATMULLROM = 1;
    c.CATMULLROM_FORWARD = 2;
    return c
}();
THREE.Animation = function(a, b, c, f) {
    this.root = a;
    this.data = THREE.AnimationHandler.get(b);
    this.hierarchy = THREE.AnimationHandler.parse(a);
    this.currentTime = 0;
    this.timeScale = 1;
    this.isPlaying = !1;
    this.isPaused = !0;
    this.loop = !0;
    this.interpolationType = c !== undefined ? c : THREE.AnimationHandler.LINEAR;
    this.JITCompile = f !== undefined ? f : !0;
    this.points = [];
    this.target = new THREE.Vector3
}
;
THREE.Animation.prototype.play = function(a, b) {
    if (!this.isPlaying) {
        this.isPlaying = !0;
        this.loop = a !== undefined ? a : !0;
        this.currentTime = b !== undefined ? b : 0;
        var c, f = this.hierarchy.length, e;
        for (c = 0; c < f; c++) {
            e = this.hierarchy[c];
            if (this.interpolationType !== THREE.AnimationHandler.CATMULLROM_FORWARD)
                e.useQuaternion = !0;
            e.matrixAutoUpdate = !0;
            if (e.animationCache === undefined) {
                e.animationCache = {};
                e.animationCache.prevKey = {
                    pos: 0,
                    rot: 0,
                    scl: 0
                };
                e.animationCache.nextKey = {
                    pos: 0,
                    rot: 0,
                    scl: 0
                };
                e.animationCache.originalMatrix = e instanceof THREE.Bone ? e.skinMatrix : e.matrix
            }
            var h = e.animationCache.prevKey;
            e = e.animationCache.nextKey;
            h.pos = this.data.hierarchy[c].keys[0];
            h.rot = this.data.hierarchy[c].keys[0];
            h.scl = this.data.hierarchy[c].keys[0];
            e.pos = this.getNextKeyWith("pos", c, 1);
            e.rot = this.getNextKeyWith("rot", c, 1);
            e.scl = this.getNextKeyWith("scl", c, 1)
        }
        this.update(0)
    }
    this.isPaused = !1;
    THREE.AnimationHandler.addToUpdate(this)
}
;
THREE.Animation.prototype.pause = function() {
    this.isPaused ? THREE.AnimationHandler.addToUpdate(this) : THREE.AnimationHandler.removeFromUpdate(this);
    this.isPaused = !this.isPaused
}
;
THREE.Animation.prototype.stop = function() {
    this.isPlaying = !1;
    this.isPaused = !1;
    THREE.AnimationHandler.removeFromUpdate(this);
    for (var a = 0; a < this.hierarchy.length; a++)
        if (this.hierarchy[a].animationCache !== undefined) {
            if (this.hierarchy[a]instanceof THREE.Bone)
                this.hierarchy[a].skinMatrix = this.hierarchy[a].animationCache.originalMatrix;
            else
                this.hierarchy[a].matrix = this.hierarchy[a].animationCache.originalMatrix;
            delete this.hierarchy[a].animationCache
        }
}
;
THREE.Animation.prototype.update = function(a) {
    if (this.isPlaying) {
        var b = ["pos", "rot", "scl"], c, f, e, h, j, p, n, s, x = this.data.JIT.hierarchy, z, C;
        this.currentTime += a * this.timeScale;
        C = this.currentTime;
        z = this.currentTime %= this.data.length;
        s = parseInt(Math.min(z * this.data.fps, this.data.length * this.data.fps), 10);
        for (var y = 0, J = this.hierarchy.length; y < J; y++) {
            a = this.hierarchy[y];
            n = a.animationCache;
            if (this.JITCompile && x[y][s] !== undefined)
                if (a instanceof THREE.Bone) {
                    a.skinMatrix = x[y][s];
                    a.matrixAutoUpdate = !1;
                    a.matrixWorldNeedsUpdate = !1
                } else {
                    a.matrix = x[y][s];
                    a.matrixAutoUpdate = !1;
                    a.matrixWorldNeedsUpdate = !0
                }
            else {
                if (this.JITCompile)
                    if (a instanceof THREE.Bone)
                        a.skinMatrix = a.animationCache.originalMatrix;
                    else
                        a.matrix = a.animationCache.originalMatrix;
                for (var K = 0; K < 3; K++) {
                    c = b[K];
                    j = n.prevKey[c];
                    p = n.nextKey[c];
                    if (p.time <= C) {
                        if (z < C)
                            if (this.loop) {
                                j = this.data.hierarchy[y].keys[0];
                                for (p = this.getNextKeyWith(c, y, 1); p.time < z; ) {
                                    j = p;
                                    p = this.getNextKeyWith(c, y, p.index + 1)
                                }
                            } else {
                                this.stop();
                                return
                            }
                        else {
                            do {
                                j = p;
                                p = this.getNextKeyWith(c, y, p.index + 1)
                            } while (p.time < z)
                        }
                        n.prevKey[c] = j;
                        n.nextKey[c] = p
                    }
                    a.matrixAutoUpdate = !0;
                    a.matrixWorldNeedsUpdate = !0;
                    f = (z - j.time) / (p.time - j.time);
                    e = j[c];
                    h = p[c];
                    if (f < 0 || f > 1) {
                        console.log("THREE.Animation.update: Warning! Scale out of bounds:" + f + " on bone " + y);
                        f = f < 0 ? 0 : 1
                    }
                    if (c === "pos") {
                        c = a.position;
                        if (this.interpolationType === THREE.AnimationHandler.LINEAR) {
                            c.x = e[0] + (h[0] - e[0]) * f;
                            c.y = e[1] + (h[1] - e[1]) * f;
                            c.z = e[2] + (h[2] - e[2]) * f
                        } else if (this.interpolationType === THREE.AnimationHandler.CATMULLROM || this.interpolationType === THREE.AnimationHandler.CATMULLROM_FORWARD) {
                            this.points[0] = this.getPrevKeyWith("pos", y, j.index - 1).pos;
                            this.points[1] = e;
                            this.points[2] = h;
                            this.points[3] = this.getNextKeyWith("pos", y, p.index + 1).pos;
                            f = f * 0.33 + 0.33;
                            e = this.interpolateCatmullRom(this.points, f);
                            c.x = e[0];
                            c.y = e[1];
                            c.z = e[2];
                            if (this.interpolationType === THREE.AnimationHandler.CATMULLROM_FORWARD) {
                                f = this.interpolateCatmullRom(this.points, f * 1.01);
                                this.target.set(f[0], f[1], f[2]);
                                this.target.subSelf(c);
                                this.target.y = 0;
                                this.target.normalize();
                                f = Math.atan2(this.target.x, this.target.z);
                                a.rotation.set(0, f, 0)
                            }
                        }
                    } else if (c === "rot")
                        THREE.Quaternion.slerp(e, h, a.quaternion, f);
                    else if (c === "scl") {
                        c = a.scale;
                        c.x = e[0] + (h[0] - e[0]) * f;
                        c.y = e[1] + (h[1] - e[1]) * f;
                        c.z = e[2] + (h[2] - e[2]) * f
                    }
                }
            }
        }
        if (this.JITCompile && x[0][s] === undefined) {
            this.hierarchy[0].update(undefined, !0);
            for (y = 0; y < this.hierarchy.length; y++)
                x[y][s] = this.hierarchy[y]instanceof THREE.Bone ? this.hierarchy[y].skinMatrix.clone() : this.hierarchy[y].matrix.clone()
        }
    }
}
;
THREE.Animation.prototype.interpolateCatmullRom = function(a, b) {
    var c = [], f = [], e, h, j, p, n, s;
    e = (a.length - 1) * b;
    h = Math.floor(e);
    e -= h;
    c[0] = h == 0 ? h : h - 1;
    c[1] = h;
    c[2] = h > a.length - 2 ? h : h + 1;
    c[3] = h > a.length - 3 ? h : h + 2;
    h = a[c[0]];
    p = a[c[1]];
    n = a[c[2]];
    s = a[c[3]];
    c = e * e;
    j = e * c;
    f[0] = this.interpolate(h[0], p[0], n[0], s[0], e, c, j);
    f[1] = this.interpolate(h[1], p[1], n[1], s[1], e, c, j);
    f[2] = this.interpolate(h[2], p[2], n[2], s[2], e, c, j);
    return f
}
;
THREE.Animation.prototype.interpolate = function(a, b, c, f, e, h, j) {
    a = (c - a) * 0.5;
    f = (f - b) * 0.5;
    return (2 * (b - c) + a + f) * j + (-3 * (b - c) - 2 * a - f) * h + a * e + b
}
;
THREE.Animation.prototype.getNextKeyWith = function(a, b, c) {
    var f = this.data.hierarchy[b].keys;
    if (this.interpolationType === THREE.AnimationHandler.CATMULLROM || this.interpolationType === THREE.AnimationHandler.CATMULLROM_FORWARD)
        c = c < f.length - 1 ? c : f.length - 1;
    else
        c %= f.length;
    for (; c < f.length; c++)
        if (f[c][a] !== undefined)
            return f[c];
    return this.data.hierarchy[b].keys[0]
}
;
THREE.Animation.prototype.getPrevKeyWith = function(a, b, c) {
    var f = this.data.hierarchy[b].keys;
    for (c = this.interpolationType === THREE.AnimationHandler.CATMULLROM || this.interpolationType === THREE.AnimationHandler.CATMULLROM_FORWARD ? c > 0 ? c : 0 : c >= 0 ? c : c + f.length; c >= 0; c--)
        if (f[c][a] !== undefined)
            return f[c];
    return this.data.hierarchy[b].keys[f.length - 1]
}
;
THREE.Camera = function(a, b, c, f, e) {
    THREE.Object3D.call(this);
    this.fov = a || 50;
    this.aspect = b || 1;
    this.near = c || 0.1;
    this.far = f || 2E3;
    this.target = e || new THREE.Object3D;
    this.useTarget = !0;
    this.matrixWorldInverse = new THREE.Matrix4;
    this.projectionMatrix = null;
    this.updateProjectionMatrix()
}
;
THREE.Camera.prototype = new THREE.Object3D;
THREE.Camera.prototype.constructor = THREE.Camera;
THREE.Camera.prototype.supr = THREE.Object3D.prototype;
THREE.Camera.prototype.translate = function(a, b) {
    this.matrix.rotateAxis(b);
    this.position.addSelf(b.multiplyScalar(a));
    this.target.position.addSelf(b.multiplyScalar(a))
}
;
THREE.Camera.prototype.updateProjectionMatrix = function() {
    this.projectionMatrix = THREE.Matrix4.makePerspective(this.fov, this.aspect, this.near, this.far)
}
;
THREE.Camera.prototype.updateMatrix = function() {
    this.update(undefined, !0)
}
;
THREE.Camera.prototype.update = function(a, b, c) {
    if (this.useTarget) {
        this.matrix.lookAt(this.position, this.target.position, this.up);
        this.matrix.setPosition(this.position);
        a ? this.matrixWorld.multiply(a, this.matrix) : this.matrixWorld.copy(this.matrix);
        THREE.Matrix4.makeInvert(this.matrixWorld, this.matrixWorldInverse);
        b = !0
    } else {
        this.matrixAutoUpdate && (b |= this.updateMatrix());
        if (b || this.matrixWorldNeedsUpdate) {
            a ? this.matrixWorld.multiply(a, this.matrix) : this.matrixWorld.copy(this.matrix);
            this.matrixWorldNeedsUpdate = !1;
            b = !0;
            THREE.Matrix4.makeInvert(this.matrixWorld, this.matrixWorldInverse)
        }
    }
    for (a = 0; a < this.children.length; a++)
        this.children[a].update(this.matrixWorld, b, c)
}
;
THREE.Light = function(a) {
    THREE.Object3D.call(this);
    this.color = new THREE.Color(a)
}
;
THREE.Light.prototype = new THREE.Object3D;
THREE.Light.prototype.constructor = THREE.Light;
THREE.Light.prototype.supr = THREE.Object3D.prototype;
THREE.AmbientLight = function(a) {
    THREE.Light.call(this, a)
}
;
THREE.AmbientLight.prototype = new THREE.Light;
THREE.AmbientLight.prototype.constructor = THREE.AmbientLight;
THREE.DirectionalLight = function(a, b) {
    THREE.Light.call(this, a);
    this.position = new THREE.Vector3(0,1,0);
    this.intensity = b || 1
}
;
THREE.DirectionalLight.prototype = new THREE.Light;
THREE.DirectionalLight.prototype.constructor = THREE.DirectionalLight;
THREE.PointLight = function(a, b) {
    THREE.Light.call(this, a);
    this.position = new THREE.Vector3;
    this.intensity = b || 1
}
;
THREE.PointLight.prototype = new THREE.Light;
THREE.PointLight.prototype.constructor = THREE.PointLight;
THREE.NoShading = 0;
THREE.FlatShading = 1;
THREE.SmoothShading = 2;
THREE.NoColors = 0;
THREE.FaceColors = 1;
THREE.VertexColors = 2;
THREE.NormalBlending = 0;
THREE.AdditiveBlending = 1;
THREE.SubtractiveBlending = 2;
THREE.BillboardBlending = 3;
THREE.ReverseSubtractiveBlending = 4;
THREE.MaterialCounter = {
    value: 0
};
THREE.CubeReflectionMapping = function() {}
;
THREE.CubeRefractionMapping = function() {}
;
THREE.LatitudeReflectionMapping = function() {}
;
THREE.LatitudeRefractionMapping = function() {}
;
THREE.SphericalReflectionMapping = function() {}
;
THREE.SphericalRefractionMapping = function() {}
;
THREE.UVMapping = function() {}
;
THREE.LineBasicMaterial = function(a) {
    this.id = THREE.MaterialCounter.value++;
    this.color = new THREE.Color(16777215);
    this.opacity = 1;
    this.blending = THREE.NormalBlending;
    this.depthTest = !0;
    this.linewidth = 1;
    this.linejoin = this.linecap = "round";
    this.vertexColors = !1;
    if (a) {
        a.color !== undefined && this.color.setHex(a.color);
        if (a.opacity !== undefined)
            this.opacity = a.opacity;
        if (a.blending !== undefined)
            this.blending = a.blending;
        if (a.depthTest !== undefined)
            this.depthTest = a.depthTest;
        if (a.linewidth !== undefined)
            this.linewidth = a.linewidth;
        if (a.linecap !== undefined)
            this.linecap = a.linecap;
        if (a.linejoin !== undefined)
            this.linejoin = a.linejoin;
        if (a.vertexColors !== undefined)
            this.vertexColors = a.vertexColors
    }
}
;
THREE.MeshBasicMaterial = function(a) {
    this.id = THREE.MaterialCounter.value++;
    this.color = new THREE.Color(16777215);
    this.opacity = 1;
    this.envMap = this.lightMap = this.map = null;
    this.combine = THREE.MultiplyOperation;
    this.reflectivity = 1;
    this.refractionRatio = 0.98;
    this.fog = !0;
    this.shading = THREE.SmoothShading;
    this.blending = THREE.NormalBlending;
    this.depthTest = !0;
    this.wireframe = !1;
    this.wireframeLinewidth = 1;
    this.wireframeLinejoin = this.wireframeLinecap = "round";
    this.vertexColors = !1;
    this.skinning = !1;
    this.morphTargets = !1;
    if (a) {
        a.color !== undefined && this.color.setHex(a.color);
        if (a.opacity !== undefined)
            this.opacity = a.opacity;
        if (a.map !== undefined)
            this.map = a.map;
        if (a.lightMap !== undefined)
            this.lightMap = a.lightMap;
        if (a.envMap !== undefined)
            this.envMap = a.envMap;
        if (a.combine !== undefined)
            this.combine = a.combine;
        if (a.reflectivity !== undefined)
            this.reflectivity = a.reflectivity;
        if (a.refractionRatio !== undefined)
            this.refractionRatio = a.refractionRatio;
        if (a.fog !== undefined)
            this.fog = a.fog;
        if (a.shading !== undefined)
            this.shading = a.shading;
        if (a.blending !== undefined)
            this.blending = a.blending;
        if (a.depthTest !== undefined)
            this.depthTest = a.depthTest;
        if (a.wireframe !== undefined)
            this.wireframe = a.wireframe;
        if (a.wireframeLinewidth !== undefined)
            this.wireframeLinewidth = a.wireframeLinewidth;
        if (a.wireframeLinecap !== undefined)
            this.wireframeLinecap = a.wireframeLinecap;
        if (a.wireframeLinejoin !== undefined)
            this.wireframeLinejoin = a.wireframeLinejoin;
        if (a.vertexColors !== undefined)
            this.vertexColors = a.vertexColors;
        if (a.skinning !== undefined)
            this.skinning = a.skinning;
        if (a.morphTargets !== undefined)
            this.morphTargets = a.morphTargets
    }
}
;
THREE.MeshLambertMaterial = function(a) {
    this.id = THREE.MaterialCounter.value++;
    this.color = new THREE.Color(16777215);
    this.opacity = 1;
    this.envMap = this.lightMap = this.map = null;
    this.combine = THREE.MultiplyOperation;
    this.reflectivity = 1;
    this.refractionRatio = 0.98;
    this.fog = !0;
    this.shading = THREE.SmoothShading;
    this.blending = THREE.NormalBlending;
    this.depthTest = !0;
    this.wireframe = !1;
    this.wireframeLinewidth = 1;
    this.wireframeLinejoin = this.wireframeLinecap = "round";
    this.vertexColors = !1;
    this.skinning = !1;
    this.morphTargets = !1;
    if (a) {
        a.color !== undefined && this.color.setHex(a.color);
        if (a.opacity !== undefined)
            this.opacity = a.opacity;
        if (a.map !== undefined)
            this.map = a.map;
        if (a.lightMap !== undefined)
            this.lightMap = a.lightMap;
        if (a.envMap !== undefined)
            this.envMap = a.envMap;
        if (a.combine !== undefined)
            this.combine = a.combine;
        if (a.reflectivity !== undefined)
            this.reflectivity = a.reflectivity;
        if (a.refractionRatio !== undefined)
            this.refractionRatio = a.refractionRatio;
        if (a.fog !== undefined)
            this.fog = a.fog;
        if (a.shading !== undefined)
            this.shading = a.shading;
        if (a.blending !== undefined)
            this.blending = a.blending;
        if (a.depthTest !== undefined)
            this.depthTest = a.depthTest;
        if (a.wireframe !== undefined)
            this.wireframe = a.wireframe;
        if (a.wireframeLinewidth !== undefined)
            this.wireframeLinewidth = a.wireframeLinewidth;
        if (a.wireframeLinecap !== undefined)
            this.wireframeLinecap = a.wireframeLinecap;
        if (a.wireframeLinejoin !== undefined)
            this.wireframeLinejoin = a.wireframeLinejoin;
        if (a.vertexColors !== undefined)
            this.vertexColors = a.vertexColors;
        if (a.skinning !== undefined)
            this.skinning = a.skinning;
        if (a.morphTargets !== undefined)
            this.morphTargets = a.morphTargets
    }
}
;
THREE.MeshPhongMaterial = function(a) {
    this.id = THREE.MaterialCounter.value++;
    this.color = new THREE.Color(16777215);
    this.ambient = new THREE.Color(328965);
    this.specular = new THREE.Color(1118481);
    this.shininess = 30;
    this.opacity = 1;
    this.envMap = this.lightMap = this.map = null;
    this.combine = THREE.MultiplyOperation;
    this.reflectivity = 1;
    this.refractionRatio = 0.98;
    this.fog = !0;
    this.shading = THREE.SmoothShading;
    this.blending = THREE.NormalBlending;
    this.depthTest = !0;
    this.wireframe = !1;
    this.wireframeLinewidth = 1;
    this.wireframeLinejoin = this.wireframeLinecap = "round";
    this.vertexColors = !1;
    this.skinning = !1;
    this.morphTargets = !1;
    if (a) {
        if (a.color !== undefined)
            this.color = new THREE.Color(a.color);
        if (a.ambient !== undefined)
            this.ambient = new THREE.Color(a.ambient);
        if (a.specular !== undefined)
            this.specular = new THREE.Color(a.specular);
        if (a.shininess !== undefined)
            this.shininess = a.shininess;
        if (a.opacity !== undefined)
            this.opacity = a.opacity;
        if (a.lightMap !== undefined)
            this.lightMap = a.lightMap;
        if (a.map !== undefined)
            this.map = a.map;
        if (a.envMap !== undefined)
            this.envMap = a.envMap;
        if (a.combine !== undefined)
            this.combine = a.combine;
        if (a.reflectivity !== undefined)
            this.reflectivity = a.reflectivity;
        if (a.refractionRatio !== undefined)
            this.refractionRatio = a.refractionRatio;
        if (a.fog !== undefined)
            this.fog = a.fog;
        if (a.shading !== undefined)
            this.shading = a.shading;
        if (a.blending !== undefined)
            this.blending = a.blending;
        if (a.depthTest !== undefined)
            this.depthTest = a.depthTest;
        if (a.wireframe !== undefined)
            this.wireframe = a.wireframe;
        if (a.wireframeLinewidth !== undefined)
            this.wireframeLinewidth = a.wireframeLinewidth;
        if (a.wireframeLinecap !== undefined)
            this.wireframeLinecap = a.wireframeLinecap;
        if (a.wireframeLinejoin !== undefined)
            this.wireframeLinejoin = a.wireframeLinejoin;
        if (a.vertexColors !== undefined)
            this.vertexColors = a.vertexColors;
        if (a.skinning !== undefined)
            this.skinning = a.skinning;
        if (a.morphTargets !== undefined)
            this.morphTargets = a.morphTargets
    }
}
;
THREE.MeshDepthMaterial = function(a) {
    this.id = THREE.MaterialCounter.value++;
    this.opacity = 1;
    this.shading = THREE.SmoothShading;
    this.blending = THREE.NormalBlending;
    this.depthTest = !0;
    this.wireframe = !1;
    this.wireframeLinewidth = 1;
    if (a) {
        if (a.opacity !== undefined)
            this.opacity = a.opacity;
        if (a.shading !== undefined)
            this.shading = a.shading;
        if (a.blending !== undefined)
            this.blending = a.blending;
        if (a.depthTest !== undefined)
            this.depthTest = a.depthTest;
        if (a.wireframe !== undefined)
            this.wireframe = a.wireframe;
        if (a.wireframeLinewidth !== undefined)
            this.wireframeLinewidth = a.wireframeLinewidth
    }
}
;
THREE.MeshNormalMaterial = function(a) {
    this.id = THREE.MaterialCounter.value++;
    this.opacity = 1;
    this.shading = THREE.FlatShading;
    this.blending = THREE.NormalBlending;
    this.depthTest = !0;
    this.wireframe = !1;
    this.wireframeLinewidth = 1;
    if (a) {
        if (a.opacity !== undefined)
            this.opacity = a.opacity;
        if (a.shading !== undefined)
            this.shading = a.shading;
        if (a.blending !== undefined)
            this.blending = a.blending;
        if (a.depthTest !== undefined)
            this.depthTest = a.depthTest;
        if (a.wireframe !== undefined)
            this.wireframe = a.wireframe;
        if (a.wireframeLinewidth !== undefined)
            this.wireframeLinewidth = a.wireframeLinewidth
    }
}
;
THREE.MeshFaceMaterial = function() {}
;
THREE.MeshShaderMaterial = function(a) {
    this.id = THREE.MaterialCounter.value++;
    this.vertexShader = this.fragmentShader = "void main() {}";
    this.uniforms = {};
    this.opacity = 1;
    this.shading = THREE.SmoothShading;
    this.blending = THREE.NormalBlending;
    this.depthTest = !0;
    this.wireframe = !1;
    this.wireframeLinewidth = 1;
    this.wireframeLinejoin = this.wireframeLinecap = "round";
    this.lights = !1;
    this.vertexColors = !1;
    this.skinning = !1;
    this.morphTargets = !1;
    if (a) {
        if (a.fragmentShader !== undefined)
            this.fragmentShader = a.fragmentShader;
        if (a.vertexShader !== undefined)
            this.vertexShader = a.vertexShader;
        if (a.uniforms !== undefined)
            this.uniforms = a.uniforms;
        if (a.opacity !== undefined)
            this.opacity = a.opacity;
        if (a.shading !== undefined)
            this.shading = a.shading;
        if (a.blending !== undefined)
            this.blending = a.blending;
        if (a.depthTest !== undefined)
            this.depthTest = a.depthTest;
        if (a.wireframe !== undefined)
            this.wireframe = a.wireframe;
        if (a.wireframeLinewidth !== undefined)
            this.wireframeLinewidth = a.wireframeLinewidth;
        if (a.wireframeLinecap !== undefined)
            this.wireframeLinecap = a.wireframeLinecap;
        if (a.wireframeLinejoin !== undefined)
            this.wireframeLinejoin = a.wireframeLinejoin;
        if (a.lights !== undefined)
            this.lights = a.lights;
        if (a.vertexColors !== undefined)
            this.vertexColors = a.vertexColors;
        if (a.skinning !== undefined)
            this.skinning = a.skinning;
        if (a.morphTargets !== undefined)
            this.morphTargets = a.morphTargets
    }
}
;
THREE.ParticleBasicMaterial = function(a) {
    this.id = THREE.MaterialCounter.value++;
    this.color = new THREE.Color(16777215);
    this.opacity = 1;
    this.map = null;
    this.size = 1;
    this.sizeAttenuation = !0;
    this.blending = THREE.NormalBlending;
    this.depthTest = !0;
    this.offset = new THREE.Vector2;
    this.vertexColors = !1;
    if (a) {
        a.color !== undefined && this.color.setHex(a.color);
        if (a.opacity !== undefined)
            this.opacity = a.opacity;
        if (a.map !== undefined)
            this.map = a.map;
        if (a.size !== undefined)
            this.size = a.size;
        if (a.sizeAttenuation !== undefined)
            this.sizeAttenuation = a.sizeAttenuation;
        if (a.blending !== undefined)
            this.blending = a.blending;
        if (a.depthTest !== undefined)
            this.depthTest = a.depthTest;
        if (a.vertexColors !== undefined)
            this.vertexColors = a.vertexColors
    }
}
;
THREE.Texture = function(a, b, c, f, e, h) {
    this.image = a;
    this.mapping = b !== undefined ? b : new THREE.UVMapping;
    this.wrapS = c !== undefined ? c : THREE.ClampToEdgeWrapping;
    this.wrapT = f !== undefined ? f : THREE.ClampToEdgeWrapping;
    this.magFilter = e !== undefined ? e : THREE.LinearFilter;
    this.minFilter = h !== undefined ? h : THREE.LinearMipMapLinearFilter;
    this.needsUpdate = !1
}
;
THREE.Texture.prototype = {
    clone: function() {
        return new THREE.Texture(this.image,this.mapping,this.wrapS,this.wrapT,this.magFilter,this.minFilter)
    }
};
THREE.MultiplyOperation = 0;
THREE.MixOperation = 1;
THREE.RepeatWrapping = 0;
THREE.ClampToEdgeWrapping = 1;
THREE.MirroredRepeatWrapping = 2;
THREE.NearestFilter = 3;
THREE.NearestMipMapNearestFilter = 4;
THREE.NearestMipMapLinearFilter = 5;
THREE.LinearFilter = 6;
THREE.LinearMipMapNearestFilter = 7;
THREE.LinearMipMapLinearFilter = 8;
THREE.ByteType = 9;
THREE.UnsignedByteType = 10;
THREE.ShortType = 11;
THREE.UnsignedShortType = 12;
THREE.IntType = 13;
THREE.UnsignedIntType = 14;
THREE.FloatType = 15;
THREE.AlphaFormat = 16;
THREE.RGBFormat = 17;
THREE.RGBAFormat = 18;
THREE.LuminanceFormat = 19;
THREE.LuminanceAlphaFormat = 20;
THREE.RenderTarget = function(a, b, c) {
    this.width = a;
    this.height = b;
    c = c || {};
    this.wrapS = c.wrapS !== undefined ? c.wrapS : THREE.ClampToEdgeWrapping;
    this.wrapT = c.wrapT !== undefined ? c.wrapT : THREE.ClampToEdgeWrapping;
    this.magFilter = c.magFilter !== undefined ? c.magFilter : THREE.LinearFilter;
    this.minFilter = c.minFilter !== undefined ? c.minFilter : THREE.LinearMipMapLinearFilter;
    this.format = c.format !== undefined ? c.format : THREE.RGBFormat;
    this.type = c.type !== undefined ? c.type : THREE.UnsignedByteType
}
;
var Uniforms = {
    clone: function(a) {
        var b, c, f, e = {};
        for (b in a) {
            e[b] = {};
            for (c in a[b]) {
                f = a[b][c];
                e[b][c] = f instanceof THREE.Color || f instanceof THREE.Vector3 || f instanceof THREE.Texture ? f.clone() : f
            }
        }
        return e
    },
    merge: function(a) {
        var b, c, f, e = {};
        for (b = 0; b < a.length; b++) {
            f = this.clone(a[b]);
            for (c in f)
                e[c] = f[c]
        }
        return e
    }
};
THREE.Particle = function(a) {
    THREE.Object3D.call(this);
    this.materials = a instanceof Array ? a : [a];
    this.matrixAutoUpdate = !1
}
;
THREE.Particle.prototype = new THREE.Object3D;
THREE.Particle.prototype.constructor = THREE.Particle;
THREE.ParticleSystem = function(a, b) {
    THREE.Object3D.call(this);
    this.geometry = a;
    this.materials = b instanceof Array ? b : [b];
    this.sortParticles = !1
}
;
THREE.ParticleSystem.prototype = new THREE.Object3D;
THREE.ParticleSystem.prototype.constructor = THREE.ParticleSystem;
THREE.Line = function(a, b, c) {
    THREE.Object3D.call(this);
    this.geometry = a;
    this.materials = b instanceof Array ? b : [b];
    this.type = c != undefined ? c : THREE.LineStrip
}
;
THREE.LineStrip = 0;
THREE.LinePieces = 1;
THREE.Line.prototype = new THREE.Object3D;
THREE.Line.prototype.constructor = THREE.Line;
THREE.Mesh = function(a, b) {
    THREE.Object3D.call(this);
    this.geometry = a;
    this.materials = b && b.length ? b : [b];
    this.flipSided = !1;
    this.doubleSided = !1;
    this.overdraw = !1;
    if (this.geometry) {
        this.geometry.boundingSphere || this.geometry.computeBoundingSphere();
        this.boundRadius = a.boundingSphere.radius;
        if (this.geometry.morphTargets.length) {
            this.morphTargetBase = -1;
            this.morphTargetForcedOrder = [];
            this.morphTargetInfluences = [];
            this.morphTargetDictionary = {};
            for (var c = 0; c < this.geometry.morphTargets.length; c++) {
                this.morphTargetInfluences.push(0);
                this.morphTargetDictionary[this.geometry.morphTargets[c].name] = c
            }
        }
    }
}
;
THREE.Mesh.prototype = new THREE.Object3D;
THREE.Mesh.prototype.constructor = THREE.Mesh;
THREE.Mesh.prototype.supr = THREE.Object3D.prototype;
THREE.Mesh.prototype.getMorphTargetIndexByName = function(a) {
    if (this.morphTargetDictionary[a] !== undefined)
        return this.morphTargetDictionary[a];
    console.log("THREE.Mesh.getMorphTargetIndexByName: morph target " + a + " does not exist. Returning 0.");
    return 0
}
;
THREE.Bone = function(a) {
    THREE.Object3D.call(this);
    this.skin = a;
    this.skinMatrix = new THREE.Matrix4;
    this.hasNoneBoneChildren = !1
}
;
THREE.Bone.prototype = new THREE.Object3D;
THREE.Bone.prototype.constructor = THREE.Bone;
THREE.Bone.prototype.supr = THREE.Object3D.prototype;
THREE.Bone.prototype.update = function(a, b, c) {
    this.matrixAutoUpdate && (b |= this.updateMatrix());
    if (b || this.matrixWorldNeedsUpdate) {
        a ? this.skinMatrix.multiply(a, this.matrix) : this.skinMatrix.copy(this.matrix);
        this.matrixWorldNeedsUpdate = !1;
        b = !0
    }
    var f, e = this.children.length;
    if (this.hasNoneBoneChildren) {
        this.matrixWorld.multiply(this.skin.matrixWorld, this.skinMatrix);
        for (f = 0; f < e; f++) {
            a = this.children[f];
            a instanceof THREE.Bone ? a.update(this.skinMatrix, b, c) : a.update(this.matrixWorld, !0, c)
        }
    } else
        for (f = 0; f < e; f++)
            this.children[f].update(this.skinMatrix, b, c)
}
;
THREE.Bone.prototype.addChild = function(a) {
    if (this.children.indexOf(a) === -1) {
        a.parent !== undefined && a.parent.removeChild(a);
        a.parent = this;
        this.children.push(a);
        if (!(a instanceof THREE.Bone))
            this.hasNoneBoneChildren = !0
    }
}
;
if (!window.Float32Array)
    window.Float32Array = Array;
THREE.SkinnedMesh = function(a, b) {
    THREE.Mesh.call(this, a, b);
    this.identityMatrix = new THREE.Matrix4;
    this.bones = [];
    this.boneMatrices = [];
    var c, f, e, h, j, p;
    if (this.geometry.bones !== undefined) {
        for (c = 0; c < this.geometry.bones.length; c++) {
            e = this.geometry.bones[c];
            h = e.pos;
            j = e.rotq;
            p = e.scl;
            f = this.addBone();
            f.name = e.name;
            f.position.set(h[0], h[1], h[2]);
            f.quaternion.set(j[0], j[1], j[2], j[3]);
            f.useQuaternion = !0;
            p !== undefined ? f.scale.set(p[0], p[1], p[2]) : f.scale.set(1, 1, 1)
        }
        for (c = 0; c < this.bones.length; c++) {
            e = this.geometry.bones[c];
            f = this.bones[c];
            e.parent === -1 ? this.addChild(f) : this.bones[e.parent].addChild(f)
        }
        this.boneMatrices = new Float32Array(16 * this.bones.length);
        this.pose()
    }
}
;
THREE.SkinnedMesh.prototype = new THREE.Mesh;
THREE.SkinnedMesh.prototype.constructor = THREE.SkinnedMesh;
THREE.SkinnedMesh.prototype.update = function(a, b, c) {
    if (this.visible) {
        this.matrixAutoUpdate && (b |= this.updateMatrix());
        if (b || this.matrixWorldNeedsUpdate) {
            a ? this.matrixWorld.multiply(a, this.matrix) : this.matrixWorld.copy(this.matrix);
            this.matrixWorldNeedsUpdate = !1;
            b = !0
        }
        var f, e = this.children.length;
        for (f = 0; f < e; f++) {
            a = this.children[f];
            a instanceof THREE.Bone ? a.update(this.identityMatrix, !1, c) : a.update(this.matrixWorld, b, c)
        }
        c = this.bones.length;
        ba = this.bones;
        bm = this.boneMatrices;
        for (b = 0; b < c; b++)
            ba[b].skinMatrix.flattenToArrayOffset(bm, b * 16)
    }
}
;
THREE.SkinnedMesh.prototype.addBone = function(a) {
    a === undefined && (a = new THREE.Bone(this));
    this.bones.push(a);
    return a
}
;
THREE.SkinnedMesh.prototype.pose = function() {
    this.update(undefined, !0);
    for (var a, b = [], c = 0; c < this.bones.length; c++) {
        a = this.bones[c];
        b.push(THREE.Matrix4.makeInvert(a.skinMatrix));
        a.skinMatrix.flattenToArrayOffset(this.boneMatrices, c * 16)
    }
    if (this.geometry.skinVerticesA === undefined) {
        this.geometry.skinVerticesA = [];
        this.geometry.skinVerticesB = [];
        var f;
        for (a = 0; a < this.geometry.skinIndices.length; a++) {
            c = this.geometry.vertices[a].position;
            var e = this.geometry.skinIndices[a].x
              , h = this.geometry.skinIndices[a].y;
            f = new THREE.Vector3(c.x,c.y,c.z);
            this.geometry.skinVerticesA.push(b[e].multiplyVector3(f));
            f = new THREE.Vector3(c.x,c.y,c.z);
            this.geometry.skinVerticesB.push(b[h].multiplyVector3(f));
            if (this.geometry.skinWeights[a].x + this.geometry.skinWeights[a].y !== 1) {
                c = (1 - (this.geometry.skinWeights[a].x + this.geometry.skinWeights[a].y)) * 0.5;
                this.geometry.skinWeights[a].x += c;
                this.geometry.skinWeights[a].y += c
            }
        }
    }
}
;
THREE.Ribbon = function(a, b) {
    THREE.Object3D.call(this);
    this.geometry = a;
    this.materials = b instanceof Array ? b : [b];
    this.flipSided = !1;
    this.doubleSided = !1
}
;
THREE.Ribbon.prototype = new THREE.Object3D;
THREE.Ribbon.prototype.constructor = THREE.Ribbon;
THREE.Sound = function(a, b, c, f) {
    THREE.Object3D.call(this);
    this.isLoaded = !1;
    this.isAddedToDOM = !1;
    this.isPlaying = !1;
    this.duration = -1;
    this.radius = b !== undefined ? Math.abs(b) : 100;
    this.volume = Math.min(1, Math.max(0, c !== undefined ? c : 1));
    this.domElement = document.createElement("audio");
    this.domElement.volume = 0;
    this.domElement.pan = 0;
    this.domElement.loop = f !== undefined ? f : !0;
    this.sources = a instanceof Array ? a : [a];
    var e;
    c = this.sources.length;
    for (a = 0; a < c; a++) {
        b = this.sources[a];
        b.toLowerCase();
        if (b.indexOf(".mp3") !== -1)
            e = "audio/mpeg";
        else if (b.indexOf(".ogg") !== -1)
            e = "audio/ogg";
        else
            b.indexOf(".wav") !== -1 && (e = "audio/wav");
        if (this.domElement.canPlayType(e)) {
            e = document.createElement("source");
            e.src = this.sources[a];
            this.domElement.THREESound = this;
            this.domElement.appendChild(e);
            this.domElement.addEventListener("canplay", this.onLoad, !0);
            this.domElement.load();
            break
        }
    }
}
;
THREE.Sound.prototype = new THREE.Object3D;
THREE.Sound.prototype.constructor = THREE.Sound;
THREE.Sound.prototype.supr = THREE.Object3D.prototype;
THREE.Sound.prototype.onLoad = function() {
    var a = this.THREESound;
    if (!a.isLoaded) {
        this.removeEventListener("canplay", this.onLoad, !0);
        a.isLoaded = !0;
        a.duration = this.duration;
        a.isPlaying && a.play()
    }
}
;
THREE.Sound.prototype.addToDOM = function(a) {
    this.isAddedToDOM = !0;
    a.appendChild(this.domElement)
}
;
THREE.Sound.prototype.play = function(a) {
    this.isPlaying = !0;
    if (this.isLoaded) {
        this.domElement.play();
        if (a)
            this.domElement.currentTime = a % this.duration
    }
}
;
THREE.Sound.prototype.pause = function() {
    this.isPlaying = !1;
    this.domElement.pause()
}
;
THREE.Sound.prototype.stop = function() {
    this.isPlaying = !1;
    this.domElement.pause();
    this.domElement.currentTime = 0
}
;
THREE.Sound.prototype.calculateVolumeAndPan = function(a) {
    a = a.length();
    this.domElement.volume = a <= this.radius ? this.volume * (1 - a / this.radius) : 0
}
;
THREE.Sound.prototype.update = function(a, b, c) {
    if (this.matrixAutoUpdate) {
        this.matrix.setPosition(this.position);
        b = !0
    }
    if (b || this.matrixWorldNeedsUpdate) {
        a ? this.matrixWorld.multiply(a, this.matrix) : this.matrixWorld.copy(this.matrix);
        this.matrixWorldNeedsUpdate = !1;
        b = !0
    }
    var f = this.children.length;
    for (a = 0; a < f; a++)
        this.children[a].update(this.matrixWorld, b, c)
}
;
THREE.LOD = function() {
    THREE.Object3D.call(this);
    this.LODs = []
}
;
THREE.LOD.prototype = new THREE.Object3D;
THREE.LOD.prototype.constructor = THREE.LOD;
THREE.LOD.prototype.supr = THREE.Object3D.prototype;
THREE.LOD.prototype.add = function(a, b) {
    b === undefined && (b = 0);
    b = Math.abs(b);
    for (var c = 0; c < this.LODs.length; c++)
        if (b < this.LODs[c].visibleAtDistance)
            break;
    this.LODs.splice(c, 0, {
        visibleAtDistance: b,
        object3D: a
    });
    this.addChild(a)
}
;
THREE.LOD.prototype.update = function(a, b, c) {
    this.matrixAutoUpdate && (b |= this.updateMatrix());
    if (b || this.matrixWorldNeedsUpdate) {
        a ? this.matrixWorld.multiply(a, this.matrix) : this.matrixWorld.copy(this.matrix);
        this.matrixWorldNeedsUpdate = !1;
        b = !0
    }
    if (this.LODs.length > 1) {
        a = c.matrixWorldInverse;
        a = -(a.n31 * this.position.x + a.n32 * this.position.y + a.n33 * this.position.z + a.n34);
        this.LODs[0].object3D.visible = !0;
        for (var f = 1; f < this.LODs.length; f++)
            if (a >= this.LODs[f].visibleAtDistance) {
                this.LODs[f - 1].object3D.visible = !1;
                this.LODs[f].object3D.visible = !0
            } else
                break;
        for (; f < this.LODs.length; f++)
            this.LODs[f].object3D.visible = !1
    }
    for (a = 0; a < this.children.length; a++)
        this.children[a].update(this.matrixWorld, b, c)
}
;
THREE.Scene = function() {
    THREE.Object3D.call(this);
    this.matrixAutoUpdate = !1;
    this.fog = null;
    this.objects = [];
    this.lights = [];
    this.sounds = [];
    this.__objectsAdded = [];
    this.__objectsRemoved = []
}
;
THREE.Scene.prototype = new THREE.Object3D;
THREE.Scene.prototype.constructor = THREE.Scene;
THREE.Scene.prototype.supr = THREE.Object3D.prototype;
THREE.Scene.prototype.addChild = function(a) {
    this.supr.addChild.call(this, a);
    this.addChildRecurse(a)
}
;
THREE.Scene.prototype.addChildRecurse = function(a) {
    if (a instanceof THREE.Light)
        this.lights.indexOf(a) === -1 && this.lights.push(a);
    else if (a instanceof THREE.Sound)
        this.sounds.indexOf(a) === -1 && this.sounds.push(a);
    else if (!(a instanceof THREE.Camera || a instanceof THREE.Bone) && this.objects.indexOf(a) === -1) {
        this.objects.push(a);
        this.__objectsAdded.push(a)
    }
    for (var b = 0; b < a.children.length; b++)
        this.addChildRecurse(a.children[b])
}
;
THREE.Scene.prototype.removeChild = function(a) {
    this.supr.removeChild.call(this, a);
    this.removeChildRecurse(a)
}
;
THREE.Scene.prototype.removeChildRecurse = function(a) {
    if (a instanceof THREE.Light) {
        var b = this.lights.indexOf(a);
        b !== -1 && this.lights.splice(b, 1)
    } else if (a instanceof THREE.Sound) {
        b = this.sounds.indexOf(a);
        b !== -1 && this.sounds.splice(b, 1)
    } else if (!(a instanceof THREE.Camera)) {
        b = this.objects.indexOf(a);
        if (b !== -1) {
            this.objects.splice(b, 1);
            this.__objectsRemoved.push(a)
        }
    }
    for (b = 0; b < a.children.length; b++)
        this.removeChildRecurse(a.children[b])
}
;
THREE.Scene.prototype.addObject = THREE.Scene.prototype.addChild;
THREE.Scene.prototype.removeObject = THREE.Scene.prototype.removeChild;
THREE.Scene.prototype.addLight = THREE.Scene.prototype.addChild;
THREE.Scene.prototype.removeLight = THREE.Scene.prototype.removeChild;
THREE.Fog = function(a, b, c) {
    this.color = new THREE.Color(a);
    this.near = b || 1;
    this.far = c || 1E3
}
;
THREE.FogExp2 = function(a, b) {
    this.color = new THREE.Color(a);
    this.density = b !== undefined ? b : 2.5E-4
}
;
THREE.Projector = function() {
    function a() {
        var Q = n[p] = n[p] || new THREE.RenderableVertex;
        p++;
        return Q
    }
    function b(Q, N) {
        return N.z - Q.z
    }
    function c(Q, N) {
        var pa = 0
          , ya = 1
          , Da = Q.z + Q.w
          , qa = N.z + N.w
          , V = -Q.z + Q.w
          , ha = -N.z + N.w;
        if (Da >= 0 && qa >= 0 && V >= 0 && ha >= 0)
            return !0;
        else if (Da < 0 && qa < 0 || V < 0 && ha < 0)
            return !1;
        else {
            if (Da < 0)
                pa = Math.max(pa, Da / (Da - qa));
            else
                qa < 0 && (ya = Math.min(ya, Da / (Da - qa)));
            if (V < 0)
                pa = Math.max(pa, V / (V - ha));
            else
                ha < 0 && (ya = Math.min(ya, V / (V - ha)));
            if (ya < pa)
                return !1;
            else {
                Q.lerpSelf(N, pa);
                N.lerpSelf(Q, 1 - ya);
                return !0
            }
        }
    }
    var f, e, h = [], j, p, n = [], s, x, z = [], C, y = [], J, K, P = [], L, ja, ma = [], sa = new THREE.Vector4, U = new THREE.Vector4, A = new THREE.Matrix4, oa = new THREE.Matrix4, d = [new THREE.Vector4, new THREE.Vector4, new THREE.Vector4, new THREE.Vector4, new THREE.Vector4, new THREE.Vector4], Ba = new THREE.Vector4, Ca = new THREE.Vector4;
    this.projectVector = function(Q, N) {
        A.multiply(N.projectionMatrix, N.matrixWorldInverse);
        A.multiplyVector3(Q);
        return Q
    }
    ;
    this.unprojectVector = function(Q, N) {
        A.multiply(N.matrixWorld, THREE.Matrix4.makeInvert(N.projectionMatrix));
        A.multiplyVector3(Q);
        return Q
    }
    ;
    this.projectObjects = function(Q, N, pa) {
        N = [];
        var ya, Da, qa;
        e = 0;
        Da = Q.objects;
        Q = 0;
        for (ya = Da.length; Q < ya; Q++) {
            qa = Da[Q];
            var V;
            if (!(V = !qa.visible))
                if (V = qa instanceof THREE.Mesh) {
                    a: {
                        V = void 0;
                        for (var ha = qa.matrixWorld, ia = -qa.geometry.boundingSphere.radius * Math.max(qa.scale.x, Math.max(qa.scale.y, qa.scale.z)), W = 0; W < 6; W++) {
                            V = d[W].x * ha.n14 + d[W].y * ha.n24 + d[W].z * ha.n34 + d[W].w;
                            if (V <= ia) {
                                V = !1;
                                break a
                            }
                        }
                        V = !0
                    }
                    V = !V
                }
            if (!V) {
                V = h[e] = h[e] || new THREE.RenderableObject;
                e++;
                f = V;
                sa.copy(qa.position);
                A.multiplyVector3(sa);
                f.object = qa;
                f.z = sa.z;
                N.push(f)
            }
        }
        pa && N.sort(b);
        return N
    }
    ;
    this.projectScene = function(Q, N, pa) {
        var ya = [], Da = N.near, qa = N.far, V, ha, ia, W, S, ta, ka, za, La, la, Na, Wa, g, m, o, i, k;
        ja = K = C = x = 0;
        N.matrixAutoUpdate && N.updateMatrix();
        Q.update(undefined, !1, N);
        A.multiply(N.projectionMatrix, N.matrixWorldInverse);
        d[0].set(A.n41 - A.n11, A.n42 - A.n12, A.n43 - A.n13, A.n44 - A.n14);
        d[1].set(A.n41 + A.n11, A.n42 + A.n12, A.n43 + A.n13, A.n44 + A.n14);
        d[2].set(A.n41 + A.n21, A.n42 + A.n22, A.n43 + A.n23, A.n44 + A.n24);
        d[3].set(A.n41 - A.n21, A.n42 - A.n22, A.n43 - A.n23, A.n44 - A.n24);
        d[4].set(A.n41 - A.n31, A.n42 - A.n32, A.n43 - A.n33, A.n44 - A.n34);
        d[5].set(A.n41 + A.n31, A.n42 + A.n32, A.n43 + A.n33, A.n44 + A.n34);
        for (V = 0; V < 6; V++) {
            La = d[V];
            La.divideScalar(Math.sqrt(La.x * La.x + La.y * La.y + La.z * La.z))
        }
        La = this.projectObjects(Q, N, !0);
        Q = 0;
        for (V = La.length; Q < V; Q++) {
            la = La[Q].object;
            if (la.visible) {
                Na = la.matrixWorld;
                Wa = la.matrixRotationWorld;
                g = la.materials;
                m = la.overdraw;
                p = 0;
                if (la instanceof THREE.Mesh) {
                    o = la.geometry;
                    W = o.vertices;
                    i = o.faces;
                    o = o.faceVertexUvs;
                    ha = 0;
                    for (ia = W.length; ha < ia; ha++) {
                        j = a();
                        j.positionWorld.copy(W[ha].position);
                        Na.multiplyVector3(j.positionWorld);
                        j.positionScreen.copy(j.positionWorld);
                        A.multiplyVector4(j.positionScreen);
                        j.positionScreen.x /= j.positionScreen.w;
                        j.positionScreen.y /= j.positionScreen.w;
                        j.visible = j.positionScreen.z > Da && j.positionScreen.z < qa
                    }
                    W = 0;
                    for (ha = i.length; W < ha; W++) {
                        ia = i[W];
                        if (ia instanceof THREE.Face3) {
                            S = n[ia.a];
                            ta = n[ia.b];
                            ka = n[ia.c];
                            if (S.visible && ta.visible && ka.visible && (la.doubleSided || la.flipSided != (ka.positionScreen.x - S.positionScreen.x) * (ta.positionScreen.y - S.positionScreen.y) - (ka.positionScreen.y - S.positionScreen.y) * (ta.positionScreen.x - S.positionScreen.x) < 0)) {
                                za = z[x] = z[x] || new THREE.RenderableFace3;
                                x++;
                                s = za;
                                s.v1.copy(S);
                                s.v2.copy(ta);
                                s.v3.copy(ka)
                            } else
                                continue
                        } else if (ia instanceof THREE.Face4) {
                            S = n[ia.a];
                            ta = n[ia.b];
                            ka = n[ia.c];
                            za = n[ia.d];
                            if (S.visible && ta.visible && ka.visible && za.visible && (la.doubleSided || la.flipSided != ((za.positionScreen.x - S.positionScreen.x) * (ta.positionScreen.y - S.positionScreen.y) - (za.positionScreen.y - S.positionScreen.y) * (ta.positionScreen.x - S.positionScreen.x) < 0 || (ta.positionScreen.x - ka.positionScreen.x) * (za.positionScreen.y - ka.positionScreen.y) - (ta.positionScreen.y - ka.positionScreen.y) * (za.positionScreen.x - ka.positionScreen.x) < 0))) {
                                k = y[C] = y[C] || new THREE.RenderableFace4;
                                C++;
                                s = k;
                                s.v1.copy(S);
                                s.v2.copy(ta);
                                s.v3.copy(ka);
                                s.v4.copy(za)
                            } else
                                continue
                        }
                        s.normalWorld.copy(ia.normal);
                        Wa.multiplyVector3(s.normalWorld);
                        s.centroidWorld.copy(ia.centroid);
                        Na.multiplyVector3(s.centroidWorld);
                        s.centroidScreen.copy(s.centroidWorld);
                        A.multiplyVector3(s.centroidScreen);
                        ka = ia.vertexNormals;
                        S = 0;
                        for (ta = ka.length; S < ta; S++) {
                            za = s.vertexNormalsWorld[S];
                            za.copy(ka[S]);
                            Wa.multiplyVector3(za)
                        }
                        S = 0;
                        for (ta = o.length; S < ta; S++)
                            if (k = o[S][W]) {
                                ka = 0;
                                for (za = k.length; ka < za; ka++)
                                    s.uvs[S][ka] = k[ka]
                            }
                        s.meshMaterials = g;
                        s.faceMaterials = ia.materials;
                        s.overdraw = m;
                        s.z = s.centroidScreen.z;
                        ya.push(s)
                    }
                } else if (la instanceof THREE.Line) {
                    oa.multiply(A, Na);
                    W = la.geometry.vertices;
                    S = a();
                    S.positionScreen.copy(W[0].position);
                    oa.multiplyVector4(S.positionScreen);
                    ha = 1;
                    for (ia = W.length; ha < ia; ha++) {
                        S = a();
                        S.positionScreen.copy(W[ha].position);
                        oa.multiplyVector4(S.positionScreen);
                        ta = n[p - 2];
                        Ba.copy(S.positionScreen);
                        Ca.copy(ta.positionScreen);
                        if (c(Ba, Ca)) {
                            Ba.multiplyScalar(1 / Ba.w);
                            Ca.multiplyScalar(1 / Ca.w);
                            Na = P[K] = P[K] || new THREE.RenderableLine;
                            K++;
                            J = Na;
                            J.v1.positionScreen.copy(Ba);
                            J.v2.positionScreen.copy(Ca);
                            J.z = Math.max(Ba.z, Ca.z);
                            J.materials = la.materials;
                            ya.push(J)
                        }
                    }
                } else if (la instanceof THREE.Particle) {
                    U.set(la.position.x, la.position.y, la.position.z, 1);
                    A.multiplyVector4(U);
                    U.z /= U.w;
                    if (U.z > 0 && U.z < 1) {
                        Na = ma[ja] = ma[ja] || new THREE.RenderableParticle;
                        ja++;
                        L = Na;
                        L.x = U.x / U.w;
                        L.y = U.y / U.w;
                        L.z = U.z;
                        L.rotation = la.rotation.z;
                        L.scale.x = la.scale.x * Math.abs(L.x - (U.x + N.projectionMatrix.n11) / (U.w + N.projectionMatrix.n14));
                        L.scale.y = la.scale.y * Math.abs(L.y - (U.y + N.projectionMatrix.n22) / (U.w + N.projectionMatrix.n24));
                        L.materials = la.materials;
                        ya.push(L)
                    }
                }
            }
        }
        pa && ya.sort(b);
        return ya
    }
}
;
THREE.SoundRenderer = function() {
    this.volume = 1;
    this.domElement = document.createElement("div");
    this.domElement.id = "THREESound";
    this.cameraPosition = new THREE.Vector3;
    this.soundPosition = new THREE.Vector3;
    this.render = function(a, b, c) {
        c && a.update(undefined, !1, b);
        c = a.sounds;
        var f, e = c.length;
        for (f = 0; f < e; f++) {
            a = c[f];
            this.soundPosition.set(a.matrixWorld.n14, a.matrixWorld.n24, a.matrixWorld.n34);
            this.soundPosition.subSelf(b.position);
            if (a.isPlaying && a.isLoaded) {
                a.isAddedToDOM || a.addToDOM(this.domElement);
                a.calculateVolumeAndPan(this.soundPosition)
            }
        }
    }
}
;
THREE.ShaderChunk = {
    fog_pars_fragment: "#ifdef USE_FOG\nuniform vec3 fogColor;\n#ifdef FOG_EXP2\nuniform float fogDensity;\n#else\nuniform float fogNear;\nuniform float fogFar;\n#endif\n#endif",
    fog_fragment: "#ifdef USE_FOG\nfloat depth = gl_FragCoord.z / gl_FragCoord.w;\n#ifdef FOG_EXP2\nconst float LOG2 = 1.442695;\nfloat fogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );\nfogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );\n#else\nfloat fogFactor = smoothstep( fogNear, fogFar, depth );\n#endif\ngl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );\n#endif",
    envmap_pars_fragment: "#ifdef USE_ENVMAP\nvarying vec3 vReflect;\nuniform float reflectivity;\nuniform samplerCube envMap;\nuniform int combine;\n#endif",
    envmap_fragment: "#ifdef USE_ENVMAP\nvec4 cubeColor = textureCube( envMap, vec3( -vReflect.x, vReflect.yz ) );\nif ( combine == 1 ) {\ngl_FragColor = vec4( mix( gl_FragColor.xyz, cubeColor.xyz, reflectivity ), opacity );\n} else {\ngl_FragColor = gl_FragColor * cubeColor;\n}\n#endif",
    envmap_pars_vertex: "#ifdef USE_ENVMAP\nvarying vec3 vReflect;\nuniform float refractionRatio;\nuniform bool useRefract;\n#endif",
    envmap_vertex: "#ifdef USE_ENVMAP\nvec4 mPosition = objectMatrix * vec4( position, 1.0 );\nvec3 nWorld = mat3( objectMatrix[0].xyz, objectMatrix[1].xyz, objectMatrix[2].xyz ) * normal;\nif ( useRefract ) {\nvReflect = refract( normalize( mPosition.xyz - cameraPosition ), normalize( nWorld.xyz ), refractionRatio );\n} else {\nvReflect = reflect( normalize( mPosition.xyz - cameraPosition ), normalize( nWorld.xyz ) );\n}\n#endif",
    map_particle_pars_fragment: "#ifdef USE_MAP\nuniform sampler2D map;\n#endif",
    map_particle_fragment: "#ifdef USE_MAP\ngl_FragColor = gl_FragColor * texture2D( map, gl_PointCoord );\n#endif",
    map_pars_fragment: "#ifdef USE_MAP\nvarying vec2 vUv;\nuniform sampler2D map;\n#endif",
    map_pars_vertex: "#ifdef USE_MAP\nvarying vec2 vUv;\n#endif",
    map_fragment: "#ifdef USE_MAP\ngl_FragColor = gl_FragColor * texture2D( map, vUv );\n#endif",
    map_vertex: "#ifdef USE_MAP\nvUv = uv;\n#endif",
    lightmap_pars_fragment: "#ifdef USE_LIGHTMAP\nvarying vec2 vUv2;\nuniform sampler2D lightMap;\n#endif",
    lightmap_pars_vertex: "#ifdef USE_LIGHTMAP\nvarying vec2 vUv2;\n#endif",
    lightmap_fragment: "#ifdef USE_LIGHTMAP\ngl_FragColor = gl_FragColor * texture2D( lightMap, vUv2 );\n#endif",
    lightmap_vertex: "#ifdef USE_LIGHTMAP\nvUv2 = uv2;\n#endif",
    lights_pars_vertex: "uniform bool enableLighting;\nuniform vec3 ambientLightColor;\n#if MAX_DIR_LIGHTS > 0\nuniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\nuniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n#endif\n#if MAX_POINT_LIGHTS > 0\nuniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];\nuniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\n#ifdef PHONG\nvarying vec3 vPointLightVector[ MAX_POINT_LIGHTS ];\n#endif\n#endif",
    lights_vertex: "if ( !enableLighting ) {\nvLightWeighting = vec3( 1.0 );\n} else {\nvLightWeighting = ambientLightColor;\n#if MAX_DIR_LIGHTS > 0\nfor( int i = 0; i < MAX_DIR_LIGHTS; i++ ) {\nvec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );\nfloat directionalLightWeighting = max( dot( transformedNormal, normalize( lDirection.xyz ) ), 0.0 );\nvLightWeighting += directionalLightColor[ i ] * directionalLightWeighting;\n}\n#endif\n#if MAX_POINT_LIGHTS > 0\nfor( int i = 0; i < MAX_POINT_LIGHTS; i++ ) {\nvec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\nvec3 pointLightVector = normalize( lPosition.xyz - mvPosition.xyz );\nfloat pointLightWeighting = max( dot( transformedNormal, pointLightVector ), 0.0 );\nvLightWeighting += pointLightColor[ i ] * pointLightWeighting;\n#ifdef PHONG\nvPointLightVector[ i ] = pointLightVector;\n#endif\n}\n#endif\n}",
    lights_pars_fragment: "#if MAX_DIR_LIGHTS > 0\nuniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n#endif\n#if MAX_POINT_LIGHTS > 0\nvarying vec3 vPointLightVector[ MAX_POINT_LIGHTS ];\n#endif\nvarying vec3 vViewPosition;\nvarying vec3 vNormal;",
    lights_fragment: "vec3 normal = normalize( vNormal );\nvec3 viewPosition = normalize( vViewPosition );\nvec4 mColor = vec4( diffuse, opacity );\nvec4 mSpecular = vec4( specular, opacity );\n#if MAX_POINT_LIGHTS > 0\nvec4 pointDiffuse  = vec4( 0.0 );\nvec4 pointSpecular = vec4( 0.0 );\nfor( int i = 0; i < MAX_POINT_LIGHTS; i++ ) {\nvec3 pointVector = normalize( vPointLightVector[ i ] );\nvec3 pointHalfVector = normalize( vPointLightVector[ i ] + vViewPosition );\nfloat pointDotNormalHalf = dot( normal, pointHalfVector );\nfloat pointDiffuseWeight = max( dot( normal, pointVector ), 0.0 );\nfloat pointSpecularWeight = 0.0;\nif ( pointDotNormalHalf >= 0.0 )\npointSpecularWeight = pow( pointDotNormalHalf, shininess );\npointDiffuse  += mColor * pointDiffuseWeight;\npointSpecular += mSpecular * pointSpecularWeight;\n}\n#endif\n#if MAX_DIR_LIGHTS > 0\nvec4 dirDiffuse  = vec4( 0.0 );\nvec4 dirSpecular = vec4( 0.0 );\nfor( int i = 0; i < MAX_DIR_LIGHTS; i++ ) {\nvec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );\nvec3 dirVector = normalize( lDirection.xyz );\nvec3 dirHalfVector = normalize( lDirection.xyz + vViewPosition );\nfloat dirDotNormalHalf = dot( normal, dirHalfVector );\nfloat dirDiffuseWeight = max( dot( normal, dirVector ), 0.0 );\nfloat dirSpecularWeight = 0.0;\nif ( dirDotNormalHalf >= 0.0 )\ndirSpecularWeight = pow( dirDotNormalHalf, shininess );\ndirDiffuse  += mColor * dirDiffuseWeight;\ndirSpecular += mSpecular * dirSpecularWeight;\n}\n#endif\nvec4 totalLight = vec4( ambient, opacity );\n#if MAX_DIR_LIGHTS > 0\ntotalLight += dirDiffuse + dirSpecular;\n#endif\n#if MAX_POINT_LIGHTS > 0\ntotalLight += pointDiffuse + pointSpecular;\n#endif\ngl_FragColor = gl_FragColor * totalLight;",
    color_pars_fragment: "#ifdef USE_COLOR\nvarying vec3 vColor;\n#endif",
    color_fragment: "#ifdef USE_COLOR\ngl_FragColor = gl_FragColor * vec4( vColor, opacity );\n#endif",
    color_pars_vertex: "#ifdef USE_COLOR\nvarying vec3 vColor;\n#endif",
    color_vertex: "#ifdef USE_COLOR\nvColor = color;\n#endif",
    skinning_pars_vertex: "#ifdef USE_SKINNING\nuniform mat4 boneGlobalMatrices[ MAX_BONES ];\n#endif",
    skinning_vertex: "#ifdef USE_SKINNING\ngl_Position  = ( boneGlobalMatrices[ int( skinIndex.x ) ] * skinVertexA ) * skinWeight.x;\ngl_Position += ( boneGlobalMatrices[ int( skinIndex.y ) ] * skinVertexB ) * skinWeight.y;\ngl_Position  = projectionMatrix * viewMatrix * objectMatrix * gl_Position;\n#endif",
    morphtarget_pars_vertex: "#ifdef USE_MORPHTARGETS\nuniform float morphTargetInfluences[ 8 ];\n#endif",
    morphtarget_vertex: "#ifdef USE_MORPHTARGETS\nvec3 morphed = vec3( 0.0, 0.0, 0.0 );\nmorphed += ( morphTarget0 - position ) * morphTargetInfluences[ 0 ];\nmorphed += ( morphTarget1 - position ) * morphTargetInfluences[ 1 ];\nmorphed += ( morphTarget2 - position ) * morphTargetInfluences[ 2 ];\nmorphed += ( morphTarget3 - position ) * morphTargetInfluences[ 3 ];\nmorphed += ( morphTarget4 - position ) * morphTargetInfluences[ 4 ];\nmorphed += ( morphTarget5 - position ) * morphTargetInfluences[ 5 ];\nmorphed += ( morphTarget6 - position ) * morphTargetInfluences[ 6 ];\nmorphed += ( morphTarget7 - position ) * morphTargetInfluences[ 7 ];\nmorphed += position;\ngl_Position = projectionMatrix * modelViewMatrix * vec4( morphed, 1.0 );\n#endif",
    default_vertex: "#ifndef USE_MORPHTARGETS\n#ifndef USE_SKINNING\ngl_Position = projectionMatrix * mvPosition;\n#endif\n#endif"
};
THREE.UniformsLib = {
    common: {
        diffuse: {
            type: "c",
            value: new THREE.Color(15658734)
        },
        opacity: {
            type: "f",
            value: 1
        },
        map: {
            type: "t",
            value: 0,
            texture: null
        },
        lightMap: {
            type: "t",
            value: 2,
            texture: null
        },
        envMap: {
            type: "t",
            value: 1,
            texture: null
        },
        useRefract: {
            type: "i",
            value: 0
        },
        reflectivity: {
            type: "f",
            value: 1
        },
        refractionRatio: {
            type: "f",
            value: 0.98
        },
        combine: {
            type: "i",
            value: 0
        },
        fogDensity: {
            type: "f",
            value: 2.5E-4
        },
        fogNear: {
            type: "f",
            value: 1
        },
        fogFar: {
            type: "f",
            value: 2E3
        },
        fogColor: {
            type: "c",
            value: new THREE.Color(16777215)
        },
        morphTargetInfluences: {
            type: "f",
            value: 0
        }
    },
    lights: {
        enableLighting: {
            type: "i",
            value: 1
        },
        ambientLightColor: {
            type: "fv",
            value: []
        },
        directionalLightDirection: {
            type: "fv",
            value: []
        },
        directionalLightColor: {
            type: "fv",
            value: []
        },
        pointLightPosition: {
            type: "fv",
            value: []
        },
        pointLightColor: {
            type: "fv",
            value: []
        }
    },
    particle: {
        psColor: {
            type: "c",
            value: new THREE.Color(15658734)
        },
        opacity: {
            type: "f",
            value: 1
        },
        size: {
            type: "f",
            value: 1
        },
        scale: {
            type: "f",
            value: 1
        },
        map: {
            type: "t",
            value: 0,
            texture: null
        },
        fogDensity: {
            type: "f",
            value: 2.5E-4
        },
        fogNear: {
            type: "f",
            value: 1
        },
        fogFar: {
            type: "f",
            value: 2E3
        },
        fogColor: {
            type: "c",
            value: new THREE.Color(16777215)
        }
    }
};
THREE.ShaderLib = {
    depth: {
        uniforms: {
            mNear: {
                type: "f",
                value: 1
            },
            mFar: {
                type: "f",
                value: 2E3
            },
            opacity: {
                type: "f",
                value: 1
            }
        },
        fragmentShader: "uniform float mNear;\nuniform float mFar;\nuniform float opacity;\nvoid main() {\nfloat depth = gl_FragCoord.z / gl_FragCoord.w;\nfloat color = 1.0 - smoothstep( mNear, mFar, depth );\ngl_FragColor = vec4( vec3( color ), opacity );\n}",
        vertexShader: "void main() {\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}"
    },
    normal: {
        uniforms: {
            opacity: {
                type: "f",
                value: 1
            }
        },
        fragmentShader: "uniform float opacity;\nvarying vec3 vNormal;\nvoid main() {\ngl_FragColor = vec4( 0.5 * normalize( vNormal ) + 0.5, opacity );\n}",
        vertexShader: "varying vec3 vNormal;\nvoid main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\nvNormal = normalize( normalMatrix * normal );\ngl_Position = projectionMatrix * mvPosition;\n}"
    },
    basic: {
        uniforms: THREE.UniformsLib.common,
        fragmentShader: ["uniform vec3 diffuse;\nuniform float opacity;", THREE.ShaderChunk.color_pars_fragment, THREE.ShaderChunk.map_pars_fragment, THREE.ShaderChunk.lightmap_pars_fragment, THREE.ShaderChunk.envmap_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, "void main() {\ngl_FragColor = vec4( diffuse, opacity );", THREE.ShaderChunk.map_fragment, THREE.ShaderChunk.lightmap_fragment, THREE.ShaderChunk.color_fragment, THREE.ShaderChunk.envmap_fragment, THREE.ShaderChunk.fog_fragment, "}"].join("\n"),
        vertexShader: [THREE.ShaderChunk.map_pars_vertex, THREE.ShaderChunk.lightmap_pars_vertex, THREE.ShaderChunk.envmap_pars_vertex, THREE.ShaderChunk.color_pars_vertex, THREE.ShaderChunk.skinning_pars_vertex, THREE.ShaderChunk.morphtarget_pars_vertex, "void main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );", THREE.ShaderChunk.map_vertex, THREE.ShaderChunk.lightmap_vertex, THREE.ShaderChunk.envmap_vertex, THREE.ShaderChunk.color_vertex, THREE.ShaderChunk.skinning_vertex, THREE.ShaderChunk.morphtarget_vertex, THREE.ShaderChunk.default_vertex, "}"].join("\n")
    },
    lambert: {
        uniforms: Uniforms.merge([THREE.UniformsLib.common, THREE.UniformsLib.lights]),
        fragmentShader: ["uniform vec3 diffuse;\nuniform float opacity;\nvarying vec3 vLightWeighting;", THREE.ShaderChunk.color_pars_fragment, THREE.ShaderChunk.map_pars_fragment, THREE.ShaderChunk.lightmap_pars_fragment, THREE.ShaderChunk.envmap_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, "void main() {\ngl_FragColor = vec4( diffuse, opacity );\ngl_FragColor = gl_FragColor * vec4( vLightWeighting, 1.0 );", THREE.ShaderChunk.map_fragment, THREE.ShaderChunk.lightmap_fragment, THREE.ShaderChunk.color_fragment, THREE.ShaderChunk.envmap_fragment, THREE.ShaderChunk.fog_fragment, "}"].join("\n"),
        vertexShader: ["varying vec3 vLightWeighting;", THREE.ShaderChunk.map_pars_vertex, THREE.ShaderChunk.lightmap_pars_vertex, THREE.ShaderChunk.envmap_pars_vertex, THREE.ShaderChunk.lights_pars_vertex, THREE.ShaderChunk.color_pars_vertex, THREE.ShaderChunk.skinning_pars_vertex, THREE.ShaderChunk.morphtarget_pars_vertex, "void main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );", THREE.ShaderChunk.map_vertex, THREE.ShaderChunk.lightmap_vertex, THREE.ShaderChunk.envmap_vertex, THREE.ShaderChunk.color_vertex, "vec3 transformedNormal = normalize( normalMatrix * normal );", THREE.ShaderChunk.lights_vertex, THREE.ShaderChunk.skinning_vertex, THREE.ShaderChunk.morphtarget_vertex, THREE.ShaderChunk.default_vertex, "}"].join("\n")
    },
    phong: {
        uniforms: Uniforms.merge([THREE.UniformsLib.common, THREE.UniformsLib.lights, {
            ambient: {
                type: "c",
                value: new THREE.Color(328965)
            },
            specular: {
                type: "c",
                value: new THREE.Color(1118481)
            },
            shininess: {
                type: "f",
                value: 30
            }
        }]),
        fragmentShader: ["uniform vec3 diffuse;\nuniform float opacity;\nuniform vec3 ambient;\nuniform vec3 specular;\nuniform float shininess;\nvarying vec3 vLightWeighting;", THREE.ShaderChunk.color_pars_fragment, THREE.ShaderChunk.map_pars_fragment, THREE.ShaderChunk.lightmap_pars_fragment, THREE.ShaderChunk.envmap_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, THREE.ShaderChunk.lights_pars_fragment, "void main() {\ngl_FragColor = vec4( vLightWeighting, 1.0 );", THREE.ShaderChunk.lights_fragment, THREE.ShaderChunk.map_fragment, THREE.ShaderChunk.lightmap_fragment, THREE.ShaderChunk.color_fragment, THREE.ShaderChunk.envmap_fragment, THREE.ShaderChunk.fog_fragment, "}"].join("\n"),
        vertexShader: ["#define PHONG\nvarying vec3 vLightWeighting;\nvarying vec3 vViewPosition;\nvarying vec3 vNormal;", THREE.ShaderChunk.map_pars_vertex, THREE.ShaderChunk.lightmap_pars_vertex, THREE.ShaderChunk.envmap_pars_vertex, THREE.ShaderChunk.lights_pars_vertex, THREE.ShaderChunk.color_pars_vertex, THREE.ShaderChunk.skinning_pars_vertex, THREE.ShaderChunk.morphtarget_pars_vertex, "void main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );", THREE.ShaderChunk.map_vertex, THREE.ShaderChunk.lightmap_vertex, THREE.ShaderChunk.envmap_vertex, THREE.ShaderChunk.color_vertex, "#ifndef USE_ENVMAP\nvec4 mPosition = objectMatrix * vec4( position, 1.0 );\n#endif\nvViewPosition = cameraPosition - mPosition.xyz;\nvec3 transformedNormal = normalize( normalMatrix * normal );\nvNormal = transformedNormal;", THREE.ShaderChunk.lights_vertex, THREE.ShaderChunk.skinning_vertex, THREE.ShaderChunk.morphtarget_vertex, THREE.ShaderChunk.default_vertex, "}"].join("\n")
    },
    particle_basic: {
        uniforms: THREE.UniformsLib.particle,
        fragmentShader: ["uniform vec3 psColor;\nuniform float opacity;", THREE.ShaderChunk.color_pars_fragment, THREE.ShaderChunk.map_particle_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, "void main() {\ngl_FragColor = vec4( psColor, opacity );", THREE.ShaderChunk.map_particle_fragment, THREE.ShaderChunk.color_fragment, THREE.ShaderChunk.fog_fragment, "}"].join("\n"),
        vertexShader: ["uniform float size;\nuniform float scale;", THREE.ShaderChunk.color_pars_vertex, "void main() {", THREE.ShaderChunk.color_vertex, "vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n#ifdef USE_SIZEATTENUATION\ngl_PointSize = size * ( scale / length( mvPosition.xyz ) );\n#else\ngl_PointSize = size;\n#endif\ngl_Position = projectionMatrix * mvPosition;\n}"].join("\n")
    }
};
THREE.WebGLRenderer = function(a) {
    function b(g, m, o) {
        var i, k, t, q = g.vertices, r = q.length, D = g.colors, w = D.length, v = g.__vertexArray, M = g.__colorArray, X = g.__sortArray, G = g.__dirtyVertices, R = g.__dirtyColors;
        if (o.sortParticles) {
            S.multiplySelf(o.matrixWorld);
            for (i = 0; i < r; i++) {
                k = q[i].position;
                za.copy(k);
                S.multiplyVector3(za);
                X[i] = [za.z, i]
            }
            X.sort(function(H, Z) {
                return Z[0] - H[0]
            });
            for (i = 0; i < r; i++) {
                k = q[X[i][1]].position;
                t = i * 3;
                v[t] = k.x;
                v[t + 1] = k.y;
                v[t + 2] = k.z
            }
            for (i = 0; i < w; i++) {
                t = i * 3;
                color = D[X[i][1]];
                M[t] = color.r;
                M[t + 1] = color.g;
                M[t + 2] = color.b
            }
        } else {
            if (G)
                for (i = 0; i < r; i++) {
                    k = q[i].position;
                    t = i * 3;
                    v[t] = k.x;
                    v[t + 1] = k.y;
                    v[t + 2] = k.z
                }
            if (R)
                for (i = 0; i < w; i++) {
                    color = D[i];
                    t = i * 3;
                    M[t] = color.r;
                    M[t + 1] = color.g;
                    M[t + 2] = color.b
                }
        }
        if (G || o.sortParticles) {
            d.bindBuffer(d.ARRAY_BUFFER, g.__webGLVertexBuffer);
            d.bufferData(d.ARRAY_BUFFER, v, m)
        }
        if (R || o.sortParticles) {
            d.bindBuffer(d.ARRAY_BUFFER, g.__webGLColorBuffer);
            d.bufferData(d.ARRAY_BUFFER, M, m)
        }
    }
    function c(g, m) {
        g.fragmentShader = m.fragmentShader;
        g.vertexShader = m.vertexShader;
        g.uniforms = Uniforms.clone(m.uniforms)
    }
    function f(g, m, o, i, k) {
        i.program || Q.initMaterial(i, m, o, k);
        var t = i.program
          , q = t.uniforms
          , r = i.uniforms;
        if (t != Ba) {
            d.useProgram(t);
            Ba = t
        }
        d.uniformMatrix4fv(q.projectionMatrix, !1, ta);
        if (o && (i instanceof THREE.MeshBasicMaterial || i instanceof THREE.MeshLambertMaterial || i instanceof THREE.MeshPhongMaterial || i instanceof THREE.LineBasicMaterial || i instanceof THREE.ParticleBasicMaterial)) {
            r.fogColor.value.setHex(o.color.hex);
            if (o instanceof THREE.Fog) {
                r.fogNear.value = o.near;
                r.fogFar.value = o.far
            } else if (o instanceof THREE.FogExp2)
                r.fogDensity.value = o.density
        }
        if (i instanceof THREE.MeshPhongMaterial || i instanceof THREE.MeshLambertMaterial || i.lights) {
            var D, w, v = 0, M = 0, X = 0, G, R, H, Z = La, Ga = Z.directional.colors, T = Z.directional.positions, $ = Z.point.colors, B = Z.point.positions, Aa = 0, Y = 0;
            o = w = w = 0;
            for (D = m.length; o < D; o++) {
                w = m[o];
                G = w.color;
                R = w.position;
                H = w.intensity;
                if (w instanceof THREE.AmbientLight) {
                    v += G.r;
                    M += G.g;
                    X += G.b
                } else if (w instanceof THREE.DirectionalLight) {
                    w = Aa * 3;
                    Ga[w] = G.r * H;
                    Ga[w + 1] = G.g * H;
                    Ga[w + 2] = G.b * H;
                    T[w] = R.x;
                    T[w + 1] = R.y;
                    T[w + 2] = R.z;
                    Aa += 1
                } else if (w instanceof THREE.PointLight) {
                    w = Y * 3;
                    $[w] = G.r * H;
                    $[w + 1] = G.g * H;
                    $[w + 2] = G.b * H;
                    B[w] = R.x;
                    B[w + 1] = R.y;
                    B[w + 2] = R.z;
                    Y += 1
                }
            }
            for (o = Aa * 3; o < Ga.length; o++)
                Ga[o] = 0;
            for (o = Y * 3; o < $.length; o++)
                $[o] = 0;
            Z.point.length = Y;
            Z.directional.length = Aa;
            Z.ambient[0] = v;
            Z.ambient[1] = M;
            Z.ambient[2] = X;
            m = La;
            r.enableLighting.value = m.directional.length + m.point.length;
            r.ambientLightColor.value = m.ambient;
            r.directionalLightColor.value = m.directional.colors;
            r.directionalLightDirection.value = m.directional.positions;
            r.pointLightColor.value = m.point.colors;
            r.pointLightPosition.value = m.point.positions
        }
        if (i instanceof THREE.MeshBasicMaterial || i instanceof THREE.MeshLambertMaterial || i instanceof THREE.MeshPhongMaterial) {
            r.diffuse.value.setRGB(i.color.r * i.opacity, i.color.g * i.opacity, i.color.b * i.opacity);
            r.opacity.value = i.opacity;
            r.map.texture = i.map;
            r.lightMap.texture = i.lightMap;
            r.envMap.texture = i.envMap;
            r.reflectivity.value = i.reflectivity;
            r.refractionRatio.value = i.refractionRatio;
            r.combine.value = i.combine;
            r.useRefract.value = i.envMap && i.envMap.mapping instanceof THREE.CubeRefractionMapping
        }
        if (i instanceof THREE.LineBasicMaterial) {
            r.diffuse.value.setRGB(i.color.r * i.opacity, i.color.g * i.opacity, i.color.b * i.opacity);
            r.opacity.value = i.opacity
        } else if (i instanceof THREE.ParticleBasicMaterial) {
            r.psColor.value.setRGB(i.color.r * i.opacity, i.color.g * i.opacity, i.color.b * i.opacity);
            r.opacity.value = i.opacity;
            r.size.value = i.size;
            r.scale.value = oa.height / 2;
            r.map.texture = i.map
        } else if (i instanceof THREE.MeshPhongMaterial) {
            r.ambient.value.setRGB(i.ambient.r, i.ambient.g, i.ambient.b);
            r.specular.value.setRGB(i.specular.r, i.specular.g, i.specular.b);
            r.shininess.value = i.shininess
        } else if (i instanceof THREE.MeshDepthMaterial) {
            r.mNear.value = g.near;
            r.mFar.value = g.far;
            r.opacity.value = i.opacity
        } else if (i instanceof THREE.MeshNormalMaterial)
            r.opacity.value = i.opacity;
        for (var Ha in r)
            if (v = t.uniforms[Ha]) {
                o = r[Ha];
                D = o.type;
                m = o.value;
                if (D == "i")
                    d.uniform1i(v, m);
                else if (D == "f")
                    d.uniform1f(v, m);
                else if (D == "fv1")
                    d.uniform1fv(v, m);
                else if (D == "fv")
                    d.uniform3fv(v, m);
                else if (D == "v2")
                    d.uniform2f(v, m.x, m.y);
                else if (D == "v3")
                    d.uniform3f(v, m.x, m.y, m.z);
                else if (D == "c")
                    d.uniform3f(v, m.r, m.g, m.b);
                else if (D == "t") {
                    d.uniform1i(v, m);
                    if (o = o.texture)
                        if (o.image instanceof Array && o.image.length == 6) {
                            if (o.image.length == 6) {
                                if (o.needsUpdate) {
                                    if (o.__wasSetOnce) {
                                        d.bindTexture(d.TEXTURE_CUBE_MAP, o.image.__webGLTextureCube);
                                        for (D = 0; D < 6; ++D)
                                            d.texSubImage2D(d.TEXTURE_CUBE_MAP_POSITIVE_X + D, 0, 0, 0, d.RGBA, d.UNSIGNED_BYTE, o.image[D])
                                    } else {
                                        o.image.__webGLTextureCube = d.createTexture();
                                        d.bindTexture(d.TEXTURE_CUBE_MAP, o.image.__webGLTextureCube);
                                        for (D = 0; D < 6; ++D)
                                            d.texImage2D(d.TEXTURE_CUBE_MAP_POSITIVE_X + D, 0, d.RGBA, d.RGBA, d.UNSIGNED_BYTE, o.image[D]);
                                        o.__wasSetOnce = !0
                                    }
                                    ja(d.TEXTURE_CUBE_MAP, o, o.image[0]);
                                    d.bindTexture(d.TEXTURE_CUBE_MAP, null);
                                    o.needsUpdate = !1
                                }
                                d.activeTexture(d.TEXTURE0 + m);
                                d.bindTexture(d.TEXTURE_CUBE_MAP, o.image.__webGLTextureCube)
                            }
                        } else {
                            if (o.needsUpdate) {
                                if (o.__wasSetOnce) {
                                    d.bindTexture(d.TEXTURE_2D, o.__webGLTexture);
                                    d.texSubImage2D(d.TEXTURE_2D, 0, 0, 0, d.RGBA, d.UNSIGNED_BYTE, o.image)
                                } else {
                                    o.__webGLTexture = d.createTexture();
                                    d.bindTexture(d.TEXTURE_2D, o.__webGLTexture);
                                    d.texImage2D(d.TEXTURE_2D, 0, d.RGBA, d.RGBA, d.UNSIGNED_BYTE, o.image);
                                    o.__wasSetOnce = !0
                                }
                                ja(d.TEXTURE_2D, o, o.image);
                                d.bindTexture(d.TEXTURE_2D, null);
                                o.needsUpdate = !1
                            }
                            d.activeTexture(d.TEXTURE0 + m);
                            d.bindTexture(d.TEXTURE_2D, o.__webGLTexture)
                        }
                }
            }
        d.uniformMatrix4fv(q.modelViewMatrix, !1, k._modelViewMatrixArray);
        d.uniformMatrix3fv(q.normalMatrix, !1, k._normalMatrixArray);
        (i instanceof THREE.MeshShaderMaterial || i instanceof THREE.MeshPhongMaterial || i.envMap) && d.uniform3f(q.cameraPosition, g.position.x, g.position.y, g.position.z);
        (i instanceof THREE.MeshShaderMaterial || i.envMap || i.skinning) && d.uniformMatrix4fv(q.objectMatrix, !1, k._objectMatrixArray);
        (i instanceof THREE.MeshPhongMaterial || i instanceof THREE.MeshLambertMaterial || i instanceof THREE.MeshShaderMaterial || i.skinning) && d.uniformMatrix4fv(q.viewMatrix, !1, ka);
        if (i.skinning) {
            d.uniformMatrix4fv(q.cameraInverseMatrix, !1, ka);
            d.uniformMatrix4fv(q.boneGlobalMatrices, !1, k.boneMatrices)
        }
        return t
    }
    function e(g, m, o, i, k, t) {
        if (i.opacity != 0) {
            g = f(g, m, o, i, t).attributes;
            if (i.morphTargets) {
                m = i.program.attributes;
                t.morphTargetBase !== -1 ? d.bindBuffer(d.ARRAY_BUFFER, k.__webGLMorphTargetsBuffers[t.morphTargetBase]) : d.bindBuffer(d.ARRAY_BUFFER, k.__webGLVertexBuffer);
                d.vertexAttribPointer(m.position, 3, d.FLOAT, !1, 0, 0);
                if (t.morphTargetForcedOrder.length) {
                    o = 0;
                    for (var q = t.morphTargetForcedOrder, r = t.morphTargetInfluences; o < i.numSupportedMorphTargets && o < q.length; ) {
                        d.bindBuffer(d.ARRAY_BUFFER, k.__webGLMorphTargetsBuffers[q[o]]);
                        d.vertexAttribPointer(m["morphTarget" + o], 3, d.FLOAT, !1, 0, 0);
                        t.__webGLMorphTargetInfluences[o] = r[q[o]];
                        o++
                    }
                } else {
                    q = [];
                    var D = -1
                      , w = 0;
                    r = t.morphTargetInfluences;
                    var v, M = r.length;
                    o = 0;
                    for (t.morphTargetBase !== -1 && (q[t.morphTargetBase] = !0); o < i.numSupportedMorphTargets; ) {
                        for (v = 0; v < M; v++)
                            if (!q[v] && r[v] > D) {
                                w = v;
                                D = r[w]
                            }
                        d.bindBuffer(d.ARRAY_BUFFER, k.__webGLMorphTargetsBuffers[w]);
                        d.vertexAttribPointer(m["morphTarget" + o], 3, d.FLOAT, !1, 0, 0);
                        t.__webGLMorphTargetInfluences[o] = D;
                        q[w] = 1;
                        D = -1;
                        o++
                    }
                }
                d.uniform1fv(i.program.uniforms.morphTargetInfluences, t.__webGLMorphTargetInfluences)
            } else {
                d.bindBuffer(d.ARRAY_BUFFER, k.__webGLVertexBuffer);
                d.vertexAttribPointer(g.position, 3, d.FLOAT, !1, 0, 0)
            }
            if (g.color >= 0) {
                d.bindBuffer(d.ARRAY_BUFFER, k.__webGLColorBuffer);
                d.vertexAttribPointer(g.color, 3, d.FLOAT, !1, 0, 0)
            }
            if (g.normal >= 0) {
                d.bindBuffer(d.ARRAY_BUFFER, k.__webGLNormalBuffer);
                d.vertexAttribPointer(g.normal, 3, d.FLOAT, !1, 0, 0)
            }
            if (g.tangent >= 0) {
                d.bindBuffer(d.ARRAY_BUFFER, k.__webGLTangentBuffer);
                d.vertexAttribPointer(g.tangent, 4, d.FLOAT, !1, 0, 0)
            }
            if (g.uv >= 0)
                if (k.__webGLUVBuffer) {
                    d.bindBuffer(d.ARRAY_BUFFER, k.__webGLUVBuffer);
                    d.vertexAttribPointer(g.uv, 2, d.FLOAT, !1, 0, 0);
                    d.enableVertexAttribArray(g.uv)
                } else
                    d.disableVertexAttribArray(g.uv);
            if (g.uv2 >= 0)
                if (k.__webGLUV2Buffer) {
                    d.bindBuffer(d.ARRAY_BUFFER, k.__webGLUV2Buffer);
                    d.vertexAttribPointer(g.uv2, 2, d.FLOAT, !1, 0, 0);
                    d.enableVertexAttribArray(g.uv2)
                } else
                    d.disableVertexAttribArray(g.uv2);
            if (i.skinning && g.skinVertexA >= 0 && g.skinVertexB >= 0 && g.skinIndex >= 0 && g.skinWeight >= 0) {
                d.bindBuffer(d.ARRAY_BUFFER, k.__webGLSkinVertexABuffer);
                d.vertexAttribPointer(g.skinVertexA, 4, d.FLOAT, !1, 0, 0);
                d.bindBuffer(d.ARRAY_BUFFER, k.__webGLSkinVertexBBuffer);
                d.vertexAttribPointer(g.skinVertexB, 4, d.FLOAT, !1, 0, 0);
                d.bindBuffer(d.ARRAY_BUFFER, k.__webGLSkinIndicesBuffer);
                d.vertexAttribPointer(g.skinIndex, 4, d.FLOAT, !1, 0, 0);
                d.bindBuffer(d.ARRAY_BUFFER, k.__webGLSkinWeightsBuffer);
                d.vertexAttribPointer(g.skinWeight, 4, d.FLOAT, !1, 0, 0)
            }
            if (t instanceof THREE.Mesh)
                if (i.wireframe) {
                    d.lineWidth(i.wireframeLinewidth);
                    d.bindBuffer(d.ELEMENT_ARRAY_BUFFER, k.__webGLLineBuffer);
                    d.drawElements(d.LINES, k.__webGLLineCount, d.UNSIGNED_SHORT, 0)
                } else {
                    d.bindBuffer(d.ELEMENT_ARRAY_BUFFER, k.__webGLFaceBuffer);
                    d.drawElements(d.TRIANGLES, k.__webGLFaceCount, d.UNSIGNED_SHORT, 0)
                }
            else if (t instanceof THREE.Line) {
                t = t.type == THREE.LineStrip ? d.LINE_STRIP : d.LINES;
                d.lineWidth(i.linewidth);
                d.drawArrays(t, 0, k.__webGLLineCount)
            } else if (t instanceof THREE.ParticleSystem)
                d.drawArrays(d.POINTS, 0, k.__webGLParticleCount);
            else
                t instanceof THREE.Ribbon && d.drawArrays(d.TRIANGLE_STRIP, 0, k.__webGLVertexCount)
        }
    }
    function h(g, m) {
        if (!g.__webGLVertexBuffer)
            g.__webGLVertexBuffer = d.createBuffer();
        if (!g.__webGLNormalBuffer)
            g.__webGLNormalBuffer = d.createBuffer();
        if (g.hasPos) {
            d.bindBuffer(d.ARRAY_BUFFER, g.__webGLVertexBuffer);
            d.bufferData(d.ARRAY_BUFFER, g.positionArray, d.DYNAMIC_DRAW);
            d.enableVertexAttribArray(m.attributes.position);
            d.vertexAttribPointer(m.attributes.position, 3, d.FLOAT, !1, 0, 0)
        }
        if (g.hasNormal) {
            d.bindBuffer(d.ARRAY_BUFFER, g.__webGLNormalBuffer);
            d.bufferData(d.ARRAY_BUFFER, g.normalArray, d.DYNAMIC_DRAW);
            d.enableVertexAttribArray(m.attributes.normal);
            d.vertexAttribPointer(m.attributes.normal, 3, d.FLOAT, !1, 0, 0)
        }
        d.drawArrays(d.TRIANGLES, 0, g.count);
        g.count = 0
    }
    function j(g) {
        if (N != g.doubleSided) {
            g.doubleSided ? d.disable(d.CULL_FACE) : d.enable(d.CULL_FACE);
            N = g.doubleSided
        }
        if (pa != g.flipSided) {
            g.flipSided ? d.frontFace(d.CW) : d.frontFace(d.CCW);
            pa = g.flipSided
        }
    }
    function p(g) {
        if (Da != g) {
            g ? d.enable(d.DEPTH_TEST) : d.disable(d.DEPTH_TEST);
            Da = g
        }
    }
    function n(g) {
        W[0].set(g.n41 - g.n11, g.n42 - g.n12, g.n43 - g.n13, g.n44 - g.n14);
        W[1].set(g.n41 + g.n11, g.n42 + g.n12, g.n43 + g.n13, g.n44 + g.n14);
        W[2].set(g.n41 + g.n21, g.n42 + g.n22, g.n43 + g.n23, g.n44 + g.n24);
        W[3].set(g.n41 - g.n21, g.n42 - g.n22, g.n43 - g.n23, g.n44 - g.n24);
        W[4].set(g.n41 - g.n31, g.n42 - g.n32, g.n43 - g.n33, g.n44 - g.n34);
        W[5].set(g.n41 + g.n31, g.n42 + g.n32, g.n43 + g.n33, g.n44 + g.n34);
        var m;
        for (g = 0; g < 6; g++) {
            m = W[g];
            m.divideScalar(Math.sqrt(m.x * m.x + m.y * m.y + m.z * m.z))
        }
    }
    function s(g) {
        for (var m = g.matrixWorld, o = -g.geometry.boundingSphere.radius * Math.max(g.scale.x, Math.max(g.scale.y, g.scale.z)), i = 0; i < 6; i++) {
            g = W[i].x * m.n14 + W[i].y * m.n24 + W[i].z * m.n34 + W[i].w;
            if (g <= o)
                return !1
        }
        return !0
    }
    function x(g, m) {
        g.list[g.count] = m;
        g.count += 1
    }
    function z(g) {
        var m, o, i = g.object, k = g.opaque, t = g.transparent;
        t.count = 0;
        g = k.count = 0;
        for (m = i.materials.length; g < m; g++) {
            o = i.materials[g];
            o.opacity && o.opacity < 1 || o.blending != THREE.NormalBlending ? x(t, o) : x(k, o)
        }
    }
    function C(g) {
        var m, o, i, k, t = g.object, q = g.buffer, r = g.opaque, D = g.transparent;
        D.count = 0;
        g = r.count = 0;
        for (i = t.materials.length; g < i; g++) {
            m = t.materials[g];
            if (m instanceof THREE.MeshFaceMaterial) {
                m = 0;
                for (o = q.materials.length; m < o; m++)
                    (k = q.materials[m]) && (k.opacity && k.opacity < 1 || k.blending != THREE.NormalBlending ? x(D, k) : x(r, k))
            } else {
                k = m;
                k.opacity && k.opacity < 1 || k.blending != THREE.NormalBlending ? x(D, k) : x(r, k)
            }
        }
    }
    function y(g, m) {
        return m.z - g.z
    }
    function J(g, m) {
        g._modelViewMatrix.multiplyToArray(m.matrixWorldInverse, g.matrixWorld, g._modelViewMatrixArray);
        THREE.Matrix4.makeInvert3x3(g._modelViewMatrix).transposeIntoArray(g._normalMatrixArray)
    }
    function K(g) {
        function m(X) {
            var G = [];
            o = 0;
            for (i = X.length; o < i; o++)
                X[o] == undefined ? G.push("undefined") : G.push(X[o].id);
            return G.join("_")
        }
        var o, i, k, t, q, r, D, w, v = {}, M = g.morphTargets !== undefined ? g.morphTargets.length : 0;
        g.geometryGroups = {};
        k = 0;
        for (t = g.faces.length; k < t; k++) {
            q = g.faces[k];
            r = q.materials;
            D = m(r);
            v[D] == undefined && (v[D] = {
                hash: D,
                counter: 0
            });
            w = v[D].hash + "_" + v[D].counter;
            g.geometryGroups[w] == undefined && (g.geometryGroups[w] = {
                faces: [],
                materials: r,
                vertices: 0,
                numMorphTargets: M
            });
            q = q instanceof THREE.Face3 ? 3 : 4;
            if (g.geometryGroups[w].vertices + q > 65535) {
                v[D].counter += 1;
                w = v[D].hash + "_" + v[D].counter;
                g.geometryGroups[w] == undefined && (g.geometryGroups[w] = {
                    faces: [],
                    materials: r,
                    vertices: 0,
                    numMorphTargets: M
                })
            }
            g.geometryGroups[w].faces.push(k);
            g.geometryGroups[w].vertices += q
        }
    }
    function P(g, m, o) {
        g.push({
            buffer: m,
            object: o,
            opaque: {
                list: [],
                count: 0
            },
            transparent: {
                list: [],
                count: 0
            }
        })
    }
    function L(g) {
        if (g != ya) {
            switch (g) {
            case THREE.AdditiveBlending:
                d.blendEquation(d.FUNC_ADD);
                d.blendFunc(d.ONE, d.ONE);
                break;
            case THREE.SubtractiveBlending:
                d.blendFunc(d.DST_COLOR, d.ZERO);
                break;
            case THREE.BillboardBlending:
                d.blendEquation(d.FUNC_ADD);
                d.blendFunc(d.SRC_ALPHA, d.ONE_MINUS_SRC_ALPHA);
                break;
            case THREE.ReverseSubtractiveBlending:
                d.blendEquation(d.FUNC_REVERSE_SUBTRACT);
                d.blendFunc(d.ONE, d.ONE);
                break;
            default:
                d.blendEquation(d.FUNC_ADD);
                d.blendFunc(d.ONE, d.ONE_MINUS_SRC_ALPHA)
            }
            ya = g
        }
    }
    function ja(g, m, o) {
        if ((o.width & o.width - 1) == 0 && (o.height & o.height - 1) == 0) {
            d.texParameteri(g, d.TEXTURE_WRAP_S, A(m.wrapS));
            d.texParameteri(g, d.TEXTURE_WRAP_T, A(m.wrapT));
            d.texParameteri(g, d.TEXTURE_MAG_FILTER, A(m.magFilter));
            d.texParameteri(g, d.TEXTURE_MIN_FILTER, A(m.minFilter));
            d.generateMipmap(g)
        } else {
            d.texParameteri(g, d.TEXTURE_WRAP_S, d.CLAMP_TO_EDGE);
            d.texParameteri(g, d.TEXTURE_WRAP_T, d.CLAMP_TO_EDGE);
            d.texParameteri(g, d.TEXTURE_MAG_FILTER, U(m.magFilter));
            d.texParameteri(g, d.TEXTURE_MIN_FILTER, U(m.minFilter))
        }
    }
    function ma(g) {
        if (g && !g.__webGLFramebuffer) {
            g.__webGLFramebuffer = d.createFramebuffer();
            g.__webGLRenderbuffer = d.createRenderbuffer();
            g.__webGLTexture = d.createTexture();
            d.bindRenderbuffer(d.RENDERBUFFER, g.__webGLRenderbuffer);
            d.renderbufferStorage(d.RENDERBUFFER, d.DEPTH_COMPONENT16, g.width, g.height);
            d.bindTexture(d.TEXTURE_2D, g.__webGLTexture);
            d.texParameteri(d.TEXTURE_2D, d.TEXTURE_WRAP_S, A(g.wrapS));
            d.texParameteri(d.TEXTURE_2D, d.TEXTURE_WRAP_T, A(g.wrapT));
            d.texParameteri(d.TEXTURE_2D, d.TEXTURE_MAG_FILTER, A(g.magFilter));
            d.texParameteri(d.TEXTURE_2D, d.TEXTURE_MIN_FILTER, A(g.minFilter));
            d.texImage2D(d.TEXTURE_2D, 0, A(g.format), g.width, g.height, 0, A(g.format), A(g.type), null);
            d.bindFramebuffer(d.FRAMEBUFFER, g.__webGLFramebuffer);
            d.framebufferTexture2D(d.FRAMEBUFFER, d.COLOR_ATTACHMENT0, d.TEXTURE_2D, g.__webGLTexture, 0);
            d.framebufferRenderbuffer(d.FRAMEBUFFER, d.DEPTH_ATTACHMENT, d.RENDERBUFFER, g.__webGLRenderbuffer);
            d.bindTexture(d.TEXTURE_2D, null);
            d.bindRenderbuffer(d.RENDERBUFFER, null);
            d.bindFramebuffer(d.FRAMEBUFFER, null)
        }
        var m, o;
        if (g) {
            m = g.__webGLFramebuffer;
            o = g.width;
            g = g.height
        } else {
            m = null;
            o = ha;
            g = ia
        }
        if (m != Ca) {
            d.bindFramebuffer(d.FRAMEBUFFER, m);
            d.viewport(qa, V, o, g);
            Ca = m
        }
    }
    function sa(g, m) {
        var o;
        if (g == "fragment")
            o = d.createShader(d.FRAGMENT_SHADER);
        else
            g == "vertex" && (o = d.createShader(d.VERTEX_SHADER));
        d.shaderSource(o, m);
        d.compileShader(o);
        if (!d.getShaderParameter(o, d.COMPILE_STATUS)) {
            console.error(d.getShaderInfoLog(o));
            console.error(m);
            return null
        }
        return o
    }
    function U(g) {
        switch (g) {
        case THREE.NearestFilter:
        case THREE.NearestMipMapNearestFilter:
        case THREE.NearestMipMapLinearFilter:
            return d.NEAREST;
        case THREE.LinearFilter:
        case THREE.LinearMipMapNearestFilter:
        case THREE.LinearMipMapLinearFilter:
            return d.LINEAR
        }
    }
    function A(g) {
        switch (g) {
        case THREE.RepeatWrapping:
            return d.REPEAT;
        case THREE.ClampToEdgeWrapping:
            return d.CLAMP_TO_EDGE;
        case THREE.MirroredRepeatWrapping:
            return d.MIRRORED_REPEAT;
        case THREE.NearestFilter:
            return d.NEAREST;
        case THREE.NearestMipMapNearestFilter:
            return d.NEAREST_MIPMAP_NEAREST;
        case THREE.NearestMipMapLinearFilter:
            return d.NEAREST_MIPMAP_LINEAR;
        case THREE.LinearFilter:
            return d.LINEAR;
        case THREE.LinearMipMapNearestFilter:
            return d.LINEAR_MIPMAP_NEAREST;
        case THREE.LinearMipMapLinearFilter:
            return d.LINEAR_MIPMAP_LINEAR;
        case THREE.ByteType:
            return d.BYTE;
        case THREE.UnsignedByteType:
            return d.UNSIGNED_BYTE;
        case THREE.ShortType:
            return d.SHORT;
        case THREE.UnsignedShortType:
            return d.UNSIGNED_SHORT;
        case THREE.IntType:
            return d.INT;
        case THREE.UnsignedShortType:
            return d.UNSIGNED_INT;
        case THREE.FloatType:
            return d.FLOAT;
        case THREE.AlphaFormat:
            return d.ALPHA;
        case THREE.RGBFormat:
            return d.RGB;
        case THREE.RGBAFormat:
            return d.RGBA;
        case THREE.LuminanceFormat:
            return d.LUMINANCE;
        case THREE.LuminanceAlphaFormat:
            return d.LUMINANCE_ALPHA
        }
        return 0
    }
    var oa = document.createElement("canvas"), d, Ba = null, Ca = null, Q = this, N = null, pa = null, ya = null, Da = null, qa = 0, V = 0, ha = 0, ia = 0, W = [new THREE.Vector4, new THREE.Vector4, new THREE.Vector4, new THREE.Vector4, new THREE.Vector4, new THREE.Vector4], S = new THREE.Matrix4, ta = new Float32Array(16), ka = new Float32Array(16), za = new THREE.Vector4, La = {
        ambient: [0, 0, 0],
        directional: {
            length: 0,
            colors: [],
            positions: []
        },
        point: {
            length: 0,
            colors: [],
            positions: []
        }
    }, la = !0, Na = new THREE.Color(0), Wa = 0;
    if (a) {
        if (a.antialias !== undefined)
            la = a.antialias;
        a.clearColor !== undefined && Na.setHex(a.clearColor);
        if (a.clearAlpha !== undefined)
            Wa = a.clearAlpha
    }
    this.maxMorphTargets = 8;
    this.domElement = oa;
    this.autoClear = !0;
    this.sortObjects = !0;
    (function(g, m, o) {
        try {
            if (!(d = oa.getContext("experimental-webgl", {
                antialias: g
            })))
                throw "Error creating WebGL context.";
        } catch (i) {
            console.error(i)
        }
        d.clearColor(0, 0, 0, 1);
        d.clearDepth(1);
        d.enable(d.DEPTH_TEST);
        d.depthFunc(d.LEQUAL);
        d.frontFace(d.CCW);
        d.cullFace(d.BACK);
        d.enable(d.CULL_FACE);
        d.enable(d.BLEND);
        d.blendFunc(d.ONE, d.ONE_MINUS_SRC_ALPHA);
        d.clearColor(m.r, m.g, m.b, o);
        _cullEnabled = !0
    }
    )(la, Na, Wa);
    this.context = d;
    this.setSize = function(g, m) {
        oa.width = g;
        oa.height = m;
        this.setViewport(0, 0, oa.width, oa.height)
    }
    ;
    this.setViewport = function(g, m, o, i) {
        qa = g;
        V = m;
        ha = o;
        ia = i;
        d.viewport(qa, V, ha, ia)
    }
    ;
    this.setScissor = function(g, m, o, i) {
        d.scissor(g, m, o, i)
    }
    ;
    this.enableScissorTest = function(g) {
        g ? d.enable(d.SCISSOR_TEST) : d.disable(d.SCISSOR_TEST)
    }
    ;
    this.enableDepthBufferWrite = function(g) {
        d.depthMask(g)
    }
    ;
    this.setClearColorHex = function(g, m) {
        var o = new THREE.Color(g);
        d.clearColor(o.r, o.g, o.b, m)
    }
    ;
    this.setClearColor = function(g, m) {
        d.clearColor(g.r, g.g, g.b, m)
    }
    ;
    this.clear = function() {
        d.clear(d.COLOR_BUFFER_BIT | d.DEPTH_BUFFER_BIT)
    }
    ;
    this.initMaterial = function(g, m, o, i) {
        var k, t, q;
        if (g instanceof THREE.MeshDepthMaterial)
            c(g, THREE.ShaderLib.depth);
        else if (g instanceof THREE.MeshNormalMaterial)
            c(g, THREE.ShaderLib.normal);
        else if (g instanceof THREE.MeshBasicMaterial)
            c(g, THREE.ShaderLib.basic);
        else if (g instanceof THREE.MeshLambertMaterial)
            c(g, THREE.ShaderLib.lambert);
        else if (g instanceof THREE.MeshPhongMaterial)
            c(g, THREE.ShaderLib.phong);
        else if (g instanceof THREE.LineBasicMaterial)
            c(g, THREE.ShaderLib.basic);
        else
            g instanceof THREE.ParticleBasicMaterial && c(g, THREE.ShaderLib.particle_basic);
        var r, D, w, v;
        q = w = v = 0;
        for (r = m.length; q < r; q++) {
            D = m[q];
            D instanceof THREE.DirectionalLight && w++;
            D instanceof THREE.PointLight && v++
        }
        if (v + w <= 4)
            m = w;
        else {
            m = Math.ceil(4 * w / (v + w));
            v = 4 - m
        }
        q = {
            directional: m,
            point: v
        };
        r = 50;
        if (i !== undefined && i instanceof THREE.SkinnedMesh)
            r = i.bones.length;
        v = g.fragmentShader;
        m = g.vertexShader;
        r = {
            fog: o,
            map: g.map,
            envMap: g.envMap,
            lightMap: g.lightMap,
            vertexColors: g.vertexColors,
            sizeAttenuation: g.sizeAttenuation,
            skinning: g.skinning,
            morphTargets: g.morphTargets,
            maxDirLights: q.directional,
            maxPointLights: q.point,
            maxBones: r
        };
        o = d.createProgram();
        q = ["#ifdef GL_ES\nprecision highp float;\n#endif", "#define MAX_DIR_LIGHTS " + r.maxDirLights, "#define MAX_POINT_LIGHTS " + r.maxPointLights, r.fog ? "#define USE_FOG" : "", r.fog instanceof THREE.FogExp2 ? "#define FOG_EXP2" : "", r.map ? "#define USE_MAP" : "", r.envMap ? "#define USE_ENVMAP" : "", r.lightMap ? "#define USE_LIGHTMAP" : "", r.vertexColors ? "#define USE_COLOR" : "", "uniform mat4 viewMatrix;\nuniform vec3 cameraPosition;\n"].join("\n");
        r = [d.getParameter(d.MAX_VERTEX_TEXTURE_IMAGE_UNITS) > 0 ? "#define VERTEX_TEXTURES" : "", "#define MAX_DIR_LIGHTS " + r.maxDirLights, "#define MAX_POINT_LIGHTS " + r.maxPointLights, "#define MAX_BONES " + r.maxBones, r.map ? "#define USE_MAP" : "", r.envMap ? "#define USE_ENVMAP" : "", r.lightMap ? "#define USE_LIGHTMAP" : "", r.vertexColors ? "#define USE_COLOR" : "", r.skinning ? "#define USE_SKINNING" : "", r.morphTargets ? "#define USE_MORPHTARGETS" : "", r.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "", "uniform mat4 objectMatrix;\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 viewMatrix;\nuniform mat3 normalMatrix;\nuniform vec3 cameraPosition;\nuniform mat4 cameraInverseMatrix;\nattribute vec3 position;\nattribute vec3 morphTarget0;\nattribute vec3 morphTarget1;\nattribute vec3 morphTarget2;\nattribute vec3 morphTarget3;\nattribute vec3 morphTarget4;\nattribute vec3 morphTarget5;\nattribute vec3 morphTarget6;\nattribute vec3 morphTarget7;\nattribute vec3 normal;\nattribute vec3 color;\nattribute vec2 uv;\nattribute vec2 uv2;\nattribute vec4 skinVertexA;\nattribute vec4 skinVertexB;\nattribute vec4 skinIndex;\nattribute vec4 skinWeight;\n"].join("\n");
        d.attachShader(o, sa("fragment", q + v));
        d.attachShader(o, sa("vertex", r + m));
        d.linkProgram(o);
        d.getProgramParameter(o, d.LINK_STATUS) || console.error("Could not initialise shader\nVALIDATE_STATUS: " + d.getProgramParameter(o, d.VALIDATE_STATUS) + ", gl error [" + d.getError() + "]");
        o.uniforms = {};
        o.attributes = {};
        g.program = o;
        o = ["viewMatrix", "modelViewMatrix", "projectionMatrix", "normalMatrix", "objectMatrix", "cameraPosition", "cameraInverseMatrix", "boneGlobalMatrices", "morphTargetInfluences"];
        for (k in g.uniforms)
            o.push(k);
        k = g.program;
        v = 0;
        for (m = o.length; v < m; v++) {
            q = o[v];
            k.uniforms[q] = d.getUniformLocation(k, q)
        }
        o = ["position", "normal", "uv", "uv2", "tangent", "color", "skinVertexA", "skinVertexB", "skinIndex", "skinWeight"];
        for (k = 0; k < this.maxMorphTargets; k++)
            o.push("morphTarget" + k);
        for (t in g.attributes)
            o.push(t);
        t = g.program;
        k = o;
        o = 0;
        for (v = k.length; o < v; o++) {
            m = k[o];
            t.attributes[m] = d.getAttribLocation(t, m)
        }
        t = g.program.attributes;
        d.enableVertexAttribArray(t.position);
        t.color >= 0 && d.enableVertexAttribArray(t.color);
        t.normal >= 0 && d.enableVertexAttribArray(t.normal);
        t.tangent >= 0 && d.enableVertexAttribArray(t.tangent);
        if (g.skinning && t.skinVertexA >= 0 && t.skinVertexB >= 0 && t.skinIndex >= 0 && t.skinWeight >= 0) {
            d.enableVertexAttribArray(t.skinVertexA);
            d.enableVertexAttribArray(t.skinVertexB);
            d.enableVertexAttribArray(t.skinIndex);
            d.enableVertexAttribArray(t.skinWeight)
        }
        if (g.morphTargets) {
            g.numSupportedMorphTargets = 0;
            if (t.morphTarget0 >= 0) {
                d.enableVertexAttribArray(t.morphTarget0);
                g.numSupportedMorphTargets++
            }
            if (t.morphTarget1 >= 0) {
                d.enableVertexAttribArray(t.morphTarget1);
                g.numSupportedMorphTargets++
            }
            if (t.morphTarget2 >= 0) {
                d.enableVertexAttribArray(t.morphTarget2);
                g.numSupportedMorphTargets++
            }
            if (t.morphTarget3 >= 0) {
                d.enableVertexAttribArray(t.morphTarget3);
                g.numSupportedMorphTargets++
            }
            if (t.morphTarget4 >= 0) {
                d.enableVertexAttribArray(t.morphTarget4);
                g.numSupportedMorphTargets++
            }
            if (t.morphTarget5 >= 0) {
                d.enableVertexAttribArray(t.morphTarget5);
                g.numSupportedMorphTargets++
            }
            if (t.morphTarget6 >= 0) {
                d.enableVertexAttribArray(t.morphTarget6);
                g.numSupportedMorphTargets++
            }
            if (t.morphTarget7 >= 0) {
                d.enableVertexAttribArray(t.morphTarget7);
                g.numSupportedMorphTargets++
            }
            i.__webGLMorphTargetInfluences = new Float32Array(this.maxMorphTargets);
            for (k = 0; k < this.maxMorphTargets; k++)
                i.__webGLMorphTargetInfluences[k] = 0
        }
    }
    ;
    this.render = function(g, m, o, i) {
        var k, t, q, r, D, w, v, M, X = g.lights, G = g.fog;
        m.matrixAutoUpdate && m.updateMatrix();
        g.update(undefined, !1, m);
        m.matrixWorldInverse.flattenToArray(ka);
        m.projectionMatrix.flattenToArray(ta);
        S.multiply(m.projectionMatrix, m.matrixWorldInverse);
        n(S);
        this.initWebGLObjects(g);
        ma(o);
        (this.autoClear || i) && this.clear();
        D = g.__webglObjects.length;
        for (i = 0; i < D; i++) {
            k = g.__webglObjects[i];
            v = k.object;
            if (v.visible)
                if (!(v instanceof THREE.Mesh) || s(v)) {
                    v.matrixWorld.flattenToArray(v._objectMatrixArray);
                    J(v, m);
                    C(k);
                    k.render = !0;
                    if (this.sortObjects) {
                        za.copy(v.position);
                        S.multiplyVector3(za);
                        k.z = za.z
                    }
                } else
                    k.render = !1;
            else
                k.render = !1
        }
        this.sortObjects && g.__webglObjects.sort(y);
        w = g.__webglObjectsImmediate.length;
        for (i = 0; i < w; i++) {
            k = g.__webglObjectsImmediate[i];
            v = k.object;
            if (v.visible) {
                v.matrixAutoUpdate && v.matrixWorld.flattenToArray(v._objectMatrixArray);
                J(v, m);
                z(k)
            }
        }
        L(THREE.NormalBlending);
        for (i = 0; i < D; i++) {
            k = g.__webglObjects[i];
            if (k.render) {
                v = k.object;
                M = k.buffer;
                q = k.opaque;
                j(v);
                for (k = 0; k < q.count; k++) {
                    r = q.list[k];
                    p(r.depthTest);
                    e(m, X, G, r, M, v)
                }
            }
        }
        for (i = 0; i < w; i++) {
            k = g.__webglObjectsImmediate[i];
            v = k.object;
            if (v.visible) {
                q = k.opaque;
                j(v);
                for (k = 0; k < q.count; k++) {
                    r = q.list[k];
                    p(r.depthTest);
                    t = f(m, X, G, r, v);
                    v.render(function(R) {
                        h(R, t)
                    })
                }
            }
        }
        for (i = 0; i < D; i++) {
            k = g.__webglObjects[i];
            if (k.render) {
                v = k.object;
                M = k.buffer;
                q = k.transparent;
                j(v);
                for (k = 0; k < q.count; k++) {
                    r = q.list[k];
                    L(r.blending);
                    p(r.depthTest);
                    e(m, X, G, r, M, v)
                }
            }
        }
        for (i = 0; i < w; i++) {
            k = g.__webglObjectsImmediate[i];
            v = k.object;
            if (v.visible) {
                q = k.transparent;
                j(v);
                for (k = 0; k < q.count; k++) {
                    r = q.list[k];
                    L(r.blending);
                    p(r.depthTest);
                    t = f(m, X, G, r, v);
                    v.render(function(R) {
                        h(R, t)
                    })
                }
            }
        }
        if (o && o.minFilter !== THREE.NearestFilter && o.minFilter !== THREE.LinearFilter) {
            d.bindTexture(d.TEXTURE_2D, o.__webGLTexture);
            d.generateMipmap(d.TEXTURE_2D);
            d.bindTexture(d.TEXTURE_2D, null)
        }
    }
    ;
    this.initWebGLObjects = function(g) {
        if (!g.__webglObjects) {
            g.__webglObjects = [];
            g.__webglObjectsImmediate = []
        }
        for (; g.__objectsAdded.length; ) {
            var m = g.__objectsAdded[0]
              , o = g
              , i = void 0
              , k = void 0
              , t = void 0;
            if (m._modelViewMatrix == undefined) {
                m._modelViewMatrix = new THREE.Matrix4;
                m._normalMatrixArray = new Float32Array(9);
                m._modelViewMatrixArray = new Float32Array(16);
                m._objectMatrixArray = new Float32Array(16);
                m.matrixWorld.flattenToArray(m._objectMatrixArray)
            }
            if (m instanceof THREE.Mesh) {
                k = m.geometry;
                k.geometryGroups == undefined && K(k);
                for (i in k.geometryGroups) {
                    t = k.geometryGroups[i];
                    if (!t.__webGLVertexBuffer) {
                        var q = t;
                        q.__webGLVertexBuffer = d.createBuffer();
                        q.__webGLNormalBuffer = d.createBuffer();
                        q.__webGLTangentBuffer = d.createBuffer();
                        q.__webGLColorBuffer = d.createBuffer();
                        q.__webGLUVBuffer = d.createBuffer();
                        q.__webGLUV2Buffer = d.createBuffer();
                        q.__webGLSkinVertexABuffer = d.createBuffer();
                        q.__webGLSkinVertexBBuffer = d.createBuffer();
                        q.__webGLSkinIndicesBuffer = d.createBuffer();
                        q.__webGLSkinWeightsBuffer = d.createBuffer();
                        q.__webGLFaceBuffer = d.createBuffer();
                        q.__webGLLineBuffer = d.createBuffer();
                        if (q.numMorphTargets) {
                            var r = void 0
                              , D = void 0;
                            q.__webGLMorphTargetsBuffers = [];
                            r = 0;
                            for (D = q.numMorphTargets; r < D; r++)
                                q.__webGLMorphTargetsBuffers.push(d.createBuffer())
                        }
                        q = t;
                        var w = m
                          , v = void 0
                          , M = void 0
                          , X = D = r = 0;
                        v = void 0;
                        M = void 0;
                        var G = void 0;
                        M = void 0;
                        var R = w.geometry;
                        G = R.faces;
                        var H = q.faces;
                        v = 0;
                        for (M = H.length; v < M; v++) {
                            fi = H[v];
                            face = G[fi];
                            if (face instanceof THREE.Face3) {
                                r += 3;
                                D += 1;
                                X += 3
                            } else if (face instanceof THREE.Face4) {
                                r += 4;
                                D += 2;
                                X += 4
                            }
                        }
                        v = q;
                        M = w;
                        G = void 0;
                        H = void 0;
                        var Z = void 0
                          , Ga = void 0;
                        Z = void 0;
                        var T = [];
                        G = 0;
                        for (H = M.materials.length; G < H; G++) {
                            Z = M.materials[G];
                            if (Z instanceof THREE.MeshFaceMaterial) {
                                Z = 0;
                                for (l = v.materials.length; Z < l; Z++)
                                    (Ga = v.materials[Z]) && T.push(Ga)
                            } else
                                (Ga = Z) && T.push(Ga)
                        }
                        M = T;
                        a: {
                            v = void 0;
                            G = void 0;
                            H = M.length;
                            for (v = 0; v < H; v++) {
                                G = M[v];
                                if (G.map || G.lightMap || G instanceof THREE.MeshShaderMaterial) {
                                    v = !0;
                                    break a
                                }
                            }
                            v = !1
                        }
                        a: {
                            G = void 0;
                            H = void 0;
                            T = M.length;
                            for (G = 0; G < T; G++) {
                                H = M[G];
                                if (!(H instanceof THREE.MeshBasicMaterial && !H.envMap || H instanceof THREE.MeshDepthMaterial)) {
                                    G = H && H.shading != undefined && H.shading == THREE.SmoothShading ? THREE.SmoothShading : THREE.FlatShading;
                                    break a
                                }
                            }
                            G = !1
                        }
                        a: {
                            H = void 0;
                            T = void 0;
                            Z = M.length;
                            for (H = 0; H < Z; H++) {
                                T = M[H];
                                if (T.vertexColors) {
                                    M = T.vertexColors;
                                    break a
                                }
                            }
                            M = !1
                        }
                        q.__vertexArray = new Float32Array(r * 3);
                        if (G)
                            q.__normalArray = new Float32Array(r * 3);
                        if (R.hasTangents)
                            q.__tangentArray = new Float32Array(r * 4);
                        if (M)
                            q.__colorArray = new Float32Array(r * 3);
                        if (v) {
                            if (R.faceUvs.length > 0 || R.faceVertexUvs.length > 0)
                                q.__uvArray = new Float32Array(r * 2);
                            if (R.faceUvs.length > 1 || R.faceVertexUvs.length > 1)
                                q.__uv2Array = new Float32Array(r * 2)
                        }
                        if (w.geometry.skinWeights.length && w.geometry.skinIndices.length) {
                            q.__skinVertexAArray = new Float32Array(r * 4);
                            q.__skinVertexBArray = new Float32Array(r * 4);
                            q.__skinIndexArray = new Float32Array(r * 4);
                            q.__skinWeightArray = new Float32Array(r * 4)
                        }
                        q.__faceArray = new Uint16Array(D * 3);
                        q.__lineArray = new Uint16Array(X * 2);
                        if (q.numMorphTargets) {
                            w = void 0;
                            R = void 0;
                            q.__morphTargetsArrays = [];
                            w = 0;
                            for (R = q.numMorphTargets; w < R; w++)
                                q.__morphTargetsArrays.push(new Float32Array(r * 3))
                        }
                        q.__needsSmoothNormals = G == THREE.SmoothShading;
                        q.__uvType = v;
                        q.__vertexColorType = M;
                        q.__normalType = G;
                        q.__webGLFaceCount = D * 3;
                        q.__webGLLineCount = X * 2;
                        k.__dirtyVertices = !0;
                        k.__dirtyMorphTargets = !0;
                        k.__dirtyElements = !0;
                        k.__dirtyUvs = !0;
                        k.__dirtyNormals = !0;
                        k.__dirtyTangents = !0;
                        k.__dirtyColors = !0
                    }
                    P(o.__webglObjects, t, m)
                }
            } else if (m instanceof THREE.Ribbon) {
                k = m.geometry;
                if (!k.__webGLVertexBuffer) {
                    i = k;
                    i.__webGLVertexBuffer = d.createBuffer();
                    i.__webGLColorBuffer = d.createBuffer();
                    i = k;
                    t = i.vertices.length;
                    i.__vertexArray = new Float32Array(t * 3);
                    i.__colorArray = new Float32Array(t * 3);
                    i.__webGLVertexCount = t;
                    k.__dirtyVertices = !0;
                    k.__dirtyColors = !0
                }
                P(o.__webglObjects, k, m)
            } else if (m instanceof THREE.Line) {
                k = m.geometry;
                if (!k.__webGLVertexBuffer) {
                    i = k;
                    i.__webGLVertexBuffer = d.createBuffer();
                    i.__webGLColorBuffer = d.createBuffer();
                    i = k;
                    t = i.vertices.length;
                    i.__vertexArray = new Float32Array(t * 3);
                    i.__colorArray = new Float32Array(t * 3);
                    i.__webGLLineCount = t;
                    k.__dirtyVertices = !0;
                    k.__dirtyColors = !0
                }
                P(o.__webglObjects, k, m)
            } else if (m instanceof THREE.ParticleSystem) {
                k = m.geometry;
                if (!k.__webGLVertexBuffer) {
                    i = k;
                    i.__webGLVertexBuffer = d.createBuffer();
                    i.__webGLColorBuffer = d.createBuffer();
                    i = k;
                    t = i.vertices.length;
                    i.__vertexArray = new Float32Array(t * 3);
                    i.__colorArray = new Float32Array(t * 3);
                    i.__sortArray = [];
                    i.__webGLParticleCount = t;
                    k.__dirtyVertices = !0;
                    k.__dirtyColors = !0
                }
                P(o.__webglObjects, k, m)
            } else
                THREE.MarchingCubes !== undefined && m instanceof THREE.MarchingCubes && o.__webglObjectsImmediate.push({
                    object: m,
                    opaque: {
                        list: [],
                        count: 0
                    },
                    transparent: {
                        list: [],
                        count: 0
                    }
                });
            g.__objectsAdded.splice(0, 1)
        }
        for (; g.__objectsRemoved.length; ) {
            m = g.__objectsRemoved[0];
            o = g;
            k = void 0;
            i = void 0;
            for (k = o.__webglObjects.length - 1; k >= 0; k--) {
                i = o.__webglObjects[k].object;
                m == i && o.__webglObjects.splice(k, 1)
            }
            g.__objectsRemoved.splice(0, 1)
        }
        m = 0;
        for (o = g.__webglObjects.length; m < o; m++) {
            i = g.__webglObjects[m].object;
            t = void 0;
            k = void 0;
            q = void 0;
            if (i instanceof THREE.Mesh) {
                k = i.geometry;
                for (t in k.geometryGroups) {
                    q = k.geometryGroups[t];
                    if (k.__dirtyVertices || k.__dirtyMorphTargets || k.__dirtyElements || k.__dirtyUvs || k.__dirtyNormals || k.__dirtyColors || k.__dirtyTangents) {
                        r = d.DYNAMIC_DRAW;
                        D = void 0;
                        X = void 0;
                        var $ = void 0
                          , B = void 0;
                        $ = void 0;
                        var Aa = void 0
                          , Y = void 0
                          , Ha = void 0
                          , O = void 0;
                        w = void 0;
                        R = void 0;
                        v = void 0;
                        M = void 0;
                        G = void 0;
                        var E = void 0
                          , F = void 0
                          , I = void 0
                          , na = void 0;
                        Y = void 0;
                        Ha = void 0;
                        B = void 0;
                        O = void 0;
                        B = void 0;
                        E = void 0;
                        F = void 0;
                        Y = void 0;
                        E = void 0;
                        F = void 0;
                        I = void 0;
                        na = void 0;
                        E = void 0;
                        F = void 0;
                        I = void 0;
                        na = void 0;
                        E = void 0;
                        F = void 0;
                        I = void 0;
                        na = void 0;
                        E = void 0;
                        F = void 0;
                        I = void 0;
                        B = void 0;
                        O = void 0;
                        Aa = void 0;
                        $ = void 0;
                        $ = void 0;
                        var Ea = void 0
                          , Xa = void 0
                          , ua = void 0
                          , Oa = Ga = Z = T = H = 0
                          , Ia = 0
                          , aa = 0
                          , Ja = 0
                          , ra = 0
                          , u = 0
                          , va = 0
                          , wa = q.__vertexArray
                          , Za = q.__uvArray
                          , $a = q.__uv2Array
                          , Ma = q.__normalArray
                          , ca = q.__tangentArray
                          , xa = q.__colorArray
                          , da = q.__skinVertexAArray
                          , ea = q.__skinVertexBArray
                          , fa = q.__skinIndexArray
                          , ga = q.__skinWeightArray
                          , ab = q.__morphTargetsArrays
                          , Pa = q.__faceArray
                          , Ka = q.__lineArray
                          , hb = q.__needsSmoothNormals;
                        R = q.__vertexColorType;
                        w = q.__uvType;
                        v = q.__normalType;
                        var Fa = i.geometry
                          , bb = Fa.__dirtyVertices
                          , cb = Fa.__dirtyElements
                          , Ya = Fa.__dirtyUvs
                          , db = Fa.__dirtyNormals
                          , eb = Fa.__dirtyTangents
                          , fb = Fa.__dirtyColors
                          , gb = Fa.__dirtyMorphTargets
                          , Sa = Fa.vertices
                          , ib = q.faces
                          , lb = Fa.faces
                          , jb = Fa.faceVertexUvs[0]
                          , kb = Fa.faceVertexUvs[1]
                          , Ta = Fa.skinVerticesA
                          , Ua = Fa.skinVerticesB
                          , Va = Fa.skinIndices
                          , Ra = Fa.skinWeights
                          , Qa = Fa.morphTargets;
                        D = 0;
                        for (X = ib.length; D < X; D++) {
                            $ = ib[D];
                            B = lb[$];
                            jb && (M = jb[$]);
                            kb && (G = kb[$]);
                            $ = B.vertexNormals;
                            Aa = B.normal;
                            Y = B.vertexColors;
                            Ha = B.color;
                            O = B.vertexTangents;
                            if (B instanceof THREE.Face3) {
                                if (bb) {
                                    E = Sa[B.a].position;
                                    F = Sa[B.b].position;
                                    I = Sa[B.c].position;
                                    wa[T] = E.x;
                                    wa[T + 1] = E.y;
                                    wa[T + 2] = E.z;
                                    wa[T + 3] = F.x;
                                    wa[T + 4] = F.y;
                                    wa[T + 5] = F.z;
                                    wa[T + 6] = I.x;
                                    wa[T + 7] = I.y;
                                    wa[T + 8] = I.z;
                                    T += 9
                                }
                                if (gb) {
                                    Ea = 0;
                                    for (Xa = Qa.length; Ea < Xa; Ea++) {
                                        E = Qa[Ea].vertices[B.a].position;
                                        F = Qa[Ea].vertices[B.b].position;
                                        I = Qa[Ea].vertices[B.c].position;
                                        ua = ab[Ea];
                                        ua[va + 0] = E.x;
                                        ua[va + 1] = E.y;
                                        ua[va + 2] = E.z;
                                        ua[va + 3] = F.x;
                                        ua[va + 4] = F.y;
                                        ua[va + 5] = F.z;
                                        ua[va + 6] = I.x;
                                        ua[va + 7] = I.y;
                                        ua[va + 8] = I.z
                                    }
                                    va += 9
                                }
                                if (Ra.length) {
                                    E = Ra[B.a];
                                    F = Ra[B.b];
                                    I = Ra[B.c];
                                    ga[u] = E.x;
                                    ga[u + 1] = E.y;
                                    ga[u + 2] = E.z;
                                    ga[u + 3] = E.w;
                                    ga[u + 4] = F.x;
                                    ga[u + 5] = F.y;
                                    ga[u + 6] = F.z;
                                    ga[u + 7] = F.w;
                                    ga[u + 8] = I.x;
                                    ga[u + 9] = I.y;
                                    ga[u + 10] = I.z;
                                    ga[u + 11] = I.w;
                                    E = Va[B.a];
                                    F = Va[B.b];
                                    I = Va[B.c];
                                    fa[u] = E.x;
                                    fa[u + 1] = E.y;
                                    fa[u + 2] = E.z;
                                    fa[u + 3] = E.w;
                                    fa[u + 4] = F.x;
                                    fa[u + 5] = F.y;
                                    fa[u + 6] = F.z;
                                    fa[u + 7] = F.w;
                                    fa[u + 8] = I.x;
                                    fa[u + 9] = I.y;
                                    fa[u + 10] = I.z;
                                    fa[u + 11] = I.w;
                                    E = Ta[B.a];
                                    F = Ta[B.b];
                                    I = Ta[B.c];
                                    da[u] = E.x;
                                    da[u + 1] = E.y;
                                    da[u + 2] = E.z;
                                    da[u + 3] = 1;
                                    da[u + 4] = F.x;
                                    da[u + 5] = F.y;
                                    da[u + 6] = F.z;
                                    da[u + 7] = 1;
                                    da[u + 8] = I.x;
                                    da[u + 9] = I.y;
                                    da[u + 10] = I.z;
                                    da[u + 11] = 1;
                                    E = Ua[B.a];
                                    F = Ua[B.b];
                                    I = Ua[B.c];
                                    ea[u] = E.x;
                                    ea[u + 1] = E.y;
                                    ea[u + 2] = E.z;
                                    ea[u + 3] = 1;
                                    ea[u + 4] = F.x;
                                    ea[u + 5] = F.y;
                                    ea[u + 6] = F.z;
                                    ea[u + 7] = 1;
                                    ea[u + 8] = I.x;
                                    ea[u + 9] = I.y;
                                    ea[u + 10] = I.z;
                                    ea[u + 11] = 1;
                                    u += 12
                                }
                                if (fb && R) {
                                    if (Y.length == 3 && R == THREE.VertexColors) {
                                        B = Y[0];
                                        E = Y[1];
                                        F = Y[2]
                                    } else
                                        F = E = B = Ha;
                                    xa[ra] = B.r;
                                    xa[ra + 1] = B.g;
                                    xa[ra + 2] = B.b;
                                    xa[ra + 3] = E.r;
                                    xa[ra + 4] = E.g;
                                    xa[ra + 5] = E.b;
                                    xa[ra + 6] = F.r;
                                    xa[ra + 7] = F.g;
                                    xa[ra + 8] = F.b;
                                    ra += 9
                                }
                                if (eb && Fa.hasTangents) {
                                    Y = O[0];
                                    Ha = O[1];
                                    B = O[2];
                                    ca[aa] = Y.x;
                                    ca[aa + 1] = Y.y;
                                    ca[aa + 2] = Y.z;
                                    ca[aa + 3] = Y.w;
                                    ca[aa + 4] = Ha.x;
                                    ca[aa + 5] = Ha.y;
                                    ca[aa + 6] = Ha.z;
                                    ca[aa + 7] = Ha.w;
                                    ca[aa + 8] = B.x;
                                    ca[aa + 9] = B.y;
                                    ca[aa + 10] = B.z;
                                    ca[aa + 11] = B.w;
                                    aa += 12
                                }
                                if (db && v)
                                    if ($.length == 3 && hb)
                                        for (O = 0; O < 3; O++) {
                                            Aa = $[O];
                                            Ma[Ia] = Aa.x;
                                            Ma[Ia + 1] = Aa.y;
                                            Ma[Ia + 2] = Aa.z;
                                            Ia += 3
                                        }
                                    else
                                        for (O = 0; O < 3; O++) {
                                            Ma[Ia] = Aa.x;
                                            Ma[Ia + 1] = Aa.y;
                                            Ma[Ia + 2] = Aa.z;
                                            Ia += 3
                                        }
                                if (Ya && M !== undefined && w)
                                    for (O = 0; O < 3; O++) {
                                        $ = M[O];
                                        Za[Z] = $.u;
                                        Za[Z + 1] = $.v;
                                        Z += 2
                                    }
                                if (Ya && G !== undefined && w)
                                    for (O = 0; O < 3; O++) {
                                        $ = G[O];
                                        $a[Ga] = $.u;
                                        $a[Ga + 1] = $.v;
                                        Ga += 2
                                    }
                                if (cb) {
                                    Pa[Oa] = H;
                                    Pa[Oa + 1] = H + 1;
                                    Pa[Oa + 2] = H + 2;
                                    Oa += 3;
                                    Ka[Ja] = H;
                                    Ka[Ja + 1] = H + 1;
                                    Ka[Ja + 2] = H;
                                    Ka[Ja + 3] = H + 2;
                                    Ka[Ja + 4] = H + 1;
                                    Ka[Ja + 5] = H + 2;
                                    Ja += 6;
                                    H += 3
                                }
                            } else if (B instanceof THREE.Face4) {
                                if (bb) {
                                    E = Sa[B.a].position;
                                    F = Sa[B.b].position;
                                    I = Sa[B.c].position;
                                    na = Sa[B.d].position;
                                    wa[T] = E.x;
                                    wa[T + 1] = E.y;
                                    wa[T + 2] = E.z;
                                    wa[T + 3] = F.x;
                                    wa[T + 4] = F.y;
                                    wa[T + 5] = F.z;
                                    wa[T + 6] = I.x;
                                    wa[T + 7] = I.y;
                                    wa[T + 8] = I.z;
                                    wa[T + 9] = na.x;
                                    wa[T + 10] = na.y;
                                    wa[T + 11] = na.z;
                                    T += 12
                                }
                                if (gb) {
                                    Ea = 0;
                                    for (Xa = Qa.length; Ea < Xa; Ea++) {
                                        E = Qa[Ea].vertices[B.a].position;
                                        F = Qa[Ea].vertices[B.b].position;
                                        I = Qa[Ea].vertices[B.c].position;
                                        na = Qa[Ea].vertices[B.d].position;
                                        ua = ab[Ea];
                                        ua[va + 0] = E.x;
                                        ua[va + 1] = E.y;
                                        ua[va + 2] = E.z;
                                        ua[va + 3] = F.x;
                                        ua[va + 4] = F.y;
                                        ua[va + 5] = F.z;
                                        ua[va + 6] = I.x;
                                        ua[va + 7] = I.y;
                                        ua[va + 8] = I.z;
                                        ua[va + 9] = na.x;
                                        ua[va + 10] = na.y;
                                        ua[va + 11] = na.z
                                    }
                                    va += 12
                                }
                                if (Ra.length) {
                                    E = Ra[B.a];
                                    F = Ra[B.b];
                                    I = Ra[B.c];
                                    na = Ra[B.d];
                                    ga[u] = E.x;
                                    ga[u + 1] = E.y;
                                    ga[u + 2] = E.z;
                                    ga[u + 3] = E.w;
                                    ga[u + 4] = F.x;
                                    ga[u + 5] = F.y;
                                    ga[u + 6] = F.z;
                                    ga[u + 7] = F.w;
                                    ga[u + 8] = I.x;
                                    ga[u + 9] = I.y;
                                    ga[u + 10] = I.z;
                                    ga[u + 11] = I.w;
                                    ga[u + 12] = na.x;
                                    ga[u + 13] = na.y;
                                    ga[u + 14] = na.z;
                                    ga[u + 15] = na.w;
                                    E = Va[B.a];
                                    F = Va[B.b];
                                    I = Va[B.c];
                                    na = Va[B.d];
                                    fa[u] = E.x;
                                    fa[u + 1] = E.y;
                                    fa[u + 2] = E.z;
                                    fa[u + 3] = E.w;
                                    fa[u + 4] = F.x;
                                    fa[u + 5] = F.y;
                                    fa[u + 6] = F.z;
                                    fa[u + 7] = F.w;
                                    fa[u + 8] = I.x;
                                    fa[u + 9] = I.y;
                                    fa[u + 10] = I.z;
                                    fa[u + 11] = I.w;
                                    fa[u + 12] = na.x;
                                    fa[u + 13] = na.y;
                                    fa[u + 14] = na.z;
                                    fa[u + 15] = na.w;
                                    E = Ta[B.a];
                                    F = Ta[B.b];
                                    I = Ta[B.c];
                                    na = Ta[B.d];
                                    da[u] = E.x;
                                    da[u + 1] = E.y;
                                    da[u + 2] = E.z;
                                    da[u + 3] = 1;
                                    da[u + 4] = F.x;
                                    da[u + 5] = F.y;
                                    da[u + 6] = F.z;
                                    da[u + 7] = 1;
                                    da[u + 8] = I.x;
                                    da[u + 9] = I.y;
                                    da[u + 10] = I.z;
                                    da[u + 11] = 1;
                                    da[u + 12] = na.x;
                                    da[u + 13] = na.y;
                                    da[u + 14] = na.z;
                                    da[u + 15] = 1;
                                    E = Ua[B.a];
                                    F = Ua[B.b];
                                    I = Ua[B.c];
                                    B = Ua[B.d];
                                    ea[u] = E.x;
                                    ea[u + 1] = E.y;
                                    ea[u + 2] = E.z;
                                    ea[u + 3] = 1;
                                    ea[u + 4] = F.x;
                                    ea[u + 5] = F.y;
                                    ea[u + 6] = F.z;
                                    ea[u + 7] = 1;
                                    ea[u + 8] = I.x;
                                    ea[u + 9] = I.y;
                                    ea[u + 10] = I.z;
                                    ea[u + 11] = 1;
                                    ea[u + 12] = B.x;
                                    ea[u + 13] = B.y;
                                    ea[u + 14] = B.z;
                                    ea[u + 15] = 1;
                                    u += 16
                                }
                                if (fb && R) {
                                    if (Y.length == 4 && R == THREE.VertexColors) {
                                        B = Y[0];
                                        E = Y[1];
                                        F = Y[2];
                                        Y = Y[3]
                                    } else
                                        Y = F = E = B = Ha;
                                    xa[ra] = B.r;
                                    xa[ra + 1] = B.g;
                                    xa[ra + 2] = B.b;
                                    xa[ra + 3] = E.r;
                                    xa[ra + 4] = E.g;
                                    xa[ra + 5] = E.b;
                                    xa[ra + 6] = F.r;
                                    xa[ra + 7] = F.g;
                                    xa[ra + 8] = F.b;
                                    xa[ra + 9] = Y.r;
                                    xa[ra + 10] = Y.g;
                                    xa[ra + 11] = Y.b;
                                    ra += 12
                                }
                                if (eb && Fa.hasTangents) {
                                    Y = O[0];
                                    Ha = O[1];
                                    B = O[2];
                                    O = O[3];
                                    ca[aa] = Y.x;
                                    ca[aa + 1] = Y.y;
                                    ca[aa + 2] = Y.z;
                                    ca[aa + 3] = Y.w;
                                    ca[aa + 4] = Ha.x;
                                    ca[aa + 5] = Ha.y;
                                    ca[aa + 6] = Ha.z;
                                    ca[aa + 7] = Ha.w;
                                    ca[aa + 8] = B.x;
                                    ca[aa + 9] = B.y;
                                    ca[aa + 10] = B.z;
                                    ca[aa + 11] = B.w;
                                    ca[aa + 12] = O.x;
                                    ca[aa + 13] = O.y;
                                    ca[aa + 14] = O.z;
                                    ca[aa + 15] = O.w;
                                    aa += 16
                                }
                                if (db && v)
                                    if ($.length == 4 && hb)
                                        for (O = 0; O < 4; O++) {
                                            Aa = $[O];
                                            Ma[Ia] = Aa.x;
                                            Ma[Ia + 1] = Aa.y;
                                            Ma[Ia + 2] = Aa.z;
                                            Ia += 3
                                        }
                                    else
                                        for (O = 0; O < 4; O++) {
                                            Ma[Ia] = Aa.x;
                                            Ma[Ia + 1] = Aa.y;
                                            Ma[Ia + 2] = Aa.z;
                                            Ia += 3
                                        }
                                if (Ya && M !== undefined && w)
                                    for (O = 0; O < 4; O++) {
                                        $ = M[O];
                                        Za[Z] = $.u;
                                        Za[Z + 1] = $.v;
                                        Z += 2
                                    }
                                if (Ya && G !== undefined && w)
                                    for (O = 0; O < 4; O++) {
                                        $ = G[O];
                                        $a[Ga] = $.u;
                                        $a[Ga + 1] = $.v;
                                        Ga += 2
                                    }
                                if (cb) {
                                    Pa[Oa] = H;
                                    Pa[Oa + 1] = H + 1;
                                    Pa[Oa + 2] = H + 3;
                                    Pa[Oa + 3] = H + 1;
                                    Pa[Oa + 4] = H + 2;
                                    Pa[Oa + 5] = H + 3;
                                    Oa += 6;
                                    Ka[Ja] = H;
                                    Ka[Ja + 1] = H + 1;
                                    Ka[Ja + 2] = H;
                                    Ka[Ja + 3] = H + 3;
                                    Ka[Ja + 4] = H + 1;
                                    Ka[Ja + 5] = H + 2;
                                    Ka[Ja + 6] = H + 2;
                                    Ka[Ja + 7] = H + 3;
                                    Ja += 8;
                                    H += 4
                                }
                            }
                        }
                        if (bb) {
                            d.bindBuffer(d.ARRAY_BUFFER, q.__webGLVertexBuffer);
                            d.bufferData(d.ARRAY_BUFFER, wa, r)
                        }
                        if (gb) {
                            Ea = 0;
                            for (Xa = Qa.length; Ea < Xa; Ea++) {
                                d.bindBuffer(d.ARRAY_BUFFER, q.__webGLMorphTargetsBuffers[Ea]);
                                d.bufferData(d.ARRAY_BUFFER, ab[Ea], r)
                            }
                        }
                        if (fb && ra > 0) {
                            d.bindBuffer(d.ARRAY_BUFFER, q.__webGLColorBuffer);
                            d.bufferData(d.ARRAY_BUFFER, xa, r)
                        }
                        if (db) {
                            d.bindBuffer(d.ARRAY_BUFFER, q.__webGLNormalBuffer);
                            d.bufferData(d.ARRAY_BUFFER, Ma, r)
                        }
                        if (eb && Fa.hasTangents) {
                            d.bindBuffer(d.ARRAY_BUFFER, q.__webGLTangentBuffer);
                            d.bufferData(d.ARRAY_BUFFER, ca, r)
                        }
                        if (Ya && Z > 0) {
                            d.bindBuffer(d.ARRAY_BUFFER, q.__webGLUVBuffer);
                            d.bufferData(d.ARRAY_BUFFER, Za, r)
                        }
                        if (Ya && Ga > 0) {
                            d.bindBuffer(d.ARRAY_BUFFER, q.__webGLUV2Buffer);
                            d.bufferData(d.ARRAY_BUFFER, $a, r)
                        }
                        if (cb) {
                            d.bindBuffer(d.ELEMENT_ARRAY_BUFFER, q.__webGLFaceBuffer);
                            d.bufferData(d.ELEMENT_ARRAY_BUFFER, Pa, r);
                            d.bindBuffer(d.ELEMENT_ARRAY_BUFFER, q.__webGLLineBuffer);
                            d.bufferData(d.ELEMENT_ARRAY_BUFFER, Ka, r)
                        }
                        if (u > 0) {
                            d.bindBuffer(d.ARRAY_BUFFER, q.__webGLSkinVertexABuffer);
                            d.bufferData(d.ARRAY_BUFFER, da, r);
                            d.bindBuffer(d.ARRAY_BUFFER, q.__webGLSkinVertexBBuffer);
                            d.bufferData(d.ARRAY_BUFFER, ea, r);
                            d.bindBuffer(d.ARRAY_BUFFER, q.__webGLSkinIndicesBuffer);
                            d.bufferData(d.ARRAY_BUFFER, fa, r);
                            d.bindBuffer(d.ARRAY_BUFFER, q.__webGLSkinWeightsBuffer);
                            d.bufferData(d.ARRAY_BUFFER, ga, r)
                        }
                    }
                }
                k.__dirtyVertices = !1;
                k.__dirtyMorphTargets = !1;
                k.__dirtyElements = !1;
                k.__dirtyUvs = !1;
                k.__dirtyNormals = !1;
                k.__dirtyTangents = !1;
                k.__dirtyColors = !1
            } else if (i instanceof THREE.Ribbon) {
                k = i.geometry;
                if (k.__dirtyVertices || k.__dirtyColors) {
                    i = k;
                    t = d.DYNAMIC_DRAW;
                    w = void 0;
                    w = void 0;
                    R = void 0;
                    q = void 0;
                    v = i.vertices;
                    r = i.colors;
                    M = v.length;
                    D = r.length;
                    G = i.__vertexArray;
                    X = i.__colorArray;
                    H = i.__dirtyColors;
                    if (i.__dirtyVertices) {
                        for (w = 0; w < M; w++) {
                            R = v[w].position;
                            q = w * 3;
                            G[q] = R.x;
                            G[q + 1] = R.y;
                            G[q + 2] = R.z
                        }
                        d.bindBuffer(d.ARRAY_BUFFER, i.__webGLVertexBuffer);
                        d.bufferData(d.ARRAY_BUFFER, G, t)
                    }
                    if (H) {
                        for (w = 0; w < D; w++) {
                            color = r[w];
                            q = w * 3;
                            X[q] = color.r;
                            X[q + 1] = color.g;
                            X[q + 2] = color.b
                        }
                        d.bindBuffer(d.ARRAY_BUFFER, i.__webGLColorBuffer);
                        d.bufferData(d.ARRAY_BUFFER, X, t)
                    }
                }
                k.__dirtyVertices = !1;
                k.__dirtyColors = !1
            } else if (i instanceof THREE.Line) {
                k = i.geometry;
                if (k.__dirtyVertices || k.__dirtyColors) {
                    i = k;
                    t = d.DYNAMIC_DRAW;
                    w = void 0;
                    w = void 0;
                    R = void 0;
                    q = void 0;
                    v = i.vertices;
                    r = i.colors;
                    M = v.length;
                    D = r.length;
                    G = i.__vertexArray;
                    X = i.__colorArray;
                    H = i.__dirtyColors;
                    if (i.__dirtyVertices) {
                        for (w = 0; w < M; w++) {
                            R = v[w].position;
                            q = w * 3;
                            G[q] = R.x;
                            G[q + 1] = R.y;
                            G[q + 2] = R.z
                        }
                        d.bindBuffer(d.ARRAY_BUFFER, i.__webGLVertexBuffer);
                        d.bufferData(d.ARRAY_BUFFER, G, t)
                    }
                    if (H) {
                        for (w = 0; w < D; w++) {
                            color = r[w];
                            q = w * 3;
                            X[q] = color.r;
                            X[q + 1] = color.g;
                            X[q + 2] = color.b
                        }
                        d.bindBuffer(d.ARRAY_BUFFER, i.__webGLColorBuffer);
                        d.bufferData(d.ARRAY_BUFFER, X, t)
                    }
                }
                k.__dirtyVertices = !1;
                k.__dirtyColors = !1
            } else if (i instanceof THREE.ParticleSystem) {
                k = i.geometry;
                (k.__dirtyVertices || k.__dirtyColors || i.sortParticles) && b(k, d.DYNAMIC_DRAW, i);
                k.__dirtyVertices = !1;
                k.__dirtyColors = !1
            }
        }
    }
    ;
    this.setFaceCulling = function(g, m) {
        if (g) {
            !m || m == "ccw" ? d.frontFace(d.CCW) : d.frontFace(d.CW);
            if (g == "back")
                d.cullFace(d.BACK);
            else
                g == "front" ? d.cullFace(d.FRONT) : d.cullFace(d.FRONT_AND_BACK);
            d.enable(d.CULL_FACE)
        } else
            d.disable(d.CULL_FACE)
    }
    ;
    this.supportsVertexTextures = function() {
        return d.getParameter(d.MAX_VERTEX_TEXTURE_IMAGE_UNITS) > 0
    }
}
;
