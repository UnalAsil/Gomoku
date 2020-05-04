var canvas = document.getElementById("mainboard");
var ctx = canvas.getContext("2d");
var w = canvas.width;
var h = canvas.height;
console.log(w, h);
var n = 8;
var atlama = h / n;

var player = "human"

var table = Create2dArray(n)

winScore = 100000000;

function Create2dArray(n) {
    var arr = [];
    for (var i = 0; i < n; i++) {
        arr[i] = [];
        for (var j = 0; j < n; j++) {
            arr[i].push(null)
        }
    }
    return arr;
}

console.log("Table", table)
console.log(" Tablo 00 degeri ", table[0][0])
createTable()

function createTable() {
    for (let i = 0; i < n + 1; i++) {
        ctx.beginPath();
        ctx.moveTo(0, atlama * i);
        ctx.lineTo(w, atlama * i);
        ctx.stroke();
    }
    for (let i = 0; i < n + 1; i++) {
        ctx.beginPath();
        ctx.moveTo(atlama * i, 0);
        ctx.lineTo(atlama * i, h);
        ctx.stroke();
    }
}

function fillTable(x, y) {
    let xCord = y * atlama + atlama / 2;
    let yCord = x * atlama + atlama / 2;

    ctx.beginPath();
    ctx.arc(xCord, yCord, atlama / 3, 0, 2 * Math.PI, false);
    ctx.fillStyle = player == "human" ? 'red' : "blue";
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#003300';
    ctx.stroke();
}

canvas.onmousedown = function (e) {

    let xCord = Math.floor(e.clientY / w * n);
    let yCord = Math.floor(e.clientX / h * n);

    if (table[xCord][yCord] == null) {
        fillTable(xCord, yCord);
        // conn.send(JSON.stringify([xCord, yCord]));
        table[xCord][yCord] = player;
        if (isAnyOneWin(xCord, yCord)) {
            alert(player + " oyuncusu kazandi");
            window.location = window.location
        }
        console.log(table[xCord][yCord])


        player = "AI";

        let depth = 2;
        let move = getMove(depth);
        xCord = move[0];
        yCord = move[1];
        table[xCord][yCord] = player;
        fillTable(xCord, yCord);
        // console.log(table);

        if (isAnyOneWin(xCord, yCord)) {
            alert(player + " oyuncusu kazandi");
            window.location = window.location
        }

        player = "human";

        // fillControl(5,5)


    }
}

function fillControl(x, y) {
    let xCord = x * atlama + atlama / 2;
    let yCord = y * atlama + atlama / 2;

    ctx.beginPath();
    ctx.arc(xCord, yCord, atlama / 3, 0, 2 * Math.PI, false);
    ctx.fillStyle = "rgba(0,255,0,0.1)"
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#003300';
    ctx.stroke();
}

function isAnyOneWin(xCord, yCord) {
    let winCount = 5;
    let tempCount = 0;
    let i = 0;
    for (i = -winCount + 1; i < winCount; i++) {
        let x = xCord + i;
        // fillControl(x,yCord);
        if (x >= 0 && x < n && table[x][yCord] == player) {
            tempCount++;
            if (tempCount >= 5) {
                return player;
            }
        }
        else {
            tempCount = 0;
        }
    }

    for (i = -winCount + 1; i < winCount; i++) {
        let y = yCord + i;
        // fillControl(xCord,y);
        if (y >= 0 && y < n && table[xCord][y] == player) {
            tempCount++;
            if (tempCount >= 5) {
                return player;
            }
        }
        else {
            tempCount = 0;
        }
    }

    tempCount = 0;
    for (i = -winCount + 1; i < winCount; i++) {
        let y = yCord + i
        let x = xCord + i
        // fillControl(x,y);
        if (y >= 0 && y < n && x >= 0 && x < n && table[x][y] == player) {
            tempCount++;
            if (tempCount >= 5) {
                return player
            }
        }
        else {
            tempCount = 0;
        }
    }

    tempCount = 0;
    for (i = -winCount + 1; i < winCount; i++) {
        let y = yCord - i
        let x = xCord + i
        // fillControl(x,y);
        if (y >= 0 && y < n && x >= 0 && x < n && table[x][y] == player) {
            tempCount++;
            if (tempCount >= 5) {
                return player
            }
        }
        else {
            tempCount = 0;
        }
    }

    return null;
}


function getMove(depth) {
    // console.log("Basladim calismaya");
    // AI to make its turn
    let bestScore = -Infinity;
    let move;
    let board = table
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            // Is the spot available?
            if (board[i][j] == null) {
                // console.log("AAA");
                board[i][j] = "AI";
                let score = minimaxim(board, depth, false, -1.0, winScore);
                // console.log("bbb");

                if (score >= bestScore) {
                    // console.log("Yeni ARRay");
                    // board.forEach((aa)=>console.log(aa));                    
                    bestScore = score;
                    move = [i, j];
                }
                board[i][j] = null;
            }
        }
    }
    // console.log(move)
    return move;
}

var hashTable = {};

function getKey(board, isMaximizing) {
    let key;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if(board[i][j])
            key ^= board[i][j];
        }
    }
    // key += isMaximizing

    // console.log(key)
    return key
}

function isBoardingTable(board, isMaximizing) {
    let key = getKey(board, isMaximizing)
    if (hashTable[key] != undefined){
        return hashTable[key];
    }
    else {
        return "yok";
    }

}

function minimaxim(board, depth, isMaximizing, alpha, beta) {
   
    // console.log("Girdim minimaxa");
    // if (depth == 0) {
    //     let ScorestBefore = isBoardingTable(board, isMaximizing)
    //     if (ScorestBefore == "yok") 
    //     {
    //         let Skor = evaluateBoardForWhite(board, isMaximizing)
    //         hashTable[getKey(board, isMaximizing)] = Skor;
    //         return Skor;
    //     }
    //     else 
    //     { 
    //         // console.log("AASDAS");
    //         return ScorestBefore;
    //     }
    // }


    if (depth == 0 )
    {
        return evaluateBoardForWhite(board, isMaximizing);
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                // Is the spot available?
                if (board[i][j] == null) {
                    board[i][j] = "AI";
                    let score = minimaxim(board, depth - 1, false, alpha, beta);
                    board[i][j] = null;
                    bestScore = Math.max(score, bestScore);
                    alpha = Math.max(alpha, score)
                    if (beta < alpha) {
                        break;
                    }
                }
            }
        }
        // console.log("BestSkorMAX",bestScore)
        return bestScore;
    }
    else {
        let bestScore = Infinity;
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                // Is the spot available?
                if (board[i][j] == null) {
                    board[i][j] = "human";
                    let score = minimaxim(board, depth - 1, true, alpha, beta);
                    board[i][j] = null;
                    bestScore = Math.min(score, bestScore);
                    beta = Math.min(beta, score);
                    if (beta < alpha) {
                        break;
                    }
                }
            }
        }
        // console.log("BestSkorMin",bestScore)
        return bestScore;
    }
}

// function minimax(board, depth, max) {
//     if (depth == 0) {
//         return evaluateBoardForWhite(board, !max)
//     }



// }

function evaluateBoardForWhite(board, blacksTurn) {

    let blackScore = getScore(board, true, blacksTurn);
    let whiteScore = getScore(board, false, blacksTurn);

    if (blackScore == 0) blackScore = 1.0;

    return whiteScore / blackScore;

    // if (whiteScore == 0) whiteScore = 1.0;

    // return blackScore / whiteScore;
}

function getScore(board, forBlack, blacksTurn) {
    return evaluateHorizontal(board, forBlack, blacksTurn) +
        evaluateVertical(board, forBlack, blacksTurn) +
        evaluateDiagonal(board, forBlack, blacksTurn);
}

function evaluateHorizontal(board, forBlack, playersTurn) {
    let consecutive = 0;
    let blocks = 2;
    let score = 0;

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (board[i][j] == (forBlack ? player1 : player2)) {
                consecutive++;
            }
            else if (board[i][j] == null) {
                if (consecutive > 0) {
                    blocks--;
                    // console.log("AA");
                    score += getConsecutiveSetScore(consecutive, blocks, forBlack == playersTurn);
                    consecutive = 0;
                    blocks = 1;
                }
                else {
                    blocks = 1;
                }
            }
            else if (consecutive > 0) {

                score += getConsecutiveSetScore(consecutive, blocks, forBlack == playersTurn);
                consecutive = 0;
                blocks = 2;
            }
            else {
                blocks = 2;
            }
        }
        if (consecutive > 0) {

            score += getConsecutiveSetScore(consecutive, blocks, forBlack == playersTurn);

        }
        consecutive = 0;
        blocks = 2;

    }
    // console.log("Score", score);
    return score;
}
// 

let player1 = "human";
let player2 = "AI";
function evaluateVertical(board, forBlack, playersTurn) {

    let consecutive = 0;
    let blocks = 2;
    let score = 0;

    for (let j = 0; j < n; j++) {
        for (let i = 0; i < n; i++) {
            if (board[i][j] == (forBlack ? player1 : player2)) {
                consecutive++;
            }
            else if (board[i][j] == null) {
                if (consecutive > 0) {
                    blocks--;

                    score += getConsecutiveSetScore(consecutive, blocks, forBlack == playersTurn);
                    consecutive = 0;
                    blocks = 1;
                }
                else {
                    blocks = 1;
                }
            }
            else if (consecutive > 0) {

                score += getConsecutiveSetScore(consecutive, blocks, forBlack == playersTurn);
                consecutive = 0;
                blocks = 2;
            }
            else {
                blocks = 2;
            }
        }
        if (consecutive > 0) {

            score += getConsecutiveSetScore(consecutive, blocks, forBlack == playersTurn);

        }
        consecutive = 0;
        blocks = 2;
    }
    return score;
}
// 
function evaluateDiagonal(board, forBlack, playersTurn) {

    let consecutive = 0;
    let blocks = 2;
    let score = 0;
    let flag = forBlack == playersTurn
    // From bottom-left to top-right diagonally
    for (let k = 0; k <= 2 * (n - 1); k++) {
        let iStart = Math.max(0, k - n + 1);
        let iEnd = Math.min(n - 1, k);
        for (let i = iStart; i <= iEnd; ++i) {
            let j = k - i;

            if (board[i][j] == (forBlack ? player1 : player2)) {
                consecutive++;
            }
            else if (board[i][j] == null) {
                if (consecutive > 0) {
                    blocks--;

                    score += getConsecutiveSetScore(consecutive, blocks, flag);
                    consecutive = 0;
                    blocks = 1;
                }
                else {
                    blocks = 1;
                }
            }
            else if (consecutive > 0) {

                score += getConsecutiveSetScore(consecutive, blocks, flag);
                consecutive = 0;
                blocks = 2;
            }
            else {
                blocks = 2;
            }

        }
        if (consecutive > 0) {

            score += getConsecutiveSetScore(consecutive, blocks, flag);

        }
        consecutive = 0;
        blocks = 2;
    }
    // From top-left to bottom-right diagonally
    for (let k = 1 - n; k < n; k++) {
        let iStart = Math.max(0, k);
        let iEnd = Math.min(n + k - 1, n - 1);
        for (let i = iStart; i <= iEnd; ++i) {
            let j = i - k;

            if (board[i][j] == (forBlack ? player1 : player2)) {
                consecutive++;
            }
            else if (board[i][j] == null) {
                if (consecutive > 0) {
                    blocks--;

                    score += getConsecutiveSetScore(consecutive, blocks, flag);
                    consecutive = 0;
                    blocks = 1;
                }
                else {
                    blocks = 1;
                }
            }
            else if (consecutive > 0) {

                score += getConsecutiveSetScore(consecutive, blocks, flag);
                consecutive = 0;
                blocks = 2;
            }
            else {

                blocks = 2;
            }

        }
        if (consecutive > 0) {
            score += getConsecutiveSetScore(consecutive, blocks, flag);
        }
        consecutive = 0;
        blocks = 2;
    }
    return score;
}

// 
function getConsecutiveSetScore(count, blocks, currentTurn) {
    // console.log("Count", count,"blocks", blocks,"currentTuren",currentTurn)
    let winGuarantee = 1000000;
    if (blocks == 2 && count < 5) return 0;
    switch (count) {
        case 5: {
            return winScore;
        }
        case 4: {
            if (currentTurn) return winGuarantee;
            else {
                if (blocks == 0) return winGuarantee / 4;
                else return 200;
            }
        }
        case 3: {
            if (blocks == 0) {
                if (currentTurn) return 50000;
                else return 200;
            }
            else {
                if (currentTurn) return 10;
                else return 5;
            }
        }
        case 2: {
            if (blocks == 0) {
                if (currentTurn) return 7;
                else return 5;
            }
            else {
                return 3;
            }
        }
        case 1: {
            return 1;
        }
    }
    return winScore * 2;
}

