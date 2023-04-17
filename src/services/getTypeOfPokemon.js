// import {useEffect, useState} from "react";
// import {pokemonsRequest} from "../api";
// import {Pokemon} from "../components/Pokemon/Pokemon";
//
// export const useTypeOfPokemon = () =>{
//     const [typeOfPokemon, setTypeOfPokemon] = useState();
//
//     useEffect(()=>{
//
//         pokemonsRequest.getPokemonById()
//             .then(response => {
//                 const result = response.data.results.map((value, index) => <Pokemon name={value.name} key={index}/>);
//                 setPokemonsList(result);
//             })
//             .catch(error => console.log(error));
//     }, []);
// }