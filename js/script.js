const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');
const form = document.querySelector('.form');
const inputSearch = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

function randomPokemon() {
    let searchPokemon = Math.floor(Math.random() * 649);
    renderPokemon(searchPokemon)
}

const fecthPokemon = async (pokemon)=> {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if(APIResponse.status == 200){
        const data = await APIResponse.json()
        return data
    }
}

const renderPokemon = async (pokemon)=> {

    pokemonName.innerHTML = 'Loading...'
    pokemonNumber.innerHTML = ""

    const data = await fecthPokemon(pokemon);

    
    if(data){
        console.log(data);
        pokemonName.innerHTML = data.name
        pokemonNumber.innerHTML = data.id
        searchPokemon = data.id
        pokemonImage.style.display = 'block';
        image = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']

        if(image){
            pokemonImage.src = image 
        }else{
            pokemonImage.src = data['sprites']['front_default']
        }
    }else{
        pokemonName.innerHTML = 'Não Encontrado :C'
        pokemonNumber.innerHTML = ""
        pokemonImage.style.display = 'none';
    }
}

form.addEventListener('submit', (event)=>{
    event.preventDefault();
    renderPokemon(inputSearch.value.toLowerCase())
    clearInput()
})

buttonPrev.addEventListener('click', ()=>{
    if(searchPokemon > 1)
        searchPokemon -= 1
        renderPokemon(searchPokemon)
})

buttonNext.addEventListener('click', ()=>{
    if(searchPokemon < 905)
        searchPokemon += 1
        renderPokemon(searchPokemon)

})

function clearInput() {
    inputSearch.value = ""
}

randomPokemon()