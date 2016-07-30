import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Image,
  Text,
  View,
  Slider,
  Picker,
  TouchableHighlight
} from 'react-native';
import {range} from 'lodash'

const Nav = require('./nav.js')

class PouroverOptions extends Component {

  constructor(props) {
    super(props)

    this.state = {
      timeValue: 210,
      numberOfPulses: 3,
      minutes: 3,
      seconds: 30
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Nav title={'Pourover Options'} left={{title: 'Back', goto: this.goBack.bind(this)}} />
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
          <TouchableHighlight onPress={this.setTime.bind(this)}>
              <Text>
                Set
              </Text>
            </TouchableHighlight>
          <Text>Pulse Length</Text>
          <Slider />
          <Text>Number of Pulses</Text>
          <View>
            <TouchableHighlight onPress={this.decreasePulses.bind(this)}>
              <Text>-</Text>
            </TouchableHighlight>
            <Text>{this.state.numberOfPulses}</Text>
            <TouchableHighlight onPress={this.increasePulses.bind(this)}>
              <Text>+</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }

  setTime() {

    let time = this.state.minutes * 60 + this.state.seconds
    this.setState({
      timeValue: time
    })
  }

  increasePulses() {
    if (this.state.numberOfPulses < 4)
      this.setState({numberOfPulses: (this.state.numberOfPulses + 1)})
  }

  decreasePulses() {
    if (this.state.numberOfPulses > 2)
      this.setState({numberOfPulses: (this.state.numberOfPulses - 1)})
  }

  goBack() {
    this.props.navigator.pop()
  }

}

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
