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
let Comments=[
    '/*','//'
];
let Numbers=[
    '0','1','2','3','4','5','6','7','8','9'
];

let typeS="<span CLASS='DataTypeHighlight'>",typeE="</span><!--DataType-->";
let keyS="<span CLASS='KeyWordHighlight'>",keyE="</span><!--KeyWord-->";
let strS="<span CLASS='StringCharHighlight'>",strE="</span><!--StringChar-->";
let dirS="<span CLASS='DirectiveHighlight'>",dirE="</span><!--Directive-->";
let numS="<span CLASS='NumberHighlight'>",numE="</span><!--Number-->";
let comS="<span CLASS='CommentHighlight'>",comE="</span><!--BigComment-->",smallcomE="</span><!--SmallComment-->";

var Codes=document.getElementsByClassName('Code');
var IDBlocks=document.getElementsByClassName('IndexBlock');

function canAdd(innerHTML,id){
    var strRS=innerHTML.indexOf(strS,id);
    var strRE=innerHTML.indexOf(strE,id);
    var dirRE=innerHTML.indexOf(dirE,id);
    var comRS=innerHTML.indexOf(comS,id);
    var comRE=innerHTML.indexOf(comE,id);
    var comSRE=innerHTML.indexOf(smallcomE,id);

    if(strRE!=-1&&(strRE<strRS||strRS==-1))return false;
    if(dirRE>=0)return false;
    if(comRE!=-1&&(comRE<comRS||comRS==-1))return false;
    if(comSRE!=-1&&(comSRE<comRS||comRS==-1))return false;

    return true;
}

function codeSyntaxBuild(code){
    var innerHTML=code.innerHTML;

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

    Comments.forEach(ele=>{
        var id=-1,offset=0;
        if(ele=='/*'){
            var dir=true,preid=0;
            while((id=innerHTML.indexOf(dir?'/*':'*/',id+offset+1))>=0){
                innerHTML=
                    innerHTML.substring(0,id)+
                    (dir?comS:"")+
                    innerHTML.substring(id,id+ele.length)+
                    (dir?"":comE)+
                    innerHTML.substring(id+ele.length);

                if(dir){
                    offset=comS.length;
                }else offset=comE.length;

                if(!dir){
                    while(true){
                        var preid=innerHTML.lastIndexOf(comS,id);
                        var strSID=innerHTML.indexOf(strS,preid);

                        if(strSID==-1||strSID>id)break;
                        
                        innerHTML=
                            innerHTML.substring(0,strSID)+
                            innerHTML.substring(strSID+strS.length);

                        id-=strS.length;
                    }

                    while(true){
                        var preid=innerHTML.lastIndexOf(comS,id);
                        var strEID=innerHTML.indexOf(strE,preid);

                        if(strEID==-1||strEID>id)break;
                        
                        innerHTML=
                            innerHTML.substring(0,strEID)+
                            innerHTML.substring(strEID+strE.length);

                        id-=strE.length;
                    }
                }
                dir=!dir;
            }
        }
        else{
            while((id=innerHTML.indexOf(ele,id+offset*comS.length+1))>=0){
                var comRS=innerHTML.indexOf(comS,id);
                var comRE=innerHTML.indexOf(comE,id);

                if(comRE!=-1&&(comRE<comRS||comRS==-1)){
                    offset=0;
                    continue;
                }

                innerHTML=
                    innerHTML.substring(0,id) + 
                    comS +
                    innerHTML.substring(id,innerHTML.indexOf("\n",id)) + 
                    smallcomE + 
                    innerHTML.substring(innerHTML.indexOf("\n",id));
                
                    offset=1;

                var EndID=innerHTML.indexOf("\n",id+offset*comS.length);
                while(true){
                    var preid=innerHTML.lastIndexOf(comS,EndID);
                    var strSID=innerHTML.indexOf(strS,preid);
                    
                    if(strSID==-1||strSID>EndID)break;
                        
                    innerHTML=
                        innerHTML.substring(0,strSID)+
                        innerHTML.substring(strSID+strS.length);

                    EndID-=strS.length;                 
                }

                while(true){
                    var preid=innerHTML.lastIndexOf(comS,EndID);
                    var strEID=innerHTML.indexOf(strE,preid);

                    if(strEID==-1||strEID>EndID)break;
                    
                    innerHTML=
                        innerHTML.substring(0,strEID)+
                        innerHTML.substring(strEID+strE.length);

                    EndID-=strE.length;
                }
            }
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
            if(!canAdd(innerHTML,id)){
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
            if(!canAdd(innerHTML,id)){
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
            if(!canAdd(innerHTML,id)){
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

    console.log(innerHTML);
    return innerHTML;
}

function lineIndexBuild(IDBlock,code) {
    var cnt=0,id=-1;
    while((id=code.innerHTML.indexOf("\n",id+1))>=0)cnt++;
    
    IDBlock.style.height=code.scrollHeight+"px";

    var IDBlockHtml=IDBlock.innerHTML;
    
    for(let a=1;a<=cnt+1;a++){
        IDBlockHtml+=a;
        if(a!=cnt+1)IDBlockHtml+="\n";   
    }

    return IDBlockHtml;
}

for(let a=0;a<Codes.length;a++){
    Codes[a].innerHTML=codeSyntaxBuild(Codes[a]);
    IDBlocks[a].innerHTML=lineIndexBuild(IDBlocks[a],Codes[a]);
};