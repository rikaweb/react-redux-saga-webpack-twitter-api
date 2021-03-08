export const LOAD_TWEET_LIST = "LOAD_TWEET_LIST";
export const CLINTON_TWEETS_LIST = "CLINTON_TWEETS_LIST";
export const TRUMP_TWEETS_LIST = "TRUMP_TWEETS_LIST";
export const SWITCH_TWEETS = "SWITCH_TWEETS";

export function loadTweetList() {
  return {
    type: LOAD_TWEET_LIST,
  };
}

export function switchTweetsShow() {
  return {
    type: SWITCH_TWEETS,
  };
}
