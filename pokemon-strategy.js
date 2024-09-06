//Store and Retrieve API Key in localStorage:
//API key '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'
function retrieveApiKey() {
    //Setting API key to variable
    const apiKey = 'Bearer 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';
    //Storing the variable(apiKey) to local storage w/ setItem()
    //We call it whatever we want to set the key...
    //then the apiKey variable for the value...setItem('key', value);
    localStorage.setItem("huggingFace_Key", apiKey);
    //Proof of Life
    console.log('API key stored.');

};
retrieveApiKey();
//Handle Form Submission
let strategyBtn = document.getElementById('strategyBtn');
function handleForm() {
    //Getting the value of pokemon inputs(1 and 2)
    let poke1 = document.getElementById('pokemon-1').value;
    let poke2 = document.getElementById('pokemon-2').value;
    let Name1 = fetchPokemonData(poke1);
    let Name2 = fetchPokemonData(poke2);
    //Getting API key from local storage w/ getItem()
    const apiKey = localStorage.getItem('huggingFace_Key');
    //Proof of Life
    console.log('Retrieved API Key: ', apiKey);
    console.log('Pokemon 1: ', poke1);
    console.log('Pokemon 2: ', poke2);
    fetchStrategy(poke1 || Name1, poke2 || Name2);
}
//Add an event listener for button
strategyBtn.addEventListener('click', handleForm);

//Write a function that sends 'POST' request to huggingface model's API using fetch
async function fetchStrategy(pokemon1, pokemon2) {
    let prompt = `If ${pokemon1} and ${pokemon2} were to battle. What would be the best strategy for victory?`;
    const url = 'https://api-inference.huggingface.co/models/microsoft/Phi-3-mini-4k-instruct/v1/chat/completions';
    const response = await fetch(url, {
       method: 'POST',
    //    model: 'microsoft/Phi-3.5-mini-instruct',
       headers: {
         Authorization: 'Bearer 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',
         'Content-Type': 'application/json'
       },
       body: JSON.stringify({
        "messages": [
            {
                "role": "user",
                "content": prompt
            }
        ],
        "max-tokens": 500,
        "stream": false 
        })
    });
    const data = await response.json();
    console.log(data);
}


async function fetchPokemonData(pokeInput) {
    console.log('Button has been clicked');
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeInput}`;
    try {
        const response = await fetch(url);
        //Check if response is ok or successful
        //The '!' means 'not' or opposite, So, if the response is not 'ok'
        if (!response.ok) {
            throw new Error(`Pokemon not found: ${pokeInput}`)
        }
        const pokemonData = await response.json();
        let pokeName = pokemonData.name;
        return pokeName;
    } catch (error) {
        console.error(error.message);
        // alert("You enter an invalid name or ID");
    }
    
}
	
	
	