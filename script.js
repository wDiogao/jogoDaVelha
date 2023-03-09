const cellElements = document.querySelectorAll("[data-cell]")
const board = document.querySelector("[data-board")
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
const winningMessage = document.querySelector('[data-winning-message]')
const restartButton = document.querySelector('[data-restart-button]')
// Adicionar botão para escolher quem vai começar (Se o X for escolhido, isCircleTurn = false. se o circulo for escolhido isCircleTurn = true apenas)

let isCircleTurn
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
]


const startGame = () =>{
    isCircleTurn = false
     for (const cell of cellElements){
        cell.classList.remove("circle")
        cell.classList.remove("x")
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, {once: true})
    }
    
    setBoardHoverClass()
    winningMessage.classList.remove('show-winning-message')
}

const setBoardHoverClass = () => {
    board.classList.remove('x')
    board.classList.remove('circle')
    
    if(isCircleTurn) {
    board.classList.add("circle")
    } else {
        board.classList.add("x")
    }
}

const swapTurn = () => {
    isCircleTurn = !isCircleTurn
    setBoardHoverClass()  
}

const finishGame = (isDraw) => {
   if(isDraw){
    winningMessageTextElement.innerText = "Empate!"
    } else {
    winningMessageTextElement.innerText = isCircleTurn ? `Círculo venceu!` : `X venceu!`
    }
    winningMessage.classList.add("show-winning-message")
}

const checkForWin = (currentPlayer) => {
    return winningCombinations.some((combination) => {
        return combination.every((index) =>{
            return cellElements[index].classList.contains(currentPlayer)
        })
    })
}

const checkForDraw = () => {
    return [...cellElements].every(cell => {
        return cell.classList.contains('x') || cell.classList.contains('circle')
    })
}

const placeMark = (cell, classToAdd) => {
    cell.classList.add(classToAdd)
}

const handleClick = (e) => {

    // Colocar a marca (X ou Circulo)
    const cell = e.target
    const classToAdd = isCircleTurn ? 'circle': 'x';

    placeMark(cell, classToAdd)
    // Checar por vitória
    const isWin = checkForWin(classToAdd)
    // Checar por empate
    const isDraw = checkForDraw()
    
    if(isWin){ 
       finishGame(false)
    } else if(isDraw){
        finishGame(true)
    } else {
    //Mudar o símbolo
        swapTurn()
    }
  
   
}

startGame()

restartButton.addEventListener('click', startGame)