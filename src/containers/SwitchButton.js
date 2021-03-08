import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { switchTweetsShow } from "../actions";
import "../App.css";
let SwitchButton = ({ dispatch, tweetShow }) => {
  return (
    <Button
      className="button"
      onClick={() => {
        dispatch(switchTweetsShow());
      }}
    >
      {!tweetShow ? "Switch To Trump Tweets" : "Switch To Clinton Tweets"}
    </Button>
  );
};
SwitchButton = connect()(SwitchButton);
const mapStateToProps = (state) => ({
  tweetShow: state.tweetShow,
});

SwitchButton = connect(mapStateToProps, null)(SwitchButton);
export default SwitchButton;
