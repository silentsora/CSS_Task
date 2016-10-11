/**
 * Created by Administrator on 2016/9/12.
 */
/*var title=[];
var url;
var wd;
var ready=document;
url=document.location.href;
//document.write("script language='javascript' src='jquery-3.1.0.min.js'></script");
$(document).ready(function(){
    if(url=="http://s18.moog.megamiengage.com/shop/summons_lottery_lineup.php?gacha_group_id=234&from=lottery"){
        for(var i=1;i<5;i++){
            url="http://s18.moog.megamiengage.com/shop/summons_lottery_lineup.php?gacha_group_id="+i+"&from=lottery"
            //location.href=url;
            wd=window.open(url);
            //setTimeout(delay(),2000);
            $(wd.document).ready(function(){
                //title[i-1]=$(".lineupVendorTtl").text();
                title[i-1]=wd.document.getElementsByClassName("lineupVendorTtl").innerHTML;
            });
            ready=$(wd.document).ready();
            console.log($(wd.document).ready());
            wd.close();
        }
        console.log(title);
    }
});*/
$(document).ready(function(){

    /*console.log($("input[name=village_id]").val());
    console.log($("input[name=ssid]").val());*/

    $(".bushoList input[type=radio]:first").attr("checked", "true");    //在选卡页面始终选择第一张卡
    $("input[name=btn_preview]").click();   //在选卡页面始终点击下一步
    $("#btn_send").click();     //在发卡页面始终点击发卡

    var step=[];        //存储路径


    if(location.href.match(/village.php\b/)){       //据点管理页面
        var selectBuild=document.createElement("button");
        selectBuild.innerHTML="选取建筑";
        selectBuild.style.marginLeft="90px";
        $("#maps").append(selectBuild);

        var lvupBuild=document.createElement("button");
        lvupBuild.innerHTML="升级建筑";
        $("#maps").append(lvupBuild);

        var delayBuild=document.createElement("input");
        delayBuild.type="text";
        delayBuild.placeholder="刷新时间";
        delayBuild.style.cssText="width:53px;height:20px";
        $("#maps").append(delayBuild);

        var maxBuild=document.createElement("input");
        maxBuild.placeholder="最大等级";
        maxBuild.type="text";
        maxBuild.style.cssText="width:53px;height:20px";
        $("#maps").append(maxBuild);

        $(selectBuild).click(function(){
            var coordinate;
            $("#mapOverlayMap area").each(function(){      //读取所有点的跳转地址并保存
                coordinate = $(this).attr("href");
                $(this).attr("alt", coordinate);
                $(this).attr("href","javascript:void(0);");     //所有点变成不可跳转
            });
            $("#maps").css("opacity","0.5");

            var build=[];
            var buildNumber=0;
            $("#mapOverlayMap area").click(function(){
                build[buildNumber]=$(this).attr("alt");
                console.log(buildNumber,build[buildNumber]);
                var x=getX(build[buildNumber]);
                var y=getY(build[buildNumber]);     //获取建筑坐标
                if(x==null){
                    alert("不能选择非建筑");
                    return;
                }
                var xy=x*7+parseInt(y)+1;       //获取该点图片编号
                if(xy<10){          //一位数时补成二位数
                    xy="0"+xy;
                }
                var mapxy=".map"+xy;
                $(mapxy).css("backgroundColor","orange");
                console.log(x,y,mapxy);
                buildNumber++;
            });
            $(lvupBuild).click(function(){
                if(delayBuild.value){
                    var delay=delayBuild.value;
                    if(delay<3){
                        alert("请输入大于3秒的值")
                        return;
                    }
                }
                else{
                    alert("请输入刷新时间，单位为秒");
                    return;
                }
                if(maxBuild.value){
                    var maxLv=maxBuild.value;
                }
                else{
                    alert("请输入最大等级");
                    return;
                }
                console.log(delay,maxLv);
                var i=0;
                var newWindow;
                function lvup(){
                    if(newWindow){
                        newWindow.close();
                    }
                    if(build.length==0){
                            clearInterval(ini);
                            alert("种地完成");
                            return;
                        }
                    if(i>=build.length){
                        i=0;
                    }
                    newWindow=window.open(build[i]);
                    newWindow.onload=function(){        //存在升级按钮而不存在使用CP升级按钮时才提交表单
                        var ttl=newWindow.document.getElementsByClassName("th_ttl");
                        if(ttl[0].innerHTML.match(maxLv)){      //判断该点是否达到设定等级
                            console.log(ttl[0].innerHTML,"达到设定等级");
                            build.splice(i,1);
                            console.log(build[i]);
                            return;
                        }
                        //console.log(newWindow.document.getElementsByClassName("useCp"));
                        if(newWindow.document.getElementsByClassName("useCp").length){
                            console.log("存在CP升级按钮");
                            return;
                        }
                        //console.log(newWindow.document.forms["facilityLvupForm"]);
                        if(newWindow.document.forms[name="facilityLvupForm"]){
                            newWindow.document.forms['facilityLvupForm'].submit();
                            console.log("存在升级按钮");

                            /*var sessionId;
                            sessoinId=$("input[name=ssid]").val();
                            var villageId;
                            villageId=$("input[name=village_id]").val();
                            console.log(sessionId,villageId);*/
                            /*$.post(
                                "/facility/build.php",
                                {
                                    ssid        : sessionId,
                                    //id          : 215,
                                    x           : x,
                                    y           : y,
                                    village_id  : villageId
                                },
                            );*/
                        }
                        i++;
                    }
                }
                var ini=setInterval(lvup,delay*1000+Math.random()*2333);
            })
        })
    }


    if(location.href.match("big_map.php")){       //51*51大地图页面
        var path=document.createElement("button");
        path.innerHTML="选择路径";
        $("#single-allow-north").append(path);

        var go=document.createElement("button");
        go.innerHTML="开始爬地";
        $("#single-allow-north").append(go);

        var discard=document.createElement("button");
        discard.innerHTML="破弃领地";
        $("#single-allow-north").append(discard);

        $(path).click(function() {      //点击开始选择路径
            var coordinate;
            $("#map51-content a").each(function(){      //读取所有点的跳转地址并保存
                coordinate = $(this).attr("href");
                $(this).attr("alt", coordinate);
                $(this).attr("href","javascript:void(0);");     //所有点变成不可跳转
            });
            $("#map51-content a").css("opacity","0.5");

            var stepNumber=0;
            $("#map51-content a").click(function(){
                step[stepNumber]=$(this).attr("alt");
                stepNumber++;
                console.log(stepNumber,step[stepNumber-1]);
                this.style.backgroundColor="orange";
            });
        });
        $(go).click(function(){     //点击开始爬地
            var rt;
            var i=1;
            var newWindow=window.open(step[0]);
            console.log(i,step[0]);
            newWindow.onload=function(){
                var deploy=newWindow.document.getElementById("deploy_btn").href;
                newWindow.location.href=deploy;
            };
            function loop(){
                if(i>=step.length){
                    alert("爬地结束");
                    clearInterval(check);
                    clearInterval(ini);
                    return;
                }
                if(rt){
                    newWindow.close();
                    newWindow=window.open(step[i]);
                    newWindow.onload=function(){
                        var deploy=newWindow.document.getElementById("deploy_btn").href;
                        newWindow.location.href=deploy;
                    };
                    i++;
                    console.log(i,step[i-1]);
                }
                else{
                    console.log("checkZero")
                    return;
                }
            }
            var check=setInterval(checkCard,11111+(Math.random()-0.5)*2000);
            var ini=setInterval(loop,22222+(Math.random()-0.5)*2000);        //循环发卡，20秒一次
            function checkCard(){       //判断是否有卡可用
                var cardList=window.open("card/domestic_setting.php");
                cardList.onload=function(){
                    console.log($(cardList.document).find("[id^='card_radio']:enabled").length);
                    if($(cardList.document).find("[id^='card_radio']:enabled").length>0){
                        cardList.close();
                        rt=1;
                    }
                    else{
                        cardList.close();
                        rt=0;
                    }
                }
            }
        });
        $(discard).click(function(){        //点击开始破地
            var x;
            var y;
            var i=0;
            function discardLoop(){
                if(i>=step.length){
                    clearInterval(ini);
                    alert("破弃完成");
                    return;
                }
                if(i>0){
                    newWindow.close();
                }
                x=getX(step[i]);
                y=getY(step[i]);
                var url="./territory_proc.php?x="+x+"&y="+y+"&mode=remove";
                newWindow=window.open(url);
                i++;
                console.log("NO.",i,"x:",x,"y:",y);
                console.log("url:",url);
            }
            var ini=setInterval(discardLoop,2333+(Math.random()-0.5)*1000);
        });
    }
    function getX(str){     //提取x坐标
                    value=str.match(/\-?\d+(?=\&)/ig);
                    return value;
                }
    function getY(str){     //提取y坐标
        value=str.match(/\-?\d+(?=\#)/ig);
        return value;
    }
});

