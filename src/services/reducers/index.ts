import { TActions } from "../actions";
import {
    GET_POKEMONS_FAILED,
    GET_POKEMONS_REQUEST,
    GET_POKEMONS_SUCCESS,
    GET_POKEMON_FAILED,
    GET_POKEMON_REQUEST,
    GET_POKEMON_SUCCESS,
} from "../constants";

/*
type TData = {
    request: boolean;
    failed: boolean;
    pokemon: any;
};
*/

interface TInitialState {
    requestAPI: boolean;
    failedAPI: boolean;
    pokemons: any; //типизировать ответ API
    data: Array<any> | [];
}

const initialState: TInitialState = {
    requestAPI: false,
    failedAPI: false,
    pokemons: {},
    data: [],
};

export const appReducer = (
    state = initialState,
    action: TActions
): TInitialState => {
    switch (action.type) {
        case GET_POKEMONS_REQUEST: {
            return {
                ...state,
                requestAPI: true,
            };
        }
        case GET_POKEMONS_SUCCESS: {
            return {
                ...state,
                failedAPI: false,
                requestAPI: false,
                pokemons: action.pokemons,
            };
        }
        case GET_POKEMONS_FAILED: {
            return {
                ...state,
                requestAPI: false,
                failedAPI: true,
            };
        }
        case GET_POKEMON_REQUEST: {
            return {
                ...state,
                /*data: []*/
            };
        }
        case GET_POKEMON_SUCCESS: {
            return {
                ...state,
                data:[...state.data, action.data]
            };
        }
        case GET_POKEMON_FAILED: {
            return {
                ...state,
            };
        }
        default: {
            return {
                ...state,
            };
        }
    }
};
