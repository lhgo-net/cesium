const WeatherConfig = {
  rain: {
    webgl1: {
      name: "rain_webgl1",
      fragmentShader: `
                uniform sampler2D colorTexture;//输入的场景渲染照片
                varying vec2 v_textureCoordinates;
                uniform float vrain;
      
                float hash(float x){
                    return fract(sin(x*133.3)*13.13);
                }
      
                void main(void){
                    float time = czm_frameNumber / vrain;
                    vec2 resolution = czm_viewport.zw;
      
                    vec2 uv=(gl_FragCoord.xy*2.-resolution.xy)/min(resolution.x,resolution.y);
                    vec3 c=vec3(.6,.7,.8);
                    float a=0.4;
                    float si=sin(a),co=cos(a);
                    uv*=mat2(co,-si,si,co);
                    uv*=length(uv+vec2(0,4.9))*.3+1.;
      
                    float v=1.-sin(hash(floor(uv.x*100.))*2.);
                    float b=clamp(abs(sin(20.*time*v+uv.y*(5./(2.+v))))-.95,0.,1.)*20.;
      
                    c*=v*b; //屏幕上雨的颜色
                    gl_FragColor = mix(texture2D(colorTexture, v_textureCoordinates), vec4(c,1), 0.5); //将雨和三维场景融合
                }
      `,
      uniforms: {
        vrain: function () {
          return 30; // 时间
        },
      },
    },
    webgl2: {
      name: "rain_webgl2",
      fragmentShader: `
      uniform sampler2D colorTexture;
			 in vec2 v_textureCoordinates;
       uniform float tiltAngle;
       uniform float rainSize;
       uniform float rainWidth;
       uniform float rainSpeed;
			 float hash(float x){
					return fract(sin(x*233.3)*13.13);
			 }
       out vec4 vFragColor;
			void main(void){
				float time = czm_frameNumber / rainSpeed;
			  vec2 resolution = czm_viewport.zw;
			  vec2 uv=(gl_FragCoord.xy*2.-resolution.xy)/min(resolution.x,resolution.y);
			  vec3 c=vec3(1.0,1.0,1.0);
			  float a= tiltAngle;
			  float si=sin(a),co=cos(a);
			  uv*=mat2(co,-si,si,co);
			  uv*=length(uv+vec2(0,4.9))*rainSize + 1.;
			  float v = 1.0 - abs(sin(hash(floor(uv.x * rainWidth)) * 2.0));
			  float b=clamp(abs(sin(20.*time*v+uv.y*(5./(2.+v))))-.95,0.,1.)*20.;
			  c*=v*b;
        vFragColor = mix(texture(colorTexture, v_textureCoordinates), vec4(c,.3), .3);
			}
      `,
      uniforms: {
        tiltAngle: () => {
          return -0.6;
        },
        rainSize: () => {
          return 0.3;
        },
        rainSpeed: () => {
          return 60.0;
        },
      },
      // name: 'rain_webgl2',
      // fragmentShader: `
      //               uniform sampler2D colorTexture; // 输入的场景渲染照片
      //               in vec2 v_textureCoordinates;
      //               uniform float vrain;

      //               float hash(float x){
      //                   return fract(sin(x*133.3)*13.13);
      //               }
      //               out vec4 vFragColor;
      //               void main(void){
      //                   float time = czm_frameNumber / vrain;
      //                   vec2 resolution = czm_viewport.zw;

      //                   vec2 uv=(gl_FragCoord.xy*2.-resolution.xy)/min(resolution.x,resolution.y);
      //                   vec3 c=vec3(.6,.7,.8);
      //                   float a=0.4;
      //                   float si=sin(a),co=cos(a);
      //                   uv*=mat2(co,-si,si,co);
      //                   uv*=length(uv+vec2(0,4.9))*.3+1.;

      //                   float v=1.-sin(hash(floor(uv.x*100.))*2.);
      //                   float b=clamp(abs(sin(20.*time*v+uv.y*(5./(2.+v))))-.95,0.,1.)*20.;

      //                   c*=v*b; //屏幕上雨的颜色
      //                   vFragColor = mix(texture(colorTexture, v_textureCoordinates), vec4(c,1), 0.5); //将雨和三维场景融合
      //               }
      //     `,
      // uniforms: {
      //   vrain: function () {
      //     return 30 // 时间
      //   }
      // },
    },
  },
  snow: {
    webgl1: {
      name: "snow_webgl1",
      //   fragmentShader: `
      //     uniform sampler2D colorTexture;
      //     varying vec2 v_textureCoordinates;
      //     uniform float vsnow;

      //     float snow(vec2 uv,float scale)
      //     {   float time = czm_frameNumber / vsnow;
      //         float w=smoothstep(1.,0.,-uv.y*(scale/10.));if(w<.1)return 0.;
      //         uv+=time/scale;uv.y+=time*2./scale;uv.x+=sin(uv.y+time*.5)/scale;
      //         uv*=scale;vec2 s=floor(uv),f=fract(uv),p;float k=3.,d;
      //         p=.5+.35*sin(11.*fract(sin((s+p+scale)*mat2(7,3,6,5))*5.))-f;d=length(p);k=min(d,k);
      //         k=smoothstep(0.,k,sin(f.x+f.y)*0.01);
      //         return k*w;
      //     }
      //     void main(void){
      //         vec2 resolution = czm_viewport.zw;
      //         vec2 uv=(gl_FragCoord.xy*2.-resolution.xy)/min(resolution.x,resolution.y);
      //         vec3 finalColor=vec3(0);
      //         float c = 0.0;
      //         c+=snow(uv,30.)*.0;
      //         c+=snow(uv,20.)*.0;
      //         c+=snow(uv,15.)*.0;
      //         c+=snow(uv,10.);
      //         c+=snow(uv,8.);
      //         c+=snow(uv,6.);
      //         c+=snow(uv,5.);
      //         finalColor=(vec3(c));
      //         gl_FragColor = mix(texture2D(colorTexture, v_textureCoordinates), vec4(finalColor,1), 0.5);
      //     }
      // `,
      fragmentShader:
        "uniform sampler2D colorTexture;\n\
          varying vec2 v_textureCoordinates;\n\
          \n\
          float snow(vec2 uv,float scale){\n\
              float time = czm_frameNumber / 60.0;\n\
              float w=smoothstep(1.,0.,-uv.y*(scale/10.));\n\
              if(w<.1)return 0.;\n\
              uv+=time/scale;\n\
              uv.y+=time*2./scale;\n\
              uv.x+=sin(uv.y+time*.5)/scale;\n\
              uv*=scale;\n\
              vec2 s=floor(uv),f=fract(uv),p;\n\
              float k=3.,d;\n\
              p=.5+.35*sin(11.*fract(sin((s+p+scale)*mat2(7,3,6,5))*5.))-f;\n\
              d=length(p);\n\
              k=min(d,k);\n\
              k=smoothstep(0.,k,sin(f.x+f.y)*0.01);\n\
              return k*w;\n\
          }\n\
          \n\
          void main(){\n\
              vec2 resolution = czm_viewport.zw;\n\
              vec2 uv=(gl_FragCoord.xy*2.-resolution.xy)/min(resolution.x,resolution.y);\n\
              vec3 finalColor=vec3(0);\n\
              float c = 0.0;\n\
              c+=snow(uv,30.)*.0;\n\
              c+=snow(uv,20.)*.0;\n\
              c+=snow(uv,15.)*.0;\n\
              c+=snow(uv,10.);\n\
              c+=snow(uv,8.);\n\
              c+=snow(uv,6.);\n\
              c+=snow(uv,5.);\n\
              finalColor=(vec3(c));\n\
              gl_FragColor = mix(texture2D(colorTexture, v_textureCoordinates), vec4(finalColor,1), 0.3);\n\
              \n\
          }\n\
          ",
      uniforms: {
        vsnow: function () {
          return 60; // 时间
        },
      },
    },
    webgl2: {
      // name: 'snow_webgl2',
      // fragmentShader:
      //   'uniform sampler2D colorTexture;\n\
      //     in vec2 v_textureCoordinates;\n\
      //     \n\
      //     float snow(vec2 uv,float scale){\n\
      //         float time = czm_frameNumber / 60.0;\n\
      //         float w=smoothstep(1.,0.,-uv.y*(scale/10.));\n\
      //         if(w<.1)return 0.;\n\
      //         uv+=time/scale;\n\
      //         uv.y+=time*2./scale;\n\
      //         uv.x+=sin(uv.y+time*.5)/scale;\n\
      //         uv*=scale;\n\
      //         vec2 s=floor(uv),f=fract(uv),p;\n\
      //         float k=3.,d;\n\
      //         p=.5+.35*sin(11.*fract(sin((s+p+scale)*mat2(7,3,6,5))*5.))-f;\n\
      //         d=length(p);\n\
      //         k=min(d,k);\n\
      //         k=smoothstep(0.,k,sin(f.x+f.y)*0.01);\n\
      //         return k*w;\n\
      //     }\n\
      //     \n\
      //     out vec4 vFragColor;\n\
      //     void main(){\n\
      //         vec2 resolution = czm_viewport.zw;\n\
      //         vec2 uv=(gl_FragCoord.xy*2.-resolution.xy)/min(resolution.x,resolution.y);\n\
      //         vec3 finalColor=vec3(0);\n\
      //         float c = 0.0;\n\
      //         c+=snow(uv,30.)*.0;\n\
      //         c+=snow(uv,20.)*.0;\n\
      //         c+=snow(uv,15.)*.0;\n\
      //         c+=snow(uv,10.);\n\
      //         c+=snow(uv,8.);\n\
      //         c+=snow(uv,6.);\n\
      //         c+=snow(uv,5.);\n\
      //         finalColor=(vec3(c));\n\
      //         vFragColor = mix(texture(colorTexture, v_textureCoordinates), vec4(finalColor,1), 0.3);\n\
      //         \n\
      //     }\n\
      //     ',
      // uniforms: {
      //   vsnow: function () {
      //     return 60 // 时间
      //   }
      // },
      name: "snow_webgl2",
      fragmentShader:
        "uniform sampler2D colorTexture;\n\
      in vec2 v_textureCoordinates;\n\
      uniform float snowSpeed;\n\
              uniform float snowSize;\n\
      float snow(vec2 uv,float scale)\n\
      {\n\
          float time=czm_frameNumber/snowSpeed;\n\
          float w=smoothstep(1.,0.,-uv.y*(scale/10.));if(w<.1)return 0.;\n\
          uv+=time/scale;uv.y+=time*2./scale;uv.x+=sin(uv.y+time*.5)/scale;\n\
          uv*=scale;vec2 s=floor(uv),f=fract(uv),p;float k=3.,d;\n\
          p=.5+.35*sin(11.*fract(sin((s+p+scale)*mat2(7,3,6,5))*5.))-f;d=length(p);k=min(d,k);\n\
          k=smoothstep(0.,k,sin(f.x+f.y)*snowSize);\n\
          return k*w;\n\
      }\n\
      out vec4 fragColor;\n\
      void main(void){\n\
          vec2 resolution=czm_viewport.zw;\n\
          vec2 uv=(gl_FragCoord.xy*2.-resolution.xy)/min(resolution.x,resolution.y);\n\
          vec3 finalColor=vec3(0);\n\
          //float c=smoothstep(1.,0.3,clamp(uv.y*.3+.8,0.,.75));\n\
          float c=0.;\n\
          c+=snow(uv,30.)*.0;\n\
          c+=snow(uv,20.)*.0;\n\
          c+=snow(uv,15.)*.0;\n\
          c+=snow(uv,10.);\n\
          c+=snow(uv,8.);\n\
          c+=snow(uv,6.);\n\
          c+=snow(uv,5.);\n\
          finalColor=(vec3(c));\n\
          fragColor=mix(texture(colorTexture,v_textureCoordinates),vec4(finalColor,1),.5);\n\
          }\n\
          ",
      uniforms: {
        // ❄️大小，最好小于0.02
        snowSize: () => {
          return 0.02;
        },
        // 速度
        snowSpeed: () => {
          return 60.0;
        },
      },
    },
  },
  /**
   * 默认 viewer.scene.fog.enabled=true
   */
  foggy: {
    webgl1: {
      name: "foggy_webgl1",
      fragmentShader: `
            uniform sampler2D colorTexture;
            uniform sampler2D depthTexture;
            varying vec2 v_textureCoordinates;
            uniform float vfog;
            
            void main(void)
            {
                vec4 origcolor=texture2D(colorTexture, v_textureCoordinates);
                vec4 fogcolor=vec4(0.8,0.8,0.8,0.5);
                float depth = czm_readDepth(depthTexture, v_textureCoordinates);
                vec4 depthcolor=texture2D(depthTexture, v_textureCoordinates);
                float f=(depthcolor.r-0.22)/vfog;
                if(f<0.0) f=0.0;
                else if(f>1.0) f=1.0;
                gl_FragColor = mix(origcolor,fogcolor,f);
            }
            `,
      uniforms: {
        vfog: function () {
          return 0.5; // 强度
        },
      },
    },
    webgl2: {
      name: "foggy_webgl2",
      fragmentShader:
        "uniform sampler2D colorTexture;\n\
      uniform sampler2D depthTexture;\n\
      uniform float visibility;\n\
      uniform vec4 fogColor;\n\
      in vec2 v_textureCoordinates; \n\
      out vec4 fragColor;\n\
      void main(void) \n\
      { \n\
         vec4 origcolor = texture(colorTexture, v_textureCoordinates); \n\
         float depth = czm_readDepth(depthTexture, v_textureCoordinates); \n\
         vec4 depthcolor = texture(depthTexture, v_textureCoordinates); \n\
         float f = visibility * (depthcolor.r - 0.3) / 0.2; \n\
         if (f < 0.0) f = 0.0; \n\
         else if (f > 1.0) f = 1.0; \n\
         fragColor = mix(origcolor, fogColor, f); \n\
      }\n",
      uniforms: {
        visibility: () => {
          return 0.1;
        },
        fogColor: () => {
          return new Cesium.Color(0.8, 0.8, 0.8, 0.5);
        },
      },
      // name: 'foggy_webgl2',
      // fragmentShader: `
      //       uniform sampler2D colorTexture;
      //       uniform sampler2D depthTexture;
      //       in vec2 v_textureCoordinates;
      //       uniform float vfog;

      //       void main(void)
      //       {
      //           vec4 origcolor=texture(colorTexture, v_textureCoordinates);
      //           vec4 fogcolor=vec4(0.8,0.8,0.8,0.5);
      //           float depth = czm_readDepth(depthTexture, v_textureCoordinates);
      //           vec4 depthcolor=texture(depthTexture, v_textureCoordinates);
      //           float f=(depthcolor.r-0.22)/vfog;
      //           if(f<0.0) f=0.0;
      //           else if(f>1.0) f=1.0;
      //           out_FragColor = mix(origcolor,fogcolor,f);
      //       }
      //       `,
      // uniforms: {
      //   vfog: function () {
      //     return 0.5 // 强度
      //   }
      // },
    },
  },
};

class BasePostProcessStage {
  constructor(viewer) {
    this.viewer = viewer;
  }

  init() {
    console.log(this);
    // this.postProcessStage.enabled = false;
    this.enabled = false;

    this.viewer.scene.postProcessStages.add(this.postProcessStage);

    this.state = "init";
  }

  set enabled(newvVal) {
    this.postProcessStage.enabled = newvVal;
  }

  get enabled() {
    return this.postProcessStage.enabled;
  }

  clear() {
    this.viewer.scene.postProcessStages.remove(this.postProcessStage);
    this.postProcessStage = undefined;

    this.state = "clear";
  }
}

class Rain extends BasePostProcessStage {
  constructor(viewer) {
    super(viewer);
    this.postProcessStage = new Cesium.PostProcessStage(
      WeatherConfig.rain.webgl2
    );
    this.name = "rain";
    this.init();
  }
}
class Weather {
  constructor(viewer) {
    this.v = viewer;
  }
}

class Snow extends Weather {
  constructor(viewer) {
    super(viewer);
    this.v = viewer;
  }
  start() {
    const snowParticleSize = 12.0;
    const snowRadius = 100000.0;
    const minimumSnowImageSize = new Cesium.Cartesian2(
      snowParticleSize,
      snowParticleSize
    );
    const maximumSnowImageSize = new Cesium.Cartesian2(
      snowParticleSize * 2.0,
      snowParticleSize * 2.0
    );
    let snowGravityScratch = new Cesium.Cartesian3();
    const scene = this.v.scene;
    scene.primitives.removeAll();
    scene.primitives.add(
      new Cesium.ParticleSystem({
        modelMatrix: new Cesium.Matrix4.fromTranslation(scene.camera.position),
        minimumSpeed: -1.0,
        maximumSpeed: 0.0,
        lifetime: 15.0,
        emitter: new Cesium.SphereEmitter(snowRadius),
        startScale: 0.5,
        endScale: 1.0,
        image: "/snowflake_particle.png",
        emissionRate: 7000.0,
        startColor: Cesium.Color.WHITE.withAlpha(0.0),
        endColor: Cesium.Color.WHITE.withAlpha(1.0),
        minimumImageSize: minimumSnowImageSize,
        maximumImageSize: maximumSnowImageSize,
        updateCallback: function snowUpdate(particle, dt) {
          snowGravityScratch = Cesium.Cartesian3.normalize(
            particle.position,
            snowGravityScratch
          );
          Cesium.Cartesian3.multiplyByScalar(
            snowGravityScratch,
            Cesium.Math.randomBetween(-30.0, -300.0),
            snowGravityScratch
          );
          particle.velocity = Cesium.Cartesian3.add(
            particle.velocity,
            snowGravityScratch,
            particle.velocity
          );
          const distance = Cesium.Cartesian3.distance(
            scene.camera.position,
            particle.position
          );
          if (distance > snowRadius) {
            particle.endColor.alpha = 0.0;
          } else {
            particle.endColor.alpha = 1.0 / (distance / snowRadius + 0.1);
          }
        },
      })
    );

    scene.skyAtmosphere.hueShift = -0.8;
    scene.skyAtmosphere.saturationShift = -0.7;
    scene.skyAtmosphere.brightnessShift = -0.33;
    scene.fog.density = 0.001;
    scene.fog.minimumBrightness = 0.8;
  }
}

// class Rain {
//   constructor(viewer) {
//     this.v = viewer;
//   }
//   start() {
//     const scene = this.v.scene;
//     const rainParticleSize = 15.0;
//     const rainRadius = 100000.0;
//     const rainImageSize = new Cesium.Cartesian2(
//       rainParticleSize,
//       rainParticleSize * 2.0
//     );
//     const minimumSnowImageSize = new Cesium.Cartesian2(
//       rainParticleSize,
//       rainParticleSize
//     );
//     const maximumSnowImageSize = new Cesium.Cartesian2(
//       rainParticleSize * 2.0,
//       rainParticleSize * 2.0
//     );
//     let rainGravityScratch = new Cesium.Cartesian3();
//     scene.primitives.removeAll();
//     scene.primitives.add(
//       new Cesium.ParticleSystem({
//         modelMatrix: new Cesium.Matrix4.fromTranslation(scene.camera.position),
//         minimumSpeed: -1.0,
//         maximumSpeed: 0.0,
//         lifetime: 15.0,
//         emitter: new Cesium.SphereEmitter(rainRadius),
//         startScale: 0.5,
//         endScale: 1.0,
//         image: "/rain-removebg-preview.png",
//         emissionRate: 7000.0,
//         startColor: Cesium.Color.WHITE.withAlpha(0.0),
//         endColor: Cesium.Color.WHITE.withAlpha(1.0),
//         minimumImageSize: minimumSnowImageSize,
//         maximumImageSize: maximumSnowImageSize,
//         updateCallback: function (particle, dt) {
//           rainGravityScratch = Cesium.Cartesian3.normalize(
//             particle.position,
//             rainGravityScratch
//           );
//           rainGravityScratch = Cesium.Cartesian3.multiplyByScalar(
//             rainGravityScratch,
//             -1050.0,
//             rainGravityScratch
//           );

//           particle.position = Cesium.Cartesian3.add(
//             particle.position,
//             rainGravityScratch,
//             particle.position
//           );

//           const distance = Cesium.Cartesian3.distance(
//             scene.camera.position,
//             particle.position
//           );
//           if (distance > rainRadius) {
//             particle.endColor.alpha = 0.0;
//           } else {
//             particle.endColor.alpha =
//               Cesium.Color.BLUE.alpha / (distance / rainRadius + 0.1);
//           }
//         },
//       })
//     );

//     scene.skyAtmosphere.hueShift = -0.8;
//     scene.skyAtmosphere.saturationShift = -0.7;
//     scene.skyAtmosphere.brightnessShift = -0.33;
//     scene.fog.density = 0.001;
//     scene.fog.minimumBrightness = 0.8;
//   }
// }

export { Snow, Rain };
