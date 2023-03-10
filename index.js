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
const sectionSeeMap = document.querySelector('#see-map');
const map = document.querySelector('#map');
const attackOfPlayer = document.querySelector('#attack-of-player');
const attackOfEnemy = document.querySelector('#attack-of-enemy');
const containerAttacks = document.querySelector('#container-attacks');
const sectionReload = document.querySelector('#reload');

let inputHipodoge;
let inputCapipepo;
let inputRatigueya;
let inputLangostelvis;
let inputPydos;
let inputTucapalma;

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

let canvas = map.getContext('2d');

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
    constructor(name,photo,type,life) {
        this.name = name;
        this.photo = photo;
        this.life = life;
        this.type = type;
        this.attacks = [];
        this.x = 20;
        this.y = 30; /*value vertical */
        this.width = 80; /*horizontal value */
        this.heigth = 80;
        this.mapPhoto = new Image();
        this.mapPhoto.src = photo;
    };
};

let hipodoge = new Mokepon('Hipodoge','./assets/mokepons_mokepon_hipodoge_attack.png',5);

let capipepo = new Mokepon('Capipepo','./assets/mokepons_mokepon_capipepo_attack.png',5);

let ratigueya = new Mokepon('Ratigueya','./assets/mokepons_mokepon_ratigueya_attack.png',5);

let langostelvis = new Mokepon('Langostelvis','./assets/mokepons_mokepon_langostelvis_attack.png','Fire',5);

let pydos = new Mokepon('Pydos','./assets/mokepons_mokepon_pydos_attack.png','Water',5);

let tucapalma = new Mokepon('Tucapalma','./assets/mokepons_mokepon_tucapalma_attack.png','Earth',5)

hipodoge.attacks.push(
    {name : '????' , id: 'button-water'},
    {name : '????' , id: 'button-water'},
    {name : '????' , id: 'button-water'},
    {name : '????' , id: 'button-fire'},
    {name : '????' , id: 'button-earth'},
);
capipepo.attacks.push(
    {name : '????' , id: 'button-earth'},
    {name : '????' , id: 'button-earth'},
    {name : '????' , id: 'button-earth'},
    {name : '????' , id: 'button-water'},
    {name : '????' , id: 'button-fire'},
    );
ratigueya.attacks.push(
    {name : '????' , id: 'button-fire'},
    {name : '????' , id: 'button-fire'},
    {name : '????' , id: 'button-fire'},
    {name : '????' , id: 'button-water'},
    {name : '????' , id: 'button-earth'},
);
langostelvis.attacks.push(
    {name : '????' , id: 'button-fire'},
    {name : '????' , id: 'button-fire'},
    {name : '????' , id: 'button-fire'},
    {name : '????' , id: 'button-fire'},
    {name : '????' , id: 'button-earth'},
    {name : '????' , id: 'button-water'},
);
pydos.attacks.push(
    {name : '????' , id: 'button-water'},
    {name : '????' , id: 'button-water'},
    {name : '????' , id: 'button-water'},
    {name : '????' , id: 'button-water'},
    {name : '????' , id: 'button-earth'},
    {name : '????' , id: 'button-fire'},
);
tucapalma.attacks.push(
    {name : '????' , id: 'button-earth'},
    {name : '????' , id: 'button-earth'},
    {name : '????' , id: 'button-earth'},
    {name : '????' , id: 'button-earth'},
    {name : '????' , id: 'button-water'},
    {name : '????' , id: 'button-fire'},
);

mokepons.push(hipodoge,capipepo,ratigueya,langostelvis,pydos,tucapalma)

// with this function i can stard the game when the dom full load
function startGame() {
    // this line code used to hide the button reload
    sectionReload.style.display = 'none';
    /////////////////////////////////////////////

    // this line code used to hide the section of canvas
    sectionSeeMap.style.display = 'none';
    ////////////////////////////////////////////

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
        inputLangostelvis = document.querySelector('#Langostelvis')
        inputPydos = document.querySelector('#Pydos');
        inputTucapalma = document.querySelector('#Tucapalma');

    });

    // this line code to hide the section attack
    sectionSelectAttack.style.display = 'none';
    ////////////////////////////////////////////

    buttonMascotPlayer.addEventListener('click',selectMascotPlayer);

    // with this function i can validate if some input is select
    function selectMascotPlayer() {
        // this line code to hide the section select mascot
        sectionSelectMascot.style.display = 'none';
        ////////////////////////////////////////////

        // this line code to show the section attack
        //sectionSelectAttack.style.display = 'flex';
        ////////////////////////////////////////////

        sectionSeeMap.style.display = 'flex';
        
        if(inputHipodoge.checked) {
            spanPlayerMascot.innerText = inputHipodoge.id;
            mascotPlayer = inputHipodoge.id;
        } else if(inputCapipepo.checked) {
            spanPlayerMascot.innerText = inputCapipepo.id;
            mascotPlayer = inputCapipepo.id;
        } else if(inputRatigueya.checked) {
            spanPlayerMascot.innerText = inputRatigueya.id;
            mascotPlayer = inputRatigueya.id;
        } else if(inputLangostelvis.checked){
            spanPlayerMascot.innerText = inputLangostelvis.id;
            mascotPlayer = inputLangostelvis.id;
        } else if(inputPydos.checked) {
            spanPlayerMascot.innerText = inputPydos.id
            mascotPlayer = inputPydos.id;
        } else if (inputTucapalma.checked) {
            spanPlayerMascot.innerText = inputTucapalma.id;
            mascotPlayer = inputTucapalma.id;
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
                if(e.target.textContent === '????') {
                    attackPlayer.push(e.target.textContent);
                    console.log(attackPlayer);
                    button.style.background = '#112f58';
                    button.disabled = true;
                } else if(e.target.textContent === '????') {
                    attackPlayer.push(e.target.textContent);
                    console.log(attackPlayer);
                    button.style.background = '#112f58';
                    button.disabled = true;
                } else {
                    attackPlayer.push(e.target.textContent);
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
        if(attackRandom ==  0  || attackRandom == 2) {
            attackEnemy.push(attacksMokeponEnemy[0].name);
        } else if(attackRandom == 3) {
            attackEnemy.push(attacksMokeponEnemy[3].name);
        } else {
            attackEnemy.push(attacksMokeponEnemy[4].name);
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
                createMessage('No winner ????');
            } else if(attackPlayer[i] === '????' && attackEnemy[i] === '????') {
                firstBothOpponents(i,i);
                createMessage('You win????');
                playerWins ++;
                spanlifesPlayer.innerText = playerWins;
            } else if(attackPlayer[i] === '????' && attackEnemy[i] === '????') {
                firstBothOpponents(i,i);
                createMessage('You win????');
                playerWins ++;
                spanlifesPlayer.innerText = playerWins;
            } else if(attackPlayer[i] === '????' && attackEnemy[i] === '????') {
                firstBothOpponents(i,i);
                createMessage('You win????');
                playerWins ++;
                spanlifesPlayer.innerText = playerWins;
            } else if(attackPlayer[i] === '????' && attackEnemy[i] === '????'){
                firstBothOpponents(i,i);
                createMessage('You win????');
                playerWins ++;
                spanlifesPlayer.innerText = playerWins;
            }else {
                firstBothOpponents(i,i);
                createMessage('You loss????');
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

function paintCharacter() {
    canvas.clearRect(0,0,304, 154);
    canvas.drawImage( /*drawImage is a function for extract to image */
    capipepo.mapPhoto,  /* this var save the image from the characters */
    capipepo.x, /*<--position x*/
    capipepo.y, /*<--position y */
    capipepo.width, /*<--value with */
    capipepo.heigth/*<--value higth */
);
};

function moveCapipepo() {
    capipepo.x = capipepo.x +5; /*with this line code i can move to capipepo in direction to the 'x' and add buttons movements */
    paintCharacter()
};

// here finally the function startGame

window.addEventListener('load',startGame)