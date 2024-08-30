let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turn0 = true;
let count = 0;

const winningPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

boxes.forEach((box) => {
    box.addEventListener('click', () => {
        //console.log("box was clicked");
        if (turn0) {
            box.innerText = "O";
            turn0 = false;
        }
        else {
            box.innerText = "X"
            turn0 = true;
        }
        box.disabled = true;
        count++;

        let isWinner = checkWinner();
        if(count === 9 && !isWinner){
            gameDraw();
        }
    });
});

const gameDraw = () => {
    msg.innerText = "It's a Draw!!";
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    for (let pattern of winningPatterns) {
        //console.log(pattern);                          //print all the patterns as array
        //console.log(pattern[0], pattern[1], pattern[2]); //print all the patterns as text
        //console.log(boxes[pattern[0]], boxes[pattern[1]], boxes[pattern[2]]);

        /*console.log(boxes[pattern[0]].innerText, 
                    boxes[pattern[1]].innerText, 
                    boxes[pattern[2]].innerText);
        */
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        //now we have to check if the pos1 pos2 and pos3 are empty or not and then we have to check if they have the same value
        if (pos1Val != '' && pos2Val != '' && pos3Val != '') {
            if (pos1Val === pos2Val && pos2Val == pos3Val) {         // check for winning pattern
                //console.log("winner", pos1Val);                    // display the result in console
                showWinner(pos1Val);
                return true;
            }
        }
    }
}

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations! Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const resetGame = () => {
    turn0 = false;
    enableBoxes();
    msgContainer.classList.add("hide");

}

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};



newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
