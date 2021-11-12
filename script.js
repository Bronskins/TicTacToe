let items = document.getElementsByClassName('item')
let availableSlots = []
let playerSlots = []
let iaSlots = []
let cross = "https://freepngimg.com/thumb/red_cross/28043-8-red-cross-transparent.png"
let circle = "https://th.bing.com/th/id/R.8012637022312d10533fbd1bd77b4bf1?rik=TotxnZZKNB%2f95w&riu=http%3a%2f%2fimages.clipartpanda.com%2fcircle-clipart-22241-red-circle-clip-art.png&ehk=KDDPqIgtVkqkps%2fqk7etjWyKr1EPUY0Ldc9nNPIJ2NE%3d&risl=&pid=ImgRaw&r=0"


for(i=0; i < items.length; i++){
    availableSlots.push(items[i])
}

function getRandomInt(min, max){
    return Math.floor(Math.random() * (max - min) + min);
}

function checkSlot(a, b, c, array){
    if(
        ((array.includes(a)) &&
        (array.includes(b)) &&
        (array.includes(c)))
        )
        {
            array.forEach(element => {
                let casillero = document.getElementById(element)
                if (casillero.id == a || casillero.id == b || casillero.id == c){
                casillero.style.backgroundColor = "blue"
                }
            });
        } 
}

var createMark = (event) => {

    playerSlots.push(parseInt(event.target.id))

    // Calculating IA Movement

    let minValue = 0
    let maxValue = availableSlots.length - 1
    let randomNumber = getRandomInt(minValue, maxValue)
    iaSlots.push(parseInt(availableSlots[randomNumber].id) )

    // Horizontal Check

    checkSlot(1,2,3,playerSlots)
    checkSlot(4,5,6, playerSlots)
    checkSlot(7,8,9, playerSlots)



    // Vertical Check

    checkSlot(1,4,7, playerSlots)
    checkSlot(2,5,8, playerSlots)
    checkSlot(3,6,9, playerSlots)


    // Cross

    checkSlot(1,5,9, playerSlots)
    checkSlot(3,5,7, playerSlots)
    
    checkSlot(1,5,9, iaSlots)
    checkSlot(3,5,7, iaSlots)
    checkSlot(1,4,7, iaSlots)
    checkSlot(2,5,8, iaSlots)
    checkSlot(3,6,9, iaSlots)
    checkSlot(1,2,3,iaSlots)
    checkSlot(4,5,6, iaSlots)
    checkSlot(7,8,9, iaSlots)

    let mark = document.createElement('img')
    mark.setAttribute('src', cross)
    mark.style.width = "190px";
    console.log(event.target.childNodes)
    mark.style.height = "190px"
    event.target.appendChild(mark)
    event.target.classList.remove('hover')
    event.target.removeEventListener('click', createMark)
    availableSlots.splice(availableSlots.indexOf(event.target), 1)

    let iaMark = document.createElement('img')
    iaMark.style.width = "190px";
    iaMark.style.height = "190px"
    iaMark.setAttribute('src', circle)
    availableSlots[randomNumber].appendChild(iaMark)
    availableSlots[randomNumber].classList.remove('hover')
    availableSlots[randomNumber].removeEventListener('click', createMark)
    
    availableSlots.splice(randomNumber, 1)
}

availableSlots.forEach(element => {
    element.addEventListener('click', createMark)
})