let menulists=document.getElementsByClassName("selectionBlock");

console.log(menulists);

for(let a=0;a<menulists.length;a++){
    let delta=menulists[a].getElementsByClassName("selectionItem").length;
    let css = '.selectionBlock:nth-child('+(a+1)+'):hover ~ .selectionBlock{top: +'+(4.4296875*delta)+'vh;}';
    let style = document.createElement('style');

    style.appendChild(document.createTextNode(css));

    menulists[a].appendChild(style);
    if(a==menulists.length-1)menulists[a].style.height = '0';
}

let endJudgement;
let menu=document.getElementById("selectionMenu"),menushadow=document.getElementById("selectionMenushadow");

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
selectionItemElements=document.getElementsByClassName('selectionItem');

for(let a=0;a<selectionItemElements.length;a++) {
    selectionItemElements[a].addEventListener('click', function() {
        let titleName=this.parentElement.id;//類型名稱
        let selectionItemName=this.innerHTML;//小主題名稱
    
        fetch('../SkillTree/'+titleName+'/'+selectionItemName+'.html')//抓取內容檔案
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

//隱藏//
let IndentationButton=document.getElementById('IndentationButton');
let MainContentRegion=document.getElementById('MainContentID'),MainContentRegionShadow=document.getElementById('MainContentShadowID');
let switchOn=true;

IndentationButton.addEventListener('click',() =>{
    if(switchOn){
    
        IndentationButton.style.display="none";
        IndentationButton.style.top="calc(4.5vh + 2.5px)";
        
        setTimeout(() =>{IndentationButton.style.display="inline-block";},900);
        setTimeout(() =>{IndentationButton.style.top="calc(2vh + 2.5px)";},1000);

        menu.style.transitionDelay="0s";
        menushadow.style.transitionDelay="0s";
        MainContentRegion.style.transitionDelay="0.4s";
        MainContentRegionShadow.style.transitionDelay="0.4s";

        menu.style.height="0%";
        menushadow.style.height="0%";
        menu.style.borderRadius="0px";
        menushadow.style.borderRadius="0px";
        menushadow.style.borderTop="0px solid var(--MinorColor)";

        MainContentRegion.style.width="95%";
        MainContentRegionShadow.style.width="95%";
    }
    else{
        IndentationButton.style.display="none";
        IndentationButton.style.top="calc(4.5vh + 2.5px)";
        
        setTimeout(() =>{IndentationButton.style.display="inline-block";},900);
        setTimeout(() =>{IndentationButton.style.top="calc(2vh + 2.5px)";},1000);

        menu.style.transitionDelay="0.4s";
        menushadow.style.transitionDelay="0.4s";
        MainContentRegion.style.transitionDelay="0s";
        MainContentRegionShadow.style.transitionDelay="0s";

        menu.style.height="90%";
        menushadow.style.height="90%";
        menu.style.borderRadius="15px";
        menushadow.style.borderRadius="15px";
        menushadow.style.borderTop="2.5px solid var(--MinorColor)";

        MainContentRegion.style.width="70%";
        MainContentRegionShadow.style.width="70%";
    }
  
    switchOn = !switchOn;
});

//隱藏//