var canvas = document.getElementById("mainboard");
var ctx = canvas.getContext("2d");
var w = canvas.width;
var h = canvas.height;
console.log(w,h);
var n =15;
var atlama = h/n;


var player = "oyuncu1"

var table = Create2dArray(n)


function Create2dArray(n){
        var arr = [];
        for (var i=0;i<n;i++) {
           arr[i] = [];
           for(var j=0;j<n;j++){
             arr[i].push(null)
            }
        }
        return arr;
}

console.log("Table", table)
console.log(" Tablo 00 degeri ", table[0][0])
createTable()

function createTable(){
    for (let i=0; i<n+1;i++){
        ctx.beginPath();
        ctx.moveTo(0, atlama * i);
        ctx.lineTo(w, atlama * i);
        ctx.stroke();
    }
    for (let i=0; i<n+1;i++){
        ctx.beginPath();
        ctx.moveTo(atlama * i, 0);
        ctx.lineTo(atlama * i, h);
        ctx.stroke();
    }
}

function fillTable(x,y){
    let xCord = x * atlama + atlama/2;
    let yCord = y * atlama + atlama/2;

    ctx.beginPath();
    ctx.arc(xCord, yCord, atlama/3 , 0, 2 * Math.PI, false);
    ctx.fillStyle = player == "oyuncu1" ? 'red' : "blue";
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#003300';
    ctx.stroke();
}

canvas.onmousedown = function (e){
    // console.log(e)
    // let xCord = Math.round((e.clientX - atlama/2) / atlama );
    // let yCord = Math.round((e.clientY - atlama/2)/ atlama );

    let xCord = Math.floor(e.clientX / w * n);
    let yCord = Math.floor(e.clientY / h * n);

    if(table[xCord][yCord] == null)
    {  
        fillTable(xCord,yCord)
        
        table[xCord][yCord] = player
        // console.log("Winner",isAnyOneWin(xCord,yCord))
        if(isAnyOneWin(xCord,yCord)){
            alert(player + " oyuncusu kazandi");
            window.location = window.location
        }
        console.log(table[xCord][yCord])
        if(player == "oyuncu1"){
            player = "oyuncu2";
        }
        else {
            player = "oyuncu1";
        }
    }
}

// fillTable(3,5)
// fillTable(4,6)
// fillTable(n-1,n-1)

function fillControl(x,y){
    let xCord = x * atlama + atlama/2;
    let yCord = y * atlama + atlama/2;

    ctx.beginPath();
    ctx.arc(xCord, yCord, atlama/3 , 0, 2 * Math.PI, false);
    ctx.fillStyle = "rgba(0,255,0,0.1)"
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#003300';
    ctx.stroke();
}

function isAnyOneWin(xCord,yCord){
    let winCount = 5 ;
    let tempCount = 0 ;
    let i= 0 ;
    for (i = -winCount +1; i<winCount;i++){
        let x = xCord+i;
        // fillControl(x,yCord);
        if ( x>=0 && x<n && table[x][yCord] == player){
            tempCount ++;
            if(tempCount >= 5){
                return player;
            }   
        }   
        else{
            tempCount = 0;
        }
    }
    

    for (i = -winCount + 1; i<winCount;i++){
        let y = yCord+i;
        // fillControl(xCord,y);
        if ( y>=0 && y<n && table[xCord][y] == player){
            tempCount ++;
            if(tempCount >= 5){
                return player;
            }   
        }   
        else{
            tempCount = 0;
        }
    }
   

    tempCount = 0;
    for (i = -winCount + 1; i<winCount;i++){
        let y = yCord+i
        let x = xCord+i
        // fillControl(x,y);
        if ( y>=0 && y<n && x>=0 && x<n && table[x][y] == player){
            tempCount ++;
            if(tempCount >= 5){
                return player
            }
        }   
        else{
            tempCount = 0;
        }
    }
 

    tempCount = 0;
    for (i = -winCount + 1; i<winCount;i++){
        let y = yCord-i
        let x = xCord+i
        // fillControl(x,y);
        if ( y>=0 && y<n && x>=0 && x<n && table[x][y] == player){
            tempCount ++;
            if(tempCount >= 5){
                return player
            }
        }   
        else{
            tempCount = 0;
        }
    }
   
    return null;
}

function startGame(){
    //While kazanan olana kadar 
        // Ilk hamle kullanici
        // AI minimax ile hamlesini gerceklestirecek.
}