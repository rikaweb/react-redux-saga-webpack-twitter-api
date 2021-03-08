import { connect } from "react-redux";
import TweetList from "../components/TweetList";

const mapStateToProps = (state) => {
  return {
    ...state,
    tweetList: state.tweetList,
  };
};

const TweetListContainer = connect(mapStateToProps)(TweetList);

export default TweetListContainer;
