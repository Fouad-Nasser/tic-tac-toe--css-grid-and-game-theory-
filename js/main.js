/*============================ VARIABLES =====================================*/ 
let oMark =document.getElementById("o-mark");
let onePlayer =document.getElementById("one-player");
let endGame = document.getElementById("end-game");
let endGameMsg = document.querySelector("#end-game p");
let playAgainBtn = document.getElementById("play-again-btn");
let endGameBtn = document.getElementById("end-game-btn");
let selectPlayerDiv = document.getElementById('select-players-div');
let turnPlayer = document.getElementById("turn-player")
let startPage = document.getElementById("start-page");
let playPage = document.getElementById("playPage");

let cells = document.getElementsByClassName("cell");
let chooseBtns = document.getElementsByClassName("choose-radio");
let markChooseBtns = document.getElementsByClassName("mark");
let gameChooseBtns = document.getElementsByClassName("game-type");
let startBtn = document.querySelector(".start-btn");

let choicesNum = 0;
let turn = 'x';
let canPlay = true;
let a = [' ',' ',' ',' ',' ',' ',' ',' ',' '];


/*==============================================================================*/





/*============================= HELPER FUNCTIONS =======================*/
function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

function printMark(obj, mark, i, color, alterColor, turnPlayerMsg){
    obj.style.color = color
    obj.innerHTML = mark;
    a[i] = mark;
    turnPlayer.style.color = alterColor;
    turnPlayer.innerText = turnPlayerMsg;
}


function checkWinner(value){
    if (value != 1) {
        if (value === 2) {
            showEndGame("X is The Winner", "crimson");            
        }
        else if(value === -2)
        {
            showEndGame("O is The Winner", "cyan");
        }
        else
        {
            showEndGame("Players tieied", "#FFF");
        }
    }
}


function checkWinnerMark(mark){
    switch (mark) {
        case 'x':
            return 2;
        case 'o':
            return -2;
    }
}


/*=================================================================================*/





function altrCheckedStyle(){
    // debugger;
        if (this.name === "game-type") {
            choicesNum = 1;
            console.log(choicesNum);
            selectPlayerDiv.style.display = "block";
            for (const btn of gameChooseBtns) {
    
                let btnId = btn.id;
                let label = document.querySelector('label[for*=' + btnId + '] span')
        
                if(btn.checked)
                {
                    label.classList.add("checked");
                    if (btnId === "two-player") {
                        selectPlayerDiv.style.display = "none";
                    }
                }
                else
                {
                    label.classList.remove("checked")
                }
            }
        }
        else
        {
            choicesNum = 2;
            console.log(choicesNum);
            for (const btn of markChooseBtns) {
    
                let btnId = btn.id;
                let label = document.querySelector('label[for*=' + btnId + '] span')
        
                if(btn.checked)
                {
                    label.classList.add("checked")
                }
                else
                {
                    label.classList.remove("checked")
                }
            }
        }
        
}


function winner(){
        for (let i=0,x=-4; i < 4; i++,x++) {
            if (a[(4+x)]===a[4] && a[4]== a[(4-x)] && a[(4+x)] !=' ')
            {
                return checkWinnerMark(a[(4+x)]);                
            } 
        }
        
        for (let i=0,x=0; i < 2; i++,x+=6) {
    
            if (a[(0+x)]===a[(1+x)] && a[(1+x)]===a[(2+x)] && a[(1+x)] !=' ')
            {
                return checkWinnerMark(a[(0+x)]);                
            } 
        }
    
        for (let i=0,x=0; i < 2; i++,x+=2) {
    
            if (a[(0+x)]===a[(3+x)] && a[(3+x)]===a[(6+x)] && a[(0+x)] !=' ')
            {
                return checkWinnerMark(a[(0+x)]);                
            } 
        }

    
        let tie = true;

        for (let i = 0; i < 9; i++)
        {
                if (a[i] === ' ')
                {
                    tie = false;
                }
            
        }
        
        if (tie)
        {
            return 0;
        }
        return 1;
    
}



function minMax(depth, isMax,firsTime = true){
    let result = winner();

    if (depth == 0 || result != 1)
    {
        return result;
    }

    if (isMax)
    {
        let finalI, finalScore = -100;
        for (let i = 0; i < 9; i++)
        {
                if (a[i] === ' ')
                {
                    a[i] = 'x';
                    let score = minMax(depth - 1, false, false);
                    a[i] = ' ';

                    if (score > finalScore)
                    {
                        finalScore = score;
                        finalI=i;
                    }
                    
                }
        }

        if (firsTime)
        {
            printMark(
                cells[finalI],
                'x',
                finalI,
                'crimson',
                'cyan',
                'Turn of O Player'
            );
            let winnerValue = winner(); 
            checkWinner(winnerValue);
            canPlay = true;
        }
        return finalScore;
    }
    else
    {
        let finalI, finalScore = 100;
        for (let i = 0; i < 9; i++)
        {
                if (a[i] === ' ')
                {
                    a[i] = 'o';
                    let score = minMax(depth - 1, true, false);
                    a[i] = ' ';

                    if (score < finalScore)
                    {
                        finalScore = score;
                        finalI=i;
                    }
                } 
        }
        if (firsTime)
        {
            printMark(
                cells[finalI],
                'o',
                finalI,
                'cyan',
                'crimson',
                'Turn of X Player'
            );
            let winnerValue = winner(); 
            checkWinner(winnerValue);
            canPlay = true;
        }
        return finalScore;
    }
}


function autoPlay(){   
    if (this.innerHTML === '' && canPlay) {
        let index = getKeyByValue(cells,this);
        canPlay=false;

        if (oMark.checked) {
            printMark(
                this,
                'o',
                index,
                'cyan',
                'crimson',
                'Turn of X Player'
            );
            setTimeout(minMax,1500,9,true);
        }
        else
        {
            printMark(
                this,
                'x',
                index,
                'crimson',
                'cyan',
                'Turn of O Player'
            );
            setTimeout(minMax,1500,9,false);
        }
        
    }
    let winnerValue = winner(); 
    checkWinner(winnerValue);
}


function Play(){
    // debugger;
    if (turn==='x' && this.innerHTML === '') {
        let index = getKeyByValue(cells,this);
        printMark(
            this,
            'x',
            index,
            'crimson',
            'cyan',
            'Turn of O Player'
        );
        turn = 'o';
    }
    else if (turn==='o' && this.innerHTML === ''){
        let index = getKeyByValue(cells,this);
        printMark(
            this,
            'o',
            index,
            'cyan',
            'crimson',
            'Turn of X Player'
        );
        turn = 'x';
    }

    let winnerValue = winner(); 
    checkWinner(winnerValue);

}



function showEndGame(msg, color){
    endGameMsg.style.color = color;
    endGameMsg.innerHTML = msg;
    endGame.style.display = "flex";
}




for (const btn of chooseBtns) {
    btn.onclick = altrCheckedStyle;
}


startBtn.onclick = ()=>{
    if (choicesNum === 0) {
        alert("Select players number");
        return;
    }
    else if (choicesNum === 1 && onePlayer.checked) {
        alert("select your mark");
        return;
    }
    startPage.style.display = 'none';
    playPage.style.display = 'grid'
    console.log(onePlayer.checked,oMark.checked);

    if (onePlayer.checked) {
        if (oMark.checked) {
            canPlay = false;
            setTimeout(minMax,1500,9,true);
        }
        for (const i of cells) {
            i.onclick = autoPlay;
        }
    }
    else
    {
        for (const i of cells) {
            i.onclick = Play;
        }
        
    }
}


playAgainBtn.onclick = ()=>{
    location.reload();
};

endGameBtn.onclick = ()=>{
        history.back()
        window.close();
        
};

