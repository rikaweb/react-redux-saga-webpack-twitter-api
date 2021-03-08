import React from "react";
import PropTypes from "prop-types";
import ListGroup from "react-bootstrap/ListGroup";
import Jumbotron from "react-bootstrap/Jumbotron";
import Tweet from "./Tweet";

const TweetList = ({ tweetShow, trumpTweetList, clintonTweetList }) => (
  <Jumbotron>
    <>
      {tweetShow ? (
        <>
          <ListGroup>
            {trumpTweetList.map((tweet, index) => (
              <Tweet key={index} {...tweet} />
            ))}
          </ListGroup>
        </>
      ) : (
        <ListGroup>
          {clintonTweetList.map((tweet, index) => (
            <Tweet key={index} {...tweet} />
          ))}
        </ListGroup>
      )}
    </>
  </Jumbotron>
);

TweetList.propTypes = {
  trumpTweetList: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.number.isRequired,
      author_id: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  clintonTweetList: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.number.isRequired,
      author_id: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

export default TweetList;
