'use strict'

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Image,
  Text,
  View,
  Slider,
  AsyncStorage,
  Animated,
  TouchableHighlight,
  TouchableWithoutFeedback
} from 'react-native';
const TimerMixin = require('react-timer-mixin')


const Timer = React.createClass ({
  mixins: [TimerMixin],

  getInitialState: function () {
    return {
      seconds: 0,
      timerString: 'Brew!',
      timerPaused: false,
      timerRunning: false,
      anim: new Animated.Value(0)
    }
  },

  render: function () {
    return (
      <Animated.View style={[styles.timerView, {
          borderRadius: this.state.anim.interpolate({
            inputRange: [0, 1],
            outputRange: [250,5]
          }),
          width: this.state.anim.interpolate({
            inputRange: [0, 1],
            outputRange: [250, 325]
          }),
          backgroundColor: this.state.anim.interpolate({
            inputRange: [0, 1],
            outputRange: ['#ff3333', '#f5f5f0']
          })

      }]}>
        {this.state.timerRunning ? this.runningTimerLayout() : this.timerNotRunningLayout()}
      </Animated.View>
    );
  },

  runningTimerLayout: function () {
    return (
      <Animated.View style={{opacity: this.state.anim}}>
        <View>
          { (this.props.isChemex && this.state.timerRunning) ? <Text style={styles.statusText}>{this.state.status}</Text> : null }
          { (this.props.isChemex && this.state.timerRunning) ? <Text style={styles.statusText}>Weight: {this.state.targetWeight}g</Text> : null }
          <Text style={[styles.timerText, this.state.timerRunning ? {color: '#333'} : {color: '#fff'}]}>{this.state.timerString}</Text>
          <View style={styles.buttonContainer}>
            <TouchableHighlight style={[styles.pauseButton]} onPress={this.state.timerPaused ? this.startTimer : this.pause}>
              <Text style={styles.resetText}>Pause</Text>
            </TouchableHighlight>
            <TouchableHighlight style={[styles.resetButton]} onPress={this.reset}>
              <Text style={[styles.resetText, {color: '#fff'}]}>Reset</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Animated.View>
    )
  },

  timerNotRunningLayout: function () {
    return (
      <Animated.View style={{
        opacity: this.state.anim.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 0]
        })
      }}>
        <TouchableWithoutFeedback

            styles={{justifyContent: 'center', alignItems: 'center'}}

            onPress={this.state.timerRunning 
              ? this.stopTimer 
              : this.startTimer}
          >
            <View style={styles.notRunningTimer}>
              <Text style={[styles.timerText, {color: '#fff'}]}>{this.state.timerString}</Text>
            </View>
          </TouchableWithoutFeedback>
        </Animated.View>
      )
  },

  startTimer: function () {

    let timerBehavior = this.timerBehavior
    let timer

    Animated.timing(
      this.state.anim, 
      {toValue: 1}
    ).start()

    AsyncStorage.getItem(this.props.isChemex ? 'pouroverOptions' : 'pressOptions', 

      (err, data) => {

        let parsedData = JSON.parse(data)

        if (this.props.isChemex) {
          this.setState({
            timeValue: parsedData ? parsedData.timeValue : 210,
            continuousPour: parsedData ? parsedData.continuousPour : true,
            numberOfPulses: parsedData ? parsedData.numberOfPulses : 1
          })
        } else {
          this.setState({timeValue: parsedData ? parsedData.timeValue : 240})
        }

        timer = this.setInterval(timerBehavior, 1000)

        this.setState(
          { 
            timerString: this.prettifyTime(this.state.seconds),
            timer: timer,
            timerRunning: true,
            timerPaused: false
          }
        )

        if(this.props.isChemex) {
          this.setState({
              status: "Bloom",
              targetWeight: '50'
          })
        }

    })

  },

  statusText: function () {

    if (this.props.isChemex && this.state.timerRunning) {

      this.setState({
        status: "Bloom",
        targetWeight: '30'
      })

      return (
        <Text>Status: {this.state.status}</Text>
      )
    }
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
            timerPaused: false,
            timerRunning: false
          }
        )
        return
      }

      

      if(this.props.isChemex && seconds >= 30) {
        this.setState({
          status: "Pour",
          targetWeight: '570'
        })
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

    let timerString = '' + displayMinutes + ':' 
      + (displaySeconds.toString().length > 1 ? displaySeconds : '0' + displaySeconds)

    return timerString

  },

  reset: function () {
    this.clearInterval(this.state.timer)

    Animated.timing(
      this.state.anim, 
      {toValue: 0}
    ).start()

    this.setState({
      seconds: 0,
      timerPaused: false,
      timerRunning: false,
      timerString: 'Brew!'
    })
  },

  pause: function () {
    this.clearInterval(this.state.timer)

    this.setState({timerPaused: true})
  },

  stopTimer: function () {

    this.clearInterval(this.state.timer)

    this.setState({timerRunning: false})
  }

})

const styles = StyleSheet.create({
  timerText: {
    //color: "#ffffff",
    textAlign: 'left',
    fontSize: 90,
    alignSelf: 'center',
    backgroundColor: 'transparent',
    justifyContent: 'center'
  },
  timerView: {
    //flex: 1,
    height: 250,
    //width: 250,
    //backgroundColor: "#ff3333",
    //borderRadius: 150,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  notRunningTimer: {
    flexDirection: 'row',
    height: 250,
    width: 250,
    borderRadius: 250,
    justifyContent: 'center',
    alignItems: 'center'
  },
  statusText: {
    backgroundColor: 'transparent',
    color: '#333',
    fontSize: 20,
    textAlign: 'center'
  },
  resetButton: {
    height: 40,
    width: 70,
    borderRadius: 4,
    backgroundColor: '#ff2222',
    justifyContent: 'center',
    margin: 10
  },
  pauseButton: {
    height: 40,
    width: 70,
    borderRadius: 4,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#333',
    justifyContent: 'center',
    margin: 10
  },
  buttonContainer: {
    //flex: 0.1,
    flexDirection: 'row',
    //position: 'absolute',
    //bottom: 0,
    alignSelf: 'center',
    justifyContent: 'space-between'
  },
  resetText: {
    alignSelf: 'center',
    textAlign: 'center',
    width: 50,
  },
})

module.exports = Timer