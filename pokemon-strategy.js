//Store and Retrieve API Key in localStorage:
function retrieveApiKey() {
    //Setting API key to variable
    const apiKey =  'Bearer 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';
    //Storing the variable(apiKey) to local storage w/ setItem()
    //We call it whatever we want to set the key...
    //then the apiKey variable for the value...setItem('key', value);
    localStorage.setItem("huggingFace_Key", apiKey);
    //Proof of Life
    console.log('API key stored.');
    //Getting API key from local storage w/ getItem()
    const getApiKey = localStorage.getItem('huggingFace_Key');
    return getApiKey;
};
//Testing
// retrieveApiKey();
//Getting strategy button
let strategyBtn = document.getElementById('strategyBtn');
//Handle Form Submission
async function handleForm() {
    //Getting the value of pokemon inputs(1 and 2)
    let poke1 = document.getElementById('pokemon-1').value;
    let poke2 = document.getElementById('pokemon-2').value;
    //Proof of Life
    // console.log('Retrieved API Key:' , retrieveApiKey());
    console.log('Pokemon 1: ', poke1);
    console.log('Pokemon 2: ', poke2);
    //Use hugging face to generate a response to my prompt using the inputs
    await fetchStrategy(poke1, poke2);
    
}
//Add an event listener for button
strategyBtn.addEventListener('click', handleForm);

//Write a function that sends 'POST' request to huggingface model's API using fetch
async function fetchStrategy(input1, input2) {
    const url = 'https://api-inference.huggingface.co/models/microsoft/Phi-3-mini-4k-instruct/v1/chat/completions';
    const response = await fetch(url, {
       method: 'POST',
    //    model: 'microsoft/Phi-3.5-mini-instruct',
       headers: {
         Authorization: retrieveApiKey(),
         'Content-Type': 'application/json'
       },
       body: JSON.stringify({
        "messages": [
            {
                "role": "user",
                "content": await fetchPokemon(input1, input2)
            }
        ],
        "max-tokens": 500,
        // "max_new_tokens": 500,

        "stream": false 
        })
    });
    const data = await response.json();
    console.log(data);
    renderResult(data);
};
//Getting the HTML element that will display result(output)
let strategyOutput = document.getElementById('strategy-output');
//Render result to the innerHTML
 function renderResult(result) {
    //The path to where the result content is in the output object JSON)
    let strategyResult = result.choices[0].message.content;
    //Proof of Life
    console.log(strategyResult);
    strategyOutput.innerHTML = `
        <div class="container mt-4">
          <div class="card border border-4 border-warning p-2">
            <div class="card-title">
              <h3>Battle Strategies:</h3>
            </div>
            <div class="card-body">
              <div class="card-text">${strategyResult}</div>
          </div>
          </div>
        </div> 
        `;
}
//Get pokemon's name and abilities and then generate a prompt with that data
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
  //The prompt needs to be a string for the hugging face api model post request
  let prompt = "";
  prompt = generatePrompt(data1.name, input1Abilities, data2.name, input2Abilities);
  console.log(prompt);
  return prompt;
};  
//Generate prompt with inputs with their names and abilities
function generatePrompt(input1, input1Abilities, input2, input2Abilities) {
  return `In the pokemon universe, 
      if ${input1}, with their ${input1Abilities} abilities and ${input2} with their ${input2Abilities} abilities; were to battle
      what would their strategies be?`;
};	