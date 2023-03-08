import { TActions } from "../actions";
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

interface TInitialState {
    requestAPI: boolean;
    failedAPI: boolean;
    pokemons: any; //типизировать ответ API
    data: Array<any> | [];
    tags: Array<{ type: string; color: string; icon?: string }>;
    search: {
        status: boolean;
        count: boolean;
        failed: boolean;
        buffer: Array<any>;
    };
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
    ],
    search: { status: false, count: false, failed: false, buffer: [] },
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
        case GET_POKEMONS_BY_TYPE_REQUEST: {
            return { ...state };
        }
        case GET_POKEMONS_BY_TYPE_SUCCESS: {
            const bufCount = state.search.buffer.length;
            const pokCount = action.pokemons.length;
            let result = [];

            if (bufCount !== 0 && state.search.count === true) {
                for (let i = 0; i < bufCount; i++) {
                    for (let j = 0; j < pokCount; j++) {
                        if (
                            state.search.buffer[i].name ===
                            action.pokemons[j].name
                        )
                            result.push(action.pokemons[j]);
                    }
                }
            } else {
                if (!state.search.count) result = action.pokemons;
            }

            return {
                ...state,
                search: {
                    buffer: result,
                    failed: false,
                    status: action.status === "done" ? true : false,
                    count: true,
                },
            };
        }
        case GET_POKEMONS_BY_TYPE_FAILED: {
            return {
                ...state,
                search: { ...state.search, failed: true, status: false },
            };
        }
        case CLEAR_SEARCH: {
            return {
                ...state,
                search: {
                    status: false,
                    failed: false,
                    count: false,
                    buffer: [],
                },
            };
        }
        default: {
            return {
                ...state,
            };
        }
    }
};
