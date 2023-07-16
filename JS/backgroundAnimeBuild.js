let animebackground=document.getElementById("animebackground");

for(let a=0;a<100;a++){
    let div=document.createElement("div");
    div.className="animeBubble";

    animebackground.appendChild(div);
}

let bubbles=document.getElementsByClassName("animeBubble");

function animeset(){
    for(let a=0;a<100;a++){
        let size=(5+parseInt(Math.random()*100)%10);
        let left=-5+(parseInt(Math.random()*1000)%105);  
        let t1=(1000+parseInt(Math.random()*10000)%4000)/1000;
        let t2=(parseInt(Math.random()*10000)%5000)/1000;
    
        bubbles[a].style['width']=size+"vh";
        bubbles[a].style['height']=size+"vh";
        bubbles[a].style['left']=left+"%";
        bubbles[a].style['animation']="bubbleMove "+t1+"s ease-in-out "+t2+"s infinite";
    }
}

animeset();
setInterval(()=>{
    for(let a=0;a<100;a++){
        let size=(5+parseInt(Math.random()*100)%10);

        let value=parseInt(bubbles[a].style['left'].substring(0,bubbles[a].style['left'].length-1));
        let delta=parseInt(Math.random()*10);
        
        if(parseInt(Math.random()*10)%2&&value-delta>=0)value-=delta;
        else value=(value+delta>=100?value-delta:value+delta);
    

        bubbles[a].style['width']=size+"vh";
        bubbles[a].style['height']=size+"vh";
        
        bubbles[a].style['left']=value+"%";
    }
},5000);
