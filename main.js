var canvas = document.getElementById("mainboard");
var ctx = canvas.getContext("2d");
var w = canvas.width;
var h = canvas.height;
console.log(w,h);
var n =15;
var atlama = h/n;

var player = "oyuncu1"

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

createTable();

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

    console.log(xCord,yCord)
    if(player == "oyuncu1"){
        player = "oyunvu2";
    }
    else {
        player = "oyuncu1";
    }
    fillTable(xCord,yCord)
}

// fillTable(3,5)
// fillTable(4,6)
// fillTable(n-1,n-1)