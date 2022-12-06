(function() {

var App = function(canvasId) {
    return this.init(canvasId); 
};


var Utils = {
    PI_HALF: Math.PI / 2,
    PI_180: Math.PI / 180,
    isWebGLSupported: function(canvas) {
        var glContextNames = ['webgl', 'experimental-webgl'];
        for (var i = 0; i < glContextNames.length; i++) {
            try {
                if (canvas.getContext(glContextNames[i]) !== null && !!window.WebGLRenderingContext) {
                    return true;
                }
            } catch(e) {}
        }
        return false;
    },
};


App.prototype = {
    showFps: false,
    showWorldAxis: false,
    antialias: true,
    fov: 70,
    sceneSize: 2000,
    cameraInitialPosition: [-2173, 3130, -3388],
    assetsPath: 'assets/',
    distanceBetweenShelvesMin: 200,
    roomSizeMin: 50000,
    roomSizeStep: 100,
    roomHeightMax: 5000,
    roomWidthMax: 10000,
    roomLengthMax: 20000,
    sectionsNumMax: 5,
    shelvesNumMax: 20,
    distanceFromFloorMin: 0,
    distanceFromFloorMax: 0,
    distanceFromFloorStep: 1,
    distanceFromTopMin: 0,
    distanceFromTopMax: 0,
    distanceFromTopStep: 1,
    pillarThicknessMin: 5,
    pillarThicknessMax: 100,
    pillarThicknessStep: 1,
    pillarHeightMin: 1000,
    pillarHeightMax: 4000,
    pillarHeightStep: 1,
    shelfThicknessMin: 5,
    shelfThicknessMax: 100,
    shelfThicknessStep: 1,
    shelfWidthMin: 100,
    shelfWidthMax: 1000,
    shelfWidthStep: 1,
    shelfLengthMin: 350,
    shelfLengthMax: 2000,
    shelfLengthStep: 1,
    roomSizeTextureStep: 100,
    floorTextureRepeatXPerStep: 0.2,
    floorTextureRepeatYPerStep: 0.2,
    wallTextureRepeatXPerStep: 0.25,
    wallTextureRepeatYPerStep: 0.25,
    
    boardTextureStep: 1000,
    boardTextureRepeatXPerStep: 2,
    boardTextureRepeatYPerStep: 1,

    currency: '£',
    output: {
        quantity: '',
        pillarsQuantity: '',
        shelvingQuantity: '',
        price: '',
        pillarsPrice: '',
        shelvingPrice: '',
    },
    textures: [
        {
            name: 'Beech',
            src: 'beech.jpg',
            price: 295,
            map: null
        },
        {
            name: 'Birch',
            src: '02black.jpg',
            price: 184,
            map: null
        },
        {
            name: 'White1',
            src: '01white.jpg',
            price: 276,
            map: null
        },
        {
            name: '84V_WoodTexture4',
            src: '84V_WoodTexture4.jpg',
            price: 221,
            map: null
        },
        {
            name: '75V_WoodTexture6',
            src: 'cherry.jpg',
            price: 221,
            map: null
        },
        {
            name: '5AR_woodTexture1',
            src: '5AR_woodTexture1.jpg',
            price: 221,
            map: null
        },
        {
            name: '231AT_WoodTexture3.jpg',
            src: '231AT_WoodTexture3.jpg',
            price: 154,
            map: null
        },
        
        {
            name: '06F_ConcreteTexture2',
            src: '06F_ConcreteTexture2.jpg',
            price: 84,
            map: null
        },
        {
            name: '03gray',
            src: '03gray.jpg',
            price: 154,
            map: null
        },
        {
            name: '04beige',
            src: '04beige.jpg',
            price: 154,
            map: null
        },
        {
            name: '05light_gray',
            src: '05light_gray.jpg',
            price: 154,
            map: null
        },
        {
            name: '98Q',
            src: '98Q.jpg',
            price: 154,
            map: null
        },
    ],

    options: {
        room: {
            height: 23400,
            length: 110000,
            width: 2000
        },
        floor: {
            color: '#AAAAAA',
            texture: 'floor-carpeting.jpg'
        },        
        wall: {
            color: '#ffffff',
            texture: '98Q_icon.png'
        },
        
        shelvesNum: 2,
        sectionsNum: 1,
        distanceFromFloor: 0,
        distanceFromTop: 0,
        distanceBetweenShelves: 0,

        pillar: {
            thickness: 30,
            height: 1500,
            color: '#fdfdfd',
            texture: 3 // an index in this.textures array
        },
        shelf: {
            length: 700,
            width: 350,
            thickness: 30,
            color: '#fdfdfd',
            texture: 3 // an index in this.textures array
        },

        shelvesNumOnDemand: 0,
        distanceBetweenShelvesOnDemand: 400,

        shelvesNumOnDemand_section2: 0,
        distanceBetweenShelvesOnDemand_section2: 400,

        pillar1Position: 0,
        wasChangedSectionsLengthOrNot: 0,
        amountOfSections: 1,
        section1Length: 700,
        section2Length: 0,
        section3Length: 0,

        shelfOnDemand_0_1_State: 0,
        shelfOnDemand_0_2_State: 0,
        shelfOnDemand_0_3_State: 0,
        shelfOnDemand_0_4_State: 0,
        shelfOnDemand_0_5_State: 0,

        shelfOnDemand_section2_0_1_State: 0,
        shelfOnDemand_section2_0_2_State: 0,
        shelfOnDemand_section2_0_3_State: 0,
        shelfOnDemand_section2_0_4_State: 0,
        shelfOnDemand_section2_0_5_State: 0,

    },









    objectsOptions: {
       /*  'Doors1': {path: 'Doors1/', scale: [10, 10, 10], offset: [0, 0, 0], rotation: [0, 0, 0]}, */
        /* 'Doors2': {path: 'Doors2/', scale: [10, 10, 10], offset: [0, 0, 0], rotation: [0, 0, 0]},
        'Handle1': {path: 'Handle1/', scale: [10, 10, 10], offset: [-330, 800, 0], rotation: [0, 0, 0]}, */
       /*  'Handle1_2': {path: 'Handle1_2/', scale: [10, 10, 10], offset: [0, 800, 0], rotation: [0, 0, 0]},
        'Handle2': {path: 'Handle2/', scale: [5, 5, 5], offset: [-330, 800, 0], rotation: [0, 0, 0]},
        'Handle2_2': {path: 'Handle2_2/', scale: [5, 5, 5], offset: [0, 800, 0], rotation: [0, 0, 0]},
        'Handle3': {path: 'Handle3/', scale: [5, 5, 5], offset: [-330, 800, 0], rotation: [0, 0, 0]},
        'Handle3_2': {path: 'Handle3_2/', scale: [5, 5, 5], offset: [0, 800, 0], rotation: [0, 0, 0]},
        'Handle4': {path: 'Handle4/', scale: [5, 5, 5], offset: [-330, 800, 0], rotation: [0, 0, 0]},
        'Handle4_2': {path: 'Handle4_2/', scale: [5, 5, 5], offset: [0, 800, 0], rotation: [0, 0, 0]},
        'Handle5': {path: 'Handle5/', scale: [5, 5, 5], offset: [-330, 800, 0], rotation: [0, 0, 0]},
        'Handle5_2': {path: 'Handle5_2/', scale: [5, 5, 5], offset: [0, 800, 0], rotation: [0, 0, 0]},
        'Handle6': {path: 'Handle6/', scale: [5, 5, 5], offset: [-330, 800, 0], rotation: [0, 0, 0]},
        'Handle6_2': {path: 'Handle6_2/', scale: [5, 5, 5], offset: [0, 800, 0], rotation: [0, 0, 0]},
        'Handle7': {path: 'Handle7/', scale: [5, 5, 5], offset: [-330, 800, 0], rotation: [0, 0, 0]},
        'Handle7_2': {path: 'Handle7_2/', scale: [5, 5, 5], offset: [0, 800, 0], rotation: [0, 0, 0]},
        'Handle8': {path: 'Handle8/', scale: [5, 5, 5], offset: [-330, 800, 0], rotation: [0, 0, 0]},
        'Handle8_2': {path: 'Handle8_2/', scale: [5, 5, 5], offset: [0, 800, 0], rotation: [0, 0, 0]},
        'Handle9': {path: 'Handle9/', scale: [5, 5, 5], offset: [-280, 800, 0], rotation: [0, 0, 0]},
        'Handle9_2': {path: 'Handle9_2/', scale: [5, 5, 5], offset: [0, 800, 0], rotation: [0, 0, 0]}, */
        'Fitting3': {path: 'Fitting3/', scale: [10, 10, 10], offset: [200, 0, -250], rotation: [0, 0, 0]},
        'shelfWidth_fittings': {path: 'shelfWidth_fittings/', scale: [10, 10, 10], offset: [200, 0, -250], rotation: [0, 0, 0]},
        'livreJava': {path: 'livreJava/', scale: [14, 14, 14], offset: [100, 1000, 700], rotation: [0, 0, 0]}, 
    },




    init: function(canvasId) {
        var self = this;
        this.canvas = document.getElementById(canvasId);
        
        if (!Utils.isWebGLSupported(this.canvas)) {
            this.showError('Unfortunately your browser is not supported');
            return this;
        }
        
        this.scene = new THREE.Scene();
        this.engine = new THREE.WebGLRenderer({
            antialias: true,
            canvas: this.canvas,
        });
        
        
        /* this.engine.shadowMap.enabled = false
        this.engine.shadowMap.type = THREE.PCFSoftShadowMap 
        this.engine.setClearColor(0x748347)
        this.engine.setPixelRatio(this.ratio)        
        this.engine.setSize( this.w, this.h )
        this.engine.toneMappingExposure = 1
        this.engine.toneMapping = THREE.Uncharted2ToneMapping
        this.engine.gammaOutput = true
        this.engine.gammaInput = true
        this.engine.gammaFactor = 1.9;  */
        
        this.engine.setSize(window.innerWidth, window.innerHeight, true);
        this.engine.setClearColor(0x000000);
        
        this.scene.background = new THREE.Color('#000000');
        this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 9000);
        this.camera.position.set(-332,1000,1827);
        this.camera.far = 50000;

        
       /*  var light = new THREE.DirectionalLight(0xffffff, 55);
        this.scene.add(light);
        light.position.set(0, 3300, 1599);
        light.intensity = 5.9;
        this.light = light; */
        



        //POSTPROCESSING SECTION  23May - Lightweight "Dev"version 
        this.w = window.innerWidth || 1
        this.h = window.innerHeight || 1
        //this.ratio = window.devicePixelRatio 
        //|| 1

        this.composer = new THREE.EffectComposer( this.engine );
        this.composer.setSize( this.w, this.h )

        this.renderPass = new THREE.RenderPass( this.scene, this.camera );
        this.composer.addPass( this.renderPass );   
        
        //23 may this is slow even without below SAO
        /* this.ssaaRenderPass = new THREE.SSAARenderPass(this.scene, this.camera, 0xAAAAAA, 0)
        this.composer.addPass(this.ssaaRenderPass) */
    
        this.SAO = new THREE.SAOPass(this.scene, this.camera, false, true)
        this.SAO.resolution.set(1, 1)
        this.composer.addPass(this.SAO) 

        this.SAO['params']['output'] = THREE.SAOPass.OUTPUT.Default
        this.SAO['params']['saoBias'] = 0.1
        this.SAO['params']['saoIntensity'] = 0.00001
        this.SAO['params']['saoScale'] = 1.1
        this.SAO['params']['saoKernelRadius'] = 3
        this.SAO['params']['saoMinResolution'] = 0
        this.SAO['params']['saoBlur'] = false
        this.SAO['params']['saoBlurRadius'] = 0.001
        this.SAO['params']['saoBlurStdDev'] = 2
        this.SAO['params']['saoBlurDepthCutoff'] = .01 
        






        //Cursor Orbit controls
        var controls = new THREE.OrbitControls(this.camera, this.canvas);
        controls.enableDamping = true; 
        controls.dampingFactor = 0.03;
        controls.target.set(-210, 700, -2000);
        controls.rotateSpeed = 0.01;
        controls.maxPolarAngle = Math.PI/2; 
        controls.minPolarAngle = Math.PI/3.5; // radians
        controls.maxAzimuthAngle = 0.6; // radians
        controls.minAzimuthAngle = -0.6; // radians
        controls.maxDistance = 5200;
        controls.minDistance = 2800;
        this.controls = controls;
        this.clock = new THREE.Clock();





        //Feb2021-23May 2021, EventControls Section
        var SCREEN_WIDTH = window.innerWidth,  SCREEN_HEIGHT = window.innerHeight;
        var windowHalfX = SCREEN_WIDTH / 2;
        var windowHalfY = SCREEN_HEIGHT / 2;
        var mouse = {x:0,y:0};
        var x, y, z, sum;        
        this.x = x;        
        this.y = y;        
        this.z = z;    
        this.mouse = mouse;    
        this.windowHalfY = windowHalfY;
        this.windowHalfX = windowHalfX;
        this.SCREEN_WIDTH = SCREEN_WIDTH;
        this.SCREEN_HEIGHT = SCREEN_HEIGHT;

        var EventsControls1 = new EventsControls( this.camera, this.engine.domElement );
            
        EventsControls1.attachEvent( 'mouseOver', function () {
            this.container.style.cursor = 'pointer';
            self.section1_WireframeMesh.material.opacity = 0.4;
            
        });
        
        EventsControls1.attachEvent( 'mouseOut', function () {
            this.container.style.cursor = 'auto';
            controls.rotateSpeed = 0.1;
            self.section1_WireframeMesh.material.opacity = 0;

        });
        
        EventsControls1.attachEvent( 'dragAndDrop', function () {
            this.container.style.cursor = 'pointer';
            this.focused.position.x = this.previous.x;
            this.focused.position.set = this.previous.set;
            controls.rotateSpeed = 0.0001;
            self.section1_WireframeMesh.material.opacity = 0.4;

        });

        EventsControls1.attachEvent( 'mouseUp', function () {
            x = this.focused.position.x;
            this.container.style.cursor = 'auto';

            for (var name in this.models) {
                var object = this.models[name];
                var params = this.objectsOptions[name];
                object.visible = true;
                if (name === 'livreJava') {
                    controls.rotateSpeed = 0.1;
                    object.position.x = x;
                    object.visible = true;
                    EventsControls1.attach( object );
                }
                self.section1_WireframeMesh.material.opacity = 0;
            }
        });

        this.EventsControls1 = EventsControls1;       

        


        

    












        //LISTENERS (FOR ADDING NEW OBJECTS EVENTS AND OTHER) - 24 FEB, 23May
        
        window.addEventListener('resize', function() {
            self.engine.setSize(window.innerWidth, window.innerHeight, true);
            self.camera.aspect = window.innerWidth / window.innerHeight;
            self.camera.updateProjectionMatrix();
        });

        document.addEventListener( 'mousemove', onMouseMove, false );
        function onMouseMove( mouseMove ) {
            mouse.x = ( mouseMove.clientX - this.windowHalfX );
            mouse.y = ( mouseMove.clientY - this.windowHalfY );
        }


        var backPlate_js_eventReactor_var = document.getElementById("backWallCheckbox_Cabinet_Dimensions_Accept");
        backPlate_js_eventReactor_var.addEventListener('click', function() {
            //self.createBackPlate();
            //self.updateShelving();
            if (backPlate_js_eventReactor_var.checked == true) {
                self.changeBackPlateVisibilityPlus();}
            else {
                self.changeBackPlateVisibilityMinus();
            }
        });















        var DoorsStatus = 0;
        var AddSingleDoors1_var = document.getElementById("AddSingleDoors1");
        AddSingleDoors1_var.addEventListener('click', function() {
            self.add_Doors1();
            self.add_Handle7();
            self.remove_Doors2();
            self.remove_Handle7_2();
            DoorsStatus = 1;
        });

        var RemoveSingleDoors1_var = document.getElementById("RemoveSingleDoors1");
        RemoveSingleDoors1_var.addEventListener('click', function() {
            self.remove_Doors1();
            self.remove_Handle7();
            self.remove_Handle7_2();
            DoorsStatus = 0;
        });

        //Doors2 buttons
        var AddDoubleDoors2_var = document.getElementById("AddDoubleDoors2");
        AddDoubleDoors2_var.addEventListener('click', function() {
            self.add_Doors2();
            self.add_Handle7_2();
            self.remove_Doors1();
            self.remove_Handle7();
            DoorsStatus = 2;
        });

        var RemoveDoubleDoors2_var = document.getElementById("RemoveDoubleDoors2");
        RemoveDoubleDoors2_var.addEventListener('click', function() {
            self.remove_Doors2();
            self.remove_Handle7_2();
            DoorsStatus = 0;
        });


        //Handle1 buttons
        var AddDoubleHandle1_var = document.getElementById("SingleBlock_Elements1");

        AddDoubleHandle1_var.addEventListener('click', function() {
 
            self.remove_Handle2();
            self.remove_Handle3();
            self.remove_Handle4();
            self.remove_Handle5();
            self.remove_Handle6();
            self.remove_Handle7();
            self.remove_Handle8();
            self.remove_Handle9();
            self.remove_Handle7_2();
            self.remove_Handle2_2();
            self.remove_Handle3_2();
            self.remove_Handle4_2();
            self.remove_Handle5_2();
            self.remove_Handle6_2();
            self.remove_Handle8_2();
            self.remove_Handle9_2();

            if (DoorsStatus == 1) {
                self.add_Handle1();
            }
                
            else if (DoorsStatus == 2) {
                self.add_Handle1_2();
            }
            
        });


    
        //Handle2 buttons
        var AddDoubleHandle2_var = document.getElementById("SingleBlock_Elements2");

        AddDoubleHandle2_var.addEventListener('click', function() {
            self.remove_Handle1();
            self.remove_Handle3();
            self.remove_Handle4();
            self.remove_Handle5();
            self.remove_Handle6();
            self.remove_Handle7();
            self.remove_Handle8();
            self.remove_Handle9();
            self.remove_Handle1_2();
            self.remove_Handle7_2();
            self.remove_Handle3_2();
            self.remove_Handle4_2();
            self.remove_Handle5_2();
            self.remove_Handle6_2();
            self.remove_Handle8_2();
            self.remove_Handle9_2();

              
            if (DoorsStatus == 1) {

                self.add_Handle2();
            }
                
            else if (DoorsStatus == 2) {

                self.add_Handle2_2();
                        
            }

        });


    
        //Handle3 buttons
        var AddDoubleHandle3_var = document.getElementById("SingleBlock_Elements3");

        AddDoubleHandle3_var.addEventListener('click', function() {
            self.remove_Handle1();
            self.remove_Handle2();
            self.remove_Handle4();
            self.remove_Handle5();
            self.remove_Handle6();
            self.remove_Handle7();
            self.remove_Handle8();
            self.remove_Handle9();
            self.remove_Handle1_2();
            self.remove_Handle7_2();
            self.remove_Handle2_2();
            self.remove_Handle4_2();
            self.remove_Handle5_2();
            self.remove_Handle6_2();
            self.remove_Handle8_2();
            self.remove_Handle9_2();

            if (DoorsStatus == 1) {

                self.add_Handle3();
            }
                
            else if (DoorsStatus == 2) {

                self.add_Handle3_2();
                        
            }

        });

        //Handle4 buttons
        var AddDoubleHandle4_var = document.getElementById("SingleBlock_Elements4");

        AddDoubleHandle4_var.addEventListener('click', function() {
            self.remove_Handle1();
            self.remove_Handle2();
            self.remove_Handle3();
            self.remove_Handle5();
            self.remove_Handle6();
            self.remove_Handle7();
            self.remove_Handle8();
            self.remove_Handle9();
            self.remove_Handle1_2();
            self.remove_Handle7_2();
            self.remove_Handle2_2();
            self.remove_Handle3_2();
            self.remove_Handle5_2();
            self.remove_Handle6_2();
            self.remove_Handle8_2();
            self.remove_Handle9_2();

            
            if (DoorsStatus == 1) {

                self.add_Handle4();
            }
                
            else if (DoorsStatus == 2) {

                self.add_Handle4_2();
                        
            }

        });

    
        //Handle5 buttons
        var AddDoubleHandle5_var = document.getElementById("SingleBlock_Elements5");

        AddDoubleHandle5_var.addEventListener('click', function() {
            self.remove_Handle1();
            self.remove_Handle2();
            self.remove_Handle3();
            self.remove_Handle4();
            self.remove_Handle6();
            self.remove_Handle7();
            self.remove_Handle8();
            self.remove_Handle9();
            self.remove_Handle1_2();
            self.remove_Handle7_2();
            self.remove_Handle2_2();
            self.remove_Handle3_2();
            self.remove_Handle4_2();
            self.remove_Handle6_2();
            self.remove_Handle8_2();
            self.remove_Handle9_2();
        
            if (DoorsStatus == 1) {
                self.add_Handle5();
            }
                
            else if (DoorsStatus == 2) {
                self.add_Handle5_2();
            }
        });


    
        //Handle6 buttons
        var AddDoubleHandle6_var = document.getElementById("SingleBlock_Elements6");
        AddDoubleHandle6_var.addEventListener('click', function() {
            self.remove_Handle1();
            self.remove_Handle2();
            self.remove_Handle3();
            self.remove_Handle4();
            self.remove_Handle5();
            self.remove_Handle7();
            self.remove_Handle8();
            self.remove_Handle9();
            self.remove_Handle1_2();
            self.remove_Handle7_2();
            self.remove_Handle2_2();
            self.remove_Handle3_2();
            self.remove_Handle4_2();
            self.remove_Handle5_2();
            self.remove_Handle8_2();
            self.remove_Handle9_2();

                          
            if (DoorsStatus == 1) {

                self.add_Handle6();
            }
                
            else if (DoorsStatus == 2) {

                self.add_Handle6_2();
                        
            }


        });



        //Handle7 buttons
        var AddDoubleHandle7_var = document.getElementById("SingleBlock_Elements7");

        AddDoubleHandle7_var.addEventListener('click', function() {
            self.remove_Handle1();
            self.remove_Handle2();
            self.remove_Handle3();
            self.remove_Handle4();
            self.remove_Handle5();
            self.remove_Handle6();
            self.remove_Handle8();
            self.remove_Handle9();
            self.remove_Handle1_2();
            self.remove_Handle2_2();
            self.remove_Handle3_2();
            self.remove_Handle4_2();
            self.remove_Handle5_2();
            self.remove_Handle6_2();
            self.remove_Handle8_2();
            self.remove_Handle9_2();

            if (DoorsStatus == 1) {
                       
                self.add_Handle7();
            }
                
            else if (DoorsStatus == 2) {

                self.add_Handle7_2();
                        
            }
        });




        //Handle8 buttons
        var AddDoubleHandle8_var = document.getElementById("SingleBlock_Elements8");

        AddDoubleHandle8_var.addEventListener('click', function() {
            self.remove_Handle1();
            self.remove_Handle2();
            self.remove_Handle3();
            self.remove_Handle4();
            self.remove_Handle5();
            self.remove_Handle6();
            self.remove_Handle7();
            self.remove_Handle9();
            self.remove_Handle1_2();
            self.remove_Handle7_2();
            self.remove_Handle2_2();
            self.remove_Handle3_2();
            self.remove_Handle4_2();
            self.remove_Handle5_2();
            self.remove_Handle6_2();


            if (DoorsStatus == 1) {
                       
                self.add_Handle8();
            }
                
            else if (DoorsStatus == 2) {

                self.add_Handle8_2();
                        
            }
        });



        //Handle9 buttons
        var AddDoubleHandle9_var = document.getElementById("SingleBlock_Elements9");

        AddDoubleHandle9_var.addEventListener('click', function() {
            self.remove_Handle1();
            self.remove_Handle2();
            self.remove_Handle3();
            self.remove_Handle4();
            self.remove_Handle5();
            self.remove_Handle6();
            self.remove_Handle7();
            self.remove_Handle8();
            self.remove_Handle1_2();
            self.remove_Handle7_2();
            self.remove_Handle2_2();
            self.remove_Handle3_2();
            self.remove_Handle4_2();
            self.remove_Handle5_2();
            self.remove_Handle6_2();


            if (DoorsStatus == 1) {
                self.add_Handle9();
            }
                
            else if (DoorsStatus == 2) {
                self.add_Handle9_2();
            }
        });




















        //TO GET DIMENSIONS CABINET VALUES FROM HTML  (Jan-Feb 2021)
        
        var Width_subdomainWidthCabinet_Dimensions = document.getElementById("subdomainWidthCabinet_Dimensions");
        
        Width_subdomainWidthCabinet_Dimensions.addEventListener('input', function() {

            var wT1 = document.getElementById("subdomainWidthCabinet_Dimensions").value;
            var WT2 = parseInt(wT1, 10);

            AmountOfShelfs_section_1_shelf_1_1_divBlock.style.display = "none"
            AmountOfShelfs_section_1_shelf_1_2_divBlock.style.display = "none"
            AmountOfShelfs_section_1_shelf_1_3_divBlock.style.display = "none"
            AmountOfShelfs_section_1_shelf_1_4_divBlock.style.display = "none"
            AmountOfShelfs_section_1_shelf_1_5_divBlock.style.display = "none"
            AmountOfShelfs_section_1.style.marginBottom = "3.6em";
            Fittings_Vertical_section_1.style.height = "13.8em";
            positionOfShelf1name.innerHTML = "Position of Shelf 1";
            positionOfShelf2name.innerHTML = "Position of Shelf 2";
            positionOfShelf3name.innerHTML = "Position of Shelf 3";
            AmountOfShelfs_section_1_input.value = '0'
            
            if (WT2 < 299) {} else if (WT2 > 299 && WT2 < 4001 ) {

                self.options.wasChangedSectionsLengthOrNot = 0;
                self.options.shelf.length = WT2;

                self.scene.remove(self.shelving);
                self.updatePillarProtoMaterial();
                self.updateShelfProtoMaterial();
                self.createShelving();
                self.calculateOutput();
                
                self.createBackPlate()


                if (self.options.amountOfSections == 1) {
                    self.options.section1Length = self.options.shelf.length;
                    self.options.section2Length = 0;
                    self.options.pillar1Position = 0;

                    self.createWireframeBack_section1();
                    self.createWireframeBack_section2();

                    self.createShelvingOnDemand();
                    self.createShelvingOnDemand_section2();

                    self.shelvingOnDemand.getObjectByName( "shelfOnDemand_0_1", true ).position.y = self.options.shelfOnDemand_0_1_State;
                    self.shelvingOnDemand.getObjectByName( "shelfOnDemand_0_2", true ).position.y = self.options.shelfOnDemand_0_2_State; 
                    self.shelvingOnDemand.getObjectByName( "shelfOnDemand_0_3", true ).position.y = self.options.shelfOnDemand_0_3_State; 
                } 
                else if (self.options.amountOfSections == 2){
                    self.options.section1Length = self.options.shelf.length / 2;
                    self.options.section2Length = self.options.shelf.length - self.options.section1Length;
                    self.pillar1.position.x = 0;
                    self.options.pillar1Position = 0;
                    self.createPillar1();
                    
                    self.createWireframeBack_section1();
                    self.createWireframeBack_section2();

                    self.createShelvingOnDemand();
                    self.createShelvingOnDemand_section2();

                    self.shelvingOnDemand.getObjectByName( "shelfOnDemand_0_1", true ).position.y = self.options.shelfOnDemand_0_1_State;
                    self.shelvingOnDemand.getObjectByName( "shelfOnDemand_0_2", true ).position.y = self.options.shelfOnDemand_0_2_State; 
                    self.shelvingOnDemand.getObjectByName( "shelfOnDemand_0_3", true ).position.y = self.options.shelfOnDemand_0_3_State; 

                    self.shelvingOnDemand_section2.getObjectByName( "shelfOnDemand_section2_0_1", true ).position.y = self.options.shelfOnDemand_section2_0_1_State;
                    self.shelvingOnDemand_section2.getObjectByName( "shelfOnDemand_section2_0_2", true ).position.y = self.options.shelfOnDemand_section2_0_2_State; 
                    self.shelvingOnDemand_section2.getObjectByName( "shelfOnDemand_section2_0_3", true ).position.y = self.options.shelfOnDemand_section2_0_3_State; 
                } 
            }
        });





        //28may cabinet dimensions, height
        var Height_subdomainHeightCabinet_Dimensions = document.getElementById("subdomainHeightCabinet_Dimensions");
        Height_subdomainHeightCabinet_Dimensions.addEventListener('input', function() {
            var hT1 = document.getElementById("subdomainHeightCabinet_Dimensions").value;
            var hT2 = parseInt(hT1, 10);
            if (hT2 < 499) {} else if (hT2 > 499 && hT2 < 3501 ) {

                self.options.wasChangedSectionsLengthOrNot = 0;
                self.options.pillar.height = hT2;
                
                self.scene.remove(self.shelving);
                self.updatePillarProtoMaterial();
                self.updateShelfProtoMaterial();
                self.createShelving();
                self.calculateOutput();
                self.createBackPlate()
                
                if (self.options.amountOfSections == 1) {
                    self.options.section1Length = self.options.shelf.length;
                    self.options.section2Length = 0;
                    self.options.pillar1Position = 0;
                    self.createWireframeBack_section1();
                    self.createWireframeBack_section2();
                    self.createShelvingOnDemand();
                    self.createShelvingOnDemand_section2();


                    self.shelvingOnDemand.getObjectByName( "shelfOnDemand_0_1", true ).position.y = self.options.shelfOnDemand_0_1_State;
                    self.shelvingOnDemand.getObjectByName( "shelfOnDemand_0_2", true ).position.y = self.options.shelfOnDemand_0_2_State; 
                    self.shelvingOnDemand.getObjectByName( "shelfOnDemand_0_3", true ).position.y = self.options.shelfOnDemand_0_3_State; 


                } else if (self.options.amountOfSections == 2) {

                    self.options.section1Length = self.options.shelf.length / 2;
                    self.options.section2Length = self.options.shelf.length - self.options.section1Length;
                    self.pillar1.position.x = 0;
                    self.options.pillar1Position = 0;

                    self.createPillar1();
                    self.createWireframeBack_section1();
                    self.createWireframeBack_section2();
                    self.createShelvingOnDemand();
                    self.createShelvingOnDemand_section2();

                    self.shelvingOnDemand.getObjectByName( "shelfOnDemand_0_1", true ).position.y = self.options.shelfOnDemand_0_1_State;
                    self.shelvingOnDemand.getObjectByName( "shelfOnDemand_0_2", true ).position.y = self.options.shelfOnDemand_0_2_State; 
                    self.shelvingOnDemand.getObjectByName( "shelfOnDemand_0_3", true ).position.y = self.options.shelfOnDemand_0_3_State; 

                    self.shelvingOnDemand_section2.getObjectByName( "shelfOnDemand_section2_0_1", true ).position.y = self.options.shelfOnDemand_section2_0_1_State;
                    self.shelvingOnDemand_section2.getObjectByName( "shelfOnDemand_section2_0_2", true ).position.y = self.options.shelfOnDemand_section2_0_2_State; 
                    self.shelvingOnDemand_section2.getObjectByName( "shelfOnDemand_section2_0_3", true ).position.y = self.options.shelfOnDemand_section2_0_3_State; 
                }
            }
        });


        
        //28may depth of whole cabinet, regeneration
        var Depth_subdomainDepth_Cabinet_Dimensionsz = document.getElementById("subdomainDepth_Cabinet_Dimensionsz");
        Depth_subdomainDepth_Cabinet_Dimensionsz.addEventListener('input', function() {
            var dT1 = document.getElementById("subdomainDepth_Cabinet_Dimensionsz").value;
            var dT2 = parseInt(dT1, 10);
            
            if (dT2 < 99 ) {} else if (dT2 > 99 && dT2 < 1001 ) {

                self.options.shelf.width = dT2;
                self.scene.remove(self.shelving);
                self.updatePillarProtoMaterial();
                self.updateShelfProtoMaterial();
                self.createShelving();
                self.calculateOutput();
                self.createBackPlate()
                
                if (self.options.amountOfSections == 1) {
                    self.options.section1Length = self.options.shelf.length;
                    self.options.section2Length = 0;
                    self.options.pillar1Position = 0;

                    self.createWireframeBack_section1();
                    self.createWireframeBack_section2();

                    self.createShelvingOnDemand();
                    self.createShelvingOnDemand_section2();

                    /* self.shelvingOnDemand.getObjectByName( "shelfOnDemand_0_1", true ).position.y = self.options.shelfOnDemand_0_1_State;
                    self.shelvingOnDemand.getObjectByName( "shelfOnDemand_0_2", true ).position.y = self.options.shelfOnDemand_0_2_State; */

                    
                } else if (self.options.amountOfSections == 2){
                    self.options.section1Length = self.options.shelf.length / 2;
                    self.options.section2Length = self.options.shelf.length - self.options.section1Length;
                    self.pillar1.position.x = 0;
                    self.options.pillar1Position = 0;

                    self.createPillar1();

                    self.createWireframeBack_section1();
                    self.createWireframeBack_section2();
                    self.createShelvingOnDemand();
                    self.createShelvingOnDemand_section2();

                }
            }
        });

























        //28may number of corpus elements switch
        document.getElementById('subdomainNumberElementCorpus_Cabinet_Dimensionsz').oninput = function () {

            var max = parseInt(this.max);

            if (parseInt(this.value) > max) {
            this.value = max; 
            }

            switch (this.value) {

                case '0':
                //ui
                VerticalWidth_1_Corpus_Dimensions.style.display = "none";
                VerticalWidth_2_Corpus_Dimensions.style.display = "none";
                VerticalWidth_3_Corpus_Dimensions.style.display = "none";
                NumberElementCorpus_Dimensions.style.height = "3.2em";
                Fittings_Vertical_section_1.style.display = "block";
                Fittings_Vertical_section_2.style.display = "none";
                Fittings_Vertical_section_3.style.display = "none";

                //3d
                document.getElementById("positionPillar1").innerHTML = self.options.section1Length+"cm↔";

                self.options.amountOfSections = 1;
                self.options.wasChangedSectionsLengthOrNot = 0;
                self.scene.remove(self.pillar1);

                self.scene.remove(self.shelving);
                self.updatePillarProtoMaterial();
                self.updateShelfProtoMaterial();
                self.createShelving();
                self.calculateOutput();
                self.createBackPlate()

                self.options.section1Length = self.options.shelf.length;
                self.options.section2Length = 0;
                self.options.pillar1Position = 0;

                self.createWireframeBack_section1();
                self.createWireframeBack_section2();
                self.createShelvingOnDemand();
                self.createShelvingOnDemand_section2();

                self.shelvingOnDemand.getObjectByName( "shelfOnDemand_0_1", true ).position.y = self.options.shelfOnDemand_0_1_State;
                self.shelvingOnDemand.getObjectByName( "shelfOnDemand_0_2", true ).position.y = self.options.shelfOnDemand_0_2_State; 
                self.shelvingOnDemand.getObjectByName( "shelfOnDemand_0_3", true ).position.y = self.options.shelfOnDemand_0_3_State; 
                self.shelvingOnDemand_section2.getObjectByName( "shelfOnDemand_section2_0_1", true ).position.y = self.options.shelfOnDemand_section2_0_1_State;
                self.shelvingOnDemand_section2.getObjectByName( "shelfOnDemand_section2_0_2", true ).position.y = self.options.shelfOnDemand_section2_0_2_State; 
                self.shelvingOnDemand_section2.getObjectByName( "shelfOnDemand_section2_0_3", true ).position.y = self.options.shelfOnDemand_section2_0_3_State;  

                            
                document.getElementById("positionPillar1").innerHTML = self.options.section1Length+"cm↔";

                break;
            
                case '1':
                //ui
                VerticalWidth_1_Corpus_Dimensions.style.display = "none";
                VerticalWidth_2_Corpus_Dimensions.style.display = "none";
                VerticalWidth_3_Corpus_Dimensions.style.display = "none";
                NumberElementCorpus_Dimensions.style.height = "3.2em";
                Fittings_Vertical_section_1.style.display = "block";
                Fittings_Vertical_section_2.style.display = "none";
                Fittings_Vertical_section_3.style.display = "none";

                //3d
                document.getElementById("positionPillar1").innerHTML = self.options.section1Length+"cm↔";

                self.options.amountOfSections = 1;
                self.options.wasChangedSectionsLengthOrNot = 0;
                self.scene.remove(self.pillar1);

                self.scene.remove(self.shelving);
                self.updatePillarProtoMaterial();
                self.updateShelfProtoMaterial();
                self.createShelving();
                self.calculateOutput();
                self.createBackPlate()

                self.options.section1Length = self.options.shelf.length;
                self.options.section2Length = 0;
                self.options.pillar1Position = 0;

                self.createWireframeBack_section1();
                self.createWireframeBack_section2();
                self.createShelvingOnDemand();
                self.createShelvingOnDemand_section2();

                /* self.shelvingOnDemand.getObjectByName( "shelfOnDemand_0_1", true ).position.y = self.options.shelfOnDemand_0_1_State;
                self.shelvingOnDemand.getObjectByName( "shelfOnDemand_0_2", true ).position.y = self.options.shelfOnDemand_0_2_State; 
                self.shelvingOnDemand.getObjectByName( "shelfOnDemand_0_3", true ).position.y = self.options.shelfOnDemand_0_3_State; 
                self.shelvingOnDemand_section2.getObjectByName( "shelfOnDemand_section2_0_1", true ).position.y = self.options.shelfOnDemand_section2_0_1_State;
                self.shelvingOnDemand_section2.getObjectByName( "shelfOnDemand_section2_0_2", true ).position.y = self.options.shelfOnDemand_section2_0_2_State; 
                self.shelvingOnDemand_section2.getObjectByName( "shelfOnDemand_section2_0_3", true ).position.y = self.options.shelfOnDemand_section2_0_3_State;  
                    */
                document.getElementById("positionPillar1").innerHTML = self.options.section1Length+"cm↔";

                break;


                case '2':
                //ui
                VerticalWidth_1_Corpus_Dimensions.style.display = "block";
                VerticalWidth_2_Corpus_Dimensions.style.display = "none";
                VerticalWidth_3_Corpus_Dimensions.style.display = "none";
                Fittings_Vertical_section_1.style.display = "block";
                Fittings_Vertical_section_2.style.display = "block";
                Fittings_Vertical_section_3.style.display = "none";
                NumberElementCorpus_Dimensions.style.height = "6.1em";

                document.getElementById("positionPillar1").innerHTML = 350+"cm↔"; 

                //3d
                self.options.amountOfSections = 2;
                self.options.wasChangedSectionsLengthOrNot = 1;

                self.options.section1Length = self.options.shelf.length / 2;
                self.options.section2Length = self.options.shelf.length - self.options.section1Length;

                self.createWireframeBack_section1();
                self.createWireframeBack_section2();
                self.createPillar1();
                self.createShelvingOnDemand();
                self.options.pillar1Position = 0;

                /* self.shelvingOnDemand.getObjectByName( "shelfOnDemand_0_1", true ).position.y = self.options.shelfOnDemand_0_1_State;
                self.shelvingOnDemand.getObjectByName( "shelfOnDemand_0_2", true ).position.y = self.options.shelfOnDemand_0_2_State; 
                self.shelvingOnDemand.getObjectByName( "shelfOnDemand_0_3", true ).position.y = self.options.shelfOnDemand_0_3_State; 
                self.shelvingOnDemand_section2.getObjectByName( "shelfOnDemand_section2_0_1", true ).position.y = self.options.shelfOnDemand_section2_0_1_State;
                self.shelvingOnDemand_section2.getObjectByName( "shelfOnDemand_section2_0_2", true ).position.y = self.options.shelfOnDemand_section2_0_2_State; 
                self.shelvingOnDemand_section2.getObjectByName( "shelfOnDemand_section2_0_3", true ).position.y = self.options.shelfOnDemand_section2_0_3_State;  */
                break;
                
            }


        }



 















        //24APR events to move pillars (verticals)
        var var_CorpusElements_Vertical_Width_1_PrevBut = document.getElementById("CorpusElements_Vertical_Width_1_PrevBut");
        var_CorpusElements_Vertical_Width_1_PrevBut.addEventListener('click', function() {

            if (self.options.section1Length > 50 ) {

            document.getElementById("positionPillar1").innerHTML = self.options.section1Length+"cm↔";

            self.options.wasChangedSectionsLengthOrNot = 1;
            self.options.section1Length -= 50;
            self.options.section2Length += 50;
            self.options.pillar1Position -= 50;

            self.options.section1Length = self.options.section1Length;
            self.options.section2Length = self.options.shelf.length - self.options.section1Length;
            self.pillar1.position.x = self.options.pillar1Position;
            self.createWireframeBack_section1();
            self.createWireframeBack_section2();
            self.createShelvingOnDemand();
            self.createShelvingOnDemand_section2();

            self.shelvingOnDemand.getObjectByName( "shelfOnDemand_0_1", true ).position.y = self.options.shelfOnDemand_0_1_State;
            self.shelvingOnDemand.getObjectByName( "shelfOnDemand_0_2", true ).position.y = self.options.shelfOnDemand_0_2_State; 
            self.shelvingOnDemand.getObjectByName( "shelfOnDemand_0_3", true ).position.y = self.options.shelfOnDemand_0_3_State; 

            self.shelvingOnDemand_section2.getObjectByName( "shelfOnDemand_section2_0_1", true ).position.y = self.options.shelfOnDemand_section2_0_1_State;
            self.shelvingOnDemand_section2.getObjectByName( "shelfOnDemand_section2_0_2", true ).position.y = self.options.shelfOnDemand_section2_0_2_State; 
            self.shelvingOnDemand_section2.getObjectByName( "shelfOnDemand_section2_0_3", true ).position.y = self.options.shelfOnDemand_section2_0_3_State; 
            


            }
            else {};
            
        });


        var var_CorpusElements_Vertical_Width_1_NextBut = document.getElementById("CorpusElements_Vertical_Width_1_NextBut");

        var_CorpusElements_Vertical_Width_1_NextBut.addEventListener('click', function() {
   
            if (self.options.section1Length < self.options.shelf.length - 50) {

                document.getElementById("positionPillar1").innerHTML = self.options.section1Length+"cm↔";

                
                self.options.wasChangedSectionsLengthOrNot = 1;
                self.options.section1Length += 50;
                self.options.section2Length -= 50;
                self.options.pillar1Position += 50;

                self.scene.remove(self.shelving);
                self.updatePillarProtoMaterial();
                self.updateShelfProtoMaterial();
                self.createShelving();
                self.calculateOutput();
                self.createBackPlate()
                self.options.section1Length = self.options.section1Length;
                self.options.section2Length = self.options.shelf.length - self.options.section1Length;
                self.pillar1.position.x = self.options.pillar1Position;
                
                self.createWireframeBack_section1();
                self.createWireframeBack_section2();
                self.createShelvingOnDemand();
                self.createShelvingOnDemand_section2();

                self.shelvingOnDemand.getObjectByName( "shelfOnDemand_0_1", true ).position.y = self.options.shelfOnDemand_0_1_State;
                self.shelvingOnDemand.getObjectByName( "shelfOnDemand_0_2", true ).position.y = self.options.shelfOnDemand_0_2_State; 
                self.shelvingOnDemand.getObjectByName( "shelfOnDemand_0_3", true ).position.y = self.options.shelfOnDemand_0_3_State; 

                self.shelvingOnDemand_section2.getObjectByName( "shelfOnDemand_section2_0_1", true ).position.y = self.options.shelfOnDemand_section2_0_1_State;
                self.shelvingOnDemand_section2.getObjectByName( "shelfOnDemand_section2_0_2", true ).position.y = self.options.shelfOnDemand_section2_0_2_State; 
                self.shelvingOnDemand_section2.getObjectByName( "shelfOnDemand_section2_0_3", true ).position.y = self.options.shelfOnDemand_section2_0_3_State; 
                
            }
            else {};
        });
 
        /* var var_CorpusElements_Vertical_Width_2_NextBut = document.getElementById("CorpusElements_Vertical_Width_2_NextBut");
        var_CorpusElements_Vertical_Width_2_NextBut.addEventListener('click', function() {
            self.shelving.getObjectByName( "pillar_2", true ).position.x += 50;
        });
        var var_CorpusElements_Vertical_Width_2_PrevBut = document.getElementById("CorpusElements_Vertical_Width_2_PrevBut");
        var_CorpusElements_Vertical_Width_2_PrevBut.addEventListener('click', function() {
            self.shelving.getObjectByName( "pillar_2", true ).position.x -= 50;
        });

        var var_CorpusElements_Vertical_Width_3_NextBut = document.getElementById("CorpusElements_Vertical_Width_3_NextBut");
        var_CorpusElements_Vertical_Width_3_NextBut.addEventListener('click', function() {
            self.shelving.getObjectByName( "pillar_3", true ).position.x += 50;
        });
        var var_CorpusElements_Vertical_Width_3_PrevBut = document.getElementById("CorpusElements_Vertical_Width_3_PrevBut");
        var_CorpusElements_Vertical_Width_3_PrevBut.addEventListener('click', function() {
            self.shelving.getObjectByName( "pillar_3", true ).position.x -= 50;
        });

        var var_CorpusElements_Vertical_Width_4_NextBut = document.getElementById("CorpusElements_Vertical_Width_4_NextBut");
        var_CorpusElements_Vertical_Width_4_NextBut.addEventListener('click', function() {
            self.shelving.getObjectByName( "pillar_4", true ).position.x += 50;
        });
        var var_CorpusElements_Vertical_Width_4_PrevBut = document.getElementById("CorpusElements_Vertical_Width_4_PrevBut");
        var_CorpusElements_Vertical_Width_4_PrevBut.addEventListener('click', function() {
            self.shelving.getObjectByName( "pillar_4", true ).position.x -= 50;
        }); */






























        //27june22 section 1 shelves

        document.getElementById("AmountOfShelfs_section_1_input").oninput = function () {

            var max = parseInt(this.max);

            if (parseInt(this.value) > max) {
            this.value = max; 
            }

            switch (this.value) {

                case '0':
                //ui
                AmountOfShelfs_section_1_shelf_1_1_divBlock.style.display = "none"
                AmountOfShelfs_section_1_shelf_1_2_divBlock.style.display = "none"
                AmountOfShelfs_section_1_shelf_1_3_divBlock.style.display = "none"
                AmountOfShelfs_section_1_shelf_1_4_divBlock.style.display = "none"
                AmountOfShelfs_section_1_shelf_1_5_divBlock.style.display = "none"
                //AmountOfShelfs_section_1.style.marginBottom = "3.6em";
                Fittings_Vertical_section_1.style.height = "13.8em";
                positionOfShelf1name.innerHTML = "Position of Shelf 1";
                positionOfShelf2name.innerHTML = "Position of Shelf 2";
                positionOfShelf3name.innerHTML = "Position of Shelf 3";
                //3d
                self.options.shelvesNumOnDemand = 1;
                self.createShelvingOnDemand();
                break;

                case '1':
                //ui
                positionOfShelf1name.innerHTML = "Position of Shelf 1";
                positionOfShelf2name.innerHTML = "Position of Shelf 2";
                positionOfShelf3name.innerHTML = "Position of Shelf 1";
                AmountOfShelfs_section_1_shelf_1_1_divBlock.style.display = "block"
                AmountOfShelfs_section_1_shelf_1_2_divBlock.style.display = "none"
                AmountOfShelfs_section_1_shelf_1_3_divBlock.style.display = "none"
                AmountOfShelfs_section_1_shelf_1_4_divBlock.style.display = "none"
                AmountOfShelfs_section_1_shelf_1_5_divBlock.style.display = "none"
                AmountOfShelfs_section_1.style.marginBottom = "3.6em";
                Fittings_Vertical_section_1.style.height = "13.8em";

                //3d
                self.options.shelvesNumOnDemand = 2;
                self.createShelvingOnDemand();
                break;

                case '2':
                //ui
                AmountOfShelfs_section_1_shelf_1_1_divBlock.style.display = "block"
                AmountOfShelfs_section_1_shelf_1_2_divBlock.style.display = "block"
                AmountOfShelfs_section_1_shelf_1_3_divBlock.style.display = "none"
                AmountOfShelfs_section_1_shelf_1_4_divBlock.style.display = "none"
                AmountOfShelfs_section_1_shelf_1_5_divBlock.style.display = "none"
                AmountOfShelfs_section_1.style.marginBottom = "5.7em";
                Fittings_Vertical_section_1.style.height = "15.2em";
                positionOfShelf1name.innerHTML = "";
                positionOfShelf2name.innerHTML = "Position of Shelf 1";
                positionOfShelf3name.innerHTML = "Position of Shelf 2";

                //3d
                self.options.shelvesNumOnDemand = 3;
                self.createShelvingOnDemand();
                break;

                case '3':
                //ui
                AmountOfShelfs_section_1_shelf_1_1_divBlock.style.display = "block"
                AmountOfShelfs_section_1_shelf_1_2_divBlock.style.display = "block"
                AmountOfShelfs_section_1_shelf_1_3_divBlock.style.display = "block"
                AmountOfShelfs_section_1_shelf_1_4_divBlock.style.display = "none"
                AmountOfShelfs_section_1_shelf_1_5_divBlock.style.display = "none"
                AmountOfShelfs_section_1.style.marginBottom = "8em";
                Fittings_Vertical_section_1.style.height = "17em";
                positionOfShelf1name.innerHTML = "Position of Shelf 1"
                positionOfShelf2name.innerHTML = "Position of Shelf 2"
                positionOfShelf3name.innerHTML = "Position of Shelf 3"
                //3d
                self.options.shelvesNumOnDemand = 4;
                self.createShelvingOnDemand(); 
                break;
            }

        }



    //buttons to make movements of shelves inside section 1
    document.getElementById("blockForShelvesButtons_section_1_shelf_1_1_down").addEventListener('click', function() {

        if (self.shelvingOnDemand.getObjectByName( "shelfOnDemand_0_1", true ).position.y >= 100) {

            self.shelvingOnDemand.getObjectByName( "shelfOnDemand_0_1", true ).position.y -= 50;
            self.options.shelfOnDemand_0_1_State = self.shelvingOnDemand.getObjectByName( "shelfOnDemand_0_1", true ).position.y;

            console.log((self.shelvingOnDemand.getObjectByName( "shelfOnDemand_0_1", true ).position.y));
        }

    });
    document.getElementById("blockForShelvesButtons_section_1_shelf_1_1_up").addEventListener('click', function() {

        if (self.shelvingOnDemand.getObjectByName( "shelfOnDemand_0_1", true ).position.y < document.getElementById("subdomainHeightCabinet_Dimensions").value - 100) {

            self.shelvingOnDemand.getObjectByName("shelfOnDemand_0_1", true ).position.y += 50;
            self.options.shelfOnDemand_0_1_State = self.shelvingOnDemand.getObjectByName( "shelfOnDemand_0_1", true ).position.y;

        }

    }); 




    document.getElementById("blockForShelvesButtons_section_1_shelf_1_2_down").addEventListener('click', function() {

        if (self.shelvingOnDemand.getObjectByName( "shelfOnDemand_0_2", true ).position.y >= 100) {

            self.shelvingOnDemand.getObjectByName( "shelfOnDemand_0_2", true ).position.y -= 50;
            self.options.shelfOnDemand_0_1_State = self.shelvingOnDemand.getObjectByName( "shelfOnDemand_0_2", true ).position.y;

            console.log((self.shelvingOnDemand.getObjectByName( "shelfOnDemand_0_2", true ).position.y));
        }

    });
    document.getElementById("blockForShelvesButtons_section_1_shelf_1_2_up").addEventListener('click', function() {

        if (self.shelvingOnDemand.getObjectByName( "shelfOnDemand_0_2", true ).position.y < document.getElementById("subdomainHeightCabinet_Dimensions").value - 100) {

            self.shelvingOnDemand.getObjectByName("shelfOnDemand_0_2", true ).position.y += 50;
            self.options.shelfOnDemand_0_1_State = self.shelvingOnDemand.getObjectByName( "shelfOnDemand_0_2", true ).position.y;

        }

    }); 



    document.getElementById("blockForShelvesButtons_section_1_shelf_1_3_down").addEventListener('click', function() {

        if (self.shelvingOnDemand.getObjectByName( "shelfOnDemand_0_3", true ).position.y >= 100) {

            self.shelvingOnDemand.getObjectByName( "shelfOnDemand_0_3", true ).position.y -= 50;
            self.options.shelfOnDemand_0_1_State = self.shelvingOnDemand.getObjectByName( "shelfOnDemand_0_3", true ).position.y;

            console.log((self.shelvingOnDemand.getObjectByName( "shelfOnDemand_0_3", true ).position.y));
        }

    });
    document.getElementById("blockForShelvesButtons_section_1_shelf_1_3_up").addEventListener('click', function() {

        if (self.shelvingOnDemand.getObjectByName( "shelfOnDemand_0_3", true ).position.y < document.getElementById("subdomainHeightCabinet_Dimensions").value - 100) {

            self.shelvingOnDemand.getObjectByName("shelfOnDemand_0_3", true ).position.y += 50;
            self.options.shelfOnDemand_0_1_State = self.shelvingOnDemand.getObjectByName( "shelfOnDemand_0_3", true ).position.y;

        }

    }); 
    




























        //section 2

       document.getElementById("AmountOfShelfs_section_2_input").oninput = function() {

            var max = parseInt(this.max);
            if (parseInt(this.value) > max) {
            this.value = max; 
            }
            //window.alert(this.value)
            switch (this.value) {
                case '0':
                self.options.shelvesNumOnDemand_section2 = 1;
                self.createShelvingOnDemand_section2();
                //ui
                AmountOfShelfs_section_2_shelf_1_1_divBlock.style.display = "none"
                AmountOfShelfs_section_2_shelf_1_2_divBlock.style.display = "none"
                AmountOfShelfs_section_2_shelf_1_3_divBlock.style.display = "none"
                AmountOfShelfs_section_2_shelf_1_4_divBlock.style.display = "none"
                AmountOfShelfs_section_2_shelf_1_5_divBlock.style.display = "none"
                AmountOfShelfs_section_2.style.marginBottom = "3.6em";
                Fittings_Vertical_section_2.style.height = "13.8em"
                positionOfShelf1name.innerHTML = "Position of Shelf 1";
                positionOfShelf2name.innerHTML = "Position of Shelf 2";
                positionOfShelf3name.innerHTML = "Position of Shelf 3";
                break;

                case '1':
                self.options.shelvesNumOnDemand_section2 = 2;
                self.createShelvingOnDemand_section2();
                //ui
                AmountOfShelfs_section_2_shelf_1_1_divBlock.style.display = "block"
                AmountOfShelfs_section_2_shelf_1_2_divBlock.style.display = "none"
                AmountOfShelfs_section_2_shelf_1_3_divBlock.style.display = "none"
                AmountOfShelfs_section_2_shelf_1_4_divBlock.style.display = "none"
                AmountOfShelfs_section_2_shelf_1_5_divBlock.style.display = "none"
                AmountOfShelfs_section_2.style.marginBottom = "3.6em";
                Fittings_Vertical_section_2.style.height = "13.8em"
                break;

                case '2':
                self.options.shelvesNumOnDemand_section2 = 3;
                self.createShelvingOnDemand_section2();
                //ui
                AmountOfShelfs_section_2_shelf_1_1_divBlock.style.display = "block"
                AmountOfShelfs_section_2_shelf_1_2_divBlock.style.display = "block"
                AmountOfShelfs_section_2_shelf_1_3_divBlock.style.display = "none"
                AmountOfShelfs_section_2_shelf_1_4_divBlock.style.display = "none"
                AmountOfShelfs_section_2_shelf_1_5_divBlock.style.display = "none"
                AmountOfShelfs_section_2.style.marginBottom = "5.7em";
                Fittings_Vertical_section_2.style.height = "15.2em"
                break;

                case '3':
                //3d
                self.options.shelvesNumOnDemand_section2 = 4;
                self.createShelvingOnDemand_section2();
                //ui
                AmountOfShelfs_section_2_shelf_1_1_divBlock.style.display = "block"
                AmountOfShelfs_section_2_shelf_1_2_divBlock.style.display = "block"
                AmountOfShelfs_section_2_shelf_1_3_divBlock.style.display = "block"
                AmountOfShelfs_section_2_shelf_1_4_divBlock.style.display = "none"
                AmountOfShelfs_section_2_shelf_1_5_divBlock.style.display = "none"
                AmountOfShelfs_section_2.style.marginBottom = "9em";
                Fittings_Vertical_section_2.style.height = "17em"
                positionOfShelf1name.innerHTML = "Position of Shelf 1"
                positionOfShelf2name.innerHTML = "Position of Shelf 2"
                positionOfShelf3name.innerHTML = "Position of Shelf 3"
                break;
            }
        };





    //buttons to make movements of shelves inside section 2
    
    document.getElementById("blockForShelvesButtons_section_2_shelf_1_1_down").addEventListener('click', function() {

        if (self.shelvingOnDemand_section2.getObjectByName( "shelfOnDemand_section2_0_1", true ).position.y >= 100) {

            self.shelvingOnDemand_section2.getObjectByName( "shelfOnDemand_section2_0_1", true ).position.y -= 50;
            self.options.shelfOnDemand_section2_0_1_State = self.shelvingOnDemand_section2.getObjectByName( "shelfOnDemand_section2_0_1", true ).position.y;
        }

    });
    document.getElementById("blockForShelvesButtons_section_2_shelf_1_1_up").addEventListener('click', function() {

        if (self.shelvingOnDemand_section2.getObjectByName( "shelfOnDemand_section2_0_1", true ).position.y < document.getElementById("subdomainHeightCabinet_Dimensions").value - 100) {

            self.shelvingOnDemand_section2.getObjectByName("shelfOnDemand_section2_0_1", true ).position.y += 50;
            self.options.shelfOnDemand_section2_0_1_State = self.shelvingOnDemand_section2.getObjectByName( "shelfOnDemand_section2_0_1", true ).position.y;
        }

    }); 



    document.getElementById("blockForShelvesButtons_section_2_shelf_1_2_down").addEventListener('click', function() {

        if (self.shelvingOnDemand_section2.getObjectByName( "shelfOnDemand_section2_0_2", true ).position.y >= 100) {

            self.shelvingOnDemand_section2.getObjectByName( "shelfOnDemand_section2_0_2", true ).position.y -= 50;
            self.options.shelfOnDemand_section2_0_2_State = self.shelvingOnDemand_section2.getObjectByName( "shelfOnDemand_section2_0_2", true ).position.y;
        }

    });
    document.getElementById("blockForShelvesButtons_section_2_shelf_1_2_up").addEventListener('click', function() {

        if (self.shelvingOnDemand_section2.getObjectByName( "shelfOnDemand_section2_0_2", true ).position.y < document.getElementById("subdomainHeightCabinet_Dimensions").value - 100) {

            self.shelvingOnDemand_section2.getObjectByName("shelfOnDemand_section2_0_2", true ).position.y += 50;
            self.options.shelfOnDemand_section2_0_2_State = self.shelvingOnDemand_section2.getObjectByName( "shelfOnDemand_section2_0_2", true ).position.y;
        }
    }); 



    document.getElementById("blockForShelvesButtons_section_2_shelf_1_3_down").addEventListener('click', function() {

        if (self.shelvingOnDemand_section2.getObjectByName( "shelfOnDemand_section2_0_3", true ).position.y >= 100) {

            self.shelvingOnDemand_section2.getObjectByName( "shelfOnDemand_section2_0_3", true ).position.y -= 50;
            self.options.shelfOnDemand_section2_0_3_State = self.shelvingOnDemand_section2.getObjectByName( "shelfOnDemand_section2_0_3", true ).position.y;
        }

    });
    document.getElementById("blockForShelvesButtons_section_2_shelf_1_3_up").addEventListener('click', function() {

        if (self.shelvingOnDemand_section2.getObjectByName( "shelfOnDemand_section2_0_3", true ).position.y < document.getElementById("subdomainHeightCabinet_Dimensions").value - 100) {

            self.shelvingOnDemand_section2.getObjectByName("shelfOnDemand_section2_0_3", true ).position.y += 50;
            self.options.shelfOnDemand_section2_0_3_State = self.shelvingOnDemand_section2.getObjectByName( "shelfOnDemand_section2_0_3", true ).position.y;
        }
    }); 



    





         /*  to delete (15 auagst 2022)
        var VARblockForShelvesButtons_section_2_shelf_1_1_down = document.getElementById("blockForShelvesButtons_section_2_shelf_1_1_down");
        VARblockForShelvesButtons_section_2_shelf_1_1_down.addEventListener('click', function() {

            self.shelvingOnDemand_section2.getObjectByName( "shelfOnDemand_section2_0_1", true ).position.y -= 50;
            self.options.shelfOnDemand_section2_0_1_State = self.shelvingOnDemand_section2.getObjectByName( "shelfOnDemand_section2_0_1", true ).position.y;
        });


        var VARblockForShelvesButtons_section_2_shelf_1_1_up = document.getElementById("blockForShelvesButtons_section_2_shelf_1_1_up");
        VARblockForShelvesButtons_section_2_shelf_1_1_up.addEventListener('click', function() {
            self.shelvingOnDemand_section2.getObjectByName( "shelfOnDemand_section2_0_1", true ).position.y += 50;
            self.options.shelfOnDemand_section2_0_1_State = self.shelvingOnDemand_section2.getObjectByName( "shelfOnDemand_section2_0_1", true ).position.y;
        });

        var VARblockForShelvesButtons_section_2_shelf_1_2_down = document.getElementById("blockForShelvesButtons_section_2_shelf_1_2_down");
        VARblockForShelvesButtons_section_2_shelf_1_2_down.addEventListener('click', function() {
            self.shelvingOnDemand_section2.getObjectByName( "shelfOnDemand_section2_0_2", true ).position.y -= 50;
            self.options.shelfOnDemand_section2_0_2_State = self.shelvingOnDemand_section2.getObjectByName("shelfOnDemand_section2_0_2", true ).position.y;
        });
         var VARblockForShelvesButtons_section_2_shelf_1_2_up = document.getElementById("blockForShelvesButtons_section_2_shelf_1_2_up");
         VARblockForShelvesButtons_section_2_shelf_1_2_up.addEventListener('click', function() {
            self.shelvingOnDemand_section2.getObjectByName( "shelfOnDemand_section2_0_2", true ).position.y += 50;
            self.options.shelfOnDemand_section2_0_2_State = self.shelvingOnDemand_section2.getObjectByName( "shelfOnDemand_section2_0_2", true ).position.y;
        }); 

        var VARblockForShelvesButtons_section_2_shelf_1_3_down = document.getElementById("blockForShelvesButtons_section_2_shelf_1_3_down");
        VARblockForShelvesButtons_section_2_shelf_1_3_down.addEventListener('click', function() {
            self.shelvingOnDemand_section2.getObjectByName( "shelfOnDemand_section2_0_3", true ).position.y -= 50;
            self.options.shelfOnDemand_section2_0_3_State = self.shelvingOnDemand_section2.getObjectByName( "shelfOnDemand_section2_0_3", true ).position.y;
        });

        var VARblockForShelvesButtons_section_2_shelf_1_3_up = document.getElementById("blockForShelvesButtons_section_2_shelf_1_3_up");
        VARblockForShelvesButtons_section_2_shelf_1_3_up.addEventListener('click', function() {
            self.shelvingOnDemand_section2.getObjectByName( "shelfOnDemand_section2_0_3", true ).position.y += 50;
            self.options.shelfOnDemand_section2_0_3_State = self.shelvingOnDemand_section2.getObjectByName( "shelfOnDemand_section2_0_3", true ).position.y;
        });  */




















































































        //MATERIALS HTML  EVENTS 18FEB

        //Wood1
        var SingleMaterial_materials_mainBlock_jsVar = document.getElementById("SingleMaterial_materials_mainBlock_Wood1");
        //this.widthElem1 = widthElem1;

        SingleMaterial_materials_mainBlock_jsVar.addEventListener('click', function() {
            var material1Var = self.textures[3];

            self.options.pillar.texture = 2;
            self.options.shelf.texture = 2;
       
           // self.options.pillar.height = document.getElementById("subdomainHeightCabinet_Dimensions").value;
            self.changePillarTexture(); 
            self.changeShelfTexture(); 
            self.calculateOutput();

            SingleMaterial_materials_mainBlock_Wood1.style.background = "#288e23f7";

            SingleMaterial_materials_mainBlock_Material2.style.background = "#0000000f";
            SingleMaterial_materials_mainBlock_Material3.style.background = "#0000000f";
            SingleMaterial_materials_mainBlock_Material4.style.background = "#0000000f";
            SingleMaterial_materials_mainBlock_Material5.style.background = "#0000000f";
            SingleMaterial_materials_mainBlock_Material6.style.background = "#0000000f";
            SingleMaterial_materials_mainBlock_Material7.style.background = "#0000000f";
            SingleMaterial_materials_mainBlock_Material8.style.background = "#0000000f";
            SingleMaterial_materials_mainBlock_Material9.style.background = "#0000000f";
            SingleMaterial_materials_mainBlock_Material10.style.background = "#0000000f";
            SingleMaterial_materials_mainBlock_Material11.style.background = "#0000000f";

            var SingleMaterial_materials_mainBlockVARSTATE = SingleMaterial_materials_mainBlock_Wood1.style.background;
        });


        //Material2
        var SingleMaterial_materials_mainBlock_Material2_jsVar = document.getElementById("SingleMaterial_materials_mainBlock_Material2");
        //this.widthElem1 = widthElem1;

        SingleMaterial_materials_mainBlock_Material2_jsVar.addEventListener('click', function() {

            self.options.pillar.texture = 1;
            self.options.shelf.texture = 1;

           // self.options.pillar.height = document.getElementById("subdomainHeightCabinet_Dimensions").value;
            self.changePillarTexture(); 
            self.changeShelfTexture(); 
            self.calculateOutput();
    
            SingleMaterial_materials_mainBlock_Wood1.style.background = "#0000000f";
            SingleMaterial_materials_mainBlock_Material3.style.background = "#0000000f";
            SingleMaterial_materials_mainBlock_Material4.style.background = "#0000000f";
            SingleMaterial_materials_mainBlock_Material5.style.background = "#0000000f";
            SingleMaterial_materials_mainBlock_Material6.style.background = "#0000000f";
            SingleMaterial_materials_mainBlock_Material7.style.background = "#0000000f";
            SingleMaterial_materials_mainBlock_Material8.style.background = "#0000000f";
            SingleMaterial_materials_mainBlock_Material9.style.background = "#0000000f";
            SingleMaterial_materials_mainBlock_Material10.style.background = "#0000000f";
            SingleMaterial_materials_mainBlock_Material11.style.background = "#0000000f";


            SingleMaterial_materials_mainBlock_Material2.style.background = "#288e23f7";
        
            var SingleMaterial_materials_mainBlockVARSTATE = SingleMaterial_materials_mainBlock_Material2.style.background;
        });


        //Material3
        var SingleMaterial_materials_mainBlock_Material3_jsVar = document.getElementById("SingleMaterial_materials_mainBlock_Material3");
        //this.widthElem1 = widthElem1;

        SingleMaterial_materials_mainBlock_Material3_jsVar.addEventListener('click', function() {

            self.options.pillar.texture = 3;
            self.options.shelf.texture = 3;

            // self.options.pillar.height = document.getElementById("subdomainHeightCabinet_Dimensions").value;
            self.changePillarTexture(); 
            self.changeShelfTexture(); 
            self.calculateOutput();
    
            SingleMaterial_materials_mainBlock_Wood1.style.background = "#0000000f";
            SingleMaterial_materials_mainBlock_Material2.style.background = "#0000000f";
            SingleMaterial_materials_mainBlock_Material4.style.background = "#0000000f";
            SingleMaterial_materials_mainBlock_Material5.style.background = "#0000000f";
            SingleMaterial_materials_mainBlock_Material6.style.background = "#0000000f";
            SingleMaterial_materials_mainBlock_Material7.style.background = "#0000000f";
            SingleMaterial_materials_mainBlock_Material8.style.background = "#0000000f";
            SingleMaterial_materials_mainBlock_Material9.style.background = "#0000000f";
            SingleMaterial_materials_mainBlock_Material10.style.background = "#0000000f";
            SingleMaterial_materials_mainBlock_Material11.style.background = "#0000000f";



        SingleMaterial_materials_mainBlock_Material3.style.background = "#288e23f7";

        var SingleMaterial_materials_mainBlockVARSTATE = SingleMaterial_materials_mainBlock_Material2.style.background;
        });



        //Material4
        
        var SingleMaterial_materials_mainBlock_Material4_jsVar = document.getElementById("SingleMaterial_materials_mainBlock_Material4");

        SingleMaterial_materials_mainBlock_Material4_jsVar.addEventListener('click', function() {

            self.options.pillar.texture = 4;
            self.options.shelf.texture = 4;

            self.changePillarTexture(); 
            self.changeShelfTexture(); 
            self.calculateOutput();
    
            SingleMaterial_materials_mainBlock_Wood1.style.background = "#0000000f";
            SingleMaterial_materials_mainBlock_Material2.style.background = "#0000000f";
            SingleMaterial_materials_mainBlock_Material3.style.background = "#0000000f";
            SingleMaterial_materials_mainBlock_Material5.style.background = "#0000000f";
            SingleMaterial_materials_mainBlock_Material6.style.background = "#0000000f";
            SingleMaterial_materials_mainBlock_Material7.style.background = "#0000000f";
            SingleMaterial_materials_mainBlock_Material8.style.background = "#0000000f";
            SingleMaterial_materials_mainBlock_Material9.style.background = "#0000000f";
            SingleMaterial_materials_mainBlock_Material10.style.background = "#0000000f";
            SingleMaterial_materials_mainBlock_Material11.style.background = "#0000000f";


        SingleMaterial_materials_mainBlock_Material4.style.background = "#288e23f7";

        var SingleMaterial_materials_mainBlockVARSTATE = SingleMaterial_materials_mainBlock_Material2.style.background;
        });

            
        //Material5
        var SingleMaterial_materials_mainBlock_Material5_jsVar = document.getElementById("SingleMaterial_materials_mainBlock_Material5");
        //this.widthElem1 = widthElem1;

        SingleMaterial_materials_mainBlock_Material5_jsVar.addEventListener('click', function() {

            self.options.pillar.texture = 5;
            self.options.shelf.texture = 5;
            // self.options.pillar.height = document.getElementById("subdomainHeightCabinet_Dimensions").value;
            self.changePillarTexture(); 
            self.changeShelfTexture(); 
            self.calculateOutput();
    
            SingleMaterial_materials_mainBlock_Wood1.style.background = "#0000000f";
            SingleMaterial_materials_mainBlock_Material2.style.background = "#0000000f";
            SingleMaterial_materials_mainBlock_Material3.style.background = "#0000000f";
            SingleMaterial_materials_mainBlock_Material4.style.background = "#0000000f";
            SingleMaterial_materials_mainBlock_Material6.style.background = "#0000000f";
            SingleMaterial_materials_mainBlock_Material7.style.background = "#0000000f";
            SingleMaterial_materials_mainBlock_Material8.style.background = "#0000000f";
            SingleMaterial_materials_mainBlock_Material9.style.background = "#0000000f";
            SingleMaterial_materials_mainBlock_Material10.style.background = "#0000000f";
            SingleMaterial_materials_mainBlock_Material11.style.background = "#0000000f";

            SingleMaterial_materials_mainBlock_Material5.style.background = "#288e23f7";
        
            var SingleMaterial_materials_mainBlockVARSTATE = SingleMaterial_materials_mainBlock_Material2.style.background;
        });


        //Material6
        var SingleMaterial_materials_mainBlock_Material6_jsVar = document.getElementById("SingleMaterial_materials_mainBlock_Material6");
        //this.widthElem1 = widthElem1;

        SingleMaterial_materials_mainBlock_Material6_jsVar.addEventListener('click', function() {

            self.options.pillar.texture = 6;
            self.options.shelf.texture = 6;
            // self.options.pillar.height = document.getElementById("subdomainHeightCabinet_Dimensions").value;
            self.changePillarTexture(); 
            self.changeShelfTexture(); 
            self.calculateOutput();
            SingleMaterial_materials_mainBlock_Wood1.style.background = "#0000000f";
            SingleMaterial_materials_mainBlock_Material2.style.background = "#0000000f";
            SingleMaterial_materials_mainBlock_Material3.style.background = "#0000000f";
            SingleMaterial_materials_mainBlock_Material4.style.background = "#0000000f";
            SingleMaterial_materials_mainBlock_Material5.style.background = "#0000000f";
            SingleMaterial_materials_mainBlock_Material7.style.background = "#0000000f";
            SingleMaterial_materials_mainBlock_Material8.style.background = "#0000000f";
            SingleMaterial_materials_mainBlock_Material9.style.background = "#0000000f";
            SingleMaterial_materials_mainBlock_Material10.style.background = "#0000000f";
            SingleMaterial_materials_mainBlock_Material11.style.background = "#0000000f";

            SingleMaterial_materials_mainBlock_Material6.style.background = "#288e23f7";
        
           var SingleMaterial_materials_mainBlockVARSTATE = SingleMaterial_materials_mainBlock_Material2.style.background;

        });




        //Material7
        var SingleMaterial_materials_mainBlock_Material7_jsVar = document.getElementById("SingleMaterial_materials_mainBlock_Material7");
        //this.widthElem1 = widthElem1;

        SingleMaterial_materials_mainBlock_Material7_jsVar.addEventListener('click', function() {

            self.options.pillar.texture = 7;
            self.options.shelf.texture = 7;
            // self.options.pillar.height = document.getElementById("subdomainHeightCabinet_Dimensions").value;
            self.changePillarTexture(); 
            self.changeShelfTexture(); 
            self.calculateOutput();
    
            SingleMaterial_materials_mainBlock_Wood1.style.background = "#0000000f";
            SingleMaterial_materials_mainBlock_Material2.style.background = "#0000000f";
            SingleMaterial_materials_mainBlock_Material3.style.background = "#0000000f";
            SingleMaterial_materials_mainBlock_Material4.style.background = "#0000000f";
            SingleMaterial_materials_mainBlock_Material5.style.background = "#0000000f";
            SingleMaterial_materials_mainBlock_Material6.style.background = "#0000000f";
            SingleMaterial_materials_mainBlock_Material8.style.background = "#0000000f";
            SingleMaterial_materials_mainBlock_Material9.style.background = "#0000000f";
            SingleMaterial_materials_mainBlock_Material10.style.background = "#0000000f";
            SingleMaterial_materials_mainBlock_Material11.style.background = "#0000000f";

            SingleMaterial_materials_mainBlock_Material7.style.background = "#288e23f7";
        
            var SingleMaterial_materials_mainBlockVARSTATE = SingleMaterial_materials_mainBlock_Material2.style.background;
        });
        






        //Material8
        var SingleMaterial_materials_mainBlock_Material8_jsVar = document.getElementById("SingleMaterial_materials_mainBlock_Material8");
        //this.widthElem1 = widthElem1;

        SingleMaterial_materials_mainBlock_Material8_jsVar.addEventListener('click', function() {

            self.options.pillar.texture = 8;
            self.options.shelf.texture = 8;
            // self.options.pillar.height = document.getElementById("subdomainHeightCabinet_Dimensions").value;
            self.changePillarTexture(); 
            self.changeShelfTexture(); 
            self.calculateOutput();
    
            SingleMaterial_materials_mainBlock_Wood1.style.background = "#0000000f";
            SingleMaterial_materials_mainBlock_Material2.style.background = "#0000000f";
            SingleMaterial_materials_mainBlock_Material3.style.background = "#0000000f";
            SingleMaterial_materials_mainBlock_Material4.style.background = "#0000000f";
            SingleMaterial_materials_mainBlock_Material5.style.background = "#0000000f";
            SingleMaterial_materials_mainBlock_Material6.style.background = "#0000000f";
            SingleMaterial_materials_mainBlock_Material7.style.background = "#0000000f";
            SingleMaterial_materials_mainBlock_Material9.style.background = "#0000000f";
            SingleMaterial_materials_mainBlock_Material10.style.background = "#0000000f";
            SingleMaterial_materials_mainBlock_Material11.style.background = "#0000000f";

            SingleMaterial_materials_mainBlock_Material8.style.background = "#288e23f7";
        
            var SingleMaterial_materials_mainBlockVARSTATE = SingleMaterial_materials_mainBlock_Material2.style.background;
        });




        //Material9
        var SingleMaterial_materials_mainBlock_Material9_jsVar = document.getElementById("SingleMaterial_materials_mainBlock_Material9");
        //this.widthElem1 = widthElem1;

        SingleMaterial_materials_mainBlock_Material9_jsVar.addEventListener('click', function() {

            self.options.pillar.texture = 9;
            self.options.shelf.texture = 9;
            // self.options.pillar.height = document.getElementById("subdomainHeightCabinet_Dimensions").value;
            self.changePillarTexture(); 
            self.changeShelfTexture(); 
            self.calculateOutput();
            SingleMaterial_materials_mainBlock_Wood1.style.background = "#0000000f";
            SingleMaterial_materials_mainBlock_Material2.style.background = "#0000000f";
            SingleMaterial_materials_mainBlock_Material3.style.background = "#0000000f";
            SingleMaterial_materials_mainBlock_Material4.style.background = "#0000000f";
            SingleMaterial_materials_mainBlock_Material5.style.background = "#0000000f";
            SingleMaterial_materials_mainBlock_Material6.style.background = "#0000000f";
            SingleMaterial_materials_mainBlock_Material7.style.background = "#0000000f";
            SingleMaterial_materials_mainBlock_Material8.style.background = "#0000000f";
            SingleMaterial_materials_mainBlock_Material10.style.background = "#0000000f";
            SingleMaterial_materials_mainBlock_Material11.style.background = "#0000000f";


            SingleMaterial_materials_mainBlock_Material9.style.background = "#288e23f7";
        
            var SingleMaterial_materials_mainBlockVARSTATE = SingleMaterial_materials_mainBlock_Material2.style.background;
        });




        //Material10
        var SingleMaterial_materials_mainBlock_Material10_jsVar = document.getElementById("SingleMaterial_materials_mainBlock_Material10");
        //this.widthElem1 = widthElem1;

        SingleMaterial_materials_mainBlock_Material10_jsVar.addEventListener('click', function() {

            self.options.pillar.texture = 10;
            self.options.shelf.texture = 10;
            // self.options.pillar.height = document.getElementById("subdomainHeightCabinet_Dimensions").value;
            self.changePillarTexture(); 
            self.changeShelfTexture(); 
            self.calculateOutput();
            SingleMaterial_materials_mainBlock_Wood1.style.background = "#0000000f";
            SingleMaterial_materials_mainBlock_Material2.style.background = "#0000000f";
            SingleMaterial_materials_mainBlock_Material3.style.background = "#0000000f";
            SingleMaterial_materials_mainBlock_Material4.style.background = "#0000000f";
            SingleMaterial_materials_mainBlock_Material5.style.background = "#0000000f";
            SingleMaterial_materials_mainBlock_Material6.style.background = "#0000000f";
            SingleMaterial_materials_mainBlock_Material7.style.background = "#0000000f";
            SingleMaterial_materials_mainBlock_Material8.style.background = "#0000000f";
            SingleMaterial_materials_mainBlock_Material9.style.background = "#0000000f";
            SingleMaterial_materials_mainBlock_Material11.style.background = "#0000000f";

            SingleMaterial_materials_mainBlock_Material10.style.background = "#288e23f7";
        
            var SingleMaterial_materials_mainBlockVARSTATE = SingleMaterial_materials_mainBlock_Material2.style.background;
        });




        //Material11
        var SingleMaterial_materials_mainBlock_Material11_jsVar = document.getElementById("SingleMaterial_materials_mainBlock_Material11");

        SingleMaterial_materials_mainBlock_Material11_jsVar.addEventListener('click', function() {

            self.options.pillar.texture = 11;
            self.options.shelf.texture = 11;
            // self.options.pillar.height = document.getElementById("subdomainHeightCabinet_Dimensions").value;
            self.changePillarTexture(); 
            self.changeShelfTexture(); 
            self.calculateOutput();
    
            SingleMaterial_materials_mainBlock_Wood1.style.background = "#0000000f";
            SingleMaterial_materials_mainBlock_Material2.style.background = "#0000000f";
            SingleMaterial_materials_mainBlock_Material3.style.background = "#0000000f";
            SingleMaterial_materials_mainBlock_Material4.style.background = "#0000000f";
            SingleMaterial_materials_mainBlock_Material5.style.background = "#0000000f";
            SingleMaterial_materials_mainBlock_Material6.style.background = "#0000000f";
            SingleMaterial_materials_mainBlock_Material7.style.background = "#0000000f";
            SingleMaterial_materials_mainBlock_Material8.style.background = "#0000000f";
            SingleMaterial_materials_mainBlock_Material9.style.background = "#0000000f";
            SingleMaterial_materials_mainBlock_Material10.style.background = "#0000000f";
            SingleMaterial_materials_mainBlock_Material11.style.background = "#0000000f";


            SingleMaterial_materials_mainBlock_Material11.style.background = "#288e23f7";
        
            var SingleMaterial_materials_mainBlockVARSTATE = SingleMaterial_materials_mainBlock_Material2.style.background;
        });










        //ELEMENTS INTERNALS 13MARz

        //Elements1
        var Elements1_jsVar = document.getElementById("SingleBlock_Elements1");
        Elements1_jsVar.addEventListener('click', function() {

            //self.options.pillar.texture = 1;
            //self.options.pillar.height = document.getElementById("subdomainHeightCabinet_Dimensions").value;
            self.changePillarTexture(); 
            self.calculateOutput();

            SingleBlock_Elements2.style.background = "#0000000f";
            SingleBlock_Elements3.style.background = "#0000000f";
            SingleBlock_Elements4.style.background = "#0000000f";
            SingleBlock_Elements5.style.background = "#0000000f";
            SingleBlock_Elements6.style.background = "#0000000f";
            SingleBlock_Elements7.style.background = "#0000000f";
            SingleBlock_Elements8.style.background = "#0000000f";
            SingleBlock_Elements9.style.background = "#0000000f";
            SingleBlock_Elements1.style.background = "#288e23f7";
        });


        //Elements2
        var Elements2_jsVar = document.getElementById("SingleBlock_Elements2");
        Elements2_jsVar.addEventListener('click', function() {
            self.changePillarTexture(); 
            self.calculateOutput();
            SingleBlock_Elements1.style.background = "#0000000f";
            SingleBlock_Elements3.style.background = "#0000000f";
            SingleBlock_Elements4.style.background = "#0000000f";
            SingleBlock_Elements5.style.background = "#0000000f";
            SingleBlock_Elements6.style.background = "#0000000f";
            SingleBlock_Elements7.style.background = "#0000000f";
            SingleBlock_Elements8.style.background = "#0000000f";
            SingleBlock_Elements9.style.background = "#0000000f";
            SingleBlock_Elements2.style.background = "#288e23f7";
        });

        //Elements3
        var Elements3_jsVar = document.getElementById("SingleBlock_Elements3");
        Elements3_jsVar.addEventListener('click', function() {
            self.changePillarTexture(); 
            self.calculateOutput();
            SingleBlock_Elements1.style.background = "#0000000f";
            SingleBlock_Elements2.style.background = "#0000000f";
            SingleBlock_Elements4.style.background = "#0000000f";
            SingleBlock_Elements5.style.background = "#0000000f";
            SingleBlock_Elements6.style.background = "#0000000f";
            SingleBlock_Elements7.style.background = "#0000000f";
            SingleBlock_Elements8.style.background = "#0000000f";
            SingleBlock_Elements9.style.background = "#0000000f";
            SingleBlock_Elements3.style.background = "#288e23f7";
        });



        //Elements4
        var Elements4_jsVar = document.getElementById("SingleBlock_Elements4");
        Elements4_jsVar.addEventListener('click', function() {

            self.changePillarTexture(); 
            self.calculateOutput();

            SingleBlock_Elements1.style.background = "#0000000f";
            SingleBlock_Elements2.style.background = "#0000000f";
            SingleBlock_Elements3.style.background = "#0000000f";
            SingleBlock_Elements5.style.background = "#0000000f";
            SingleBlock_Elements6.style.background = "#0000000f";
            SingleBlock_Elements7.style.background = "#0000000f";
            SingleBlock_Elements8.style.background = "#0000000f";
            SingleBlock_Elements9.style.background = "#0000000f";

            SingleBlock_Elements4.style.background = "#288e23f7";

        });


        //Elements5
        var Elements5_jsVar = document.getElementById("SingleBlock_Elements5");
        Elements5_jsVar.addEventListener('click', function() {
            //self.options.pillar.texture = 1;
            //self.options.pillar.height = document.getElementById("subdomainHeightCabinet_Dimensions").value;
            self.changePillarTexture(); 
            self.calculateOutput();
            SingleBlock_Elements1.style.background = "#0000000f";
            SingleBlock_Elements2.style.background = "#0000000f";
            SingleBlock_Elements3.style.background = "#0000000f";
            SingleBlock_Elements4.style.background = "#0000000f";
            SingleBlock_Elements6.style.background = "#0000000f";
            SingleBlock_Elements7.style.background = "#0000000f";
            SingleBlock_Elements8.style.background = "#0000000f";
            SingleBlock_Elements9.style.background = "#0000000f";
            SingleBlock_Elements5.style.background = "#288e23f7";

        });
        //Elements6
        var Elements6_jsVar = document.getElementById("SingleBlock_Elements6");
        Elements6_jsVar.addEventListener('click', function() {

            //self.options.pillar.texture = 1;
            // self.options.pillar.height = document.getElementById("subdomainHeightCabinet_Dimensions").value;
            self.changePillarTexture(); 
            self.calculateOutput();

            SingleBlock_Elements1.style.background = "#0000000f";
            SingleBlock_Elements2.style.background = "#0000000f";
            SingleBlock_Elements3.style.background = "#0000000f";
            SingleBlock_Elements4.style.background = "#0000000f";
            SingleBlock_Elements5.style.background = "#0000000f";
            SingleBlock_Elements7.style.background = "#0000000f";
            SingleBlock_Elements8.style.background = "#0000000f";
            SingleBlock_Elements9.style.background = "#0000000f";


            SingleBlock_Elements6.style.background = "#288e23f7";

        });

        //Elements7
        var Elements7_jsVar = document.getElementById("SingleBlock_Elements7");
        Elements7_jsVar.addEventListener('click', function() {
            self.changePillarTexture(); 
            self.calculateOutput();
            SingleBlock_Elements1.style.background = "#0000000f";
            SingleBlock_Elements2.style.background = "#0000000f";
            SingleBlock_Elements3.style.background = "#0000000f";
            SingleBlock_Elements4.style.background = "#0000000f";
            SingleBlock_Elements5.style.background = "#0000000f";
            SingleBlock_Elements6.style.background = "#0000000f";
            SingleBlock_Elements8.style.background = "#0000000f";
            SingleBlock_Elements9.style.background = "#0000000f";
            SingleBlock_Elements7.style.background = "#288e23f7";
        });


        //Elements8
        var Elements8_jsVar = document.getElementById("SingleBlock_Elements8");
        Elements8_jsVar.addEventListener('click', function() {
            self.changePillarTexture(); 
            self.calculateOutput();
            SingleBlock_Elements1.style.background = "#0000000f";
            SingleBlock_Elements2.style.background = "#0000000f";
            SingleBlock_Elements3.style.background = "#0000000f";
            SingleBlock_Elements4.style.background = "#0000000f";
            SingleBlock_Elements5.style.background = "#0000000f";
            SingleBlock_Elements6.style.background = "#0000000f";
            SingleBlock_Elements7.style.background = "#0000000f";
            SingleBlock_Elements9.style.background = "#0000000f";
            SingleBlock_Elements8.style.background = "#288e23f7";
        });

        //Elements9
        var Elements9_jsVar = document.getElementById("SingleBlock_Elements9");
        Elements9_jsVar.addEventListener('click', function() {
            self.changePillarTexture(); 
            self.calculateOutput();
            SingleBlock_Elements1.style.background = "#0000000f";
            SingleBlock_Elements2.style.background = "#0000000f";
            SingleBlock_Elements3.style.background = "#0000000f";
            SingleBlock_Elements4.style.background = "#0000000f";
            SingleBlock_Elements5.style.background = "#0000000f";
            SingleBlock_Elements6.style.background = "#0000000f";
            SingleBlock_Elements7.style.background = "#0000000f";
            SingleBlock_Elements8.style.background = "#0000000f";
            SingleBlock_Elements9.style.background = "#288e23f7";
        });
























































        document.getElementById("topPane_price").innerHTML = ""+"£"+10.21;

        document.getElementById("bodyVar").addEventListener('click', function() {
            
            document.getElementById("topPane_price").innerHTML = ""+"$"+self.output.price;
            
            /* document.getElementById("positionPillar1").innerHTML = self.options.section1Length+"cm↔"; */
            /* document.getElementById("positionSection1").innerHTML = self.options.section1Length+"cm↔"; */
            /* document.getElementById("positionSection2").innerHTML = self.options.section2Length+"cm↔";  */

            /* 
            document.getElementById("positionSection1_Shelf1").innerHTML = self.shelvingOnDemand.getObjectByName( "shelfOnDemand_0_1", true ).position.y+" cm↔";
            document.getElementById("positionSection1_Shelf2").innerHTML = self.shelvingOnDemand.getObjectByName( "shelfOnDemand_0_2", true ).position.y+" cm↔";
            document.getElementById("positionSection1_Shelf3").innerHTML = self.shelvingOnDemand.getObjectByName( "shelfOnDemand_0_3", true ).position.y+" cm↔";

            document.getElementById("positionSection2_Shelf1").innerHTML = self.shelvingOnDemand_section2.getObjectByName( "shelfOnDemand_section2_0_1", true ).position.y+" cm↔";
            document.getElementById("positionSection2_Shelf2").innerHTML = self.shelvingOnDemand_section2.getObjectByName( "shelfOnDemand_section2_0_2", true ).position.y+" cm↔";
            document.getElementById("positionSection2_Shelf3").innerHTML = self.shelvingOnDemand_section2.getObjectByName( "shelfOnDemand_section2_0_3", true ).position.y+" cm↔";

            self.options.shelfOnDemand_0_1_State = self.shelvingOnDemand.getObjectByName( "shelfOnDemand_0_1", true ).position.y;
            self.options.shelfOnDemand_0_2_State = self.shelvingOnDemand.getObjectByName( "shelfOnDemand_0_2", true ).position.y;
            self.options.shelfOnDemand_0_3_State = self.shelvingOnDemand.getObjectByName( "shelfOnDemand_0_3", true ).position.y;

            self.options.shelfOnDemand_section2_0_1_State = self.shelvingOnDemand_section2.getObjectByName( "shelfOnDemand_section2_0_1", true ).position.y;
            self.options.shelfOnDemand_section2_0_2_State = self.shelvingOnDemand_section2.getObjectByName("shelfOnDemand_section2_0_2", true ).position.y;
            self.options.shelfOnDemand_section2_0_3_State = self.shelvingOnDemand_section2.getObjectByName( "shelfOnDemand_section2_0_3", true ).position.y; */
        });


        
        document.getElementById("Fittings_Vertical_section_1").addEventListener('click', function() {

          /*   document.getElementById("positionSection1_Shelf1").innerHTML = "@"+self.shelvingOnDemand.getObjectByName( "shelfOnDemand_0_1", true ).position.y+"cm↔";
            document.getElementById("positionSection1_Shelf2").innerHTML = "@"+self.shelvingOnDemand.getObjectByName( "shelfOnDemand_0_2", true ).position.y+"cm↔";
            document.getElementById("positionSection1_Shelf3").innerHTML = "@"+self.shelvingOnDemand.getObjectByName( "shelfOnDemand_0_3", true ).position.y+"cm↔"; */

        });

    



        document.getElementById("Fittings_Vertical_section_2").addEventListener('click', function() {

            document.getElementById("positionSection2_Shelf1").innerHTML = "@"+self.shelvingOnDemand_section2.getObjectByName( "shelfOnDemand_section2_0_3", true ).position.y+"cm↔";
            document.getElementById("positionSection2_Shelf2").innerHTML = "@"+self.shelvingOnDemand_section2.getObjectByName( "shelfOnDemand_section2_0_2", true ).position.y+"cm↔";
            document.getElementById("positionSection2_Shelf3").innerHTML = "@"+self.shelvingOnDemand_section2.getObjectByName( "shelfOnDemand_section2_0_1", true ).position.y+"cm↔";

        });


        //self.options.section1Length 
        //self.options.section2Length 
        //self.shelvingOnDemand_section2.getObjectByName("shelfOnDemand_section2_0_1", true ).position.y 





        //SHOW 3D VIEW DIMENSIONS
        var DimensionsShowStatus = 1;
        var showDimensionsClick = document.getElementById("white3DTopPanel_ruler_text");
        //24apr turned off dims for some short time 
        showDimensionsClick.addEventListener('click', function() {
            if (DimensionsShowStatus == 0) {
                self.updateShelving();
                self.removeDimensions();
                white3DTopPanel_ruler_text.style.opacity = "1";
                white3DTopPanel_ruler.style.opacity = "1";
                DimensionsShowStatus = 1;
            }
            else if (DimensionsShowStatus == 1) {
                self.updateShelving();
                self.createDimensions_width();
                self.createDimensions_height();
                self.createDimensions_Depth();
                white3DTopPanel_ruler_text.style.opacity = "0.3";
                white3DTopPanel_ruler.style.opacity = "0.3";
                DimensionsShowStatus = 0; 
            }
        });
        /*
        var showDimensionsClickOn = document.getElementById("white3DTopPanel_ruler_text_on");
        var showDimensionsClickOff = document.getElementById("white3DTopPanel_ruler_text_off");
        showDimensionsClickOn.addEventListener('click', function() {
                self.updateShelving();
                self.createDimensions_width();
                self.createDimensions_height();
                self.createDimensions_Depth();
                showDimensionsClickOff.style.opacity = "0.3";
                showDimensionsClickOn.style.opacity = "0.8";
        });
        showDimensionsClickOff.addEventListener('click', function() {
            
            self.updateShelving();
            self.removeDimensions();
            showDimensionsClickOn.style.opacity = "0.3";
            showDimensionsClickOff.style.opacity = "0.8";
        });
        */
        






        //SHOW DOORS
        /*  var DoorsShowStatus = 0;
        var showDoorsClick = document.getElementById("white3DTopPanel_doors_text");
        showDoorsClick.addEventListener('click', function() {
            if (DoorsShowStatus == 0) {

                if (DoorsStatus == 1) {
                    self.add_Doors1();
                    self.add_Handle7();  
                }
                    
                else if (DoorsStatus == 2) {
                    self.add_Doors2();
                    self.add_Handle7_2();       
                }
                white3DTopPanel_doors.style.opacity = "1";
                white3DTopPanel_doors_text.style.opacity = "1";
                DoorsShowStatus = 1; 
            }
        
            else if (DoorsShowStatus == 1) {
                self.remove_Doors1();
                self.remove_Doors2();  
                self.remove_Handle7();  
                self.remove_Handle7_2();  
                white3DTopPanel_doors.style.opacity = "0.3";
                white3DTopPanel_doors_text.style.opacity = "0.3";
                DoorsShowStatus = 0; 
            }
        }); 
 */
    

        //23May Run the app >>

        this.textureLoader = new THREE.TextureLoader(this.loader);
        this.fontloader = new THREE.FontLoader(this.loader);
        var loader = new THREE.LoadingManager();
        loader.onLoad = function() {
            self.onAssetsLoaded();
        };
        this.loader = loader;

        this.loadModels();
        this.loadTextures();

        this.createFloor();
        this.createWall();
        this.createShelving();
        this.createBackPlate();

        this.createWireframeBack_section1();
        this.createShelvingOnDemand();
        this.createShelvingOnDemand_section2();


        //this.initGui();
        this.calculateOutput();
        this.run();
        return this;
    },





























    loadModels: function() {

        var self = this;
        this.models = {};

        for (var name in this.objectsOptions) {

            var params = this.objectsOptions[name];
            var mtlLoader = new THREE.MTLLoader(this.loader);
            mtlLoader.setPath(this.assetsPath + params.path);
            mtlLoader.load(name + '.mtl', function(name, params) {
                return function(materials) {
                    materials.preload();
                    var objLoader = new THREE.OBJLoader(self.loader);
                    objLoader.setMaterials(materials);
                    objLoader.setPath(self.assetsPath + params.path);
                    objLoader.load(name + '.obj', function(object) {
                    self.onLoadModel(name, object, params);
                    var box = new THREE.Box3().setFromObject( object );
                    });
                }
            }(name, params));
        }
    },









    onLoadModel: function(name, object, params) {
        object.name = name;
        object.visible = false;
        object.scale.set(params.scale[0], params.scale[0], params.scale[0]);
        object.position.set(params.offset[0], params.offset[1], params.offset[2]);
        object.rotation.set(params.rotation[0], params.rotation[1], params.rotation[2]);
        this.models[name] = object;
        this.scene.add(object);
        //this.EventsControls1.attach( object );

        if (name === 'YosemiteFrame' || name === 'shelfWidth_fittings') {
            object.children.forEach(function(obj) {
                obj.material.needsUpdate = true;
                obj.material.shininess = 12;
            });
        }

        if (name === 'Fitting3' || name === 'shelfWidth_fittings') {
            object.children.forEach(function(obj) {
                obj.material.needsUpdate = true;
                obj.material.shininess = 12;
            });
        }

        if (name === 'Doors1' || name === 'Doors1') {
            object.children.forEach(function(obj) {
                obj.material.needsUpdate = true;
                obj.material.shininess = 2;
            });
            object.visible = false;
        }


        if (name === 'Doors2' || name === 'Doors2') {
            object.children.forEach(function(obj) {
                obj.material.needsUpdate = true;
                obj.material.shininess = 2;
            });
            object.visible = false;
        }


        if (name === 'Handle1' || name === 'Handle1') {
            object.children.forEach(function(obj) {
                obj.material.needsUpdate = true;
                obj.material.shininess = 70;
            });
            object.visible = false;
        }


        if (name === 'Handle1_2' || name === 'Handle1_2') {
            object.children.forEach(function(obj) {
                obj.material.needsUpdate = true;
                obj.material.shininess = 70;
            });
            object.visible = false;
        }


        if (name === 'Handle2' || name === 'Handle2') {
            object.children.forEach(function(obj) {
                obj.material.needsUpdate = true;
                obj.material.shininess = 70;
            });
            object.visible = false;
        }


        if (name === 'Handle2_2' || name === 'Handle2_2') {
            object.children.forEach(function(obj) {
                obj.material.needsUpdate = true;
                obj.material.shininess = 70;
            });
            object.visible = false;
        }


        if (name === 'Handle3' || name === 'Handle3') {
            object.children.forEach(function(obj) {
                obj.material.needsUpdate = true;
                obj.material.shininess = 70;
            });
            object.visible = false;
        }


        if (name === 'Handle3_2' || name === 'Handle3_2') {
            object.children.forEach(function(obj) {
                obj.material.needsUpdate = true;
                obj.material.shininess = 70;
            });
            object.visible = false;
        }

        if (name === 'Handle4' || name === 'Handle4') {
            object.children.forEach(function(obj) {
                obj.material.needsUpdate = true;
                obj.material.shininess = 70;
            });
            object.visible = false;
        }


        if (name === 'Handle4_2' || name === 'Handle4_2') {
            object.children.forEach(function(obj) {
                obj.material.needsUpdate = true;
                obj.material.shininess = 70;
            });
            object.visible = false;
        }

        if (name === 'Handle5' || name === 'Handle5') {
            object.children.forEach(function(obj) {
                obj.material.needsUpdate = true;
                obj.material.shininess = 70;
            });
            object.visible = false;
        }

        if (name === 'Handle5_2' || name === 'Handle5_2') {
            object.children.forEach(function(obj) {
                obj.material.needsUpdate = true;
                obj.material.shininess = 70;
            });
            object.visible = false;
        }

        if (name === 'Handle6' || name === 'Handle6') {
            object.children.forEach(function(obj) {
                obj.material.needsUpdate = true;
                obj.material.shininess = 70;
            });
            object.visible = false;
        }

        if (name === 'Handle6_2' || name === 'Handle6_2') {
            object.children.forEach(function(obj) {
                obj.material.needsUpdate = true;
                obj.material.shininess = 70;
            });
            object.visible = false;
        }

        if (name === 'Handle7' || name === 'Handle7') {
            object.children.forEach(function(obj) {
                obj.material.needsUpdate = true;
                obj.material.shininess = 70;
            });
            object.visible = false;
        }


        if (name === 'Handle7_2' || name === 'Handle7_2') {
            object.children.forEach(function(obj) {
                obj.material.needsUpdate = true;
                obj.material.shininess = 70;
            });
            object.visible = false;
        }


        if (name === 'Handle8' || name === 'Handle8') {
            object.children.forEach(function(obj) {
                obj.material.needsUpdate = true;
                obj.material.shininess = 70;
            });
            object.visible = false;
        }


        if (name === 'Handle8_2' || name === 'Handle8_2') {
            object.children.forEach(function(obj) {
                obj.material.needsUpdate = true;
                obj.material.shininess = 70;
            });
            object.visible = false;
        }

        if (name === 'Handle9' || name === 'Handle9') {
            object.children.forEach(function(obj) {
                obj.material.needsUpdate = true;
                obj.material.shininess = 70;
            });
            object.visible = false;
        }


        if (name === 'Handle9_2' || name === 'Handle9_2') {
            object.children.forEach(function(obj) {
                obj.material.needsUpdate = true;
                obj.material.shininess = 70;
            });
            object.visible = false;
        }


    },









    placeModels: function() {
        var isVisible = (this.options.viewMode == App.ViewModeEnv) && (this.options.room.length >= 3000);

        for (var name in this.models) {
            var object = this.models[name];
            var params = this.objectsOptions[name];
            object.visible = true;
            
            if (name === 'livreJava') {

                object.position.y = this.options.distanceFromFloor + this.options.shelf.thickness + params.offset[1];
                object.position.z = -this.options.room.width / 2 + this.options.shelf.width / 2 + params.offset[2];

                object.visible = false;

            }

            if (name === 'shelfWidth_fittings') {
                object.position.z = params.offset[2];
                object.position.x = 0;
                object.visible = false;
                object.scale.x = this.options.shelf.length / 53;
                object.scale.z = this.options.shelf.width / 44;
            }   

            if (name === 'Fitting3') {
                object.position.z = params.offset[2];
                object.position.x = 0;
                object.visible = false;
                //object.scale.z = this.options.shelf.length / 53;
                object.scale.x = this.options.shelf.length / 53;
                object.scale.z = this.options.shelf.width / 44;
            }   
            

            if (name === 'Doors1') {
                
                object.position.z = params.offset[2];
                //object.position.x = this.options.shelf.length / 242;
               // object.position.y = this.options.pillar.length;

                object.visible = false;
                //object.scale.z = this.options.shelf.length / 53;

                object.scale.x = this.options.shelf.length / 93;
                object.scale.z = this.options.shelf.width / 44;
            }   


            if (name === 'Doors2') {
                object.position.z = params.offset[2];
                //object.position.x = this.options.shelf.length / 242;
               // object.position.y = this.options.pillar.length;

                object.visible = false;
                //object.scale.z = this.options.shelf.length / 53;

                object.scale.x = this.options.shelf.length / 93;
                object.scale.z = this.options.shelf.width / 44;
            }   


            if (name === 'Handle1') {
                object.position.z = params.offset[2];
                object.visible = false;

                object.scale.x = this.options.shelf.length / 10;
                object.scale.z = this.options.shelf.width / 10;
            }   



            if (name === 'Handle1_2') {
                object.position.z = params.offset[2];

                object.visible = false;

                object.scale.x = this.options.shelf.length / 10;
                object.scale.z = this.options.shelf.width / 10;
            }   


            if (name === 'Handle2') {
                object.position.z = params.offset[2];


                object.visible = false;
                //object.scale.z = this.options.shelf.length / 53;

                object.scale.x = this.options.shelf.length / 10;
                object.scale.z = this.options.shelf.width / 10;
            }   


            if (name === 'Handle2_2') {
                object.position.z = params.offset[2];
                //object.position.x = this.options.shelf.length / 242;
               // object.position.y = this.options.pillar.length;

                object.visible = false;
                //object.scale.z = this.options.shelf.length / 53;

                object.scale.x = this.options.shelf.length / 10;
                object.scale.z = this.options.shelf.width / 10;
            }   

            if (name === 'Handle3') {
                object.position.z = params.offset[2];
                //object.position.x = this.options.shelf.length / 242;
               // object.position.y = this.options.pillar.length;

                object.visible = false;
                //object.scale.z = this.options.shelf.length / 53;

                object.scale.x = this.options.shelf.length / 10;
                object.scale.z = this.options.shelf.width / 10;
            }   


            if (name === 'Handle3_2') {
                object.position.z = params.offset[2];
                //object.position.x = this.options.shelf.length / 242;
               // object.position.y = this.options.pillar.length;

                object.visible = false;
                //object.scale.z = this.options.shelf.length / 53;

                object.scale.x = this.options.shelf.length / 10;
                object.scale.z = this.options.shelf.width / 10;
            }   

            if (name === 'Handle4') {
                object.position.z = params.offset[2];


                object.visible = false;
                //object.scale.z = this.options.shelf.length / 53;

                object.scale.x = this.options.shelf.length / 10;
                object.scale.z = this.options.shelf.width / 10;
            }   


            if (name === 'Handle4_2') {
                object.position.z = params.offset[2];
                object.visible = false;
                //object.scale.z = this.options.shelf.length / 53;

                object.scale.x = this.options.shelf.length / 10;
                object.scale.z = this.options.shelf.width / 10;
            }   


            if (name === 'Handle5') {
                object.position.z = params.offset[2];
                //object.position.x = this.options.shelf.length / 242;
               // object.position.y = this.options.pillar.length;

                object.visible = false;
                //object.scale.z = this.options.shelf.length / 53;

                object.scale.x = this.options.shelf.length / 10;
                object.scale.z = this.options.shelf.width / 10;
            }   



            if (name === 'Handle5_2') {
                object.position.z = params.offset[2];
                //object.position.x = this.options.shelf.length / 242;
               // object.position.y = this.options.pillar.length;

                object.visible = false;
                //object.scale.z = this.options.shelf.length / 53;

                object.scale.x = this.options.shelf.length / 10;
                object.scale.z = this.options.shelf.width / 10;
            }   

            if (name === 'Handle6') {
                object.position.z = params.offset[2];
                //object.position.x = this.options.shelf.length / 242;
               // object.position.y = this.options.pillar.length;

                object.visible = false;

                object.scale.x = this.options.shelf.length / 10;
                object.scale.z = this.options.shelf.width / 10;
            }   

            if (name === 'Handle6_2') {
                object.position.z = params.offset[2];
                object.visible = false;
                object.scale.x = this.options.shelf.length / 10;
                object.scale.z = this.options.shelf.width / 10;
            }   


            if (name === 'Handle7') {
                object.position.z = params.offset[2];
                //object.position.x = this.options.shelf.length / 242;
               // object.position.y = this.options.pillar.length;

                object.visible = false;
                //object.scale.z = this.options.shelf.length / 53;

                object.scale.x = this.options.shelf.length / 10;
                object.scale.z = this.options.shelf.width / 10;
            }   


            if (name === 'Handle7_2') {
                object.position.z = params.offset[2];
                //object.position.x = this.options.shelf.length / 242;
               // object.position.y = this.options.pillar.length;

                object.visible = false;
                //object.scale.z = this.options.shelf.length / 53;

                object.scale.x = this.options.shelf.length / 10;
                object.scale.z = this.options.shelf.width / 10;
            }   


            if (name === 'Handle8') {
                object.position.z = params.offset[2];
                //object.position.x = this.options.shelf.length / 242;
               // object.position.y = this.options.pillar.length;

                object.visible = false;
                //object.scale.z = this.options.shelf.length / 53;

                object.scale.x = this.options.shelf.length / 10;
                object.scale.z = this.options.shelf.width / 10;
            }   

            if (name === 'Handle8_2') {
                object.position.z = params.offset[2];
                //object.position.x = this.options.shelf.length / 242;
               // object.position.y = this.options.pillar.length;

                object.visible = false;
                //object.scale.z = this.options.shelf.length / 53;

                object.scale.x = this.options.shelf.length / 10;
                object.scale.z = this.options.shelf.width / 10;
            }   


            if (name === 'Handle9') {
                object.position.z = params.offset[2];
                //object.position.x = this.options.shelf.length / 242;
               // object.position.y = this.options.pillar.length;

                object.visible = false;
                //object.scale.z = this.options.shelf.length / 53;

                object.scale.x = this.options.shelf.length / 10;
                object.scale.z = this.options.shelf.width / 10;
            }   


            if (name === 'Handle9_2') {
                object.position.z = params.offset[2];
                object.visible = false;
                object.scale.x = this.options.shelf.length / 10;
                object.scale.z = this.options.shelf.width / 10;
            }   

            
        }
    },





    loadTextures: function() {
        var self = this;

        this.textures.forEach(function(params) {
            self.textureLoader.load(self.assetsPath + params.src, function(texture) {
                params.map = texture;
            });
        });
    },


    onAssetsLoaded: function() {
        this.changePillarTexture();
        this.changeShelfTexture();
        this.changeShelfTexture();

        // show controls
        //this.gui.domElement.hidden = false;
        //this.placeModels();
    },


    changePillarTexture: function() {
        if (this.textures[this.options.pillar.texture]) {
            this.pillarProto.material.map = this.textures[this.options.pillar.texture].map;
            this.updatePillarProtoMaterial();
        }
    },

    changeShelfTexture: function() {
        if (this.textures[this.options.shelf.texture]) {
            this.shelfProto.material.map = this.textures[this.options.shelf.texture].map;
            this.updateShelfProtoMaterial();

            this.shelfProtoOnDemand.material.map = this.textures[this.options.shelf.texture].map;
            this.updateShelfProtoMaterialOnDemand();
            this.shelfProtoOnDemand_section2.material.map = this.textures[this.options.shelf.texture].map;
            this.updateShelfProtoMaterialOnDemand_section2();
        }
    },
    


    createFloor: function() {
        var self = this;
        var geometry = new THREE.PlaneGeometry(this.roomSizeMin, this.roomSizeMin);
        var material = new THREE.MeshBasicMaterial({color: this.options.floor.color});

        var floor = new THREE.Mesh(geometry, material);

        floor.scale.x = this.options.room.length / this.roomSizeMin * 4;
        floor.scale.y = this.options.room.width / this.roomSizeMin * 4;
        floor.rotation.x = -Utils.PI_HALF;
        
        this.textureLoader.load(this.assetsPath + this.options.floor.texture, function(texture) {
            floor.material.needsUpdate = true;
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.x = self.options.room.length / self.roomSizeTextureStep * self.floorTextureRepeatXPerStep;
            texture.repeat.y = self.options.room.width / self.roomSizeTextureStep * self.floorTextureRepeatYPerStep;
            floor.material.map = texture;
        });
        
        floor.visible = true;
        this.floor = floor;
        this.scene.add(floor);
    },



    createWall: function() {
        var self = this;
        var geometry = new THREE.PlaneGeometry(this.roomSizeMin, this.roomSizeMin);
        var material = new THREE.MeshBasicMaterial({color: this.options.wall.color});
        var wall = new THREE.Mesh(geometry, material);
        //wall.castShadow = true;
        //wall.receiveShadow = true;
        wall.scale.x = this.options.room.length / this.roomSizeMin;
        wall.scale.y = this.options.room.height / this.roomSizeMin;
        
        wall.position.y = this.options.room.height / 2;
        wall.position.z = -this.options.room.width / 2;

        wall.material.side = THREE.FrontSide;

        /* 4Feb - I disabled walls texture*/
        this.textureLoader.load(this.assetsPath + this.options.wall.texture, function(texture) {
            wall.material.needsUpdate = true;
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.x = self.options.room.length / self.roomSizeTextureStep * self.wallTextureRepeatXPerStep;
            texture.repeat.y = self.options.room.height / self.roomSizeTextureStep * self.wallTextureRepeatYPerStep;
            wall.material.map = texture;
        });
        
        wall.visible = true;
        this.wall = wall;
        this.scene.add(wall);
    },




    initGui: function() {
        var self = this;
        var gui = new dat.GUI();
        //gui.domElement.hidden = true;
        //gui.style.display = "none";
        // shelving
        folder = gui.addFolder('OPTIONS');
        
        // create texture selectors
        var texturesControlParams = {};
        var params, label;
        for (var i = 0; i < this.textures.length; i++) {
            params = this.textures[i];
            label = params.name + ' - ' + params.price + this.currency;
            texturesControlParams[label] = i;
        }
        this.texturesControlParams = texturesControlParams;
        
        controller = folder.add(this.options.pillar, 'texture', texturesControlParams).name('Pillar Material');
        controller.onChange(function() {
            self.changePillarTexture();
            self.calculateOutput();
        }); 
               
        controller = folder.add(this.options.shelf, 'texture', texturesControlParams).name('Shelf Material');
        controller.onChange(function() {
            self.changeShelfTexture();
            self.calculateOutput();
        });        
        
    
        controller = folder.add(this.options, 'shelvesNum', 1, this.shelvesNumMax, 1).name('Shelves');
        controller.domElement.querySelector('input').setAttribute('type', 'number');
        controller.onChange(function() {
            self.updateShelving();
        }); 
    
        
        controller = folder.add(this.options, 'sectionsNum', 1, this.sectionsNumMax, 1).name('Sections');
        controller.domElement.querySelector('input').setAttribute('type', 'number');
        controller.onChange(function() {
            self.updateShelving();
        });
        
        /* 
        15 April Important for ao effect tuning
        gui.add( this.SAO.params, 'saoBias', - 1, 1 );
        gui.add( this.SAO.params, 'saoIntensity', 0, 1 );
        gui.add( this.SAO.params, 'saoScale', 0, 10 );
        gui.add( this.SAO.params, 'saoKernelRadius', 1, 100 );
        gui.add( this.SAO.params, 'saoMinResolution', 0, 1 );
        gui.add( this.SAO.params, 'saoBlur' );
        gui.add( this.SAO.params, 'saoBlurRadius', 0, 200 );
        gui.add( this.SAO.params, 'saoBlurStdDev', 0.5, 150 );
        gui.add( this.SAO.params, 'saoBlurDepthCutoff', 0.0, 0.1 );
        */
    
        folder.close();



        /*commented on 11 feb
    
        controller = folder.add(
            this.options.pillar, 'height', this.pillarHeightMin, 
            this.pillarHeightMax, this.pillarHeightStep
        ).name('Main Section Height');
        controller.onChange(function() {
            self.updateShelving();
        });

        controller = folder.add(
            this.options.shelf, 'width', this.shelfWidthMin, this.shelfWidthMax, this.shelfWidthStep
        ).name('Main Section Depth');
        controller.onChange(function() {
            self.updateShelving();
        });
        
        controller = folder.add(
            this.options.shelf, 'length', 1000, 5000, 1
        ).name('Main Section Width');
        controller.onChange(function() {
            self.updateShelving();
        });
        */

        //GUI ABOUT PRICING 
        /* 
        folder = gui.addFolder('PRICE (m3, $)');
        controller = folder.add(this.output, 'shelvingQuantity').name('Shelving Quantity').listen();

        controller = folder.add(this.output, 'pillarsQuantity').name('Pillars Quantity').listen();
        controller = folder.add(this.output, 'quantity').name('Total Quantity').listen();
        controller = folder.add(this.output, 'shelvingPrice').name('Shelving Price').listen();
        controller = folder.add(this.output, 'pillarsPrice').name('Pillars Price').listen();
        controller = folder.add(this.output, 'price').name('Total Price').listen(); 
       // gui.domElement.id = 'guiIPadPro';

        folder.close();
        */

        //gui.domElement.id = 'gui';

        this.gui = gui;
    },



    calculateOutput: function() {
        var shelvesTotal = this.options.shelvesNum * this.options.sectionsNum;
        var oneShelf = (this.options.shelf.length / 10) * (this.options.shelf.width / 10) * (this.options.shelf.thickness / 10);
        
        var pillarsTotal = this.options.sectionsNum + 1;
        var onePillar = (this.options.pillar.height / 10) * (this.options.pillar.thickness / 10) * (this.options.shelf.width / 10);
        
        this.output.shelvingQuantity = Math.round(oneShelf * shelvesTotal) / 1000000;
        this.output.pillarsQuantity = Math.round(onePillar * pillarsTotal) / 1000000;
        this.output.quantity = Math.round(1000000 * (this.output.shelvingQuantity + this.output.pillarsQuantity)) / 1000000;
        
        var oneShelfPrice = this.textures[this.options.shelf.texture].price;
        var onePillarPrice = this.textures[this.options.pillar.texture].price;
        this.output.shelvingPrice = Math.round(100 * this.output.shelvingQuantity * oneShelfPrice) / 100;
        this.output.pillarsPrice = Math.round(100 * this.output.pillarsQuantity * onePillarPrice) / 100;
        this.output.price = Math.round(100 * (this.output.shelvingPrice + this.output.pillarsPrice)) / 100;
    },





    run: function() {
        var self = this;

        function render() {
            var deltaTime = Math.max(0.001, Math.min(self.clock.getDelta(), 1));
           /*  if (self.showFps) {
                self.fpsStats.begin();
            } */
            self.controls.update(deltaTime);
            self.EventsControls1.update();
            self.composer.render(self.scene, self.camera);
            self.composer.render(deltaTime);
            window.requestAnimationFrame(render);
        }
        render();
    },























































    calculateDistanceBetweenShelves: function(shelvesHeight) {
        // check free height
        var freeHeight = shelvesHeight - this.options.shelvesNum * this.options.shelf.thickness;
        return parseInt(freeHeight / (this.options.shelvesNum - 1));
    },

    





    //to delete this (10june)
    updateSections: function() {
        if (this.options.amountOfSections == 1) {
            this.options.section1Length = this.options.shelf.length;
            this.options.section2Length = 0;
            this.pillar1.position.x = this.options.pillar1Position;
            this.createWireframeBack_section1();
            this.createWireframeBack_section2();

        } else if (this.options.amountOfSections == 2) {
            this.options.section1Length = this.options.section1Length;
            this.options.section2Length = this.options.shelf.length - this.options.section1Length;
            this.pillar1.position.x = this.options.pillar1Position;
            this.createWireframeBack_section1();
            this.createWireframeBack_section2();
        }
    },


    //to delete soon (7june rebuilding)
    updateShelving: function() {
        this.scene.remove(this.shelving);
        this.updatePillarProtoMaterial();
        this.updateShelfProtoMaterial();
        this.createShelving();
        this.calculateOutput();
        this.createBackPlate()
    },

  


    createShelving: function() {
        //var updateGui = false;
        this.shelving = new THREE.Group();
        
        // check pillar height, must be enough to fit at least one shelf
        var shelvesHeight = this.options.pillar.height - this.options.distanceFromFloor - this.options.distanceFromTop;
        
        if (shelvesHeight <= this.options.shelf.thickness) {
            // adjust pillar height and shelvesNum
            shelvesHeight = this.options.shelf.thickness;
            this.options.pillar.height = shelvesHeight + this.options.distanceFromFloor + this.options.distanceFromTop;
            this.options.shelvesNum = 1;
            //updateGui = true;
            //this.notifier.notify('Only one shelf can fit, shelving height and number of shelves were been adjusted');
        }
        
        // if there's only one shelf then it already fits due to the previous check
        if (this.options.shelvesNum > 1) {
            var distanceBetweenShelves = this.calculateDistanceBetweenShelves(shelvesHeight);
            if (distanceBetweenShelves < this.distanceBetweenShelvesMin) {
                // adjust shelvesNum
                //updateGui = true;
                distanceBetweenShelves = this.distanceBetweenShelvesMin;
                shelvesNum = parseInt((distanceBetweenShelves + shelvesHeight) / (distanceBetweenShelves + this.options.shelf.thickness));
                if (shelvesNum < 1) {
                    shelvesNum = 1;
                }
                this.options.shelvesNum = shelvesNum;
                
                if (shelvesNum > 1) {
                    distanceBetweenShelves = this.calculateDistanceBetweenShelves(shelvesHeight);
                }
                //this.notifier.notify('Number of shelves was been adjusted as there is not enough space to fit all of them');
            }
            this.options.distanceBetweenShelves = distanceBetweenShelves;
        }

        this.createPillarProto();

        this.createShelfProto_Mod();
        
        this.createShelf_Mod(0,0);
        this.createShelf_Mod(0,1);

        this.createPillar(0);
        this.createPillar(1);

        /*
        for (var i = 1; i <= this.options.sectionsNum; i++) {
            this.createPillar(i);
        }
        */

        this.shelving.position.x = -this.options.sectionsNum * (this.options.shelf.length + this.options.pillar.thickness) / 2 + 
        (this.options.shelf.length + this.options.pillar.thickness) / 2;
        this.shelving.position.z = -this.options.room.width / 2 + this.options.shelf.width / 2;
        this.scene.add(this.shelving);






        this.options.distanceBetweenShelvesOnDemand = this.options.pillar.height / 4;
        this.options.distanceBetweenShelvesOnDemand_section2 = this.options.pillar.height / 4;
    },





    //ShelfMod (Base) 24May
    createShelfProto_Mod: function() {
        var self = this;
        var geometry = new THREE.BoxGeometry(this.options.shelf.length, this.options.shelf.thickness, this.options.shelf.width);
        var material = new THREE.MeshBasicMaterial({color: this.options.shelf.color});
        var shelfProto = new THREE.Mesh(geometry, material);
        shelfProto.name = 'shelfProto';

        if (!this.shelfProto) {
            this.shelfProto = shelfProto;
        } else {
            shelfProto.material = this.shelfProto.material.clone();
            this.shelfProto = shelfProto;
            this.updateShelfProtoMaterial();
        }

    },


    createShelf_Mod: function(sectionNum, shelfNum) {
        var shelf = this.shelfProto.clone();
        shelf.name = 'shelf_' + sectionNum + '_' + shelfNum;
        shelf.position.y = shelfNum * (this.options.distanceBetweenShelves + this.options.shelf.thickness) + this.options.distanceFromFloor + this.options.shelf.thickness / 2;
        this.shelving.add(shelf);
        return shelf;
    },

    updateShelfProtoMaterial: function() {
        this.shelfProto.material.needsUpdate = true;
        var texture = this.shelfProto.material.map;
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.x = this.options.shelf.length / this.boardTextureStep * this.boardTextureRepeatXPerStep;  
        texture.repeat.y = this.options.shelf.width / this.boardTextureStep * this.boardTextureRepeatYPerStep;
    },    
 



    //PillarMod (Base) 24May
    createPillarProto: function() {
        var self = this;
        var geometry = new THREE.BoxGeometry(this.options.pillar.thickness, this.options.pillar.height, this.options.shelf.width);
        var material = new THREE.MeshBasicMaterial({color: this.options.pillar.color});

        var pillarProto = new THREE.Mesh(geometry, material);
        pillarProto.name = 'pillarProto';
        
        pillarProto.position.y = this.options.pillar.height / 2;
        
        if (!this.pillarProto) {
            this.pillarProto = pillarProto;
        } else {
            pillarProto.material = this.pillarProto.material.clone();
            this.pillarProto = pillarProto;
            this.updatePillarProtoMaterial();
        }
    },

    createPillar: function(sectionNum) {
        var pillar = this.pillarProto.clone();
        pillar.name = 'pillar_' + sectionNum;
        pillar.position.x = sectionNum * (this.options.shelf.length + this.options.pillar.thickness) - this.options.shelf.length / 2 - this.options.pillar.thickness / 2;
        this.shelving.add(pillar);
        return pillar;
    },
    
    updatePillarProtoMaterial: function() {
        this.pillarProto.material.needsUpdate = true;
        var texture = this.pillarProto.material.map;
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.x = this.options.shelf.width / this.boardTextureStep * this.boardTextureRepeatXPerStep;
        texture.repeat.y = this.options.pillar.height / this.boardTextureStep * this.boardTextureRepeatYPerStep;       
    },









    /* update_pillar1Material: function() {
        this.pillar1.material.needsUpdate = true;
        var texture = this.pillarProto.material.map;
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.x = this.options.shelf.width / this.boardTextureStep * this.boardTextureRepeatXPerStep;
        texture.repeat.y = this.options.pillar.height / this.boardTextureStep * this.boardTextureRepeatYPerStep;       
    }, */

    createPillar1: function() {
        this.scene.remove(this.pillar1);
        var self = this;
        var geometry = new THREE.BoxGeometry(this.options.pillar.thickness, this.options.pillar.height - this.options.shelf.thickness * 2, this.options.shelf.width);
        var material = new THREE.MeshBasicMaterial({color: this.options.pillar.color});
        var pillar1 = new THREE.Mesh(geometry, material);
        
        pillar1.position.y = this.options.pillar.height / 2;
        pillar1.position.z = -this.options.room.width / 2 + this.options.shelf.width / 2;

        pillar1.material.needsUpdate = true;
        /* var texture = this.pillarProto.material.map;
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.x = this.options.shelf.width / this.boardTextureStep * this.boardTextureRepeatXPerStep;
        texture.repeat.y = this.options.pillar.height / this.boardTextureStep * this.boardTextureRepeatYPerStep;     
 */
        pillar1.material =  this.pillarProto.material;

        this.pillar1 = pillar1;
        this.scene.add(pillar1);   
    },
























    createShelvingOnDemand: function() {
        this.scene.remove(this.shelvingOnDemand);
        this.shelvingOnDemand = new THREE.Group();
        // check pillar height, must be enough to fit at least one shelf
        var shelvesHeight = this.options.pillar.height - this.options.distanceFromFloor - this.options.distanceFromTop;
        if (shelvesHeight <= this.options.shelf.thickness) {
            // adjust pillar height and shelvesNum
            shelvesHeight = this.options.shelf.thickness;
            this.options.pillar.height = shelvesHeight + this.options.distanceFromFloor + this.options.distanceFromTop;
            this.options.shelvesNumOnDemand = 1;
            //updateGui = true;
            //this.notifier.notify('Only one shelf can fit, shelving height and number of shelves were been adjusted');
        }
        this.createShelfProtoOnDemand();
        for (var i = 0; i < this.options.sectionsNum; i++) {
            for (var j = 1; j < this.options.shelvesNumOnDemand; j++) {
                this.createShelfOnDemand(i, j);
            }
        }
        this.shelvingOnDemand.position.x = this.shelving.getObjectByName( "pillar_0", true ).position.x;
        this.shelvingOnDemand.position.z = -this.options.room.width / 2 + this.options.shelf.width / 2;
        this.scene.add(this.shelvingOnDemand);
    },



    
    updateShelfProtoMaterialOnDemand: function() {
        this.shelfProtoOnDemand.material.needsUpdate = true;
        var texture = this.shelfProtoOnDemand.material.map;
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.x = this.options.shelf.length / this.boardTextureStep * this.boardTextureRepeatXPerStep;  
        texture.repeat.y = this.options.shelf.width / this.boardTextureStep * this.boardTextureRepeatYPerStep;
    },    

    createShelfProtoOnDemand: function() {
        var self = this;
        var geometry = new THREE.BoxGeometry(this.options.section1Length, this.options.shelf.thickness, this.options.shelf.width);
        var material = new THREE.MeshBasicMaterial({color: this.options.shelf.color});
        var shelfProtoOnDemand = new THREE.Mesh(geometry, material);
        shelfProtoOnDemand.name = 'shelfProtoOnDemand';
        shelfProtoOnDemand.geometry.translate( self.options.section1Length / 2, 0, 0 );
        if (!this.shelfProtoOnDemand) {
            this.shelfProtoOnDemand = shelfProtoOnDemand;
        } else {
            shelfProtoOnDemand.material = this.shelfProtoOnDemand.material.clone();
            this.shelfProtoOnDemand = shelfProtoOnDemand;
            this.updateShelfProtoMaterialOnDemand();
        }
    },

    createShelfOnDemand: function(sectionNum, shelfNumOnDemand) {
        var shelfOnDemand = this.shelfProtoOnDemand.clone();
        shelfOnDemand.name = 'shelfOnDemand_' + sectionNum + '_' + shelfNumOnDemand;
        shelfOnDemand.position.y = shelfNumOnDemand * (this.options.distanceBetweenShelvesOnDemand + this.options.shelf.thickness) + this.options.distanceFromFloor + this.options.shelf.thickness / 2;
        shelfOnDemand.position.x = 15
        this.shelvingOnDemand.add(shelfOnDemand);
        return shelfOnDemand;
    },


















    createShelvingOnDemand_section2: function() {
        this.scene.remove(this.shelvingOnDemand_section2);
        this.shelvingOnDemand_section2 = new THREE.Group();
        // check pillar height, must be enough to fit at least one shelf
        var shelvesHeight = this.options.pillar.height - this.options.distanceFromFloor - this.options.distanceFromTop;
        if (shelvesHeight <= this.options.shelf.thickness) {
            // adjust pillar height and shelvesNum
            shelvesHeight = this.options.shelf.thickness;
            this.options.pillar.height = shelvesHeight + this.options.distanceFromFloor + this.options.distanceFromTop;
            this.options.shelvesNumOnDemand_section2 = 1;
            //updateGui = true;
            //this.notifier.notify('Only one shelf can fit, shelving height and number of shelves were been adjusted');
        }
        this.createShelfProtoOnDemand_section2();
        for (var i = 0; i < this.options.sectionsNum; i++) {
            for (var j = 1; j < this.options.shelvesNumOnDemand_section2; j++) {
                this.createShelfOnDemand_section2(i, j);
            }
        }
        this.shelvingOnDemand_section2.position.x = this.shelving.getObjectByName( "pillar_1", true ).position.x;
        this.shelvingOnDemand_section2.position.z = -this.options.room.width / 2 + this.options.shelf.width / 2;
        this.scene.add(this.shelvingOnDemand_section2);
    },

    updateShelfProtoMaterialOnDemand_section2: function() {
        this.shelfProtoOnDemand_section2.material.needsUpdate = true;
        var texture = this.shelfProtoOnDemand_section2.material.map;
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.x = this.options.shelf.length / this.boardTextureStep * this.boardTextureRepeatXPerStep;  
        texture.repeat.y = this.options.shelf.width / this.boardTextureStep * this.boardTextureRepeatYPerStep;
    },    

    createShelfProtoOnDemand_section2: function() {
        var self = this;
        var geometry = new THREE.BoxGeometry(this.options.section2Length, this.options.shelf.thickness, this.options.shelf.width);
        var material = new THREE.MeshBasicMaterial({color: this.options.shelf.color});
        var shelfProtoOnDemand_section2 = new THREE.Mesh(geometry, material);
        shelfProtoOnDemand_section2.name = 'shelfProtoOnDemand_section2';
        shelfProtoOnDemand_section2.geometry.translate( - self.options.section2Length / 2, 0, 0 );
        if (!this.shelfProtoOnDemand_section2) {
            this.shelfProtoOnDemand_section2 = shelfProtoOnDemand_section2;
        } else {
            shelfProtoOnDemand_section2.material = this.shelfProtoOnDemand.material.clone();
            this.shelfProtoOnDemand_section2 = shelfProtoOnDemand_section2;
            this.updateShelfProtoMaterialOnDemand_section2();
        }
    },

    createShelfOnDemand_section2: function(sectionNum, shelfNumOnDemand_section2) {
        var shelfOnDemand_section2 = this.shelfProtoOnDemand_section2.clone();
        shelfOnDemand_section2.name = 'shelfOnDemand_section2_' + sectionNum + '_' + shelfNumOnDemand_section2;
        shelfOnDemand_section2.position.y = shelfNumOnDemand_section2 * (this.options.distanceBetweenShelvesOnDemand_section2 + this.options.shelf.thickness) + this.options.distanceFromFloor + this.options.shelf.thickness / 2;
        shelfOnDemand_section2.position.x = sectionNum * (this.options.shelf.length + this.options.pillar.thickness);
        this.shelvingOnDemand_section2.add(shelfOnDemand_section2);
        return shelfOnDemand_section2;
    },





























    createWireframeBack_section1: function() {
        var self = this;
        this.scene.remove(this.section1_WireframeMesh);

        //this.options.section1Length = this.options.shelf1Length;
        var geometry = new THREE.PlaneGeometry(this.options.section1Length, this.options.pillar.height);
        var material = new THREE.MeshBasicMaterial({color: 0x213790, transparent: true, opacity: 0});
        var section1_WireframeMesh = new THREE.Mesh(geometry, material);

        //section1_WireframeMesh.applyMatrix( new THREE.Matrix4().makeTranslation( this.shelving.getObjectByName( "pillar_0", true ).position.x, 0, 0) );
        section1_WireframeMesh.geometry.translate( self.options.section1Length / 2, 0, 0 );

        section1_WireframeMesh.position.x = this.shelving.getObjectByName( "pillar_0", true ).position.x;
        section1_WireframeMesh.position.y = this.shelving.getObjectByName( "pillar_0", true ).position.y; //height
        section1_WireframeMesh.position.z = -999

        section1_WireframeMesh.visible = true;
        this.section1_WireframeMesh = section1_WireframeMesh;
        this.scene.add(section1_WireframeMesh);
        //this.EventsControls1.map = section1_WireframeMesh;
    },
    

    createWireframeBack_section2: function() {
        var self = this;
        this.scene.remove(this.section2_WireframeMesh);

        var geometry = new THREE.PlaneGeometry(this.options.section2Length, this.options.pillar.height);
        var material = new THREE.MeshBasicMaterial({color: 0x000000, transparent: true, opacity: 0.0});
        var section2_WireframeMesh = new THREE.Mesh(geometry, material);

        //section2_WireframeMesh.applyMatrix( new THREE.Matrix4().makeTranslation( this.shelving.getObjectByName( "pillar_0", true ).position.x, 0, 0) );
        section2_WireframeMesh.geometry.translate( - self.options.section2Length / 2, 0, 0 );

        section2_WireframeMesh.position.x = this.shelving.getObjectByName( "pillar_1", true ).position.x;
        section2_WireframeMesh.position.y = this.shelving.getObjectByName( "pillar_0", true ).position.y; //height
        section2_WireframeMesh.position.z = -999

        section2_WireframeMesh.visible = true;
        this.section2_WireframeMesh = section2_WireframeMesh;
        this.scene.add(section2_WireframeMesh);
    },





































    






       
    createBackPlate: function() {
        var self = this;
        this.scene.remove(this.BackPlate);
        var geometry = new THREE.PlaneGeometry(this.options.shelf.length * this.options.sectionsNum + this.options.shelf.thickness * this.options.sectionsNum, this.options.pillar.height);
        var material = new THREE.MeshBasicMaterial({color: 0x333333, transparent: true, opacity: 0});
        var BackPlate = new THREE.Mesh(geometry, material);

        //BackPlate.applyMatrix( new THREE.Matrix4().makeTranslation(550, 0, 0) );
        BackPlate.geometry.translate( -this.shelving.position.x, 0, 0 );

        BackPlate.position.y = this.shelving.getObjectByName( "pillar_0", true ).position.y; //height
        BackPlate.position.z = -986; //depth
        BackPlate.position.x = this.shelving.position.x ; //width 

        BackPlate.visible = true;
        this.BackPlate = BackPlate;
        this.scene.add(BackPlate);
        this.scene.add( new THREE.AxesHelper() );

        //24apr and... to attach the two top&bottom main shelfes 
        this.shelving.getObjectByName( "shelf_0_0", true ).geometry.translate( -this.shelving.position.x, 0, 0 );
    },

    changeBackPlateVisibilityMinus: function() {
        this.BackPlate.material.opacity = 0;
    },

    changeBackPlateVisibilityPlus: function() {
        this.BackPlate.material.opacity = 1;
    },
    































    //DRAG&drop hangers or shelfs, prev (coms from 23may)
    moveHanger1: function(object) {

        for (var name in this.models) {
            var object = this.models[name];
            var params = this.objectsOptions[name];
            object.visible = true;
       
            if (name === 'livreJava') {

                object.visible = true;

                object.scale.x = this.options.shelf.length / 50;
                EventsControls1.attach( object );
                this.EventsControls1.attach( object );
            }

        }
        
    },


    moveHanger1Off: function(object) {
        for (var name in this.models) {
            var object = this.models[name];
            var params = this.objectsOptions[name];
            //object.visible = true;
            
            if (name === 'livreJava') {

                object.visible = false;

                object.scale.x = this.options.shelf.length / 50;

                EventsControls1.attach( object );
                this.EventsControls1.attach( object );
            }
        }
    },


    move_shelfWidth_fittings: function(object) {

        for (var name in this.models) {
            var object = this.models[name];
            var params = this.objectsOptions[name];
            //object.visible = true;
            
            if (name === 'shelfWidth_fittings') {

                object.scale.x = this.options.shelf.length / 50;
                object.scale.z = this.options.shelf.width / 60;

                EventsControls1.attach( object );
                this.EventsControls1.attach( object );

                object.visible = true;

            }
        }

    },



    

    move_shelfWidth_fittingsOff: function(object) {

        for (var name in this.models) {
            var object = this.models[name];
            var params = this.objectsOptions[name];
            //object.visible = true;
            
            if (name === 'shelfWidth_fittings') {

                object.scale.x = this.options.shelf.length / 50;
                object.scale.z = this.options.shelf.width / 60;

                //EventsControls1.attach( object );
                this.EventsControls1.attach( object );

                object.visible = false;

            }
        }

    },











    //Functions to remove and add fittings obj (coms from 23may)
    add_Fitting3: function(object) {

        for (var name in this.models) {
            var object = this.models[name];
            var params = this.objectsOptions[name];
            //object.visible = true;
            
            if (name === 'Fitting3') {

                object.scale.x = this.options.shelf.length / 50;
                object.scale.z = this.options.shelf.width / 60;

                //EventsControls1.attach( object );
                this.EventsControls1.attach( object );

                object.visible = true;

            }
        }

    },


    remove_Fitting3: function(object) {

        for (var name in this.models) {
            var object = this.models[name];
            var params = this.objectsOptions[name];
            //object.visible = true;
            if (name === 'Fitting3') {

                object.scale.x = this.options.shelf.length / 50;
                object.scale.z = this.options.shelf.width / 60;

                //EventsControls1.attach( object );
                //this.EventsControls1.attach( object );

                object.visible = false;

            }
        }

    },


    add_Doors1: function(object) {

        for (var name in this.models) {
            var object = this.models[name];
            var params = this.objectsOptions[name];

            if (name === 'Doors1') {
                object.scale.x = this.options.shelf.length / 48;
                object.scale.y = this.options.pillar.height / 79;
                object.position.z = -this.options.room.width / 2.8 + this.options.shelf.width / 9;
                object.visible = true;
                
            }
        }
    },


    remove_Doors1: function(object) {

        for (var name in this.models) {
            var object = this.models[name];
            var params = this.objectsOptions[name];

            if (name === 'Doors1') {

                object.scale.x = this.options.shelf.length / 50;
                object.scale.z = this.options.shelf.width / 60;

                object.visible = false;

            }
        }
    },






    add_Handle1: function(object) {

        for (var name in this.models) {
            var object = this.models[name];
            var params = this.objectsOptions[name];
            if (name === 'Handle1') {
                object.scale.x = this.options.shelf.length / 90;
                object.scale.y = this.options.pillar.height / 150;
                object.position.z = -this.options.room.width / 2.8 + this.options.shelf.width / 9;
                object.visible = true;
                
            }
        }
    },



    remove_Handle1: function(object) {

        for (var name in this.models) {
            var object = this.models[name];
            var params = this.objectsOptions[name];

            if (name === 'Handle1') {

                object.scale.x = this.options.shelf.length / 50;
                object.scale.z = this.options.shelf.width / 60;

                object.visible = false;

            }
        }

    },



    add_Handle1_2: function(object) {

        for (var name in this.models) {
            var object = this.models[name];
            var params = this.objectsOptions[name];
            if (name === 'Handle1_2') {
                object.scale.x = this.options.shelf.length / 90;
                object.scale.y = this.options.pillar.height / 150;
                object.position.z = -this.options.room.width / 2.8 + this.options.shelf.width / 9;
                object.visible = true;
                
            }
        }
    },



    remove_Handle1_2: function(object) {

        for (var name in this.models) {
            var object = this.models[name];
            var params = this.objectsOptions[name];

            if (name === 'Handle1_2') {

                object.scale.x = this.options.shelf.length / 50;
                object.scale.z = this.options.shelf.width / 60;

                object.visible = false;

            }
        }
    },











    //20apr dimensions in 3d view
    createDimensions_width: function() {
        var self = this;

        self.fontloader.load('assets/ar.json', function (font) {   

            var dim1num = document.getElementById("subdomainWidthCabinet_Dimensions").value;
            
                    var textGeo = new THREE.TextGeometry("← Width: "+dim1num+"cm →", {
                    font: font,
                    size: 42,
                    height: 1,
                    curveSegments: 12,
                    bevelThickness: 0,
                    bevelSize: 5,
                    bevelEnabled: false,
                    });

                var material = new THREE.MeshBasicMaterial({color: 0x333333});

                var dimensionsWidth = new THREE.Mesh(textGeo, material);
                dimensionsWidth.position.x = -self.options.shelf.width / 1.2;
                dimensionsWidth.position.y = self.options.room.height / 14.8;
                dimensionsWidth.position.z = -self.options.room.width / 2.1;
                dimensionsWidth.visible = true;

                self.scene.add(dimensionsWidth);
                self.dimensionsWidth = dimensionsWidth;
        
        });

    },


    createDimensions_height: function() {
        var self = this;

        self.fontloader.load('assets/ar.json', function (font) {   

            var dim1num_height = document.getElementById("subdomainHeightCabinet_Dimensions").value;

                        var textGeo = new THREE.TextGeometry("← Height: "+dim1num_height+"cm →", {
                        font: font,
                        size: 43,
                        height: 1,
                        curveSegments: 12,
                        bevelThickness: 0,
                        bevelSize: 5,
                        bevelEnabled: false,
                    
            });

            var material = new THREE.MeshBasicMaterial({color: 0x333333});

            var dimensionsHeight = new THREE.Mesh(textGeo, material);

            dimensionsHeight.rotation.z = -1.57;

            dimensionsHeight.position.x = -500;
            dimensionsHeight.position.y = self.options.room.height / 21.9;
            dimensionsHeight.position.z = -self.options.room.width / 2.01;

            dimensionsHeight.visible = true;

            self.scene.add(dimensionsHeight);
            self.dimensionsHeight = dimensionsHeight;
        });
    },


    createDimensions_Depth: function() {
        var self = this;

        //font file (feb-may2021)
        self.fontloader.load('assets/ar.json', function (font) {   

            var dim1num_Depth = document.getElementById("subdomainDepth_Cabinet_Dimensionsz").value;

            var textGeo = new THREE.TextGeometry(" ← Depth: "+dim1num_Depth+"cm →", {
            font: font,
            size: 42,
            height: 1,
            curveSegments: 12,
            bevelThickness: 0,
            bevelSize: 5,
            bevelEnabled: false,
            });

            var material = new THREE.MeshBasicMaterial({color: 0x333333});

            var dimensionsDepth = new THREE.Mesh(textGeo, material);

            dimensionsDepth.rotation.y = -1.57;

            dimensionsDepth.position.x = -380;
            dimensionsDepth.position.y = self.options.room.height / 15.31;
            dimensionsDepth.position.z = -self.options.room.width / 2.04;

            dimensionsDepth.visible = true;

            self.scene.add(dimensionsDepth);
            self.dimensionsDepth = dimensionsDepth;
        });
    },



    //Around 19-21 feb added dimens in 3d view
    removeDimensions: function() {
        this.scene.remove(this.dimensionsWidth);
        this.scene.remove(this.dimensionsHeight);
        this.scene.remove(this.dimensionsDepth);
    },


//end of App prototype 
}

window.addEventListener('DOMContentLoaded', function() {
window.app = new App('appCanvas');
});

//end of the First Line function
})();
