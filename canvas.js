const canvas = document.getElementById('happyScene');
const ctx = canvas.getContext('2d');
const size = canvas.width/10;

ctx.fillStyle = '#255560';

let x = 0,t=1;
const id = setInterval(() => {
    
    ctx.clearRect(0,0, canvas.width, canvas.height); 


    ctx.beginPath();
    ctx.strokeStyle = '#901030';
    ctx.arc(x+size, 50,size,0,2*Math.PI, false);
    ctx.stroke();
    x += t;

    if (x >= canvas.width-2*size) {
        t=-1;
    }
    else if(x<=0){
        t=1;
    }

}, 1);