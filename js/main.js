var render,scene,camera;
var cube,geom,material;
var texture;
window.onload=function(){
	scene=new THREE.Scene();
	camera=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
	camera.position.x=0;
	camera.position.y=1;
	camera.position.z=5;
	render=new THREE.WebGLRenderer();
	render.setClearColor(0x000000);
	render.setSize(window.innerWidth,window.innerHeight);
	document.body.appendChild(render.domElement);

	addCube();
	scene.add(new THREE.AmbientLight(0x303030));
	
	renderer();

}

function renderer(){
	requestAnimationFrame(renderer);

	cube.rotation.x+=0.01;
	render.render(scene,camera);
}

function addCube(){
	
	geom=new THREE.PlaneGeometry(3,3,4,4);
	texture=new THREE.TextureLoader().load("/assets/water.jpg");
	texture.repeat.set(4,4);
	material=new THREE.MeshPhongMaterial({wireframe:false,side:THREE.DoubleSide,map:texture});
	cube=new THREE.Mesh(geom,material);
	cube.rotation.x=Math.PI/2;
	scene.add(cube);
}
