/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores, roundScore, activePlayer, gamePlaying;

let lastDice;
let scoreValue;

init();

// '#current-' + activePlayer - bc of type conversion JS will convert this to 'current-0' or 'current-1' 
// document.querySelector('#current-' + activePlayer).textContent = dice;

// with textContent you can only set text and not HTML so have to use innerHTML if you want to set HTML element 
// whenever you write HTML in JS, has to be in a string 
// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

// let x = document.querySelector('#score-0').textContent;
// console.log(x)


let rollDice = document.querySelector('.btn-roll'); 

// callbackfunction - event listener function calls another function btn or an anonymous function - a function that does not have a name so it cannot be reused. 
rollDice.addEventListener('click', function() {
    if (gamePlaying) {
        // 1. random number 
        let dice1 = Math.floor(Math.random() * 6) + 1;
        let dice2 = Math.floor(Math.random() * 6) + 1;

        // 2. display result 
        // let diceDOM = document.querySelector('.dice');
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';
        // diceDOM.style.display = 'block';
        // diceDOM.src = 'dice-' + dice + '.png';

        // 3. update the round score but only IF the rolled number was NOT a 1 
        // if (dice === 6 && lastDice === 6) {
        //     // challenge 1
        //     // player looses score
        //     scores[activePlayer] = 0;
        //     // document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        //     // or just set it to zero since we know that is the value
        //     document.querySelector('#score-' + activePlayer).textContent = '0';
        //     nextPlayer();
        // } else if (dice-1 !== 1 || dice-2 !== 1) {
        //     // add score 
        //     // roundScore = (current) roundScore + dice; 
        //     roundScore += dice; 
        //     document.querySelector('#current-' + activePlayer).textContent = roundScore;

        // } else {
        //     // next player 
        //     nextPlayer();
        // }
        // challenge 3
        if (dice1 !== 1 && dice2 !== 1) {
            // add score 
            // roundScore = (current) roundScore + dice; 
            roundScore += (dice1 + dice2); 
            document.querySelector('#current-' + activePlayer).textContent = roundScore;

        } else {
            // next player 
            nextPlayer();
        }

        // challenge 1
        // lastDice stores previous dice roll
        // lastDice = dice; 
    }
});

document.querySelector('.btn-hold').addEventListener('click', function(){

    if (gamePlaying) {
        // add current score to global score 
        // scores[activePlayer] = scores[activePlayer] + roundScore;
        scores[activePlayer] += roundScore;

        // update the UI 
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer]
        
        // challenge 2
        scoreValue = document.querySelector('.score-value').value;
        // console.log(scoreValue);
        let winningScore;

        if (scoreValue) {
            winningScore = scoreValue;
        } else {
            winningScore = 100;
        }
        
        // check if player won the game 
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!'

            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';

            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            // next player 
            nextPlayer();
        }
    }
});


function nextPlayer() {
     // next player 
     activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
     roundScore = 0;
     document.getElementById('current-0').textContent = '0';
     document.getElementById('current-1').textContent = '0';

     document.querySelector('.player-0-panel').classList.toggle('active');
     document.querySelector('.player-1-panel').classList.toggle('active');

     document.getElementById('dice-1').style.display = 'none';
     document.getElementById('dice-2').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true; 

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';

    // can use queryselector as well
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)

2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)

3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/
