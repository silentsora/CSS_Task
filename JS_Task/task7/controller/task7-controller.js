app.controller("inputCtrl",function($scope,data){
    $scope.number=12;
    $scope.players=[];
    $scope.plus=function(){
        $scope.number++;
    };
    $scope.minus=function(){
        $scope.number--;
    };
    $scope.distribute=function(){
        console.log($scope.number);
        var str=$scope.number.toString();
        if(!str.match(/^[6-9]$|^1[0-8]$/)){     //输入验证
            alert("请输入6-18之间的整数");
            return;
        }
        $scope.players=[];
        for(var i=0;i<$scope.number;i++){
            $scope.players.push({job:"水民",color:'orange'});
        }
        switch (parseInt($scope.number)){
            case 6:case 7:case 8:   //只有一个杀手
                $scope.players.splice(0,1,{job:"杀手",color:'orange'});
                break;
            case 9:case 10:case 11:     //有两个杀手
                $scope.players.splice(0,2,{job:"杀手",color:'orange'},{job:"杀手",color:'orange'});
                break;
            case 12:case 13:case 14:case 15:    //有三个杀手
                $scope.players.splice(0,3,{job:"杀手",color:'orange'},{job:"杀手",color:'orange'},{job:"杀手",color:'orange'});
                break;
            case 16:case 17:case 18:    //有四个杀手
                $scope.players.splice(0,4,{job:"杀手",color:'orange'},{job:"杀手",color:'orange'},{job:"杀手",color:'orange'},{job:"杀手",color:'orange'});
                break;
        }
        function shuffle(array){    //数组乱序
            var arrTemp=array.concat();
            for(var i=arrTemp.length;i--;){
                var random=Math.floor(Math.random()*(i+1));
                var temp=arrTemp[i];
                arrTemp[i]=arrTemp[random];
                arrTemp[random]=temp;
            }
            return arrTemp;
        }
        $scope.players=shuffle($scope.players);
        for(var i=0;i<$scope.number;i++){       //将偶数行的方块改为蓝色
            if(i%4==2|i%4==3){
                $scope.players[i].color="blue";
            }
            console.log($scope.players[i]);
        }
    }
    $scope.next=function(){
        if($scope.players.length>0){
            data.setPlayers($scope.players);    //存储角色分配
            location.href="#/card";
        }
        else alert("请先分配角色");
    }
});
app.controller("cardCtrl",function($scope,data){
    $scope.players=[];
    $scope.players=data.getPlayers();
    console.log($scope.players);

    $scope.nowNum=1;   //目前的序号
    var page=$scope.players.length*2;  //页数
    $scope.openCard=function(){
        console.log($scope.nowNum);
        if(page==1){      //到达尾页
            location.href="#/list";
            return;
        }
        if (page % 2) {     //奇数页
            $scope.nowNum++;
            document.getElementById("submit").innerHTML = "查看"+($scope.nowNum)+"号身份";
            document.getElementById("char").src = "img-js-task2/open.png";
            document.getElementById("charType").innerHTML = "";
            page--;
        }
        else{       //偶数页
            if(page==2){
                document.getElementById("submit").innerHTML = "查看法官日记";
            }
            else{
                document.getElementById("submit").innerHTML = "隐藏并传递给" + ($scope.nowNum+1) + "号";
            }
            document.getElementById("char").src = "img-js-task2/char.png";
            document.getElementById("charType").innerHTML = "角色:" + $scope.players[$scope.nowNum - 1].job;
            page--;
        }
    }
});
app.controller("listCtrl",function($scope,data){
    var winner; //存储胜者
    $scope.players=data.getPlayers();
    console.log($scope.players);
    for(var i=0;i<$scope.players.length;i++){
        var card=document.createElement("div");
        card.style.cssText="width:20%;height:20vw;max-height:128px;border:0.06rem solid white;float:left;margin:0.3rem calc(6.6% - 0.06rem);text-align:center;background-color:rgb(245,201,123);position:relative;";
        var number=document.createElement("span");
        number.style.cssText="width:100%;height:0.36rem;line-height:0.36rem;background-color:rgb(131,176,154);text-align:center;font-size:0.28rem;color:white;position:absolute;left:0;bottom:0;";
        var char=document.createElement("span");
        char.style.cssText="font-size:0.32rem;position:relative;top:0.3rem;";
        var father=document.getElementById("cardList");
        father.appendChild(card);
        char.innerHTML=$scope.players[i].job;
        card.appendChild(char);
        number.innerHTML=(i+1)+"号";
        card.appendChild(number);
        console.log($scope.players[i]);
        //以下创建radio元素
        var select=document.createElement("input");
        select.style.display="none";
        select.type="radio";
        select.name="select";
        select.id="option"+i;
        card.id="card"+i;
        var label=document.createElement("label");
        label.htmlFor="option"+i;
        father.appendChild(select);
        father.appendChild(label);
        label.appendChild(card);
        document.getElementById("option"+i).onclick=selectHim;  //给radio添加点击触发事件
    }
    var action=new Array;       //action为行动阶段参数
    if(data.getAction()){     //如果有行动阶段参数，则读取，没有意味着目前是法官查看身份阶段
        action=data.getAction();
    }
    console.log(action,action.length,action[action.length-1]);
    $scope.start=function(){
        if(action.length==0){       //未进入行动阶段=接下来开始游戏
            var date=new Date();
            var time=date.getTime();
            data.setBeginTime(time);
            location.href="#/schedule";
        }
        else{       //已经进入行动阶段=接下来显示杀人报告
            if(winner=="people"){       //平民胜出
                data.setWinner(winner);
                alert("平民胜利");
            }
            if(winner=="killer"){       //杀手胜出
                data.setWinner(winner);
                alert("杀手胜利");
            }
            location.href="#/report";
        }
    }
    if(action.length!=0){       //行动阶段
        if(action[action.length-1]=="killer"){
            document.getElementById("title").innerHTML="杀手杀人";
            document.getElementById("submit").innerHTML="确定";
        }
        if(action[action.length-1]=="police"){
            document.getElementById("title").innerHTML="警察验人";
            document.getElementById("submit").innerHTML="确定";
        }
        if(action[action.length-1]=="sniper"){
            document.getElementById("title").innerHTML="狙击狙人";
            document.getElementById("submit").innerHTML="确定";
        }
        if(action[action.length-1]=="doctor"){
            document.getElementById("title").innerHTML="医生救人";
            document.getElementById("submit").innerHTML="确定";
        }
        if(action[action.length-1]=="people"){
            document.getElementById("title").innerHTML="投票";
            document.getElementById("submit").innerHTML="投死";
        }
    }
    if(data.getWhoBeKill()) {     //读取已经被杀的人,禁止再次被选择
        var whoBeKill = data.getWhoBeKill();
        console.log(whoBeKill);
        for(var k=0;k<whoBeKill.length;k++){
            document.getElementById("card"+whoBeKill[k]).style.opacity="0.5";
            document.getElementById("option"+whoBeKill[k]).disabled=true;
        }
    }
    function selectHim(){       //每次选择radio都将执行该函数
        if(action.length==0){       //未开始游戏，不能选择杀人
            return;
        }
        var beSelect;
        console.log("单选框状态：");
        for(var j=0;j<i;j++){       //点击一次遍历checked状态，当checked时改变卡片样式
            var checked=new Array();
            checked[j]=document.getElementById("option"+j);
            if(checked[j].checked){
                if(action[action.length-1]=="killer" && $scope.players[j].job=='杀手'){     //杀手不能选择杀手作为杀死对象
                    checked[j].checked=false;
                    alert('杀手不能杀死杀手');
                }
                else{
                    document.getElementById("card"+j).style.opacity="0.5";
                    data.setChecked(j);
                    beSelect=j;
                }
            }
            else{
                if(checked[j].disabled==false){     //不是禁选选项将恢复透明度样式
                    document.getElementById("card"+j).style.opacity="1";
                }
            }
            console.log(j,checked[j].checked);
        }
        function victoryCheck(){        //胜败判定
            var killer=0;   //杀手人数
            var alive=0;    //存活人数
            for(var i=0;i<$scope.players.length;i++){
                console.log(document.getElementById("option"+i).disabled);
                if(document.getElementById("option"+i).disabled==false){
                    if($scope.players[i].job=="杀手"){
                        killer++;
                    }
                    alive++;
                }
            }
            if(killer==1 && $scope.players[beSelect].job=="杀手"){
                winner="people";
                console.log("平民胜出");
            }
            else{
                if(killer==alive-1 && $scope.players[beSelect].job!="杀手"){
                    winner="killer";
                    console.log("杀手胜出");
                }
                else{
                    winner=null;
                }
            }
        }
        victoryCheck();
    }
})
app.controller("scheduleCtrl",function($scope,data){
    var action=new Array;       //action为行动阶段参数
    if(data.getAction()) {
        action=data.getAction();
        console.log(action);
        var day = 1;
        for (var i = 0; i < action.length; i++) {
            if (action[i] == "nextDay") {      //计算目前是第几天
                day++;
            }
        }
        document.getElementById("day").innerHTML = "第 " + day + " 天";
    }
    $scope.kill=function(job){
        if(job=='killer'){      //进入杀手杀人阶段
            if(data.getAction()){
                action.push(job);
            }
            else{
                action[0]=job;  //首次进入杀人阶段
            }
            data.setAction(action);
            location.href="#/list";
        }
        else{
            alert('功能尚未开放');
        }
    }
})
app.controller("reportCtrl",function($scope,data){
    $scope.players=data.getPlayers();
    var action=new Array;
    action=data.getAction();
    var whoKill=new Array;      //存储杀人者的数组
    if(data.getWhoKill()){        //如果有杀人记录则读取
        whoKill=data.getWhoKill();
        console.log("有whoKill存储");
    }
    var whoBeKill=new Array;        //存储被杀者的数组
    if(data.getWhoBeKill()){      //如果有被杀记录则读取
        whoBeKill=data.getWhoBeKill();
        console.log("有whoBeKill存储");
    }
    console.log(data.getChecked());
    whoBeKill.push(parseInt(data.getChecked()));  //将上次选择杀的对象添加到whoBeKill数组里
    console.log(action,whoKill,whoBeKill);
    if(action[action.length-1]=="killer"){
        if(whoKill[whoKill.length-1]!="杀手杀"){       //防止刷新重复杀人
            whoKill.push("杀手杀");
        }
        console.log(whoKill);
    }
    if(action[action.length-1]=="people"){
        if(whoKill[whoKill.length-1]!="投票投"){       //防止刷新重复投人
            whoKill.push("投票投");
        }
        document.getElementById("step1").style.display="none";      //将页面改变成投票的样式
        document.getElementById("step2").style.display="none";
        var day=2;
        for(var j=0;j<action.length;j++){   //计算明天是第几天
            if(action[j]=="nextDay"){
                day++;
            }
        }
        document.getElementById("submit").innerHTML="第 "+day+" 天";
    }
    for(var i=0;i<whoKill.length;i++){       //输出杀人报告
        if(whoKill[i]=="杀手杀"){
            document.getElementById("result").innerHTML=""; //清除非当天的报告
        }
        var decrypt=document.createElement("span");
        decrypt.innerHTML=whoBeKill[i]+1+"号被"+whoKill[i]+"死了,真实身份是"+$scope.players[whoBeKill[i]].job+"<br>";
        document.getElementById("result").appendChild(decrypt);
    }
    data.setWhoKill(whoKill);       //存储杀人数据
    data.setWhoBeKill(whoBeKill);
    $scope.vote=function(){
        if(data.getWinner()){
            location.href="#/result";
            return;
        }
        if(action[action.length-1]=="people"){      //进入下一天
            console.log("下一天开始");
            action.push("nextDay");      //表明接下来是下一天,存储该参数
            data.setAction(action);
            location.href="#/schedule";
        }
        else {
            console.log(action);
            action.push("people");      //表明接下来是投票阶段,存储该参数
            data.setAction(action);
            location.href = "#/list";
        }
    }
    console.log(data.getWinner());
    if(data.getWinner()){
        document.getElementById("submit").innerHTML="游戏结束，查看结果";
    }
})
app.controller("resultCtrl",function($scope,data){
    var winner=data.getWinner();
    var action=data.getAction();
    var whoBeKill=data.getWhoBeKill();
    var whoKill=data.getWhoKill();
    var players=data.getPlayers();
    console.log(winner,action,whoBeKill,whoKill,players);
    var killer=0;
    var police=0;
    var doctor=0;
    var sniper=0;
    var day=1;
    var time=data.getBeginTime();
    var date=new Date();
    var timeOver=date.getTime();
    var timeCost=timeOver-time;
    var hour=Math.floor(timeCost/(60*60*1000));
    var minute=Math.floor((timeCost/(60*1000)));
    var second=Math.floor((timeCost/1000));
    console.log(time,timeOver,timeCost,hour,minute);
    for(var i=0;i<players.length;i++){  //统计每个职业的个数
        switch(players[i].job){
            case "杀手":
                killer++;
                break;
            case "警察":
                police++;
                break;
            case "医生":
                doctor++;
                break;
            case "狙击手":
                sniper++;
                break;
        }
    }
    console.log(killer,police,doctor,sniper);
    var killerPer=killer/players.length*100;  //杀手比例
    for(var i=0;i<action.length;i++){
        if(action[i]=="nextDay"){
            day++;
        }
    }
    console.log(day);
    if(winner=="people"){
        document.getElementById("win").innerHTML="平民胜利";
        document.getElementById("good").innerHTML="本轮游戏共抓出杀手"+killer+"人，共经历了"+day+"天，在杀人游戏中击败了"+killerPer+"%的玩家！";
    }
    if(winner=="killer"){
        document.getElementById("win").innerHTML="卧底胜利";
        document.getElementById("good").innerHTML="太棒了!你知道么？在捉鬼游戏中只有"+"%的卧底取得游戏最终的胜利哦！";
    }
    document.getElementById("time").innerHTML="本次游戏共计用时"+hour+"小时"+minute+"分钟"+second+"秒";
    //document.getElementById("number1").innerHTML="杀手"+killer+"人警察"+police+"人";
    //document.getElementById("number2").innerHTML="狙击手"+sniper+"人医生"+doctor+"人";
    document.getElementById("number1").innerHTML="杀手"+killer+"人 水民"+(players.length-killer)+"人";
    var ul=document.createElement("ul");
    var li=document.createElement("li");
    var report=document.getElementById("report");
    for(var j=1;j<=day;j++){
        ul=document.createElement("ul");
        ul.innerHTML="第"+j+"天";
        report.appendChild(ul);
        li=document.createElement("li");
        li.innerHTML="晚上："+whoBeKill[j*2-2]+"号被"+whoKill[j*2-2]+"死，真实身份是"+players[whoBeKill[j*2-2]].job;
        ul.appendChild(li);
        if(whoBeKill[j*2-1]!=undefined && whoKill[j*2-1]!=undefined){
            li=document.createElement("li");
            li.innerHTML="白天："+whoBeKill[j*2-1]+"号被"+whoKill[j*2-1]+"死，真实身份是"+players[whoBeKill[j*2-1]].job;
            ul.appendChild(li);
        }
    }
})