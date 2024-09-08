//Fetch Data from the PokeAPI
let pokemonBtn = document.getElementById('pokemonBtn')
pokemonBtn.addEventListener('click', fetchPokemonData);
let pokemonInput = document.getElementById('pokemonId');
//Display the Pokemon Data
let pokemonCard = document.getElementById('pokemonCard');
async function fetchPokemonData() {
    console.log('Button has been clicked');
    let pokeInput = pokemonInput.value;
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeInput}`;
    try {
        const response = await fetch(url);
        //Check if response is ok or successful
        //The '!' means 'not' or opposite, So, if the response is not 'ok'
        if (!response.ok) {
            throw new Error(`Pokemon not found: ${pokeInput}`)
        }
        const pokemonData = await response.json();
        //Why doesn't this work?...console.log(`Pokemon: ${pokemonData}`);
        // console.log(`Pokemon Name: `, pokemonData.name);
        // console.log(`Pokemon: `, pokemonData);
        console.log(`Pokemon: `, createPokemon(pokemonData));
        renderPokemon(pokemonData);
        
    } catch (error) {
        console.error(error.message);
        // alert("You enter an invalid name or ID");
    }
}
//Create a Pokemon Object
function createPokemon(data) {
    return {
        name: data.name,
        id: data.id,
        type: data.types[0].type.name,
        sprite: data.sprites.front_default
    }
}
function renderPokemon(data) {
    let pokeName = data.name;
    let pokeId = data.id;
    let pokeType = data.types[0].type.name;
    let pokeSprite = data.sprites.front_default;
    pokemonCard.innerHTML = `
            <div class="card mt-5 border border-4" style="width: 260px;">
                <img src="${pokeSprite}" class="card-img-top">
                <div class="card-body">
                    <h3 class="card-title">Name: ${pokeName}</h3>
                    <p class="card-text">ID: ${pokeId}</p>
                    <p class="card-text">Type: ${pokeType}</p>
                </div>
            </div>
        `;
    
}

