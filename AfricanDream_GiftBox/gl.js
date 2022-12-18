//'use strict';

const canvas = document.querySelector('#c');
const renderer = new THREE.WebGLRenderer({canvas, antialias: true});


//renderer.setPixelRatio( window.devicePixelRatio );


//CAMERA
//renderer.physicallyCorrectLights = true;
//renderer.shadowMap.enabled = true;
//renderer.shadowMapSoft = true;
const fov = 63; //45
const aspect = 2;  // the canvas default
const near = 0.1;
const far = 200;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(-6.5, 1, 1.7);
//camera.position.set(-3.84, -0.19, -0.58);



var scene = new THREE.Scene();
const whiteBack = new THREE.Color('white');
scene.background = whiteBack;
//scene.fog = new THREE.FogExp2(0xffffff, 0.05 );



//controls//
const controls = new THREE.TrackballControls (camera, canvas);

controls.rotateSpeed = 1.0;
controls.zoomSpeed = 1.2;
controls.panSpeed = 0.8;

controls.target.set(-0, -0.2, -0);
controls.minDistance = 2;
controls.maxDistance = 3.5; //5

controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
controls.dampingFactor = 0.031;
controls.screenSpacePanning = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 0.6;





// https://matheowis.github.io/HDRI-to-CubeMap/index.html 

const textureCube = new THREE.CubeTextureLoader()
	.load([
	'img/px.png',
	'img/nx.png',
	'img/py.png',
	'img/ny.png',
	'img/pz.png',
	'img/nz.png',
]);






const loader = new THREE.TextureLoader();


const LemonGarlicPeriPeri_logo = loader.load('img/LemonGarlicPeriPeri_lables1.png');
LemonGarlicPeriPeri_logo.flipY = false;

const Birds_EyeChilli_logo = loader.load('img/Birds_EyeChilli_lables1.png');
Birds_EyeChilli_logo.flipY = false;

const HABANERO_CHILLI_SALT_logo = loader.load('img/HABANERO_CHILLI_SALT.png');
HABANERO_CHILLI_SALT_logo.flipY = false;

const SAFARI_SMOKE_SEASONING_logo = loader.load('img/SAFARI_SMOKE_SEASONING.png');
SAFARI_SMOKE_SEASONING_logo.flipY = false;

const boxTexture = loader.load('img/box_texture.jpg');
boxTexture.flipY = false;

const boxInsideTexture = loader.load('img/Empty_GiftBox.png');
boxInsideTexture.flipY = false;

const glassTexture = loader.load('img/gl3.png');
glassTexture.wrapS = THREE.RepeatWrapping;
glassTexture.wrapT = THREE.RepeatWrapping;
glassTexture.flipY = false;

const Sauce_LemonGarlicPeriPeri_texture = loader.load('img/Sauce_LemonGarlicPeriPeri.jpg');
Sauce_LemonGarlicPeriPeri_texture.wrapS = THREE.RepeatWrapping;
Sauce_LemonGarlicPeriPeri_texture.wrapT = THREE.RepeatWrapping;
Sauce_LemonGarlicPeriPeri_texture.flipY = false;

const Sauce_BirdsEyeChilli = loader.load('img/Sauce_BirdsEyeChilli.png');
Sauce_BirdsEyeChilli.wrapS = THREE.RepeatWrapping;
Sauce_BirdsEyeChilli.wrapT = THREE.RepeatWrapping;
Sauce_BirdsEyeChilli.flipY = false;

const salt_nrm_texture = loader.load('img/salt_nrm.jpg');
salt_nrm_texture.wrapS = THREE.RepeatWrapping;
salt_nrm_texture.wrapT = THREE.RepeatWrapping;
salt_nrm_texture.flipY = false;

const HABANERO_CHILLI_SALT_texture = loader.load('img/HabaneroChilliSalt.jpg');
HABANERO_CHILLI_SALT_texture.wrapS = THREE.RepeatWrapping;
HABANERO_CHILLI_SALT_texture.wrapT = THREE.RepeatWrapping;
HABANERO_CHILLI_SALT_texture.flipY = false;

const SAFARI_SMOKE_SEASONING_texture = loader.load('img/mix.jpg');
SAFARI_SMOKE_SEASONING_texture.wrapS = THREE.RepeatWrapping;
SAFARI_SMOKE_SEASONING_texture.wrapT = THREE.RepeatWrapping;
SAFARI_SMOKE_SEASONING_texture.flipY = false;




const LemonGarlicPeriPeri_Mat = new THREE.MeshPhysicalMaterial( { 
envMap: textureCube,
envMapIntensity : 0.5,
map: Sauce_LemonGarlicPeriPeri_texture,
metalness: 0,
roughness: 0,
} );


const SAFARI_SMOKE_SEASONING_Mat = new THREE.MeshPhysicalMaterial( { 
envMap: textureCube,
envMapIntensity : 0.5,
map: SAFARI_SMOKE_SEASONING_texture,
normalMap: salt_nrm_texture,
normalScale: new THREE.Vector2(0.5, 0.5),
metalness: 0,
roughness: 0,
} );


const HABANERO_CHILLI_SALT_Mat = new THREE.MeshPhysicalMaterial( { 
envMap: textureCube,
envMapIntensity : 0.5,
map: HABANERO_CHILLI_SALT_texture,
normalMap: salt_nrm_texture,
normalScale: new THREE.Vector2(0.5, 0.5),
metalness: 0,
roughness: 0,
} );


const glassMat = new THREE.MeshPhysicalMaterial( { 
envMap: textureCube,
envMapIntensity : 2,
map: glassTexture,
reflectivity: 0,
metalness: 0.5,
roughness: 0.15,
transparent: true,
transparency: 0.7, 
} );



const glassBoxMat = new THREE.MeshPhysicalMaterial( { 
envMap: textureCube,
envMapIntensity : 1.2,
map: glassTexture,
metalness: 0.7,
roughness: 0.2,
transparent: true,
transparency: 1, 
depthWrite: false,
} );




const blackPlastic = new THREE.MeshPhysicalMaterial( { 
envMap: textureCube,
color: 0x585151,
metalness: 1.2,
roughness: 0.2,
} );



const LemonGarlicPeriPeri_logoMat = new THREE.MeshPhysicalMaterial( { 
envMap: textureCube,
map: LemonGarlicPeriPeri_logo,
metalness: 0,
roughness: 0.2,
//emission: 5,
reflectivity: 1,
transparent: true,
transparency: 0, 
depthWrite: false,
} );


const Birds_EyeChilli_logoMat = new THREE.MeshPhysicalMaterial( { 
envMap: textureCube,
map: Birds_EyeChilli_logo,
metalness: 0,
roughness: 0.2,
//emission: 5,
reflectivity: 1,
transparent: true,
transparency: 0, 
depthWrite: false,
} );


const HABANERO_CHILLI_SALT_logoMat = new THREE.MeshPhysicalMaterial( { 
envMap: textureCube,
map: HABANERO_CHILLI_SALT_logo,
metalness: 0,
roughness: 0.2,
//emission: 5,
reflectivity: 1,
transparent: true,
transparency: 0, 
depthWrite: false,
} );


const SAFARI_SMOKE_SEASONING_logoMat = new THREE.MeshPhysicalMaterial( { 
envMap: textureCube,
map: SAFARI_SMOKE_SEASONING_logo,
metalness: 0,
roughness: 0.2,
//emission: 5,
reflectivity: 1,
transparent: true,
transparency: 0, 
depthWrite: false,
} );


const boxMat = new THREE.MeshPhysicalMaterial( { 
envMap: textureCube,
map: boxTexture,
metalness: 0,
roughness: 0.4,
reflectivity: 1,
} );


const boxInsideMat = new THREE.MeshPhysicalMaterial( { 
envMap: textureCube,
map: boxInsideTexture,
metalness: 0,
roughness: 0.4,
reflectivity: 1,
} );


const labelCoverMat = new THREE.MeshPhysicalMaterial( { 
envMap: textureCube,
map: Sauce_BirdsEyeChilli,
metalness: 0,
roughness: 0.2,
//emission: 5,
reflectivity: 1,
} );


var BottleGroup = new THREE.Group();
var BottleGroup2 = new THREE.Group();

let   boxObject, boxInside, boxInside2, glassCover, glassBottle1, glassBottle1_1, glassBottle2, glassBottle2_1, bottle_covers, sauceBottle_1, sauceBottle_2, labelBottle_1, labelBottle_2, glassBottles3, bottle_covers2, salt1, salt2, salt_logo1, salt_logo2;

const gltfLoader = new THREE.GLTFLoader();

gltfLoader.load('gltf/GiftBox.glb', (gltf) => {

	boxObject = gltf.scene.children[0];
	boxObject.material = boxMat;

	boxInside = gltf.scene.children[1];
	boxInside.material = boxInsideMat;

	boxInside2 = gltf.scene.children[2];
	boxInside2.material = boxInsideMat;    

	glassCover = gltf.scene.children[3];
	glassCover.material = glassBoxMat;  
	glassCover.renderOrder = 1;   

	glassBottle1 = gltf.scene.children[4];
	glassBottle1.material = glassMat; 
	glassBottle1.renderOrder = 2; 

	glassBottle1_1 = gltf.scene.children[5];
	glassBottle1_1.material = glassMat; 
	glassBottle1_1.renderOrder = 2; 

	glassBottle2 = gltf.scene.children[6];
	glassBottle2.material = glassMat; 
	glassBottle2.renderOrder = 2; 

	glassBottle2_1 = gltf.scene.children[7];
	glassBottle2_1.material = glassMat; 
	glassBottle2_1.renderOrder = 2; 

	bottle_covers = gltf.scene.children[8];
	bottle_covers.material = labelCoverMat; 

	sauceBottle_1 = gltf.scene.children[9];
	sauceBottle_1.material = LemonGarlicPeriPeri_Mat; 

	sauceBottle_2 = gltf.scene.children[10];
	sauceBottle_2.material = LemonGarlicPeriPeri_Mat; 

	labelBottle_1 = gltf.scene.children[11];
	labelBottle_1.material = LemonGarlicPeriPeri_logoMat; 

	labelBottle_2 = gltf.scene.children[12];
	labelBottle_2.material = Birds_EyeChilli_logoMat; 

	glassBottles3 = gltf.scene.children[13];
	glassBottles3.material = glassMat; 
	glassBottles3.renderOrder = 2; 

	bottle_covers2 = gltf.scene.children[14];
	bottle_covers2.material = blackPlastic; 

	salt1 = gltf.scene.children[15];
	salt1.material = HABANERO_CHILLI_SALT_Mat; 

	salt2 = gltf.scene.children[16];
	salt2.material = SAFARI_SMOKE_SEASONING_Mat; 

	salt_logo1 = gltf.scene.children[17];
	salt_logo1.material = HABANERO_CHILLI_SALT_logoMat; 

	salt_logo2 = gltf.scene.children[18];
	salt_logo2.material = SAFARI_SMOKE_SEASONING_logoMat; 


	BottleGroup.add(boxObject, boxInside, boxInside2, glassCover, glassBottle1, glassBottle1_1, glassBottle2, glassBottle2_1, bottle_covers, sauceBottle_1, sauceBottle_2, glassBottles3, bottle_covers2, salt1, salt2);
	BottleGroup.renderOrder = 1;

	scene.add(BottleGroup);

	BottleGroup2.add(labelBottle_1, labelBottle_2, salt_logo1, salt_logo2);
	BottleGroup2.renderOrder = 2;

	scene.add(BottleGroup2);

});














































const color = 0xFFFFFF;
const intensity = 0;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(-35, 53, -33);
light.target.position.set(13, 0, -100);
scene.add(light);
scene.add(light.target);
const helper = new THREE.DirectionalLightHelper(light);
scene.add(helper);



    let hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 1);
    hemiLight.position.set(0, 90, 0);
    // Add hemisphere light to scene
    scene.add(hemiLight);




// for dat gui 
function updateLight() {
light.target.updateMatrixWorld();
//light2.target.updateMatrixWorld();
//light3.target.updateMatrixWorld();
helper.update();
}






/* 

class ColorGUIHelper {
constructor(object, prop) {
this.object = object;
this.prop = prop;
}
get value() {
return `#${this.object[this.prop].getHexString()}`;
}
set value(hexString) {
this.object[this.prop].set(hexString);
}
}
function makeXYZGUI(gui, vector3, name, onChangeFn) {
const folder = gui.addFolder(name);
folder.add(vector3, 'x', -5, 5).onChange(onChangeFn);
folder.add(vector3, 'y', -5, 5).onChange(onChangeFn);
folder.add(vector3, 'z', -5, 5).onChange(onChangeFn);
folder.open();
}  
const gui = new dat.GUI();
*/


//gui.addColor(new ColorGUIHelper(powderBlue, 'color'), 'value').name('color');

//gui.add(light, 'intensity', 0, 2, 0.01);

//makeXYZGUI(gui, light.position, 'position', updateLight);
//makeXYZGUI(gui, light.target.position, 'target', updateLight);

//makeXYZGUI(gui, anchor10.position, 'position', updateLight);



//makeXYZGUI(gui, anchor2.rotation, 'rotation', updateLight);


















function resizeRendererToDisplaySize(renderer) {
	const canvas = renderer.domElement;
	const width = canvas.clientWidth;
	const height = canvas.clientHeight;
	const needResize = canvas.width !== width || canvas.height !== height;
	if (needResize) {
	renderer.setSize(width, height, false);
	}
	return needResize;
}



renderer.setPixelRatio(window.devicePixelRatio);



function render(time) {


	renderer.render(scene, camera);
	requestAnimationFrame(render);

	if (resizeRendererToDisplaySize(renderer)) {
	const canvas = renderer.domElement;
	camera.aspect = canvas.clientWidth / canvas.clientHeight;
	}

	camera.updateProjectionMatrix();
	controls.update();

	updateLight();




    time *= 0.0002;  // convert time to seconds

    BottleGroup.rotation.y = -time;

    BottleGroup2.rotation.y = -time;





}
   

requestAnimationFrame(render);
render();





















