import {
    getPokemonRequest,
    getPokemonsByTypeRequest,
    getPokemonsRequest,
} from "../../utils/api";
import {
    CLEAR_SEARCH,
    GET_POKEMONS_BY_TYPE_FAILED,
    GET_POKEMONS_BY_TYPE_REQUEST,
    GET_POKEMONS_BY_TYPE_SUCCESS,
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

export interface IGetPokemonsByTypeRequest {
    readonly type: typeof GET_POKEMONS_BY_TYPE_REQUEST;
}

export interface IGetPokemonsByTypeSuccess {
    readonly type: typeof GET_POKEMONS_BY_TYPE_SUCCESS;
    status: string;
    pokemons: any;
}

export interface IGetPokemonsByTypeFailed {
    readonly type: typeof GET_POKEMONS_BY_TYPE_FAILED;
}

export interface IClearSearch {
    readonly type: typeof CLEAR_SEARCH;
}

//types
export type TActions =
    | IGetPokemonsRequest
    | IGetPokemonsSuccess
    | IGetPokemonsFailed
    | IGetPokemonRequest
    | IGetPokemonSuccess
    | IGetPokemonFailed
    | IGetPokemonsByTypeRequest
    | IGetPokemonsByTypeSuccess
    | IGetPokemonsByTypeFailed
    | IClearSearch;

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
            } else {
                dispatch({
                    type: GET_POKEMONS_FAILED,
                });
            }
        });
    };
};

export const getPokemon = (id: number) => {
    return async function (dispatch: AppDispatch) {
        dispatch({
            type: GET_POKEMON_REQUEST,
        });
        await getPokemonRequest(id).then((res) => {
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

export const getPokemonsByType = (types: Array<string>) => {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: GET_POKEMONS_BY_TYPE_REQUEST,
        });

        types.forEach(async (type, index) => {
            //console.log("trying to find - ", type);
            await getPokemonsByTypeRequest(type).then((res) => {
                //console.log("resolved - ", type);
                //console.log(res.pokemon.length);
                if (res) {
                    let buffer = [];
                    for (let i = 0; i < res.pokemon.length; i++) {
                        buffer.push({
                            name: res.pokemon[i].pokemon.name,
                            url: res.pokemon[i].pokemon.url,
                        });
                    }

                    dispatch({
                        type: GET_POKEMONS_BY_TYPE_SUCCESS,
                        pokemons: buffer,
                        status: types.length - 1 === index ? "done" : "pending",
                    });
                } else {
                    dispatch({
                        type: GET_POKEMONS_BY_TYPE_FAILED,
                    });
                }
            });
        });
    };
};
