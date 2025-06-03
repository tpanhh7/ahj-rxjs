import { ajax } from "rxjs/ajax";
import { interval, of } from "rxjs";
import { catchError, map, startWith, switchMap } from "rxjs/operators";

// const API_URL =
//   "https://ahj-rxjs-dlmdfqpoy-tuan-anhs-projects-4110927b.vercel.app/api/messages/unread";

const API_URL = "http://localhost:3000/api/messages/unread";

const POLLING_INTERVAL = 5000;

const getMessagesPolling = () =>
  interval(POLLING_INTERVAL).pipe(
    startWith(0),
    switchMap(() =>
      ajax.getJSON(API_URL).pipe(
        catchError((error) => {
          console.error("API Error:", error);
          return of({
            status: "ok",
            timestamp: Date.now(),
            messages: [],
          });
        })
      )
    ),
    map((response) => {
      if (response.status === "ok") {
        return response;
      }
      return {
        status: "ok",
        timestamp: Date.now(),
        messages: [],
      };
    })
  );

export default getMessagesPolling;
