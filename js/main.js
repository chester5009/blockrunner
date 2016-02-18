var render,scene,camera;
var boxes=[];
var plaer;
window.onload=function(){
	scene=new THREE.Scene();
	camera=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
	camera.position.x=0;
	camera.position.y=1;
	camera.position.z=4;
	render=new THREE.WebGLRenderer();
	render.setClearColor(0x000000);
	render.setSize(window.innerWidth,window.innerHeight);
	document.body.appendChild(render.domElement);


	player=new Player(scene,0,1,0);

	createGround(scene);
	scene.add(new THREE.AmbientLight(0x303030));
	boxes.push(new Block(scene,0));
	renderer();

}
var spawnTime=75;
var spawnTimer=0;
function renderer(){
	requestAnimationFrame(renderer);

	spawnTimer++;
	if(spawnTimer>spawnTime){
		spawnTimer=0;
		boxes.push(new Block(scene,Math.random()*30-15));
	}
	for (var i = 0; i < boxes.length; i++) {
		boxes[i].update(scene);
	}
	render.render(scene,camera);
}

function createGround(s){
	var plane,geom,material;
	geom=new THREE.PlaneGeometry(30,50);
	material=new THREE.MeshPhongMaterial({side:THREE.DoubleSide,color:0xff0000});
	plane=new THREE.Mesh(geom,material);
	plane.rotation.x=Math.PI/2;
	plane.position.x=0;
	plane.position.y=0;
	plane.position.z=-25;
	s.add(plane);
}

///Block object
function Block(s,x) {
	this.x=x;
	this.z=-25;
	this.y=1;
	this.geom;
	this.material;
	this.mesh;
	this.init(s);
}

Block.prototype.init = function (s) {
	this.geom=new THREE.BoxGeometry(2,2,2);
	this.material=new THREE.MeshBasicMaterial({color:0x00ff00});
	this.mesh=new THREE.Mesh(this.geom,this.material);
	this.mesh.position.x=this.x;
	this.mesh.position.y=this.y;
	this.mesh.position.z=this.z;
	s.add(this.mesh);
};

Block.prototype.update = function (scene) {
	this.mesh.position.z+=0.14;
	if(this.mesh.position.z>0) {
		scene.remove(this.mesh);
		boxes.splice(boxes.indexOf(this),1);
	}
};
////

function Player(scene,x,y,z) {
	this.x=x;
	this.y=y;
	this.z=z;
	this.geometry;
	this.material;
	this.mesh;
	this.init(scene);
}
Player.prototype.init = function (scene) {
	this.geom=new THREE.SphereGeometry(1,16,16,16);
	this.material=new THREE.MeshBasicMaterial({color:0x0000ff});
	this.mesh=new THREE.Mesh(this.geom,this.material);
	this.mesh.position.x=this.x;
	this.mesh.position.y=this.y;
	this.mesh.position.z=this.z;
	scene.add(this.mesh);
};
