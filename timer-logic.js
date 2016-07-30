import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Image,
  Text,
  View,
  Slider,
  TouchableHighlight
} from 'react-native';
TimerMixin = require('react-timer-mixin')


const Timer = React.createClass ({
  mixins: [TimerMixin],

  getInitialState: function () {
    return {
      seconds: 0,
      timerString: 'Brew!',
      timerRunning: false
    }
  },

  render: function () {
    return (
      <TouchableHighlight onPress={this.state.timerRunning ? this.stopTimer : this.startTimer}>
        <View style={styles.timerView}>
          <Text style={styles.timerText}>{this.state.timerString}</Text>
        </View>
      </TouchableHighlight>
    );
  },

  startTimer: function () {

    let timerBehavior = this.timerBehavior
    let timer = this.setInterval(timerBehavior, 200)
    
    this.setState(
      { 
        timer: timer,
        timerRunning: true
      }
     )

  },

  timerBehavior: function () {
      let seconds = this.state.seconds + 1
      let timerString = ''

      if (seconds >= 210) {
        this.clearInterval(this.state.timer)
        this.setState(
          {
            seconds: 0,
            timerString: 'Done!',
            timerRunning: false
          }
        )
        return
      }

      timerString = this.displayTime(seconds)

      this.setState(
      {
        seconds: seconds,
        timerString: timerString,
      }
    )


  },
  displayTime: function (seconds) {

    let displayMinutes = Math.floor(seconds / 60)
    let displaySeconds = seconds % 60

    let timerString = '' + displayMinutes + ':' + (displaySeconds.toString().length > 1 ? displaySeconds : '0' + displaySeconds)

    return timerString

  },

  stopTimer: function () {
    this.clearInterval(this.state.timer)
    this.setState({timerRunning: false})
  }

})

const styles = StyleSheet.create({
  timerText: {
    color: "#ffffff",
    textAlign: 'center',
    fontSize: 90,
    width: 220,
    alignSelf: 'center',
  },
  timerView: {
    flex: 1,
    height: 250,
    width: 250,
    backgroundColor: "#ff3333",
    borderRadius: 150,
    justifyContent: 'center',
    alignSelf: 'center'
  },
})

module.exports = Timer