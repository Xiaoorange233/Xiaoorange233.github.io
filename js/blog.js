function getlist() {
    $.get({
        url: "https://api.github.com/repos/xiaoorange233/xiaoorange233.github.io/issues",
        dataType: "json",
        success: function(data) {
            if (!data.hasOwnProperty('message')) {
				var top ="";
				var body="";
                for (i = 0; i in data; i++) {
                    var label = "";
                    var img = "";
                    for (n = 0; n in data[i].labels; n++) {
                        var label = label + '<span class="badge rounded-pill bg-primary">' + data[i].labels[n].name + '</span> '
                    }
					if(data[i].title.substr(0,4)=="[置顶]"){
						var top = top + '<a href="./blog_body.html?page=' + data[i].number + '" target="_0"><li class="list-group-item"><h4><span style="color:#eb4d4b;">[置顶]</span>' + data[i].title.substr(4) + '</h4><p>'+ data[i].body.split("\n")[0]+'</p>' + label + '</li>';
					}else{
						var body = body +'<a href="./blog_body.html?page=' + data[i].number + '" target="_0"><li class="list-group-item"><h4>' + data[i].title + '</h4><p>'+ data[i].body.split("\n")[0]+'</p>' + label + '</li>';
					}
				}
				$('#list').append(top);
				$('#list').append(body);
            } else {
                alert('系统异常，请重新刷新后再试')
            }
        },
        error: function(data) {
            if (data.status == 403) {
                alert('操作过于频繁，请稍后再试')
            } else if (data.status == 0) {
                alert('无法连接至服务器，请检查网络设置')
            } else if (data.status == 404) {
                alert('系统异常，请稍后再试')
            } else if (data.status == 200) {
                alert('系统异常，请重新刷新后再试')
            } else {
                alert(data.msg)
            }
        }
    })
}

function getbody() {
    if (!getvalue('page')) {
        $("#blog_body").html('<h3>页面载入出错！</h3>')
    } else {
        var pagev = getvalue('page')
    }
    var body = "";
    $.get({
        url: "https://api.github.com/repos/xiaoorange233/xiaoorange233.github.io/issues/" + pagev,
        dataType: "json",
        success: function(data) {
            if (!data.hasOwnProperty('message')) {
                $.post({
                    url: "https://api.github.com/markdown",
                    data: JSON.stringify({
                        'text': data.body
                    }),
                    dataType: "html",
                    success: function(res) {
                        var d = new Date(data.created_at);
                        var ctime = d.getFullYear() + '-' + d.getMonth() + 1 + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
                        var d = new Date(data.updated_at);
                        var ltime = d.getFullYear() + '-' + d.getMonth() + 1 + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
                        var body=res.substr(res.split("\n")[0].length);
						$("#blog_body").html('<h3>' + data.title + '</h3><p>创建时间：' + ctime + '<br>最后修改时间：' + ltime + '</p><hr>' + body)
						return
					},
                    error: function(data) {
                        if (data.status == 403) {
                            alert('操作过于频繁，请稍后再试');
                            $("#blog_body").html('<h3>操作过于频繁，请稍后再试</h3>');
                            return
                        } else if (data.status == 0) {
                            alert('无法连接至服务器，请检查网络设置');
                            $("#blog_body").html('<h3>无法连接至服务器，请检查网络设置</h3>');
                            return
                        } else if (data.status == 404) {
                            alert('系统异常，请稍后再试');
                            $("#blog_body").html('<h3>系统异常，请稍后再试</h3>');
                            return
                        } else if (data.status == 200) {
                            alert('系统异常，请重新刷新后再试');
                            $("#blog_body").html('<h3>系统异常，请重新刷新后再试</h3>');
                            return
                        } else {
                            alert(data.msg);
                            $("#blog_body").html('<p>' + data.msg + '</p>');
                            return
                        }
                    }
                })
            } else {
                $("#blog_body").html('<h3>系统异常，请重新刷新后再试</h3>');
                return
            }
        },
        error: function(data) {
            if (data.status == 403) {
                alert('操作过于频繁，请稍后再试');
                $("#blog_body").html('<h3>操作过于频繁，请稍后再试</h3>');
                return
            } else if (data.status == 0) {
                alert('无法连接至服务器，请检查网络设置');
                $("#blog_body").html('<h3>无法连接至服务器，请检查网络设置</h3>');
                return
            } else if (data.status == 404) {
                $("#blog_body").html('<h3>文章不存在</h3>');
                return
            } else if (data.status == 410) {
                $("#blog_body").html('<h3>文章已被删除</h3>');
                return
            } else if (data.status == 200) {
                alert('系统异常，请重新刷新后再试');
                $("#blog_body").html('<h3>系统异常，请重新刷新后再试</h3>');
                return
            } else {
                alert(data.msg);
                $("#blog_body").html('<p>' + data.msg + '</p>');
                return
            }
        }
    })
}

function getvalue(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1]
        }
    }
    return (false)
}