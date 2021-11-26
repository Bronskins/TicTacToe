let items = document.getElementsByClassName('item')
let reset = document.getElementById('reset')
let difficulty = document.getElementById('difficulty')
let availableSlots = []
let playerSlots = []
let container = document.getElementById('master-container')
let gameOver = false
let iaTurn = false
let found = false
let audio = new Audio('pop.mp3')
let audio2 = new Audio('win.wav')
let iaSlots = []
let cross = "https://freepngimg.com/thumb/red_cross/28043-8-red-cross-transparent.png"
let circle = "https://th.bing.com/th/id/R.8012637022312d10533fbd1bd77b4bf1?rik=TotxnZZKNB%2f95w&riu=http%3a%2f%2fimages.clipartpanda.com%2fcircle-clipart-22241-red-circle-clip-art.png&ehk=KDDPqIgtVkqkps%2fqk7etjWyKr1EPUY0Ldc9nNPIJ2NE%3d&risl=&pid=ImgRaw&r=0"
let definedSlot;
let definedIndex;
let playerScore = 0
let iaScore = 0

difficulty.addEventListener('click', () => {
    let text = document.getElementById('mode')

    if (text.textContent == "Normal") {
        text.textContent = "Hard"
        text.style.color = "red"
    } else if (text.textContent == "Hard") {
        text.textContent = "Easy"
        text.style.color = "green"
    } else if (text.textContent == "Easy") {
        text.textContent = "Normal"
        text.style.color = "blue"
    }

    resetAll();

})

let playerResultDiv = document.getElementById('player')
let iaResultDiv = document.getElementById('ia')

let playerScoreText = document.createElement('h2')
playerScoreText.textContent = playerScore

let iaScoreText = document.createElement('h2')
iaScoreText.textContent = iaScore

playerResultDiv.appendChild(playerScoreText)
iaResultDiv.appendChild(iaScoreText)

for (i = 0; i < items.length; i++) {
    availableSlots.push(items[i])
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function checkSlot(a, b, c, array) {
    if (
        ((array.includes(a)) &&
            (array.includes(b)) &&
            (array.includes(c)))
    ) {

        availableSlots.forEach(element => {
            element.classList.remove('hover');
            element.removeEventListener('click', createMark)
        });

        array.forEach(element => {
            audio2.play()
            let casillero = document.getElementById(element)
            if (casillero.id == a || casillero.id == b || casillero.id == c) {
                casillero.animate([
                    // keyframes
                    {
                        background: "rgb(218, 208, 77)"
                    },
                    {
                        background: "rgb(136, 131, 57)"
                    },
                    {
                        background: "rgb(218, 208, 77)"
                    }
                ], {
                    // timing options
                    duration: 1000,
                    iterations: Infinity,
                    fill: "forwards"

                });
            }

        });

        gameOver = true
        if (array == playerSlots) {
            playerScore = playerScore + 1
            playerScoreText.textContent = playerScore
        } else if (array == iaSlots) {
            iaScore = iaScore + 1
            iaScoreText.textContent = iaScore
        }
        return;

    }


}

function calculateLuckShot(a, b, c, ia, array1, array2) {

    if (iaTurn !== false) {
        if (array1.includes(a) && array1.includes(b) && !array2.includes(c) && !playerSlots.includes(c)) {
            definedSlot = document.getElementById(c)
            definedIndex = availableSlots.indexOf(definedSlot)
            definedSlot.appendChild(ia)
            definedSlot.classList.remove('hover')
            definedSlot.removeEventListener('click', createMark)
            array2.push(parseInt(definedSlot.id))
            availableSlots.splice(definedIndex, 1)
            iaTurn = false;
            found = true
        }
    }
}

function calculateIA() {
    let minValue = 0
    let maxValue = availableSlots.length - 1
    let iaMark = document.createElement('img')
    iaMark.style.width = "100%";
    iaMark.style.height = "100%"
    iaMark.setAttribute('src', circle)

    iaMark.animate([
        // keyframes
        {
            opacity: '0'
        },
        {
            opacity: '1'
        }
    ], {
        // timing options
        duration: 300,
        iterations: 1
    });
    if (gameOver == false) {
        let luckShot;
        let text = document.getElementById('mode')

        if (text.textContent == "Easy") {
            luckShot = getRandomInt(0, 2)
        } else  {
            luckShot = 1
        }

        console.log(luckShot)

        if (luckShot == 1) {

            if (text.textContent == "Hard"){
                            // Horizontal

            calculateLuckShot(1, 2, 3, iaMark, iaSlots, iaSlots)
            calculateLuckShot(1, 3, 2, iaMark, iaSlots, iaSlots)
            calculateLuckShot(2, 3, 1, iaMark, iaSlots, iaSlots)

            calculateLuckShot(4, 6, 5, iaMark, iaSlots, iaSlots)
            calculateLuckShot(4, 5, 6, iaMark, iaSlots, iaSlots)
            calculateLuckShot(5, 6, 4, iaMark, iaSlots, iaSlots)

            calculateLuckShot(7, 8, 9, iaMark, iaSlots, iaSlots)
            calculateLuckShot(8, 9, 7, iaMark, iaSlots, iaSlots)
            calculateLuckShot(7, 9, 8, iaMark, iaSlots, iaSlots)

            // Vertical

            calculateLuckShot(1, 7, 4, iaMark, iaSlots, iaSlots)
            calculateLuckShot(1, 4, 7, iaMark, iaSlots, iaSlots)
            calculateLuckShot(7, 4, 1, iaMark, iaSlots, iaSlots)

            calculateLuckShot(2, 5, 8, iaMark, iaSlots, iaSlots)
            calculateLuckShot(2, 8, 5, iaMark, iaSlots, iaSlots)
            calculateLuckShot(5, 8, 2, iaMark, iaSlots, iaSlots)

            calculateLuckShot(3, 6, 9, iaMark, iaSlots, iaSlots)
            calculateLuckShot(6, 9, 3, iaMark, iaSlots, iaSlots)
            calculateLuckShot(3, 9, 6, iaMark, iaSlots, iaSlots)
            }


            // Cross

            calculateLuckShot(1, 5, 9, iaMark, iaSlots, iaSlots)
            calculateLuckShot(1, 9, 5, iaMark, iaSlots, iaSlots)
            calculateLuckShot(5, 9, 1, iaMark, iaSlots, iaSlots)

            calculateLuckShot(3, 5, 7, iaMark, iaSlots, iaSlots)
            calculateLuckShot(5, 7, 3, iaMark, iaSlots, iaSlots)
            calculateLuckShot(3, 7, 5, iaMark, iaSlots, iaSlots)

            // Horizontal

            calculateLuckShot(1, 2, 3, iaMark, playerSlots, iaSlots)
            calculateLuckShot(1, 3, 2, iaMark, playerSlots, iaSlots)
            calculateLuckShot(2, 3, 1, iaMark, playerSlots, iaSlots)

            calculateLuckShot(4, 6, 5, iaMark, playerSlots, iaSlots)
            calculateLuckShot(4, 5, 6, iaMark, playerSlots, iaSlots)
            calculateLuckShot(5, 6, 4, iaMark, playerSlots, iaSlots)

            calculateLuckShot(7, 8, 9, iaMark, playerSlots, iaSlots)
            calculateLuckShot(8, 9, 7, iaMark, playerSlots, iaSlots)
            calculateLuckShot(7, 9, 8, iaMark, playerSlots, iaSlots)

            // Vertical

            calculateLuckShot(1, 7, 4, iaMark, playerSlots, iaSlots)
            calculateLuckShot(1, 4, 7, iaMark, playerSlots, iaSlots)
            calculateLuckShot(7, 4, 1, iaMark, playerSlots, iaSlots)

            calculateLuckShot(2, 5, 8, iaMark, playerSlots, iaSlots)
            calculateLuckShot(2, 8, 5, iaMark, playerSlots, iaSlots)
            calculateLuckShot(5, 8, 2, iaMark, playerSlots, iaSlots)

            calculateLuckShot(3, 6, 9, iaMark, playerSlots, iaSlots)
            calculateLuckShot(6, 9, 3, iaMark, playerSlots, iaSlots)
            calculateLuckShot(3, 9, 6, iaMark, playerSlots, iaSlots)

            // Cross

            calculateLuckShot(1, 5, 9, iaMark, playerSlots, iaSlots)
            calculateLuckShot(1, 9, 5, iaMark, playerSlots, iaSlots)
            calculateLuckShot(5, 9, 1, iaMark, playerSlots, iaSlots)

            calculateLuckShot(3, 5, 7, iaMark, playerSlots, iaSlots)
            calculateLuckShot(5, 7, 3, iaMark, playerSlots, iaSlots)
            calculateLuckShot(3, 7, 5, iaMark, playerSlots, iaSlots)

            if (found == false) {
                let randomNumber = getRandomInt(minValue, maxValue)
                availableSlots[randomNumber].appendChild(iaMark)
                availableSlots[randomNumber].classList.remove('hover')
                availableSlots[randomNumber].removeEventListener('click', createMark)
                iaSlots.push(parseInt(availableSlots[randomNumber].id))
                availableSlots.splice(randomNumber, 1)
            }

        } else {
            let randomNumber = getRandomInt(minValue, maxValue)
            availableSlots[randomNumber].appendChild(iaMark)
            availableSlots[randomNumber].classList.remove('hover')
            availableSlots[randomNumber].removeEventListener('click', createMark)
            iaSlots.push(parseInt(availableSlots[randomNumber].id))
            availableSlots.splice(randomNumber, 1)

        }
    }

    checkIaSlots();

}

function checkIaSlots() {

    // Horizontal Check

    checkSlot(1, 2, 3, iaSlots)
    checkSlot(4, 5, 6, iaSlots)
    checkSlot(7, 8, 9, iaSlots)

    // Vertical Check

    checkSlot(1, 4, 7, iaSlots)
    checkSlot(2, 5, 8, iaSlots)
    checkSlot(3, 6, 9, iaSlots)

    // Cross

    checkSlot(1, 5, 9, iaSlots)
    checkSlot(3, 5, 7, iaSlots)

}

function checkPlayerSlots() {

    // Horizontal Check

    checkSlot(1, 2, 3, playerSlots)
    checkSlot(4, 5, 6, playerSlots)
    checkSlot(7, 8, 9, playerSlots)

    // Vertical Check

    checkSlot(1, 4, 7, playerSlots)
    checkSlot(2, 5, 8, playerSlots)
    checkSlot(3, 6, 9, playerSlots)

    // Cross

    checkSlot(1, 5, 9, playerSlots)
    checkSlot(3, 5, 7, playerSlots)

}

function checkPlayerSlots() {

    // Horizontal Check

    checkSlot(1, 2, 3, playerSlots)
    checkSlot(4, 5, 6, playerSlots)
    checkSlot(7, 8, 9, playerSlots)

    // Vertical Check

    checkSlot(1, 4, 7, playerSlots)
    checkSlot(2, 5, 8, playerSlots)
    checkSlot(3, 6, 9, playerSlots)

    // Cross

    checkSlot(1, 5, 9, playerSlots)
    checkSlot(3, 5, 7, playerSlots)

}

var createMark = (event) => {
    audio.play()
    playerSlots.push(parseInt(event.target.id))
    let mark = document.createElement('img')
    mark.setAttribute('src', cross)
    mark.style.width = "100%";
    mark.style.height = "100%"

    mark.animate([
        // keyframes
        {
            opacity: '0'
        },
        {
            opacity: '1'
        }
    ], {
        // timing options
        duration: 300,
        iterations: 1
    });
    event.target.appendChild(mark)
    event.target.classList.remove('hover')
    event.target.removeEventListener('click', createMark)
    availableSlots.splice(availableSlots.indexOf(event.target), 1)
    checkPlayerSlots();
    iaTurn = true
    found = false

    calculateIA()

}

availableSlots.forEach(element => {
    element.addEventListener('click', createMark)
})

reset.addEventListener('click', () => {
    resetAll();
})

function resetAll() {
    let one = document.getElementById('1')
    let two = document.getElementById('2')
    let three = document.getElementById('3')
    let four = document.getElementById('4')
    let five = document.getElementById('5')
    let six = document.getElementById('6')
    let seven = document.getElementById('7')
    let eight = document.getElementById('8')
    let nine = document.getElementById('9')

    one.remove();
    two.remove();
    three.remove();
    four.remove();
    five.remove();
    six.remove();
    seven.remove();
    eight.remove();
    nine.remove();

    gameOver = false
    availableSlots = []
    playerSlots = []
    iaSlots = []

    let oneNew = document.createElement('div')
    oneNew.id = "1"
    oneNew.className = "item hover"

    let twoNew = document.createElement('div')
    twoNew.id = "2"
    twoNew.className = "item hover"

    let threeNew = document.createElement('div')
    threeNew.id = "3"
    threeNew.className = "item hover"

    let fourNew = document.createElement('div')
    fourNew.id = "4"
    fourNew.className = "item hover"

    let fiveNew = document.createElement('div')
    fiveNew.id = "5"
    fiveNew.className = "item hover"

    let sixNew = document.createElement('div')
    sixNew.id = "6"
    sixNew.className = "item hover"

    let sevenNew = document.createElement('div')
    sevenNew.id = "7"
    sevenNew.className = "item hover"

    let eightNew = document.createElement('div')
    eightNew.id = "8"
    eightNew.className = "item hover"

    let nineNew = document.createElement('div')
    nineNew.id = "9"
    nineNew.className = "item hover"

    container.appendChild(oneNew)
    container.appendChild(twoNew)
    container.appendChild(threeNew)
    container.appendChild(fourNew)
    container.appendChild(fiveNew)
    container.appendChild(sixNew)
    container.appendChild(sevenNew)
    container.appendChild(eightNew)
    container.appendChild(nineNew)

    let items = document.getElementsByClassName('item')

    for (i = 0; i < items.length; i++) {
        availableSlots.push(items[i])
    }

    availableSlots.forEach(element => {
        element.addEventListener('click', createMark)
    })
}