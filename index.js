const URLPOKEAPI = 'https://pokeapi.co/api/v2/pokemon/';

const getPokemons = (pokeName) => {
  fetch(`${URLPOKEAPI}${pokeName}`)
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        changePokeImage('assets/pokemon-sad.gif');
      }
    })
    .then((data) => {
      changePokeImage(data.sprites.front_default);
      changeInfoPokemon(data);
      //   console.log(pokemons);
      //   showPokemons();
    })
    .catch((error) => console.log(error));
};

const changePokeImage = (image) => {
  const IMG = document.getElementById('image');
  IMG.setAttribute('src', image);
};

const changeInfoPokemon = (pokemon) => {
  let { stats, moves } = pokemon;
  console.log(moves);

  const POKEINFO = document.getElementById('pokeInfo');
  POKEINFO.innerHTML = `
        <h3 class="text-center"> ${pokemon.name.toUpperCase()}</h3>
        ${stats
          .map(
            (stat) =>
              `<p><small><b>${stat.stat.name.toUpperCase()}:</b><br/> ${
                stat.base_stat
              } </p></small>`
          )
          .join('')}
        
    `;
  const MOVEMENTS = document.getElementById('screen__movements');
  console.log(MOVEMENTS);

  MOVEMENTS.innerHTML = `
        <h3 class="text-center"> MOVEMENTS </h3>
        ${moves
          .map((move) => `<p><small><b>${move.move.name}</b></p></small>`)
          .join('')}
    `;
};

const handleSearchPokemon = () => {
  const POKENAME = document.getElementById('pokeName');
  getPokemons(POKENAME.value.toLowerCase());
};
