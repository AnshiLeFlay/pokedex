import { getPokemonRequest, getPokemonsRequest } from "../../utils/api";
import {
    GET_POKEMONS_FAILED,
    GET_POKEMONS_REQUEST,
    GET_POKEMONS_SUCCESS,
    GET_POKEMON_FAILED,
    GET_POKEMON_REQUEST,
    GET_POKEMON_SUCCESS,
} from "../constants";
import { AppDispatch } from "../types";

//interfaces
export interface IGetPokemonsRequest {
    readonly type: typeof GET_POKEMONS_REQUEST;
}

export interface IGetPokemonsSuccess {
    readonly type: typeof GET_POKEMONS_SUCCESS;
    pokemons: any;
}

export interface IGetPokemonsFailed {
    readonly type: typeof GET_POKEMONS_FAILED;
}

export interface IGetPokemonRequest {
    readonly type: typeof GET_POKEMON_REQUEST;
}

export interface IGetPokemonSuccess {
    readonly type: typeof GET_POKEMON_SUCCESS;
    data: any;
}

export interface IGetPokemonFailed {
    readonly type: typeof GET_POKEMON_FAILED;
}

//types
export type TActions =
    | IGetPokemonsRequest
    | IGetPokemonsSuccess
    | IGetPokemonsFailed
    | IGetPokemonRequest
    | IGetPokemonSuccess
    | IGetPokemonFailed;

//enhancers
export const getPokemons = (limit: number, offset: number) => {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: GET_POKEMONS_REQUEST,
        });
        getPokemonsRequest(limit, offset).then((res) => {
            if (res) {
                dispatch({
                    type: GET_POKEMONS_SUCCESS,
                    pokemons: res,
                });
                //очистить store.data
                /*
                res.results.forEach((item: any) => {
                    const buffer: Array<any> = item.url.split("/");
                    const id: number = buffer[buffer.length - 2];
                    const { getState } = store;
                    const pokemonsData = getState().data;
                    console.log(pokemonsData);

                    if (
                        pokemonsData.find((elem: any) => elem.id === id) ===
                        undefined
                    ) {
                        dispatch({
                            type: GET_POKEMON_REQUEST,
                        });
                        getPokemonRequest(id).then((res2) => {
                            if (res2) {
                                //типизировать покемона
                                const pokemonData = {
                                    id: res2.id,
                                    name: res2.name,
                                    types: res2.types,
                                    stats: res2.stats,
                                    avatar: res2?.sprites?.other?.dream_world
                                        ?.front_default,
                                };
                                dispatch({
                                    type: GET_POKEMON_SUCCESS,
                                    data: pokemonData,
                                });
                            } else {
                                dispatch({
                                    type: GET_POKEMON_FAILED,
                                });
                            }
                        });
                    }
                });
                */
            } else {
                dispatch({
                    type: GET_POKEMONS_FAILED,
                });
            }
        });
    };
};

export const getPokemon = (id: number) => {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: GET_POKEMON_REQUEST,
        });
        getPokemonRequest(id).then((res) => {
            if (res) {
                //типизировать покемона
                const pokemonData = {
                    id: res.id,
                    name: res.name,
                    types: res.types,
                    stats: res.stats,
                    avatar: res?.sprites?.other?.dream_world?.front_default,
                };
                dispatch({
                    type: GET_POKEMON_SUCCESS,
                    data: pokemonData,
                });
            } else {
                dispatch({
                    type: GET_POKEMON_FAILED,
                });
            }
        });
    };
};
