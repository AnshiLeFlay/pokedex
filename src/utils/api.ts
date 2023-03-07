import { POKEMONS_BY_TYPE, POKEMONS_ENDPOINT, POKEMON_ENDPOINT } from "./endpoints";

export const getPokemonsRequest = async ( limit: number, offset: number ): Promise<any> => {
    try {
        const res: Response = await fetch( `${POKEMONS_ENDPOINT}?limit=${limit}&offset=${offset}` ); //?limit=100000&offset=0

        if ( res.ok ) {
            return await res.json();
        } return Promise.reject(`Ошибка подключения к API ${res.status}`);
    } catch (error) {
        return Promise.reject(`Ошибка подключения к API ${error}`);
    }
}

export const getPokemonRequest = async ( id: number ): Promise<any> => {
    try {
        const res: Response = await fetch( `${POKEMON_ENDPOINT}${id}/` );

        if ( res.ok ) {
            return await res.json();
        } return Promise.reject(`Ошибка подключения к API ${res.status}`);
    } catch (error) {
        return Promise.reject(`Ошибка подключения к API ${error}`);
    }
}

export const getPokemonsByTypeRequest = async ( type: string ): Promise<any> => {
    try {
        const res: Response = await fetch( `${POKEMONS_BY_TYPE}${type}/` );

        if ( res.ok ) {
            return await res.json();
        } return Promise.reject(`Ошибка подключения к API ${res.status}`);
    } catch (error) {
        return Promise.reject(`Ошибка подключения к API ${error}`);
    }
}