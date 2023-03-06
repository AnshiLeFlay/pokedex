import {
    TypedUseSelectorHook,
    useDispatch as dispatchHook,
    useSelector as selectorHook,
} from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { TActions } from "./actions";
import { store } from "./store";

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk = ThunkDispatch<RootState, any, TActions>;

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export const useDispatch = () => dispatchHook<AppThunk>();