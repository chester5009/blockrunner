function Camera() {
    this.x;
    this.y;
    this.z;
    this.lookX;
    this.lookY;
    this.lookZ;
    this.camera;
}

Camera.prototype.init = function () {
  this.camera=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
  
};
