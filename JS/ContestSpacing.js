let list = document.getElementsByClassName('CT');

for(let a=0;a<list.length;a++){
    list[a].style['transform']='translateY('+a*28.5+'%'+')';
}
