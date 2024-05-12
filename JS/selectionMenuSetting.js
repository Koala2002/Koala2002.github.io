let menulists=document.getElementsByClassName("selectionBlock");
let itemicons=document.getElementsByClassName("selectionBlockIcon");
console.log(menulists);

var isexpand=new Array();
var listStyle=new Array

for(let a=0;a<menulists.length;a++){

       
    //if(a==menulists.length-1)menulists[a].style.height = '0';
    isexpand[a]=false;
    menulists[a].addEventListener("click",()=>{
        isexpand[a]=!isexpand[a];
        var itemlist=menulists[a].getElementsByClassName("selectionItem");
        if(isexpand[a]){
            itemicons[a].innerHTML="&#11167;";
            for(let a=0;a<itemlist.length;a++){
                //itemlist[a].style["background-color"]="var(--MinorColor50)";
                itemlist[a].style["height"]="75%";
                itemlist[a].style["font-size"]="var(--TextSize)";
                itemlist[a].style["color"]="var(--fontColor)";  
            }   
            
        }
        else{
            itemicons[a].innerHTML="&#11166;";
            for(let a=0;a<itemlist.length;a++){
               // itemlist[a].style["background-color"]="";
                itemlist[a].style["height"]="0%";
                itemlist[a].style["font-size"]="0";
                itemlist[a].style["color"]="var(--fontColor_Transparent)";  
            }
        } 

        var expandcnt=0;
        for(let a=0;a<menulists.length;a++){
            
            try{
                menulists[a].removeChild(listStyle[a]);
            }catch(error){}

            if(isexpand[a])expandcnt+=menulists[a].getElementsByClassName("selectionItem").length;
            
            let newstyle=document.createElement("style");
            css = '.selectionBlock:nth-child('+(a+1)+') ~ .selectionBlock{top: +'+(3.75*expandcnt)+'vh;}';
            newstyle.appendChild(document.createTextNode(css));
            menulists[a].appendChild(newstyle);
            
            listStyle[a]=newstyle;
            
        }
        //console.log(expandcnt);
        
    });
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
    selectionItemElements[a].addEventListener('click', function(e) {
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
        
            e.stopPropagation();
    });
}
//更換新的頁面//

//隱藏//
/*
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

*/
//隱藏//