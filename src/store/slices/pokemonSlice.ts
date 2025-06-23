import { createSlice } from "@reduxjs/toolkit";
import {
    fetchPokemons,
    fetchPokemon,
    fetchPokemonsByType,
} from "../thunks/pokemonThunks";

interface Tag {
    type: string;
    color: string;
    icon?: string;
}

interface PokemonState {
    requestAPI: boolean;
    failedAPI: boolean;
    pokemons: any;
    data: any[];
    tags: Tag[];
    search: {
        status: boolean;
        count: boolean;
        failed: boolean;
        buffer: any[];
    };
}

const initialState: PokemonState = {
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

const pokemonSlice = createSlice({
    name: "pokemon",
    initialState,
    reducers: {
        clearSearch(state) {
            state.search = {
                status: false,
                failed: false,
                count: false,
                buffer: [],
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPokemons.pending, (state) => {
                state.requestAPI = true;
            })
            .addCase(fetchPokemons.fulfilled, (state, action) => {
                state.failedAPI = false;
                state.requestAPI = false;
                state.pokemons = action.payload;
            })
            .addCase(fetchPokemons.rejected, (state) => {
                state.requestAPI = false;
                state.failedAPI = true;
            });

        builder.addCase(fetchPokemon.fulfilled, (state, action) => {
            const exists = state.data.find(
                (p: any) => p.id === action.payload.id
            );
            if (!exists) {
                state.data.push(action.payload);
            }
        });

        builder
            .addCase(fetchPokemonsByType.fulfilled, (state, action) => {
                state.search.buffer = action.payload;
                state.search.status = true;
                state.search.count = true;
                state.search.failed = false;
            })
            .addCase(fetchPokemonsByType.rejected, (state) => {
                state.search.failed = true;
                state.search.status = false;
            });
    },
});

export const { clearSearch } = pokemonSlice.actions;
export default pokemonSlice.reducer;
