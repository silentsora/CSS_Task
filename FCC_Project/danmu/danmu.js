var config = {
  syncURL: "https://danmaku-ss.wilddogio.com"
}
wilddog.initializeApp(config);
var ref = wilddog.sync().ref();

function getPosition(){
  return Math.floor(Math.random()*360);
};
function getColor(){
  var i=Math.floor(Math.random()*5);
  switch(i){
    case 0:
      return 'red';
      break;
    case 1:
      return 'blue';
      break;
    case 2:
      return 'green';
      break;
    case 3:
      return 'orange';
      break;
    case 4:
      return 'gray';
      break;
  }
};
function shootDanmu(snap){
  console.log("shoot");
  var randomPosition = getPosition();
  var randomColor = getColor();
  var randomDanmuStyle = 
    "color:" 
    + randomColor 
    + ";top:" 
    + randomPosition 
    + "px;";
  console.log(randomDanmuStyle);
  var newDanmu = document.createElement("p");
  newDanmu.innerHTML = snap;
  newDanmu.className = "danmu";
  newDanmu.style.cssText = randomDanmuStyle;
  document.getElementById("blank").appendChild(newDanmu);
};
function clearDanmu(){
  console.log("clear");
  document.getElementById("blank").innerHTML='';
};
function setDanmu(){
  var danmuText = document.getElementById("danmuInput").value;
  ref.child("danmuBlank").set({
    "content": danmuText
  })
}
document.getElementById("shoot").addEventListener("click",setDanmu);
function getDanmu(){
  wilddog.sync().ref("danmuBlank").on("child_changed",function(snap){
    shootDanmu(snap.val());
  })
}
getDanmu();