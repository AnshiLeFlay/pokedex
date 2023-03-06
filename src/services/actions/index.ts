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
            } else {
                dispatch({
                    type: GET_POKEMONS_FAILED,
                });
            }
        });
    };
};

export const getPokemon = ( id: number ) => {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: GET_POKEMON_REQUEST,
        });
        getPokemonRequest( id ).then((res) => {
            if (res) {
                //типизировать покемона
                const pokemonData = {
                    id: res.id,
                    name: res.name,
                    types: res.types,
                    stats: res.stats,
                    avatar: res?.sprites?.other?.dream_world?.front_default
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