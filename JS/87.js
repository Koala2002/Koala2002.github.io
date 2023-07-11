let body=document.getElementsByTagName('body');

setInterval(() => {

    body[0].style.backgroundColor = "rgb("+(Math.random()*1000%256)+","+(Math.random()*1000%256)+","+(Math.random()*1000%256)+")";
}, 500);