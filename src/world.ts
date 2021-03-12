var scene: THREE.Object3D, camera: THREE.Camera, renderer: THREE.WebGLRenderer;
var width = window.innerWidth;
var height = window.innerHeight;
var ratio = width / height;

const init = () => {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(45,ratio,1,100);
  camera.position.z = 100;

  renderer = new THREE.WebGLRenderer( {antialias: true});

  renderer.setClearColor( '#e5e5e5');
  renderer.setSize(width,height);

  document.getElementById('webgl').append(renderer.domElement);

  const sphere = getSphere(50,32,16, 0xffcc00);
  const pointLight = getPointLight(0xffffff,1,1000);

  scene.add(sphere);
  scene.add(pointLight);

  pointLight.position.set(200,0,25);

  window.addEventListener('resize', () => {
    var width = window.innerWidth;
    var height = window.innerHeight;
    var ratio = width / height; 
    camera = new THREE.PerspectiveCamera(45,ratio,1,100);
    
    camera.position.z = 100;
    renderer.setSize(width, height);
  });

  const animate = () => {
    sphere.position.y += 0.01;
  }

  const render = () => {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    animate();
  };
  render();
}

function getSphere(radius: number, width: number, height: number, color: number) {
  let geometry = new THREE.SphereGeometry(radius, width, height);
  let material = new THREE.MeshLambertMaterial( {color} );
  return new THREE.Mesh(geometry, material);
}

const getPointLight = (color: number, intensity: number, distance: number) => {
  let light = new THREE.PointLight(color, intensity, distance)
  return light;
}

init();
