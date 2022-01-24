document.write('<div id="preloader" style="justify-content: center;align-items: center;height: 100vh;display: flex;width: 100%;"><img src="./img/preloader.png" height="64px" alt=""></div>');
document.onreadystatechange = function(){
    if(document.readyState == 'complete'){
        document.getElementById("preloader").style.display="none";
    }
}