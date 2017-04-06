/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-04-06 23:28:20
 * @version $Id$
 */
var mesh = document.getElementById("mesh");
var lastUpdate = 0;
var rotateX = rotateY = lastRotateX = lastRotateY = 0;
var lastX = lastY = 0;

document.addEventListener('touchstart',touch,false);
document.addEventListener('touchmove',touch,false);
document.addEventListener('touchend',touch,false); 

function touch (event){
    var event = event || window.event;
    switch(event.type){
        case "touchstart":
        	lastX = event.changedTouches[0].clientX;
        	lastRotateY = rotateY;
        	lastY = event.changedTouches[0].clientY;
        	lastRotateX = rotateX;
            break;
        case "touchend":
        	lastX = event.changedTouches[0].clientX;
        	lastRotateY = rotateY;
        	lastY = event.changedTouches[0].clientY;
        	lastRotateX = rotateX;
            break;
        case "touchmove":
            touchmove(event);
            break;
    }
}
function touchmove(event){
	var distanceX = event.touches[0].clientX - lastX;
	var distanceY = event.touches[0].clientY - lastY;
    rotateY = lastRotateY - distanceX / 30;
    rotateX = lastRotateX + distanceY / 200;
    if(Math.abs(rotateX) > 60) rotateX = lastRotateX;

    mesh.style.transform = "rotateY(" + rotateY + "deg)";
    mesh.style.webkitTransform = "rotateY(" + rotateY + "deg)";
    mesh.style.mozTransform = "rotateY(" + rotateY + "deg)";
    mesh.style.oTransform = "rotateY(" + rotateY + "deg)";

    mesh.style.transform = "rotateX(" + rotateX + "deg)";
    mesh.style.webkitTransform = "rotateX(" + rotateX + "deg)";
    mesh.style.mozTransform = "rotateX(" + rotateX + "deg)";
    mesh.style.oTransform = "rotateX(" + rotateX + "deg)";

    lastRotateY = rotateY;
    lastRotateX = rotateX;

}