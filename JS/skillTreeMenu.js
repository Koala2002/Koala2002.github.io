var list=['Sort', 'Search', 'Str', 'Math', 'DP','OffA','Graph','DS','Empty'];

for(let a=0;a<list.length;a++) {
    var obj=document.getElementById(list[a]);
    obj.addEventListener('mouseover',_Move);
    obj.addEventListener('mouseout',moveBack);

    if(a!=list.length-1)obj.style.transform = 'translateY('+50*a+'%)';
    else obj.style.transform = 'translateY('+50*a*7.5+'%)';
}

function _Move(){  
    console.log(this);
    let id=-1,size=0;
    
    for(let a=0;a<list.length;a++) {
        if(list[a]==this.id){
            var target=Array.from(this.childNodes).find(node=>node.id=="skillList");
            if(target==null)continue;
            
            size=parseInt((target.childNodes).length/2);
            
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

