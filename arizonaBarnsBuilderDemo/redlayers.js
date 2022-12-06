/* eslint-disable */

/* import { ca } from "date-fns/locale" */

//#region 
/* to remove and clear these later */
let allRoof8Parts = []
let allRoof12Parts = []
let allBackPanels_metal = [];
let allBackPanels = []
let allFloor8Parts = []
let allShedrowLeftSide = []
let allBackWall12Parts = []
/* to remove and clear these later */
//#endregion


/// important variables 
let allShedrowSections = []
let sectionShedrowWidth = 3
let porchStatus = 12
let sectionShedrowDepth = 12



const container = document.querySelector('#barns')

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.01, 1000)
camera.position.set( 4, 0.3, 4);


const renderer = new THREE.WebGLRenderer({antialias:true})
renderer.setSize(container.offsetWidth, container.offsetHeight)
container.appendChild(renderer.domElement)
renderer.autoClear = true;
renderer.clearDepth();

const whiteBack = new THREE.Color('#ffffff');
scene.background = whiteBack;

// orbit controls and its settings 
const controls = new THREE.OrbitControls( camera, renderer.domElement);


controls.minDistance = 0.2;
controls.maxDistance = 2;
controls.maxPolarAngle = Math.PI / 2;
controls.target.set( 0, 0, -0.1);




function changeCameraTargets() {

    
    switch (allShedrowSections.length) {
        case 1:  
            let controlsTarget1 = new TWEEN.Tween(controls.target).to({x : 0, y :  0, z : -0.1}, 1000).easing(TWEEN.Easing.Quadratic.Out).delay(0).start();
            controls.maxDistance = 2;
            break;
        case 2:  
            let controlsTarget2 = new TWEEN.Tween(controls.target).to({x : 0, y :  0, z : -0.2}, 1000).easing(TWEEN.Easing.Quadratic.Out).delay(0).start();
            controls.maxDistance = 2.2;
            break;
        case 3:  
            let controlsTarget3 = new TWEEN.Tween(controls.target).to({x : 0, y :  0, z : -0.3}, 1000).easing(TWEEN.Easing.Quadratic.Out).delay(0).start();
            controls.maxDistance = 2.4;
            break;
        case 4:  
            let controlsTarget4 = new TWEEN.Tween(controls.target).to({x : 0, y :  0, z : -0.4}, 1000).easing(TWEEN.Easing.Quadratic.Out).delay(0).start();
            controls.maxDistance = 2.6;
            break;
        case 5:  
            let controlsTarget5 = new TWEEN.Tween(controls.target).to({x : 0, y :  0, z : -0.5}, 1000).easing(TWEEN.Easing.Quadratic.Out).delay(0).start();
            controls.maxDistance = 2.8;
            break;
        case 6:  
            let controlsTarget6 = new TWEEN.Tween(controls.target).to({x : 0, y :  0, z : -0.6}, 1000).easing(TWEEN.Easing.Quadratic.Out).delay(0).start();
            controls.maxDistance = 3;
            break;
        case 7:  
            let controlsTarget7 = new TWEEN.Tween(controls.target).to({x : 0, y :  0, z : -0.7}, 1000).easing(TWEEN.Easing.Quadratic.Out).delay(0).start();
            controls.maxDistance = 3.2;
            break;
        case 8:  
            let controlsTarget8 = new TWEEN.Tween(controls.target).to({x : 0, y :  0, z : -0.8}, 1000).easing(TWEEN.Easing.Quadratic.Out).delay(0).start();
            controls.maxDistance = 3.4;
            break;
        case 9:  
            let controlsTarget9 = new TWEEN.Tween(controls.target).to({x : 0, y :  0, z : -0.9}, 1000).easing(TWEEN.Easing.Quadratic.Out).delay(0).start();
            controls.maxDistance = 3.6;
            break;
        case 10:  
            let controlsTarget10 = new TWEEN.Tween(controls.target).to({x : 0, y :  0, z : -1}, 1000).easing(TWEEN.Easing.Quadratic.Out).delay(0).start();
            controls.maxDistance = 3.8;
            break;
        case 11:  
            let controlsTarget11 = new TWEEN.Tween(controls.target).to({x : 0, y :  0, z : -1}, 1000).easing(TWEEN.Easing.Quadratic.Out).delay(0).start();
            controls.maxDistance = 4;
            break;
        case 12:  
            let controlsTarget12 = new TWEEN.Tween(controls.target).to({x : 0, y :  0, z : -1.1}, 1000).easing(TWEEN.Easing.Quadratic.Out).delay(0).start();
            controls.maxDistance = 4.2;
            break;
      }
}









//light sources in scene

const color = 0xFFFFFF;
const intensity = 0.4;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(35, 53, -30);
light.target.position.set(13, 0, -50);
scene.add(light);
scene.add(light.target);
const helper = new THREE.DirectionalLightHelper(light);
//scene.add(helper);

let hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.91);
hemiLight.position.set(0, 90, 0);
// Add hemisphere light to scene
scene.add(hemiLight);








//3D textures and models, parts objects - basics 

const gltfLoader = new THREE.GLTFLoader();


const textureCube = new THREE.CubeTextureLoader()
	.load([
	'3Dparts/textures/px.png',
	'3Dparts/textures/nx.png',
	'3Dparts/textures/py.png',
	'3Dparts/textures/ny.png',
	'3Dparts/textures/pz.png',
	'3Dparts/textures/nz.png',
]);
const loader = new THREE.TextureLoader();

const metal_disp = loader.load('./3Dparts/textures/Metal.jpg');
metal_disp.wrapS = THREE.RepeatWrapping;
metal_disp.wrapT = THREE.RepeatWrapping;
metal_disp.flipY = false;

const metal_nrm = loader.load('./3Dparts/textures/Metal_nrm.jpg');
metal_nrm.wrapS = THREE.RepeatWrapping;
metal_nrm.wrapT = THREE.RepeatWrapping;
metal_nrm.flipY = false;

const metalRoof = loader.load('./3Dparts/textures/MetalRoof.jpg');
metalRoof.wrapS = THREE.RepeatWrapping;
metalRoof.wrapT = THREE.RepeatWrapping;
metalRoof.flipY = false;

const metalRoof_nrm = loader.load('./3Dparts/textures/MetalRoof_nrm.jpg');
metalRoof_nrm.wrapS = THREE.RepeatWrapping;
metalRoof_nrm.wrapT = THREE.RepeatWrapping;
metalRoof_nrm.flipY = false;

const ground = loader.load('./3Dparts/textures/ground.jpg');
ground.wrapS = THREE.RepeatWrapping;
ground.wrapT = THREE.RepeatWrapping;
ground.flipY = false;

const concrete = loader.load('./3Dparts/textures/concrete.jpg');
concrete.wrapS = THREE.RepeatWrapping;
concrete.wrapT = THREE.RepeatWrapping;
concrete.flipY = false;

let groundGeo = new THREE.PlaneBufferGeometry(100, 100, 100, 1);
let groundMat = new THREE.MeshBasicMaterial({ color: 0xEEEEEE });
let groundMesh = new THREE.Mesh(groundGeo, groundMat);
//groundMesh.renderOrder = 0;
groundMesh.rotateX( - Math.PI / 2);
groundMesh.position.y = -0.4
//scene.add(groundMesh);


const WallMat = new THREE.MeshPhongMaterial({ color: 0xF1E7D2 })
const WallMatRoofParts = new THREE.MeshPhongMaterial({ color: 0xF1E7D0 })
const MetalMat = new THREE.MeshPhysicalMaterial( { envMap: textureCube, metalnessMap: metal_disp, normalMap: metal_nrm, normalScale: new THREE.Vector2(0.1, 0.1), color: 0xE7E7E7, metalness: 1, roughness: 0.2, side: THREE.DoubleSide } );
const RoofMat = new THREE.MeshPhongMaterial({ map: metalRoof, normalMap: metalRoof_nrm, normalScale: new THREE.Vector2(1, 1),  shininess: 100  })
const FloorMat = new THREE.MeshBasicMaterial({  map: ground, side: THREE.DoubleSide })
const ConcreteMat = new THREE.MeshBasicMaterial({  map: concrete})
        




















































function dynamicUploaderType1(counter, sect, arrayType, name, material1, ) {

    for (let x = 0; x <= counter; x++) {

        gltfLoader.load('./3Dparts/'+name, (gltf) => {

            window[name] = gltf.scene.children[0];
            window[name].material = material1;

            window[name].name = name;

            sect.add(window[name]);
          
        })
    }
}





function dynamicUploaderForParts(counter, sect, arrayType, name, material1, positionStep, whatStep) {

    for (let x = 0; x <= counter; x++) {

        gltfLoader.load('./3Dparts/'+name, (gltf) => {

            window[name] = gltf.scene.children[0];
            window[name].material = material1;
            window[name].name = name;

            window[name].position.z = positionStep
            positionStep -= whatStep;

            sect.add(window[name]);
        })
    }
}



function dynamicUploaderForPartsDepth(counter, sect, arrayType, name, material1, positionStep, whatStep, depthStep) {

    for (let x = 0; x <= counter; x++) {

        gltfLoader.load('./3Dparts/'+name, (gltf) => {

            window[name] = gltf.scene.children[0];
            window[name].material = material1;
            window[name].name = name;

            window[name].position.z = positionStep
            positionStep -= whatStep;

            window[name].position.x = depthStep

            sect.add(window[name]);
        })
    }
}



















// to remove 'step' attribute later 

function createSectionShedrow(whatWidth, step, sectionName, depth, porch) {

    window[sectionName] = new THREE.Object3D;

    window[sectionName].name = 'GroupSectionShedrowBarn12x12'+sectionName;

    allShedrowSections.push(window[sectionName]);

    // these are for internal items of sections like doors or panels, it is ok to  have complex positioning like these there 
    let positionStep = -0.02;
    let whatStep = 0.062;
    let positionStep2 =  0.1616;

    switch (whatWidth) {

        case 2: 
            switch (depth)  { 
                case 16:
                    // door
                    dynamicUploaderType1(0, window[sectionName], allBackPanels_metal, 'StallFront_titan_x8.glb', MetalMat, 0)
                    // floor room
                    dynamicUploaderType1(0, window[sectionName], allBackPanels_metal, 'Floor_8x16.glb', FloorMat, 0)
                    //unique  positioning for size #2 ⬇️
                    dynamicUploaderForParts(0, window[sectionName], allBackPanels_metal, 'separatedWall_16.glb', WallMat, 0.0435, 0.9)

                    if (porch === 12) {
                        // floor porch
                        dynamicUploaderType1(0, window[sectionName], allBackPanels_metal, 'ConcreteFloor_12x8.glb', ConcreteMat, 0)
                        // metal girder porch
                        dynamicUploaderForParts(0, window[sectionName], allBackPanels_metal, 'DividingMetall_ShedrowBarn_12.glb', MetalMat, -0.053, 0.53);
                        window[sectionName].porch = 12;
                    } else {
                        // floor porch
                        dynamicUploaderType1(0, window[sectionName], allBackPanels_metal, 'ConcreteFloor_8x8.glb', ConcreteMat, 0)
                        // metal girder
                        dynamicUploaderForParts(0, window[sectionName], allBackPanels_metal, 'DividingMetall_ShedrowBarn_8.glb', MetalMat, -0.053, 0.53);
                        window[sectionName].porch = 8;
                    }

                    // repetetive objects 
                    for (let x = 0; x <= whatWidth-1; x++) {
                        whatStep = whatStep + 0.062;
                        positionStep -= 0.062;
                        positionStep2 -= 0.063;
                        // roof room
                        dynamicUploaderForParts(0, window[sectionName], allRoof12Parts, 'RoofShedrow_RoomSide_16.glb', RoofMat, positionStep+0.0635, whatStep)
                        // wall room
                        dynamicUploaderForPartsDepth(0, window[sectionName], allRoof12Parts, 'SideWallShedrowBarn_wall.glb', WallMat, positionStep+0.0635, whatStep, -0.152)
                        // metal wall room
                        dynamicUploaderForPartsDepth(0, window[sectionName], allRoof12Parts, 'SideWallShedrowBarn_metal.glb', MetalMat, positionStep2+0.0635, whatStep, -0.152)

                        if (porch === 12) {
                            // roof porch
                            dynamicUploaderForParts(0, window[sectionName], allRoof12Parts, 'RoofShedrowBarn_PorchSide_1panel.glb', RoofMat,  positionStep+0.1235, whatStep)
                            // down roof porch
                            dynamicUploaderForParts(0, window[sectionName], allRoof12Parts, 'RoofShedrowBarn_PorchSide_1panel_downpanel.glb', WallMatRoofParts, positionStep+0.062, whatStep);
                            window[sectionName].porch = 12;
                        } else {
                            // roof porch
                            dynamicUploaderForParts(0, window[sectionName], allRoof12Parts, 'RoofShedrowBarn_PorchSide_8x4_roof.glb', RoofMat, positionStep+0.063, whatStep)
                            // down roof porch
                            dynamicUploaderForParts(0, window[sectionName], allRoof12Parts, 'RoofShedrowBarn_PorchSide_8x4_part.glb', WallMatRoofParts, positionStep+0.062, whatStep)
                            window[sectionName].porch = 8;
                        }
                    }
                    window[sectionName].depthStatus = 16; 
                break;

                case 12:
                    // door
                    dynamicUploaderType1(0, window[sectionName], allBackPanels_metal, 'StallFront_titan_x8.glb', MetalMat, 0)
                    // floor room
                    dynamicUploaderType1(0, window[sectionName], allBackPanels_metal, 'Floor_8x12.glb', FloorMat, 0)
                    // room wall inside unique  positioning for size #2 ⬇️
                    dynamicUploaderForParts(0, window[sectionName], allBackPanels_metal, 'WallInside.glb', WallMat, 0.0435, 0.9)

                    if (porch === 12) {
                        // floor porch
                        dynamicUploaderType1(0, window[sectionName], allBackPanels_metal, 'ConcreteFloor_12x8.glb', ConcreteMat, 0)
                        // metal girder porch
                        dynamicUploaderForParts(0, window[sectionName], allBackPanels_metal, 'DividingMetall_ShedrowBarn_12.glb', MetalMat, -0.053, 0.53);
                        window[sectionName].porch = 12;
                    } else {
                        // floor porch
                        dynamicUploaderType1(0, window[sectionName], allBackPanels_metal, 'ConcreteFloor_8x8.glb', ConcreteMat, 0)
                        // metal girder
                        dynamicUploaderForParts(0, window[sectionName], allBackPanels_metal, 'DividingMetall_ShedrowBarn_8.glb', MetalMat, -0.053, 0.53)
                        window[sectionName].porch = 8;
                    }

                    // repetetive objects 
                    for (let x = 0; x <= whatWidth-1; x++) {
                        whatStep = whatStep + 0.062;
                        positionStep -= 0.062;
                        positionStep2 -= 0.063;
                        // roof room
                        dynamicUploaderForParts(0, window[sectionName], allRoof12Parts, 'RoofShedrowBarn_RoomSide_12_1panel.glb', RoofMat, positionStep+0.0635, whatStep)
                        // wall room
                        dynamicUploaderForPartsDepth(0, window[sectionName], allRoof12Parts, 'SideWallShedrowBarn_wall.glb', WallMat, positionStep+0.0635, whatStep, -0.092)
                        // metal wall room
                        dynamicUploaderForPartsDepth(0, window[sectionName], allRoof12Parts, 'SideWallShedrowBarn_metal.glb', MetalMat, positionStep2+0.0635, whatStep, -0.092)

                        if (porch === 12) {
                            // roof porch
                            dynamicUploaderForParts(0, window[sectionName], allRoof12Parts, 'RoofShedrowBarn_PorchSide_1panel.glb', RoofMat, positionStep+0.1235, whatStep)
                            // down roof porch
                            dynamicUploaderForParts(0, window[sectionName], allRoof12Parts, 'RoofShedrowBarn_PorchSide_1panel_downpanel.glb', WallMatRoofParts, positionStep+0.062, whatStep);
                            window[sectionName].porch = 12;
                        } else {
                            // roof porch
                            dynamicUploaderForParts(0, window[sectionName], allRoof12Parts, 'RoofShedrowBarn_PorchSide_8x4_roof.glb', RoofMat, positionStep+0.063, whatStep)
                            // down roof porch
                            dynamicUploaderForParts(0, window[sectionName], allRoof12Parts, 'RoofShedrowBarn_PorchSide_8x4_part.glb', WallMatRoofParts, positionStep+0.062, whatStep)
                            window[sectionName].porch = 8;
                        }
                    }
                    window[sectionName].depthStatus = 12; 
                break;

                case 8:
                    // door
                    dynamicUploaderType1(0, window[sectionName], allBackPanels_metal, 'StallFront_titan_x8.glb', MetalMat, 0)
                    // floor room
                    dynamicUploaderType1(0, window[sectionName], allBackPanels_metal, 'Floor_8x8.glb', FloorMat, 0)
                    // room wall inside unique  positioning for size #2 ⬇️
                    dynamicUploaderForParts(0, window[sectionName], allBackPanels_metal, 'WallSeperation_8.glb', WallMat, 0.0435, 0.9)

                    if (porch === 12) {
                        // floor porch
                        dynamicUploaderType1(0, window[sectionName], allBackPanels_metal, 'ConcreteFloor_12x8.glb', ConcreteMat, 0)
                        // metal girder porch
                        dynamicUploaderForParts(0, window[sectionName], allBackPanels_metal, 'DividingMetall_ShedrowBarn_12.glb', MetalMat, -0.053, 0.53);
                        window[sectionName].porch = 12;
                    } else {
                        // floor porch
                        dynamicUploaderType1(0, window[sectionName], allBackPanels_metal, 'ConcreteFloor_8x8.glb', ConcreteMat, 0)
                        // metal girder
                        dynamicUploaderForParts(0, window[sectionName], allBackPanels_metal, 'DividingMetall_ShedrowBarn_8.glb', MetalMat, -0.053, 0.53);
                        window[sectionName].porch = 8;
                    }

                    // repetetive objects 
                    for (let x = 0; x <= whatWidth-1; x++) {
                        whatStep = whatStep + 0.062;
                        positionStep -= 0.062;
                        positionStep2 -= 0.063;
                        // roof room
                        dynamicUploaderForParts(0, window[sectionName], allRoof12Parts, 'RoofShedrow_RoomSide_8.glb', RoofMat, positionStep+0.0635, whatStep)
                        // wall room
                        dynamicUploaderForPartsDepth(0, window[sectionName], allRoof12Parts, 'SideWallShedrowBarn_wall.glb', WallMat, positionStep+0.0635, whatStep, -0.034)
                        // metal wall room
                        dynamicUploaderForPartsDepth(0, window[sectionName], allRoof12Parts, 'SideWallShedrowBarn_metal.glb', MetalMat, positionStep2+0.0635, whatStep, -0.034)

                        if (porch === 12) {
                            // roof porch
                            dynamicUploaderForParts(0, window[sectionName], allRoof12Parts, 'RoofShedrowBarn_PorchSide_1panel.glb', RoofMat, positionStep+0.1235, whatStep)
                            // down roof porch
                            dynamicUploaderForParts(0, window[sectionName], allRoof12Parts, 'RoofShedrowBarn_PorchSide_1panel_downpanel.glb', WallMatRoofParts, positionStep+0.062, whatStep)
                            window[sectionName].porch = 12;
                        } else {
                            // roof porch
                            dynamicUploaderForParts(0, window[sectionName], allRoof12Parts, 'RoofShedrowBarn_PorchSide_8x4_roof.glb', RoofMat, positionStep+0.063, whatStep)
                            // down roof porch
                            dynamicUploaderForParts(0, window[sectionName], allRoof12Parts, 'RoofShedrowBarn_PorchSide_8x4_part.glb', WallMatRoofParts, positionStep+0.062, whatStep)
                            window[sectionName].porch = 8;
                        }
                    }
                    window[sectionName].depthStatus = 8; 
                break;
            }
            window[sectionName].sectWidth = 2; 
        break;

        case 3:
            switch (depth) { 
                case 16:
                    // door
                    dynamicUploaderType1(0, window[sectionName], allBackPanels_metal, 'TitanStall_12.glb', MetalMat, 0)
                    // floor room
                    dynamicUploaderType1(0, window[sectionName], allBackPanels_metal, 'Floor_12x16.glb', FloorMat, 0)
                    //unique  positioning for size #2 ⬇️
                    dynamicUploaderForParts(0, window[sectionName], allBackPanels_metal, 'separatedWall_16.glb', WallMat, -0.02, 0)

                    if (porch === 12) {
                        // floor porch
                        dynamicUploaderType1(0, window[sectionName], allBackPanels_metal, 'ConcreteFloor_12x12.glb', ConcreteMat, 0)
                        // metal girder porch
                        dynamicUploaderForParts(0, window[sectionName], allBackPanels_metal, 'DividingMetall_ShedrowBarn_12.glb', MetalMat, -0.113, 0)
                        window[sectionName].porch = 12; 
                    } else {
                        // floor porch
                        dynamicUploaderType1(0, window[sectionName], allBackPanels_metal, 'ConcreteFloor_8x12.glb', ConcreteMat, 0)
                        // metal girder
                        dynamicUploaderForParts(0, window[sectionName], allBackPanels_metal, 'DividingMetall_ShedrowBarn_8.glb', MetalMat, -0.113, 0)
                        window[sectionName].porch = 8; 
                    }

                    // repetetive objects 
                    for (let x = 0; x <= whatWidth-1; x++) {
                        whatStep = whatStep + 0.062;
                        positionStep -= 0.062;
                        positionStep2 -= 0.063;
                        // roof room
                        dynamicUploaderForParts(0, window[sectionName], allRoof12Parts, 'RoofShedrow_RoomSide_16.glb', RoofMat, positionStep+0.0635, whatStep)
                        // wall room
                        dynamicUploaderForPartsDepth(0, window[sectionName], allRoof12Parts, 'SideWallShedrowBarn_wall.glb', WallMat, positionStep+0.0635, whatStep, -0.152)
                        // metal wall room
                        dynamicUploaderForPartsDepth(0, window[sectionName], allRoof12Parts, 'SideWallShedrowBarn_metal.glb', MetalMat, positionStep2+0.0635, whatStep, -0.152)

                        switch (porch) {
                            case 12:
                                // roof porch
                                dynamicUploaderForParts(0, window[sectionName], allRoof12Parts, 'RoofShedrowBarn_PorchSide_1panel.glb', RoofMat, positionStep+0.1235, whatStep)
                                // down roof porch
                                dynamicUploaderForParts(0, window[sectionName], allRoof12Parts, 'RoofShedrowBarn_PorchSide_1panel_downpanel.glb', WallMatRoofParts, positionStep+0.062, whatStep)
                                window[sectionName].porch = 12; 
                            break;
                            case 8:
                                // roof porch
                                dynamicUploaderForParts(0, window[sectionName], allRoof12Parts, 'RoofShedrowBarn_PorchSide_8x4_roof.glb', RoofMat, positionStep+0.063, whatStep)
                                // down roof porch
                                dynamicUploaderForParts(0, window[sectionName], allRoof12Parts, 'RoofShedrowBarn_PorchSide_8x4_part.glb', WallMatRoofParts, positionStep+0.062, whatStep)
                                window[sectionName].porch = 8; 
                            break;
                        }
                    }
                    window[sectionName].depthStatus = 16;
                break;

                case 12:
                    // door
                    dynamicUploaderType1(0, window[sectionName], allBackPanels_metal, 'TitanStall_12.glb', MetalMat, 0)
                    // floor room
                    dynamicUploaderType1(0, window[sectionName], allBackPanels_metal, 'Floor_12x12.glb', FloorMat, 0)
                    // room wall inside unique  positioning for size #2 ⬇️
                    dynamicUploaderForParts(0, window[sectionName], allBackPanels_metal, 'WallInside.glb', WallMat, -0.02, 0)

                    if (porch === 12) {
                        // floor porch
                        dynamicUploaderType1(0, window[sectionName], allBackPanels_metal, 'ConcreteFloor_12x12.glb', ConcreteMat, 0)
                        // metal girder porch
                        dynamicUploaderForParts(0, window[sectionName], allBackPanels_metal, 'DividingMetall_ShedrowBarn_12.glb', MetalMat, -0.113, 0);
                        window[sectionName].porch = 12;
                    } else {
                        // floor porch
                        dynamicUploaderType1(0, window[sectionName], allBackPanels_metal, 'ConcreteFloor_8x12.glb', ConcreteMat, 0)
                        // metal girder
                        dynamicUploaderForParts(0, window[sectionName], allBackPanels_metal, 'DividingMetall_ShedrowBarn_8.glb', MetalMat, -0.113, 0)
                        window[sectionName].porch = 8
                    }

                    // repetetive objects 
                    for (let x = 0; x < whatWidth; x++) {
                        whatStep = whatStep + 0.062;
                        positionStep -= 0.062;
                        positionStep2 -= 0.063;

                        // roof room
                        dynamicUploaderForParts(0, window[sectionName], allRoof12Parts, 'RoofShedrowBarn_RoomSide_12_1panel.glb', RoofMat, positionStep+0.063, whatStep)
                        // wall room
                        dynamicUploaderForPartsDepth(0, window[sectionName], allRoof12Parts, 'SideWallShedrowBarn_wall.glb', WallMat, positionStep+0.0635, whatStep, -0.092)
                        // metal wall room
                        dynamicUploaderForPartsDepth(0, window[sectionName], allRoof12Parts, 'SideWallShedrowBarn_metal.glb', MetalMat, positionStep2+0.0635, whatStep, -0.092)

                        switch (porch) {

                            case 12:
                                // roof porch
                                dynamicUploaderForParts(0, window[sectionName], allRoof12Parts, 'RoofShedrowBarn_PorchSide_1panel.glb', RoofMat, positionStep+0.1235, whatStep)
                                // down roof porch
                                dynamicUploaderForParts(0, window[sectionName], allRoof12Parts, 'RoofShedrowBarn_PorchSide_1panel_downpanel.glb', WallMatRoofParts, positionStep+0.062, whatStep)
                                window[sectionName].porch = 12
                            break;
                            case 8:
                                // roof porch
                                dynamicUploaderForParts(0, window[sectionName], allRoof12Parts, 'RoofShedrowBarn_PorchSide_8x4_roof.glb', RoofMat, positionStep+0.063, whatStep)
                                // down roof porch
                                dynamicUploaderForParts(0, window[sectionName], allRoof12Parts, 'RoofShedrowBarn_PorchSide_8x4_part.glb', WallMatRoofParts, positionStep+0.062, whatStep);
                                window[sectionName].porch = 8;
                            break;
                        }
                    }
                    window[sectionName].depthStatus = 12
                break;

                case 8:
                    // door
                    dynamicUploaderType1(0, window[sectionName], allBackPanels_metal, 'TitanStall_12.glb', MetalMat, 0)
                    // floor room
                    dynamicUploaderType1(0, window[sectionName], allBackPanels_metal, 'Floor_12x8.glb', FloorMat, 0)
                    // room wall inside unique  positioning for size #2 ⬇️
                    dynamicUploaderForParts(0, window[sectionName], allBackPanels_metal, 'WallSeperation_8.glb', WallMat, -0.02, 0)

                    if (porch === 12) {
                        // floor porch
                        dynamicUploaderType1(0, window[sectionName], allBackPanels_metal, 'ConcreteFloor_12x12.glb', ConcreteMat, 0)
                        // metal girder porch
                        dynamicUploaderForParts(0, window[sectionName], allBackPanels_metal, 'DividingMetall_ShedrowBarn_12.glb', MetalMat, -0.113, 0);
                        window[sectionName].porch = 12;
                    } else {
                        // floor porch
                        dynamicUploaderType1(0, window[sectionName], allBackPanels_metal, 'ConcreteFloor_8x12.glb', ConcreteMat, 0)
                        // metal girder
                        dynamicUploaderForParts(0, window[sectionName], allBackPanels_metal, 'DividingMetall_ShedrowBarn_8.glb', MetalMat, -0.113, 0);
                        window[sectionName].porch = 8;
                    }

                    // repetetive objects 
                    for (let x = 0; x <= whatWidth-1; x++) {
                        whatStep = whatStep + 0.062;
                        positionStep -= 0.062;
                        positionStep2 -= 0.063;
                        // roof room
                        dynamicUploaderForParts(0, window[sectionName], allRoof12Parts, 'RoofShedrow_RoomSide_8.glb', RoofMat, positionStep+0.0635, whatStep)
                        // wall room
                        dynamicUploaderForPartsDepth(0, window[sectionName], allRoof12Parts, 'SideWallShedrowBarn_wall.glb', WallMat, positionStep+0.0635, whatStep, -0.034)
                        // metal wall room
                        dynamicUploaderForPartsDepth(0, window[sectionName], allRoof12Parts, 'SideWallShedrowBarn_metal.glb', MetalMat, positionStep2+0.0635, whatStep, -0.034)

                        switch (porch) {

                            case 12:
                                // roof porch
                                dynamicUploaderForParts(0, window[sectionName], allRoof12Parts, 'RoofShedrowBarn_PorchSide_1panel.glb', RoofMat, positionStep+0.124, whatStep)
                                // down roof porch
                                dynamicUploaderForParts(0, window[sectionName], allRoof12Parts, 'RoofShedrowBarn_PorchSide_1panel_downpanel.glb', WallMatRoofParts, positionStep+0.062, whatStep)
                                window[sectionName].porch = 12;
                            break;
                            case 8:
                                // roof porch
                                dynamicUploaderForParts(0, window[sectionName], allRoof12Parts, 'RoofShedrowBarn_PorchSide_8x4_roof.glb', RoofMat, positionStep+0.063, whatStep)
                                // down roof porch
                                dynamicUploaderForParts(0, window[sectionName], allRoof12Parts, 'RoofShedrowBarn_PorchSide_8x4_part.glb', WallMatRoofParts,  positionStep+0.062, whatStep)
                                window[sectionName].porch = 8;
                            break;
                        }
                    }
                    window[sectionName].depthStatus = 8;
                break;
            }
            window[sectionName].sectWidth = 3; 
        break;

        case 4: 
            switch (depth)  { 
                case 16:
                    // door
                    dynamicUploaderType1(0, window[sectionName], allBackPanels_metal, 'StallFront_titan_x16.glb', MetalMat, 0)
                    // floor room
                    dynamicUploaderType1(0, window[sectionName], allBackPanels_metal, 'Floor_16x16.glb', FloorMat, 0)
                    // wall inside unique positioning for size #2 ⬇️
                    dynamicUploaderForParts(0, window[sectionName], allBackPanels_metal, 'separatedWall_16.glb', WallMat, -0.081, 0)

                    if (porch === 12) {
                        // floor porch
                        dynamicUploaderType1(0, window[sectionName], allBackPanels_metal, 'ConcreteFloor_12x16.glb', ConcreteMat, 0)
                        // metal girder porch
                        dynamicUploaderForParts(0, window[sectionName], allBackPanels_metal, 'DividingMetall_ShedrowBarn_12.glb', MetalMat, -0.173, 0.24)
                        window[sectionName].porch = 12;
                    } else {
                        // floor porch
                        dynamicUploaderType1(0, window[sectionName], allBackPanels_metal, 'ConcreteFloor_8x16.glb', ConcreteMat, 0)
                        // metal girder
                        dynamicUploaderForParts(0, window[sectionName], allBackPanels_metal, 'DividingMetall_ShedrowBarn_8.glb', MetalMat, -0.173, 0.24)
                        window[sectionName].porch = 8;
                    }

                    // repetetive objects 
                    for (let x = 0; x <= whatWidth-1; x++) {
                        whatStep = whatStep + 0.062;
                        positionStep -= 0.062;
                        positionStep2 -= 0.063;
                        // roof room
                        dynamicUploaderForParts(0, window[sectionName], allRoof12Parts, 'RoofShedrow_RoomSide_16.glb', RoofMat, positionStep+0.0635, whatStep)
                        // wall room
                        dynamicUploaderForPartsDepth(0, window[sectionName], allRoof12Parts, 'SideWallShedrowBarn_wall.glb', WallMat, positionStep+0.0635, whatStep, -0.152)
                        // metal wall room
                        dynamicUploaderForPartsDepth(0, window[sectionName], allRoof12Parts, 'SideWallShedrowBarn_metal.glb', MetalMat, positionStep2+0.0635, whatStep, -0.152)

                        switch (porch) {
                            case 12:
                                // roof porch
                                dynamicUploaderForParts(0, window[sectionName], allRoof12Parts, 'RoofShedrowBarn_PorchSide_1panel.glb', RoofMat, positionStep+0.1235, whatStep)
                                // down roof porch
                                dynamicUploaderForParts(0, window[sectionName], allRoof12Parts, 'RoofShedrowBarn_PorchSide_1panel_downpanel.glb', WallMatRoofParts, positionStep+0.062, whatStep)
                                window[sectionName].porch = 12;
                            break;
                            case 8:
                                // roof porch 
                                dynamicUploaderForParts(0, window[sectionName], allRoof12Parts, 'RoofShedrowBarn_PorchSide_8x4_roof.glb', RoofMat, positionStep+0.063, whatStep)
                                // down roof porch
                                dynamicUploaderForParts(0, window[sectionName], allRoof12Parts, 'RoofShedrowBarn_PorchSide_8x4_part.glb', WallMatRoofParts, positionStep+0.062, whatStep)
                                window[sectionName].porch = 8;
                            break;
                        }
                    }
                    window[sectionName].depthStatus = 16;
                break;

                case 12:
                    // door
                    dynamicUploaderType1(0, window[sectionName], allBackPanels_metal, 'StallFront_titan_x16.glb', MetalMat, 0)
                    // floor room
                    dynamicUploaderType1(0, window[sectionName], allBackPanels_metal, 'Floor_16x12.glb', FloorMat, 0)
                    // room wall inside unique  positioning for size #2 ⬇️
                    dynamicUploaderForParts(0, window[sectionName], allBackPanels_metal, 'WallInside.glb', WallMat, -0.081, 0)

                    if (porch === 12) {
                        // floor porch
                        dynamicUploaderType1(0, window[sectionName], allBackPanels_metal, 'ConcreteFloor_12x16.glb', ConcreteMat, 0)
                        // metal girder porch
                        dynamicUploaderForParts(0, window[sectionName], allBackPanels_metal, 'DividingMetall_ShedrowBarn_12.glb', MetalMat, -0.173, 0.24);
                        window[sectionName].porch = 12;
                    } else {
                        // floor porch
                        dynamicUploaderType1(0, window[sectionName], allBackPanels_metal, 'ConcreteFloor_8x16.glb', ConcreteMat, 0)
                        // metal girder
                        dynamicUploaderForParts(0, window[sectionName], allBackPanels_metal, 'DividingMetall_ShedrowBarn_8.glb', MetalMat, -0.173, 0.24);
                        window[sectionName].porch = 8;
                    }

                    // repetetive objects 
                    for (let x = 0; x <= whatWidth-1; x++) {
                        whatStep = whatStep + 0.062;
                        positionStep -= 0.062;
                        positionStep2 -= 0.063;
                        // roof room
                        dynamicUploaderForParts(0, window[sectionName], allRoof12Parts, 'RoofShedrowBarn_RoomSide_12_1panel.glb', RoofMat, positionStep+0.0635, whatStep)
                        // wall room
                        dynamicUploaderForPartsDepth(0, window[sectionName], allRoof12Parts, 'SideWallShedrowBarn_wall.glb', WallMat, positionStep+0.0635, whatStep, -0.092)
                        // metal wall room
                        dynamicUploaderForPartsDepth(0, window[sectionName], allRoof12Parts, 'SideWallShedrowBarn_metal.glb', MetalMat, positionStep2+0.065, whatStep, -0.092)

                        switch (porch) {
                            case 12:
                                // roof porch
                                dynamicUploaderForParts(0, window[sectionName], allRoof12Parts, 'RoofShedrowBarn_PorchSide_1panel.glb', RoofMat, positionStep+0.1235, whatStep)
                                // down roof porch
                                dynamicUploaderForParts(0, window[sectionName], allRoof12Parts, 'RoofShedrowBarn_PorchSide_1panel_downpanel.glb', WallMatRoofParts, positionStep+0.062, whatStep)
                                window[sectionName].porch = 12;
                            break;
                            case 8:
                                // roof porch
                                dynamicUploaderForParts(0, window[sectionName], allRoof12Parts, 'RoofShedrowBarn_PorchSide_8x4_roof.glb', RoofMat, positionStep+0.063, whatStep)
                                // down roof porch
                                dynamicUploaderForParts(0, window[sectionName], allRoof12Parts, 'RoofShedrowBarn_PorchSide_8x4_part.glb', WallMatRoofParts, positionStep+0.062, whatStep)
                                window[sectionName].porch = 8;
                            break;
                        }
                    }
                    window[sectionName].depthStatus = 12;
                break;

                case 8:
                    // door
                    dynamicUploaderType1(0, window[sectionName], allBackPanels_metal, 'StallFront_titan_x16.glb', MetalMat, 0)
                    // floor room
                    dynamicUploaderType1(0, window[sectionName], allBackPanels_metal, 'Floor_16x8.glb', FloorMat, 0)
                    // room wall inside unique  positioning for size #2 ⬇️
                    dynamicUploaderForParts(0, window[sectionName], allBackPanels_metal, 'WallSeperation_8.glb', WallMat, -0.081, 0)

                    if (porch === 12) {
                        // floor porch
                        dynamicUploaderType1(0, window[sectionName], allBackPanels_metal, 'ConcreteFloor_12x16.glb', ConcreteMat, 0)
                        // metal girder porch
                        dynamicUploaderForParts(0, window[sectionName], allBackPanels_metal, 'DividingMetall_ShedrowBarn_12.glb', MetalMat, -0.173, 0.24);
                        window[sectionName].porch = 12;
                    } else {
                        // floor porch
                        dynamicUploaderType1(0, window[sectionName], allBackPanels_metal, 'ConcreteFloor_8x16.glb', ConcreteMat, 0)
                        // metal girder
                        dynamicUploaderForParts(0, window[sectionName], allBackPanels_metal, 'DividingMetall_ShedrowBarn_8.glb', MetalMat, -0.173, 0.24);
                        window[sectionName].porch = 8;
                    }

                    // repetetive objects 
                    for (let x = 0; x <= whatWidth-1; x++) {
                        whatStep = whatStep + 0.062;
                        positionStep -= 0.062;
                        positionStep2 -= 0.063;
                        // roof room
                        dynamicUploaderForParts(0, window[sectionName], allRoof12Parts, 'RoofShedrow_RoomSide_8.glb', RoofMat, positionStep+0.0635, whatStep)
                        // wall room
                        dynamicUploaderForPartsDepth(0, window[sectionName], allRoof12Parts, 'SideWallShedrowBarn_wall.glb', WallMat, positionStep+0.0635, whatStep, -0.034)
                        // metal wall room
                        dynamicUploaderForPartsDepth(0, window[sectionName], allRoof12Parts, 'SideWallShedrowBarn_metal.glb', MetalMat,  positionStep2+0.0635, whatStep, -0.034)

                        switch (porch) {
                            case 12:
                                // roof porch
                                dynamicUploaderForParts(0, window[sectionName], allRoof12Parts, 'RoofShedrowBarn_PorchSide_1panel.glb', RoofMat, positionStep+0.1235, whatStep)
                                // down roof porch
                                dynamicUploaderForParts(0, window[sectionName], allRoof12Parts, 'RoofShedrowBarn_PorchSide_1panel_downpanel.glb', WallMatRoofParts, positionStep+0.062, whatStep);
                                window[sectionName].porch = 12;
                            break;
                            case 8:
                                // roof porch
                                dynamicUploaderForParts(0, window[sectionName], allRoof12Parts, 'RoofShedrowBarn_PorchSide_8x4_roof.glb', RoofMat, positionStep+0.063, whatStep)
                                // down roof porch
                                dynamicUploaderForParts(0, window[sectionName], allRoof12Parts, 'RoofShedrowBarn_PorchSide_8x4_part.glb', WallMatRoofParts, positionStep+0.062, whatStep);
                                window[sectionName].porch = 8;
                            break;
                        }
                    }
                    window[sectionName].depthStatus = 8;
                break;
            }
            window[sectionName].sectWidth = 4; 
        break; 
    } 
    scene.add(allShedrowSections[allShedrowSections.length - 1])
}



createSectionShedrow(3, 0, 'shedrowSection'+0, 12, 12);
createSectionShedrow(3, 0, 'shedrowSection'+1, 12, 12);
allShedrowSections[1].position.z -= 0.185








































// work in progress...

function generateAccepter(whatSize) {
    // 🔴 raycast accepter
    window['raycastAccepterMat'+allShedrowSections[allShedrowSections.length - 1]] = new THREE.MeshBasicMaterial({
    transparent: true, opacity: 0.5, color: 0xfdeffee,
    });
    window['raycastAccepterGeo'+allShedrowSections[allShedrowSections.length - 1]] = new THREE.BoxGeometry(0.38, 0.18, 0.18);
    window['raycastAccepterMesh'+allShedrowSections[allShedrowSections.length - 1]] = new THREE.Mesh(window['raycastAccepterGeo'+allShedrowSections[allShedrowSections.length - 1]], window['raycastAccepterMat'+allShedrowSections[allShedrowSections.length - 1]]);
    window['raycastAccepterMesh'+allShedrowSections[allShedrowSections.length - 1]].position.set(0, 0.02, -0.015);

    window['raycastAccepterMesh'+allShedrowSections[allShedrowSections.length - 1]].name = 'raycastAccepterMesh'+allShedrowSections[allShedrowSections.length - 1];

    scene.add(window['raycastAccepterMesh'+allShedrowSections[allShedrowSections.length - 1]]);

}



function cloneSectionShedrow() {

    if (allShedrowSections.length < 12) {
        
        createSectionShedrow(3, 0, 'shedrowSection'+allShedrowSections.length, allShedrowSections[allShedrowSections.length - 1].depthStatus, allShedrowSections[allShedrowSections.length - 2].porch);

        switch (allShedrowSections[allShedrowSections.length - 2].sectWidth) {
            case 2:
                allShedrowSections[allShedrowSections.length - 1].position.z = allShedrowSections[allShedrowSections.length - 2].position.z - 0.124
                rightSideElemsAttach()
            break;
            case 3:
                allShedrowSections[allShedrowSections.length - 1].position.z = allShedrowSections[allShedrowSections.length - 2].position.z - 0.186
                rightSideElemsAttach()
            break;
            case 4:
                allShedrowSections[allShedrowSections.length - 1].position.z = allShedrowSections[allShedrowSections.length - 2].position.z - 0.248
                rightSideElemsAttach()
            break;
        }
        
        changeCameraTargets()    

    } else {window.alert("Max size is Already selected!")};

}


// "Top View" to temporary hide roofs
function hideObjectsInSection() {

  
    sec1wid1Btn.style.display = "none" 
    sec1wid2Btn.style.display = "none" 
    sec1wid3Btn.style.display = "none" 

    sec2wid1Btn.style.display = "none" 
    sec2wid2Btn.style.display = "none" 
    sec2wid3Btn.style.display = "none" 

    sec3wid1Btn.style.display = "none" 
    sec3wid2Btn.style.display = "none" 
    sec3wid3Btn.style.display = "none" 

    sec4wid1Btn.style.display = "none" 
    sec4wid2Btn.style.display = "none" 
    sec4wid3Btn.style.display = "none" 

    sec5wid1Btn.style.display = "none" 
    sec5wid2Btn.style.display = "none" 
    sec5wid3Btn.style.display = "none" 

    sec6wid1Btn.style.display = "none" 
    sec6wid2Btn.style.display = "none" 
    sec6wid3Btn.style.display = "none" 

    sec7wid1Btn.style.display = "none" 
    sec7wid2Btn.style.display = "none" 
    sec7wid3Btn.style.display = "none" 

    sec8wid1Btn.style.display = "none" 
    sec8wid2Btn.style.display = "none" 
    sec8wid3Btn.style.display = "none" 

    sec9wid1Btn.style.display = "none" 
    sec9wid2Btn.style.display = "none" 
    sec9wid3Btn.style.display = "none" 

    sec10wid1Btn.style.display = "none" 
    sec10wid2Btn.style.display = "none" 
    sec10wid3Btn.style.display = "none" 

    sec11wid1Btn.style.display = "none" 
    sec11wid2Btn.style.display = "none" 
    sec11wid3Btn.style.display = "none" 

    sec12wid1Btn.style.display = "none" 
    sec12wid2Btn.style.display = "none" 
    sec12wid3Btn.style.display = "none" 
    

    for (let i = 0; i < allShedrowSections.length; i++) {
        allShedrowSections[i].traverse( function( object ) {
            // temporary workaround will fix a bit later
            for (let i = 0; i < 999; i++) {
                if ( object.material === RoofMat || object.material === WallMatRoofParts ) {
                    object.visible = false;
                }
            }
        });
    }
}
function showObjectsInSection() {


    sec1wid1Btn.style.display = "block" 
    sec1wid2Btn.style.display = "block" 
    sec1wid3Btn.style.display = "block" 

    sec2wid1Btn.style.display = "block" 
    sec2wid2Btn.style.display = "block" 
    sec2wid3Btn.style.display = "block" 

    sec3wid1Btn.style.display = "block" 
    sec3wid2Btn.style.display = "block" 
    sec3wid3Btn.style.display = "block" 

    sec4wid1Btn.style.display = "block" 
    sec4wid2Btn.style.display = "block" 
    sec4wid3Btn.style.display = "block" 

    sec5wid1Btn.style.display = "block" 
    sec5wid2Btn.style.display = "block" 
    sec5wid3Btn.style.display = "block" 

    sec6wid1Btn.style.display = "block" 
    sec6wid2Btn.style.display = "block" 
    sec6wid3Btn.style.display = "block" 

    sec7wid1Btn.style.display = "block" 
    sec7wid2Btn.style.display = "block" 
    sec7wid3Btn.style.display = "block" 

    sec8wid1Btn.style.display = "block" 
    sec8wid2Btn.style.display = "block" 
    sec8wid3Btn.style.display = "block" 

    sec9wid1Btn.style.display = "block" 
    sec9wid2Btn.style.display = "block" 
    sec9wid3Btn.style.display = "block" 

    sec10wid1Btn.style.display = "block" 
    sec10wid2Btn.style.display = "block" 
    sec10wid3Btn.style.display = "block" 

    sec11wid1Btn.style.display = "block" 
    sec11wid2Btn.style.display = "block" 
    sec11wid3Btn.style.display = "block" 

    sec12wid1Btn.style.display = "block" 
    sec12wid2Btn.style.display = "block" 
    sec12wid3Btn.style.display = "block" 

    for (let i = 0; i < allShedrowSections.length; i++) {
        allShedrowSections[i].traverse( function( object ) {
            for (let i = 0; i < 999; i++) {
                if ( object.material === RoofMat || object.material === WallMatRoofParts ) {
                    object.visible = true;
                }
            }
        });
    }
}



function sectionRemoveParts(sect, counter, partName) {

    for (let x = 0; x < counter; x++) {
        var whatToDelete = sect.getObjectByName(partName)
        sect.remove(whatToDelete);
    } 
}






// I'll merge both block in one funcion to control porch&depth a bit later

let depth_bufferReUsePrevInfoWidths = []
let depth_bufferReUsePrevInfoPositios = []
let depth_bufferReUsePrevInfoPorch = []
let depth_bufferReUsePrevInfoDepth = []
let depth_bufferReUsePrevInfoLength;

function depth_getBufferDataSection4ReCre() {
    for (let i = 0; i < allShedrowSections.length; i++) {
        depth_bufferReUsePrevInfoWidths[i] = allShedrowSections[i].sectWidth
        depth_bufferReUsePrevInfoPositios[i] = allShedrowSections[i].position.z
        depth_bufferReUsePrevInfoPorch[i] = allShedrowSections[i].porch
        depth_bufferReUsePrevInfoDepth[i] = allShedrowSections[i].depthStatus
        depth_bufferReUsePrevInfoLength = allShedrowSections.length
    }
}



function regenerateSecDepth(whatDepth) {
    for (let i = 0; i < depth_bufferReUsePrevInfoLength; i++) {
        createSectionShedrow(depth_bufferReUsePrevInfoWidths[i], '', 'shedrowSection'+i, whatDepth, depth_bufferReUsePrevInfoPorch[i]);
        
        allShedrowSections[i].position.z = depth_bufferReUsePrevInfoPositios[i]; 
    } 
}
function prepareRebuild(whatDepth, regenerateSecDepth) {
    for (let i = 0; i < allShedrowSections.length; i++) {
        scene.remove(allShedrowSections[i])
    }
    allShedrowSections = []
    regenerateSecDepth(whatDepth);
}

function changeDepthShedrow(whatDepth) {
    depth_getBufferDataSection4ReCre() 
    prepareRebuild(whatDepth, regenerateSecDepth);
}


















let bufferReUsePrevInfoWidths = []
let bufferReUsePrevInfoPositios = []
let bufferReUsePrevInfoPorch = []
let bufferReUsePrevInfoDepth = []
let bufferReUsePrevInfoLength;

function getBufferDataSection4ReCre() {
    for (let i = 0; i < allShedrowSections.length; i++) {
        bufferReUsePrevInfoWidths[i] = allShedrowSections[i].sectWidth
        bufferReUsePrevInfoPositios[i] = allShedrowSections[i].position.z
        bufferReUsePrevInfoPorch[i] = allShedrowSections[i].porch
        bufferReUsePrevInfoDepth[i] = allShedrowSections[i].depthStatus
        bufferReUsePrevInfoLength = allShedrowSections.length
    }
}

function regenerateSecPorch(whatPorch) {
    for (let i = 0; i < bufferReUsePrevInfoLength; i++) {
        createSectionShedrow(bufferReUsePrevInfoWidths[i], '', 'shedrowSection'+i, bufferReUsePrevInfoDepth[i], whatPorch);
        allShedrowSections[i].position.z = bufferReUsePrevInfoPositios[i]; 
    } 
}
function prepareRebuildPorch(whatPorch, regenerateSecPorch) {
    for (let i = 0; i < allShedrowSections.length; i++) {
        scene.remove(allShedrowSections[i])
    }
    allShedrowSections = []
    regenerateSecPorch(whatPorch);
}

function changePorchShedrow(whatPorch) {
    getBufferDataSection4ReCre()
    prepareRebuildPorch(whatPorch, regenerateSecPorch);
}


























let sectionsAfterChangedOne = new THREE.Group;
scene.add(sectionsAfterChangedOne);
let whereToPutThisSec;

let sect2testbuffer;
function changeSectionSizeShedrowIndivid(whatSection, whatSize) {

    whereToPutThisSec = allShedrowSections[whatSection].position.z;
    thisSectWidthBuffer =  allShedrowSections[whatSection].sectWidth;

    switch (whatSize) {
        case 2: 
            switch (thisSectWidthBuffer) {
                case 2:
                    window.alert('Already selected!');
                break;
                case 3:
                    allShedrowSections[whatSection].traverse( function( object ) {
                        if (object instanceof THREE.Mesh ) {
                            object.geometry.dispose();
                            object.material.dispose();
                            scene.remove(object)
                        }
                    });
                    scene.remove(allShedrowSections[whatSection]);
                    allShedrowSections.splice(whatSection, 1);
                    createSectionShedrow(whatSize, 0, 'shedrowSection'+whatSection, allShedrowSections[allShedrowSections.length - 1].depthStatus, allShedrowSections[allShedrowSections.length - 1].porch);
                    allShedrowSections.splice(whatSection, 0, allShedrowSections[allShedrowSections.length -1]);
                    allShedrowSections.pop(); 
                    for (i = whatSection+1; i < allShedrowSections.length; i++ ) { 
                        allShedrowSections[i].position.z += 0.062
                    }
                    allShedrowSections[whatSection].position.z = whereToPutThisSec
                break;
                case 4: 
                    allShedrowSections[whatSection].traverse( function( object ) {
                        if (object instanceof THREE.Mesh ) {
                            object.geometry.dispose();
                            object.material.dispose();
                            scene.remove(object)
                        }
                    });
                    scene.remove(allShedrowSections[whatSection]);
                    allShedrowSections.splice(whatSection, 1);
                    createSectionShedrow(whatSize, 0, 'shedrowSection'+whatSection, allShedrowSections[allShedrowSections.length - 1].depthStatus, allShedrowSections[allShedrowSections.length - 1].porch);
                    allShedrowSections.splice(whatSection, 0, allShedrowSections[allShedrowSections.length -1]);
                    allShedrowSections.pop(); 
                    for (i = whatSection+1; i < allShedrowSections.length; i++ ) { 
                        allShedrowSections[i].position.z += 0.124
                    }
                    allShedrowSections[whatSection].position.z = whereToPutThisSec
                break;
            }
        break;
        case 3:
            switch (thisSectWidthBuffer) {
                case 2:
                    allShedrowSections[whatSection].traverse( function( object ) {
                        if (object instanceof THREE.Mesh ) {
                            object.geometry.dispose();
                            object.material.dispose();
                            scene.remove(object)
                        }
                    });
                    scene.remove(allShedrowSections[whatSection]);
                    allShedrowSections.splice(whatSection, 1);
                    createSectionShedrow(whatSize, 0, 'shedrowSection'+whatSection, allShedrowSections[allShedrowSections.length - 1].depthStatus, allShedrowSections[allShedrowSections.length - 1].porch);
                    allShedrowSections.splice(whatSection, 0, allShedrowSections[allShedrowSections.length -1]);
                    allShedrowSections.pop(); 
                    for (i = whatSection+1; i < allShedrowSections.length; i++ ) { 
                        allShedrowSections[i].position.z -= 0.062
                    }
                    allShedrowSections[whatSection].position.z = whereToPutThisSec
                break;
                case 3:
                    window.alert('Already selected!');
                break;
                case 4:
                    allShedrowSections[whatSection].traverse( function( object ) {
                        if (object instanceof THREE.Mesh ) {
                            object.geometry.dispose();
                            object.material.dispose();
                            scene.remove(object)
                        }
                    });
                    scene.remove(allShedrowSections[whatSection]);
                    allShedrowSections.splice(whatSection, 1);
                    createSectionShedrow(whatSize, 0, 'shedrowSection'+whatSection, allShedrowSections[allShedrowSections.length - 1].depthStatus, allShedrowSections[allShedrowSections.length - 1].porch);
                    allShedrowSections.splice(whatSection, 0, allShedrowSections[allShedrowSections.length -1]);
                    allShedrowSections.pop(); 
                    for (i = whatSection+1; i < allShedrowSections.length; i++ ) { 
                        allShedrowSections[i].position.z += 0.062
                    }
                    allShedrowSections[whatSection].position.z = whereToPutThisSec
                break;
            }
        break;
        case 4:
            switch (thisSectWidthBuffer) {
                case 2:
                    allShedrowSections[whatSection].traverse( function( object ) {
                        if (object instanceof THREE.Mesh ) {
                            object.geometry.dispose();
                            object.material.dispose();
                            scene.remove(object)
                        }
                    });
                    scene.remove(allShedrowSections[whatSection]);
                    allShedrowSections.splice(whatSection, 1);
                    createSectionShedrow(whatSize, 0, 'shedrowSection'+whatSection, allShedrowSections[allShedrowSections.length - 1].depthStatus, allShedrowSections[allShedrowSections.length - 1].porch);
                    allShedrowSections.splice(whatSection, 0, allShedrowSections[allShedrowSections.length -1]);
                    allShedrowSections.pop(); 
                    for (i = whatSection+1; i < allShedrowSections.length; i++ ) { 
                        allShedrowSections[i].position.z -= 0.124
                    }
                    allShedrowSections[whatSection].position.z = whereToPutThisSec
                break;
                case 3:
                    allShedrowSections[whatSection].traverse( function( object ) {
                        if (object instanceof THREE.Mesh ) {
                            object.geometry.dispose();
                            object.material.dispose();
                            scene.remove(object)
                        }
                    });
                    scene.remove(allShedrowSections[whatSection]);
                    allShedrowSections.splice(whatSection, 1);
                    createSectionShedrow(whatSize, 0, 'shedrowSection'+whatSection, allShedrowSections[allShedrowSections.length - 1].depthStatus, allShedrowSections[allShedrowSections.length - 1].porch);
                    allShedrowSections.splice(whatSection, 0, allShedrowSections[allShedrowSections.length -1]);
                    allShedrowSections.pop(); 
                    for (i = whatSection+1; i < allShedrowSections.length; i++ ) { 
                        allShedrowSections[i].position.z -= 0.062
                    }
                    allShedrowSections[whatSection].position.z = whereToPutThisSec
                break;
                case 4: 
                    window.alert('Already selected!');
                break;
            }
        break;
    }  
    // side
    rightSideElemsAttach()
}





function rightSideElemsAttach() {
    allShedrowSections[allShedrowSections.length - 1].remove(rightRoomSideShedrow,rightPorchSideShedrow);
    allShedrowSections[allShedrowSections.length - 1].add(rightRoomSideShedrow,rightPorchSideShedrow);


    switch (allShedrowSections[allShedrowSections.length - 1].sectWidth) {
        case 2:
            rightRoomSideShedrow.position.z = 0.247
            rightPorchSideShedrow.position.z = 0.247
        break;
        case 3:
            rightRoomSideShedrow.position.z = 0.185
            rightPorchSideShedrow.position.z = 0.185
        break;
        case 4:
            rightRoomSideShedrow.position.z = 0.124
            rightPorchSideShedrow.position.z = 0.124
        break;
    } 
}

































// RayCaster Object


// User mouse catcher
let mouseX = 0;
let mouseY = 0;
let mouse = new THREE.Vector2();

const raycaster = new THREE.Raycaster();
raycaster.setFromCamera( mouse, camera );


function onPointerDown( event ) {

    //event.preventDefault();
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    raycaster.setFromCamera( mouse, camera );

    const intersects = raycaster.intersectObjects( scene.children );

    for ( var i = 0; i < intersects.length; i++ ) {

        //Object3d 1
         if ( intersects[ i ].object.id === 22) {


        }

        //Floor
         if ( intersects[ i ].object.id === 18) {
        }   

    } 
}

document.addEventListener( 'pointerdown', onPointerDown);















// left and right sides


function leftSideRoom(roofGLB, wallGLB, metalGLB) {

    leftRoomSideShedrow = new THREE.Object3D;

    dynamicUploaderType1(0, leftRoomSideShedrow, allFloor8Parts, roofGLB, RoofMat)
    dynamicUploaderType1(0, leftRoomSideShedrow, allFloor8Parts, wallGLB, WallMat )
    dynamicUploaderType1(0, leftRoomSideShedrow, allFloor8Parts, metalGLB, MetalMat)

    leftRoomSideShedrow.position.z -= 0;
    scene.add(leftRoomSideShedrow);
}

function leftSidePorch(roofGLB, wallGLB, metalGLB) {

    leftPorchSideShedrow = new THREE.Object3D;

    dynamicUploaderType1(0, leftPorchSideShedrow, allFloor8Parts, roofGLB, RoofMat)
    dynamicUploaderType1(0, leftPorchSideShedrow, allFloor8Parts, wallGLB, WallMat )
    dynamicUploaderType1(0, leftPorchSideShedrow, allFloor8Parts, metalGLB, MetalMat)

    leftPorchSideShedrow.position.z -= 0;
    scene.add(leftPorchSideShedrow); 
}

let RightStepRoom = 0
let RightStepPorch = 0

function rightSideRoom(roofGLB, wallGLB) {

    rightRoomSideShedrow = new THREE.Object3D;
    
    dynamicUploaderType1(0, rightRoomSideShedrow, allFloor8Parts, roofGLB, RoofMat)
    dynamicUploaderType1(0, rightRoomSideShedrow, allFloor8Parts, wallGLB, MetalMat)


    scene.add(rightRoomSideShedrow);
}

function rightSidePorch(roofGLB, wallGLB, metalGLB) {

    rightPorchSideShedrow = new THREE.Object3D;

    dynamicUploaderType1(0, rightPorchSideShedrow, allFloor8Parts, roofGLB, RoofMat)
    dynamicUploaderType1(0, rightPorchSideShedrow, allFloor8Parts, wallGLB, WallMat )
    dynamicUploaderType1(0, rightPorchSideShedrow, allFloor8Parts, metalGLB, MetalMat)


    scene.add(rightPorchSideShedrow);
}


function changeDepthShedrowSideRoom16() {

    scene.remove(leftRoomSideShedrow);
    leftSideRoom('LeftRoomSide_roof_16.glb', 'LeftRoomSide_wall_16.glb', 'LeftRoomSide_metal_16.glb')

    scene.remove(rightRoomSideShedrow);
    rightSideRoom('RightRoomSide_roof_16.glb', 'RightRoomSide_metal_16.glb');
    rightSideElemsAttach()
    
}

function changeDepthShedrowSideRoom12() {

    scene.remove(leftRoomSideShedrow);
    leftSideRoom('LeftRoomSide_roof_12.glb', 'LeftRoomSide_wall_12.glb', 'LeftRoomSide_metal_12.glb')

    scene.remove(rightRoomSideShedrow);
    rightSideRoom('RightRoomSide_roof_12.glb', 'RightRoomSide_metal_12.glb');
    rightSideElemsAttach()

}

function changeDepthShedrowSideRoom8() {

    scene.remove(leftRoomSideShedrow);
    leftSideRoom('LeftRoomSide_roof_8.glb', 'LeftRoomSide_wall_8.glb', 'LeftRoomSide_metal_8.glb')

    scene.remove(rightRoomSideShedrow);
    rightSideRoom('RightRoomSide_roof_8.glb', 'RightRoomSide_metal_8.glb'); 
    rightSideElemsAttach()

}

function changeDepthShedrowSidePorch8() {

    scene.remove(leftPorchSideShedrow);
    leftSidePorch('LeftPorchSide_roof_8.glb', 'LeftPorchSide_wall_8.glb', 'LeftPorchSide_metal_8.glb');

    scene.remove(rightPorchSideShedrow);
    rightSidePorch('RightPorchSide_roof_8.glb', 'RightPorchSide_wall_8.glb', 'RightPorchSide_metal_8.glb');  
    rightSideElemsAttach()
}

function changeDepthShedrowSidePorch12() {

    scene.remove(leftPorchSideShedrow);
    leftSidePorch('LeftPorchSide_roof_12.glb', 'LeftPorchSide_wall_12.glb', 'LeftPorchSide_metal_12.glb');

    scene.remove(rightPorchSideShedrow);
    rightSidePorch('RightPorchSide_roof_12.glb', 'RightPorchSide_wall_12.glb', 'RightPorchSide_metal_12.glb'); 
    rightSideElemsAttach()

}


rightSideRoom('RightRoomSide_roof_12.glb', 'RightRoomSide_metal_12.glb');
rightSidePorch('RightPorchSide_roof_12.glb', 'RightPorchSide_wall_12.glb', 'RightPorchSide_metal_12.glb');



leftSideRoom('LeftRoomSide_roof_12.glb', 'LeftRoomSide_wall_12.glb', 'LeftRoomSide_metal_12.glb');
leftSidePorch('LeftPorchSide_roof_12.glb', 'LeftPorchSide_wall_12.glb', 'LeftPorchSide_metal_12.glb');





















let lookAtShedrowDepth16Button = document.createElement("lookAtShedrowDepth16");
lookAtShedrowDepth16Button.id = "lookAtShedrowTopView_id"
lookAtShedrowDepth16Button.style.zIndex = "9"
lookAtShedrowDepth16Button.style.cursor = "pointer"
lookAtShedrowDepth16Button.style.selection = "none"
lookAtShedrowDepth16Button.style.top = "15em"
lookAtShedrowDepth16Button.style.fontSize = "0.7em"
lookAtShedrowDepth16Button.style.position = "absolute"
lookAtShedrowDepth16Button.innerHTML = "Depth section 16"
document.body.appendChild(lookAtShedrowDepth16Button)

lookAtShedrowDepth16Button.addEventListener("click", function () {
    changeDepthShedrow(16);
    changeDepthShedrowSideRoom16()
});





let lookAtShedrowDepth12Button = document.createElement("lookAtShedrowDepth12");
lookAtShedrowDepth12Button.id = "lookAtShedrowTopView_id"
lookAtShedrowDepth12Button.style.zIndex = "9"
lookAtShedrowDepth12Button.style.cursor = "pointer"
lookAtShedrowDepth12Button.style.selection = "none"
lookAtShedrowDepth12Button.style.top = "14em"
lookAtShedrowDepth12Button.style.fontSize = "0.7em"
lookAtShedrowDepth12Button.style.position = "absolute"
lookAtShedrowDepth12Button.innerHTML = "Depth section 12"
document.body.appendChild(lookAtShedrowDepth12Button)

lookAtShedrowDepth12Button.addEventListener("click", function () {
    changeDepthShedrow(12);
    changeDepthShedrowSideRoom12()
});



let lookAtShedrowDepth8Button = document.createElement("lookAtShedrowDepth8");
lookAtShedrowDepth8Button.id = "lookAtShedrowTopView_id"
lookAtShedrowDepth8Button.style.zIndex = "9"
lookAtShedrowDepth8Button.style.cursor = "pointer"
lookAtShedrowDepth8Button.style.selection = "none"
lookAtShedrowDepth8Button.style.top = "13em"
lookAtShedrowDepth8Button.style.fontSize = "0.7em"
lookAtShedrowDepth8Button.style.position = "absolute"
lookAtShedrowDepth8Button.innerHTML = "Depth section 8"
document.body.appendChild(lookAtShedrowDepth8Button)

lookAtShedrowDepth8Button.addEventListener("click", function () {
    changeDepthShedrow(8);
    changeDepthShedrowSideRoom8()
});






























// HTML buttons for testing

let addButton = document.createElement("add");
addButton.id = "addButton_id"
addButton.style.zIndex = "9"
addButton.style.cursor = "pointer"
addButton.style.selection = "none"
addButton.style.top = "0"
addButton.style.fontSize = "1em"
addButton.style.position = "absolute"
addButton.innerHTML = "+"
document.body.appendChild(addButton)
addButton.addEventListener("click", function () {
cloneSectionShedrow();
});


let removeButton = document.createElement("remove");
removeButton.id = "removeButton_id"
removeButton.style.zIndex = "9"
removeButton.style.top = "0"
removeButton.style.left = "2em"
removeButton.style.fontSize = "1m"
removeButton.style.position = "absolute"
removeButton.style.cursor = "pointer"
removeButton.style.selection = "none"
removeButton.innerHTML = "-"
document.body.appendChild(removeButton)
//section remover
removeButton.addEventListener("click", function () {

    if (allShedrowSections.length > 2) {

        allShedrowSections[allShedrowSections.length - 1].traverse( function( object ) {
            if (object instanceof THREE.Mesh ) {
                object.geometry.dispose();
                object.material.dispose();
                scene.remove(object)
            }
        });

        scene.remove(allShedrowSections[allShedrowSections.length - 1]);
    
        allShedrowSections[allShedrowSections.length - 1]--;
        changeCameraTargets();

        allShedrowSections.pop(allShedrowSections.length);
        

        switch (sectionShedrowWidth) {
            case 2: 
                rightRoomSideShedrow.position.z +=0.124;
                rightPorchSideShedrow.position.z +=0.124;
            break;
            
            case 3: 
                rightRoomSideShedrow.position.z +=0.185;
                rightPorchSideShedrow.position.z +=0.185;
            break;
    
            case 4:  
                rightRoomSideShedrow.position.z +=0.247;
                rightPorchSideShedrow.position.z +=0.247;
            break;
        }

        rightSideElemsAttach()
        
    } else {window.alert("Min size is Already selected!")};  
    
});




let decreasePorchSizeButton = document.createElement("decreasePorchSize");
decreasePorchSizeButton.id = "decreasePorchSize_id"
decreasePorchSizeButton.style.zIndex = "9"
decreasePorchSizeButton.style.cursor = "pointer"
decreasePorchSizeButton.style.selection = "none"
decreasePorchSizeButton.style.top = "5em"
decreasePorchSizeButton.style.fontSize = "0.7em"
decreasePorchSizeButton.style.position = "absolute"
decreasePorchSizeButton.innerHTML ="Porch Side 8"
document.body.appendChild(decreasePorchSizeButton)
decreasePorchSizeButton.addEventListener("click", function () {
    changePorchShedrow(8);
    changeDepthShedrowSidePorch8()
});


let increasePorchSizeButton = document.createElement("increasePorchSize");
increasePorchSizeButton.id = "increasePorchSize_id"
increasePorchSizeButton.style.zIndex = "9"
increasePorchSizeButton.style.cursor = "pointer"
increasePorchSizeButton.style.selection = "none"
increasePorchSizeButton.style.top = "3em"
increasePorchSizeButton.style.fontSize = "0.7em"
increasePorchSizeButton.style.position = "absolute"
increasePorchSizeButton.innerHTML = "Porch Side 12"
document.body.appendChild(increasePorchSizeButton)
increasePorchSizeButton.addEventListener("click", function () {
    changePorchShedrow(12);
    changeDepthShedrowSidePorch12()
});














let topViewStatus = 0;
// Top view  
let lookAtShedrowTopViewButton = document.createElement("lookAtShedrowTopView");
lookAtShedrowTopViewButton.style.zIndex = "9"
lookAtShedrowTopViewButton.style.cursor = "pointer"
lookAtShedrowTopViewButton.style.selection = "none"
lookAtShedrowTopViewButton.style.bottom = "1em"

lookAtShedrowTopViewButton.style.fontSize = "0.7em"
lookAtShedrowTopViewButton.style.position = "absolute"
lookAtShedrowTopViewButton.innerHTML = "Top View"
document.body.appendChild(lookAtShedrowTopViewButton)
lookAtShedrowTopViewButton.addEventListener("click", function () {

    if ( topViewStatus === 0) {
        var cameraTopView = new TWEEN.Tween(controls.object.position).to({ x: 0, y: 2, z: 0 }, 1000).easing(TWEEN.Easing.Quadratic.Out).delay(0).start().onComplete(() => {
            controls.maxPolarAngle = Math.PI / 100;
        });
        camera.rotation.x = 90;
        topViewStatus = 1
        hideObjectsInSection();
    } else {
        controls.maxPolarAngle = Math.PI / 2;
        var cameraTopViewReturn2 = new TWEEN.Tween(camera.position).to({ x: 1.5, y: 0.3, z: 1.5 }, 1000).easing(TWEEN.Easing.Quadratic.Out).delay(0).start()
        topViewStatus = 0
        showObjectsInSection();
    }

});





















let sec1wid1Btn = document.createElement("sec1wid1");
sec1wid1Btn.style.cursor = "pointer"
sec1wid1Btn.style.selection = "none"
sec1wid1Btn.style.right = "1em"
sec1wid1Btn.style.top = "1em"
sec1wid1Btn.style.fontSize = "0.5em"
sec1wid1Btn.style.position = "absolute"
sec1wid1Btn.innerHTML = "1 w1"
document.body.appendChild(sec1wid1Btn)
sec1wid1Btn.addEventListener("click", function () {
    changeSectionSizeShedrowIndivid(0,2)
});

let sec1wid2Btn = document.createElement("sec1wid2");
sec1wid2Btn.style.cursor = "pointer"
sec1wid2Btn.style.selection = "none"
sec1wid2Btn.style.right = "1em"
sec1wid2Btn.style.top = "2em"
sec1wid2Btn.style.fontSize = "0.5em"
sec1wid2Btn.style.position = "absolute"
sec1wid2Btn.innerHTML = "1 w2"
document.body.appendChild(sec1wid2Btn)
sec1wid2Btn.addEventListener("click", function () {
    changeSectionSizeShedrowIndivid(0,3)
});



let sec1wid3Btn = document.createElement("sec1wid3");
sec1wid3Btn.style.cursor = "pointer"
sec1wid3Btn.style.selection = "none"
sec1wid3Btn.style.right = "1em"
sec1wid3Btn.style.top = "3em"
sec1wid3Btn.style.fontSize = "0.5em"
sec1wid3Btn.style.position = "absolute"
sec1wid3Btn.innerHTML = "1 w3"
document.body.appendChild(sec1wid3Btn)
sec1wid3Btn.addEventListener("click", function () {
    changeSectionSizeShedrowIndivid(0,4)
});










let sec2wid1Btn = document.createElement("sec2wid1");
sec2wid1Btn.style.cursor = "pointer"
sec2wid1Btn.style.selection = "none"
sec2wid1Btn.style.right = "1em"
sec2wid1Btn.style.top = "4em"
sec2wid1Btn.style.fontSize = "0.5em"
sec2wid1Btn.style.position = "absolute"
sec2wid1Btn.innerHTML = "2 w1"
document.body.appendChild(sec2wid1Btn)
sec2wid1Btn.addEventListener("click", function () {
    changeSectionSizeShedrowIndivid(1,2)
});

let sec2wid2Btn = document.createElement("sec2wid2");
sec2wid2Btn.style.cursor = "pointer"
sec2wid2Btn.style.selection = "none"
sec2wid2Btn.style.right = "1em"
sec2wid2Btn.style.top = "5em"
sec2wid2Btn.style.fontSize = "0.5em"
sec2wid2Btn.style.position = "absolute"
sec2wid2Btn.innerHTML = "2 w2"
document.body.appendChild(sec2wid2Btn)
sec2wid2Btn.addEventListener("click", function () {
    changeSectionSizeShedrowIndivid(1,3)
});

let sec2wid3Btn = document.createElement("sec2wid3");
sec2wid3Btn.style.cursor = "pointer"
sec2wid3Btn.style.selection = "none"
sec2wid3Btn.style.right = "1em"
sec2wid3Btn.style.top = "6em"
sec2wid3Btn.style.fontSize = "0.5em"
sec2wid3Btn.style.position = "absolute"
sec2wid3Btn.innerHTML = "2 w3"
document.body.appendChild(sec2wid3Btn)
sec2wid3Btn.addEventListener("click", function () {
    changeSectionSizeShedrowIndivid(1,4)
});





let sec3wid1Btn = document.createElement("sec3wid1");
sec3wid1Btn.style.cursor = "pointer"
sec3wid1Btn.style.selection = "none"
sec3wid1Btn.style.right = "1em"
sec3wid1Btn.style.top = "7em"
sec3wid1Btn.style.fontSize = "0.5em"
sec3wid1Btn.style.position = "absolute"
sec3wid1Btn.innerHTML = "3 w1"
document.body.appendChild(sec3wid1Btn)
sec3wid1Btn.addEventListener("click", function () {
    changeSectionSizeShedrowIndivid(2,2)
});

let sec3wid2Btn = document.createElement("sec3wid2");
sec3wid2Btn.style.cursor = "pointer"
sec3wid2Btn.style.selection = "none"
sec3wid2Btn.style.right = "1em"
sec3wid2Btn.style.top = "8em"
sec3wid2Btn.style.fontSize = "0.5em"
sec3wid2Btn.style.position = "absolute"
sec3wid2Btn.innerHTML = "3 w2"
document.body.appendChild(sec3wid2Btn)
sec3wid2Btn.addEventListener("click", function () {
    changeSectionSizeShedrowIndivid(2,3)
});

let sec3wid3Btn = document.createElement("sec3wid3");
sec3wid3Btn.style.cursor = "pointer"
sec3wid3Btn.style.selection = "none"
sec3wid3Btn.style.right = "1em"
sec3wid3Btn.style.top = "9em"
sec3wid3Btn.style.fontSize = "0.5em"
sec3wid3Btn.style.position = "absolute"
sec3wid3Btn.innerHTML = "3 w3"
document.body.appendChild(sec3wid3Btn)
sec3wid3Btn.addEventListener("click", function () {
    changeSectionSizeShedrowIndivid(2,4)
})








let sec4wid1Btn = document.createElement("sec4wid1");
sec4wid1Btn.style.cursor = "pointer"
sec4wid1Btn.style.selection = "none"
sec4wid1Btn.style.right = "1em"
sec4wid1Btn.style.top = "10em"
sec4wid1Btn.style.fontSize = "0.5em"
sec4wid1Btn.style.position = "absolute"
sec4wid1Btn.innerHTML = "4 w1"
document.body.appendChild(sec4wid1Btn)
sec4wid1Btn.addEventListener("click", function () {
    changeSectionSizeShedrowIndivid(3,2)
});

let sec4wid2Btn = document.createElement("sec4wid2");
sec4wid2Btn.style.cursor = "pointer"
sec4wid2Btn.style.selection = "none"
sec4wid2Btn.style.right = "1em"
sec4wid2Btn.style.top = "11em"
sec4wid2Btn.style.fontSize = "0.5em"
sec4wid2Btn.style.position = "absolute"
sec4wid2Btn.innerHTML = "4 w2"
document.body.appendChild(sec4wid2Btn)
sec4wid2Btn.addEventListener("click", function () {
    changeSectionSizeShedrowIndivid(3,3)
});

let sec4wid3Btn = document.createElement("sec4wid3");
sec4wid3Btn.style.cursor = "pointer"
sec4wid3Btn.style.selection = "none"
sec4wid3Btn.style.right = "1em"
sec4wid3Btn.style.top = "12em"
sec4wid3Btn.style.fontSize = "0.5em"
sec4wid3Btn.style.position = "absolute"
sec4wid3Btn.innerHTML = "4 w3"
document.body.appendChild(sec4wid3Btn)
sec4wid3Btn.addEventListener("click", function () {
    changeSectionSizeShedrowIndivid(3,4)
})




let sec5wid1Btn = document.createElement("sec5wid1");
sec5wid1Btn.style.cursor = "pointer"
sec5wid1Btn.style.selection = "none"
sec5wid1Btn.style.right = "1em"
sec5wid1Btn.style.top = "13em"
sec5wid1Btn.style.fontSize = "0.5em"
sec5wid1Btn.style.position = "absolute"
sec5wid1Btn.innerHTML = "5 w1"
document.body.appendChild(sec5wid1Btn)
sec5wid1Btn.addEventListener("click", function () {
    changeSectionSizeShedrowIndivid(4,2)
});

let sec5wid2Btn = document.createElement("sec5wid2");
sec5wid2Btn.style.cursor = "pointer"
sec5wid2Btn.style.selection = "none"
sec5wid2Btn.style.right = "1em"
sec5wid2Btn.style.top = "14em"
sec5wid2Btn.style.fontSize = "0.5em"
sec5wid2Btn.style.position = "absolute"
sec5wid2Btn.innerHTML = "5 w2"
document.body.appendChild(sec5wid2Btn)
sec5wid2Btn.addEventListener("click", function () {
    changeSectionSizeShedrowIndivid(4,3)
});

let sec5wid3Btn = document.createElement("sec5wid3");
sec5wid3Btn.style.cursor = "pointer"
sec5wid3Btn.style.selection = "none"
sec5wid3Btn.style.right = "1em"
sec5wid3Btn.style.top = "15em"
sec5wid3Btn.style.fontSize = "0.5em"
sec5wid3Btn.style.position = "absolute"
sec5wid3Btn.innerHTML = "5 w3"
document.body.appendChild(sec5wid3Btn)
sec5wid3Btn.addEventListener("click", function () {
    changeSectionSizeShedrowIndivid(4,4)
})




let sec6wid1Btn = document.createElement("sec6wid1");
sec6wid1Btn.style.cursor = "pointer"
sec6wid1Btn.style.selection = "none"
sec6wid1Btn.style.right = "1em"
sec6wid1Btn.style.top = "16em"
sec6wid1Btn.style.fontSize = "0.5em"
sec6wid1Btn.style.position = "absolute"
sec6wid1Btn.innerHTML = "6 w1"
document.body.appendChild(sec6wid1Btn)
sec6wid1Btn.addEventListener("click", function () {
    changeSectionSizeShedrowIndivid(5,2)
});

let sec6wid2Btn = document.createElement("sec6wid2");
sec6wid2Btn.style.cursor = "pointer"
sec6wid2Btn.style.selection = "none"
sec6wid2Btn.style.right = "1em"
sec6wid2Btn.style.top = "17em"
sec6wid2Btn.style.fontSize = "0.5em"
sec6wid2Btn.style.position = "absolute"
sec6wid2Btn.innerHTML = "6 w2"
document.body.appendChild(sec6wid2Btn)
sec6wid2Btn.addEventListener("click", function () {
    changeSectionSizeShedrowIndivid(5,3)
});

let sec6wid3Btn = document.createElement("sec6wid3");
sec6wid3Btn.style.cursor = "pointer"
sec6wid3Btn.style.selection = "none"
sec6wid3Btn.style.right = "1em"
sec6wid3Btn.style.top = "18em"
sec6wid3Btn.style.fontSize = "0.5em"
sec6wid3Btn.style.position = "absolute"
sec6wid3Btn.innerHTML = "6 w3"
document.body.appendChild(sec6wid3Btn)
sec6wid3Btn.addEventListener("click", function () {
    changeSectionSizeShedrowIndivid(5,4)
})






let sec7wid1Btn = document.createElement("sec7wid1");
sec7wid1Btn.style.cursor = "pointer"
sec7wid1Btn.style.selection = "none"
sec7wid1Btn.style.right = "1em"
sec7wid1Btn.style.top = "19em"
sec7wid1Btn.style.fontSize = "0.5em"
sec7wid1Btn.style.position = "absolute"
sec7wid1Btn.innerHTML = "7 w1"
document.body.appendChild(sec7wid1Btn)
sec7wid1Btn.addEventListener("click", function () {
    changeSectionSizeShedrowIndivid(6,2)
});

let sec7wid2Btn = document.createElement("sec7wid2");
sec7wid2Btn.style.cursor = "pointer"
sec7wid2Btn.style.selection = "none"
sec7wid2Btn.style.right = "1em"
sec7wid2Btn.style.top = "20em"
sec7wid2Btn.style.fontSize = "0.5em"
sec7wid2Btn.style.position = "absolute"
sec7wid2Btn.innerHTML = "7 w2"
document.body.appendChild(sec7wid2Btn)
sec7wid2Btn.addEventListener("click", function () {
    changeSectionSizeShedrowIndivid(6,3)
});

let sec7wid3Btn = document.createElement("sec7wid3");
sec7wid3Btn.style.cursor = "pointer"
sec7wid3Btn.style.selection = "none"
sec7wid3Btn.style.right = "1em"
sec7wid3Btn.style.top = "21em"
sec7wid3Btn.style.fontSize = "0.5em"
sec7wid3Btn.style.position = "absolute"
sec7wid3Btn.innerHTML = "7 w3"
document.body.appendChild(sec7wid3Btn)
sec7wid3Btn.addEventListener("click", function () {
    changeSectionSizeShedrowIndivid(6,4)
})







let sec8wid1Btn = document.createElement("sec8wid1");
sec8wid1Btn.style.cursor = "pointer"
sec8wid1Btn.style.selection = "none"
sec8wid1Btn.style.right = "1em"
sec8wid1Btn.style.top = "22em"
sec8wid1Btn.style.fontSize = "0.5em"
sec8wid1Btn.style.position = "absolute"
sec8wid1Btn.innerHTML = "8 w1"
document.body.appendChild(sec8wid1Btn)
sec8wid1Btn.addEventListener("click", function () {
    changeSectionSizeShedrowIndivid(7,2)
});

let sec8wid2Btn = document.createElement("sec8wid2");
sec8wid2Btn.style.cursor = "pointer"
sec8wid2Btn.style.selection = "none"
sec8wid2Btn.style.right = "1em"
sec8wid2Btn.style.top = "23em"
sec8wid2Btn.style.fontSize = "0.5em"
sec8wid2Btn.style.position = "absolute"
sec8wid2Btn.innerHTML = "8 w2"
document.body.appendChild(sec8wid2Btn)
sec8wid2Btn.addEventListener("click", function () {
    changeSectionSizeShedrowIndivid(7,3)
});

let sec8wid3Btn = document.createElement("sec8wid3");
sec8wid3Btn.style.cursor = "pointer"
sec8wid3Btn.style.selection = "none"
sec8wid3Btn.style.right = "1em"
sec8wid3Btn.style.top = "24em"
sec8wid3Btn.style.fontSize = "0.5em"
sec8wid3Btn.style.position = "absolute"
sec8wid3Btn.innerHTML = "8 w3"
document.body.appendChild(sec8wid3Btn)
sec8wid3Btn.addEventListener("click", function () {
    changeSectionSizeShedrowIndivid(7,4)
})








let sec9wid1Btn = document.createElement("sec9wid1");
sec9wid1Btn.style.cursor = "pointer"
sec9wid1Btn.style.selection = "none"
sec9wid1Btn.style.right = "1em"
sec9wid1Btn.style.top = "25em"
sec9wid1Btn.style.fontSize = "0.5em"
sec9wid1Btn.style.position = "absolute"
sec9wid1Btn.innerHTML = "9 w1"
document.body.appendChild(sec9wid1Btn)
sec9wid1Btn.addEventListener("click", function () {
    changeSectionSizeShedrowIndivid(8,2)
});

let sec9wid2Btn = document.createElement("sec9wid2");
sec9wid2Btn.style.cursor = "pointer"
sec9wid2Btn.style.selection = "none"
sec9wid2Btn.style.right = "1em"
sec9wid2Btn.style.top = "26em"
sec9wid2Btn.style.fontSize = "0.5em"
sec9wid2Btn.style.position = "absolute"
sec9wid2Btn.innerHTML = "9 w2"
document.body.appendChild(sec9wid2Btn)
sec9wid2Btn.addEventListener("click", function () {
    changeSectionSizeShedrowIndivid(8,3)
});

let sec9wid3Btn = document.createElement("sec9wid3");
sec9wid3Btn.style.cursor = "pointer"
sec9wid3Btn.style.selection = "none"
sec9wid3Btn.style.right = "1em"
sec9wid3Btn.style.top = "27em"
sec9wid3Btn.style.fontSize = "0.5em"
sec9wid3Btn.style.position = "absolute"
sec9wid3Btn.innerHTML = "9 w3"
document.body.appendChild(sec9wid3Btn)
sec9wid3Btn.addEventListener("click", function () {
    changeSectionSizeShedrowIndivid(8,4)
})








let sec10wid1Btn = document.createElement("sec10wid1");
sec10wid1Btn.style.cursor = "pointer"
sec10wid1Btn.style.selection = "none"
sec10wid1Btn.style.right = "1em"
sec10wid1Btn.style.top = "28em"
sec10wid1Btn.style.fontSize = "0.5em"
sec10wid1Btn.style.position = "absolute"
sec10wid1Btn.innerHTML = "10 w1"
document.body.appendChild(sec10wid1Btn)
sec10wid1Btn.addEventListener("click", function () {
    changeSectionSizeShedrowIndivid(9,2)
});

let sec10wid2Btn = document.createElement("sec10wid2");
sec10wid2Btn.style.cursor = "pointer"
sec10wid2Btn.style.selection = "none"
sec10wid2Btn.style.right = "1em"
sec10wid2Btn.style.top = "29em"
sec10wid2Btn.style.fontSize = "0.5em"
sec10wid2Btn.style.position = "absolute"
sec10wid2Btn.innerHTML = "10 w2"
document.body.appendChild(sec10wid2Btn)
sec10wid2Btn.addEventListener("click", function () {
    changeSectionSizeShedrowIndivid(9,3)
});

let sec10wid3Btn = document.createElement("sec10wid3");
sec10wid3Btn.style.cursor = "pointer"
sec10wid3Btn.style.selection = "none"
sec10wid3Btn.style.right = "1em"
sec10wid3Btn.style.top = "30em"
sec10wid3Btn.style.fontSize = "0.5em"
sec10wid3Btn.style.position = "absolute"
sec10wid3Btn.innerHTML = "10 w3"
document.body.appendChild(sec10wid3Btn)
sec10wid3Btn.addEventListener("click", function () {
    changeSectionSizeShedrowIndivid(9,4)
})








let sec11wid1Btn = document.createElement("sec11wid1");
sec11wid1Btn.style.cursor = "pointer"
sec11wid1Btn.style.selection = "none"
sec11wid1Btn.style.right = "1em"
sec11wid1Btn.style.top = "31em"
sec11wid1Btn.style.fontSize = "0.5em"
sec11wid1Btn.style.position = "absolute"
sec11wid1Btn.innerHTML = "11 w1"
document.body.appendChild(sec11wid1Btn)
sec11wid1Btn.addEventListener("click", function () {
    changeSectionSizeShedrowIndivid(10,2)
});

let sec11wid2Btn = document.createElement("sec11wid2");
sec11wid2Btn.style.cursor = "pointer"
sec11wid2Btn.style.selection = "none"
sec11wid2Btn.style.right = "1em"
sec11wid2Btn.style.top = "32em"
sec11wid2Btn.style.fontSize = "0.5em"
sec11wid2Btn.style.position = "absolute"
sec11wid2Btn.innerHTML = "11 w2"
document.body.appendChild(sec11wid2Btn)
sec11wid2Btn.addEventListener("click", function () {
    changeSectionSizeShedrowIndivid(10,3)
});

let sec11wid3Btn = document.createElement("sec11wid3");
sec11wid3Btn.style.cursor = "pointer"
sec11wid3Btn.style.selection = "none"
sec11wid3Btn.style.right = "1em"
sec11wid3Btn.style.top = "33em"
sec11wid3Btn.style.fontSize = "0.5em"
sec11wid3Btn.style.position = "absolute"
sec11wid3Btn.innerHTML = "11 w3"
document.body.appendChild(sec11wid3Btn)
sec11wid3Btn.addEventListener("click", function () {
    changeSectionSizeShedrowIndivid(10,4)
})








let sec12wid1Btn = document.createElement("sec12wid1");
sec12wid1Btn.style.cursor = "pointer"
sec12wid1Btn.style.selection = "none"
sec12wid1Btn.style.right = "1em"
sec12wid1Btn.style.top = "34em"
sec12wid1Btn.style.fontSize = "0.5em"
sec12wid1Btn.style.position = "absolute"
sec12wid1Btn.innerHTML = "12 w1"
document.body.appendChild(sec12wid1Btn)
sec12wid1Btn.addEventListener("click", function () {
    changeSectionSizeShedrowIndivid(11,2)
});

let sec12wid2Btn = document.createElement("sec12wid2");
sec12wid2Btn.style.cursor = "pointer"
sec12wid2Btn.style.selection = "none"
sec12wid2Btn.style.right = "1em"
sec12wid2Btn.style.top = "35em"
sec12wid2Btn.style.fontSize = "0.5em"
sec12wid2Btn.style.position = "absolute"
sec12wid2Btn.innerHTML = "12 w2"
document.body.appendChild(sec12wid2Btn)
sec12wid2Btn.addEventListener("click", function () {
    changeSectionSizeShedrowIndivid(11,3)
});

let sec12wid3Btn = document.createElement("sec12wid3");
sec12wid3Btn.style.cursor = "pointer"
sec12wid3Btn.style.selection = "none"
sec12wid3Btn.style.right = "1em"
sec12wid3Btn.style.top = "36em"
sec12wid3Btn.style.fontSize = "0.5em"
sec12wid3Btn.style.position = "absolute"
sec12wid3Btn.innerHTML = "12 w3"
document.body.appendChild(sec12wid3Btn)
sec12wid3Btn.addEventListener("click", function () {
    changeSectionSizeShedrowIndivid(11,4)
})

















function animate() {
    requestAnimationFrame(animate)
    controls.update(); 
    TWEEN.update();
    renderer.render(scene, camera)
}

animate()
