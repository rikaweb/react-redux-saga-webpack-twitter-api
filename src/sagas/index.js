import { all, call, put, takeEvery } from "redux-saga/effects";
import {
  LOAD_TWEET_LIST,
  CLINTON_TWEETS_LIST,
  TRUMP_TWEETS_LIST,
} from "../actions";

function* fetchTweetsList(name) {
  const url = `/2/tweets/search/recent?query=${name}&max_results=25`;

  const json = yield fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: process.env.TWITTER__BEARER_KEY,
    },
  }).then((response) => response.json());
  name === "Trump"
    ? yield put({ type: TRUMP_TWEETS_LIST, trumpTweetList: json.data })
    : yield put({ type: CLINTON_TWEETS_LIST, clintonTweetList: json.data });
}

export function* loadTweetList() {
  yield takeEvery(LOAD_TWEET_LIST, fetchTweetsList, "Trump");
  yield takeEvery(LOAD_TWEET_LIST, fetchTweetsList, "HillaryClinton");
}

export default function* rootSaga() {
  yield all([loadTweetList()]);
}
