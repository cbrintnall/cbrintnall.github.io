import * as THREE from "https://unpkg.com/three@0.160.0/build/three.module.js";

// Shader source originally yoinked from: https://www.shadertoy.com/view/dsXyzf
const data = await fetch("/js/shader.glsl")
const shader = await data.text()

const canvas = document.getElementById("c");
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
renderer.setPixelRatio(window.devicePixelRatio);

const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
const geometry = new THREE.PlaneGeometry(2, 2);

const material = new THREE.ShaderMaterial({
  uniforms: {
    iTime: { value: 0 },
    iResolution: { value: new THREE.Vector3() },
  },
  fragmentShader: shader,
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
function resize() {
  const w = window.innerWidth;
  const h = window.innerHeight;

  renderer.setSize(w, h, false);
  material.uniforms.iResolution.value.set(
    renderer.domElement.width,
    renderer.domElement.height,
    1
  );
}

window.addEventListener("resize", resize);
resize();
const start = performance.now();

function animate() {
  material.uniforms.iTime.value = (performance.now() - start) / 1000;

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();