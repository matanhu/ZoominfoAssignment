import { ActionReducer, ActionReducerMap, MetaReducer } from "@ngrx/store";
import { environment } from "src/environments/environment";
import { gameReducer, GameState,  } from "./reducers/game.reducer";

export interface AppState {
  Game: GameState;
}

export const reducers: ActionReducerMap<AppState> = {
  Game: gameReducer,
};

// On Debug log each action to console and current state before create reducer
export function debug(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return function (state, action) {
      console.log('state', state);
      console.log('action', action);

      return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [debug] : [];