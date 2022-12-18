let clickedStateDarkRed = 'unclicked';
let clickedStateWhite = 'unclicked';
let clickedStateDimBlue = 'clicked';
let clickedStateSilver = 'unclicked';
let clickedStateGrey = 'unclicked';
let clickedStateTopOpenCustomize1 = 'unclicked';
let clickedStateTopOpenDefault1 = 'clicked';
let topMenuImg = document.getElementById("topMenuImg");
let topOpenComponenet  = 'unclicked';
let topOpenCarSign = 'unclicked';
let topOpenTechnology = 'unclicked';
let topOpenProtection = 'unclicked';
let menuExterior = 'clicked';
let menuInterior = 'unclicked';


$(window).load(function() {
	$(".se-pre-con").fadeOut("slow");;
});


const style = getComputedStyle(topMenuImg);
const width = style.width;
console.log(width);

if (width === "850px") {
	controls.maxDistance = 3.4; //5
	camera.position.set(-3.38, -0.10, -1.89);
} else if (width === "851px") {
	controls.maxDistance = 8; //5
	camera.position.set(-5.77, 0.24, -3.64);
}


function preloadImages(array) {
    if (!preloadImages.list) {
        preloadImages.list = [];
    }
    var list = preloadImages.list;
    for (var i = 0; i < array.length; i++) {
        var img = new Image();
        img.onload = function() {
            var index = list.indexOf(this);
            if (index !== -1) {
                // remove image from the array once it's loaded
                // for memory consumption reasons
                list.splice(index, 1);
            }
        }
        list.push(img);
        img.src = array[i];
    }
}
preloadImages(["img/topmenu_2.png", "img/topmenu3_component.png", "img/topmenu3_carsign.png", "img/topmenu3_technology.png", "img/topmenu3_protection.png", "img/loader.gif", "img/hdri.jpg"]); 


function topOpenDefault_1() {
	if (clickedStateTopOpenDefault1 = 'unclicked') {
	clickedStateTopOpenDefault1 = "clicked";
	topMenuImg.src = "img/topmenu1.png";
	top2_component_title.style.display = "none";
	top2_carsign_title.style.display = "none";
	top2_technology_title.style.display = "none";
	top2_protection_title.style.display = "none";

	top2_1_component.style.display = "none";
	top2_2_component.style.display = "none";
	top2_3_component.style.display = "none";
	top2_4_component.style.display = "none";
	top2_5_component.style.display = "none";
	top2_6_component.style.display = "none";
	
	top2_1_carsign.style.display = "none";
	top2_2_carsign.style.display = "none";
	top2_3_carsign.style.display = "none";
	top2_4_carsign.style.display = "none";
	top2_5_carsign.style.display = "none";

	top2_1_technology.style.display = "none";
	top2_2_technology.style.display = "none";
	top2_3_technology.style.display = "none";
	top2_4_technology.style.display = "none";

	top2_1_protection.style.display = "none";
	top2_2_protection.style.display = "none";
	top2_3_protection.style.display = "none";

	top2_carsign_title.style.display = "none";
	top2_component_title.style.display = "none";
	top2_technology_title.style.display = "none";
	top2_protection_title.style.display = "none";

	menu_centerBack.style.display = "none";

	labels2.style.display = "none";
	labels.style.display = "none";
	labels3.style.display = "none";
	labels4.style.display = "none";
	labels4.style.display = "none";

	labels5.style.display = "none";
	labels6.style.display = "none";
	labels7.style.display = "none";
	
	}
	else {
	clickedStateTopOpenDefault1 = "unclicked";
	}
};


function topOpenCustomize_1() {
	

	
	if (clickedStateTopOpenCustomize1 = 'unclicked') {
	clickedStateTopOpenCustomize1 = "clicked";
	//topMenuImg.style.animation = 'animationName 3s';	
	
		if (width === "850px") {
	topMenuImg.src = "img/topmenu_2.png";
    } else if (width === "851px") {
	topMenuImg.src = "img/topmenu2Mobile.png";
	}
	
	
	top2_component_title.style.display = "block";
	top2_carsign_title.style.display = "block";
	top2_technology_title.style.display = "block";
	top2_protection_title.style.display = "block";

	top2_1_component.style.display = "none";
	top2_2_component.style.display = "none";
	top2_3_component.style.display = "none";
	top2_4_component.style.display = "none";
	top2_5_component.style.display = "none";
	top2_6_component.style.display = "none";
	
	top2_1_carsign.style.display = "none";
	top2_2_carsign.style.display = "none";
	top2_3_carsign.style.display = "none";
	top2_4_carsign.style.display = "none";
	top2_5_carsign.style.display = "none";

	top2_1_technology.style.display = "none";
	top2_2_technology.style.display = "none";
	top2_3_technology.style.display = "none";
	top2_4_technology.style.display = "none";

	top2_1_protection.style.display = "none";
	top2_2_protection.style.display = "none";
	top2_3_protection.style.display = "none";

	top2_component_title.style.color = "white";
	top2_carsign_title.style.color = "white";
	top2_technology_title.style.color = "white";
	top2_protection_title.style.color = "white";
	
	menu_centerBack.style.display = "none";

	labels2.style.display = "none";
	labels.style.display = "none";
	labels3.style.display = "none";
	labels4.style.display = "none";

	labels5.style.display = "none";
	labels6.style.display = "none";
	labels7.style.display = "none";

	}
	else {
	clickedStateTopOpenCustomize1 = "unclicked";
	}
};


function topOpenComponent1() {
	if (topOpenComponent = 'unclicked') {
	topOpenComponent = "clicked";
	
	if (width === "850px") {
	topMenuImg.src = "img/topmenu3_component.png";
	} else if (width === "851px") {
	topMenuImg.src = "img/topmenu3_componentMobile.png";
	}
	
	top2_component_title.style.display = "block";
	top2_component_title.style.color = "black";
	top2_carsign_title.style.color = "white";
	top2_technology_title.style.color = "white";
	top2_protection_title.style.color = "white";
	top2_carsign_title.style.display = "block";
	top2_technology_title.style.display = "block";
	top2_protection_title.style.display = "block";
	
	top2_1_component.style.display = "block";
	top2_2_component.style.display = "block";
	top2_3_component.style.display = "block";
	top2_4_component.style.display = "block";
	top2_5_component.style.display = "block";
	top2_6_component.style.display = "block";
	
	top2_1_carsign.style.display = "none";
	top2_2_carsign.style.display = "none";
	top2_3_carsign.style.display = "none";
	top2_4_carsign.style.display = "none";
	top2_5_carsign.style.display = "none";

	top2_1_technology.style.display = "none";
	top2_2_technology.style.display = "none";
	top2_3_technology.style.display = "none";
	top2_4_technology.style.display = "none";

	top2_1_protection.style.display = "none";
	top2_2_protection.style.display = "none";
	top2_3_protection.style.display = "none";

	menu_centerBack.style.display = "block";

	labels2.style.display = "none";
	labels.style.display = "none";
	labels3.style.display = "none";
	labels4.style.display = "none";

	labels5.style.display = "none";
	labels6.style.display = "none";
	labels7.style.display = "none";
	
	sceneaddComponents2();
	}
	else {
	topOpenComponent = "unclicked";
	}
};

function topOpenCarSign1() {
	if (topOpenCarSign = 'unclicked') {
	topOpenCarSign =  "clicked";
	
	if (width === "850px") {
	topMenuImg.src = "img/topmenu3_carsign.png";
	} else if (width === "851px") {
	topMenuImg.src = "img/topmenu3_carsignMobile.png";
	}
	
	top2_carsign_title.style.color = "black";
	top2_component_title.style.color = "white";
	top2_technology_title.style.color = "white";
	top2_protection_title.style.color = "white";
	top2_carsign_title.style.display = "block";
	top2_component_title.style.display = "block";
	top2_technology_title.style.display = "block";
	top2_protection_title.style.display = "block";
	
	top2_1_component.style.display = "none";
	top2_2_component.style.display = "none";
	top2_3_component.style.display = "none";
	top2_4_component.style.display = "none";
	top2_5_component.style.display = "none";
	top2_6_component.style.display = "none";
	
	top2_1_carsign.style.display = "block";
	top2_2_carsign.style.display = "block";
	top2_3_carsign.style.display = "block";
	top2_4_carsign.style.display = "block";
	top2_5_carsign.style.display = "block";

	top2_1_technology.style.display = "none";
	top2_2_technology.style.display = "none";
	top2_3_technology.style.display = "none";
	top2_4_technology.style.display = "none";

	top2_1_protection.style.display = "none";
	top2_2_protection.style.display = "none";
	top2_3_protection.style.display = "none";
	menu_centerBack.style.display = "none";

	labels2.style.display = "none";
	labels.style.display = "none";
	labels3.style.display = "none";
	labels4.style.display = "none";

	labels5.style.display = "none";
	labels6.style.display = "none";
	labels7.style.display = "none";

	menu_centerBack.style.display = "block";
	

	}
	else {
	topOpenCarSign = "unclicked";
	}
};

function topOpenTechnology1() {
	if (topOpenTechnology = 'unclicked') {
	topOpenTechnology =  "clicked";
		
	if (width === "850px") {
	topMenuImg.src = "img/topmenu3_technology.png";
	} else if (width === "851px") {
	topMenuImg.src = "img/topmenu3_technologyMobile.png";
	}
	
	top2_carsign_title.style.color = "white";
	top2_component_title.style.color = "white";
	top2_technology_title.style.color = "black";
	top2_protection_title.style.color = "white";
	top2_carsign_title.style.display = "block";
	top2_component_title.style.display = "block";
	top2_technology_title.style.display = "block";
	top2_protection_title.style.display = "block";
	
	top2_1_component.style.display = "none";
	top2_2_component.style.display = "none";
	top2_3_component.style.display = "none";
	top2_4_component.style.display = "none";
	top2_5_component.style.display = "none";
	top2_6_component.style.display = "none";
	
	top2_1_carsign.style.display = "none";
	top2_2_carsign.style.display = "none";
	top2_3_carsign.style.display = "none";
	top2_4_carsign.style.display = "none";
	top2_5_carsign.style.display = "none";

	top2_1_technology.style.display = "block";
	top2_2_technology.style.display = "block";
	top2_3_technology.style.display = "block";
	top2_4_technology.style.display = "block";

	top2_1_protection.style.display = "none";
	top2_2_protection.style.display = "none";
	top2_3_protection.style.display = "none";
	
	menu_centerBack.style.display = "none";

	labels3.style.display = "block";
	labels2.style.display = "block";
	labels.style.display = "block";
	labels4.style.display = "block";

	labels6.style.display = "none";
	labels5.style.display = "none";
	labels7.style.display = "none";

	menu_centerBack.style.display = "block";

	}
	else {
	topOpenTechnology = "unclicked";
	}
};

function topOpenProtection1() {
	if (topOpenProtection = 'unclicked') {
	topOpenProtection =  "clicked";
	
	if (width === "850px") {
	topMenuImg.src = "img/topmenu3_protection.png";
	} else if (width === "851px") {
	topMenuImg.src = "img/topmenu3_protectionMobile.png";
	}
	top2_carsign_title.style.color = "white";
	top2_component_title.style.color = "white";
	top2_technology_title.style.color = "white";
	top2_protection_title.style.color = "black";
	top2_carsign_title.style.display = "block";
	top2_component_title.style.display = "block";
	top2_technology_title.style.display = "block";
	top2_protection_title.style.display = "block";
	
	top2_1_component.style.display = "none";
	top2_2_component.style.display = "none";
	top2_3_component.style.display = "none";
	top2_4_component.style.display = "none";
	top2_5_component.style.display = "none";
	top2_6_component.style.display = "none";
	
	top2_1_carsign.style.display = "none";
	top2_2_carsign.style.display = "none";
	top2_3_carsign.style.display = "none";
	top2_4_carsign.style.display = "none";
	top2_5_carsign.style.display = "none";

	top2_1_technology.style.display = "none";
	top2_2_technology.style.display = "none";
	top2_3_technology.style.display = "none";
	top2_4_technology.style.display = "none";

	top2_1_protection.style.display = "block";
	top2_2_protection.style.display = "block";
	top2_3_protection.style.display = "block";
	
	menu_centerBack.style.display = "none";

	labels2.style.display = "none";
	labels.style.display = "none";
	labels3.style.display = "none";
	labels4.style.display = "none";

	labels5.style.display = "block";
	labels6.style.display = "block";
	labels7.style.display = "block";

	menu_centerBack.style.display = "block";


	}
	else {
	topOpenProtection = "unclicked";
	}
};















function menuExteriorInterior1() {
	if (menuExterior = 'unclicked') {
	menuExterior = 'clicked';
	menu_Exterior.style.backgroundColor = "rgba(45, 62, 78, .9)";
	menu_Interior.style.backgroundColor = "rgba(45, 62, 78, .5)";
	}
	else {
	menuExterior = 'unclicked';
	menu_Exterior.style.backgroundColor = "rgba(45, 62, 78, .5)";
	menu_Interior.style.backgroundColor = "rgba(45, 62, 78, .9)";
	}
};

function menuExteriorInterior2() {
	if (menuInterior = 'unclicked') {
	menu_Interior.style.backgroundColor = "rgba(45, 62, 78, .9)";
	menu_Exterior.style.backgroundColor = "rgba(45, 62, 78, .5)";
	menuInterior = 'clicked';

	labels2.style.display = "none";
	labels.style.display = "none";
	labels3.style.display = "none";
	labels4.style.display = "none";

	labels5.style.display = "none";
	labels6.style.display = "none";
	labels7.style.display = "none";
	}
	else {
	menuInterior = 'unclicked';
	menu_Interior.style.backgroundColor = "rgba(45, 62, 78, .5)";
	menu_Exterior.style.backgroundColor = "rgba(45, 62, 78, .9)";

	}
};



















function highLightWhiteCircle() {
	if (clickedStateWhite = "unclicked") {
	clickedStateWhite = 'clicked';
	circleDarkRed.style.border = 'double 10px rgba(64,32,35,0)';
	circleWhite.style.border = 'double 10px rgba(238,238,238,0.7)';
	circleDimBlue.style.border = 'double 10px rgba(0,94,132,0)';	
	circleSilver.style.border = 'double 10px rgba(189,197,218,0)';
	circleGrey.style.border = 'double 10px rgba(139,144,147,0)';
	}
	else{
	clickedStateWhite = 'unclicked';
 }
};

function highLightDarkRedCircle() {
	if (clickedStateDarkRed = "unclicked" ) {
	clickedStateDarkRed = 'clicked';
	circleDarkRed.style.border = 'double 10px rgba(64,32,35,0.7)';
	circleWhite.style.border = 'double 10px rgba(238,238,238,0)';
	circleDimBlue.style.border = 'double 10px rgba(0,94,132,0)';	
	circleSilver.style.border = 'double 10px rgba(189,197,218,0)';
	circleGrey.style.border = 'double 10px rgba(139,144,147,0)';
 }
	else{
	clickedStateDarkRed = 'unclicked';
 }
};

function highLightDimBlueCircle() {
	if (clickedStateDimBlue = "unclicked") {
	clickedStateDimBlue = 'clicked';
	circleDimBlue.style.border = 'double 10px rgba(0,94,132,0.7)';	
	circleWhite.style.border = 'double 10px rgba(238,238,238,0)';
	circleDarkRed.style.border = 'double 10px rgba(64,32,35,0)';
	circleSilver.style.border = 'double 10px rgba(189,197,218,0)';
	circleGrey.style.border = 'double 10px rgba(139,144,147,0)';
 }
	else{
	clickedStateDimBlue = 'unclicked';
 }
};

function highLightSilverCircle() {
	if (clickedStateSilver = "unclicked") {
	clickedStateSilver = 'clicked';
	circleDimBlue.style.border = 'double 10px rgba(0,94,132,0)';	
	circleWhite.style.border = 'double 10px rgba(238,238,238,0)';
	circleDarkRed.style.border = 'double 10px rgba(64,32,35,0)';
	circleSilver.style.border = 'double 10px rgba(189,197,218,0.7)';
	circleGrey.style.border = 'double 10px rgba(139,144,147,0)';
 }
	else{
	clickedStateSilver = 'unclicked';
 }
};

function highLightGreyCircle() {
	if (clickedStateGrey = "unclicked") {
	clickedStateGrey = 'clicked';
	circleDimBlue.style.border = 'double 10px rgba(0,94,132,0)';	
	circleWhite.style.border = 'double 10px rgba(238,238,238,0)';
	circleDarkRed.style.border = 'double 10px rgba(64,32,35,0)';
	circleSilver.style.border = 'double 10px rgba(189,197,218,0)';
	circleGrey.style.border = 'double 10px rgba(139,144,147,0.7)';
 }
	else{
	clickedStateGrey = 'unclicked';
 }
};


function openAdditionalImageWindow() {
afterScreenImages.style.display = "block";
overlayZ.style.display = "block";
overlayZ.style.animation = 'animationName 0.1s';
afterScreenImages.style.animation = 'animationName 0.1s';

top2_3_component.style.color = "darkgrey";
top2_3_component.style.cursor = "default";
top2_3_component.style.textDecoration = "underline";

top2_1_component.style.color = "black";
top2_1_component.style.cursor = "pointer";
top2_1_component.style.textDecoration = "none";

top2_5_component.style.color = "black";
top2_5_component.style.cursor = "pointer";
top2_5_component.style.textDecoration = "none";

top2_2_component.style.color = "black";
top2_2_component.style.cursor = "pointer";
top2_2_component.style.textDecoration = "none";

top2_4_component.style.color = "black";
top2_4_component.style.cursor = "pointer";
top2_4_component.style.textDecoration = "none";

top2_6_component.style.color = "black";
top2_6_component.style.cursor = "pointer";
top2_6_component.style.textDecoration = "none";
}

function openAdditionalImageWindowTech_LogoLight() {
afterScreenImages.style.display = "block";
overlayZ.style.display = "block";
overlayZ.style.animation = 'animationName 0.1s';
afterScreenImages.style.animation = 'animationName 0.1s';

top2_1_technology.style.color = "darkgrey";
top2_1_technology.style.cursor = "default";
top2_1_technology.style.textDecoration = "underline";

top2_2_technology.style.color = "black";
top2_2_technology.style.cursor = "pointer";
top2_2_technology.style.textDecoration = "none";

top2_3_technology.style.color = "black";
top2_3_technology.style.cursor = "pointer";
top2_3_technology.style.textDecoration = "none";

top2_4_technology.style.color = "black";
top2_4_technology.style.cursor = "pointer";
top2_4_technology.style.textDecoration = "none";

}

function openAdditionalImageWindowTech_control() {
afterScreenImages.style.display = "block";
overlayZ.style.display = "block";
overlayZ.style.animation = 'animationName 0.1s';
afterScreenImages.style.animation = 'animationName 0.1s';

top2_2_technology.style.color = "darkgrey";
top2_2_technology.style.cursor = "default";
top2_2_technology.style.textDecoration = "underline";

top2_1_technology.style.color = "black";
top2_1_technology.style.cursor = "pointer";
top2_1_technology.style.textDecoration = "none";

top2_3_technology.style.color = "black";
top2_3_technology.style.cursor = "pointer";
top2_3_technology.style.textDecoration = "none";

top2_4_technology.style.color = "black";
top2_4_technology.style.cursor = "pointer";
top2_4_technology.style.textDecoration = "none";

}

function openAdditionalImageWindowTech_360() {
afterScreenImages.style.display = "block";
overlayZ.style.display = "block";
overlayZ.style.animation = 'animationName 0.1s';
afterScreenImages.style.animation = 'animationName 0.1s';

top2_3_technology.style.color = "darkgrey";
top2_3_technology.style.cursor = "default";
top2_3_technology.style.textDecoration = "underline";

top2_2_technology.style.color = "black";
top2_2_technology.style.cursor = "pointer";
top2_2_technology.style.textDecoration = "none";

top2_1_technology.style.color = "black";
top2_1_technology.style.cursor = "pointer";
top2_1_technology.style.textDecoration = "none";

top2_4_technology.style.color = "black";
top2_4_technology.style.cursor = "pointer";
top2_4_technology.style.textDecoration = "none";

}

function openAdditionalImageWindowTech_autodoor() {
afterScreenImages.style.display = "block";
overlayZ.style.display = "block";
overlayZ.style.animation = 'animationName 0.1s';
afterScreenImages.style.animation = 'animationName 0.1s';

top2_4_technology.style.color = "darkgrey";
top2_4_technology.style.cursor = "default";
top2_4_technology.style.textDecoration = "underline";

top2_2_technology.style.color = "black";
top2_2_technology.style.cursor = "pointer";
top2_2_technology.style.textDecoration = "none";

top2_3_technology.style.color = "black";
top2_3_technology.style.cursor = "pointer";
top2_3_technology.style.textDecoration = "none";

top2_1_technology.style.color = "black";
top2_1_technology.style.cursor = "pointer";
top2_1_technology.style.textDecoration = "none";
}


function openAdditionalImageWindowProt_GuardPlane() {
afterScreenImages.style.display = "block";
overlayZ.style.display = "block";
overlayZ.style.animation = 'animationName 0.1s';
afterScreenImages.style.animation = 'animationName 0.1s';

top2_1_protection.style.color = "darkgrey";
top2_1_protection.style.cursor = "default";
top2_1_protection.style.textDecoration = "underline";

top2_2_protection.style.color = "black";
top2_2_protection.style.cursor = "pointer";
top2_2_protection.style.textDecoration = "none";

top2_3_protection.style.color = "black";
top2_3_protection.style.cursor = "pointer";
top2_3_protection.style.textDecoration = "none";
}

function openAdditionalImageWindowProt_SolarFilm() {
afterScreenImages.style.display = "block";
overlayZ.style.display = "block";
overlayZ.style.animation = 'animationName 0.1s';
afterScreenImages.style.animation = 'animationName 0.1s';

top2_2_protection.style.color = "darkgrey";
top2_2_protection.style.cursor = "default";
top2_2_protection.style.textDecoration = "underline";

top2_1_protection.style.color = "black";
top2_1_protection.style.cursor = "pointer";
top2_1_protection.style.textDecoration = "none";

top2_3_protection.style.color = "black";
top2_3_protection.style.cursor = "pointer";
top2_3_protection.style.textDecoration = "none";
}


function openAdditionalImageWindowProt_SoundProof() {
afterScreenImages.style.display = "block";
overlayZ.style.display = "block";
overlayZ.style.animation = 'animationName 0.1s';
afterScreenImages.style.animation = 'animationName 0.1s';

top2_3_protection.style.color = "darkgrey";
top2_3_protection.style.cursor = "default";
top2_3_protection.style.textDecoration = "underline";

top2_1_protection.style.color = "black";
top2_1_protection.style.cursor = "pointer";
top2_1_protection.style.textDecoration = "none";

top2_2_protection.style.color = "black";
top2_2_protection.style.cursor = "pointer";
top2_2_protection.style.textDecoration = "none";
}








function closeAdditionalImageWindow() {
afterScreenImages.style.display = "none";
overlayZ.style.display = "none";
top2_3_component.style.color = "black";
top2_3_component.style.cursor = "pointer";
top2_3_component.style.textDecoration = "none";

top2_1_technology.style.color = "black";
top2_1_technology.style.cursor = "pointer";
top2_1_technology.style.textDecoration = "none";

top2_2_technology.style.color = "black";
top2_2_technology.style.cursor = "pointer";
top2_2_technology.style.textDecoration = "none";

top2_3_technology.style.color = "black";
top2_3_technology.style.cursor = "pointer";
top2_3_technology.style.textDecoration = "none";

top2_4_technology.style.color = "black";
top2_4_technology.style.cursor = "pointer";
top2_4_technology.style.textDecoration = "none";

top2_3_protection.style.color = "black";
top2_3_protection.style.cursor = "pointer";
top2_3_protection.style.textDecoration = "none";
top2_2_protection.style.color = "black";
top2_2_protection.style.cursor = "pointer";
top2_2_protection.style.textDecoration = "none";
top2_1_protection.style.color = "black";
top2_1_protection.style.cursor = "pointer";
top2_1_protection.style.textDecoration = "none";
}
