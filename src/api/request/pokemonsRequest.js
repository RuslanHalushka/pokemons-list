import {axiosRequest} from "../../utils";
import {requestLinks} from "../index";
import axios from "axios";

export const pokemonsRequest = {
  getListOfPokemons: (num) => axiosRequest.get(requestLinks.listOfPokemons(num)),
  getPokemonById: (id) => axiosRequest.get(requestLinks.pokemonById(id)),
  getPokemonByUrl: (url) => axios.get(url)
}