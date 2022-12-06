


TemplatesIconBaseContainer.style.backgroundColor = "#555555";
bigMainMenuOfDimensions.style.display = "none";



bigMainMenuOfElements.style.display = "none";
ElementsIconBaseContainer.style.backgroundColor = "#555555";

bigMainMenuOfFittings.style.display = "none";
ArtIconBaseContainer.style.backgroundColor = "#555555";

bigMainMenuOfDoors.style.display = "none";
StylesIconBaseContainer.style.backgroundColor = "#555555";

bigMainMenuOfMaterials.style.display = "none";
MaterialsIconBaseContainer.style.backgroundColor = "#555555";

bigMainMenuOfBasics.style.display = "none";
BasicsIconBaseContainer.style.backgroundColor = "#555555";





AddRemoveSlantRightDoor_Basics.style.backgroundColor = "green";










/*
function SlantLeftOnHover() {
SlantLeftBasicsection.style.backgroundColor = "#ffffff3b";
}

function SlantLeftOnHoverOut() {
SlantLeftBasicsection.style.backgroundColor = "#0000008c";
}


function SlantRightHover() {
SlantLeftBasicsection.style.backgroundColor = "#ffffff3b";
}

function SlantRightOnHoverOut() {
SlantLeftBasicsection.style.backgroundColor = "#000000a3";
}
*/

function onhoverElements_Door_Handle() {
SingleElementsectionDoorHandle.style.background = "#96969673";
}

function onoutElements_Door_Handle() {
SingleElementsectionDoorHandle.style.background = "#0000000f";
}


function onhoverElements_HookHanger() {
SingleElementsectionHookHanger.style.background = "#96969673";
}

function onoutElements_HookHanger() {
SingleElementsectionHookHanger.style.background = "#0000000f";
}


function onhoverElements_HookHanger2() {
SingleElementsectionHookHanger2.style.background = "#96969673";
}

function onoutElements_HookHanger2() {
SingleElementsectionHookHanger2.style.background = "#0000000f";
}



function onhoverElements_DoorHandle4() {
	SingleElementsectionDoorHandle4.style.background = "#96969673";
}

function onoutElements_DoorHandle4() {
	SingleElementsectionDoorHandle4.style.background = "#0000000f";
}



function onhoverElements_DoorHandle5() {
	SingleElementsectionDoorHandle5.style.background = "#96969673";
}

function onoutElements_DoorHandle5() {
	SingleElementsectionDoorHandle5.style.background = "#0000000f";
}


function onhoverElements_DoorHandle6() {
	SingleElementsectionDoorHandle6.style.background = "#96969673";
}

function onoutElements_DoorHandle6() {
	SingleElementsectionDoorHandle6.style.background = "#0000000f";
}



function onhoverElements_DoorHandle7() {
	SingleElementsectionDoorHandle6.style.background = "#96969673";
}

function onoutElements_DoorHandle7() {
	SingleElementsectionDoorHandle6.style.background = "#0000000f";
}



function onhoverElements_DoorHandle8() {
	SingleElementsectionDoorHandle6.style.background = "#96969673";
}

function onoutElements_DoorHandle8() {
	SingleElementsectionDoorHandle6.style.background = "#0000000f";
}



function onhoverElements_DoorHandle9() {
	SingleElementsectionDoorHandle6.style.background = "#96969673";
}

function onoutElements_DoorHandle9() {
	SingleElementsectionDoorHandle6.style.background = "#0000000f";
}


function onhoverMaterials_Door_Handle() {
SingleMaterialsectionDoorHandle.style.background = "#96969673";
}

function onoutMaterials_Door_Handle() {
SingleMaterialsectionDoorHandle.style.background = "#0000000f";
}


//MATERIALS UI BLOCK FUNCS

/* 18feb turned off hovers
function onhoverMaterials_mainBlock_Wood1() {
	SingleMaterial_materials_mainBlock.style.background = "#96969673";
}
*/



/*
function onoutMaterials_mainBlock_Wood1() {

	SingleMaterial_materials_mainBlock.style.background = SingleMaterial_materials_mainBlockVARSTATE;
}

HTML:
onmouseover="onhoverMaterials_mainBlock_Wood1()" onmouseout="onoutMaterials_mainBlock_Wood1()"
*/



function onhoverMaterials_HookHanger2() {
SingleMaterialsectionHookHanger2.style.background = "#96969673";
}

function onoutMaterials_HookHanger2() {
SingleMaterialsectionHookHanger2.style.background = "#0000000f";
}




function onhoverMaterials_HookHanger() {
SingleMaterialsectionHookHanger.style.background = "#96969673";
}

function onoutMaterials_HookHanger() {
SingleMaterialsectionHookHanger.style.background = "#0000000f";
}





function SlantLeftSelect() {

if (window.confirm("Your current progress can be lost, are you sure you want to continue with reset and the new Slant Left cabinet base?")) { 
		SlantRightBasicsection.style.backgroundColor = "#000000a3"; 
		SlantDefaultBasicsection.style.backgroundColor = "#0000008c"; 
		SlantBackBasicsection.style.backgroundColor = "#000000a3"; 

		SlantLeftBasicsection.style.backgroundColor = "#eff0ff1c"; 
		SlantLeftSelectedStateText.innerHTML = "Selected";
		AddRemoveSlantLeftDoor_Basics.style.backgroundColor = "green";
		AddRemoveSlantLeftDoor_Basics.style.width = "4.5em";
		SlantLeftBasicsection.style.borderRadius = "0em 0em 3em 0em";

		SlantRightSelectedStateText.innerHTML = "Select";
		AddRemoveSlantRightDoor_Basics.style.backgroundColor = "navy";
		AddRemoveSlantRightDoor_Basics.style.width = "3.3em";
		SlantRightBasicsection.style.borderRadius = "0em 0em 0em 0em";

		SlantDefaultSelectedStateText.innerHTML = "Select";
		AddRemoveSlantDefaultDoor_Basics.style.backgroundColor = "navy";
		AddRemoveSlantDefaultDoor_Basics.style.width = "3.3em";
		SlantDefaultBasicsection.style.borderRadius = "0em 0em 0em 0em";


		SlantBackBasicsection.style.borderRadius = "0em 0em 0em 0em";
		SlantBackSelectedStateText.innerHTML = "Select";
		SlantBackSelectedStateText.style.backgroundColor = "navy";
		AddRemoveSlantBackDoor_Basics.style.width = "3.1em";

		}
}




function SlantRightSelect() {
	if (window.confirm("Your current progress can be lost, are you sure you want to continue with reset and the new Slant Right cabinet base?")) { 

		SlantRightBasicsection.style.backgroundColor = "#eff0ff1c"; 
		SlantDefaultBasicsection.style.backgroundColor = "#0000008c"; 
		SlantBackBasicsection.style.backgroundColor = "#000000a3"; 
		SlantLeftBasicsection.style.backgroundColor = "#000000a3"; 

		SlantLeftBasicsection.style.borderRadius = "0em 0em 0em 0em";
		SlantLeftSelectedStateText.innerHTML = "Select";
		AddRemoveSlantLeftDoor_Basics.style.backgroundColor = "navy";
		AddRemoveSlantLeftDoor_Basics.style.width = "3.2em";
		
		SlantRightSelectedStateText.innerHTML = "Selected";
		SlantRightSelectedStateText.style.backgroundColor = "green";
		SlantRightBasicsection.style.borderRadius = "0em 0em 3em 0em";
		AddRemoveSlantRightDoor_Basics.style.width = "4em";

		SlantBackBasicsection.style.borderRadius = "0em 0em 0em 0em";
		SlantBackSelectedStateText.innerHTML = "Select";
		AddRemoveSlantBackDoor_Basics.style.backgroundColor = "navy";
		AddRemoveSlantBackDoor_Basics.style.width = "3.1em";


		SlantBackBasicsection.style.borderRadius = "0em 0em 0em 0em";
		SlantBackSelectedStateText.innerHTML = "Select";
		AddRemoveSlantBackDoor_Basics.style.backgroundColor = "navy";
		AddRemoveSlantBackDoor_Basics.style.width = "3.1em";
		}
}




function SlantBackSelect() {
	if (window.confirm("Your current progress can be lost, are you sure you want to continue with reset and the new Slant Back cabinet base?")) { 

		SlantRightBasicsection.style.backgroundColor = "#000000a3"; 
		SlantLeftBasicsection.style.backgroundColor = "#0000008c";
		SlantBackBasicsection.style.backgroundColor = "#eff0ff1c";  
		SlantDefaultBasicsection.style.backgroundColor = "#0000008c"; 

		SlantLeftBasicsection.style.borderRadius = "0em 0em 0em 0em";
		SlantLeftSelectedStateText.innerHTML = "Select";
		AddRemoveSlantLeftDoor_Basics.style.backgroundColor = "navy";
		AddRemoveSlantLeftDoor_Basics.style.width = "3.1em";
		
		SlantRightBasicsection.style.borderRadius = "0em 0em 0em 0em";
		SlantRightSelectedStateText.innerHTML = "Select";
		AddRemoveSlantRightDoor_Basics.style.backgroundColor = "navy";
		AddRemoveSlantRightDoor_Basics.style.width = "3.1em";

		SlantBackSelectedStateText.innerHTML = "Selected";
		SlantBackSelectedStateText.style.backgroundColor = "green";
		SlantBackBasicsection.style.borderRadius = "0em 0em 3em 0em";

		SlantDefaultSelectedStateText.innerHTML = "Select";
		AddRemoveSlantDefaultDoor_Basics.style.backgroundColor = "navy";
		AddRemoveSlantDefaultDoor_Basics.style.width = "3.3em";
		SlantDefaultBasicsection.style.borderRadius = "0em 0em 0em 0em";

		}
}





function SlantDefaultSelect() {
	if (window.confirm("Your current progress can be lost, are you sure you want to continue with reset and the new Slant Default cabinet base?")) { 

		SlantRightBasicsection.style.backgroundColor = "#000000a3"; 
		SlantLeftBasicsection.style.backgroundColor = "#0000008c";
		SlantBackBasicsection.style.backgroundColor = "#000000a3";  
		SlantDefaultBasicsection.style.backgroundColor = "#eff0ff1c"; 

		SlantLeftBasicsection.style.borderRadius = "0em 0em 0em 0em";
		SlantLeftSelectedStateText.innerHTML = "Select";
		AddRemoveSlantLeftDoor_Basics.style.backgroundColor = "navy";
		AddRemoveSlantLeftDoor_Basics.style.width = "3.1em";
		
		SlantRightBasicsection.style.borderRadius = "0em 0em 0em 0em";
		SlantRightSelectedStateText.innerHTML = "Select";
		SlantRightSelectedStateText.style.backgroundColor = "navy";
		AddRemoveSlantRightDoor_Basics.style.width = "3.1em";

		SlantBackBasicsection.style.borderRadius = "0em 0em 0em 0em";
		SlantBackSelectedStateText.innerHTML = "Select";
		SlantBackSelectedStateText.style.backgroundColor = "navy";
		AddRemoveSlantBackDoor_Basics.style.width = "3.1em";

		SlantDefaultSelectedStateText.innerHTML = "Selected";
		AddRemoveSlantDefaultDoor_Basics.style.backgroundColor = "green";
		AddRemoveSlantDefaultDoor_Basics.style.width = "4.1em";
		SlantDefaultBasicsection.style.borderRadius = "0em 0em 3em 0em";
		}
}


























/*Aka open DImensions*/
function openTemplates() {
bigMainMenuOfDimensions.style.display = "block";
TemplatesIconBaseContainer.style.backgroundColor = "#38383800";

bigMainMenuOfBasics.style.display = "none";
BasicsIconBaseContainer.style.backgroundColor = "#151b1f54";
bigMainMenuOfDoors.style.display = "none";
StylesIconBaseContainer.style.backgroundColor = "#151b1f54";
bigMainMenuOfFittings.style.display = "none";
ArtIconBaseContainer.style.backgroundColor = "#151b1f54";
bigMainMenuOfElements.style.display = "none";
ElementsIconBaseContainer.style.backgroundColor = "#151b1f54";

bigMainMenuOfMaterials.style.display = "none";
MaterialsIconBaseContainer.style.backgroundColor = "#151b1f54";

bigMainMenuOfMaterials.style.display = "none";
MaterialsIconBaseContainer.style.backgroundColor = "#151b1f54";

/////
white3DTopPanel.style.left = "47.6em";
white3DTopPanel.style.backgroundColor = "#151b1f82";
white3DTopPanel.style.boxShadow = "0 8px 33px -6px #000000c2";
}


function closeDimensions() {
bigMainMenuOfDimensions.style.display = "none";
TemplatesIconBaseContainer.style.backgroundColor = "#555555";
BasicsIconBaseContainer.style.backgroundColor = "#555555";
StylesIconBaseContainer.style.backgroundColor = "#555555";
ElementsIconBaseContainer.style.backgroundColor = "#555555";
ArtIconBaseContainer.style.backgroundColor = "#555555";
MaterialsIconBaseContainer.style.backgroundColor = "#555555";
white3DTopPanel.style.left = "11.2em";
white3DTopPanel.style.backgroundColor = "#555555";
white3DTopPanel.style.boxShadow = "0 0px 0px -6px #000000c2";
}



















function openDoors() {
bigMainMenuOfDoors.style.display = "block";
StylesIconBaseContainer.style.backgroundColor = "#38383800";

bigMainMenuOfBasics.style.display = "none";
BasicsIconBaseContainer.style.backgroundColor = "#151b1f54";

bigMainMenuOfMaterials.style.display = "none";
MaterialsIconBaseContainer.style.backgroundColor = "#151b1f54";

bigMainMenuOfDimensions.style.display = "none";
TemplatesIconBaseContainer.style.backgroundColor = "#151b1f54";
bigMainMenuOfFittings.style.display = "none";
ArtIconBaseContainer.style.backgroundColor = "#151b1f54";
bigMainMenuOfElements.style.display = "none";
ElementsIconBaseContainer.style.backgroundColor = "#151b1f54";
MaterialsIconBaseContainer.style.backgroundColor = "#151b1f54";
/////
white3DTopPanel.style.left = "47.6em";
white3DTopPanel.style.backgroundColor = "#151b1f82";
white3DTopPanel.style.boxShadow = "0 8px 33px -6px #000000c2";
}


function closeDoors() {
bigMainMenuOfDoors.style.display = "none";
TemplatesIconBaseContainer.style.backgroundColor = "#555555";
BasicsIconBaseContainer.style.backgroundColor = "#555555";
StylesIconBaseContainer.style.backgroundColor = "#555555";
ElementsIconBaseContainer.style.backgroundColor = "#555555";
ArtIconBaseContainer.style.backgroundColor = "#555555";
MaterialsIconBaseContainer.style.backgroundColor = "#555555";
white3DTopPanel.style.left = "11.2em";
white3DTopPanel.style.boxShadow = "0 0px 0px -6px #000000c2";
white3DTopPanel.style.backgroundColor = "#555555";
}










function openBasics() {
	
bigMainMenuOfDoors.style.display = "none";
StylesIconBaseContainer.style.backgroundColor = "#151b1f54";

bigMainMenuOfMaterials.style.display = "none";
MaterialsIconBaseContainer.style.backgroundColor = "#151b1f54";

bigMainMenuOfDimensions.style.display = "none";
TemplatesIconBaseContainer.style.backgroundColor = "#151b1f54";

bigMainMenuOfBasics.style.display = "block";
BasicsIconBaseContainer.style.backgroundColor = "#38383800";

bigMainMenuOfFittings.style.display = "none";
ArtIconBaseContainer.style.backgroundColor = "#151b1f54";
bigMainMenuOfElements.style.display = "none";

ElementsIconBaseContainer.style.backgroundColor = "#555555";
MaterialsIconBaseContainer.style.backgroundColor = "#555555";
/////


white3DTopPanel.style.left = "47.6em";
white3DTopPanel.style.backgroundColor = "#151b1f82";
white3DTopPanel.style.boxShadow = "0 8px 33px -6px #000000c2";
w3dtp_right.style.background = "555555";
}


function closeBasics() {
bigMainMenuOfBasics.style.display = "none";
TemplatesIconBaseContainer.style.backgroundColor = "#555555";
BasicsIconBaseContainer.style.backgroundColor = "#555555";
StylesIconBaseContainer.style.backgroundColor = "#555555";
ElementsIconBaseContainer.style.backgroundColor = "#555555";
ArtIconBaseContainer.style.backgroundColor = "#555555";
MaterialsIconBaseContainer.style.backgroundColor = "#555555";
white3DTopPanel.style.left = "11.2em";
white3DTopPanel.style.boxShadow = "0 0px 0px -6px #000000c2";
white3DTopPanel.style.backgroundColor = "#555555";
w3dtp_right.style.background = "555555";
}























function openFittings() {

bigMainMenuOfFittings.style.display = "block";
ArtIconBaseContainer.style.backgroundColor = "#38383800";

bigMainMenuOfMaterials.style.display = "none";
MaterialsIconBaseContainer.style.backgroundColor = "#151b1f54";

bigMainMenuOfBasics.style.display = "none";
BasicsIconBaseContainer.style.backgroundColor = "#151b1f54";
bigMainMenuOfDoors.style.display = "none";
StylesIconBaseContainer.style.backgroundColor = "#151b1f54";
bigMainMenuOfDimensions.style.display = "none";
TemplatesIconBaseContainer.style.backgroundColor = "#151b1f54";
bigMainMenuOfElements.style.display = "none";
ElementsIconBaseContainer.style.backgroundColor = "#151b1f54";

MaterialsIconBaseContainer.style.backgroundColor = "#151b1f54";
/////
white3DTopPanel.style.left = "47.6em";
white3DTopPanel.style.backgroundColor = "#151b1f82";
white3DTopPanel.style.boxShadow = "0 8px 33px -6px #000000c2";
w3dtp_right.style.background = "555555";
}


function closeFittings() {
bigMainMenuOfFittings.style.display = "none";
bigMainMenuOfDoors.style.display = "none";
bigMainMenuOfDimensions.style.display = "none";
TemplatesIconBaseContainer.style.backgroundColor = "#555555";
BasicsIconBaseContainer.style.backgroundColor = "#555555";
StylesIconBaseContainer.style.backgroundColor = "#555555";
ElementsIconBaseContainer.style.backgroundColor = "#555555";
ArtIconBaseContainer.style.backgroundColor = "#555555";
MaterialsIconBaseContainer.style.backgroundColor = "#555555";
white3DTopPanel.style.left = "11.2em";
white3DTopPanel.style.boxShadow = "0 0px 0px -6px #000000c2";
white3DTopPanel.style.backgroundColor = "#555555";
w3dtp_right.style.background = "555555";}





















function openElements() {
	bigMainMenuOfFittings.style.display = "none";
	ArtIconBaseContainer.style.backgroundColor = "#151b1f54";
	
	bigMainMenuOfMaterials.style.display = "none";
	MaterialsIconBaseContainer.style.backgroundColor = "#151b1f54";
	
	bigMainMenuOfBasics.style.display = "none";
	BasicsIconBaseContainer.style.backgroundColor = "#151b1f54";
	bigMainMenuOfDoors.style.display = "none";
	StylesIconBaseContainer.style.backgroundColor = "#151b1f54";
	bigMainMenuOfDimensions.style.display = "none";
	TemplatesIconBaseContainer.style.backgroundColor = "#151b1f54";

	bigMainMenuOfElements.style.display = "block";
	ElementsIconBaseContainer.style.backgroundColor = "#38383800";
	
	MaterialsIconBaseContainer.style.backgroundColor = "#151b1f54";
	/////
	white3DTopPanel.style.left = "47.6em";
	white3DTopPanel.style.backgroundColor = "#151b1f82";
	white3DTopPanel.style.boxShadow = "0 8px 33px -6px #000000c2";
	w3dtp_right.style.background = "555555";
}


function closeElements() {
bigMainMenuOfElements.style.display = "none";
bigMainMenuOfDoors.style.display = "none";
bigMainMenuOfDimensions.style.display = "none";
TemplatesIconBaseContainer.style.backgroundColor = "#555555";
BasicsIconBaseContainer.style.backgroundColor = "#555555";
StylesIconBaseContainer.style.backgroundColor = "#555555";
ElementsIconBaseContainer.style.backgroundColor = "#555555";
ArtIconBaseContainer.style.backgroundColor = "#555555";
MaterialsIconBaseContainer.style.backgroundColor = "#555555";
white3DTopPanel.style.left = "11.2em";
white3DTopPanel.style.boxShadow = "0 0px 0px -6px #000000c2";
white3DTopPanel.style.backgroundColor = "#555555";
w3dtp_right.style.background = "555555";
}





































function openMaterials() {

bigMainMenuOfFittings.style.display = "none";
ArtIconBaseContainer.style.backgroundColor = "#151b1f54";

bigMainMenuOfMaterials.style.display = "block";
MaterialsIconBaseContainer.style.backgroundColor = "#38383800";

bigMainMenuOfElements.style.display = "none";
ElementsIconBaseContainer.style.backgroundColor = "#151b1f54";

bigMainMenuOfBasics.style.display = "none";
BasicsIconBaseContainer.style.backgroundColor = "#151b1f54";
bigMainMenuOfDoors.style.display = "none";
StylesIconBaseContainer.style.backgroundColor = "#151b1f54";
bigMainMenuOfDimensions.style.display = "none";

TemplatesIconBaseContainer.style.backgroundColor = "#151b1f54";




white3DTopPanel.style.left = "47.6em";
white3DTopPanel.style.backgroundColor = "#151b1f82";
white3DTopPanel.style.boxShadow = "0 8px 33px -6px #000000c2";
w3dtp_right.style.background = "555555";
}


function closeMaterials() {

	bigMainMenuOfMaterials.style.display = "none";
	bigMainMenuOfDoors.style.display = "none";
	bigMainMenuOfDimensions.style.display = "none";
	TemplatesIconBaseContainer.style.backgroundColor = "#555555";
	BasicsIconBaseContainer.style.backgroundColor = "#555555";
	StylesIconBaseContainer.style.backgroundColor = "#555555";
	ElementsIconBaseContainer.style.backgroundColor = "#555555";
	ArtIconBaseContainer.style.backgroundColor = "#555555";
	MaterialsIconBaseContainer.style.backgroundColor = "#555555";
	white3DTopPanel.style.left = "11.2em";
	white3DTopPanel.style.boxShadow = "0 0px 0px -6px #000000c2";
	white3DTopPanel.style.backgroundColor = "#555555";
	w3dtp_right.style.background = "555555";

}







































function openSubwindow1() {
white3DTopPanel_ColorPanel.style.opacity = "1"

}

function closeSubwindow1() {
white3DTopPanel_ColorPanel.style.opacity = "0"

}


var HelperDisplayStatus = 0;

function showHelper() {

	if (HelperDisplayStatus == 0) {
		CharBaseContainer.style.display = "block";
		white3DTopPanel_help.style.opacity = "0.3";
		white3DTopPanel_help_text.style.opacity = "0.3";
		
		HelperDisplayStatus = 1; }

	else if (HelperDisplayStatus == 1) {

		CharBaseContainer.style.display = "none";
		
		white3DTopPanel_help.style.opacity = "1";
		white3DTopPanel_help_text.style.opacity = "1";
		
		HelperDisplayStatus = 0; }
	}














/* document.getElementById('subdomainNumberElementCorpus_Cabinet_Dimensionsz').oninput = function () {

	var max = parseInt(this.max);

	if (parseInt(this.value) > max) {
		this.value = max; 
	}

	switch (parseInt(this.max)) {

		case 1:
		VerticalWidth_1_Corpus_Dimensions.style.display = "none";
		VerticalWidth_2_Corpus_Dimensions.style.display = "none";
		VerticalWidth_3_Corpus_Dimensions.style.display = "none";
		NumberElementCorpus_Dimensions.style.height = "3.2em";
		Fittings_Vertical_section_1.style.display = "block";
		Fittings_Vertical_section_2.style.display = "none";
		Fittings_Vertical_section_3.style.display = "none";
		break;

		case 2:
		VerticalWidth_1_Corpus_Dimensions.style.display = "block";
		VerticalWidth_2_Corpus_Dimensions.style.display = "none";
		VerticalWidth_3_Corpus_Dimensions.style.display = "none";
		Fittings_Vertical_section_1.style.display = "block";
		Fittings_Vertical_section_2.style.display = "block";
		Fittings_Vertical_section_3.style.display = "none";
		NumberElementCorpus_Dimensions.style.height = "6.1em";
		break;
	}
} */
















//prevent inserting values greater than max on input html (width,depth,height)


document.getElementsByClassName('edit-items1')[0].oninput = function () {
	var max = parseInt(this.max);

	if (parseInt(this.value) > max) {
		this.value = max; 
	}
}



document.getElementsByClassName('edit-items2')[0].oninput = function () {
	var max = parseInt(this.max);

	if (parseInt(this.value) > max) {
		this.value = max; 
	}
}



document.getElementsByClassName('edit-items3')[0].oninput = function () {
	var max = parseInt(this.max);

	if (parseInt(this.value) > max) {
		this.value = max; 
	}
}









//Commented on 31 May, writing JS funcs for shelfes and of vertical sections 

function AmountOfShelfs_section_1_JSCall() {

	switch (document.getElementById("AmountOfShelfs_section_1_input").value) {
		
		case '0':
		AmountOfShelfs_section_1_shelf_1_1_divBlock.style.display = "none"
		AmountOfShelfs_section_1_shelf_1_2_divBlock.style.display = "none"
		AmountOfShelfs_section_1_shelf_1_3_divBlock.style.display = "none"
		AmountOfShelfs_section_1_shelf_1_4_divBlock.style.display = "none"
		AmountOfShelfs_section_1_shelf_1_5_divBlock.style.display = "none"
		AmountOfShelfs_section_1.style.marginBottom = "3.6em";
		Fittings_Vertical_section_1.style.height = "13.8em"
		break;

		case '1':r5
		AmountOfShelfs_section_1_shelf_1_1_divBlock.style.display = "block"
		AmountOfShelfs_section_1_shelf_1_2_divBlock.style.display = "none"
		AmountOfShelfs_section_1_shelf_1_3_divBlock.style.display = "none"
		AmountOfShelfs_section_1_shelf_1_4_divBlock.style.display = "none"
		AmountOfShelfs_section_1_shelf_1_5_divBlock.style.display = "none"
		AmountOfShelfs_section_1.style.marginBottom = "3.6em";
		Fittings_Vertical_section_1.style.height = "13.8em"
		break;

		case '2':
		AmountOfShelfs_section_1_shelf_1_1_divBlock.style.display = "block"
		AmountOfShelfs_section_1_shelf_1_2_divBlock.style.display = "block"
		AmountOfShelfs_section_1_shelf_1_3_divBlock.style.display = "none"
		AmountOfShelfs_section_1_shelf_1_4_divBlock.style.display = "none"
		AmountOfShelfs_section_1_shelf_1_5_divBlock.style.display = "none"
		AmountOfShelfs_section_1.style.marginBottom = "5.7em";
		Fittings_Vertical_section_1.style.height = "15.2em"
		break;

		case '3':
		AmountOfShelfs_section_1_shelf_1_1_divBlock.style.display = "block"
		AmountOfShelfs_section_1_shelf_1_2_divBlock.style.display = "block"
		AmountOfShelfs_section_1_shelf_1_3_divBlock.style.display = "block"
		AmountOfShelfs_section_1_shelf_1_4_divBlock.style.display = "none"
		AmountOfShelfs_section_1_shelf_1_5_divBlock.style.display = "none"
		AmountOfShelfs_section_1.style.marginBottom = "8em";
		Fittings_Vertical_section_1.style.height = "17em"
		break;

	}
	
}



function AmountOfShelfs_section_2_JSCall() {
	
	switch (document.getElementById("AmountOfShelfs_section_2_input").value) {

		case '0':
		AmountOfShelfs_section_2_shelf_1_1_divBlock.style.display = "none"
		AmountOfShelfs_section_2_shelf_1_2_divBlock.style.display = "none"
		AmountOfShelfs_section_2_shelf_1_3_divBlock.style.display = "none"
		AmountOfShelfs_section_2_shelf_1_4_divBlock.style.display = "none"
		AmountOfShelfs_section_2_shelf_1_5_divBlock.style.display = "none"
		AmountOfShelfs_section_2.style.marginBottom = "3.6em";
		Fittings_Vertical_section_2.style.height = "13.8em"
		break;

		case '1':
		AmountOfShelfs_section_2_shelf_1_1_divBlock.style.display = "block"
		AmountOfShelfs_section_2_shelf_1_2_divBlock.style.display = "none"
		AmountOfShelfs_section_2_shelf_1_3_divBlock.style.display = "none"
		AmountOfShelfs_section_2_shelf_1_4_divBlock.style.display = "none"
		AmountOfShelfs_section_2_shelf_1_5_divBlock.style.display = "none"
		AmountOfShelfs_section_2.style.marginBottom = "3.6em";
		Fittings_Vertical_section_2.style.height = "13.8em"
		break;

		case '2':
		AmountOfShelfs_section_2_shelf_1_1_divBlock.style.display = "block"
		AmountOfShelfs_section_2_shelf_1_2_divBlock.style.display = "block"
		AmountOfShelfs_section_2_shelf_1_3_divBlock.style.display = "none"
		AmountOfShelfs_section_2_shelf_1_4_divBlock.style.display = "none"
		AmountOfShelfs_section_2_shelf_1_5_divBlock.style.display = "none"
		AmountOfShelfs_section_2.style.marginBottom = "5.7em";
		Fittings_Vertical_section_2.style.height = "15.2em"
		break;

		case '3':
		AmountOfShelfs_section_2_shelf_1_1_divBlock.style.display = "block"
		AmountOfShelfs_section_2_shelf_1_2_divBlock.style.display = "block"
		AmountOfShelfs_section_2_shelf_1_3_divBlock.style.display = "block"
		AmountOfShelfs_section_2_shelf_1_4_divBlock.style.display = "none"
		AmountOfShelfs_section_2_shelf_1_5_divBlock.style.display = "none"
		AmountOfShelfs_section_2.style.marginBottom = "8em";
		Fittings_Vertical_section_2.style.height = "17em"
		break;

		case '4':
		AmountOfShelfs_section_2_shelf_1_1_divBlock.style.display = "block"
		AmountOfShelfs_section_2_shelf_1_2_divBlock.style.display = "block"
		AmountOfShelfs_section_2_shelf_1_3_divBlock.style.display = "block"
		AmountOfShelfs_section_2_shelf_1_4_divBlock.style.display = "block"
		AmountOfShelfs_section_2_shelf_1_5_divBlock.style.display = "none"
		AmountOfShelfs_section_2.style.marginBottom = "10.3em";
		Fittings_Vertical_section_2.style.height = "18.8em"
		break;

		case '5':
		AmountOfShelfs_section_2_shelf_1_1_divBlock.style.display = "block"
		AmountOfShelfs_section_2_shelf_1_2_divBlock.style.display = "block"
		AmountOfShelfs_section_2_shelf_1_3_divBlock.style.display = "block"
		AmountOfShelfs_section_2_shelf_1_4_divBlock.style.display = "block"
		AmountOfShelfs_section_2_shelf_1_5_divBlock.style.display = "block"
		AmountOfShelfs_section_2.style.marginBottom = "12.3em";
		Fittings_Vertical_section_2.style.height = "20.3em"
		break;

		//default:
		//alert( "Currently limited to 5 shelves per section");
		//document.getElementById("AmountOfShelfs_section_2_inputParentDiv").value = "5";
	}
	
}










function AmountOfShelfs_section_3_JSCall() {
	
	switch (document.getElementById("AmountOfShelfs_section_3_input").value) {

		case '0':
		AmountOfShelfs_section_3_shelf_1_1_divBlock.style.display = "none"
		AmountOfShelfs_section_3_shelf_1_2_divBlock.style.display = "none"
		AmountOfShelfs_section_3_shelf_1_3_divBlock.style.display = "none"
		AmountOfShelfs_section_3_shelf_1_4_divBlock.style.display = "none"
		AmountOfShelfs_section_3_shelf_1_5_divBlock.style.display = "none"
		AmountOfShelfs_section_3.style.marginBottom = "3.6em";
		Fittings_Vertical_section_3.style.height = "13.8em"
		break;

		case '1':
		AmountOfShelfs_section_3_shelf_1_1_divBlock.style.display = "block"
		AmountOfShelfs_section_3_shelf_1_2_divBlock.style.display = "none"
		AmountOfShelfs_section_3_shelf_1_3_divBlock.style.display = "none"
		AmountOfShelfs_section_3_shelf_1_4_divBlock.style.display = "none"
		AmountOfShelfs_section_3_shelf_1_5_divBlock.style.display = "none"
		AmountOfShelfs_section_3.style.marginBottom = "3.6em";
		Fittings_Vertical_section_3.style.height = "13.8em"
		break;

		case '2':
		AmountOfShelfs_section_3_shelf_1_1_divBlock.style.display = "block"
		AmountOfShelfs_section_3_shelf_1_2_divBlock.style.display = "block"
		AmountOfShelfs_section_3_shelf_1_3_divBlock.style.display = "none"
		AmountOfShelfs_section_3_shelf_1_4_divBlock.style.display = "none"
		AmountOfShelfs_section_3_shelf_1_5_divBlock.style.display = "none"
		AmountOfShelfs_section_3.style.marginBottom = "5.7em";
		Fittings_Vertical_section_3.style.height = "15.2em"
		break;

		case '3':
		AmountOfShelfs_section_3_shelf_1_1_divBlock.style.display = "block"
		AmountOfShelfs_section_3_shelf_1_2_divBlock.style.display = "block"
		AmountOfShelfs_section_3_shelf_1_3_divBlock.style.display = "block"
		AmountOfShelfs_section_3_shelf_1_4_divBlock.style.display = "none"
		AmountOfShelfs_section_3_shelf_1_5_divBlock.style.display = "none"
		AmountOfShelfs_section_3.style.marginBottom = "8em";
		Fittings_Vertical_section_3.style.height = "17em"
		break;

		case '4':
		AmountOfShelfs_section_3_shelf_1_1_divBlock.style.display = "block"
		AmountOfShelfs_section_3_shelf_1_2_divBlock.style.display = "block"
		AmountOfShelfs_section_3_shelf_1_3_divBlock.style.display = "block"
		AmountOfShelfs_section_3_shelf_1_4_divBlock.style.display = "block"
		AmountOfShelfs_section_3_shelf_1_5_divBlock.style.display = "none"
		AmountOfShelfs_section_3.style.marginBottom = "10.3em";
		Fittings_Vertical_section_3.style.height = "18.8em"
		break;

		case '5':
		AmountOfShelfs_section_3_shelf_1_1_divBlock.style.display = "block"
		AmountOfShelfs_section_3_shelf_1_2_divBlock.style.display = "block"
		AmountOfShelfs_section_3_shelf_1_3_divBlock.style.display = "block"
		AmountOfShelfs_section_3_shelf_1_4_divBlock.style.display = "block"
		AmountOfShelfs_section_3_shelf_1_5_divBlock.style.display = "block"
		AmountOfShelfs_section_3.style.marginBottom = "12.3em";
		Fittings_Vertical_section_3.style.height = "20.3em"
		break;

		default:
		alert( "Currently limited to 5 shelves per section");
		//document.getElementById("AmountOfShelfs_section_3_inputParentDiv").value = "5";
	}
	
}