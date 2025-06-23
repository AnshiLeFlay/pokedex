import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    getPokemonsRequest,
    getPokemonRequest,
    getPokemonsByTypeRequest,
} from "../../utils/api";
import { IPokemon } from "../types/index";

export const fetchPokemons = createAsyncThunk(
    "pokemon/fetchPokemons",
    async ({ limit, offset }: { limit: number; offset: number }) => {
        const response = await getPokemonsRequest(limit, offset);
        if (!response) throw new Error("Failed to fetch pokemons");
        return response;
    }
);

export const fetchPokemon = createAsyncThunk(
    "pokemon/fetchPokemon",
    async (id: number) => {
        const res = await getPokemonRequest(id);
        if (!res) throw new Error("Failed to fetch pokemon");

        const pokemonData: IPokemon = {
            id: res.id,
            name: res.name,
            types: res.types,
            stats: res.stats,
            avatar: res?.sprites?.other?.["official-artwork"]?.front_default,
            height: res.height,
            weight: res.weight,
            abilities: res.abilities,
        };

        return pokemonData;
    }
);

export const fetchPokemonsByType = createAsyncThunk(
    "pokemon/fetchPokemonsByType",
    async (types: string[]) => {
        let result: { name: string; url: string }[] = [];

        for (const type of types) {
            const res = await getPokemonsByTypeRequest(type);
            if (!res)
                throw new Error(`Failed to fetch pokemons of type ${type}`);

            const buffer = res.pokemon.map((p: any) => ({
                name: p.pokemon.name,
                url: p.pokemon.url,
            }));

            if (result.length === 0) {
                result = buffer;
            } else {
                result = result.filter((r) =>
                    buffer.some((b) => b.name === r.name)
                );
            }
        }

        return result;
    }
);
