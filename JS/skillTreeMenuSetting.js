let menulists=document.getElementsByClassName("skillType");

console.log(menulists);

for(let a=0;a<menulists.length;a++){
    let delta=menulists[a].getElementsByClassName("skill").length;
    let css = '.skillType:nth-child('+(a+1)+'):hover ~ .skillType{top: +'+(4.4296875*delta)+'vh;}';
    let style = document.createElement('style');

    style.appendChild(document.createTextNode(css));

    menulists[a].appendChild(style);
    if(a==menulists.length-1)menulists[a].style.height = '0';
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


//testing//
skillElements=document.getElementsByClassName('skill');

for(let a=0;a<skillElements.length;a++) {
    skillElements[a].addEventListener('click', function() {
        let titleName=this.parentElement.id;//類型名稱
        let skillName=this.innerHTML;//小主題名稱
        console.log(skillName);
        //console.log(document.getElementById('MainContentID').innerHTML);
    
        fetch('../SkillTree/'+titleName+'/'+skillName+'.html')
            .then(response => response.text())
            .then(htmlString => {
                document.getElementById('MainContentID').innerHTML = htmlString;
                fetch('./JS/CPP_SyntaxHighlight.js')
                    .then(response => response.text())
                    .then(scriptCode => {eval(scriptCode);});
            });
    });
}
//testing//

