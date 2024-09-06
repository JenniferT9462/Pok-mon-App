//Proof of life
console.log('Hello from poke-items.js!');
//Getting the input from the text field
let pokeInput = document.getElementById('pokemonItemsId');
//The html element to display list
let pokeItemsList = document.getElementById('pokeItemsList');
//Add event listener for the button
pokeItemsBtn.addEventListener('click', function handleFetch() {
    //Proof of life
    console.log('Button was Clicked!');
    //Getting the value of the input
    let pokeInputValue = pokeInput.value;
    //Log value of input to the console
    console.log(pokeInputValue);
    //Fetch data w/fetchPokemonData function w/ input value as the argument
    fetchPokemonData(pokeInputValue);
});
//Write a function to fetch data from PokeAPI and display list of names
async function fetchPokemonData(pokeId) {
    const url = `https://pokeapi.co/api/v2/item/${pokeId}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Pokemon not found: ${pokeInput}`)
        }
        const data = await response.json();
        //Proof of life
        console.log('Item Data: ', data);
        //Setup an empty array for translation names
        let translations = [];
        //Loop thru names to log the name of the translations
        for(let i=0;i<data.names.length; i++) {
            //Proof of Life
            console.log(`Item Name: `, data.names[i].name);
            //Push names to translations array 
            translations.push(data.names[i].name);
        };
        //Proof of Life
        console.log('Translations: ', translations);
        //Sort array alphabetically
        translations.sort();
        //Clear list on click
        pokeItemsList.innerHTML = '';
        //Display list w/ forEach loop
        translations.forEach(translation => {
            pokeItemsList.innerHTML += `
                <li class="list-group-item">
                    ${translation}
                </li>
            `;
        });    
    } catch (error) {
            console.error(error.message);
            // alert("You enter an invalid name or ID");
        }
    };


