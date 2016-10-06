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
            location.href="#";
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