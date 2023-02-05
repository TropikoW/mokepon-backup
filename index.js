const spanPlayerMascot = document.querySelector('#player-mascot');
const spanEnemyMascot = document.querySelector('#enemy-mascot');
const spanlifesPlayer = document.querySelector('#lifes-player');
const spanlifesEnemy = document.querySelector('#lifes-enemy');

const buttonMascotPlayer = document.querySelector('#button-mascot');
const buttonReload = document.querySelector('#button-reload');

const containerTarjets = document.querySelector('#container-tarjets');
const sectionMessage = document.querySelector('#result');
const sectionSelectMascot = document.querySelector('#select-mascot');
const sectionSelectAttack = document.querySelector('#select-attack');
const attackOfPlayer = document.querySelector('#attack-of-player');
const attackOfEnemy = document.querySelector('#attack-of-enemy');
const containerAttacks = document.querySelector('#container-attacks');
const sectionReload = document.querySelector('#reload');

let inputHipodoge;
let inputCapipepo;
let inputRatigueya;
let playerWins = 0;
let enemyWins = 0;
let lifesPlayer = 3;
let lifesEnemy = 3;
let attacksMokepon;
let attacksMokeponEnemy;
let firstAttackPlayer;
let firstAttackEnemy;
let mascotPlayer;
let optionMokepons;
let buttonFire;
let buttonWater;
let buttonEarth;

// this array save all the attacks from enemy in the actually game
let attackEnemy = [];

// this array save all the attacks from player in the actually game
let attackPlayer = [];

// this array save all interactions from power of characters
let buttons = [];

// this array save all the characters of game
let mokepons = [];

// this is the structure for each from mokepons
class Mokepon {
    constructor(name,photo,life,) {
        this.name = name;
        this.photo = photo;
        this.life = life;
        this.attacks = [];
    }
};

let hipodoge = new Mokepon('Hipodoge','./assets/mokepons_mokepon_hipodoge_attack.png',5);

let capipepo = new Mokepon('Capipepo','./assets/mokepons_mokepon_capipepo_attack.png',5);

let ratigueya = new Mokepon('Ratigueya','./assets/mokepons_mokepon_ratigueya_attack.png',5);

hipodoge.attacks.push(
    {name : '💧' , id: 'button-water'},
    {name : '💧' , id: 'button-water'},
    {name : '💧' , id: 'button-water'},
    {name : '🔥' , id: 'button-fire'},
    {name : '🌱' , id: 'button-earth'},
);
capipepo.attacks.push(
    {name : '🌱' , id: 'button-earth'},
    {name : '🌱' , id: 'button-earth'},
    {name : '🌱' , id: 'button-earth'},
    {name : '💧' , id: 'button-water'},
    {name : '🔥' , id: 'button-fire'},
    );
ratigueya.attacks.push(
    {name : '🔥' , id: 'button-fire'},
    {name : '🔥' , id: 'button-fire'},
    {name : '🔥' , id: 'button-fire'},
    {name : '💧' , id: 'button-water'},
    {name : '🌱' , id: 'button-earth'},
);

mokepons.push(hipodoge,capipepo,ratigueya)

// with this function i can stard the game when the dom full load
function startGame() {
    // this line code used to hide the button reload
    sectionReload.style.display = 'none';
    /////////////////////////////////////////////

    mokepons.forEach((mokepon)=> {
        optionMokepons = `
            <input type="radio" name="mascot" id="${mokepon.name}">
            <label for="${mokepon.name}" class="tarjet-of-mokepon">
                <p>${mokepon.name}</p>
                <img src="${mokepon.photo}" alt="${mokepon.name}">
            </label>
        `
        containerTarjets.innerHTML += optionMokepons;

        inputHipodoge = document.querySelector('#Hipodoge');
        inputCapipepo = document.querySelector('#Capipepo');
        inputRatigueya =  document.querySelector('#Ratigueya');
    });

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
            spanPlayerMascot.innerText = inputHipodoge.id;
            mascotPlayer = inputHipodoge.id;
        } else if(inputCapipepo.checked) {
            spanPlayerMascot.innerText = inputCapipepo.id;
            mascotPlayer = inputHipodoge.id;
        } else if(inputRatigueya.checked) {
            spanPlayerMascot.innerText = inputRatigueya.id;
            mascotPlayer = inputHipodoge.id;
        } else {
            alert('you did not select mascot')
        }
        extractAttacks(mascotPlayer);
        selectMascotEnemy();
    };
    // here finally the function selectMascotPlayer

    function extractAttacks(mascotPlayer) {
        let attacks;
        for(let i = 0 ; i < mokepons.length; i++) {
            if(mascotPlayer === mokepons[i].name) {
                attacks = mokepons[i].attacks;
            }
        };
        showAttacks(attacks);
    };

    function showAttacks(attacks) {
        attacks.forEach((attack)=> {
            attacksMokepon = `
            <button id=${attack.id} class="button-of-attack b-attack">${attack.name}</button>
            `
            containerAttacks.innerHTML += attacksMokepon;
        });

        buttonFire = document.querySelector('#button-fire');
        buttonWater = document.querySelector('#button-water');
        buttonEarth = document.querySelector('#button-earth');
        buttons = document.querySelectorAll('.b-attack')

    };

    function attackSequence() {
        buttons.forEach((button)=> {
            button.addEventListener('click',(e)=>{
                if(e.target.textContent === '💧') {
                    attackPlayer.push('Water');
                    console.log(attackPlayer);
                    button.style.background = '#112f58';
                    button.disabled = true;
                } else if(e.target.textContent === '🔥') {
                    attackPlayer.push('Fire');
                    console.log(attackPlayer);
                    button.style.background = '#112f58';
                    button.disabled = true;
                } else {
                    attackPlayer.push('Earth');
                    console.log(attackPlayer);
                    button.style.background = '#112f58';
                    button.disabled = true;
                };
                randomAttackEnemy();
            });
        });
    };

    // the function is used for return a number random
    function random(min,max) {
        return Math.floor(Math.random() * (max-min +1) + min);
    };
    // here finally the function random

    // with this function select the enemy with an basic logic of 'else if'
    function selectMascotEnemy() {
        let randomMascot = random(0,mokepons.length -1);
        spanEnemyMascot.innerText = mokepons[randomMascot].name;
        attacksMokeponEnemy = mokepons[randomMascot].attacks;
        attackSequence();
    };
    // here finally the function selectMascotEnemy

    // this function return me the attack random from enemy
    function randomAttackEnemy() {
        let attackRandom = random(0,attacksMokeponEnemy.length -1);
        if(attackRandom ==  0  || attackRandom == 1) {
            attackEnemy.push('Fire');
        } else if(attackRandom == 3 || attackRandom == 4) {
            attackEnemy.push('Water');
        } else {
            attackEnemy.push('Earth');
        }
        console.log(attackRandom);
        console.log(attackEnemy);
        startFight()
    };
    // here finally the function randomAttackEnemy

    // with this function i can validate the length of combat from player
    function startFight() {
        if(attackPlayer.length === 5) {
            combat();
        };
    };
    
    function firstBothOpponents(player,enemy) {
        firstAttackPlayer = attackPlayer[player];
        firstAttackEnemy = attackEnemy[enemy];
    };

    // with this function the attack begins
    function combat() {

        for(let i = 0 ; i < attackPlayer.length; i++) {
            if(attackPlayer[i] === attackEnemy[i]) {
                firstBothOpponents(i,i);
                createMessage('No winner 😣');
            } else if(attackPlayer[i] === 'Fire' && attackEnemy[i] === 'Earth') {
                firstBothOpponents(i,i);
                createMessage('You win🦾');
                playerWins ++;
                spanlifesPlayer.innerText = playerWins;
            } else if(attackPlayer[i] === 'Water' && attackEnemy[i] === 'Fire') {
                firstBothOpponents(i,i);
                createMessage('You win🦾');
                playerWins ++;
                spanlifesPlayer.innerText = playerWins;
            } else if(attackPlayer[i] === 'Earth' && attackEnemy[i] === 'Water') {
                firstBothOpponents(i,i);
                createMessage('You win🦾');
                playerWins ++;
                spanlifesPlayer.innerText = playerWins;
            } else {
                firstBothOpponents(i,i);
                createMessage('You loss😥');
                enemyWins ++;
                spanlifesEnemy.innerText = enemyWins;
            };
            reviewVictory();
        };
    };
    // here finally the function combat

    // this function create me an message with the result from battle
    function createMessage(result) {
        let newAttackPlayer = document.createElement('p');
        let newAttackEnemy = document.createElement('p');

        sectionMessage.innerText = result;
        newAttackPlayer.innerText = firstAttackPlayer;
        newAttackEnemy.innerText = firstAttackEnemy;

        attackOfPlayer.appendChild(newAttackPlayer);
        attackOfEnemy.appendChild(newAttackEnemy);
    };  
    // here finally the function createMessage

    function reviewVictory() {
        if(playerWins === enemyWins) {
            createFinalMessage('This game ended without an winner!');
        } else if(playerWins > enemyWins) {
            createFinalMessage('Congratulations, You win the game');
        } else {
            createFinalMessage('Oh no!, you loss the game!');
        }
    };

    function createFinalMessage(finalResult) {
        let sectionFinalMessage = document.createElement('p');
        sectionMessage.appendChild(sectionFinalMessage)
        sectionMessage.innerText = finalResult;
        sectionReload.style.display = 'block';
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