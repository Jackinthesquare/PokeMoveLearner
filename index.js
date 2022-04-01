const URL = 'https://pokeapi.co/api/v2/generation/1/'
let data
let movesList = []
let pokemon = {
    'bMoveset': [null, null, null, null],
    'cMoveset': [null, null, null, null],
    'sMoveset': [null, null, null, null]
}
let currentSelected = ''

const bulb = document.getElementById('pkmn1')
const char = document.getElementById('pkmn2')
const squirt = document.getElementById('pkmn3')
const form = document.getElementById("form")

const move1 = document.getElementById("move1")
const move2 = document.getElementById("move2")
const move3 = document.getElementById("move3")
const move4 = document.getElementById("move4")

const moveName = document.getElementById('moveName')

form.style.display = "none"
document.getElementById("container").style.display = "none"


const pokemonMoveLearner = async () => {
    let req = await fetch(URL)
    let res = await req.json()
    data = res

    let req1 = await fetch('https://pokeapi.co/api/v2/pokemon/bulbasaur')
    let res1 = await req1.json()
    bulb.innerHTML = `<img src = ${res1.sprites.other.dream_world.front_default}>`

    let req2 = await fetch('https://pokeapi.co/api/v2/pokemon/charmander')
    let res2 = await req2.json()
    char.innerHTML = `<img src = ${res2.sprites.other.dream_world.front_default}>`

    let req3 = await fetch('https://pokeapi.co/api/v2/pokemon/squirtle')
    let res3 = await req3.json()
    squirt.innerHTML = `<img src = ${res3.sprites.other.dream_world.front_default}>`

    bulb.addEventListener('click', () => {
        currentSelected = 'bulb'
        form.style.display = "block"
        document.getElementById("container").style.display = "block"
        move1.innerHTML = ""
        move2.innerText = ""
        move3.innerText = ""
        move4.innerText = ""
        form.addEventListener('submit', chooseLog)
    })
    char.addEventListener('click', () => {
        currentSelected = 'char'
        form.style.display = "block"
        document.getElementById("container").style.display = "block"
        move1.innerHTML = ""
        move2.innerText = ""
        move3.innerText = ""
        move4.innerText = ""
        form.addEventListener('submit', chooseLog)
    })
    squirt.addEventListener('click', () => {
        currentSelected = 'squirt'
        form.style.display = "block"
        move1.innerHTML = ""
        move2.innerText = ""
        move3.innerText = ""
        move4.innerText = ""
        document.getElementById("container").style.display = "block"
        form.addEventListener('submit', chooseLog)
    })
}

const chooseLog = (event) => {
    event.preventDefault();
    if (currentSelected === 'bulb') {
        logBulb()
    }
    else if (currentSelected === 'char') {
        logChar()
    }
    else if (currentSelected === 'squirt') {
        logSquirt()
    }
    else {
        return;
    }
}


const logBulb = (event) => {
    // event.preventDefault();

    findMoveB()

    move1.innerText = pokemon.bMoveset[0]
    move2.innerText = pokemon.bMoveset[1]
    move3.innerText = pokemon.bMoveset[2]
    move4.innerText = pokemon.bMoveset[3]

    document.getElementById('writeBulbMoves').innerHTML = `Bulbasaur's current moves are: ${pokemon.bMoveset}`

}

const logChar = (event) => {
    // event.preventDefault();

    findMoveC()

    move1.innerText = pokemon.cMoveset[0]
    move2.innerText = pokemon.cMoveset[1]
    move3.innerText = pokemon.cMoveset[2]
    move4.innerText = pokemon.cMoveset[3]

    document.getElementById('writeCharMoves').innerHTML = `Charmander's current moves are: ${pokemon.cMoveset}`
}

const logSquirt = (event) => {
    // event.preventDefault();

    findMoveS(moveName.value)

    move1.innerText = pokemon.sMoveset[0]
    move2.innerText = pokemon.sMoveset[1]
    move3.innerText = pokemon.sMoveset[2]
    move4.innerText = pokemon.sMoveset[3]

    document.getElementById('writeSquirtMoves').innerHTML = `Squirtle's current moves are: ${pokemon.sMoveset}`
}

let findMoveS = (moveValue) => {
    //console.log(data.moves[1].name.replace(/[^a-zA-Z ]/g, " "))
    data.moves.forEach((el) => {
        movesList.push(el.name.replace(/[^a-zA-Z ]/g, " "))
    })

    if (movesList.includes(moveName.value)) {
        pokemon.sMoveset.unshift(moveName.value)
        pokemon.sMoveset.pop()
    }
    else {
        alert('There is no such move!')
    }

}

let findMoveC = (moveValue) => {
    data.moves.forEach((el) => {
        movesList.push(el.name.replace(/[^a-zA-Z ]/g, " "))
    })
    if (movesList.includes(moveName.value)) {
        pokemon.cMoveset.unshift(moveName.value)
        pokemon.cMoveset.pop()
    }
    else {
        alert('There is no such move!')
    }

}

let findMoveB = (moveValue) => {
    data.moves.forEach((el) => {
        movesList.push(el.name.replace(/[^a-zA-Z ]/g, " "))
    })
    if (movesList.includes(moveName.value)) {
        pokemon.bMoveset.unshift(moveName.value)
        pokemon.bMoveset.pop()
    }
    else {
        alert('Not a valid Gen 1 move!')
    }

}



document.addEventListener('DOMContentLoaded', () => {
    return pokemonMoveLearner()
})