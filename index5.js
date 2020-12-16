// const addTally=(ev)=>{
//     document.querySelector(".box").innerHTML=l;
// };
// document.querySelector('.box').onlcick=addTally;

$('input[name="radio-btn"]').wrap('<div class="radio-btn"><i></i></div>');
$(".radio-btn").on('click', function () {
    var _this = $(this),
        block = _this.parent().parent();
    block.find('input:radio').attr('checked', false);
    block.find(".radio-btn").removeClass('checkedRadio');
    _this.addClass('checkedRadio');
    _this.find('input:radio').attr('checked', true);
});
$('input[name="check-box"]').wrap('<div class="check-box"><i></i></div>');
$.fn.toggleCheckbox = function () {
    this.attr('checked', !this.attr('checked'));
}
$('.check-box').on('click', function () {
    $(this).find(':checkbox').toggleCheckbox();
    $(this).toggleClass('checkedBox');
});

function showImage(){
    document.getElementById('loadingImage').style.visibility=    document.getElementById('loadingImage').style.visibility == 'visible'? 'hidden' : 'visible';
}
function showImage2(){
    document.getElementById('loadingImage2').style.visibility=    document.getElementById('loadingImage2').style.visibility == 'visible'? 'hidden' : 'visible';
}

function showImage3(){
    document.getElementById('loadingImage3').style.visibility=    document.getElementById('loadingImage3').style.visibility == 'visible'? 'hidden' : 'visible';
}

function showImage4(){
    document.getElementById('loadingImage4').style.visibility=    document.getElementById('loadingImage4').style.visibility == 'visible'? 'hidden' : 'visible';
}
function showImage5(){
    document.getElementById('loadingImage5').style.visibility=    document.getElementById('loadingImage5').style.visibility == 'visible'? 'hidden' : 'visible';
}

function showImage6(){
    document.getElementById('loadingImage6').style.visibility=    document.getElementById('loadingImage6').style.visibility == 'visible'? 'hidden' : 'visible';
}

function showImage7(){
    document.getElementById('loadingImage7').style.visibility=    document.getElementById('loadingImage7').style.visibility == 'visible'? 'hidden' : 'visible';
}

function showImage8(){
    document.getElementById('loadingImage8').style.visibility=    document.getElementById('loadingImage8').style.visibility == 'visible'? 'hidden' : 'visible';
}
function showImage9(){
    document.getElementById('loadingImage9').style.visibility=    document.getElementById('loadingImage9').style.visibility == 'visible'? 'hidden' : 'visible';
}

function showImage10(){
    document.getElementById('loadingImage10').style.visibility=    document.getElementById('loadingImage10').style.visibility == 'visible'? 'hidden' : 'visible';
}


function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}
function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
  var origThing = document.getElementById(data);
  var newThing = origThing.cloneNode(true);
    ev.target.appendChild(newThing);
}


// function allowDropThis(i) {
//     i.preventDefault();
// }

// function dragThis(i) {
//     i.dataTransfer.setData("text", i.target.id);
// }

// function dropThis(i) {
//     i.preventDefault();
//     var data = i.dataTransfer.getData("text");
//     i.target.appendChild(document.getElementById(data));
// }

function toggleSidebar(){
    document.getElementById("sidebar").classList.toggle('active');
  }


// Variables for referencing the canvas and 2dcanvas context
var canvas,ctx;

// Variables to keep track of the mouse position and left-button status 
var mouseX,mouseY,mouseDown=0;

// Variables to keep track of the touch position
var touchX,touchY;

// Keep track of the old/last position when drawing a line
// We set it to -1 at the start to indicate that we don't have a good value for it yet
var lastX,lastY=-1;
var hue=0;

// Draws a line between the specified position on the supplied canvas name
// Parameters are: A canvas context, the x position, the y position, the size of the dot
function drawLine(ctx,x,y,size) {
   
    // If lastX is not set, set lastX and lastY to the current position 
    if (lastX==-1) {
        lastX=x;
    lastY=y;
    }

    // Let's use black by setting RGB values to 0, and 255 alpha (completely opaque)
    // r=0; g=0; b=0; a=255;
    sat=100; lum=50; a=255;

    // Select a fill style
    ctx.strokeStyle = "hsla("+hue+","+sat+"%,"+lum+"%,"+(a/255)+")";
    // "rgba("+r+","+g+","+b+","+(a/255)+")";
    // ctx.fillStyle = "hsla("+hue+","+sat+"%,"+lum+"%,"+(a/255)+")";



    // Set the line "cap" style to round, so lines at different angles can join into each other
    ctx.lineCap = "round";
    //ctx.lineJoin = "round";


    // Draw a filled line
    ctx.beginPath();

// First, move to the old (previous) position
ctx.moveTo(lastX,lastY);

// Now draw a line to the current touch/pointer position
ctx.lineTo(x,y);

    // Set the line thickness and draw the line
    ctx.lineWidth = size;
    ctx.stroke();

    ctx.closePath();

// Update the hue - increase the "2" value here for a faster cycle through the different colours
hue+=2;

// Go back to the first hue if we've reached the end of the hue range
if (hue>360) 
    hue=0;
// Update the last position to reference the current position
lastX=x;
lastY=y;
} 


// Clear the canvas context using the canvas width and height
var canvas = document.getElementById('sketchpad');
var ctx = canvas.getContext('2d');
const shakeButton = document.querySelector(`.shake`);
function clearCanvas(canvas,ctx) {
    canvas.classList.add('shake');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.addEventListener('animationend',
    ()=> {
   canvas.classList.remove('shake');
   },
   {once: true} // auto removes the listener when it's done
);
 
    
}
shakeButton.addEventListener('click', clearCanvas);
// Keep track of the mouse button being pressed and draw a dot at current location
function sketchpad_mouseDown() {
    mouseDown=1;
    drawLine(ctx,mouseX,mouseY,12);
}

// Keep track of the mouse button being released
function sketchpad_mouseUp() {
    mouseDown=0;

    // Reset lastX and lastY to -1 to indicate that they are now invalid, since we have lifted the "pen"
    lastX=-1;
    lastY=-1;
}

// Keep track of the mouse position and draw a dot if mouse button is currently pressed
function sketchpad_mouseMove(e) { 
    // Update the mouse co-ordinates when moved
    getMousePos(e);

    // Draw a dot if the mouse button is currently being pressed
    if (mouseDown==1) {
        drawLine(ctx,mouseX,mouseY,12);
    }
}

// Get the current mouse position relative to the top-left of the canvas
function getMousePos(e) {
    if (!e)
        var e = event;

    if (e.offsetX) {
        mouseX = e.offsetX;
        mouseY = e.offsetY;
    }
    else if (e.layerX) {
        mouseX = e.layerX;
        mouseY = e.layerY;
    }
 }

// Draw something when a touch start is detected
function sketchpad_touchStart() {
    // Update the touch co-ordinates
    getTouchPos();

    drawLine(ctx,touchX,touchY,12);

    // Prevents an additional mousedown event being triggered
    event.preventDefault();
}

function sketchpad_touchEnd() {
    // Reset lastX and lastY to -1 to indicate that they are now invalid, since we have lifted the "pen"
    lastX=-1;
    lastY=-1;
}

// Draw something and prevent the default scrolling when touch movement is detected
function sketchpad_touchMove(e) { 
    // Update the touch co-ordinates
    getTouchPos(e);

    // During a touchmove event, unlike a mousemove event, we don't need to check if the touch is engaged, since there will always be contact with the screen by definition.
    drawLine(ctx,touchX,touchY,12); 

    // Prevent a scrolling action as a result of this touchmove triggering.
    event.preventDefault();
}

// Get the touch position relative to the top-left of the canvas
// When we get the raw values of pageX and pageY below, they take into account the scrolling on the page
// but not the position relative to our target div. We'll adjust them using "target.offsetLeft" and
// "target.offsetTop" to get the correct values in relation to the top left of the canvas.
function getTouchPos(e) {
    if (!e)
        var e = event;

    if(e.touches) {
        if (e.touches.length == 1) { // Only deal with one finger
            var touch = e.touches[0]; // Get the information for finger #1
            touchX=touch.pageX-touch.target.offsetLeft;
            touchY=touch.pageY-touch.target.offsetTop;
        }
    }
}


// Set-up the canvas and add our event handlers after the page has loaded
function init() {
    // Get the specific canvas element from the HTML document
    canvas = document.getElementById('sketchpad');

    // If the browser supports the canvas tag, get the 2d drawing context for this canvas
    if (canvas.getContext)
        ctx = canvas.getContext('2d');

    // Check that we have a valid context to draw on/with before adding event handlers
    if (ctx) {
        // React to mouse events on the canvas, and mouseup on the entire document
        canvas.addEventListener('mousedown', sketchpad_mouseDown, false);
        canvas.addEventListener('mousemove', sketchpad_mouseMove, false);
        window.addEventListener('mouseup', sketchpad_mouseUp, false);

        // React to touch events on the canvas
        canvas.addEventListener('touchstart', sketchpad_touchStart, false);
        canvas.addEventListener('touchend', sketchpad_touchEnd, false);
        canvas.addEventListener('touchmove', sketchpad_touchMove, false);
    }
}
function myStatement0(){
    document.getElementById('code1-0').innerHTML="4{";
    document.getElementById('code1-0').style.color="OrangeRed";
    document.getElementById('code1-0').style.fontSize="20pt";
}

function removeStatement0(){
    document.getElementById('code1-0').innerHTML="number";
    document.getElementById('code1-0').style.color="black";
    document.getElementById('code1-0').style.fontSize="12pt";
}
function myStatement(){
    document.getElementById('code1-1').innerHTML="else if";
    document.getElementById('code1-1').style.color="magenta";
}

function removeStatement(){
    document.getElementById('code1-1').innerHTML="if";
    document.getElementById('code1-1').style.color="yellow";
}

function firstCommand(){
    document.getElementById('code1-2').innerHTML="moveForward()";
    document.getElementById('code1-2').style.color="black";
    document.getElementById('code1-2').style.backgroundColor="lime";
    document.getElementById('code1-2').style.border="2px black solid";
}

function removeFirst(){
    document.getElementById('code1-2').innerHTML="Command";
    document.getElementById('code1-2').style.backgroundColor="dimgray";
    document.getElementById('code1-2').style.color="yellow";
    document.getElementById('code1-2').style.border="2px yellow solid";

}
function secondCommand(){
    document.getElementById('code1-3').innerHTML="moveForward()";
    document.getElementById('code1-3').style.backgroundColor="lime";
    document.getElementById('code1-3').style.border="2px black solid";
    document.getElementById('code1-3').style.color="black";
}

function removeSecond(){
    document.getElementById('code1-3').innerHTML="Command";
    document.getElementById('code1-3').style.backgroundColor="dimgray";
    document.getElementById('code1-3').style.color="yellow";
    document.getElementById('code1-3').style.border="2px yellow solid";
}
function thirdCommand(){
    document.getElementById('code1-4').innerHTML="turnLeft()";
    document.getElementById('code1-4').style.backgroundColor="#8A2BE2";
    document.getElementById('code1-4').style.border="2px black solid";
    document.getElementById('code1-4').style.color="black";
}

function removeThird(){
    document.getElementById('code1-4').innerHTML="Command";
    document.getElementById('code1-4').style.backgroundColor="dimgray";
    document.getElementById('code1-4').style.color="yellow";
    document.getElementById('code1-4').style.border="2px yellow solid";
}
function myStatementTwo(){
    document.getElementById('code1-4').innerHTML="moveForward()";
    document.getElementById('code1-4').style.backgroundColor="lime";
    document.getElementById('code1-4').style.border="2px black solid";
    document.getElementById('code1-4').style.color="black";
}

function removeStatementTwo(){
    document.getElementById('code2-1').innerHTML="if";
    document.getElementById('code2-1').style.color="yellow";
}

function firstCommandTwo(){
    document.getElementById('code2-2').innerHTML="moveForward()";
    document.getElementById('code2-2').style.backgroundColor="lime";
    document.getElementById('code2-2').style.border="2px black solid";
    document.getElementById('code2-2').style.color="black";
}

function removeFirstTwo(){
    document.getElementById('code2-2').innerHTML="Command";
    document.getElementById('code2-2').style.backgroundColor="dimgray";
    document.getElementById('code2-2').style.color="yellow";
    document.getElementById('code2-2').style.border="2px yellow solid";
}
function secondCommandTwo(){
    document.getElementById('code2-3').innerHTML="collectGem()";
    document.getElementById('code2-3').style.backgroundColor="red";
    document.getElementById('code2-3').style.border="2px black solid";
    document.getElementById('code2-3').style.color="black"; 
}

function removeSecondTwo(){
    document.getElementById('code2-3').innerHTML="Command";
    document.getElementById('code2-3').style.backgroundColor="dimgray";
    document.getElementById('code2-3').style.color="yellow";
    document.getElementById('code2-3').style.border="2px yellow solid";
}
function myStatementThree(){
    document.getElementById('code3-1').innerHTML="isOnClosedSwitch{";
    document.getElementById('code3-1').style.color="blue";
}

function removeStatementThree(){
    document.getElementById('code3-1').innerHTML="Condition";
    document.getElementById('code3-1').style.color="black";
}

function firstCommandThree(){
    document.getElementById('code3-2').innerHTML="toggleSwitch()";
    document.getElementById('code3-2').style.backgroundColor="aqua";
}

function removeFirstThree(){
    document.getElementById('code3-2').innerHTML="Command";
    document.getElementById('code3-2').style.backgroundColor="white";
}
function secondCommandThree(){
    document.getElementById('code3-3').innerHTML="moveForward()";
    document.getElementById('code3-3').style.backgroundColor="red";
}

function removeSecondThree(){
    document.getElementById('code3-3').innerHTML="Command";
    document.getElementById('code3-3').style.backgroundColor="white";
}

function thirdCommandTwo(){
    document.getElementById('code2-4').innerHTML="moveForward()";
    document.getElementById('code2-4').style.backgroundColor="lime";
    document.getElementById('code2-4').style.color="black";
    document.getElementById('code2-4').style.border="2px black solid";
}

function removeThirdTwo(){
    document.getElementById('code2-4').innerHTML="Command";
    document.getElementById('code2-4').style.backgroundColor="dimgray";
    document.getElementById('code2-4').style.color="yellow";
    document.getElementById('code2-4').style.border="2px yellow solid";
}
function fourthCommandTwo(){
    document.getElementById('code2-5').innerHTML="toggleSwitch()";
    document.getElementById('code2-5').style.backgroundColor="aqua";
    document.getElementById('code2-5').style.color="black";
    document.getElementById('code2-5').style.border="2px black solid";
}

function removeFourthTwo(){
    document.getElementById('code2-5').innerHTML="Command";
    document.getElementById('code2-5').style.backgroundColor="dimgray";
    document.getElementById('code2-5').style.color="yellow";
    document.getElementById('code2-5').style.border="2px yellow solid";
}

// Drag and Drop Boxes
function firstBox(){

    document.getElementById('col2').style.backgroundColor="black";
    document.getElementById('col2').style.border="2px solid yellow";

}
function removeFirstBox(){
    document.getElementById('col2').style.backgroundColor="white";
    document.getElementById('col2').style.border="2px solid black";
}

function secondBox(){

    document.getElementById('col3').style.backgroundColor="black";
    document.getElementById('col3').style.border="2px solid yellow";

}
function removeSecondBox(){
    document.getElementById('col3').style.backgroundColor="white";
    document.getElementById('col3').style.border="2px solid black";
}

function thirdBox(){

    document.getElementById('col4').style.backgroundColor="black";
    document.getElementById('col4').style.border="2px solid yellow";

}
function removeThirdBox(){
    document.getElementById('col4').style.backgroundColor="white";
    document.getElementById('col4').style.border="2px solid black";
}

function fourthBox(){

    document.getElementById('col5').style.backgroundColor="black";
    document.getElementById('col5').style.border="2px solid yellow";

}
function removeFourthBox(){
    document.getElementById('col5').style.backgroundColor="white";
    document.getElementById('col5').style.border="2px solid black";
}

function fifthBox(){

    document.getElementById('col6').style.backgroundColor="black";
    document.getElementById('col6').style.border="2px solid yellow";

}
function removeFifthBox(){
    document.getElementById('col6').style.backgroundColor="white";
    document.getElementById('col6').style.border="2px solid black";
}

function sixthBox(){

    document.getElementById('col7').style.backgroundColor="black";
    document.getElementById('col7').style.border="2px solid yellow";

}
function removeSixthBox(){
    document.getElementById('col7').style.backgroundColor="white";
    document.getElementById('col7').style.border="2px solid black";
}

function seventhBox(){

    document.getElementById('col8').style.backgroundColor="black";
    document.getElementById('col8').style.border="2px solid yellow";

}
function removeSeventhBox(){
    document.getElementById('col8').style.backgroundColor="white";
    document.getElementById('col8').style.border="2px solid black";
}

// function changeBackRed(){
//     document.getElementById('red').src='img/red-gem.png';
// }
function changePortals(){
    document.getElementById('red2').src='img/closed-sp.png';
    document.getElementById('red3').src='img/closed-sp.png';
}
// function changeBackPortals(){
//     document.getElementById('red2').src='img/portal-sp.png';
//     document.getElementById('red3').src='img/portal-sp.png';
// }
function resetImages(){
    // document.getElementById('loop1').innerHTML="0";
    // document.getElementById('loop1').style.color="lime";
    // document.getElementById('loop2').innerHTML="0";
    // document.getElementById('loop2').style.color="lime";
    // document.getElementById('loop3').innerHTML="0";
    // document.getElementById('loop3').style.color="lime";
    // document.getElementById('loop4').innerHTML="0";
    // document.getElementById('loop4').style.color="lime";
    document.getElementById("red_gem").src = "img/cover-up.png";
    document.getElementById("red2").src = "img/cover-up.png";
    document.getElementById("red3").src = "img/cover-up.png";
    document.getElementById("red4").src = "img/cover-up.png";
    document.getElementById('loop1-img').src='img/sky-cover.png';
    document.getElementById('loop2-img').src='img/sky-cover.png';
    document.getElementById('loop3-img').src='img/sky-cover.png';
    document.getElementById('loop4-img').src='img/sky-cover.png';
}

function addTreasure1(){
    document.getElementById('red_gem').src='img/treasure.png';
    document.getElementById('loop1-img').src='img/collect-red.png';
}
function removeTreasure1(){
    document.getElementById('red_gem').src='img/cover-up.png';
    document.getElementById('loop1-img').src='img/sky-cover.png';
}

function addTreasure2(){
    document.getElementById('red2').src='img/treasure.png';
    document.getElementById('loop2-img').src='img/collect-red.png';
}
function removeTreasure2(){
    document.getElementById('red2').src='img/cover-up.png';
    document.getElementById('loop2-img').src='img/sky-cover.png';
}

function addTreasure3(){
    document.getElementById('red3').src='img/treasure.png';
    document.getElementById('loop3-img').src='img/collect-red.png';
}
function removeTreasure3(){
    document.getElementById('red3').src='img/cover-up.png';
    document.getElementById('loop3-img').src='img/sky-cover.png';
}
function addTreasure4(){
    document.getElementById('red4').src='img/treasure.png';
    document.getElementById('loop4-img').src='img/collect-red.png';
}
function removeTreasure4(){
    document.getElementById('red4').src='img/cover-up.png';
    document.getElementById('loop4-img').src='img/sky-cover.png';
}

function showFunction(){
    document.getElementById('thing8').style.backgroundColor="darkorange";
    document.getElementById('thing8').style.border="2px solid black";
    document.getElementById('thing8').style.innerHTML="collectOrToggle()";
}

function loopCount1(){
    document.getElementById('loop1').innerHTML="1";
    document.getElementById('loop1').style.color="black";
    document.getElementById("red_gem").src = "img/treasure.png";
}
function removeCount1(){
    document.getElementById('loop1').innerHTML="0";
    document.getElementById('loop1').style.color="lime";
    document.getElementById("red_gem").src = "img/cover-up.png";
}

function loopCount2(){
    document.getElementById('loop2').innerHTML="2";
    document.getElementById('loop2').style.color="black";
    document.getElementById("red2").src = "img/treasure.png";
}
function removeCount2(){
    document.getElementById('loop2').innerHTML="0";
    document.getElementById('loop2').style.color="lime";
    document.getElementById("red2").src = "img/cover-up.png";
}

function loopCount3(){
    document.getElementById('loop3').innerHTML="3";
    document.getElementById('loop3').style.color="black";
    document.getElementById("red3").src = "img/treasure.png";
}
function removeCount3(){
    document.getElementById('loop3').innerHTML="0";
    document.getElementById('loop3').style.color="lime";
    document.getElementById("red3").src = "img/cover-up.png";
}

function loopCount4(){
    document.getElementById('loop4').innerHTML="4";
    document.getElementById('loop4').style.color="black";
    document.getElementById("red4").src = "img/treasure.png";
}
function removeCount4(){
    document.getElementById('loop4').innerHTML="0";
    document.getElementById('loop4').style.color="lime";
    document.getElementById("red4").src = "img/cover-up.png";
}
// function showTreasure(){
//     document.getElementById('img-top').src='img/treasure.png';
// }
    // // Variables for referencing the canvas and 2dcanvas context
    // var canvas,ctx;

    // // Variables to keep track of the mouse position and left-button status 
    // var mouseX,mouseY,mouseDown=0;

    // // Variables to keep track of the touch position
    // var touchX,touchY;

    // // Keep track of cycling through different hues each time a dot is drawn
    // var hue=0;

    // // Draws a dot at a specific position on the supplied canvas name
    // // Parameters are: A canvas context, the x position, the y position, the size of the dot
    // function drawDot(ctx,x,y,size) {
	// // Instead of using RGB (red/green/blue) format for the drawing colour, since we're cycling through
	// // hue values, it makes more sense to use HSLA, which is Hue, Saturation, Luminence
	// // We can use fixed values for Saturation, Luminence and alpha, and just use the Hue value from our hue variable.
    //     sat=100; lum=50; a=255;

    //     // Select a fill style
    //     ctx.fillStyle = "hsla("+hue+","+sat+"%,"+lum+"%,"+(a/255)+")";

    //     // Draw a filled circle
    //     ctx.beginPath();
    //     ctx.arc(x, y, size, 0, Math.PI*2, true); 
    //     ctx.closePath();
    //     ctx.fill();

	// // Update the hue - increase the "2" value here for a faster cycle through the different colours
	// hue+=2;

	// // Go back to the first hue if we've reached the end of the hue range
	// if (hue>360) 
	//  hue=0;
    // } 

    // // Clear the canvas context using the canvas width and height
    // function clearCanvas(canvas,ctx) {
    //     ctx.clearRect(0, 0, canvas.width, canvas.height);
    // }

    // // Keep track of the mouse button being pressed and draw a dot at current location
    // function sketchpad_mouseDown() {
    //     mouseDown=1;
    //     drawDot(ctx,mouseX,mouseY,10);
    // }

    // // Keep track of the mouse button being released
    // function sketchpad_mouseUp() {
    //     mouseDown=0;
    // }

    // // Keep track of the mouse position and draw a dot if mouse button is currently pressed
    // function sketchpad_mouseMove(e) { 
    //     // Update the mouse co-ordinates when moved
    //     getMousePos(e);

    //     // Draw a dot if the mouse button is currently being pressed
    //     if (mouseDown==1) {
    //         drawDot(ctx,mouseX,mouseY,10);
    //     }
    // }

    // // Get the current mouse position relative to the top-left of the canvas
    // function getMousePos(e) {
    //     if (!e)
    //         var e = event;

    //     if (e.offsetX) {
    //         mouseX = e.offsetX;
    //         mouseY = e.offsetY;
    //     }
    //     else if (e.layerX) {
    //         mouseX = e.layerX;
    //         mouseY = e.layerY;
    //     }
    //  }

    // // Draw something when a touch start is detected
    // function sketchpad_touchStart() {
    //     // Update the touch co-ordinates
    //     getTouchPos();

    //     drawDot(ctx,touchX,touchY,10);

    //     // Prevents an additional mousedown event being triggered
    //     event.preventDefault();
    // }

    // // Draw something and prevent the default scrolling when touch movement is detected
    // function sketchpad_touchMove(e) { 
    //     // Update the touch co-ordinates
    //     getTouchPos(e);

    //     // During a touchmove event, unlike a mousemove event, we don't need to check if the touch is engaged, since there will always be contact with the screen by definition.
    //     drawDot(ctx,touchX,touchY,10); 

    //     // Prevent a scrolling action as a result of this touchmove triggering.
    //     event.preventDefault();
    // }

    // // Get the touch position relative to the top-left of the canvas
    // // When we get the raw values of pageX and pageY below, they take into account the scrolling on the page
    // // but not the position relative to our target div. We'll adjust them using "target.offsetLeft" and
    // // "target.offsetTop" to get the correct values in relation to the top left of the canvas.
    // function getTouchPos(e) {
    //     if (!e)
    //         var e = event;

    //     if(e.touches) {
    //         if (e.touches.length == 1) { // Only deal with one finger
    //             var touch = e.touches[0]; // Get the information for finger #1
    //             touchX=touch.pageX-touch.target.offsetLeft;
    //             touchY=touch.pageY-touch.target.offsetTop;
    //         }
    //     }
    // }


    // // Set-up the canvas and add our event handlers after the page has loaded
    // function init() {
    //     // Get the specific canvas element from the HTML document
    //     canvas = document.getElementById('sketchpad');

    //     // If the browser supports the canvas tag, get the 2d drawing context for this canvas
    //     if (canvas.getContext)
    //         ctx = canvas.getContext('2d');

    //     // Check that we have a valid context to draw on/with before adding event handlers
    //     if (ctx) {
    //         // React to mouse events on the canvas, and mouseup on the entire document
    //         canvas.addEventListener('mousedown', sketchpad_mouseDown, false);
    //         canvas.addEventListener('mousemove', sketchpad_mouseMove, false);
    //         window.addEventListener('mouseup', sketchpad_mouseUp, false);

    //         // React to touch events on the canvas
    //         canvas.addEventListener('touchstart', sketchpad_touchStart, false);
    //         canvas.addEventListener('touchmove', sketchpad_touchMove, false);
    //     }
    // }