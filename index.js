const inputHipodoge = document.querySelector('#hipodoge');
const inputCapipepo = document.querySelector('#capipepo');
const inputRatigueya = document.querySelector('#ratigueya');

const spanPlayerMascot = document.querySelector('#player-mascot');
const spanEnemyMascot = document.querySelector('#enemy-mascot');
const spanlifesPlayer = document.querySelector('#lifes-player');
const spanlifesEnemy = document.querySelector('#lifes-enemy');

const buttonMascotPlayer = document.querySelector('#button-mascot');
const buttonFire = document.querySelector('#button-fire');
const buttonWater = document.querySelector('#button-water');
const buttonEarth = document.querySelector('#button-earth');
const buttonReload = document.querySelector('#button-reload');

const sectionMessage = document.querySelector('#result');
const sectionSelectMascot = document.querySelector('#select-mascot');
const sectionSelectAttack = document.querySelector('#select-attack');
const attackOfPlayer = document.querySelector('#attack-of-player');
const attackOfEnemy = document.querySelector('#attack-of-enemy');
const sectionReload = document.querySelector('#reload');


let attackPlayer;
let attackEnemy;
let lifesPlayer = 3;
let lifesEnemy = 3;

// with this function i can stard the game when the dom full load
function startGame() {
    // this line code used to hide the button reload
    sectionReload.style.display = 'none';
    /////////////////////////////////////////////
    // this line code to hide the section attack
    sectionSelectAttack.style.display = 'none';
    ////////////////////////////////////////////

    buttonMascotPlayer.addEventListener('click',selectMascotPlayer);

    // with this function i can validate if some input is select
    function selectMascotPlayer() {
        // this line code to show the section attack
        sectionSelectAttack.style.display = 'flex';
        ////////////////////////////////////////////
        // this line code to hide the section select mascot
        sectionSelectMascot.style.display = 'none';
        ////////////////////////////////////////////

        if(inputHipodoge.checked) {
            spanPlayerMascot.innerText = 'Hipodoge';
        } else if(inputCapipepo.checked) {
            spanPlayerMascot.innerText = 'Capipepo';
        } else if(inputRatigueya.checked) {
            spanPlayerMascot.innerText = 'Ratigueya';
        } else {
            alert('you did not select mascot')
        }
        selectMascotEnemy();
    };
    // here finally the function selectMascotPlayer

    // the function is used for return a number random
    function random(min,max) {
        return Math.floor(Math.random() * (max-min +1) + min);
    }
    // here finally the function random

    // with this function select the enemy with an basic logic of 'else if'
    function selectMascotEnemy() {
        let randomMascot = random(0,2);
        if(randomMascot === 0) {
            spanEnemyMascot.innerText = 'Hipodoge';
        } else if(randomMascot === 1) {
            spanEnemyMascot.innerText = 'Capipepo';
        } else {
            spanEnemyMascot.innerText = 'Ratigueya';
        };
    };
    // here finally the function selectMascotEnemy

    // this function generate me with an click for to go that the button selected user
    buttonFire.addEventListener('click',fireAttack);

    function fireAttack() {
        attackPlayer = 'Fire';
        randomAttackEnemy();
    };
    // here finally the funcion fireAttack

    // this function generate me with an click for to go that the button selected user
    buttonWater.addEventListener('click',waterAttack);

    function waterAttack() {
        attackPlayer = 'Water';
        randomAttackEnemy();
    };
    // here finally the function waterAttack

    // this function generate me with an click for to go that the button selected user
    buttonEarth.addEventListener('click',earthAttack);

    function earthAttack() {
        attackPlayer = 'Earth';
        randomAttackEnemy();
    };
    // here finally the function earthAttack

    // this function return me the attack random from enemy
    function randomAttackEnemy() {
        let attackRandom = random(0,2);
        if(attackRandom ===  0) {
            attackEnemy = 'Fire';
        } else if(attackRandom == 1) {
            attackEnemy = 'Water';
        } else {
            attackEnemy = 'Earth'
        }
        combat();
    };
    // here finally the function randomAttackEnemy
    
    // with this function the attack begins
    function combat() {
        if(attackPlayer  == attackEnemy) {
            createMessage('No winner 😣')
        } else if(attackPlayer == 'Fire' && attackEnemy == 'Earth') {
            createMessage('You win🦾')
            lifesEnemy -= 1;
            spanlifesEnemy.innerText = lifesEnemy;
        } else if(attackPlayer == 'Water' && attackEnemy == 'Fire') {
            createMessage('You win🦾')
            lifesEnemy -= 1;
            spanlifesEnemy.innerText = lifesEnemy;
        } else if(attackPlayer == 'Earth' && attackEnemy == 'Water') {
            createMessage('You win🦾')
            lifesEnemy -= 1;
            spanlifesEnemy.innerText = lifesEnemy;
        } else {
            createMessage('You loss😥')
            lifesPlayer -= 1;
            spanlifesPlayer.innerText = lifesPlayer;
        };
        reviewLives();
    };
    // here finally the function combat

    // this function create me an message with the result from battle
    function createMessage(result) {
        let newAttackPlayer = document.createElement('p');
        let newAttackEnemy = document.createElement('p');

        sectionMessage.innerText = result;
        newAttackPlayer.innerText = attackPlayer;
        newAttackEnemy.innerText = attackEnemy;

        attackOfPlayer.appendChild(newAttackPlayer);
        attackOfEnemy.appendChild(newAttackEnemy);
    };  
    // here finally the function createMessage

    function reviewLives() {
        console.log('ReviewLives');
        if(lifesPlayer === 0) {
            createFinalMessage('Im sorry, you loss the game');
        } else if(lifesEnemy === 0) {
            createFinalMessage('Congratulations, You win the game');
        };
    };

    function createFinalMessage(finalResult) {
        let sectionFinalMessage = document.createElement('p');
        sectionMessage.appendChild(sectionFinalMessage)
        sectionMessage.innerText = finalResult;
        sectionReload.style.display = 'block';
        
        buttonFire.disabled = true;
        buttonEarth.disabled = true;
        buttonWater.disabled = true; 
    };

    // this button used for reload the game when the function combat return the player win
    buttonReload.addEventListener('click',reloadGame)

    function reloadGame() {
        location.reload();
    };
    // here finally the function reloadGame
    
};
// here finally the function startGame

window.addEventListener('load',startGame)