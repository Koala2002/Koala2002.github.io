
let i=0;

while(true){
    i++;
    let id=document.getElementById('CTR'+i);
    if(id==null)break;
}

for(let a=i-1;a>=1;a--){
    let id=document.getElementById('CTR'+a);
    id.style.transform='translateY('+(i-a-1)*28.5+'%'+')';
}
