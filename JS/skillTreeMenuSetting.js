let menulists=document.getElementsByClassName("skillType");

for(let a=0;a<menulists.length;a++){
    let delta=menulists[a].getElementsByClassName("skill").length;
    let css = '.skillType:nth-child('+(a+1)+'):hover ~ .skillType{top: +'+(4.4296875*delta)+'vh;}';
    let style = document.createElement('style');

    style.appendChild(document.createTextNode(css));

    menulists[a].appendChild(style);
}

let endJudgement;
let menu=document.getElementById("skillMenu");

menu.addEventListener("scroll",()=>{
    clearTimeout(endJudgement);
    endJudgement=setTimeout(()=>{
        for(let a=0;a<menulists.length;a++) {
            menulists[a].style['pointerEvents'] = 'visible';
        }
    },50);

    for(let a=0;a<menulists.length;a++) menulists[a].style['pointerEvents'] = 'none';
});