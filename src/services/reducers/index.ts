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
    tags: Array<{ type: string; color: string; icon?: string }>;
}

const initialState: TInitialState = {
    requestAPI: false,
    failedAPI: false,
    pokemons: {},
    data: [],
    tags: [
        { type: "normal", color: "#ca98a7" },
        { type: "fire", color: "#fd4c5a" },
        { type: "water", color: "#86a8fc" },
        { type: "grass", color: "#27cb4f" },
        { type: "electric", color: "#fbfb72" },
        { type: "ice", color: "#d8f0fa" },
        { type: "fighting", color: "#ef6138" },
        { type: "poison", color: "#9b69d9" },
        { type: "ground", color: "#6e491f" },
        { type: "flying", color: "#93b2c7" },
        { type: "psychic", color: "#f81c91" },
        { type: "bug", color: "#3b9950" },
        { type: "rock", color: "#8b3e21" },
        { type: "ghost", color: "#906790" },
        { type: "dark", color: "#5a5979" },
        { type: "dragon", color: "#61cad9" },
        { type: "steel", color: "#42bd94" },
        { type: "failry", color: "#ea1369" },
        { type: "shadow", color: "#040706" },
        { type: "unknown", color: "" },
    ],
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
                ...state /* надо оптимизировать */,
                /*data: [],*/
            };
        }
        case GET_POKEMON_SUCCESS: {
            if (
                state.data.find((elem: any) => elem.id === action.data.id) ===
                undefined
            )
                return {
                    ...state,
                    data: [...state.data, action.data],
                };
            else return { ...state };
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
