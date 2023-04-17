import {useEffect, useState} from "react";
import {Pokemon} from "../Pokemon/Pokemon";
import './PokemonsList.css'
import {pokemonsRequest} from "../../api";

export const PokemonsList = () =>{

    const [pokemonsList, setPokemonsList] = useState(null);
    const [selectedPokemon, setSelectedPokemon] = useState(null);

    let [numbers, setNumbers] = useState(12);

    useEffect(()=>{
        pokemonsRequest.getListOfPokemons(numbers)
            .then(response => {
                const promises = response.data.results.map(value => {
                    return pokemonsRequest.getPokemonByUrl(value.url);
                });
                Promise.all(promises)
                    .then(res =>{
                        const result = res.map((inf, index) =>{
                            const types = inf.data.types.map(type => type.type.name);
                            const id = index + 1;
                            return  [id, inf.data.name, types, inf.data.weight];
                        })
                        setPokemonsList(result)
                    })
            })
            .catch(err => console.log(err))
    }, [numbers]);

    const [types, setTypes] = useState(null);
    useEffect(()=>{
        if (pokemonsList){
            const values = pokemonsList.map(value => value[2]).flat(1)
            const arrOfTypes = [...new Set(values)];

            setTypes(arrOfTypes)
        }
    }, [pokemonsList])

    const [filteredPokemonsList, setFilteredPokemonsList] = useState(null);
    const [selectedType, setSelectedType] = useState('grass');

    const handleFilterPokemons = () => {
        if (selectedType) {
            const filteredPokemons = pokemonsList.filter(pokemon =>{
                const flatedPokemon = pokemon.flat(1);
                return flatedPokemon.includes(selectedType)
            });
            setFilteredPokemonsList(filteredPokemons);
        }
    }

    const [firstDataOfPokemon, setFirstDataOfPokemon] = useState(null);
    const [showDetails, setShowDetails] = useState(false);
    const handleSelectPokemon = (pokemonId) =>{
        setShowDetails(true)
        const pokemon = pokemonsList.find((pokemon) => pokemon[0] === pokemonId);
        pokemonsRequest.getPokemonById(pokemonId)
            .then(value => {
                const dataOfPokemon = value.data.stats.map((stat, index) =>{
                    return <div key={index}>{stat.stat.name}: {stat.base_stat}</div>
                })
                setSelectedPokemon(dataOfPokemon);
                setFirstDataOfPokemon(pokemon);
            })
            .catch(error => console.log(error))
    }

    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const btn = document.querySelector('.btn');
        function handleScroll() {
            if (btn.getBoundingClientRect().top < window.innerHeight){
                window.removeEventListener('scroll', handleScroll)
            }
            setScrollY(window.scrollY);
        }
        function handleScrollUp() {
            if (btn.getBoundingClientRect().top >= window.innerHeight) {
                window.addEventListener('scroll', handleScroll);
            }
        }
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('scroll', handleScrollUp);

    }, [numbers])

    return (
        <div>
            <div className={'jst-cnt mrg-btm'}>
                <select onChange={(e) => setSelectedType(e.target.value)}>
                    {types && types.map(value =>{
                        return <option key={value}>{value}</option>
                    })}
                </select>
                <button onClick={handleFilterPokemons}>Filter</button>
            </div>
            <div className={'sp-btw'}>
                <div className={'grid-container'}>
                    {(filteredPokemonsList || pokemonsList) && (filteredPokemonsList || pokemonsList).map(inf =>{
                        return <Pokemon
                            id={inf[0]}
                            name={inf[1]}
                            types={inf[2]}
                            key={inf[0]}
                            onSelectedPokemon={handleSelectPokemon}
                        />
                    })}
                </div>
                {showDetails &&
                    <div className={'allInf'} style={{transform: `translateY(${scrollY}px)`}}>
                        <div className={'block'}>
                            <div className={'photo'}>
                                <div className={'allLines firstLine'}></div>
                                <div className={'allLines secondLine'}></div>
                            </div>
                            <div className={'inf'}>
                                <div className={'txt'}>
                                    {firstDataOfPokemon &&
                                        <div className={'jst-cnt'}>
                                            <div>{firstDataOfPokemon[1]}</div>
                                            <div className={'mrg-lft'}>#{firstDataOfPokemon[0]}</div>
                                        </div>
                                    }
                                </div>
                                <div className={'mrg'}>
                                    {firstDataOfPokemon &&
                                        <div className={'jst-cnt'}>
                                            <div className={'properties'}>type</div>
                                            <div className={'properties'}>{firstDataOfPokemon[2] + ' '}</div>
                                        </div>
                                    }

                                    {selectedPokemon && selectedPokemon.map((v, index) =>{
                                        return(
                                            <div className={'jst-cnt'} key={index}>
                                                <div className={'properties'}>{v.props.children[0]}</div>
                                                <div className={'properties'}>{v.props.children[2]}</div>
                                            </div>
                                        )
                                    })}
                                    {firstDataOfPokemon &&
                                        <div className={'jst-cnt'}>
                                            <div className={'properties'}>weight</div>
                                            <div className={'properties'}>{firstDataOfPokemon[3]}</div>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                        <button className={'hide'} onClick={() => setShowDetails(false)}>Hide</button>
                    </div>
                }
            </div>
            <button className={'btn'} onClick={() => setNumbers(numbers + 12)}>Load More</button>
        </div>

    )
}
