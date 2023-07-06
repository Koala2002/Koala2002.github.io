function ContestSpacing(){
    var i=0;
    console.log(i);

    while(true){
        i++;
        var id=document.getElementById('CTR'+i);
        if(id==null)break;
        console.log(i);
    }

    for(let a=i-1;a>=1;a--){
        var id=document.getElementById('CTR'+a);
        console.log(i-a);
        id.style.transform='translateY('+(i-a-1)*28.5+'%'+')';
    }
}

ContestSpacing();