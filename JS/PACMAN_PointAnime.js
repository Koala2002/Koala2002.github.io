let points=document.getElementsByClassName('PACMAN_Point');

function anime(){
    let t1=600;
    for(let a=0;a<points.length;a++){
        setTimeout(()=>{
            points[a].style['opacity']='0';
        },t1);
        t1+=600;
    
        setTimeout(()=>{
            points[a].style['opacity']='1';
        },t1+1000);
    }

    t1+=2000;

    for(let a=points.length-1;a>=0;a--){
        setTimeout(()=>{
            points[a].style['opacity']='0';
        },t1);
        t1+=600;
    
        setTimeout(()=>{
            points[a].style['opacity']='1';
        },t1+1000);
    }
}


anime();
setInterval("anime()",15000);

