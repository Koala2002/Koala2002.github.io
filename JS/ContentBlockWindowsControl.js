let clicked,prePos,textBlocks,codeBlocks;

function addMouseEvent(Blocks){
    for(let a=0;a<Blocks.length;a++){
        Blocks[a].addEventListener('mouseenter',function(event){
            let idx=a;
            if(event.target.className=="codeBlock")idx+=textBlocks.length;
            clicked[idx] = false;
            prePos[idx] = -1;
        });
        Blocks[a].addEventListener('mouseleave',function(event){
            let idx=a;
            if(event.target.className=="codeBlock")idx+=textBlocks.length;
            clicked[idx] = false;
            prePos[idx] = -1;
        });
        Blocks[a].addEventListener('mouseup',function(event){
            let idx=a;
            if(event.target.className=="codeBlock")idx+=textBlocks.length;
            clicked[idx] = false;
            prePos[idx] = -1;
        });

        Blocks[a].addEventListener('mousedown',function(event){
            let idx=a;
            if(event.target.className=="codeBlock")idx+=textBlocks.length;
            clicked[idx] = true;
            prePos[idx] = event.clientX;
        });

        Blocks[a].addEventListener('mousemove',function(event){
            let idx=a,nowPos=event.clientX;
            if(event.target.className=="codeBlock")idx+=textBlocks.length;
            
            if(!clicked[idx])return;

            Blocks[a].scrollLeft+=(-(nowPos-prePos[idx])*1.5);
            prePos[idx]=nowPos;
        });
    }
}

function BlockMouseListenerAdd(){
    textBlocks=document.getElementsByClassName("textBlock");
    codeBlocks=document.getElementsByClassName("codeBlock");

    clicked=new Array(textBlocks.length+codeBlocks.length).fill(false);
    prePos=new Array(textBlocks.length+codeBlocks.length).fill(-1);

    addMouseEvent(textBlocks);
    addMouseEvent(codeBlocks);
}

function CopyButtonListenerAdd(){
    Buttons=document.getElementsByClassName("CodeCopyButton");

    //複製功能按鈕設定
    for(let a=0;a<Buttons.length;a++){
        Buttons[a].innerHTML="C";
        let copyString=Buttons[a].parentNode.children[0].children[1].innerText;
        
        Buttons[a].addEventListener("click",function(event){
            copyElement=document.createElement('textarea');
            copyElement.value=copyString;
            document.body.appendChild(copyElement);
            
            copyElement.select();
            copyElement.setSelectionRange(0, 99999); // For mobile devices


            document.execCommand('copy');
            document.body.removeChild(copyElement);
        });
    }
}