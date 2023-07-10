var list=['Sort', 'Search', 'Str', 'Math', 'DP','OffA','Graph','DS','Empty'];

for(let a=0;a<list.length;a++) {
    var obj=document.getElementById(list[a]);
    obj.addEventListener('mouseover',_Move);
    obj.addEventListener('mouseout',moveBack);
    
    if(a!=list.length-1)obj.style.transform = 'translateY('+50*a+'%)';
    else obj.style.transform = 'translateY('+50*a*7.5+'%)';
}

for(let a=0;a<list.length;a++){
    
    setTimeout(()=>{
    var obj=document.getElementById(list[a]);
    obj.style.transition="all 0.75s";
    },1);
}

var endJudgement;
var menu=document.getElementsByClassName("skillMenu");

menu[0].addEventListener("scroll",()=>{
    clearTimeout(endJudgement);
    endJudgement=setTimeout(()=>{
        for(let a=0;a<list.length;a++) {
            var obj=document.getElementById(list[a]);
            obj.style.pointerEvents = 'visible';
        }
    },100);

    var subElements=menu[0].childNodes;
    for(let a=0;a<list.length;a++) {
        var obj=document.getElementById(list[a]);
        obj.style.pointerEvents = 'none';
    }
    console.log("scroll");
});


function _Move(){  
    let id=-1,size=0;
    
    for(let a=0;a<list.length;a++) {
        if(list[a]==this.id){
            var target=this.getElementsByClassName("skill");
            if(target==null)continue;

            size=parseInt(target.length);
            
            id=a+1;
            break;
        }
    }

    if(id==-1)return;
    else{ 
        let len=size*75;

        for(let a=id;a<list.length;a++) {
            var obj=document.getElementById(list[a]);
            if(a!=list.length-1)obj.style.transform='translateY(+'+(50*a+len)+'%)'; 
            else obj.style.transform = 'translateY('+((50*a*7.5)+len*7.5)+'%)';
        }

    }
}

function moveBack(){ 
    let id=-1;
    
    for(let a=0;a<list.length;a++) {
        if(list[a]==this.id){
            id=a+1;
            break;
        }
    }


    for(let a=id;a<list.length;a++) {
        var obj=document.getElementById(list[a]);
        if(a!=list.length-1)obj.style.transform = 'translateY('+50*a+'%)';
        else obj.style.transform = 'translateY('+50*a*7.5+'%)';
    }
}

