import * as THREE from "three";
import Experience from "./Experience";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js"

export default class Camera {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;

    this.createPerspectiveCamera();
    this.createOrthographicCamera();
    this.setOrbitControls()
  }
  createPerspectiveCamera() {
    this.prespectiveCamera = new THREE.PerspectiveCamera(
      45,
      this.sizes.aspect,
      0.1,
      1000
    );
    this.scene.add(this.prespectiveCamera);
    this.prespectiveCamera.position.z =16
    this.prespectiveCamera.position.x =33
    this.prespectiveCamera.position.y =18
  }
  createOrthographicCamera() {
    this.orthographicCamera = new THREE.OrthographicCamera(
      (-this.sizes.aspect * this.sizes.frustrum) / 2,
      (this.sizes.aspect * this.sizes.frustrum) / 2,
      this.sizes.frustrum / 2,
      -this.sizes.frustrum / 2,
      -50,
      50
    );

    this.orthographicCamera.position.y = 4
    this.orthographicCamera.position.z = 3
    this.orthographicCamera.rotation.x = -Math.PI/4

    this.scene.add(this.orthographicCamera);
    // this.helper = new THREE.CameraHelper(this.orthographicCamera)
    // this.scene.add(this.helper)

    const size = 20;
    const divisions = 20;

    // const gridHelper = new THREE.GridHelper( size, divisions );
    // this.scene.add( gridHelper );
    // const axesHelper = new THREE.AxesHelper( 10 );
    // this.scene.add( axesHelper );
  }

  setOrbitControls() {
    this.controls = new OrbitControls(this.prespectiveCamera,this.canvas)
    this.controls.enableDamping = true
    this.controls.enableZoom = false
  }

  resize() {// Updating PerspectiveCamera and OrthographicCamera
    this.prespectiveCamera.aspect = this.sizes.aspect;
    this.prespectiveCamera.updateProjectionMatrix();
    this.orthographicCamera.left =
      (-this.sizes.aspect * this.sizes.frustrum) / 2;
    this.orthographicCamera.right =
      (this.sizes.aspect * this.sizes.frustrum) / 2;
    this.orthographicCamera.top = this.frustrum / 2;
    this.orthographicCamera.bottom = -this.frustrum / 2;
    this.orthographicCamera.updateProjectionMatrix();
  }
  update(){
    // console.log(this.prespectiveCamera.position)
    this.controls.update()

    // this.helper.matrixWorldNeedsUpdate = true;
    // this.helper.update()
    // this.helper.position.copy(this.orthographicCamera.position)
    // this.helper.rotation.copy(this.orthographicCamera.rotation)
  }
}
