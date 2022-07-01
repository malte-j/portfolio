const fragment = `
  #ifdef GL_ES
    precision mediump float;
  #endif

  uniform vec4 resolution;
  uniform vec2 mouse;
  uniform vec2 threshold;
  uniform float time;
  uniform float pixelRatio;
  uniform sampler2D image0;
  uniform sampler2D image1;
  uniform vec2 u_resolution;

  // Some useful functions
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  vec2 mirrored(vec2 v) {
    vec2 m = mod(v,2.);
    return mix(m,2.0 - m, step(1.0 ,m));
  }

  //
// Description : GLSL 2D simplex noise function
//      Author : Ian McEwan, Ashima Arts
//  Maintainer : ijm
//     Lastmod : 20110822 (ijm)
//     License :
//  Copyright (C) 2011 Ashima Arts. All rights reserved.
//  Distributed under the MIT License. See LICENSE file.
//  https://github.com/ashima/webgl-noise
//
  float snoise(vec2 v) {

    // Precompute values for skewed triangular grid
    const vec4 C = vec4(0.211324865405187,
                        // (3.0-sqrt(3.0))/6.0
                        0.366025403784439,
                        // 0.5*(sqrt(3.0)-1.0)
                        -0.577350269189626,
                        // -1.0 + 2.0 * C.x
                        0.024390243902439);
                        // 1.0 / 41.0

    // First corner (x0)
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);

    // Other two corners (x1, x2)
    vec2 i1 = vec2(0.0);
    i1 = (x0.x > x0.y)? vec2(1.0, 0.0):vec2(0.0, 1.0);
    vec2 x1 = x0.xy + C.xx - i1;
    vec2 x2 = x0.xy + C.zz;

    // Do some permutations to avoid
    // truncation effects in permutation
    i = mod289(i);
    vec3 p = permute(
            permute( i.y + vec3(0.0, i1.y, 1.0))
                + i.x + vec3(0.0, i1.x, 1.0 ));

    vec3 m = max(0.5 - vec3(
                        dot(x0,x0),
                        dot(x1,x1),
                        dot(x2,x2)
                        ), 0.0);

    m = m*m ;
    m = m*m ;

    // Gradients:
    //  41 pts uniformly over a line, mapped onto a diamond
    //  The ring size 17*17 = 289 is close to a multiple
    //      of 41 (41*7 = 287)

    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;

    // Normalise gradients implicitly by scaling m
    // Approximation of: m *= inversesqrt(a0*a0 + h*h);
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0+h*h);

    // Compute final noise value at P
    vec3 g = vec3(0.0);
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * vec2(x1.x,x2.x) + h.yz * vec2(x1.y,x2.y);
    return 130.0 * dot(m, g);
  }

  float random2d(vec2 coord) {
    return fract(sin(dot(coord.xy ,vec2(12.9898,78.233))) * 43758.5453);
  }
  

  void main() {
    // uvs and textures
    vec2 uv = pixelRatio*gl_FragCoord.xy / resolution.xy ;
    vec2 vUv = (uv - vec2(0.5))*resolution.zw + vec2(0.5);
    vUv.y = 1. - vUv.y;
    vec4 tex1 = texture2D(image1,mirrored(vUv));
    vec2 fake3d = vec2(vUv.x + (tex1.r - 0.5)*mouse.x/threshold.x, vUv.y + (tex1.r - 0.5)*mouse.y/threshold.y);

  
    // float noise = snoise( mirrored(fake3d) *  resolution.y  * pixelRatio) *.15 + 1.0;
    float noise = snoise( mirrored(fake3d) *  resolution.y ) *.15 + 1.0;
    vec4 finImage =  texture2D(image0 ,mirrored(fake3d));
    
    finImage.r = finImage.r * noise;
    finImage.g = finImage.g * noise;
    finImage.b = finImage.b * noise;

    gl_FragColor = finImage;


  }
`;

const vertex = `
  attribute vec2 a_position;

  void main() {
    gl_Position = vec4( a_position, 0, 1 );
  }
`;

export default class Sketch {
  #stopped = false;

  /**
   * @type HtmlDivElement
   */
  container;

  /**
   *  @type: HTMLCanvasElement
   */
  canvas;

  constructor(wrapperElement) {
    this.container = wrapperElement;
    this.canvas = document.createElement("canvas");
    this.container.appendChild(this.canvas);
    this.gl = this.canvas.getContext("webgl");
    this.ratio = window.devicePixelRatio;
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;
    this.mouseX = 0;
    this.mouseY = 0;

    this.mouseTargetX = 0;
    this.mouseTargetY = 0;

    this.imageOriginal = this.container.getAttribute("data-image-original");
    this.imageDepth = this.container.getAttribute("data-image-depth");
    this.vth = this.container.getAttribute("data-vertical-threshold");
    this.hth = this.container.getAttribute("data-horizontal-threshold");

    this.imageURLs = [this.imageOriginal, this.imageDepth];
    this.textures = [];

    this.startTime = new Date().getTime(); // Get start time for animating

    this.createScene();
    this.addTexture();
    this.mouseMove();
  }

  addShader(source, type) {
    let shader = this.gl.createShader(type);
    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);
    let isCompiled = this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS);
    if (!isCompiled) {
      throw new Error(
        "Shader compile error: " + this.gl.getShaderInfoLog(shader)
      );
    }
    this.gl.attachShader(this.program, shader);
  }

  resizeHandler() {
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;

    this.canvas.width = this.width * this.ratio;
    this.canvas.height = this.height * this.ratio;
    this.canvas.style.width = this.width + "px";
    this.canvas.style.height = this.height + "px";
    let a1, a2;
    if (this.height / this.width < this.imageAspect) {
      a1 = 1;
      a2 = this.height / this.width / this.imageAspect;
    } else {
      a1 = (this.width / this.height) * this.imageAspect;
      a2 = 1;
    }
    this.uResolution.set(this.width, this.height, a1, a2);
    this.uRatio.set(1 / this.ratio);
    this.uThreshold.set(this.hth, this.vth);
    this.gl.viewport(0, 0, this.width * this.ratio, this.height * this.ratio);
  }

  // @TODO: Throttle
  resize() {
    this.resizeHandler();
    window.addEventListener("resize", this.resizeHandler.bind(this));
  }

  createScene() {
    this.program = this.gl.createProgram();

    this.addShader(vertex, this.gl.VERTEX_SHADER);
    this.addShader(fragment, this.gl.FRAGMENT_SHADER);

    this.gl.linkProgram(this.program);
    this.gl.useProgram(this.program);

    this.uResolution = new Uniform("resolution", "4f", this.program, this.gl);
    this.uMouse = new Uniform("mouse", "2f", this.program, this.gl);
    this.uTime = new Uniform("time", "1f", this.program, this.gl);
    this.uRatio = new Uniform("pixelRatio", "1f", this.program, this.gl);
    this.uThreshold = new Uniform("threshold", "2f", this.program, this.gl);
    // create position attrib
    this.billboard = new Rect(this.gl);
    this.positionLocation = this.gl.getAttribLocation(
      this.program,
      "a_position"
    );
    this.gl.enableVertexAttribArray(this.positionLocation);
    this.gl.vertexAttribPointer(
      this.positionLocation,
      2,
      this.gl.FLOAT,
      false,
      0,
      0
    );
  }

  addTexture() {
    let that = this;
    let gl = that.gl;
    loadImages(this.imageURLs, that.start.bind(this));
  }

  start(images) {
    let that = this;
    let gl = that.gl;

    this.imageAspect = images[0].naturalHeight / images[0].naturalWidth;
    for (var i = 0; i < images.length; i++) {
      let texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);

      // Set the parameters so we can render any size image.
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

      // Upload the image into the texture.
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        images[i]
      );
      this.textures.push(texture);
    }

    // lookup the sampler locations.
    let u_image0Location = this.gl.getUniformLocation(this.program, "image0");
    let u_image1Location = this.gl.getUniformLocation(this.program, "image1");

    // set which texture units to render with.
    this.gl.uniform1i(u_image0Location, 0); // texture unit 0
    this.gl.uniform1i(u_image1Location, 1); // texture unit 1

    this.gl.activeTexture(this.gl.TEXTURE0);
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.textures[0]);
    this.gl.activeTexture(this.gl.TEXTURE1);
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.textures[1]);

    // start application
    this.resize();
    this.render();
  }

  // gyro() {
  //   let that = this;
  //   this.maxTilt = 15;

  //   const rotationCoef = 0.15;

  //   gn.init({ gravityNormalized: true }).then(function() {
  //     gn.start(function(data) {

  //       let y = data.do.gamma;
  //       let x = data.do.beta;

  //       that.mouseTargetY = clamp(x,-that.maxTilt, that.maxTilt)/that.maxTilt;
  //       that.mouseTargetX = -clamp(y,-that.maxTilt, that.maxTilt)/that.maxTilt;

  //     });
  //   }).catch(function(e) {
  //     console.log('not supported');

  //   });

  // }

  mouseMove() {
    let that = this;
    document.addEventListener("mousemove", function (e) {
      let halfX = that.windowWidth / 2;
      let halfY = that.windowHeight / 2;

      that.mouseTargetX = (halfX - e.clientX) / halfX;
      that.mouseTargetY = (halfY - e.clientY) / halfY;
    });
  }

  destory() {
    window.removeEventListener("resize", this.resizeHandler.bind(this));
    this.#stopped = false;
    this.container.innerHTML = "";
  }

  render() {
    let now = new Date().getTime();
    let currentTime = (now - this.startTime) / 1000;
    this.uTime.set(currentTime);
    // inertia
    // this.mouseX += (this.mouseTargetX - this.mouseX)*0.05;
    // this.mouseY += (this.mouseTargetY - this.mouseY)*0.05;

    this.mouseX = this.mouseTargetX;
    this.mouseY = this.mouseTargetY;

    this.uMouse.set(this.mouseX, this.mouseY);

    // render
    this.billboard.render(this.gl);
    if (!this.#stopped) requestAnimationFrame(this.render.bind(this));
  }
}

// --- HELPERS ---

function loadImage(url, callback) {
  var image = new Image();
  image.src = url;
  image.onload = callback;
  return image;
}

function loadImages(urls, callback) {
  var images = [];
  var imagesToLoad = urls.length;

  // Called each time an image finished loading.
  var onImageLoad = function () {
    --imagesToLoad;
    // If all the images are loaded call the callback.
    if (imagesToLoad === 0) {
      callback(images);
    }
  };

  for (var ii = 0; ii < imagesToLoad; ++ii) {
    var image = loadImage(urls[ii], onImageLoad);
    images.push(image);
  }
}

function Uniform(name, suffix, program, gl) {
  this.name = name;
  this.suffix = suffix;
  this.gl = gl;
  this.program = program;
  this.location = gl.getUniformLocation(program, name);
}

Uniform.prototype.set = function (...values) {
  let method = "uniform" + this.suffix;
  let args = [this.location].concat(values);
  this.gl[method].apply(this.gl, args);
};

function Rect(gl) {
  var buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, Rect.verts, gl.STATIC_DRAW);
}

Rect.verts = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);

Rect.prototype.render = function (gl) {
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
};

function clamp(number, lower, upper) {
  if (number === number) {
    if (upper !== undefined) {
      number = number <= upper ? number : upper;
    }
    if (lower !== undefined) {
      number = number >= lower ? number : lower;
    }
  }
  return number;
}
