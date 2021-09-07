const $hand = document.getElementById("hand")
const $firstCard = $hand.children[0]
const $pile = document.getElementById("pile")
const $HUD = document.getElementById("HUD")

const colors = ["red", "blue", "green", "yellow"]
const cards = []
const players = []

players[0] = {}
players[0].hand = []
players[1] = {}
players[1].hand = []
players[2] = {}
players[2].hand = []
players[3] = {}
players[3].hand = []

let turn = 0
let clockwise = true
const pile = []

spawnCards()
players.forEach(player => dealCards(player))
placeFirstPileCard()

function takeTurn(event) {
    if (turn == 0) {
        const turnColor = event.target.style.backgroundColor
        const turnValue = event.target.innerHTML
        const pileTop = pile[pile.length-1]
        if (pileTop.value == turnValue || pileTop.color == turnColor) {
            const turnID = players[0].hand.findIndex(card => card.value == 1 && card.color == "blue")
            const turnCard = players[0].hand.splice(turnID,1)[0]
            console.log(turnCard)
            pile.push(turnCard)
            turn++
            if (turn == 4) turn = 0
            gameHUD()
        }
    }
    else {
        const thisHand = players[turn].hand
        for (let i = 0; i < thisHand.length; i++) {
            const turnID = Math.floor(Math.random()*thisHand.length)
            const pileTop = pile[pile.length-1]
            if (thisHand[turnID].value == pileTop.value || thisHand[turnID].color == pileTop.color) {
                const turnHand = thisHand.splice(turnID,1)[0]
                pile.push(turnCard)
                turn++
                if (turn == 4) turn = 0
                gameHUD()
                break;
            }
        }
    }
    showPileTop()
}

$hand.onclick = takeTurn
$pile.onclick = takeTurn

function gameHUD() {
    $HUD.innerHTML = `Who's Turn? ${turn+1}
    Player 1: ${players[0].hand.length}
    Player 2: ${players[1].hand.length}
    Player 3: ${players[2].hand.length}
    Player 4: ${players[3].hand.length}
    `
}

function showPileTop() {
    const top = pile[pile.length-1]
    const $newCard = document.createElement("div")
    $newCard.classList.add("card")
    $newCard.innerHTML = top.value
    $newCard.style.backgroundColor = top.color
    $pile.innerHTML = ""
    $pile.append($newCard)
}

function spawnCards() {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 4; j++) {
            let newCard = {
                value: i,
                color: colors[j]
            }
            cards.push(newCard)
        }
    }
}

function dealCards(player) {
    for(let i = 0; i < 8; i++) {
        const whichCard = Math.floor(Math.random()*cards.length)
        const pickedCard = cards.splice(whichCard,1)[0]
        player.hand.push(pickedCard)
        console.log(cards)
        if (players.indexOf(player) == 0)
            placeInHand(pickedCard)
    }
}

function placeFirstPileCard() {
    const whichCard = Math.floor(Math.random()*cards.length)
    const pickedCard = cards.splice(whichCard,1)[0]
    pile.push(pickedCard)
}

function placeInHand(pickedCard) {
    const $newCard = document.createElement("div")
    $newCard.classList.add("card")
    $newCard.innerHTML = pickedCard.value
    $newCard.style.backgroundColor = pickedCard.color
    $hand.append($newCard)
}
