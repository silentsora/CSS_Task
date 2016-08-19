var randomColor = Math.floor(Math.random()*3+1); //颜色随机数
var randomBlock = Math.floor(Math.random()*9+1); //格子随机数
var randomId = "block" + randomBlock.toString(); //动态ID
var changeBlock;
var color;
function colorChange(){
    changeBlock = document.getElementById(randomId);
    if (randomColor==1){
        changeBlock.style.backgroundColor = "red";
        color = "红色"
    }
    else if(randomColor==2){
        changeBlock.style.backgroundColor = "green";
        color = "绿色"
    }
    else{
        changeBlock.style.backgroundColor = "blue";
        color = "蓝色"
    }
    randomColor = Math.floor(Math.random()*3+1);
    randomBlock = Math.floor(Math.random()*9+1);
    randomId = "block" + randomBlock.toString();
    console.log("“格子",randomBlock,"” 变成了 “",color,"”");
}
setInterval("colorChange();",1000);