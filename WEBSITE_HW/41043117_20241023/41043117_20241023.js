const canvas = document.getElementById('myCanvas');
const gstatus=document.getElementById('GameStatus');

const ctx = canvas.getContext('2d');
const gs=gstatus.getContext('2d');

ctx.textBaseline = 'middle';
ctx.textAlign = 'center';

// 球
let ballRadius = 10;
let Balls=[];

// 板子
const paddleHeight = 10;
let paddleWidth = 100;
let paddleX = (canvas.width - paddleWidth) / 2;

// 磚塊
const brickRowCount = 5;
const brickColumnCount = 10;
const brickWidth = 75;
const brickHeight = 25;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;
let bricks = [],brickCount=0,items=[];

let score = 0,bonus=100;
let lives = 3,atk=1;
let skillcoolDown=10,CurSkill;

let GameID=null,GameMode,GameStage=1,GameAnime=0;

const skill=["ATKUP","POINTUP"];

const skillImg={
    "ATKUP":"⚔️",
    "POINTUP":"🍺"
};


const BallDelta={
    "easy":{x:[1,1],y:[1,1]},
    "normal":{x:[2,3],y:[2,3]},
    "hard":{x:[3,4],y:[3,4]}
};

const GamePoint={
    "easy":1,
    "normal":3,
    "hard":10
};

const GameLive={
    "easy":3,
    "normal":4,
    "hard":5
};

const BrickHealth={
    "easy":2,
    "normal":3,
    "hard":5
};

const BrickColor={
    1:"rgb(255,255,255)",
    2:"rgb(205,205,235)",
    3:"rgb(155,155,215)",
    4:"rgb(105,105,195)",
    5:"rgb(55,55,175)"
};

const itemType=["ADDBALL","PADW_W","PADW_N","HEALTH","DAMAGE"];

const Probability ={
    "easy":{
        "ADDBALL":30,
        "PADW_W":10,//變寬
        "PADW_N":10,//變窄
        "HEALTH":30,
        "DAMAGE":0
    },
    "normal":{
        "ADDBALL":15,
        "PADW_W":10,//變寬
        "PADW_N":10,//變窄
        "HEALTH":25,
        "DAMAGE":5
    },
    "hard":{
        "ADDBALL":15,
        "PADW_W":10,//變寬
        "PADW_N":10,//變窄
        "HEALTH":30,
        "DAMAGE":25
    }
};

const ItemImg={
    "ADDBALL":"➕",
    "PADW_W":"🔷",
    "PADW_N":"🔶",
    "HEALTH":"❤️",
    "DAMAGE":"💔"
}

// 控制板子
let rightPressed = false;
let leftPressed = false;
let shiftPressed = false;

document.addEventListener('keydown', (e)=>{
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = true;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = true;
    }
    else if(e.key==="Shift")shiftPressed=true;
}, false);

document.addEventListener('keyup', (e)=>{
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = false;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = false;
    }
    else if(e.key==="Shift")shiftPressed=false;
}, false);

/*Animation*/
function StageCleared(){
    GameAnime=1;
    if(GameID){
        cancelAnimationFrame(GameID);
        GameID = null;
    }
    let light=1;
    DrawStageClearedAnimation(light);
    const animeInterval=setInterval(()=>{
        light=!light;
        DrawStageClearedAnimation(light);
    },250);

    setTimeout(()=>{
        clearInterval(animeInterval);
        
        light=1;
        DrawNextLevelAnimation(light)
        const nextlevelInterval=setInterval(()=>{
            light=!light;
            DrawNextLevelAnimation(light)
        },250);
    
        setTimeout(()=>{
            GameAnime=0;
            clearInterval(nextlevelInterval);
            GameInit(GameMode,++GameStage);
        },2500);
    },2500);
}

function GameStartCountDown(){
    GameAnime=1;
    let time=3;
    DrawCountDown(time--);
    const countdownInterval = setInterval(() => {
        DrawCountDown(time--);
    }, 1000);

    setTimeout(()=>{
        GameAnime=0;
        GameID=GameUpdate();
        clearInterval(countdownInterval);
    },3000);
}

function GameOver(){
    GameAnime=1;
    if(GameID){
        cancelAnimationFrame(GameID);
        GameID = null;
    }
    let light=1;
    DrawGameOverAnimation(light);
    const animeInterval=setInterval(()=>{
        light=!light;
        DrawGameOverAnimation(light);
    },250);

    setTimeout(()=>{
        clearInterval(animeInterval);
        light=1;
        DrawScoreAnimation(light);
        const scoreInterval=setInterval(()=>{
            light=!light;
            DrawScoreAnimation(light);
        },250);

        setTimeout(()=>{
            clearInterval(scoreInterval);
            light=1;
            DrawRestartAnimation(light);
            const restartInterval=setInterval(()=>{
                light=!light;
                DrawRestartAnimation(light);
            },250);
    
            setTimeout(()=>{
                clearInterval(restartInterval);
                GameAnime=0;
                Array.from(document.getElementsByClassName("GameObj")).forEach(obj=>{
                    obj.style.display = "none";
                });
        
                document.getElementById("TryAgain-Block").style.display="flex";
            },2500);
        },2500);
    },2500);
}

function DrawStageClearedAnimation(light){
    gs.clearRect(0,0,gstatus.width,gstatus.height);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.font='54pt Arial';
    ctx.fillStyle=light?"#fefefe":"#ddddee";
        
    const x = canvas.width/ 2; 
    const y = canvas.height / 2;

    ctx.fillText("Stage Cleared !!!", x, y);
}

function DrawNextLevelAnimation(light){
    gs.clearRect(0,0,gstatus.width,gstatus.height);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.font='54pt Arial';
    ctx.fillStyle=light?"#fefefe":"#ddddee";
        
    const x = canvas.width/ 2; 
    const y = canvas.height / 2;

    ctx.fillText("Next Level !!!", x, y);
}

function DrawGameOverAnimation(light) {
    gs.clearRect(0, 0, gstatus.width, gstatus.height);
    ctx.clearRect(0, 0, 900, 450);

    ctx.font = '54pt Arial';
    ctx.fillStyle = light ? "#fefefe" : "#ddddee";

    const x = canvas.width/ 2; 
    const y = canvas.height / 2;

    ctx.fillText("Game Over !!!",x,y);
}

function DrawScoreAnimation(light){
    gs.clearRect(0,0,gstatus.width,gstatus.height);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.font='54pt Arial';
    ctx.fillStyle=light?"#fefefe":"#ddddee";
        
        
    const x = canvas.width/ 2; 
    const y = canvas.height / 2;

    ctx.fillText("Your Score："+score, x, y);    
}

function DrawRestartAnimation(light){
    gs.clearRect(0,0,gstatus.width,gstatus.height);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.font='54pt Arial';
    ctx.fillStyle=light?"#fefefe":"#ddddee";
        
        
    const x = canvas.width/ 2; 
    const y = canvas.height / 2;

    ctx.fillText("Try Again?", x, y);    
}


function DrawCountDown(time){
    gs.clearRect(0,0,gstatus.width,gstatus.height);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.font='54pt Arial';
    ctx.fillStyle="#fefefe";
        
    
    // 計算文本的 x 和 y 座標以置中
    const x = canvas.width/ 2; 
    const y = canvas.height / 2;

    // 在計算的位置繪製文本
    ctx.fillText("Game Start："+time, x, y);
}


/*Animation*/ 


function DrawGameStatus() {
    gs.font = '16pt Arial';
    gs.fillStyle = '#fefefe';

    const hpos = (gstatus.height + parseInt(gs.font, 10) / 2) / 2;
    const sectionWidth = gstatus.width / 4; // 將區域數改為四等份

    gs.fillText('Score💠: ' + score, sectionWidth / 2 - gs.measureText('Score💠: ' + score).width / 2, hpos);

    gs.fillText('HP❤️: ' + lives, sectionWidth + sectionWidth / 2 - gs.measureText('HP❤️: ' + lives).width / 2, hpos);

    gs.fillText('MODE🎮: ' + GameMode, sectionWidth * 2 + sectionWidth / 2 - gs.measureText('MODE🎮: ' + GameMode).width / 2, hpos);

    gs.fillText('Stage👾: ' + GameStage, sectionWidth * 3 + sectionWidth / 2 - gs.measureText('Stage👾: ' + GameStage).width / 2, hpos);
}



function drawBall() {
    for(let i=0;i<Balls.length;i++){
        ctx.shadowColor="rgba(255, 255, 255,0.75)";
        ctx.shadowBlur = 5; // 光暈模糊程度
        ctx.shadowOffsetX = 0; // 光暈水平偏移
        ctx.shadowOffsetY = 0; // 光暈垂直偏移
        ctx.beginPath();
        ctx.arc(Balls[i].x, Balls[i].y, ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = i?"rgb(20,205,225)":"rgb(235,235,235)";
        ctx.fill();
        ctx.closePath();
        ctx.shadowColor = 'transparent'; // 取消光暈
    };
}

function drawTrails(){
    Balls.forEach(ball=>{
        for(let i=0;i<ball.trails.length;i++){
            ctx.shadowColor="rgba(255, 255, 255,0.25)";
            ctx.shadowBlur = 5; // 光暈模糊程度
            ctx.shadowOffsetX = 0; // 光暈水平偏移
            ctx.shadowOffsetY = 0; // 光暈垂直偏移
            ctx.beginPath();
            ctx.arc(ball.trails[i].x, ball.trails[i].y, ballRadius*((i+1)/ball.trails.length), 0, Math.PI * 2);
            ctx.fillStyle = "rgba(205,235,255,"+((i+1)/ball.trails.length)+")";
            ctx.fill();
            ctx.closePath();    
            ctx.shadowColor="transparent";
        }
    });
}

function drawPaddle() {
    ctx.shadowColor="rgba(255, 255, 255,0.5)";
    ctx.shadowBlur = 5; // 光暈模糊程度
    ctx.shadowOffsetX = 0; // 光暈水平偏移
    ctx.shadowOffsetY = 0; // 光暈垂直偏移
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = '#ee95DD';
    ctx.fill();
    ctx.closePath();
    ctx.shadowColor="transparent";
}

function drawBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status >= 1) {
                if(bricks[c][r].shine){
                    ctx.shadowColor = "rgba(255, 255, 255,"+(bricks[c][r].shine/60)+")"; // 光暈顏色
                    bricks[c][r].shine--;
                }
                ctx.shadowBlur = 5; // 光暈模糊程度
                ctx.shadowOffsetX = 0; // 光暈水平偏移
                ctx.shadowOffsetY = 0; // 光暈垂直偏移
                ctx.fillStyle =bricks[c][r].display?BrickColor[bricks[c][r].status]:"rgb(255,255,255,0.01)";
                ctx.fillRect(bricks[c][r].x, bricks[c][r].y, brickWidth, brickHeight);
                ctx.shadowColor = 'transparent'; // 取消光暈
            }
            else if(bricks[c][r].expload) {
                //console.log("rgba("+(155+Math.floor(Math.random()*100))+","+(155+Math.floor(Math.random()*100))+","+(155+Math.floor(Math.random()*100))+","+(bricks[c][r].expload/90)+")");
                ctx.shadowColor = "rgba("+(100+Math.floor(Math.random()*155))+","+(100+Math.floor(Math.random()*155))+","+(100+Math.floor(Math.random()*155))+","+(bricks[c][r].expload/90)+")"; // 光暈顏色
                bricks[c][r].expload--;
         
                ctx.shadowBlur = 5; // 光暈模糊程度
                ctx.shadowOffsetX = 0; // 光暈水平偏移
                ctx.shadowOffsetY = 0; // 光暈垂直偏移
                ctx.fillStyle ="rgb(40,45,50)";
                ctx.fillRect(bricks[c][r].x, bricks[c][r].y, brickWidth, brickHeight);
                ctx.shadowColor = 'transparent'; // 取消光暈
            }
        }
    }
}

function drawItems(){
    items.forEach(item=>{
        ctx.font = '16pt sans-serif'; // 使用合適的字體
        ctx.textAlign = 'center';       // 文字置中
        ctx.textBaseline = 'middle';    // 文字基準線置中
    
        const posx=item.x+brickWidth/2;
        const posy=item.y+brickHeight/2;
        // 繪製 emoji
       // console.log(item,Balls[0].x);
        ctx.fillText(ItemImg[item.type], posx,posy);
    });
}



function AddItem(x,y){
    let P=Probability[GameMode],sum=0;
    const num=Math.round(Math.random()*100);

    for(let i=0;i<itemType.length;i++){
        sum+=P[itemType[i]];
        if(sum>=num){
            items.push({
                x:x,
                y:y,
                type:itemType[i]
            });
            return;
        }
    }
}

function ADDBALL(){
    const dx=BallDelta[GameMode].x[Math.floor(Math.random()*2)];
    const dy=BallDelta[GameMode].y[Math.floor(Math.random()*2)]; 

    Balls.push({
        x:paddleX,
        y:canvas.height - 30,
        dx:Math.floor(Math.random()*2)?dx:-dx,
        dy:-dy,
        trails:[]
    });
}

function collisionDetection() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            const b = bricks[c][r];
            if (b.status >= 1) {
                Balls.forEach(ball=>{
                    if (ball.x > b.x && ball.x < b.x + brickWidth && ball.y > b.y && ball.y < b.y + brickHeight) {
                        const nxtdy=BallDelta[GameMode].y[Math.floor(Math.random()*2)];
                        
                        ball.dy = ball.dy>0?-nxtdy:nxtdy;

                        b.status --;
                        b.display=1;
                        
                        if(b.status===0){
                            brickCount--;
                            score+=GameStage*GamePoint[GameMode];
                            if(score>bonus){
                                live+=Math.floor(Math.random()*2);
                                bonus+=100;
                            }
                            AddItem(b.x,b.y);
                            b.expload=90;
                        }
                        else b.shine=60;
                       
                        if (brickCount===0){
                            StageCleared();
                            return;
                        }
                    }
                });
            }
        }
    }
}

function ItemDropdown(){
    for(let i=items.length-1; i>=0; i--){
        items[i].y++;
    
        if(items[i].y===canvas.height)items.splice(i, 1);
    };
}


function ItemCollisionDetection(){
    for(let i=items.length-1; i>=0; i--){
        const ix=items[i].x+brickWidth/2;
        const iy=items[i].y+brickHeight/2;

        if(ix>=paddleX&&ix<=paddleX+paddleWidth&&iy>=canvas.height-30){
            if(items[i].type==="ADDBALL")ADDBALL();
            if(items[i].type==="PADW_W")paddleWidth=Math.min(paddleWidth+25,250);
            if(items[i].type==="PADW_N")paddleWidth=Math.max(paddleWidth-25,50);
            if(items[i].type==="HEALTH")lives++;
            if(items[i].type==="DAMAGE")lives--;
                
            items.splice(i, 1);
        }
    };
}

function OutSideDetection(){
    for(let i=Balls.length-1;i>=0;i--){
        const ball=Balls[i];
        if (ball.x + ball.dx > canvas.width - ballRadius || ball.x + ball.dx < ballRadius){
            const dx=BallDelta[GameMode].x[Math.floor(Math.random()*2)];
            ball.dx = ball.dx>0?-dx:dx;
        }
        if (ball.y + ball.dy < ballRadius){
            const dy=BallDelta[GameMode].y[Math.floor(Math.random()*2)];                
            ball.dy = ball.dy>0?-dy:dy;
        }
        else if (ball.y + ball.dy > canvas.height - ballRadius) {
            if (ball.x > paddleX && ball.x < paddleX + paddleWidth){
                const dy=BallDelta[GameMode].y[Math.floor(Math.random()*2)];            
                ball.dy = ball.dy>0?-dy:dy;
            }
            else {
                if(i)Balls.splice(i,1);
                else{
                    lives--;
                    if (!lives){
                        GameOver();
                        return;
                    }
                    else {
                        ball.x = canvas.width / 2;ball.y = canvas.height - 30;
                        const dx=BallDelta[GameMode].x[Math.floor(Math.random()*2)];
                        const dy=BallDelta[GameMode].y[Math.floor(Math.random()*2)]; 
                        
                        ball.dx = Math.floor(Math.random()*2)?dx:-dx;
                        ball.dy = Math.floor(Math.random()*2)?dy:-dy;
                        paddleX = (canvas.width - paddleWidth) / 2;
                    }
                }
            }
        }
    };
}

function PaddleMove(){
    const mvdelta=shiftPressed?9:5;
    if (rightPressed && paddleX < canvas.width - paddleWidth)paddleX += mvdelta;
    else if (leftPressed && paddleX > 0)paddleX -= mvdelta;
}

function BallMove(){
    Balls.forEach(ball=>{
        ball.x += ball.dx;
        ball.y += ball.dy;
    });
}

function SaveTrails(){
    Balls.forEach(ball=>{
        if(ball.trails.length ==25)ball.trails.shift();
        ball.trails.push({x:ball.x,y:ball.y});
    });
}

function BackToMenu(){
    if(GameID){
        cancelAnimationFrame(GameID);
        GameID = null;
    }
    document.getElementById("TryAgain-Block").style.display = "none";
    document.getElementById("GameMode-Select-Block").style.display = "flex";
}

function GameInit(mode,stage){
    if(GameID){
        cancelAnimationFrame(GameID);
        GameID = null;
    }
    if(mode)GameMode=mode;
    if(stage){
        GameStage=stage;
        lives = Math.max(lives,GameLive[GameMode]);
    }
    else {
        bonus=100;
        score = 0;
        GameStage=1;
        lives = GameLive[GameMode];
    }
    console.log(GameMode,GameStage);
    document.getElementById("GameMode-Select-Block").style.display = "none";
    document.getElementById("TryAgain-Block").style.display = "none";
    Array.from(document.getElementsByClassName("GameObj")).forEach(obj=>{
        obj.style.display = "block";
    });

    GameAnime=0;
    paddleX = (canvas.width - paddleWidth) / 2;
    paddleWidth = 100;
    bricks = [];
    items=[];
    Balls=[];
    brickCount=0;

    //brick create
    for (let c = 0; c < brickColumnCount; c++) {
        bricks[c] = [];
        for (let r = 0; r < brickRowCount; r++) {
            const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
            const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
                
            bricks[c][r] = { 
                x: brickX,
                y: brickY,
                display:Math.min(1,Math.floor(Math.random()*20)),
                status: Math.round(Math.random()*BrickHealth[GameMode]),
                shine:0,
                expload:0
            };

            if(bricks[c][r].status>=1)brickCount++;
        }
    }
    
    //ball create
    ADDBALL();
    
    GameStartCountDown();
}

function GameUpdate() {
    if(GameAnime) return;
    gs.clearRect(0, 0, gstatus.width, gstatus.height);
    DrawGameStatus();
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawTrails();
    drawBall();
    drawPaddle();
    drawItems();

    collisionDetection();
    OutSideDetection();
    ItemCollisionDetection();

    ItemDropdown();
    PaddleMove();
    SaveTrails();
    BallMove();


    if(!GameAnime)GameID=requestAnimationFrame(GameUpdate);
    else if(GameID)GameID=null;
}
