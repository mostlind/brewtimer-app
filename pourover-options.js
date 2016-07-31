import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Image,
  Text,
  View,
  Slider,
  Switch,
  Picker,
  TouchableHighlight,
  AsyncStorage
} from 'react-native';
import {range} from 'lodash'

const Nav = require('./nav.js')

const PouroverOptions = React.createClass({

  componentWillMount: function () {

    this.setState({
      timeValue: 210,
      minutes: 3,
      seconds: 30,
      numberOfPulses: 3,
      continuousPour: false,
      save: 'Save'
    })

    AsyncStorage.getItem('pouroverOptions', (err, data) => {
      if (err) 
        console.error(err)
      if (data) {
        parsedData = JSON.parse(data)

        let timeValue = parsedData.timeValue

        this.setState({
          timeValue: timeValue,
          minutes: Math.floor(timeValue / 60),
          seconds: timeValue % 60,
          numberOfPulses: parsedData.numberOfPulses,
          continuousPour: parsedData.continuousPour
        })
      }
    })

  },

  render: function() {
    return (
      <View style={styles.container}>
        <Nav title={'Pourover Options'} left={{title: 'Back', goto: this.goBack}} />
        <View style={styles.aFineView}>
          <Text>Brew Time: {this.state.timeValue}</Text>
          <View style={styles.pickerContainer}>
            <Picker 
              style={styles.picker}
              selectedValue={this.state.minutes}
              onValueChange={(value) => this.setState({minutes: value})}
            >
            {(function () {
              let minValues = [3,4,5]
              let minOptions = minValues.map((value) => <Picker.Item key={value} label={'' + value} value={value} /> )
              return minOptions
            })()}
            </Picker>
            <Picker 
              style={styles.picker}
              selectedValue={this.state.seconds}
              onValueChange={(value) => this.setState({seconds: value})}
            >
            {
              (function () {
                
                let secValues = range(60)

                let secOptions = secValues.map((value) => {
                  return (
                    <Picker.Item 
                      key={value} 
                      label={(value.toString().length > 1 ? value.toString() : '0' + value)} 
                      value={value} 
                    /> 
                  )}
                )

                return secOptions

              })()
            }
            </Picker>
          </View>
          <Text>
            Continuous Pour
          </Text>
          <Switch onValueChange={(value) => this.setState({continuousPour: value})} value={this.state.continuousPour} />
          <Text>Number of Pulses</Text>
          <View>
            <TouchableHighlight onPress={this.decreasePulses}>
              <Text>-</Text>
            </TouchableHighlight>
            <Text>{this.state.numberOfPulses}</Text>
            <TouchableHighlight onPress={this.increasePulses}>
              <Text>+</Text>
            </TouchableHighlight>
          </View>
          <TouchableHighlight onPress={this.saveOptions}>
            <Text>
              {this.state.save}
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  },

  saveOptions: function () {

    let time = this.state.minutes * 60 + this.state.seconds
    let optionsObj = {
      timeValue: time,
      numberOfPulses: this.state.numberOfPulses,
      continuousPour: this.state.continuousPour
    }

    AsyncStorage.setItem('pouroverOptions', JSON.stringify(optionsObj), (err) => {
      if (err) 
        console.error(err) 

      this.setState({
        timeValue: this.state.minutes * 60 + this.state.seconds,
        save: 'Saved'
      })

    })

  },

  increasePulses: function () {
    if (this.state.numberOfPulses < 4)
      this.setState({numberOfPulses: (this.state.numberOfPulses + 1)})
  },

  decreasePulses: function () {
    if (this.state.numberOfPulses > 2)
      this.setState({numberOfPulses: (this.state.numberOfPulses - 1)})
  },

  goBack: function() {
    this.props.navigator.pop()
  }

})

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  aFineView: {
    flex: 0.93,
    justifyContent: 'space-around'
  },
  pickerContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#e9e9e9'
  },
  picker: {
    flex: 0.5,
    backgroundColor: '#eeffee',
    alignSelf: 'flex-start'
  }
})

module.exports = PouroverOptions
