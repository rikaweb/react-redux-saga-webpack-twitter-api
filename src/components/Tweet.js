// ./src/components/ToDo.js

import React from "react";
import PropTypes from "prop-types";
import ListGroup from "react-bootstrap/ListGroup";
import Spinner from "react-bootstrap/Spinner";
import { TwitterTweetEmbed } from "react-twitter-embed";
const options = {
  cards: "hidden",
  align: "center",
  width: "550",
  conversation: "none",
};
const Tweet = ({ id }) => (
  <ListGroup.Item>
    <TwitterTweetEmbed
      tweetId={id}
      placeholder={
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      }
      options={options}
    />
  </ListGroup.Item>
);

Tweet.propTypes = {
  id: PropTypes.number.isRequired,
};

export default Tweet;
