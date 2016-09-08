/**
 * Created by Administrator on 2016/8/31.
 */
var playerNum=14;
function changeNum(){       //滑动条函数
    playerNum=document.getElementById("players").value;
    document.getElementById("number").value=playerNum;
    console.log(playerNum);
}
function inputNum(){        //输入框函数
    playerNum=document.getElementById("number").value;
    document.getElementById("players").value=playerNum;
    console.log(playerNum);
}
changeNum();        //赋予人数输入框初始人数
var job=new Array();        //角色分配数组
var killer=0;       //杀手数量，以下同
var doctor=0;
var police=0;
var sniper=0;
function distribute(){
    job.length=0;       //清空数组
    document.getElementById("content").innerHTML="";    //清空上次分配结果
    for(var i=0;i<playerNum;i++){
        var randomJob=Math.random()*4;
        if(randomJob<1){
            job[i]="杀&emsp;手";
            killer++;
        }
        else{
            if(randomJob<2){
                job[i]="医&emsp;生";
                doctor++;
            }
            else{
                if(randomJob<3){
                    job[i]="警&emsp;察";
                    police++;
                }
                else{
                    job[i]="狙击手";
                    sniper++;
                }
            }
        }
        if(playerNum-i==1) {        //最后一轮
            console.log(job,killer,doctor,police,sniper);   //修改前log
            if (killer==0) {        //没杀手时，以下同类
                job=jobLimit(job,"杀&emsp;手");
                killer++;
            }
            if (doctor==0) {
                job=jobLimit(job,"医&emsp;生");
                doctor++;
            }
            if (police==0) {
                job=jobLimit(job,"警&emsp;察");
                police++;
            }
            if (sniper==0) {
                job=jobLimit(job,"狙击手");
                sniper++;
            }
            console.log(job,killer,doctor,police,sniper);   //修改后log
            killer=0;       //清空
            doctor=0;
            police=0;
            sniper=0;
            var odd=1;      //判断奇偶数行的参数,在下面的输出循环中使用
            for(var k=0;k<job.length;k++) {     //输出角色分配
                var player=document.createElement("span");  //创建span类型的对象
                player.innerHTML=job[k]+" 1 人";       //对象内容
                player.style.cssText="float:left;width:50%;height:0.7rem;line-height:0.7rem;color:gray;font-size:0.26rem;font-family:微软雅黑;";    //修改对象样式
                var element=document.getElementById("content");
                element.appendChild(player);    //对象输出位置
                var Square=document.createElement("div");      //对象左边的小方块
                Square.style.cssText="float:left;width:0.1rem;height:0.1rem;margin: 0.3rem 10px;background-color:orange;"
                if(odd==3||odd==4){     //偶数行的方块为天蓝色
                    Square.style.backgroundColor="deepskyblue";
                    odd++;
                    if(odd==5){     //第五个方块相当于第一个方块
                        odd=1;
                    }
                }
                else{odd++;}
                player.appendChild(Square);
            }
        }
    }
}
function jobLimit(x,y){     //x为角色分配数组，y为缺少的角色
    if(police>1) {      //有多余的警察，可用来填补缺少的角色，以下同
        for (var j = 0; j < playerNum; j++) {
            if(x[j]==="警&emsp;察"){
                x[j]=y;
                police--;
                return x;
            }
        }
    }
    if(doctor>1) {
        for (var j = 0; j < playerNum; j++) {
            if(x[j]==="医&emsp;生"){
                x[j]=y;
                doctor--;
                return x;
            }
        }
    }
    if(sniper>1) {
        for (var j = 0; j < playerNum; j++) {
            if(x[j]==="狙击手"){
                x[j]=y;
                sniper--;
                return x;
            }
        }
    }
    if(killer>1) {
        for (var j = 0; j < playerNum; j++) {
            if(x[j]==="杀&emsp;手"){
                x[j]=y;
                killer--;
                return x;
            }
        }
    }
}
function minus(){
    document.getElementById("players").value--;
    changeNum();
}
function plus(){
    document.getElementById("players").value++;
    changeNum();
}

function next(){        //跳转页面
    if(!job.length){        //未分配角色
        alert("请先分配角色");
    }
    else{
        localStorage.removeItem("winner");      //清楚胜利者
        localStorage.removeItem("action");      //清除行动阶段记录
        localStorage.removeItem("whoKill")      //清除杀人者记录
        localStorage.removeItem("whoBeKill")    //清除被杀者记录
        var temp=localStorage;      //保存数据
        temp.setItem('jobs',JSON.stringify(job)); //转换成JSON规范的字符串
        console.log(temp.jobs);
        location.href="task3-1.html";       //跳转
    }
}