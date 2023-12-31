// ThreeExtras.js r37 - http://github.com/mrdoob/three.js
var GeometryUtils = {
    merge: function(a, e) {
        var b = e instanceof THREE.Mesh
          , c = a.vertices.length
          , g = b ? e.geometry : e
          , f = a.vertices
          , d = g.vertices
          , h = a.faces
          , j = g.faces
          , l = a.faceVertexUvs[0];
        g = g.faceVertexUvs[0];
        b && e.matrixAutoUpdate && e.updateMatrix();
        for (var k = 0, o = d.length; k < o; k++) {
            var q = new THREE.Vertex(d[k].position.clone());
            b && e.matrix.multiplyVector3(q.position);
            f.push(q)
        }
        k = 0;
        for (o = j.length; k < o; k++) {
            d = j[k];
            var m, t, A = d.vertexNormals;
            q = d.vertexColors;
            if (d instanceof THREE.Face3)
                m = new THREE.Face3(d.a + c,d.b + c,d.c + c);
            else
                d instanceof THREE.Face4 && (m = new THREE.Face4(d.a + c,d.b + c,d.c + c,d.d + c));
            m.normal.copy(d.normal);
            b = 0;
            for (f = A.length; b < f; b++) {
                t = A[b];
                m.vertexNormals.push(t.clone())
            }
            m.color.copy(d.color);
            b = 0;
            for (f = q.length; b < f; b++) {
                t = q[b];
                m.vertexColors.push(t.clone())
            }
            m.materials = d.materials.slice();
            m.centroid.copy(d.centroid);
            h.push(m)
        }
        k = 0;
        for (o = g.length; k < o; k++) {
            c = g[k];
            h = [];
            b = 0;
            for (f = c.length; b < f; b++)
                h.push(new THREE.UV(c[b].u,c[b].v));
            l.push(h)
        }
    }
}
  , ImageUtils = {
    loadTexture: function(a, e, b) {
        var c = new Image
          , g = new THREE.Texture(c,e);
        c.onload = function() {
            g.needsUpdate = !0;
            b && b(this)
        }
        ;
        c.src = a;
        return g
    },
    loadTextureCube: function(a, e, b) {
        var c, g = [], f = new THREE.Texture(g,e);
        e = g.loadCount = 0;
        for (c = a.length; e < c; ++e) {
            g[e] = new Image;
            g[e].onload = function() {
                g.loadCount += 1;
                if (g.loadCount == 6)
                    f.needsUpdate = !0;
                b && b(this)
            }
            ;
            g[e].src = a[e]
        }
        return f
    }
}
  , SceneUtils = {
    loadScene: function(a, e, b, c) {
        a = new Worker(a);
        a.postMessage(0);
        a.onmessage = function(g) {
            function f() {
                for (k in F.objects)
                    if (!E.objects[k]) {
                        A = F.objects[k];
                        if (n = E.geometries[A.geometry]) {
                            M = [];
                            for (i = 0; i < A.materials.length; i++)
                                M[i] = E.materials[A.materials[i]];
                            z = A.position;
                            r = A.rotation;
                            s = A.scale;
                            object = new THREE.Mesh(n,M);
                            object.position.set(z[0], z[1], z[2]);
                            object.rotation.set(r[0], r[1], r[2]);
                            object.scale.set(s[0], s[1], s[2]);
                            object.visible = A.visible;
                            E.scene.addObject(object);
                            E.objects[k] = object
                        }
                    }
            }
            function d(O) {
                return function(U) {
                    E.geometries[O] = U;
                    f();
                    K -= 1;
                    h()
                }
            }
            function h() {
                c({
                    total_models: P,
                    total_textures: Q,
                    loaded_models: P - K,
                    loaded_textures: Q - L
                }, E);
                K == 0 && L == 0 && b(E)
            }
            var j, l, k, o, q, m, t, A, z, x, y, n, H, D, M, F, J, I, K, L, P, Q, E;
            F = g.data;
            J = new THREE.BinaryLoader;
            I = new THREE.JSONLoader;
            L = K = 0;
            E = {
                scene: new THREE.Scene,
                geometries: {},
                materials: {},
                textures: {},
                objects: {},
                cameras: {},
                lights: {},
                fogs: {}
            };
            g = function() {
                L -= 1;
                h()
            }
            ;
            for (q in F.cameras) {
                x = F.cameras[q];
                if (x.type == "perspective")
                    H = new THREE.Camera(x.fov,x.aspect,x.near,x.far);
                else if (x.type == "ortho") {
                    H = new THREE.Camera;
                    H.projectionMatrix = THREE.Matrix4.makeOrtho(x.left, x.right, x.top, x.bottom, x.near, x.far)
                }
                z = x.position;
                x = x.target;
                H.position.set(z[0], z[1], z[2]);
                H.target.position.set(x[0], x[1], x[2]);
                E.cameras[q] = H
            }
            for (o in F.lights) {
                q = F.lights[o];
                if (q.type == "directional") {
                    z = q.direction;
                    light = new THREE.DirectionalLight;
                    light.position.set(z[0], z[1], z[2]);
                    light.position.normalize()
                } else if (q.type == "point") {
                    z = q.position;
                    light = new THREE.PointLight;
                    light.position.set(z[0], z[1], z[2])
                }
                x = q.color;
                i = q.intensity || 1;
                light.color.setRGB(x[0] * i, x[1] * i, x[2] * i);
                E.scene.addLight(light);
                E.lights[o] = light
            }
            for (m in F.fogs) {
                o = F.fogs[m];
                if (o.type == "linear")
                    D = new THREE.Fog(0,o.near,o.far);
                else
                    o.type == "exp2" && (D = new THREE.FogExp2(0,o.density));
                x = o.color;
                D.color.setRGB(x[0], x[1], x[2]);
                E.fogs[m] = D
            }
            if (E.cameras && F.defaults.camera)
                E.currentCamera = E.cameras[F.defaults.camera];
            if (E.fogs && F.defaults.fog)
                E.scene.fog = E.fogs[F.defaults.fog];
            x = F.defaults.bgcolor;
            E.bgColor = new THREE.Color;
            E.bgColor.setRGB(x[0], x[1], x[2]);
            E.bgColorAlpha = F.defaults.bgalpha;
            for (j in F.geometries) {
                m = F.geometries[j];
                if (m.type == "bin_mesh" || m.type == "ascii_mesh")
                    K += 1
            }
            P = K;
            for (j in F.geometries) {
                m = F.geometries[j];
                if (m.type == "cube") {
                    n = new Cube(m.width,m.height,m.depth,m.segmentsWidth,m.segmentsHeight,m.segmentsDepth,null,m.flipped,m.sides);
                    E.geometries[j] = n
                } else if (m.type == "plane") {
                    n = new Plane(m.width,m.height,m.segmentsWidth,m.segmentsHeight);
                    E.geometries[j] = n
                } else if (m.type == "sphere") {
                    n = new Sphere(m.radius,m.segmentsWidth,m.segmentsHeight);
                    E.geometries[j] = n
                } else if (m.type == "cylinder") {
                    n = new Cylinder(m.numSegs,m.topRad,m.botRad,m.height,m.topOffset,m.botOffset);
                    E.geometries[j] = n
                } else if (m.type == "torus") {
                    n = new Torus(m.radius,m.tube,m.segmentsR,m.segmentsT);
                    E.geometries[j] = n
                } else if (m.type == "icosahedron") {
                    n = new Icosahedron(m.subdivisions);
                    E.geometries[j] = n
                } else if (m.type == "bin_mesh")
                    J.load({
                        model: m.url,
                        callback: d(j)
                    });
                else
                    m.type == "ascii_mesh" && I.load({
                        model: m.url,
                        callback: d(j)
                    })
            }
            for (t in F.textures) {
                j = F.textures[t];
                L += j.url instanceof Array ? j.url.length : 1
            }
            Q = L;
            for (t in F.textures) {
                j = F.textures[t];
                if (j.mapping != undefined && THREE[j.mapping] != undefined)
                    j.mapping = new THREE[j.mapping];
                if (j.url instanceof Array)
                    m = ImageUtils.loadTextureCube(j.url, j.mapping, g);
                else {
                    m = ImageUtils.loadTexture(j.url, j.mapping, g);
                    if (THREE[j.minFilter] != undefined)
                        m.minFilter = THREE[j.minFilter];
                    if (THREE[j.magFilter] != undefined)
                        m.magFilter = THREE[j.magFilter]
                }
                E.textures[t] = m
            }
            for (l in F.materials) {
                t = F.materials[l];
                for (y in t.parameters)
                    if (y == "envMap" || y == "map" || y == "lightMap")
                        t.parameters[y] = E.textures[t.parameters[y]];
                    else if (y == "shading")
                        t.parameters[y] = t.parameters[y] == "flat" ? THREE.FlatShading : THREE.SmoothShading;
                    else if (y == "blending")
                        t.parameters[y] = THREE[t.parameters[y]] ? THREE[t.parameters[y]] : THREE.NormalBlending;
                    else
                        y == "combine" && (t.parameters[y] = t.parameters[y] == "MixOperation" ? THREE.MixOperation : THREE.MultiplyOperation);
                t = new THREE[t.type](t.parameters);
                E.materials[l] = t
            }
            f();
            e(E)
        }
    },
    addMesh: function(a, e, b, c, g, f, d, h, j, l) {
        e = new THREE.Mesh(e,l);
        e.scale.x = e.scale.y = e.scale.z = b;
        e.position.x = c;
        e.position.y = g;
        e.position.z = f;
        e.rotation.x = d;
        e.rotation.y = h;
        e.rotation.z = j;
        a.addObject(e);
        return e
    },
    addPanoramaCubeWebGL: function(a, e, b) {
        var c = ShaderUtils.lib.cube;
        c.uniforms.tCube.texture = b;
        b = new THREE.MeshShaderMaterial({
            fragmentShader: c.fragmentShader,
            vertexShader: c.vertexShader,
            uniforms: c.uniforms
        });
        e = new THREE.Mesh(new Cube(e,e,e,1,1,1,null,!0),b);
        a.addObject(e);
        return e
    },
    addPanoramaCube: function(a, e, b) {
        var c = [];
        c.push(new THREE.MeshBasicMaterial({
            map: new THREE.Texture(b[0])
        }));
        c.push(new THREE.MeshBasicMaterial({
            map: new THREE.Texture(b[1])
        }));
        c.push(new THREE.MeshBasicMaterial({
            map: new THREE.Texture(b[2])
        }));
        c.push(new THREE.MeshBasicMaterial({
            map: new THREE.Texture(b[3])
        }));
        c.push(new THREE.MeshBasicMaterial({
            map: new THREE.Texture(b[4])
        }));
        c.push(new THREE.MeshBasicMaterial({
            map: new THREE.Texture(b[5])
        }));
        e = new THREE.Mesh(new Cube(e,e,e,1,1,c,!0),new THREE.MeshFaceMaterial);
        a.addObject(e);
        return e
    },
    addPanoramaCubePlanes: function(a, e, b) {
        var c = e / 2;
        e = new Plane(e,e);
        var g = Math.PI
          , f = Math.PI / 2;
        SceneUtils.addMesh(a, e, 1, 0, 0, -c, 0, 0, 0, new THREE.MeshBasicMaterial({
            map: new THREE.Texture(b[5])
        }));
        SceneUtils.addMesh(a, e, 1, -c, 0, 0, 0, f, 0, new THREE.MeshBasicMaterial({
            map: new THREE.Texture(b[0])
        }));
        SceneUtils.addMesh(a, e, 1, c, 0, 0, 0, -f, 0, new THREE.MeshBasicMaterial({
            map: new THREE.Texture(b[1])
        }));
        SceneUtils.addMesh(a, e, 1, 0, c, 0, f, 0, g, new THREE.MeshBasicMaterial({
            map: new THREE.Texture(b[2])
        }));
        SceneUtils.addMesh(a, e, 1, 0, -c, 0, -f, 0, g, new THREE.MeshBasicMaterial({
            map: new THREE.Texture(b[3])
        }))
    },
    showHierarchy: function(a, e) {
        SceneUtils.traverseHierarchy(a, function(b) {
            b.visible = e
        })
    },
    traverseHierarchy: function(a, e) {
        var b, c, g = a.children.length;
        for (c = 0; c < g; c++) {
            b = a.children[c];
            e(b);
            SceneUtils.traverseHierarchy(b, e)
        }
    }
}
  , ShaderUtils = {
    lib: {
        fresnel: {
            uniforms: {
                mRefractionRatio: {
                    type: "f",
                    value: 1.02
                },
                mFresnelBias: {
                    type: "f",
                    value: 0.1
                },
                mFresnelPower: {
                    type: "f",
                    value: 2
                },
                mFresnelScale: {
                    type: "f",
                    value: 1
                },
                tCube: {
                    type: "t",
                    value: 1,
                    texture: null
                }
            },
            fragmentShader: "uniform samplerCube tCube;\nvarying vec3 vReflect;\nvarying vec3 vRefract[3];\nvarying float vReflectionFactor;\nvoid main() {\nvec4 reflectedColor = textureCube( tCube, vec3( -vReflect.x, vReflect.yz ) );\nvec4 refractedColor = vec4( 1.0, 1.0, 1.0, 1.0 );\nrefractedColor.r = textureCube( tCube, vec3( -vRefract[0].x, vRefract[0].yz ) ).r;\nrefractedColor.g = textureCube( tCube, vec3( -vRefract[1].x, vRefract[1].yz ) ).g;\nrefractedColor.b = textureCube( tCube, vec3( -vRefract[2].x, vRefract[2].yz ) ).b;\nrefractedColor.a = 1.0;\ngl_FragColor = mix( refractedColor, reflectedColor, clamp( vReflectionFactor, 0.0, 1.0 ) );\n}",
            vertexShader: "uniform float mRefractionRatio;\nuniform float mFresnelBias;\nuniform float mFresnelScale;\nuniform float mFresnelPower;\nvarying vec3 vReflect;\nvarying vec3 vRefract[3];\nvarying float vReflectionFactor;\nvoid main() {\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\nvec4 mPosition = objectMatrix * vec4( position, 1.0 );\nvec3 nWorld = normalize ( mat3( objectMatrix[0].xyz, objectMatrix[1].xyz, objectMatrix[2].xyz ) * normal );\nvec3 I = mPosition.xyz - cameraPosition;\nvReflect = reflect( I, nWorld );\nvRefract[0] = refract( normalize( I ), nWorld, mRefractionRatio );\nvRefract[1] = refract( normalize( I ), nWorld, mRefractionRatio * 0.99 );\nvRefract[2] = refract( normalize( I ), nWorld, mRefractionRatio * 0.98 );\nvReflectionFactor = mFresnelBias + mFresnelScale * pow( 1.0 + dot( normalize( I ), nWorld ), mFresnelPower );\ngl_Position = projectionMatrix * mvPosition;\n}"
        },
        normal: {
            uniforms: {
                enableAO: {
                    type: "i",
                    value: 0
                },
                enableDiffuse: {
                    type: "i",
                    value: 0
                },
                tDiffuse: {
                    type: "t",
                    value: 0,
                    texture: null
                },
                tNormal: {
                    type: "t",
                    value: 2,
                    texture: null
                },
                tAO: {
                    type: "t",
                    value: 3,
                    texture: null
                },
                uNormalScale: {
                    type: "f",
                    value: 1
                },
                tDisplacement: {
                    type: "t",
                    value: 4,
                    texture: null
                },
                uDisplacementBias: {
                    type: "f",
                    value: -0.5
                },
                uDisplacementScale: {
                    type: "f",
                    value: 2.5
                },
                uPointLightPos: {
                    type: "v3",
                    value: new THREE.Vector3
                },
                uPointLightColor: {
                    type: "c",
                    value: new THREE.Color(15658734)
                },
                uDirLightPos: {
                    type: "v3",
                    value: new THREE.Vector3
                },
                uDirLightColor: {
                    type: "c",
                    value: new THREE.Color(15658734)
                },
                uAmbientLightColor: {
                    type: "c",
                    value: new THREE.Color(328965)
                },
                uDiffuseColor: {
                    type: "c",
                    value: new THREE.Color(15658734)
                },
                uSpecularColor: {
                    type: "c",
                    value: new THREE.Color(1118481)
                },
                uAmbientColor: {
                    type: "c",
                    value: new THREE.Color(328965)
                },
                uShininess: {
                    type: "f",
                    value: 30
                }
            },
            fragmentShader: "uniform vec3 uDirLightPos;\nuniform vec3 uAmbientLightColor;\nuniform vec3 uDirLightColor;\nuniform vec3 uPointLightColor;\nuniform vec3 uAmbientColor;\nuniform vec3 uDiffuseColor;\nuniform vec3 uSpecularColor;\nuniform float uShininess;\nuniform bool enableDiffuse;\nuniform bool enableAO;\nuniform sampler2D tDiffuse;\nuniform sampler2D tNormal;\nuniform sampler2D tAO;\nuniform float uNormalScale;\nvarying vec3 vTangent;\nvarying vec3 vBinormal;\nvarying vec3 vNormal;\nvarying vec2 vUv;\nvarying vec3 vPointLightVector;\nvarying vec3 vViewPosition;\nvoid main() {\nvec3 diffuseTex = vec3( 1.0, 1.0, 1.0 );\nvec3 aoTex = vec3( 1.0, 1.0, 1.0 );\nvec3 normalTex = texture2D( tNormal, vUv ).xyz * 2.0 - 1.0;\nnormalTex.xy *= uNormalScale;\nnormalTex = normalize( normalTex );\nif( enableDiffuse )\ndiffuseTex = texture2D( tDiffuse, vUv ).xyz;\nif( enableAO )\naoTex = texture2D( tAO, vUv ).xyz;\nmat3 tsb = mat3( vTangent, vBinormal, vNormal );\nvec3 finalNormal = tsb * normalTex;\nvec3 normal = normalize( finalNormal );\nvec3 viewPosition = normalize( vViewPosition );\nvec4 pointDiffuse  = vec4( 0.0, 0.0, 0.0, 0.0 );\nvec4 pointSpecular = vec4( 0.0, 0.0, 0.0, 0.0 );\nvec3 pointVector = normalize( vPointLightVector );\nvec3 pointHalfVector = normalize( vPointLightVector + vViewPosition );\nfloat pointDotNormalHalf = dot( normal, pointHalfVector );\nfloat pointDiffuseWeight = max( dot( normal, pointVector ), 0.0 );\nfloat pointSpecularWeight = 0.0;\nif ( pointDotNormalHalf >= 0.0 )\npointSpecularWeight = pow( pointDotNormalHalf, uShininess );\npointDiffuse  += vec4( uDiffuseColor, 1.0 ) * pointDiffuseWeight;\npointSpecular += vec4( uSpecularColor, 1.0 ) * pointSpecularWeight;\nvec4 dirDiffuse  = vec4( 0.0, 0.0, 0.0, 0.0 );\nvec4 dirSpecular = vec4( 0.0, 0.0, 0.0, 0.0 );\nvec4 lDirection = viewMatrix * vec4( uDirLightPos, 0.0 );\nvec3 dirVector = normalize( lDirection.xyz );\nvec3 dirHalfVector = normalize( lDirection.xyz + vViewPosition );\nfloat dirDotNormalHalf = dot( normal, dirHalfVector );\nfloat dirDiffuseWeight = max( dot( normal, dirVector ), 0.0 );\nfloat dirSpecularWeight = 0.0;\nif ( dirDotNormalHalf >= 0.0 )\ndirSpecularWeight = pow( dirDotNormalHalf, uShininess );\ndirDiffuse  += vec4( uDiffuseColor, 1.0 ) * dirDiffuseWeight;\ndirSpecular += vec4( uSpecularColor, 1.0 ) * dirSpecularWeight;\nvec4 totalLight = vec4( uAmbientLightColor * uAmbientColor, 1.0 );\ntotalLight += vec4( uDirLightColor, 1.0 ) * ( dirDiffuse + dirSpecular );\ntotalLight += vec4( uPointLightColor, 1.0 ) * ( pointDiffuse + pointSpecular );\ngl_FragColor = vec4( totalLight.xyz * aoTex * diffuseTex, 1.0 );\n}",
            vertexShader: "attribute vec4 tangent;\nuniform vec3 uPointLightPos;\n#ifdef VERTEX_TEXTURES\nuniform sampler2D tDisplacement;\nuniform float uDisplacementScale;\nuniform float uDisplacementBias;\n#endif\nvarying vec3 vTangent;\nvarying vec3 vBinormal;\nvarying vec3 vNormal;\nvarying vec2 vUv;\nvarying vec3 vPointLightVector;\nvarying vec3 vViewPosition;\nvoid main() {\nvec4 mPosition = objectMatrix * vec4( position, 1.0 );\nvViewPosition = cameraPosition - mPosition.xyz;\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\nvNormal = normalize( normalMatrix * normal );\nvTangent = normalize( normalMatrix * tangent.xyz );\nvBinormal = cross( vNormal, vTangent ) * tangent.w;\nvBinormal = normalize( vBinormal );\nvUv = uv;\nvec4 lPosition = viewMatrix * vec4( uPointLightPos, 1.0 );\nvPointLightVector = normalize( lPosition.xyz - mvPosition.xyz );\n#ifdef VERTEX_TEXTURES\nvec3 dv = texture2D( tDisplacement, uv ).xyz;\nfloat df = uDisplacementScale * dv.x + uDisplacementBias;\nvec4 displacedPosition = vec4( vNormal.xyz * df, 0.0 ) + mvPosition;\ngl_Position = projectionMatrix * displacedPosition;\n#else\ngl_Position = projectionMatrix * mvPosition;\n#endif\n}"
        },
        cube: {
            uniforms: {
                tCube: {
                    type: "t",
                    value: 1,
                    texture: null
                }
            },
            vertexShader: "varying vec3 vViewPosition;\nvoid main() {\nvec4 mPosition = objectMatrix * vec4( position, 1.0 );\nvViewPosition = cameraPosition - mPosition.xyz;\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",
            fragmentShader: "uniform samplerCube tCube;\nvarying vec3 vViewPosition;\nvoid main() {\nvec3 wPos = cameraPosition - vViewPosition;\ngl_FragColor = textureCube( tCube, vec3( - wPos.x, wPos.yz ) );\n}"
        },
        convolution: {
            uniforms: {
                tDiffuse: {
                    type: "t",
                    value: 0,
                    texture: null
                },
                uImageIncrement: {
                    type: "v2",
                    value: new THREE.Vector2(0.001953125,0)
                },
                cKernel: {
                    type: "fv1",
                    value: []
                }
            },
            vertexShader: "varying vec2 vUv;\nuniform vec2 uImageIncrement;\nvoid main(void) {\nvUv = uv - ((KERNEL_SIZE - 1.0) / 2.0) * uImageIncrement;\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",
            fragmentShader: "varying vec2 vUv;\nuniform sampler2D tDiffuse;\nuniform vec2 uImageIncrement;\nuniform float cKernel[KERNEL_SIZE];\nvoid main(void) {\nvec2 imageCoord = vUv;\nvec4 sum = vec4( 0.0, 0.0, 0.0, 0.0 );\nfor( int i=0; i<KERNEL_SIZE; ++i ) {\nsum += texture2D( tDiffuse, imageCoord ) * cKernel[i];\nimageCoord += uImageIncrement;\n}\ngl_FragColor = sum;\n}"
        },
        film: {
            uniforms: {
                tDiffuse: {
                    type: "t",
                    value: 0,
                    texture: null
                },
                time: {
                    type: "f",
                    value: 0
                },
                nIntensity: {
                    type: "f",
                    value: 0.5
                },
                sIntensity: {
                    type: "f",
                    value: 0.05
                },
                sCount: {
                    type: "f",
                    value: 4096
                },
                grayscale: {
                    type: "i",
                    value: 1
                }
            },
            vertexShader: "varying vec2 vUv;\nvoid main() {\nvUv = vec2( uv.x, 1.0 - uv.y );\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",
            fragmentShader: "varying vec2 vUv;\nuniform sampler2D tDiffuse;\nuniform float time;\nuniform bool grayscale;\nuniform float nIntensity;\nuniform float sIntensity;\nuniform float sCount;\nvoid main() {\nvec4 cTextureScreen = texture2D( tDiffuse, vUv );\nfloat x = vUv.x * vUv.y * time *  1000.0;\nx = mod( x, 13.0 ) * mod( x, 123.0 );\nfloat dx = mod( x, 0.01 );\nvec3 cResult = cTextureScreen.rgb + cTextureScreen.rgb * clamp( 0.1 + dx * 100.0, 0.0, 1.0 );\nvec2 sc = vec2( sin( vUv.y * sCount ), cos( vUv.y * sCount ) );\ncResult += cTextureScreen.rgb * vec3( sc.x, sc.y, sc.x ) * sIntensity;\ncResult = cTextureScreen.rgb + clamp( nIntensity, 0.0,1.0 ) * ( cResult - cTextureScreen.rgb );\nif( grayscale ) {\ncResult = vec3( cResult.r * 0.3 + cResult.g * 0.59 + cResult.b * 0.11 );\n}\ngl_FragColor =  vec4( cResult, cTextureScreen.a );\n}"
        },
        screen: {
            uniforms: {
                tDiffuse: {
                    type: "t",
                    value: 0,
                    texture: null
                },
                opacity: {
                    type: "f",
                    value: 1
                }
            },
            vertexShader: "varying vec2 vUv;\nvoid main() {\nvUv = vec2( uv.x, 1.0 - uv.y );\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",
            fragmentShader: "varying vec2 vUv;\nuniform sampler2D tDiffuse;\nuniform float opacity;\nvoid main() {\nvec4 texel = texture2D( tDiffuse, vUv );\ngl_FragColor = opacity * texel;\n}"
        },
        basic: {
            uniforms: {},
            vertexShader: "void main() {\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",
            fragmentShader: "void main() {\ngl_FragColor = vec4( 1.0, 0.0, 0.0, 0.5 );\n}"
        }
    },
    buildKernel: function(a) {
        var e, b, c, g, f = 2 * Math.ceil(a * 3) + 1;
        f > 25 && (f = 25);
        g = (f - 1) * 0.5;
        b = Array(f);
        for (e = c = 0; e < f; ++e) {
            b[e] = Math.exp(-((e - g) * (e - g)) / (2 * a * a));
            c += b[e]
        }
        for (e = 0; e < f; ++e)
            b[e] /= c;
        return b
    }
};
THREE.QuakeCamera = function(a) {
    function e(b, c) {
        return function() {
            c.apply(b, arguments)
        }
    }
    THREE.Camera.call(this, a.fov, a.aspect, a.near, a.far, a.target);
    this.movementSpeed = 1;
    this.lookSpeed = 0.005;
    this.noFly = !1;
    this.lookVertical = !0;
    this.autoForward = !1;
    this.dragToLook = !1;
    this.heightSpeed = !1;
    this.heightCoef = 1;
    this.heightMin = 0;
    this.domElement = document;
    if (a) {
        if (a.movementSpeed !== undefined)
            this.movementSpeed = a.movementSpeed;
        if (a.lookSpeed !== undefined)
            this.lookSpeed = a.lookSpeed;
        if (a.noFly !== undefined)
            this.noFly = a.noFly;
        if (a.lookVertical !== undefined)
            this.lookVertical = a.lookVertical;
        if (a.autoForward !== undefined)
            this.autoForward = a.autoForward;
        if (a.dragToLook !== undefined)
            this.dragToLook = a.dragToLook;
        if (a.heightSpeed !== undefined)
            this.heightSpeed = a.heightSpeed;
        if (a.heightCoef !== undefined)
            this.heightCoef = a.heightCoef;
        if (a.heightMin !== undefined)
            this.heightMin = a.heightMin;
        if (a.heightMax !== undefined)
            this.heightMax = a.heightMax;
        if (a.domElement !== undefined)
            this.domElement = a.domElement
    }
    this.theta = this.phi = this.lon = this.lat = this.mouseY = this.mouseX = this.autoSpeedFactor = 0;
    this.moveForward = !1;
    this.moveBackward = !1;
    this.moveLeft = !1;
    this.moveRight = !1;
    this.mouseDragOn = !1;
    this.windowHalfX = window.innerWidth / 2;
    this.windowHalfY = window.innerHeight / 2;
    this.onMouseDown = function(b) {
        b.preventDefault();
        b.stopPropagation();
        if (!this.dragToLook)
            switch (b.button) {
            case 0:
                this.moveForward = !0;
                break;
            case 2:
                this.moveBackward = !0
            }
        this.mouseDragOn = !0
    }
    ;
    this.onMouseUp = function(b) {
        b.preventDefault();
        b.stopPropagation();
        if (!this.dragToLook)
            switch (b.button) {
            case 0:
                this.moveForward = !1;
                break;
            case 2:
                this.moveBackward = !1
            }
        this.mouseDragOn = !1
    }
    ;
    this.onMouseMove = function(b) {
        this.mouseX = b.clientX - this.windowHalfX;
        this.mouseY = b.clientY - this.windowHalfY
    }
    ;
    this.onKeyDown = function(b) {
        switch (b.keyCode) {
        case 38:
        case 87:
            this.moveForward = !0;
            break;
        case 37:
        case 65:
            this.moveLeft = !0;
            break;
        case 40:
        case 83:
            this.moveBackward = !0;
            break;
        case 39:
        case 68:
            this.moveRight = !0
        }
    }
    ;
    this.onKeyUp = function(b) {
        switch (b.keyCode) {
        case 38:
        case 87:
            this.moveForward = !1;
            break;
        case 37:
        case 65:
            this.moveLeft = !1;
            break;
        case 40:
        case 83:
            this.moveBackward = !1;
            break;
        case 39:
        case 68:
            this.moveRight = !1
        }
    }
    ;
    this.update = function() {
        this.autoSpeedFactor = this.heightSpeed ? ((this.position.y < this.heightMin ? this.heightMin : this.position.y > this.heightMax ? this.heightMax : this.position.y) - this.heightMin) * this.heightCoef : 0;
        (this.moveForward || this.autoForward) && this.translateZ(-(this.movementSpeed + this.autoSpeedFactor));
        this.moveBackward && this.translateZ(this.movementSpeed);
        this.moveLeft && this.translateX(-this.movementSpeed);
        this.moveRight && this.translateX(this.movementSpeed);
        var b = this.lookSpeed;
        this.dragToLook && !this.mouseDragOn && (b = 0);
        this.lon += this.mouseX * b;
        this.lookVertical && (this.lat -= this.mouseY * b);
        this.lat = Math.max(-85, Math.min(85, this.lat));
        this.phi = (90 - this.lat) * Math.PI / 180;
        this.theta = this.lon * Math.PI / 180;
        b = this.target.position;
        var c = this.position;
        b.x = c.x + 100 * Math.sin(this.phi) * Math.cos(this.theta);
        b.y = c.y + 100 * Math.cos(this.phi);
        b.z = c.z + 100 * Math.sin(this.phi) * Math.sin(this.theta);
        this.supr.update.call(this)
    }
    ;
    this.domElement.addEventListener("contextmenu", function(b) {
        b.preventDefault()
    }, !1);
    this.domElement.addEventListener("mousemove", e(this, this.onMouseMove), !1);
    this.domElement.addEventListener("mousedown", e(this, this.onMouseDown), !1);
    this.domElement.addEventListener("mouseup", e(this, this.onMouseUp), !1);
    this.domElement.addEventListener("keydown", e(this, this.onKeyDown), !1);
    this.domElement.addEventListener("keyup", e(this, this.onKeyUp), !1)
}
;
THREE.QuakeCamera.prototype = new THREE.Camera;
THREE.QuakeCamera.prototype.constructor = THREE.QuakeCamera;
THREE.QuakeCamera.prototype.supr = THREE.Camera.prototype;
THREE.QuakeCamera.prototype.translate = function(a, e) {
    this.matrix.rotateAxis(e);
    if (this.noFly)
        e.y = 0;
    this.position.addSelf(e.multiplyScalar(a));
    this.target.position.addSelf(e.multiplyScalar(a))
}
;
THREE.PathCamera = function(a) {
    function e(l, k, o, q) {
        var m = {
            name: o,
            fps: 0.6,
            length: q,
            hierarchy: []
        }, t, A = k.getControlPointsArray(), z = k.getLength(), x = A.length, y = 0;
        t = x - 1;
        k = {
            parent: -1,
            keys: []
        };
        k.keys[0] = {
            time: 0,
            pos: A[0],
            rot: [0, 0, 0, 1],
            scl: [1, 1, 1]
        };
        k.keys[t] = {
            time: q,
            pos: A[t],
            rot: [0, 0, 0, 1],
            scl: [1, 1, 1]
        };
        for (t = 1; t < x - 1; t++) {
            y = q * z.chunks[t] / z.total;
            k.keys[t] = {
                time: y,
                pos: A[t]
            }
        }
        m.hierarchy[0] = k;
        THREE.AnimationHandler.add(m);
        return new THREE.Animation(l,o,THREE.AnimationHandler.CATMULLROM_FORWARD,!1)
    }
    function b(l, k) {
        var o, q, m = new THREE.Geometry;
        for (o = 0; o < l.points.length * k; o++) {
            q = o / (l.points.length * k);
            q = l.getPoint(q);
            m.vertices[o] = new THREE.Vertex(new THREE.Vector3(q.x,q.y,q.z))
        }
        return m
    }
    function c(l, k) {
        var o = b(k, 10)
          , q = b(k, 10)
          , m = new THREE.LineBasicMaterial({
            color: 16711680,
            linewidth: 3
        });
        lineObj = new THREE.Line(o,m);
        particleObj = new THREE.ParticleSystem(q,new THREE.ParticleBasicMaterial({
            color: 16755200,
            size: 3
        }));
        lineObj.scale.set(1, 1, 1);
        l.addChild(lineObj);
        particleObj.scale.set(1, 1, 1);
        l.addChild(particleObj);
        q = new Sphere(1,16,8);
        m = new THREE.MeshBasicMaterial({
            color: 65280
        });
        for (i = 0; i < k.points.length; i++) {
            o = new THREE.Mesh(q,m);
            o.position.copy(k.points[i]);
            o.updateMatrix();
            l.addChild(o)
        }
    }
    THREE.Camera.call(this, a.fov, a.aspect, a.near, a.far, a.target);
    this.id = "PathCamera" + THREE.PathCameraIdCounter++;
    this.duration = 1E4;
    this.waypoints = [];
    this.useConstantSpeed = !0;
    this.resamplingCoef = 50;
    this.debugPath = new THREE.Object3D;
    this.debugDummy = new THREE.Object3D;
    this.animationParent = new THREE.Object3D;
    this.lookSpeed = 0.005;
    this.lookVertical = !0;
    this.lookHorizontal = !0;
    this.verticalAngleMap = {
        srcRange: [0, 6.28],
        dstRange: [0, 6.28]
    };
    this.horizontalAngleMap = {
        srcRange: [0, 6.28],
        dstRange: [0, 6.28]
    };
    this.domElement = document;
    if (a) {
        if (a.duration !== undefined)
            this.duration = a.duration * 1E3;
        if (a.waypoints !== undefined)
            this.waypoints = a.waypoints;
        if (a.useConstantSpeed !== undefined)
            this.useConstantSpeed = a.useConstantSpeed;
        if (a.resamplingCoef !== undefined)
            this.resamplingCoef = a.resamplingCoef;
        if (a.createDebugPath !== undefined)
            this.createDebugPath = a.createDebugPath;
        if (a.createDebugDummy !== undefined)
            this.createDebugDummy = a.createDebugDummy;
        if (a.lookSpeed !== undefined)
            this.lookSpeed = a.lookSpeed;
        if (a.lookVertical !== undefined)
            this.lookVertical = a.lookVertical;
        if (a.lookHorizontal !== undefined)
            this.lookHorizontal = a.lookHorizontal;
        if (a.verticalAngleMap !== undefined)
            this.verticalAngleMap = a.verticalAngleMap;
        if (a.horizontalAngleMap !== undefined)
            this.horizontalAngleMap = a.horizontalAngleMap;
        if (a.domElement !== undefined)
            this.domElement = a.domElement
    }
    this.theta = this.phi = this.lon = this.lat = this.mouseY = this.mouseX = 0;
    this.windowHalfX = window.innerWidth / 2;
    this.windowHalfY = window.innerHeight / 2;
    var g = Math.PI * 2
      , f = Math.PI / 180;
    this.update = function(l, k, o) {
        var q, m;
        this.lookHorizontal && (this.lon += this.mouseX * this.lookSpeed);
        this.lookVertical && (this.lat -= this.mouseY * this.lookSpeed);
        this.lon = Math.max(0, Math.min(360, this.lon));
        this.lat = Math.max(-85, Math.min(85, this.lat));
        this.phi = (90 - this.lat) * f;
        this.theta = this.lon * f;
        q = this.phi % g;
        this.phi = q >= 0 ? q : q + g;
        q = this.verticalAngleMap.srcRange;
        m = this.verticalAngleMap.dstRange;
        this.phi = (this.phi - q[0]) * (m[1] - m[0]) / (q[1] - q[0]) + m[0];
        q = this.horizontalAngleMap.srcRange;
        m = this.horizontalAngleMap.dstRange;
        this.theta = (this.theta - q[0]) * (m[1] - m[0]) / (q[1] - q[0]) + m[0];
        q = this.target.position;
        q.x = 100 * Math.sin(this.phi) * Math.cos(this.theta);
        q.y = 100 * Math.cos(this.phi);
        q.z = 100 * Math.sin(this.phi) * Math.sin(this.theta);
        this.supr.update.call(this, l, k, o)
    }
    ;
    this.onMouseMove = function(l) {
        this.mouseX = l.clientX - this.windowHalfX;
        this.mouseY = l.clientY - this.windowHalfY
    }
    ;
    this.spline = new THREE.Spline;
    this.spline.initFromArray(this.waypoints);
    this.useConstantSpeed && this.spline.reparametrizeByArcLength(this.resamplingCoef);
    if (this.createDebugDummy) {
        a = new THREE.MeshLambertMaterial({
            color: 30719
        });
        var d = new THREE.MeshLambertMaterial({
            color: 65280
        })
          , h = new Cube(10,10,20)
          , j = new Cube(2,2,10);
        this.animationParent = new THREE.Mesh(h,a);
        a = new THREE.Mesh(j,d);
        a.position.set(0, 10, 0);
        this.animation = e(this.animationParent, this.spline, this.id, this.duration);
        this.animationParent.addChild(this);
        this.animationParent.addChild(this.target);
        this.animationParent.addChild(a)
    } else {
        this.animation = e(this.animationParent, this.spline, this.id, this.duration);
        this.animationParent.addChild(this.target);
        this.animationParent.addChild(this)
    }
    this.createDebugPath && c(this.debugPath, this.spline);
    this.domElement.addEventListener("mousemove", function(l, k) {
        return function() {
            k.apply(l, arguments)
        }
    }(this, this.onMouseMove), !1)
}
;
THREE.PathCamera.prototype = new THREE.Camera;
THREE.PathCamera.prototype.constructor = THREE.PathCamera;
THREE.PathCamera.prototype.supr = THREE.Camera.prototype;
THREE.PathCameraIdCounter = 0;
var Cube = function(a, e, b, c, g, f, d, h, j) {
    function l(z, x, y, n, H, D, M, F) {
        var J, I, K = c || 1, L = g || 1, P = H / 2, Q = D / 2, E = k.vertices.length;
        if (z == "x" && x == "y" || z == "y" && x == "x")
            J = "z";
        else if (z == "x" && x == "z" || z == "z" && x == "x") {
            J = "y";
            L = f || 1
        } else if (z == "z" && x == "y" || z == "y" && x == "z") {
            J = "x";
            K = f || 1
        }
        var O = K + 1
          , U = L + 1;
        H /= K;
        var $ = D / L;
        for (I = 0; I < U; I++)
            for (D = 0; D < O; D++) {
                var T = new THREE.Vector3;
                T[z] = (D * H - P) * y;
                T[x] = (I * $ - Q) * n;
                T[J] = M;
                k.vertices.push(new THREE.Vertex(T))
            }
        for (I = 0; I < L; I++)
            for (D = 0; D < K; D++) {
                k.faces.push(new THREE.Face4(D + O * I + E,D + O * (I + 1) + E,D + 1 + O * (I + 1) + E,D + 1 + O * I + E,null,null,F));
                k.faceVertexUvs[0].push([new THREE.UV(D / K,I / L), new THREE.UV(D / K,(I + 1) / L), new THREE.UV((D + 1) / K,(I + 1) / L), new THREE.UV((D + 1) / K,I / L)])
            }
    }
    THREE.Geometry.call(this);
    var k = this
      , o = a / 2
      , q = e / 2
      , m = b / 2;
    h = h ? -1 : 1;
    if (d !== undefined)
        if (d instanceof Array)
            this.materials = d;
        else {
            this.materials = [];
            for (var t = 0; t < 6; t++)
                this.materials.push([d])
        }
    else
        this.materials = [];
    this.sides = {
        px: !0,
        nx: !0,
        py: !0,
        ny: !0,
        pz: !0,
        nz: !0
    };
    if (j != undefined)
        for (var A in j)
            this.sides[A] != undefined && (this.sides[A] = j[A]);
    this.sides.px && l("z", "y", 1 * h, -1, b, e, -o, this.materials[0]);
    this.sides.nx && l("z", "y", -1 * h, -1, b, e, o, this.materials[1]);
    this.sides.py && l("x", "z", 1 * h, 1, a, b, q, this.materials[2]);
    this.sides.ny && l("x", "z", 1 * h, -1, a, b, -q, this.materials[3]);
    this.sides.pz && l("x", "y", 1 * h, -1, a, e, m, this.materials[4]);
    this.sides.nz && l("x", "y", -1 * h, -1, a, e, -m, this.materials[5]);
    (function() {
        for (var z = [], x = [], y = 0, n = k.vertices.length; y < n; y++) {
            for (var H = k.vertices[y], D = !1, M = 0, F = z.length; M < F; M++) {
                var J = z[M];
                if (H.position.x == J.position.x && H.position.y == J.position.y && H.position.z == J.position.z) {
                    x[y] = M;
                    D = !0;
                    break
                }
            }
            if (!D) {
                x[y] = z.length;
                z.push(new THREE.Vertex(H.position.clone()))
            }
        }
        y = 0;
        for (n = k.faces.length; y < n; y++) {
            H = k.faces[y];
            H.a = x[H.a];
            H.b = x[H.b];
            H.c = x[H.c];
            H.d = x[H.d]
        }
        k.vertices = z
    }
    )();
    this.computeCentroids();
    this.computeFaceNormals()
};
Cube.prototype = new THREE.Geometry;
Cube.prototype.constructor = Cube;
var Cylinder = function(a, e, b, c, g, f) {
    function d(k, o, q) {
        h.vertices.push(new THREE.Vertex(new THREE.Vector3(k,o,q)))
    }
    THREE.Geometry.call(this);
    var h = this
      , j = Math.PI
      , l = c / 2;
    for (c = 0; c < a; c++)
        d(Math.sin(2 * j * c / a) * e, Math.cos(2 * j * c / a) * e, -l);
    for (c = 0; c < a; c++)
        d(Math.sin(2 * j * c / a) * b, Math.cos(2 * j * c / a) * b, l);
    for (c = 0; c < a; c++)
        h.faces.push(new THREE.Face4(c,c + a,a + (c + 1) % a,(c + 1) % a));
    if (b > 0) {
        d(0, 0, -l - (f || 0));
        for (c = a; c < a + a / 2; c++)
            h.faces.push(new THREE.Face4(2 * a,(2 * c - 2 * a) % a,(2 * c - 2 * a + 1) % a,(2 * c - 2 * a + 2) % a))
    }
    if (e > 0) {
        d(0, 0, l + (g || 0));
        for (c = a + a / 2; c < 2 * a; c++)
            h.faces.push(new THREE.Face4(2 * a + 1,(2 * c - 2 * a + 2) % a + a,(2 * c - 2 * a + 1) % a + a,(2 * c - 2 * a) % a + a))
    }
    this.computeCentroids();
    this.computeFaceNormals()
};
Cylinder.prototype = new THREE.Geometry;
Cylinder.prototype.constructor = Cylinder;
var Icosahedron = function(a) {
    function e(o, q, m) {
        var t = Math.sqrt(o * o + q * q + m * m);
        return g.vertices.push(new THREE.Vertex(new THREE.Vector3(o / t,q / t,m / t))) - 1
    }
    function b(o, q, m, t) {
        t.faces.push(new THREE.Face3(o,q,m))
    }
    function c(o, q) {
        var m = g.vertices[o].position
          , t = g.vertices[q].position;
        return e((m.x + t.x) / 2, (m.y + t.y) / 2, (m.z + t.z) / 2)
    }
    var g = this, f = new THREE.Geometry, d;
    this.subdivisions = a || 0;
    THREE.Geometry.call(this);
    a = (1 + Math.sqrt(5)) / 2;
    e(-1, a, 0);
    e(1, a, 0);
    e(-1, -a, 0);
    e(1, -a, 0);
    e(0, -1, a);
    e(0, 1, a);
    e(0, -1, -a);
    e(0, 1, -a);
    e(a, 0, -1);
    e(a, 0, 1);
    e(-a, 0, -1);
    e(-a, 0, 1);
    b(0, 11, 5, f);
    b(0, 5, 1, f);
    b(0, 1, 7, f);
    b(0, 7, 10, f);
    b(0, 10, 11, f);
    b(1, 5, 9, f);
    b(5, 11, 4, f);
    b(11, 10, 2, f);
    b(10, 7, 6, f);
    b(7, 1, 8, f);
    b(3, 9, 4, f);
    b(3, 4, 2, f);
    b(3, 2, 6, f);
    b(3, 6, 8, f);
    b(3, 8, 9, f);
    b(4, 9, 5, f);
    b(2, 4, 11, f);
    b(6, 2, 10, f);
    b(8, 6, 7, f);
    b(9, 8, 1, f);
    for (a = 0; a < this.subdivisions; a++) {
        d = new THREE.Geometry;
        for (var h in f.faces) {
            var j = c(f.faces[h].a, f.faces[h].b)
              , l = c(f.faces[h].b, f.faces[h].c)
              , k = c(f.faces[h].c, f.faces[h].a);
            b(f.faces[h].a, j, k, d);
            b(f.faces[h].b, l, j, d);
            b(f.faces[h].c, k, l, d);
            b(j, l, k, d)
        }
        f.faces = d.faces
    }
    g.faces = f.faces;
    delete f;
    delete d;
    this.computeCentroids();
    this.computeFaceNormals();
    this.computeVertexNormals()
};
Icosahedron.prototype = new THREE.Geometry;
Icosahedron.prototype.constructor = Icosahedron;
function Lathe(a, e, b) {
    THREE.Geometry.call(this);
    this.steps = e || 12;
    this.angle = b || 2 * Math.PI;
    e = this.angle / this.steps;
    for (var c = [], g = [], f = [], d = [], h = 0; h < a.length; h++) {
        this.vertices.push(new THREE.Vertex(a[h]));
        c[h] = a[h].clone();
        g[h] = this.vertices.length - 1
    }
    for (var j = (new THREE.Matrix4).setRotationZ(e), l = 0; l <= this.angle + 0.001; l += e) {
        for (h = 0; h < c.length; h++)
            if (l < this.angle) {
                c[h] = j.multiplyVector3(c[h].clone());
                this.vertices.push(new THREE.Vertex(c[h]));
                f[h] = this.vertices.length - 1
            } else
                f = d;
        l == 0 && (d = g);
        for (h = 0; h < g.length - 1; h++) {
            this.faces.push(new THREE.Face4(f[h],f[h + 1],g[h + 1],g[h]));
            this.faceVertexUvs[0].push([new THREE.UV(l / b,h / a.length), new THREE.UV(l / b,(h + 1) / a.length), new THREE.UV((l - e) / b,(h + 1) / a.length), new THREE.UV((l - e) / b,h / a.length)])
        }
        g = f;
        f = []
    }
    this.computeCentroids();
    this.computeFaceNormals();
    this.computeVertexNormals()
}
Lathe.prototype = new THREE.Geometry;
Lathe.prototype.constructor = Lathe;
var Plane = function(a, e, b, c) {
    THREE.Geometry.call(this);
    var g, f = a / 2, d = e / 2;
    b = b || 1;
    c = c || 1;
    var h = b + 1
      , j = c + 1;
    a /= b;
    var l = e / c;
    for (g = 0; g < j; g++)
        for (e = 0; e < h; e++)
            this.vertices.push(new THREE.Vertex(new THREE.Vector3(e * a - f,-(g * l - d),0)));
    for (g = 0; g < c; g++)
        for (e = 0; e < b; e++) {
            this.faces.push(new THREE.Face4(e + h * g,e + h * (g + 1),e + 1 + h * (g + 1),e + 1 + h * g));
            this.faceVertexUvs[0].push([new THREE.UV(e / b,g / c), new THREE.UV(e / b,(g + 1) / c), new THREE.UV((e + 1) / b,(g + 1) / c), new THREE.UV((e + 1) / b,g / c)])
        }
    this.computeCentroids();
    this.computeFaceNormals()
};
Plane.prototype = new THREE.Geometry;
Plane.prototype.constructor = Plane;
var Sphere = function(a, e, b) {
    THREE.Geometry.call(this);
    var c, g = Math.PI, f = Math.max(3, e || 8), d = Math.max(2, b || 6);
    e = [];
    for (b = 0; b < d + 1; b++) {
        c = b / d;
        var h = a * Math.cos(c * g)
          , j = a * Math.sin(c * g)
          , l = []
          , k = 0;
        for (c = 0; c < f; c++) {
            var o = 2 * c / f
              , q = j * Math.sin(o * g);
            o = j * Math.cos(o * g);
            (b == 0 || b == d) && c > 0 || (k = this.vertices.push(new THREE.Vertex(new THREE.Vector3(o,h,q))) - 1);
            l.push(k)
        }
        e.push(l)
    }
    var m, t, A;
    g = e.length;
    for (b = 0; b < g; b++) {
        f = e[b].length;
        if (b > 0)
            for (c = 0; c < f; c++) {
                l = c == f - 1;
                d = e[b][l ? 0 : c + 1];
                h = e[b][l ? f - 1 : c];
                j = e[b - 1][l ? f - 1 : c];
                l = e[b - 1][l ? 0 : c + 1];
                q = b / (g - 1);
                m = (b - 1) / (g - 1);
                t = (c + 1) / f;
                o = c / f;
                k = new THREE.UV(1 - t,q);
                q = new THREE.UV(1 - o,q);
                o = new THREE.UV(1 - o,m);
                var z = new THREE.UV(1 - t,m);
                if (b < e.length - 1) {
                    m = this.vertices[d].position.clone();
                    t = this.vertices[h].position.clone();
                    A = this.vertices[j].position.clone();
                    m.normalize();
                    t.normalize();
                    A.normalize();
                    this.faces.push(new THREE.Face3(d,h,j,[new THREE.Vector3(m.x,m.y,m.z), new THREE.Vector3(t.x,t.y,t.z), new THREE.Vector3(A.x,A.y,A.z)]));
                    this.faceVertexUvs[0].push([k, q, o])
                }
                if (b > 1) {
                    m = this.vertices[d].position.clone();
                    t = this.vertices[j].position.clone();
                    A = this.vertices[l].position.clone();
                    m.normalize();
                    t.normalize();
                    A.normalize();
                    this.faces.push(new THREE.Face3(d,j,l,[new THREE.Vector3(m.x,m.y,m.z), new THREE.Vector3(t.x,t.y,t.z), new THREE.Vector3(A.x,A.y,A.z)]));
                    this.faceVertexUvs[0].push([k, o, z])
                }
            }
    }
    this.computeCentroids();
    this.computeFaceNormals();
    this.computeVertexNormals();
    this.boundingSphere = {
        radius: a
    }
};
Sphere.prototype = new THREE.Geometry;
Sphere.prototype.constructor = Sphere;
var Torus = function(a, e, b, c) {
    this.radius = a || 100;
    this.tube = e || 40;
    this.segmentsR = b || 8;
    this.segmentsT = c || 6;
    a = [];
    THREE.Geometry.call(this);
    for (e = 0; e <= this.segmentsR; ++e)
        for (b = 0; b <= this.segmentsT; ++b) {
            c = b / this.segmentsT * 2 * Math.PI;
            var g = e / this.segmentsR * 2 * Math.PI;
            this.vertices.push(new THREE.Vertex(new THREE.Vector3((this.radius + this.tube * Math.cos(g)) * Math.cos(c),(this.radius + this.tube * Math.cos(g)) * Math.sin(c),this.tube * Math.sin(g))));
            a.push([b / this.segmentsT, 1 - e / this.segmentsR])
        }
    for (e = 1; e <= this.segmentsR; ++e)
        for (b = 1; b <= this.segmentsT; ++b) {
            c = (this.segmentsT + 1) * e + b;
            g = (this.segmentsT + 1) * e + b - 1;
            var f = (this.segmentsT + 1) * (e - 1) + b - 1
              , d = (this.segmentsT + 1) * (e - 1) + b;
            this.faces.push(new THREE.Face4(c,g,f,d));
            this.faceVertexUvs[0].push([new THREE.UV(a[c][0],a[c][1]), new THREE.UV(a[g][0],a[g][1]), new THREE.UV(a[f][0],a[f][1]), new THREE.UV(a[d][0],a[d][1])])
        }
    delete a;
    this.computeCentroids();
    this.computeFaceNormals();
    this.computeVertexNormals()
};
Torus.prototype = new THREE.Geometry;
Torus.prototype.constructor = Torus;
var TorusKnot = function(a, e, b, c, g, f, d) {
    function h(o, q, m, t, A, z) {
        q = m / t * o;
        m = Math.cos(q);
        return new THREE.Vector3(A * (2 + m) * 0.5 * Math.cos(o),A * (2 + m) * Math.sin(o) * 0.5,z * A * Math.sin(q) * 0.5)
    }
    THREE.Geometry.call(this);
    this.radius = a || 200;
    this.tube = e || 40;
    this.segmentsR = b || 64;
    this.segmentsT = c || 8;
    this.p = g || 2;
    this.q = f || 3;
    this.heightScale = d || 1;
    this.grid = Array(this.segmentsR);
    b = new THREE.Vector3;
    c = new THREE.Vector3;
    f = new THREE.Vector3;
    for (a = 0; a < this.segmentsR; ++a) {
        this.grid[a] = Array(this.segmentsT);
        for (e = 0; e < this.segmentsT; ++e) {
            var j = a / this.segmentsR * 2 * this.p * Math.PI;
            d = e / this.segmentsT * 2 * Math.PI;
            g = h(j, d, this.q, this.p, this.radius, this.heightScale);
            j = h(j + 0.01, d, this.q, this.p, this.radius, this.heightScale);
            b.x = j.x - g.x;
            b.y = j.y - g.y;
            b.z = j.z - g.z;
            c.x = j.x + g.x;
            c.y = j.y + g.y;
            c.z = j.z + g.z;
            f.cross(b, c);
            c.cross(f, b);
            f.normalize();
            c.normalize();
            j = this.tube * Math.cos(d);
            d = this.tube * Math.sin(d);
            g.x += j * c.x + d * f.x;
            g.y += j * c.y + d * f.y;
            g.z += j * c.z + d * f.z;
            this.grid[a][e] = this.vertices.push(new THREE.Vertex(new THREE.Vector3(g.x,g.y,g.z))) - 1
        }
    }
    for (a = 0; a < this.segmentsR; ++a)
        for (e = 0; e < this.segmentsT; ++e) {
            f = (a + 1) % this.segmentsR;
            d = (e + 1) % this.segmentsT;
            g = this.grid[a][e];
            b = this.grid[f][e];
            c = this.grid[a][d];
            f = this.grid[f][d];
            d = new THREE.UV(a / this.segmentsR,e / this.segmentsT);
            j = new THREE.UV((a + 1) / this.segmentsR,e / this.segmentsT);
            var l = new THREE.UV(a / this.segmentsR,(e + 1) / this.segmentsT)
              , k = new THREE.UV((a + 1) / this.segmentsR,(e + 1) / this.segmentsT);
            this.faces.push(new THREE.Face3(g,b,c));
            this.faceVertexUvs[0].push([d, j, l]);
            this.faces.push(new THREE.Face3(f,c,b));
            this.faceVertexUvs[0].push([k, l, j])
        }
    this.computeCentroids();
    this.computeFaceNormals();
    this.computeVertexNormals()
};
TorusKnot.prototype = new THREE.Geometry;
TorusKnot.prototype.constructor = TorusKnot;
THREE.Loader = function(a) {
    this.statusDomElement = (this.showStatus = a) ? THREE.Loader.prototype.addStatusElement() : null
}
;
THREE.Loader.prototype = {
    addStatusElement: function() {
        var a = document.createElement("div");
        a.style.fontSize = "0.8em";
        a.style.textAlign = "left";
        a.style.background = "#b00";
        a.style.color = "#fff";
        a.style.width = "140px";
        a.style.padding = "0.25em 0.25em 0.25em 0.5em";
        a.style.position = "absolute";
        a.style.right = "0px";
        a.style.top = "0px";
        a.style.zIndex = 1E3;
        a.innerHTML = "Loading ...";
        return a
    },
    updateProgress: function(a) {
        var e = "Loaded ";
        e += a.total ? (100 * a.loaded / a.total).toFixed(0) + "%" : (a.loaded / 1E3).toFixed(2) + " KB";
        this.statusDomElement.innerHTML = e
    },
    extractUrlbase: function(a) {
        a = a.split("/");
        a.pop();
        return a.join("/")
    },
    init_materials: function(a, e, b) {
        a.materials = [];
        for (var c = 0; c < e.length; ++c)
            a.materials[c] = [THREE.Loader.prototype.createMaterial(e[c], b)]
    },
    createMaterial: function(a, e) {
        function b(h) {
            h = Math.log(h) / Math.LN2;
            return Math.floor(h) == h
        }
        function c(h, j) {
            var l = new Image;
            l.onload = function() {
                if (!b(this.width) || !b(this.height)) {
                    var k = Math.pow(2, Math.round(Math.log(this.width) / Math.LN2))
                      , o = Math.pow(2, Math.round(Math.log(this.height) / Math.LN2));
                    h.image.width = k;
                    h.image.height = o;
                    h.image.getContext("2d").drawImage(this, 0, 0, k, o)
                } else
                    h.image = this;
                h.needsUpdate = !0
            }
            ;
            l.src = j
        }
        var g, f, d;
        g = "MeshLambertMaterial";
        f = {
            color: 15658734,
            opacity: 1,
            map: null,
            lightMap: null,
            vertexColors: a.vertexColors ? THREE.VertexColors : !1
        };
        if (a.shading)
            if (a.shading == "Phong")
                g = "MeshPhongMaterial";
            else
                a.shading == "Basic" && (g = "MeshBasicMaterial");
        if (a.mapDiffuse && e) {
            d = document.createElement("canvas");
            f.map = new THREE.Texture(d);
            f.map.sourceFile = a.mapDiffuse;
            c(f.map, e + "/" + a.mapDiffuse)
        } else if (a.colorDiffuse) {
            d = (a.colorDiffuse[0] * 255 << 16) + (a.colorDiffuse[1] * 255 << 8) + a.colorDiffuse[2] * 255;
            f.color = d;
            f.opacity = a.transparency
        } else if (a.DbgColor)
            f.color = a.DbgColor;
        if (a.mapLightmap && e) {
            d = document.createElement("canvas");
            f.lightMap = new THREE.Texture(d);
            f.lightMap.sourceFile = a.mapLightmap;
            c(f.lightMap, e + "/" + a.mapLightmap)
        }
        return new THREE[g](f)
    }
};
THREE.JSONLoader = function(a) {
    THREE.Loader.call(this, a)
}
;
THREE.JSONLoader.prototype = new THREE.Loader;
THREE.JSONLoader.prototype.constructor = THREE.JSONLoader;
THREE.JSONLoader.prototype.supr = THREE.Loader.prototype;
THREE.JSONLoader.prototype = {
    load: function(a) {
        var e = a.model
          , b = a.callback
          , c = a.texture_path ? a.texture_path : THREE.Loader.prototype.extractUrlbase(e);
        a = (new Date).getTime();
        e = new Worker(e);
        e.onmessage = function(g) {
            THREE.JSONLoader.prototype.createModel(g.data, b, c)
        }
        ;
        e.postMessage(a)
    },
    createModel: function(a, e, b) {
        var c = function(g) {
            var f = this;
            THREE.Geometry.call(this);
            THREE.Loader.prototype.init_materials(f, a.materials, g);
            (function() {
                if (a.version === undefined || a.version != 2)
                    console.error("Deprecated file format.");
                else {
                    var d, h, j, l, k, o, q, m, t, A, z = a.faces;
                    m = a.vertices;
                    var x = a.normals
                      , y = a.colors
                      , n = 0;
                    for (d = 0; d < a.uvs.length; d++)
                        a.uvs[d].length && n++;
                    for (d = 0; d < n; d++) {
                        f.faceUvs[d] = [];
                        f.faceVertexUvs[d] = []
                    }
                    j = 0;
                    for (l = m.length; j < l; ) {
                        t = new THREE.Vertex;
                        t.position.x = m[j++];
                        t.position.y = m[j++];
                        t.position.z = m[j++];
                        f.vertices.push(t)
                    }
                    j = 0;
                    for (l = z.length; j < l; ) {
                        k = z[j++];
                        o = k & 1;
                        d = k & 2;
                        q = k & 4;
                        h = k & 8;
                        m = k & 16;
                        t = k & 32;
                        A = k & 64;
                        k &= 128;
                        if (o) {
                            o = new THREE.Face4;
                            o.a = z[j++];
                            o.b = z[j++];
                            o.c = z[j++];
                            o.d = z[j++];
                            nVertices = 4
                        } else {
                            o = new THREE.Face3;
                            o.a = z[j++];
                            o.b = z[j++];
                            o.c = z[j++];
                            nVertices = 3
                        }
                        if (d) {
                            materialIndex = z[j++];
                            o.materials = f.materials[materialIndex]
                        }
                        if (q)
                            for (d = 0; d < n; d++) {
                                uvLayer = a.uvs[d];
                                uvIndex = z[j++];
                                u = uvLayer[uvIndex * 2];
                                v = uvLayer[uvIndex * 2 + 1];
                                f.faceUvs[d].push(new THREE.UV(u,v))
                            }
                        if (h)
                            for (d = 0; d < n; d++) {
                                uvLayer = a.uvs[d];
                                uvs = [];
                                for (h = 0; h < nVertices; h++) {
                                    uvIndex = z[j++];
                                    u = uvLayer[uvIndex * 2];
                                    v = uvLayer[uvIndex * 2 + 1];
                                    uvs[h] = new THREE.UV(u,v)
                                }
                                f.faceVertexUvs[d].push(uvs)
                            }
                        if (m) {
                            normalIndex = z[j++] * 3;
                            normal = new THREE.Vector3;
                            normal.x = x[normalIndex++];
                            normal.y = x[normalIndex++];
                            normal.z = x[normalIndex];
                            o.normal = normal
                        }
                        if (t)
                            for (d = 0; d < nVertices; d++) {
                                normalIndex = z[j++] * 3;
                                normal = new THREE.Vector3;
                                normal.x = x[normalIndex++];
                                normal.y = x[normalIndex++];
                                normal.z = x[normalIndex];
                                o.vertexNormals.push(normal)
                            }
                        if (A) {
                            color = new THREE.Color(z[j++]);
                            o.color = color
                        }
                        if (k)
                            for (d = 0; d < nVertices; d++) {
                                colorIndex = z[j++];
                                color = new THREE.Color(y[colorIndex]);
                                o.vertexColors.push(color)
                            }
                        f.faces.push(o)
                    }
                }
            }
            )();
            (function() {
                var d, h, j, l;
                if (a.skinWeights) {
                    d = 0;
                    for (h = a.skinWeights.length; d < h; d += 2) {
                        j = a.skinWeights[d];
                        l = a.skinWeights[d + 1];
                        f.skinWeights.push(new THREE.Vector4(j,l,0,0))
                    }
                }
                if (a.skinIndices) {
                    d = 0;
                    for (h = a.skinIndices.length; d < h; d += 2) {
                        j = a.skinIndices[d];
                        l = a.skinIndices[d + 1];
                        f.skinIndices.push(new THREE.Vector4(j,l,0,0))
                    }
                }
                f.bones = a.bones;
                f.animation = a.animation
            }
            )();
            (function() {
                if (a.morphTargets !== undefined) {
                    var d, h, j, l;
                    d = 0;
                    for (h = a.morphTargets.length; d < h; d++) {
                        f.morphTargets[d] = {};
                        f.morphTargets[d].name = a.morphTargets[d].name;
                        f.morphTargets[d].vertices = [];
                        dstVertices = f.morphTargets[d].vertices;
                        srcVertices = a.morphTargets[d].vertices;
                        j = 0;
                        for (l = srcVertices.length; j < l; j += 3)
                            dstVertices.push(new THREE.Vertex(new THREE.Vector3(srcVertices[j],srcVertices[j + 1],srcVertices[j + 2])))
                    }
                }
            }
            )();
            this.computeCentroids();
            this.computeFaceNormals()
        };
        c.prototype = new THREE.Geometry;
        c.prototype.constructor = c;
        e(new c(b))
    }
};
THREE.BinaryLoader = function(a) {
    THREE.Loader.call(this, a)
}
;
THREE.BinaryLoader.prototype = new THREE.Loader;
THREE.BinaryLoader.prototype.constructor = THREE.BinaryLoader;
THREE.BinaryLoader.prototype.supr = THREE.Loader.prototype;
THREE.BinaryLoader.prototype = {
    load: function(a) {
        var e = a.model
          , b = a.callback
          , c = a.texture_path ? a.texture_path : THREE.Loader.prototype.extractUrlbase(e)
          , g = a.bin_path ? a.bin_path : THREE.Loader.prototype.extractUrlbase(e);
        a = (new Date).getTime();
        e = new Worker(e);
        var f = this.showProgress ? THREE.Loader.prototype.updateProgress : null;
        e.onmessage = function(d) {
            THREE.BinaryLoader.prototype.loadAjaxBuffers(d.data.buffers, d.data.materials, b, g, c, f)
        }
        ;
        e.onerror = function(d) {
            alert("worker.onerror: " + d.message + "\n" + d.data);
            d.preventDefault()
        }
        ;
        e.postMessage(a)
    },
    loadAjaxBuffers: function(a, e, b, c, g, f) {
        var d = new XMLHttpRequest
          , h = c + "/" + a
          , j = 0;
        d.onreadystatechange = function() {
            if (d.readyState == 4)
                d.status == 200 || d.status == 0 ? THREE.BinaryLoader.prototype.createBinModel(d.responseText, b, g, e) : alert("Couldn't load [" + h + "] [" + d.status + "]");
            else if (d.readyState == 3) {
                if (f) {
                    j == 0 && (j = d.getResponseHeader("Content-Length"));
                    f({
                        total: j,
                        loaded: d.responseText.length
                    })
                }
            } else
                d.readyState == 2 && (j = d.getResponseHeader("Content-Length"))
        }
        ;
        d.open("GET", h, !0);
        d.overrideMimeType("text/plain; charset=x-user-defined");
        d.setRequestHeader("Content-Type", "text/plain");
        d.send(null)
    },
    createBinModel: function(a, e, b, c) {
        var g = function(f) {
            function d(p, w) {
                var B = k(p, w)
                  , C = k(p, w + 1)
                  , G = k(p, w + 2)
                  , N = k(p, w + 3)
                  , R = (N << 1 & 255 | G >> 7) - 127;
                B |= (G & 127) << 16 | C << 8;
                if (B == 0 && R == -127)
                    return 0;
                return (1 - 2 * (N >> 7)) * (1 + B * Math.pow(2, -23)) * Math.pow(2, R)
            }
            function h(p, w) {
                var B = k(p, w)
                  , C = k(p, w + 1)
                  , G = k(p, w + 2);
                return (k(p, w + 3) << 24) + (G << 16) + (C << 8) + B
            }
            function j(p, w) {
                var B = k(p, w);
                return (k(p, w + 1) << 8) + B
            }
            function l(p, w) {
                var B = k(p, w);
                return B > 127 ? B - 256 : B
            }
            function k(p, w) {
                return p.charCodeAt(w) & 255
            }
            function o(p) {
                var w, B, C;
                w = h(a, p);
                B = h(a, p + M);
                C = h(a, p + F);
                p = j(a, p + J);
                THREE.BinaryLoader.prototype.f3(x, w, B, C, p)
            }
            function q(p) {
                var w, B, C, G, N, R;
                w = h(a, p);
                B = h(a, p + M);
                C = h(a, p + F);
                G = j(a, p + J);
                N = h(a, p + I);
                R = h(a, p + K);
                p = h(a, p + L);
                THREE.BinaryLoader.prototype.f3n(x, H, w, B, C, G, N, R, p)
            }
            function m(p) {
                var w, B, C, G;
                w = h(a, p);
                B = h(a, p + P);
                C = h(a, p + Q);
                G = h(a, p + E);
                p = j(a, p + O);
                THREE.BinaryLoader.prototype.f4(x, w, B, C, G, p)
            }
            function t(p) {
                var w, B, C, G, N, R, aa, ba;
                w = h(a, p);
                B = h(a, p + P);
                C = h(a, p + Q);
                G = h(a, p + E);
                N = j(a, p + O);
                R = h(a, p + U);
                aa = h(a, p + $);
                ba = h(a, p + T);
                p = h(a, p + ca);
                THREE.BinaryLoader.prototype.f4n(x, H, w, B, C, G, N, R, aa, ba, p)
            }
            function A(p) {
                var w, B;
                w = h(a, p);
                B = h(a, p + da);
                p = h(a, p + ea);
                THREE.BinaryLoader.prototype.uv3(x.faceVertexUvs[0], D[w * 2], D[w * 2 + 1], D[B * 2], D[B * 2 + 1], D[p * 2], D[p * 2 + 1])
            }
            function z(p) {
                var w, B, C;
                w = h(a, p);
                B = h(a, p + fa);
                C = h(a, p + ga);
                p = h(a, p + ha);
                THREE.BinaryLoader.prototype.uv4(x.faceVertexUvs[0], D[w * 2], D[w * 2 + 1], D[B * 2], D[B * 2 + 1], D[C * 2], D[C * 2 + 1], D[p * 2], D[p * 2 + 1])
            }
            var x = this, y = 0, n, H = [], D = [], M, F, J, I, K, L, P, Q, E, O, U, $, T, ca, da, ea, fa, ga, ha, V, W, X, Y, Z, S;
            THREE.Geometry.call(this);
            THREE.Loader.prototype.init_materials(x, c, f);
            n = {
                signature: a.substr(y, 8),
                header_bytes: k(a, y + 8),
                vertex_coordinate_bytes: k(a, y + 9),
                normal_coordinate_bytes: k(a, y + 10),
                uv_coordinate_bytes: k(a, y + 11),
                vertex_index_bytes: k(a, y + 12),
                normal_index_bytes: k(a, y + 13),
                uv_index_bytes: k(a, y + 14),
                material_index_bytes: k(a, y + 15),
                nvertices: h(a, y + 16),
                nnormals: h(a, y + 16 + 4),
                nuvs: h(a, y + 16 + 8),
                ntri_flat: h(a, y + 16 + 12),
                ntri_smooth: h(a, y + 16 + 16),
                ntri_flat_uv: h(a, y + 16 + 20),
                ntri_smooth_uv: h(a, y + 16 + 24),
                nquad_flat: h(a, y + 16 + 28),
                nquad_smooth: h(a, y + 16 + 32),
                nquad_flat_uv: h(a, y + 16 + 36),
                nquad_smooth_uv: h(a, y + 16 + 40)
            };
            y += n.header_bytes;
            M = n.vertex_index_bytes;
            F = n.vertex_index_bytes * 2;
            J = n.vertex_index_bytes * 3;
            I = n.vertex_index_bytes * 3 + n.material_index_bytes;
            K = n.vertex_index_bytes * 3 + n.material_index_bytes + n.normal_index_bytes;
            L = n.vertex_index_bytes * 3 + n.material_index_bytes + n.normal_index_bytes * 2;
            P = n.vertex_index_bytes;
            Q = n.vertex_index_bytes * 2;
            E = n.vertex_index_bytes * 3;
            O = n.vertex_index_bytes * 4;
            U = n.vertex_index_bytes * 4 + n.material_index_bytes;
            $ = n.vertex_index_bytes * 4 + n.material_index_bytes + n.normal_index_bytes;
            T = n.vertex_index_bytes * 4 + n.material_index_bytes + n.normal_index_bytes * 2;
            ca = n.vertex_index_bytes * 4 + n.material_index_bytes + n.normal_index_bytes * 3;
            da = n.uv_index_bytes;
            ea = n.uv_index_bytes * 2;
            fa = n.uv_index_bytes;
            ga = n.uv_index_bytes * 2;
            ha = n.uv_index_bytes * 3;
            f = n.vertex_index_bytes * 3 + n.material_index_bytes;
            S = n.vertex_index_bytes * 4 + n.material_index_bytes;
            V = n.ntri_flat * f;
            W = n.ntri_smooth * (f + n.normal_index_bytes * 3);
            X = n.ntri_flat_uv * (f + n.uv_index_bytes * 3);
            Y = n.ntri_smooth_uv * (f + n.normal_index_bytes * 3 + n.uv_index_bytes * 3);
            Z = n.nquad_flat * S;
            f = n.nquad_smooth * (S + n.normal_index_bytes * 4);
            S = n.nquad_flat_uv * (S + n.uv_index_bytes * 4);
            y += function(p) {
                for (var w, B, C, G = n.vertex_coordinate_bytes * 3, N = p + n.nvertices * G; p < N; p += G) {
                    w = d(a, p);
                    B = d(a, p + n.vertex_coordinate_bytes);
                    C = d(a, p + n.vertex_coordinate_bytes * 2);
                    THREE.BinaryLoader.prototype.v(x, w, B, C)
                }
                return n.nvertices * G
            }(y);
            y += function(p) {
                for (var w, B, C, G = n.normal_coordinate_bytes * 3, N = p + n.nnormals * G; p < N; p += G) {
                    w = l(a, p);
                    B = l(a, p + n.normal_coordinate_bytes);
                    C = l(a, p + n.normal_coordinate_bytes * 2);
                    H.push(w / 127, B / 127, C / 127)
                }
                return n.nnormals * G
            }(y);
            y += function(p) {
                for (var w, B, C = n.uv_coordinate_bytes * 2, G = p + n.nuvs * C; p < G; p += C) {
                    w = d(a, p);
                    B = d(a, p + n.uv_coordinate_bytes);
                    D.push(w, B)
                }
                return n.nuvs * C
            }(y);
            V = y + V;
            W = V + W;
            X = W + X;
            Y = X + Y;
            Z = Y + Z;
            f = Z + f;
            S = f + S;
            (function(p) {
                var w, B = n.vertex_index_bytes * 3 + n.material_index_bytes, C = B + n.uv_index_bytes * 3, G = p + n.ntri_flat_uv * C;
                for (w = p; w < G; w += C) {
                    o(w);
                    A(w + B)
                }
                return G - p
            }
            )(W);
            (function(p) {
                var w, B = n.vertex_index_bytes * 3 + n.material_index_bytes + n.normal_index_bytes * 3, C = B + n.uv_index_bytes * 3, G = p + n.ntri_smooth_uv * C;
                for (w = p; w < G; w += C) {
                    q(w);
                    A(w + B)
                }
                return G - p
            }
            )(X);
            (function(p) {
                var w, B = n.vertex_index_bytes * 4 + n.material_index_bytes, C = B + n.uv_index_bytes * 4, G = p + n.nquad_flat_uv * C;
                for (w = p; w < G; w += C) {
                    m(w);
                    z(w + B)
                }
                return G - p
            }
            )(f);
            (function(p) {
                var w, B = n.vertex_index_bytes * 4 + n.material_index_bytes + n.normal_index_bytes * 4, C = B + n.uv_index_bytes * 4, G = p + n.nquad_smooth_uv * C;
                for (w = p; w < G; w += C) {
                    t(w);
                    z(w + B)
                }
                return G - p
            }
            )(S);
            (function(p) {
                var w, B = n.vertex_index_bytes * 3 + n.material_index_bytes, C = p + n.ntri_flat * B;
                for (w = p; w < C; w += B)
                    o(w);
                return C - p
            }
            )(y);
            (function(p) {
                var w, B = n.vertex_index_bytes * 3 + n.material_index_bytes + n.normal_index_bytes * 3, C = p + n.ntri_smooth * B;
                for (w = p; w < C; w += B)
                    q(w);
                return C - p
            }
            )(V);
            (function(p) {
                var w, B = n.vertex_index_bytes * 4 + n.material_index_bytes, C = p + n.nquad_flat * B;
                for (w = p; w < C; w += B)
                    m(w);
                return C - p
            }
            )(Y);
            (function(p) {
                var w, B = n.vertex_index_bytes * 4 + n.material_index_bytes + n.normal_index_bytes * 4, C = p + n.nquad_smooth * B;
                for (w = p; w < C; w += B)
                    t(w);
                return C - p
            }
            )(Z);
            this.computeCentroids();
            this.computeFaceNormals()
        };
        g.prototype = new THREE.Geometry;
        g.prototype.constructor = g;
        e(new g(b))
    },
    v: function(a, e, b, c) {
        a.vertices.push(new THREE.Vertex(new THREE.Vector3(e,b,c)))
    },
    f3: function(a, e, b, c, g) {
        a.faces.push(new THREE.Face3(e,b,c,null,null,a.materials[g]))
    },
    f4: function(a, e, b, c, g, f) {
        a.faces.push(new THREE.Face4(e,b,c,g,null,null,a.materials[f]))
    },
    f3n: function(a, e, b, c, g, f, d, h, j) {
        f = a.materials[f];
        var l = e[h * 3]
          , k = e[h * 3 + 1];
        h = e[h * 3 + 2];
        var o = e[j * 3]
          , q = e[j * 3 + 1];
        j = e[j * 3 + 2];
        a.faces.push(new THREE.Face3(b,c,g,[new THREE.Vector3(e[d * 3],e[d * 3 + 1],e[d * 3 + 2]), new THREE.Vector3(l,k,h), new THREE.Vector3(o,q,j)],null,f))
    },
    f4n: function(a, e, b, c, g, f, d, h, j, l, k) {
        d = a.materials[d];
        var o = e[j * 3]
          , q = e[j * 3 + 1];
        j = e[j * 3 + 2];
        var m = e[l * 3]
          , t = e[l * 3 + 1];
        l = e[l * 3 + 2];
        var A = e[k * 3]
          , z = e[k * 3 + 1];
        k = e[k * 3 + 2];
        a.faces.push(new THREE.Face4(b,c,g,f,[new THREE.Vector3(e[h * 3],e[h * 3 + 1],e[h * 3 + 2]), new THREE.Vector3(o,q,j), new THREE.Vector3(m,t,l), new THREE.Vector3(A,z,k)],null,d))
    },
    uv3: function(a, e, b, c, g, f, d) {
        var h = [];
        h.push(new THREE.UV(e,b));
        h.push(new THREE.UV(c,g));
        h.push(new THREE.UV(f,d));
        a.push(h)
    },
    uv4: function(a, e, b, c, g, f, d, h, j) {
        var l = [];
        l.push(new THREE.UV(e,b));
        l.push(new THREE.UV(c,g));
        l.push(new THREE.UV(f,d));
        l.push(new THREE.UV(h,j));
        a.push(l)
    }
};
if (!window.Int32Array) {
    window.Int32Array = Array;
    window.Float32Array = Array
}
THREE.MarchingCubes = function(a, e) {
    THREE.Object3D.call(this);
    this.materials = e instanceof Array ? e : [e];
    this.init = function(b) {
        this.isolation = 80;
        this.size = b;
        this.size2 = this.size * this.size;
        this.size3 = this.size2 * this.size;
        this.halfsize = this.size / 2;
        this.delta = 2 / this.size;
        this.yd = this.size;
        this.zd = this.size2;
        this.field = new Float32Array(this.size3);
        this.normal_cache = new Float32Array(this.size3 * 3);
        this.vlist = new Float32Array(36);
        this.nlist = new Float32Array(36);
        this.firstDraw = !0;
        this.maxCount = 4096;
        this.count = 0;
        this.hasPos = !1;
        this.hasNormal = !1;
        this.positionArray = new Float32Array(this.maxCount * 3);
        this.normalArray = new Float32Array(this.maxCount * 3)
    }
    ;
    this.lerp = function(b, c, g) {
        return b + (c - b) * g
    }
    ;
    this.VIntX = function(b, c, g, f, d, h, j, l, k, o) {
        d = (d - k) / (o - k);
        k = this.normal_cache;
        c[f] = h + d * this.delta;
        c[f + 1] = j;
        c[f + 2] = l;
        g[f] = this.lerp(k[b], k[b + 3], d);
        g[f + 1] = this.lerp(k[b + 1], k[b + 4], d);
        g[f + 2] = this.lerp(k[b + 2], k[b + 5], d)
    }
    ;
    this.VIntY = function(b, c, g, f, d, h, j, l, k, o) {
        d = (d - k) / (o - k);
        k = this.normal_cache;
        c[f] = h;
        c[f + 1] = j + d * this.delta;
        c[f + 2] = l;
        c = b + this.yd * 3;
        g[f] = this.lerp(k[b], k[c], d);
        g[f + 1] = this.lerp(k[b + 1], k[c + 1], d);
        g[f + 2] = this.lerp(k[b + 2], k[c + 2], d)
    }
    ;
    this.VIntZ = function(b, c, g, f, d, h, j, l, k, o) {
        d = (d - k) / (o - k);
        k = this.normal_cache;
        c[f] = h;
        c[f + 1] = j;
        c[f + 2] = l + d * this.delta;
        c = b + this.zd * 3;
        g[f] = this.lerp(k[b], k[c], d);
        g[f + 1] = this.lerp(k[b + 1], k[c + 1], d);
        g[f + 2] = this.lerp(k[b + 2], k[c + 2], d)
    }
    ;
    this.compNorm = function(b) {
        var c = b * 3;
        if (this.normal_cache[c] == 0) {
            this.normal_cache[c] = this.field[b - 1] - this.field[b + 1];
            this.normal_cache[c + 1] = this.field[b - this.yd] - this.field[b + this.yd];
            this.normal_cache[c + 2] = this.field[b - this.zd] - this.field[b + this.zd]
        }
    }
    ;
    this.polygonize = function(b, c, g, f, d, h) {
        var j = f + 1
          , l = f + this.yd
          , k = f + this.zd
          , o = j + this.yd
          , q = j + this.zd
          , m = f + this.yd + this.zd
          , t = j + this.yd + this.zd
          , A = 0
          , z = this.field[f]
          , x = this.field[j]
          , y = this.field[l]
          , n = this.field[o]
          , H = this.field[k]
          , D = this.field[q]
          , M = this.field[m]
          , F = this.field[t];
        z < d && (A |= 1);
        x < d && (A |= 2);
        y < d && (A |= 8);
        n < d && (A |= 4);
        H < d && (A |= 16);
        D < d && (A |= 32);
        M < d && (A |= 128);
        F < d && (A |= 64);
        var J = THREE.edgeTable[A];
        if (J == 0)
            return 0;
        var I = this.delta
          , K = b + I
          , L = c + I;
        I = g + I;
        if (J & 1) {
            this.compNorm(f);
            this.compNorm(j);
            this.VIntX(f * 3, this.vlist, this.nlist, 0, d, b, c, g, z, x)
        }
        if (J & 2) {
            this.compNorm(j);
            this.compNorm(o);
            this.VIntY(j * 3, this.vlist, this.nlist, 3, d, K, c, g, x, n)
        }
        if (J & 4) {
            this.compNorm(l);
            this.compNorm(o);
            this.VIntX(l * 3, this.vlist, this.nlist, 6, d, b, L, g, y, n)
        }
        if (J & 8) {
            this.compNorm(f);
            this.compNorm(l);
            this.VIntY(f * 3, this.vlist, this.nlist, 9, d, b, c, g, z, y)
        }
        if (J & 16) {
            this.compNorm(k);
            this.compNorm(q);
            this.VIntX(k * 3, this.vlist, this.nlist, 12, d, b, c, I, H, D)
        }
        if (J & 32) {
            this.compNorm(q);
            this.compNorm(t);
            this.VIntY(q * 3, this.vlist, this.nlist, 15, d, K, c, I, D, F)
        }
        if (J & 64) {
            this.compNorm(m);
            this.compNorm(t);
            this.VIntX(m * 3, this.vlist, this.nlist, 18, d, b, L, I, M, F)
        }
        if (J & 128) {
            this.compNorm(k);
            this.compNorm(m);
            this.VIntY(k * 3, this.vlist, this.nlist, 21, d, b, c, I, H, M)
        }
        if (J & 256) {
            this.compNorm(f);
            this.compNorm(k);
            this.VIntZ(f * 3, this.vlist, this.nlist, 24, d, b, c, g, z, H)
        }
        if (J & 512) {
            this.compNorm(j);
            this.compNorm(q);
            this.VIntZ(j * 3, this.vlist, this.nlist, 27, d, K, c, g, x, D)
        }
        if (J & 1024) {
            this.compNorm(o);
            this.compNorm(t);
            this.VIntZ(o * 3, this.vlist, this.nlist, 30, d, K, L, g, n, F)
        }
        if (J & 2048) {
            this.compNorm(l);
            this.compNorm(m);
            this.VIntZ(l * 3, this.vlist, this.nlist, 33, d, b, L, g, y, M)
        }
        A <<= 4;
        for (d = f = 0; THREE.triTable[A + d] != -1; ) {
            b = A + d;
            c = b + 1;
            g = b + 2;
            this.posnormtriv(this.vlist, this.nlist, 3 * THREE.triTable[b], 3 * THREE.triTable[c], 3 * THREE.triTable[g], h);
            d += 3;
            f++
        }
        return f
    }
    ;
    this.posnormtriv = function(b, c, g, f, d, h) {
        var j = this.count * 3;
        this.positionArray[j] = b[g];
        this.positionArray[j + 1] = b[g + 1];
        this.positionArray[j + 2] = b[g + 2];
        this.positionArray[j + 3] = b[f];
        this.positionArray[j + 4] = b[f + 1];
        this.positionArray[j + 5] = b[f + 2];
        this.positionArray[j + 6] = b[d];
        this.positionArray[j + 7] = b[d + 1];
        this.positionArray[j + 8] = b[d + 2];
        this.normalArray[j] = c[g];
        this.normalArray[j + 1] = c[g + 1];
        this.normalArray[j + 2] = c[g + 2];
        this.normalArray[j + 3] = c[f];
        this.normalArray[j + 4] = c[f + 1];
        this.normalArray[j + 5] = c[f + 2];
        this.normalArray[j + 6] = c[d];
        this.normalArray[j + 7] = c[d + 1];
        this.normalArray[j + 8] = c[d + 2];
        this.hasPos = !0;
        this.hasNormal = !0;
        this.count += 3;
        this.count >= this.maxCount - 3 && h(this)
    }
    ;
    this.begin = function() {
        this.count = 0;
        this.hasPos = !1;
        this.hasNormal = !1
    }
    ;
    this.end = function(b) {
        if (this.count != 0) {
            for (var c = this.count * 3; c < this.positionArray.length; c++)
                this.positionArray[c] = 0;
            b(this)
        }
    }
    ;
    this.addBall = function(b, c, g, f, d) {
        var h = this.size * Math.sqrt(f / d)
          , j = g * this.size
          , l = c * this.size
          , k = b * this.size
          , o = Math.floor(j - h);
        o < 1 && (o = 1);
        j = Math.floor(j + h);
        j > this.size - 1 && (j = this.size - 1);
        var q = Math.floor(l - h);
        q < 1 && (q = 1);
        l = Math.floor(l + h);
        l > this.size - 1 && (l = this.size - 1);
        var m = Math.floor(k - h);
        m < 1 && (m = 1);
        h = Math.floor(k + h);
        h > this.size - 1 && (h = this.size - 1);
        for (var t, A, z, x, y, n; o < j; o++) {
            k = this.size2 * o;
            A = o / this.size - g;
            y = A * A;
            for (A = q; A < l; A++) {
                z = k + this.size * A;
                t = A / this.size - c;
                n = t * t;
                for (t = m; t < h; t++) {
                    x = t / this.size - b;
                    x = f / (1.0E-6 + x * x + n + y) - d;
                    x > 0 && (this.field[z + t] += x)
                }
            }
        }
    }
    ;
    this.addPlaneX = function(b, c) {
        var g, f, d, h, j, l = this.size, k = this.yd, o = this.zd, q = this.field, m = l * Math.sqrt(b / c);
        m > l && (m = l);
        for (g = 0; g < m; g++) {
            f = g / l;
            f *= f;
            h = b / (1.0E-4 + f) - c;
            if (h > 0)
                for (f = 0; f < l; f++) {
                    j = g + f * k;
                    for (d = 0; d < l; d++)
                        q[o * d + j] += h
                }
        }
    }
    ;
    this.addPlaneY = function(b, c) {
        var g, f, d, h, j, l, k = this.size, o = this.yd, q = this.zd, m = this.field, t = k * Math.sqrt(b / c);
        t > k && (t = k);
        for (f = 0; f < t; f++) {
            g = f / k;
            g *= g;
            h = b / (1.0E-4 + g) - c;
            if (h > 0) {
                j = f * o;
                for (g = 0; g < k; g++) {
                    l = j + g;
                    for (d = 0; d < k; d++)
                        m[q * d + l] += h
                }
            }
        }
    }
    ;
    this.addPlaneZ = function(b, c) {
        var g, f, d, h, j, l;
        size = this.size;
        yd = this.yd;
        zd = this.zd;
        field = this.field;
        dist = size * Math.sqrt(b / c);
        dist > size && (dist = size);
        for (d = 0; d < dist; d++) {
            g = d / size;
            g *= g;
            h = b / (1.0E-4 + g) - c;
            if (h > 0) {
                j = zd * d;
                for (f = 0; f < size; f++) {
                    l = j + f * yd;
                    for (g = 0; g < size; g++)
                        field[l + g] += h
                }
            }
        }
    }
    ;
    this.reset = function() {
        var b;
        for (b = 0; b < this.size3; b++) {
            this.normal_cache[b * 3] = 0;
            this.field[b] = 0
        }
    }
    ;
    this.render = function(b) {
        this.begin();
        var c, g, f, d, h, j, l, k, o, q = this.size - 2;
        for (d = 1; d < q; d++) {
            o = this.size2 * d;
            l = (d - this.halfsize) / this.halfsize;
            for (f = 1; f < q; f++) {
                k = o + this.size * f;
                j = (f - this.halfsize) / this.halfsize;
                for (g = 1; g < q; g++) {
                    h = (g - this.halfsize) / this.halfsize;
                    c = k + g;
                    this.polygonize(h, j, l, c, this.isolation, b)
                }
            }
        }
        this.end(b)
    }
    ;
    this.generateGeometry = function() {
        var b = 0
          , c = new THREE.Geometry;
        this.render(function(g) {
            var f, d, h, j, l, k, o, q;
            for (f = 0; f < g.count; f++) {
                l = f * 3;
                o = l + 1;
                q = l + 2;
                d = g.positionArray[l];
                h = g.positionArray[o];
                j = g.positionArray[q];
                k = new THREE.Vector3(d,h,j);
                d = g.normalArray[l];
                h = g.normalArray[o];
                j = g.normalArray[q];
                l = new THREE.Vector3(d,h,j);
                l.normalize();
                l = new THREE.Vertex(k,l);
                c.vertices.push(l)
            }
            nfaces = g.count / 3;
            for (f = 0; f < nfaces; f++) {
                l = (b + f) * 3;
                o = l + 1;
                q = l + 2;
                k = c.vertices[l].normal;
                d = c.vertices[o].normal;
                h = c.vertices[q].normal;
                l = new THREE.Face3(l,o,q,[k, d, h]);
                c.faces.push(l)
            }
            b += nfaces;
            g.count = 0
        });
        return c
    }
    ;
    this.init(a)
}
;
THREE.MarchingCubes.prototype = new THREE.Object3D;
THREE.MarchingCubes.prototype.constructor = THREE.MarchingCubes;
THREE.edgeTable = new Int32Array([0, 265, 515, 778, 1030, 1295, 1541, 1804, 2060, 2309, 2575, 2822, 3082, 3331, 3593, 3840, 400, 153, 915, 666, 1430, 1183, 1941, 1692, 2460, 2197, 2975, 2710, 3482, 3219, 3993, 3728, 560, 825, 51, 314, 1590, 1855, 1077, 1340, 2620, 2869, 2111, 2358, 3642, 3891, 3129, 3376, 928, 681, 419, 170, 1958, 1711, 1445, 1196, 2988, 2725, 2479, 2214, 4010, 3747, 3497, 3232, 1120, 1385, 1635, 1898, 102, 367, 613, 876, 3180, 3429, 3695, 3942, 2154, 2403, 2665, 2912, 1520, 1273, 2035, 1786, 502, 255, 1013, 764, 3580, 3317, 4095, 3830, 2554, 2291, 3065, 2800, 1616, 1881, 1107, 1370, 598, 863, 85, 348, 3676, 3925, 3167, 3414, 2650, 2899, 2137, 2384, 1984, 1737, 1475, 1226, 966, 719, 453, 204, 4044, 3781, 3535, 3270, 3018, 2755, 2505, 2240, 2240, 2505, 2755, 3018, 3270, 3535, 3781, 4044, 204, 453, 719, 966, 1226, 1475, 1737, 1984, 2384, 2137, 2899, 2650, 3414, 3167, 3925, 3676, 348, 85, 863, 598, 1370, 1107, 1881, 1616, 2800, 3065, 2291, 2554, 3830, 4095, 3317, 3580, 764, 1013, 255, 502, 1786, 2035, 1273, 1520, 2912, 2665, 2403, 2154, 3942, 3695, 3429, 3180, 876, 613, 367, 102, 1898, 1635, 1385, 1120, 3232, 3497, 3747, 4010, 2214, 2479, 2725, 2988, 1196, 1445, 1711, 1958, 170, 419, 681, 928, 3376, 3129, 3891, 3642, 2358, 2111, 2869, 2620, 1340, 1077, 1855, 1590, 314, 51, 825, 560, 3728, 3993, 3219, 3482, 2710, 2975, 2197, 2460, 1692, 1941, 1183, 1430, 666, 915, 153, 400, 3840, 3593, 3331, 3082, 2822, 2575, 2309, 2060, 1804, 1541, 1295, 1030, 778, 515, 265, 0]);
THREE.triTable = new Int32Array([-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 8, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 1, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 8, 3, 9, 8, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 2, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 8, 3, 1, 2, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, 2, 10, 0, 2, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, 8, 3, 2, 10, 8, 10, 9, 8, -1, -1, -1, -1, -1, -1, -1, 3, 11, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 11, 2, 8, 11, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 9, 0, 2, 3, 11, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 11, 2, 1, 9, 11, 9, 8, 11, -1, -1, -1, -1, -1, -1, -1, 3, 10, 1, 11, 10, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 10, 1, 0, 8, 10, 8, 11, 10, -1, -1, -1, -1, -1, -1, -1, 3, 9, 0, 3, 11, 9, 11, 10, 9, -1, -1, -1, -1, -1, -1, -1, 9, 8, 10, 10, 8, 11, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 7, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 3, 0, 7, 3, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 1, 9, 8, 4, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 1, 9, 4, 7, 1, 7, 3, 1, -1, -1, -1, -1, -1, -1, -1, 1, 2, 10, 8, 4, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 4, 7, 3, 0, 4, 1, 2, 10, -1, -1, -1, -1, -1, -1, -1, 9, 2, 10, 9, 0, 2, 8, 4, 7, -1, -1, -1, -1, -1, -1, -1, 2, 10, 9, 2, 9, 7, 2, 7, 3, 7, 9, 4, -1, -1, -1, -1, 8, 4, 7, 3, 11, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 11, 4, 7, 11, 2, 4, 2, 0, 4, -1, -1, -1, -1, -1, -1, -1, 9, 0, 1, 8, 4, 7, 2, 3, 11, -1, -1, -1, -1, -1, -1, -1, 4, 7, 11, 9, 4, 11, 9, 11, 2, 9, 2, 1, -1, -1, -1, -1, 3, 10, 1, 3, 11, 10, 7, 8, 4, -1, -1, -1, -1, -1, -1, -1, 1, 11, 10, 1, 4, 11, 1, 0, 4, 7, 11, 4, -1, -1, -1, -1, 4, 7, 8, 9, 0, 11, 9, 11, 10, 11, 0, 3, -1, -1, -1, -1, 4, 7, 11, 4, 11, 9, 9, 11, 10, -1, -1, -1, -1, -1, -1, -1, 9, 5, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, 5, 4, 0, 8, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 5, 4, 1, 5, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, 5, 4, 8, 3, 5, 3, 1, 5, -1, -1, -1, -1, -1, -1, -1, 1, 2, 10, 9, 5, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 0, 8, 1, 2, 10, 4, 9, 5, -1, -1, -1, -1, -1, -1, -1, 5, 2, 10, 5, 4, 2, 4, 0, 2, -1, -1, -1, -1, -1, -1, -1, 2, 10, 5, 3, 2, 5, 3, 5, 4, 3, 4, 8, -1, -1, -1, -1, 9, 5, 4, 2, 3, 11, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 11, 2, 0, 8, 11, 4, 9, 5, -1, -1, -1, -1, -1, -1, -1, 0, 5, 4, 0, 1, 5, 2, 3, 11, -1, -1, -1, -1, -1, -1, -1, 2, 1, 5, 2, 5, 8, 2, 8, 11, 4, 8, 5, -1, -1, -1, -1, 10, 3, 11, 10, 1, 3, 9, 5, 4, -1, -1, -1, -1, -1, -1, -1, 4, 9, 5, 0, 8, 1, 8, 10, 1, 8, 11, 10, -1, -1, -1, -1, 5, 4, 0, 5, 0, 11, 5, 11, 10, 11, 0, 3, -1, -1, -1, -1, 5, 4, 8, 5, 8, 10, 10, 8, 11, -1, -1, -1, -1, -1, -1, -1, 9, 7, 8, 5, 7, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, 3, 0, 9, 5, 3, 5, 7, 3, -1, -1, -1, -1, -1, -1, -1, 0, 7, 8, 0, 1, 7, 1, 5, 7, -1, -1, -1, -1, -1, -1, -1, 1, 5, 3, 3, 5, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, 7, 8, 9, 5, 7, 10, 1, 2, -1, -1, -1, -1, -1, -1, -1, 10, 1, 2, 9, 5, 0, 5, 3, 0, 5, 7, 3, -1, -1, -1, -1, 8, 0, 2, 8, 2, 5, 8, 5, 7, 10, 5, 2, -1, -1, -1, -1, 2, 10, 5, 2, 5, 3, 3, 5, 7, -1, -1, -1, -1, -1, -1, -1, 7, 9, 5, 7, 8, 9, 3, 11, 2, -1, -1, -1, -1, -1, -1, -1, 9, 5, 7, 9, 7, 2, 9, 2, 0, 2, 7, 11, -1, -1, -1, -1, 2, 3, 11, 0, 1, 8, 1, 7, 8, 1, 5, 7, -1, -1, -1, -1, 11, 2, 1, 11, 1, 7, 7, 1, 5, -1, -1, -1, -1, -1, -1, -1, 9, 5, 8, 8, 5, 7, 10, 1, 3, 10, 3, 11, -1, -1, -1, -1, 5, 7, 0, 5, 0, 9, 7, 11, 0, 1, 0, 10, 11, 10, 0, -1, 11, 10, 0, 11, 0, 3, 10, 5, 0, 8, 0, 7, 5, 7, 0, -1, 11, 10, 5, 7, 11, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 6, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 8, 3, 5, 10, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, 0, 1, 5, 10, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 8, 3, 1, 9, 8, 5, 10, 6, -1, -1, -1, -1, -1, -1, -1, 1, 6, 5, 2, 6, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 6, 5, 1, 2, 6, 3, 0, 8, -1, -1, -1, -1, -1, -1, -1, 9, 6, 5, 9, 0, 6, 0, 2, 6, -1, -1, -1, -1, -1, -1, -1, 5, 9, 8, 5, 8, 2, 5, 2, 6, 3, 2, 8, -1, -1, -1, -1, 2, 3, 11, 10, 6, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 11, 0, 8, 11, 2, 0, 10, 6, 5, -1, -1, -1, -1, -1, -1, -1, 0, 1, 9, 2, 3, 11, 5, 10, 6, -1, -1, -1, -1, -1, -1, -1, 5, 10, 6, 1, 9, 2, 9, 11, 2, 9, 8, 11, -1, -1, -1, -1, 6, 3, 11, 6, 5, 3, 5, 1, 3, -1, -1, -1, -1, -1, -1, -1, 0, 8, 11, 0, 11, 5, 0, 5, 1, 5, 11, 6, -1, -1, -1, -1, 3, 11, 6, 0, 3, 6, 0, 6, 5, 0, 5, 9, -1, -1, -1, -1, 6, 5, 9, 6, 9, 11, 11, 9, 8, -1, -1, -1, -1, -1, -1, -1, 5, 10, 6, 4, 7, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 3, 0, 4, 7, 3, 6, 5, 10, -1, -1, -1, -1, -1, -1, -1, 1, 9, 0, 5, 10, 6, 8, 4, 7, -1, -1, -1, -1, -1, -1, -1, 10, 6, 5, 1, 9, 7, 1, 7, 3, 7, 9, 4, -1, -1, -1, -1, 6, 1, 2, 6, 5, 1, 4, 7, 8, -1, -1, -1, -1, -1, -1, -1, 1, 2, 5, 5, 2, 6, 3, 0, 4, 3, 4, 7, -1, -1, -1, -1, 8, 4, 7, 9, 0, 5, 0, 6, 5, 0, 2, 6, -1, -1, -1, -1, 7, 3, 9, 7, 9, 4, 3, 2, 9, 5, 9, 6, 2, 6, 9, -1, 3, 11, 2, 7, 8, 4, 10, 6, 5, -1, -1, -1, -1, -1, -1, -1, 5, 10, 6, 4, 7, 2, 4, 2, 0, 2, 7, 11, -1, -1, -1, -1, 0, 1, 9, 4, 7, 8, 2, 3, 11, 5, 10, 6, -1, -1, -1, -1, 9, 2, 1, 9, 11, 2, 9, 4, 11, 7, 11, 4, 5, 10, 6, -1, 8, 4, 7, 3, 11, 5, 3, 5, 1, 5, 11, 6, -1, -1, -1, -1, 5, 1, 11, 5, 11, 6, 1, 0, 11, 7, 11, 4, 0, 4, 11, -1, 0, 5, 9, 0, 6, 5, 0, 3, 6, 11, 6, 3, 8, 4, 7, -1, 6, 5, 9, 6, 9, 11, 4, 7, 9, 7, 11, 9, -1, -1, -1, -1, 10, 4, 9, 6, 4, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 10, 6, 4, 9, 10, 0, 8, 3, -1, -1, -1, -1, -1, -1, -1, 10, 0, 1, 10, 6, 0, 6, 4, 0, -1, -1, -1, -1, -1, -1, -1, 8, 3, 1, 8, 1, 6, 8, 6, 4, 6, 1, 10, -1, -1, -1, -1, 1, 4, 9, 1, 2, 4, 2, 6, 4, -1, -1, -1, -1, -1, -1, -1, 3, 0, 8, 1, 2, 9, 2, 4, 9, 2, 6, 4, -1, -1, -1, -1, 0, 2, 4, 4, 2, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, 3, 2, 8, 2, 4, 4, 2, 6, -1, -1, -1, -1, -1, -1, -1, 10, 4, 9, 10, 6, 4, 11, 2, 3, -1, -1, -1, -1, -1, -1, -1, 0, 8, 2, 2, 8, 11, 4, 9, 10, 4, 10, 6, -1, -1, -1, -1, 3, 11, 2, 0, 1, 6, 0, 6, 4, 6, 1, 10, -1, -1, -1, -1, 6, 4, 1, 6, 1, 10, 4, 8, 1, 2, 1, 11, 8, 11, 1, -1, 9, 6, 4, 9, 3, 6, 9, 1, 3, 11, 6, 3, -1, -1, -1, -1, 8, 11, 1, 8, 1, 0, 11, 6, 1, 9, 1, 4, 6, 4, 1, -1, 3, 11, 6, 3, 6, 0, 0, 6, 4, -1, -1, -1, -1, -1, -1, -1, 6, 4, 8, 11, 6, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 10, 6, 7, 8, 10, 8, 9, 10, -1, -1, -1, -1, -1, -1, -1, 0, 7, 3, 0, 10, 7, 0, 9, 10, 6, 7, 10, -1, -1, -1, -1, 10, 6, 7, 1, 10, 7, 1, 7, 8, 1, 8, 0, -1, -1, -1, -1, 10, 6, 7, 10, 7, 1, 1, 7, 3, -1, -1, -1, -1, -1, -1, -1, 1, 2, 6, 1, 6, 8, 1, 8, 9, 8, 6, 7, -1, -1, -1, -1, 2, 6, 9, 2, 9, 1, 6, 7, 9, 0, 9, 3, 7, 3, 9, -1, 7, 8, 0, 7, 0, 6, 6, 0, 2, -1, -1, -1, -1, -1, -1, -1, 7, 3, 2, 6, 7, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, 3, 11, 10, 6, 8, 10, 8, 9, 8, 6, 7, -1, -1, -1, -1, 2, 0, 7, 2, 7, 11, 0, 9, 7, 6, 7, 10, 9, 10, 7, -1, 1, 8, 0, 1, 7, 8, 1, 10, 7, 6, 7, 10, 2, 3, 11, -1, 11, 2, 1, 11, 1, 7, 10, 6, 1, 6, 7, 1, -1, -1, -1, -1, 8, 9, 6, 8, 6, 7, 9, 1, 6, 11, 6, 3, 1, 3, 6, -1, 0, 9, 1, 11, 6, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 8, 0, 7, 0, 6, 3, 11, 0, 11, 6, 0, -1, -1, -1, -1, 7, 11, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 6, 11, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 0, 8, 11, 7, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 1, 9, 11, 7, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, 1, 9, 8, 3, 1, 11, 7, 6, -1, -1, -1, -1, -1, -1, -1, 10, 1, 2, 6, 11, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 2, 10, 3, 0, 8, 6, 11, 7, -1, -1, -1, -1, -1, -1, -1, 2, 9, 0, 2, 10, 9, 6, 11, 7, -1, -1, -1, -1, -1, -1, -1, 6, 11, 7, 2, 10, 3, 10, 8, 3, 10, 9, 8, -1, -1, -1, -1, 7, 2, 3, 6, 2, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 0, 8, 7, 6, 0, 6, 2, 0, -1, -1, -1, -1, -1, -1, -1, 2, 7, 6, 2, 3, 7, 0, 1, 9, -1, -1, -1, -1, -1, -1, -1, 1, 6, 2, 1, 8, 6, 1, 9, 8, 8, 7, 6, -1, -1, -1, -1, 10, 7, 6, 10, 1, 7, 1, 3, 7, -1, -1, -1, -1, -1, -1, -1, 10, 7, 6, 1, 7, 10, 1, 8, 7, 1, 0, 8, -1, -1, -1, -1, 0, 3, 7, 0, 7, 10, 0, 10, 9, 6, 10, 7, -1, -1, -1, -1, 7, 6, 10, 7, 10, 8, 8, 10, 9, -1, -1, -1, -1, -1, -1, -1, 6, 8, 4, 11, 8, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 6, 11, 3, 0, 6, 0, 4, 6, -1, -1, -1, -1, -1, -1, -1, 8, 6, 11, 8, 4, 6, 9, 0, 1, -1, -1, -1, -1, -1, -1, -1, 9, 4, 6, 9, 6, 3, 9, 3, 1, 11, 3, 6, -1, -1, -1, -1, 6, 8, 4, 6, 11, 8, 2, 10, 1, -1, -1, -1, -1, -1, -1, -1, 1, 2, 10, 3, 0, 11, 0, 6, 11, 0, 4, 6, -1, -1, -1, -1, 4, 11, 8, 4, 6, 11, 0, 2, 9, 2, 10, 9, -1, -1, -1, -1, 10, 9, 3, 10, 3, 2, 9, 4, 3, 11, 3, 6, 4, 6, 3, -1, 8, 2, 3, 8, 4, 2, 4, 6, 2, -1, -1, -1, -1, -1, -1, -1, 0, 4, 2, 4, 6, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 9, 0, 2, 3, 4, 2, 4, 6, 4, 3, 8, -1, -1, -1, -1, 1, 9, 4, 1, 4, 2, 2, 4, 6, -1, -1, -1, -1, -1, -1, -1, 8, 1, 3, 8, 6, 1, 8, 4, 6, 6, 10, 1, -1, -1, -1, -1, 10, 1, 0, 10, 0, 6, 6, 0, 4, -1, -1, -1, -1, -1, -1, -1, 4, 6, 3, 4, 3, 8, 6, 10, 3, 0, 3, 9, 10, 9, 3, -1, 10, 9, 4, 6, 10, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 9, 5, 7, 6, 11, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 8, 3, 4, 9, 5, 11, 7, 6, -1, -1, -1, -1, -1, -1, -1, 5, 0, 1, 5, 4, 0, 7, 6, 11, -1, -1, -1, -1, -1, -1, -1, 11, 7, 6, 8, 3, 4, 3, 5, 4, 3, 1, 5, -1, -1, -1, -1, 9, 5, 4, 10, 1, 2, 7, 6, 11, -1, -1, -1, -1, -1, -1, -1, 6, 11, 7, 1, 2, 10, 0, 8, 3, 4, 9, 5, -1, -1, -1, -1, 7, 6, 11, 5, 4, 10, 4, 2, 10, 4, 0, 2, -1, -1, -1, -1, 3, 4, 8, 3, 5, 4, 3, 2, 5, 10, 5, 2, 11, 7, 6, -1, 7, 2, 3, 7, 6, 2, 5, 4, 9, -1, -1, -1, -1, -1, -1, -1, 9, 5, 4, 0, 8, 6, 0, 6, 2, 6, 8, 7, -1, -1, -1, -1, 3, 6, 2, 3, 7, 6, 1, 5, 0, 5, 4, 0, -1, -1, -1, -1, 6, 2, 8, 6, 8, 7, 2, 1, 8, 4, 8, 5, 1, 5, 8, -1, 9, 5, 4, 10, 1, 6, 1, 7, 6, 1, 3, 7, -1, -1, -1, -1, 1, 6, 10, 1, 7, 6, 1, 0, 7, 8, 7, 0, 9, 5, 4, -1, 4, 0, 10, 4, 10, 5, 0, 3, 10, 6, 10, 7, 3, 7, 10, -1, 7, 6, 10, 7, 10, 8, 5, 4, 10, 4, 8, 10, -1, -1, -1, -1, 6, 9, 5, 6, 11, 9, 11, 8, 9, -1, -1, -1, -1, -1, -1, -1, 3, 6, 11, 0, 6, 3, 0, 5, 6, 0, 9, 5, -1, -1, -1, -1, 0, 11, 8, 0, 5, 11, 0, 1, 5, 5, 6, 11, -1, -1, -1, -1, 6, 11, 3, 6, 3, 5, 5, 3, 1, -1, -1, -1, -1, -1, -1, -1, 1, 2, 10, 9, 5, 11, 9, 11, 8, 11, 5, 6, -1, -1, -1, -1, 0, 11, 3, 0, 6, 11, 0, 9, 6, 5, 6, 9, 1, 2, 10, -1, 11, 8, 5, 11, 5, 6, 8, 0, 5, 10, 5, 2, 0, 2, 5, -1, 6, 11, 3, 6, 3, 5, 2, 10, 3, 10, 5, 3, -1, -1, -1, -1, 5, 8, 9, 5, 2, 8, 5, 6, 2, 3, 8, 2, -1, -1, -1, -1, 9, 5, 6, 9, 6, 0, 0, 6, 2, -1, -1, -1, -1, -1, -1, -1, 1, 5, 8, 1, 8, 0, 5, 6, 8, 3, 8, 2, 6, 2, 8, -1, 1, 5, 6, 2, 1, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 3, 6, 1, 6, 10, 3, 8, 6, 5, 6, 9, 8, 9, 6, -1, 10, 1, 0, 10, 0, 6, 9, 5, 0, 5, 6, 0, -1, -1, -1, -1, 0, 3, 8, 5, 6, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 5, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 11, 5, 10, 7, 5, 11, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 11, 5, 10, 11, 7, 5, 8, 3, 0, -1, -1, -1, -1, -1, -1, -1, 5, 11, 7, 5, 10, 11, 1, 9, 0, -1, -1, -1, -1, -1, -1, -1, 10, 7, 5, 10, 11, 7, 9, 8, 1, 8, 3, 1, -1, -1, -1, -1, 11, 1, 2, 11, 7, 1, 7, 5, 1, -1, -1, -1, -1, -1, -1, -1, 0, 8, 3, 1, 2, 7, 1, 7, 5, 7, 2, 11, -1, -1, -1, -1, 9, 7, 5, 9, 2, 7, 9, 0, 2, 2, 11, 7, -1, -1, -1, -1, 7, 5, 2, 7, 2, 11, 5, 9, 2, 3, 2, 8, 9, 8, 2, -1, 2, 5, 10, 2, 3, 5, 3, 7, 5, -1, -1, -1, -1, -1, -1, -1, 8, 2, 0, 8, 5, 2, 8, 7, 5, 10, 2, 5, -1, -1, -1, -1, 9, 0, 1, 5, 10, 3, 5, 3, 7, 3, 10, 2, -1, -1, -1, -1, 9, 8, 2, 9, 2, 1, 8, 7, 2, 10, 2, 5, 7, 5, 2, -1, 1, 3, 5, 3, 7, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 8, 7, 0, 7, 1, 1, 7, 5, -1, -1, -1, -1, -1, -1, -1, 9, 0, 3, 9, 3, 5, 5, 3, 7, -1, -1, -1, -1, -1, -1, -1, 9, 8, 7, 5, 9, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, 8, 4, 5, 10, 8, 10, 11, 8, -1, -1, -1, -1, -1, -1, -1, 5, 0, 4, 5, 11, 0, 5, 10, 11, 11, 3, 0, -1, -1, -1, -1, 0, 1, 9, 8, 4, 10, 8, 10, 11, 10, 4, 5, -1, -1, -1, -1, 10, 11, 4, 10, 4, 5, 11, 3, 4, 9, 4, 1, 3, 1, 4, -1, 2, 5, 1, 2, 8, 5, 2, 11, 8, 4, 5, 8, -1, -1, -1, -1, 0, 4, 11, 0, 11, 3, 4, 5, 11, 2, 11, 1, 5, 1, 11, -1, 0, 2, 5, 0, 5, 9, 2, 11, 5, 4, 5, 8, 11, 8, 5, -1, 9, 4, 5, 2, 11, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, 5, 10, 3, 5, 2, 3, 4, 5, 3, 8, 4, -1, -1, -1, -1, 5, 10, 2, 5, 2, 4, 4, 2, 0, -1, -1, -1, -1, -1, -1, -1, 3, 10, 2, 3, 5, 10, 3, 8, 5, 4, 5, 8, 0, 1, 9, -1, 5, 10, 2, 5, 2, 4, 1, 9, 2, 9, 4, 2, -1, -1, -1, -1, 8, 4, 5, 8, 5, 3, 3, 5, 1, -1, -1, -1, -1, -1, -1, -1, 0, 4, 5, 1, 0, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, 4, 5, 8, 5, 3, 9, 0, 5, 0, 3, 5, -1, -1, -1, -1, 9, 4, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 11, 7, 4, 9, 11, 9, 10, 11, -1, -1, -1, -1, -1, -1, -1, 0, 8, 3, 4, 9, 7, 9, 11, 7, 9, 10, 11, -1, -1, -1, -1, 1, 10, 11, 1, 11, 4, 1, 4, 0, 7, 4, 11, -1, -1, -1, -1, 3, 1, 4, 3, 4, 8, 1, 10, 4, 7, 4, 11, 10, 11, 4, -1, 4, 11, 7, 9, 11, 4, 9, 2, 11, 9, 1, 2, -1, -1, -1, -1, 9, 7, 4, 9, 11, 7, 9, 1, 11, 2, 11, 1, 0, 8, 3, -1, 11, 7, 4, 11, 4, 2, 2, 4, 0, -1, -1, -1, -1, -1, -1, -1, 11, 7, 4, 11, 4, 2, 8, 3, 4, 3, 2, 4, -1, -1, -1, -1, 2, 9, 10, 2, 7, 9, 2, 3, 7, 7, 4, 9, -1, -1, -1, -1, 9, 10, 7, 9, 7, 4, 10, 2, 7, 8, 7, 0, 2, 0, 7, -1, 3, 7, 10, 3, 10, 2, 7, 4, 10, 1, 10, 0, 4, 0, 10, -1, 1, 10, 2, 8, 7, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 9, 1, 4, 1, 7, 7, 1, 3, -1, -1, -1, -1, -1, -1, -1, 4, 9, 1, 4, 1, 7, 0, 8, 1, 8, 7, 1, -1, -1, -1, -1, 4, 0, 3, 7, 4, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 8, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, 10, 8, 10, 11, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 0, 9, 3, 9, 11, 11, 9, 10, -1, -1, -1, -1, -1, -1, -1, 0, 1, 10, 0, 10, 8, 8, 10, 11, -1, -1, -1, -1, -1, -1, -1, 3, 1, 10, 11, 3, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 2, 11, 1, 11, 9, 9, 11, 8, -1, -1, -1, -1, -1, -1, -1, 3, 0, 9, 3, 9, 11, 1, 2, 9, 2, 11, 9, -1, -1, -1, -1, 0, 2, 11, 8, 0, 11, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 2, 11, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, 3, 8, 2, 8, 10, 10, 8, 9, -1, -1, -1, -1, -1, -1, -1, 9, 10, 2, 0, 9, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, 3, 8, 2, 8, 10, 0, 1, 8, 1, 10, 8, -1, -1, -1, -1, 1, 10, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 3, 8, 9, 1, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 9, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 3, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]);
