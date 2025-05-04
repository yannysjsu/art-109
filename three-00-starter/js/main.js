
let scene, camera, cube, renderer, capsule;

import * as THREE from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

function init(){
	
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
	
	renderer = new THREE.WebGLRenderer({antialias:true });
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.setAnimationLoop( animate );
	document.body.appendChild( renderer.domElement );
	
	const geometry = new THREE.BoxGeometry( 1, 1, 1 );
	const geometry2 = new THREE.CapsuleGeometry( 1, 1, 4, 8 );
	const material1 = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );

	const controls = new OrbitControls (camera, renderer.domElement)
	const loader = new GLTFLoader ();
	loader.load('assets/dog_shiny.gltf', function (gltf){
		const dog = gltf.scene;
		scene.add(dog);
	})

	const texture = new THREE.TextureLoader().load('textures/grasslight-big.jpg');
	const material = new THREE.MeshBasicMaterial( { map:texture } );
	cube = new THREE.Mesh( geometry, material1  );
	capsule = new THREE.Mesh ( geometry2, material);
	scene.add( cube );
	cube.scale.set(2, 2, 4);
	scene.add( capsule );
	
	camera.position.z = 5;
	
	
}

function animate() {
	
	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;
	capsule.rotation.x += 0.01;
	capsule.rotation.y += 0.01;

	renderer.render( scene, camera );

}

function onWindowReSize(){
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );

}

window.addEventListener('resize', onWindowReSize, false);

init();
animate();