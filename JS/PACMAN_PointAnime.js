let points=document.getElementsByClassName('PACMAN_Point');

function anime(){
    let t=600;
    for(let a=0;a<points.length;a++){
        setTimeout(()=>{
            points[a].style['opacity']='0';
        },t);
        t+=600;
    
        setTimeout(()=>{
            points[a].style['opacity']='1';
        },t+1000);
    }

    t+=2100;

    for(let a=points.length-1;a>=0;a--){
        setTimeout(()=>{
            points[a].style['opacity']='0';
        },t);
        t+=600;
    
        setTimeout(()=>{
            points[a].style['opacity']='1';
        },t+1000);
    }
}

window.onload=()=>{
    anime();
    setInterval("anime()",15000);
}



