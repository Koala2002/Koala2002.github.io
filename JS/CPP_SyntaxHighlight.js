let DataTypes=[
    'int','long long','short','unsigned',
    'float', 'double', 'bool', 
    'string','void','auto'
];
let KeyWords=[
    'for', 'while','return','switch','case','default','do','break','public','private','namespace','using',
    'continue','true','false','if','else if','else','class','struct'
];
let StrChars=[
    '\'','\"'
];
let Directives=[
    '#include','#define','#ifdef','#ifndef','#if','#elif','else','#undef','#endif'
];
let Numbers=[
    '0','1','2','3','4','5','6','7','8','9'
];

var code=document.getElementById('codeBlock');
var innerHTML=code.innerHTML;

console.log(innerHTML+"\n\n\n\n");

var typeS="<span CLASS='DataTypeHighlight'>",typeE="</span><!--DataType-->";
var keyS="<span CLASS='KeyWordHighlight'>",keyE="</span><!--KeyWord-->";
var strS="<span CLASS='StringCharHighlight'>",strE="</span><!--StringChar-->";
var dirS="<span CLASS='DirectiveHighlight'>",dirE="</span><!--Directive-->";
var numS="<span CLASS='NumberHighlight'>",numE="</span><!--Number-->";

StrChars.forEach(ele=>{
    var id=-1,offset=0,get=0;
    while((id=innerHTML.indexOf(ele,id+(offset*strS.length)+1))>=0){
        innerHTML=
            innerHTML.substring(0,id) + 
            (get==0?strS:"") +
            innerHTML.substring(id,id+ele.length) + 
            (get==1?strE:"") + 
            innerHTML.substring(id + ele.length);

        offset=!offset;
        get=(get+1)%2;
    }
});

Directives.forEach(ele=>{
    var id=-1,offset=0;

    while((id=innerHTML.indexOf(ele,id+(offset*dirS.length)+1))>=0){
        innerHTML=
            innerHTML.substring(0,id) + 
            dirS +
            innerHTML.substring(id,innerHTML.indexOf("\n",id)) + 
            dirE + 
            innerHTML.substring(innerHTML.indexOf("\n",id));

        offset=1;
    }
});

DataTypes.forEach(ele=>{   
    var id=-1,offset=0;
    while((id=innerHTML.indexOf(ele,id+(offset*typeS.length)+1))>=0){
        var strLS=innerHTML.lastIndexOf(strS,id);
        var strLE=innerHTML.lastIndexOf(strE,id);
        var strRS=innerHTML.indexOf(strS,id);
        var strRE=innerHTML.indexOf(strE,id);

        var dirRE=innerHTML.indexOf(dirE,id);

        if(strLS>strLE&&(strRE<strRS||strRS==-1)){
            offset=0;
            continue;
        }
        if(dirRE>=0){
            offset=0;
            continue;
        }

        innerHTML=
            innerHTML.substring(0,id) + 
            typeS +
            innerHTML.substring(id,id+ele.length) + 
            typeE + 
            innerHTML.substring(id + ele.length);

        offset=1;
    }
});

KeyWords.forEach(ele=>{
    var id=-1,offset=0;
    while((id=innerHTML.indexOf(ele,id+(offset*keyS.length)+1))>=0){
        
        var strLS=innerHTML.lastIndexOf(strS,id);
        var strLE=innerHTML.lastIndexOf(strE,id);
        var strRS=innerHTML.indexOf(strS,id);
        var strRE=innerHTML.indexOf(strE,id);

        var dirRE=innerHTML.indexOf(dirE,id);

        if(strLS>strLE&&(strRE<strRS||strRS==-1)){
            offset=0;
            continue;
        }
        if(dirRE>=0){
            offset=0;
            continue;
        }
        
        innerHTML=
            innerHTML.substring(0,id) + 
            keyS +
            innerHTML.substring(id,id+ele.length) + 
            keyE + 
            innerHTML.substring(id + ele.length);

        offset=1;
    }
});

Numbers.forEach(ele=>{
    var id=-1,offset=0;
    while((id=innerHTML.indexOf(ele,id+(offset*numS.length)+1))>=0){
        
        var strLS=innerHTML.lastIndexOf(strS,id);
        var strLE=innerHTML.lastIndexOf(strE,id);
        var strRS=innerHTML.indexOf(strS,id);
        var strRE=innerHTML.indexOf(strE,id);

        var dirRE=innerHTML.indexOf(dirE,id);

        if(strLS>strLE&&(strRE<strRS||strRS==-1)){
            offset=0;
            continue;
        }
        if(dirRE>=0){
            offset=0;
            continue;
        }
        
        innerHTML=
            innerHTML.substring(0,id) + 
            numS +
            innerHTML.substring(id,id+ele.length) + 
            numE + 
            innerHTML.substring(id + ele.length);

        offset=1;
    }
});

function lineIndexBuild(){
    var IDBlock=document.getElementById("IDBlock");

    var cnt=0,id=-1;
    while((id=innerHTML.indexOf("\n",id+1))>=0)cnt++;
    
    console.log(IDBlock.parentNode.scrollHeight-100);
   IDBlock.style.height=(3.725*cnt)+"%";

    var IDBlockHtml=IDBlock.innerHTML;
    
    for(let a=1;a<=cnt;a++){
        IDBlockHtml+=a;
        if(a!=cnt)IDBlockHtml+="\n";   
    }

    IDBlock.innerHTML=IDBlockHtml;
}

lineIndexBuild();
console.log(innerHTML);

code.innerHTML = innerHTML;
