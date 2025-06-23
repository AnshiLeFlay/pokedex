import { store } from "../store";

export type AppDispatch = typeof store.dispatch;

export interface IPokemon {
    id: number;
    name: string;
    types: Array<any>;
    stats: Array<any>;
    avatar: string;
    height: number;
    weight: number;
    abilities: Array<any>;
}
