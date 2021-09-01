const $hand = document.getElementById("hand")
const $firstCard = $hand.children[0]

const colors = ["red", "blue", "green", "yellow"]

const cards = []

for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 4; j++) {
        let newCard = {
            value: i,
            color: colors[j]
        }
        cards.push(newCard)
    }
}

console.log(cards)

for(let i = 0; i < cards.length; i++) {
    const $newCard = document.createElement("div")
    $newCard.classList.add("card")
    $newCard.innerHTML = cards[i].value
    $newCard.style.backgroundColor = cards[i].color
    $hand.append($newCard)
}