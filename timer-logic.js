import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Image,
  Text,
  View,
  Slider,
  AsyncStorage,
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
      <View>
        <TouchableHighlight style={styles.timerView} onPress={this.state.timerRunning ? this.stopTimer : this.startTimer}>
            <Text style={styles.timerText}>{this.state.timerString}</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.resetButton} onPress={this.reset}>
          <Text style={styles.resetText}>Reset</Text>
        </TouchableHighlight>
      </View>
    );
  },

  startTimer: function () {

    let timerBehavior = this.timerBehavior
    let timer

    AsyncStorage.getItem(this.props.isChemex ? 'pouroverOptions' : 'pressOptions', (err, data) => {

      parsedData = JSON.parse(data)

      if (this.props.isChemex) {
        this.setState({
          timeValue: parsedData ? parsedData.timeValue : 210,
          continuousPour: parsedData ? parsedData.continuousPour : true,
          numberOfPulses: parsedData ? parsedData.numberOfPulses : 1
        })
      } else {
        this.setState({timeValue: parsedData ? parsedData.timeValue : 240})
      }

      timer = this.setInterval(timerBehavior, 20)

      this.setState(
        { 
          timer: timer,
          timerRunning: true
        }
       )

    })

  },

  timerBehavior: function () {
      let seconds = this.state.seconds + 1
      let timerString = ''

      if (seconds >= this.state.timeValue) {
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

      timerString = this.prettifyTime(seconds)

      this.setState(
      {
        seconds: seconds,
        timerString: timerString,
      }
    )


  },
  prettifyTime: function (seconds) {

    let displayMinutes = Math.floor(seconds / 60)
    let displaySeconds = seconds % 60

    let timerString = '' + displayMinutes + ':' + (displaySeconds.toString().length > 1 ? displaySeconds : '0' + displaySeconds)

    return timerString

  },

  reset: function () {
    this.clearInterval(this.state.timer)

    this.setState({
      seconds: 0,
      timerRunning: false,
      timerString: '0:00'
    })
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
    alignSelf: 'center',
    backgroundColor: 'transparent'
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
  resetButton: {
    height: 70,
    width: 70,
    borderRadius: 100,
    position: 'absolute',
    left: 0,
    bottom: 0,
    backgroundColor: 'white',
    justifyContent: 'center'
  },
  resetText: {
    alignSelf: 'center',
    textAlign: 'center',
    width: 50,

  }
})

module.exports = Timer