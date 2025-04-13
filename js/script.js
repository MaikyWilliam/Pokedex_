const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');
const form = document.querySelector('.form');
const inputSearch = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');
const buttonRandom = document.querySelector('.btn-random');
const limitedPokemon = 1025;


function randomPokemon() {
    let searchPokemon = Math.floor(Math.random() * limitedPokemon) + 1;
    renderPokemon(searchPokemon)
}

const fecthPokemon = async (pokemon)=> {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if(APIResponse.status == 200){
        const data = await APIResponse.json()
        return data
    }
}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = "";

    const data = await fecthPokemon(pokemon);

    if (data) {
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        searchPokemon = data.id;
        pokemonImage.style.display = 'block';

        image = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];

        if (image) {
            pokemonImage.src = image;
        } else {
            pokemonImage.src = data['sprites']['front_default'];
        }

    } else if (pokemon == 1402) {
        pokemonName.innerHTML = "Caio Maia";
        pokemonNumber.innerHTML = "1402";
        searchPokemon = 1402;
        pokemonImage.style.display = 'block';
        pokemonImage.src = "./CAIO.png";
    } else if (pokemon == 2019) {
        pokemonName.innerHTML = "Familia Maia";
        pokemonNumber.innerHTML = "2019";
        searchPokemon = 2019;
        pokemonImage.style.display = 'block';
        pokemonImage.src = "./FAMILIA.png";
    } else {
        pokemonName.innerHTML = 'Não Encontrado :C';
        pokemonNumber.innerHTML = "";
        pokemonImage.style.display = 'none';
    }
};


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
    if(searchPokemon < limitedPokemon)
        searchPokemon += 1
        renderPokemon(searchPokemon)

})

buttonRandom.addEventListener('click', ()=>{
    randomPokemon();
})

function clearInput() {
    inputSearch.value = ""
}

randomPokemon()