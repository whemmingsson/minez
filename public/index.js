
let board = [];

const countNeighborsWithBombs = (i, j) => {
    let count = 0;

    console.log(i,j);

    if(i < 10-1 &&  board[i+1][j].bomb)     
        count++;
    if(j < 20-1 && board[i][j+1].bomb)     
        count++;
    if(i < 10-1 && j < 20-1  && board[i+1][j+1].bomb)     
        count++;
    if(j > 0  && board[i][j-1].bomb)     
        count++;
    if(i > 0 && board[i-1][j].bomb)     
        count++;
    if(j < 20-1 && i > 0 &&  board[i-1][j+1].bomb)     
        count++;
    if(i > 0 && j > 0  && board[i-1][j-1].bomb)     
        count++;
    if(j > 0 && i < 10-1  && board[i+1][j-1].bomb)     
        count++;

    return count;
}

const createBoard = () => {
    const game = document.getElementById("game");
    for(let i = 0; i < 10; i++) {
        const divRow = document.createElement("div");

        board[i] = [];
        for(let j = 0; j < 20; j++) {
            const square = document.createElement("span");  

            square.setAttribute("class", "square"); 
            square.setAttribute("data-row", i);
            square.setAttribute("data-col", j);
      
            divRow.appendChild(square);  

            let data = {
                bomb: Math.floor(Math.random() * 100) > 50 
            };
            
            board[i][j] = data;

            if(data.bomb) {
                let bomb = document.createElement("i");
                bomb.setAttribute("class", "fa fa-bomb");
                square.appendChild(bomb);
            }
        }

        divRow.setAttribute("class", "row");
        game.appendChild(divRow); 
    } 

    console.log(board);

    for(let i = 0; i < 10; i++) {     
        for(let j = 0; j < 20; j++) {
            if(!board[i][j].bomb) {
                board[i][j].nearbyBombs = countNeighborsWithBombs(i,j);
                let square =  document.querySelector("span[data-row='" + i +"'][data-col='" + j + "']");
                square.setAttribute("data-n", board[i][j].nearbyBombs);
                square.innerHTML = board[i][j].nearbyBombs;
            }
        }
    }  
}

const setup = (e) => {
    console.log("setup");
    createBoard();
}

document.body.onload = setup;
