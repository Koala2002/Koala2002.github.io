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


//更換新的頁面//
skillElements=document.getElementsByClassName('skill');

for(let a=0;a<skillElements.length;a++) {
    skillElements[a].addEventListener('click', function() {
        let titleName=this.parentElement.id;//類型名稱
        let skillName=this.innerHTML;//小主題名稱
    
        fetch('../SkillTree/'+titleName+'/'+skillName+'.html')//抓取內容檔案
            .then(response => response.text())
            .then(htmlString => {document.getElementById('MainContentID').innerHTML = htmlString;})
            .then(()=>{       
                CopyButtonListenerAdd();
                BlockMouseListenerAdd();      
            })
            .then(()=>{
                fetch('./JS/CPP_SyntaxHighlight.js')
                .then(response => response.text())
                .then(scriptCode => {
                    eval(scriptCode);
                });
            });
        
    });
}
//更換新的頁面//

