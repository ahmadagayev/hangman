const wordE1 = document.getElementById('word');
const wrongLetterE1 = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll(".figure-part");

const words = ['application','programming','interface','wizard','hangman','hello'];
console.log(words);

let selectedWord = words[Math.floor(Math.random()* words.length)];

const correctLetters = [];
const wrongLetters=[];

// Show hidden word
function displayWord(){
    wordE1.innerHTML = `
    ${selectedWord
        .split('')
        .map(
            letter =>`
            <span class="letter">
            ${correctLetters.includes(letter)? letter : ''}
            </span>
            `
        )
        .join('')}
        `;

        const innerWord = wordE1.innerText.replace(/\n/g, '');

        if(innerWord === selectedWord){
            finalMessage.innerText = 'Congratulations! You Won!';
            popup.style.display= 'flex';
        }
}

// Update the wrong letter 
function updateWrongLetterE1(){
    //display wrong letters
    wrongLetterE1.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>': ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;

    //display parts
    figureParts.forEach((part,index)=>{
        const errors = wrongLetters.length;
        if(index < errors){
            part.style.display = 'block';
        }
        else{
            part.style.display = 'none';
        }
    });

    //Check if lost
    if(wrongLetters.length === figureParts.length){
        finalMessage.innerText = 'Unfortunately you lost.';
        popup.style.display = 'flex';
    }
}

//show nitification
function showNotification(){
    notification.classList.add('show');

    setTimeout(()=>{
        notification.classList.remove('show');
    },2000);
}

//Keydown letter press

window.addEventListener('keydown',e=>{
    if(e.keyCode >=65 && e.keyCode <=90){
        const letter = e.key;

        if(selectedWord.includes(letter)){
            if(!correctLetters.includes(letter)){
                correctLetters.push(letter);

                displayWord();
            }else{
                showNotification();
            }
        }else{
            if(!wrongLetters.includes(letter)){
                wrongLetters.push(letter);

                updateWrongLetterE1();
            }else{
                showNotification();
            }
        }
    }
})

//Restart game and paly again
playAgainBtn.addEventListener('click', ()=>{
    //Empty arrays
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = words[Math.floor(Math.random() * words.length)];

    displayWord();

    updateWrongLetterE1();

    popup.style.display= 'none';
});

displayWord();