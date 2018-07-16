import { combineEpics, ofType } from "redux-observable";
import { FETCH_USER, fetchUserSuccess, fetchUserFailed } from "./actions";
import { ajax } from "rxjs/ajax";
import { of } from "rxjs";
import { catchError, map, mergeMap, retry, takeUntil } from "rxjs/operators";

import { clientId, clientSecret } from "./keys";

export const fetchUser = actions$ =>
  actions$.pipe(
    ofType(FETCH_USER),
    mergeMap(action =>
      ajax
        .getJSON(
          `https://api.github.com/users/${
            action.payload.username
          }?client_id=${clientId}&client_secret=${clientSecret}`
        )
        .pipe(
          map(user => fetchUserSuccess(user)),
          takeUntil(actions$.ofType(FETCH_USER)),
          retry(2),
          catchError(error => of(fetchUserFailed()))
        )
    )
  );

export default combineEpics(fetchUser);
