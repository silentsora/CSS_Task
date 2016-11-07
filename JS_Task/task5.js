$(document).ready(function(){
    $("#get").click(function(){
        $("#dataList").before("<p>稍等片刻</p>");
        $("#dataList").find("td").remove();
        $.get("/a/students",function(data){
            $("#dataList").prev("p").remove();
            var arr = JSON.parse(data);
            for(x in arr.data){
                switch(arr.data[x].type){
                    case 1:
                        arr.data[x].type="css";
                        break;
                    case 2:
                        arr.data[x].type="js";
                        break;
                    case 3:
                        arr.data[x].type="java";
                        break;
                    case 4:
                        arr.data[x].type="运维";
                        break;
                    case 5:
                        arr.data[x].type="DBA";
                        break;
                    case 6:
                        arr.data[x].type="产品";
                        break;
                    case 7:
                        arr.data[x].type="IOS";
                        break;
                    case 8:
                        arr.data[x].type="安卓";
                        break;
                }
            }
            for(x in arr.data){
                switch(arr.data[x].talent){
                    case 1:
                        arr.data[x].talent="学霸";
                        break;
                    case 2:
                        arr.data[x].talent="学渣";
                        break;
                }
            }
            for(x in arr.data){
                switch(arr.data[x].level){
                    case 1:
                        arr.data[x].level="0基础";
                        break;
                    case 2:
                        arr.data[x].level="3个月以内";
                        break;
                    case 3:
                        arr.data[x].level="6个月以内";
                        break;
                    case 4:
                        arr.data[x].level="1年以内";
                        break;
                    case 5:
                        arr.data[x].level="3年以内";
                        break;
                    case 6:
                        arr.data[x].level="3年以上";
                        break;
                }
            }
            for(x in arr.data){
                var ele = "<tr><td>"
                        + arr.data[x].name
                        + "</td><td>"
                        + arr.data[x].qq
                        + "</td><td>"
                        + arr.data[x].type
                        + "</td><td>"
                        + arr.data[x].school
                        + "</td><td>"
                        + arr.data[x].talent
                        + "</td><td>"
                        + arr.data[x].level
                        + "</td><td>"
                        + arr.data[x].joinTime
                        + "</td></tr>";
                $("#dataList").append(ele);
            }
        });
    });
    $("#submit").click(function(){
        $.ajax({
            url: "/a/student",
            type: "POST",
            dataType: "json",
            data: {
                name: $("input[name=name]").val(),
                qq: $("input[name=qq]").val(),
                type: $("input[name=type]:checked").val(),
                school: $("input[name=school]").val(),
                talent: $("input[name=talent]:checked").val(),
                level: $("input[name=level]:checked").val(),
                joinTime: $("input[name=joinTime]").val(),
                wish: $("input[name=wish]").val()
            },
            success: function (data) {
                console.log(data);
                if(data.code === 200){
                    alert("报名成功");
                }
            },
            error: function (data) {
                console.log(data);
                console.log
                alert("报名失败");
            }
        })
    });
})