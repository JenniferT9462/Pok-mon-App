
function handleForm() {
    console.log('Hey Button has been clicked');
    //Getting the value of pokemon inputs(1 and 2)
    let poke1 = document.getElementById('pokemon-1').value;
    let poke2 = document.getElementById('pokemon-2').value;
    fetchPokemon(poke1, poke2);
}

let generateBtn = document.getElementById('generateBtn');
generateBtn.addEventListener('click', handleForm);


//Fetch pokemon data
async function fetchPokemon(pokeInput1, pokeInput2) {
    const url1 = `https://pokeapi.co/api/v2/pokemon/${pokeInput1}`;
    const url2 = `https://pokeapi.co/api/v2/pokemon/${pokeInput2}`;
    const response1 = await fetch(url1);
    const response2 = await fetch(url2);
    const data1 = await response1.json();
    const data2 = await response2.json();
    //Proof of Life
    console.log(data1.name);
    console.log(data2.name);
    //Getting the abilities for each pokemon
    // console.log(data1.abilities[0].ability.name);
    let input1Abilities = '';
    let input2Abilities = '';
    for (let i=0; i<data1.abilities.length; i++) {
        input1Abilities += data1.abilities[i].ability.name;
        if (i < data1.abilities.length - 1) {
            input1Abilities += ', ';
        }
    }
    for (let i=0; i<data2.abilities.length; i++) {
        input2Abilities += data2.abilities[i].ability.name;
        if (i < data2.abilities.length - 1) {
            input2Abilities += ', ';
        }
    }
    output.innerHTML = generatePrompt(data1.name, input1Abilities, data2.name, input2Abilities);
};  
//Generate prompt with inputs
function generatePrompt(input1, input1Abilities, input2, input2Abilities) {
    return `In the pokemon universe, 
        if ${input1}, with their ${input1Abilities} abilities and ${input2} with their ${input2Abilities} abilities; were to battle
        what would their strategies be given their abilities?`;
};

//abilities[i].ability.name