import {
  CLINTON_TWEETS_LIST,
  TRUMP_TWEETS_LIST,
  SWITCH_TWEETS,
} from "../actions";
const initialState = {
  clintonTweetList: [],
  trumpTweetList: [],
  tweetShow: true,
};

export default function tweetApp(state = initialState, action) {
  switch (action.type) {
    case CLINTON_TWEETS_LIST:
      return {
        ...state,
        clintonTweetList: action.clintonTweetList,
      };
    case TRUMP_TWEETS_LIST:
      return {
        ...state,
        trumpTweetList: action.trumpTweetList,
      };
    case SWITCH_TWEETS:
      return {
        ...state,
        tweetShow: !state.tweetShow,
      };

    default:
      return state;
  }
}
