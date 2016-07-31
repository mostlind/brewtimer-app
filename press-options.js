import React, { Component } from 'react';
import {range} from 'lodash'
import {
  AppRegistry,
  StyleSheet,
  Image,
  Text,
  Picker,
  View,
  Slider,
  TouchableHighlight,
  AsyncStorage
} from 'react-native';

const Nav = require('./nav.js')

class PressOptions extends Component {

  constructor(props) {
    super(props)

    this.state = {
      timeValue: 240,
      minutes: 4,
      seconds: 0,
      save: 'Save'
    }

    AsyncStorage.getItem('pressOptions', (err, data) => {
      if (err) 
        console.error(err)
      parsedData = JSON.parse(data)

      timeValue = parsedData ? parsedData.timeValue : 240

      this.setState({
        timeValue: timeValue,
        minutes: Math.floor(timeValue / 60),
        seconds: timeValue % 60
      })
    })

    
  }

  render() {
    return (
      <View style={styles.container}>
        <Nav title={'French Press Options'} left={{title: 'Back', goto: this.goBack.bind(this)}} />
        <View style={styles.aFineView}>
          <Text>Brew Time: {this.state.timeValue}</Text>
          <View>
            <Picker 
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
            <TouchableHighlight onPress={this.saveTime.bind(this)}>
              <Text>
                {this.state.save}
              </Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }

  
  saveTime() {

    let timeValue = this.state.minutes * 60 + this.state.seconds

    let timeObj = {
      timeValue: timeValue
    }

    AsyncStorage.setItem('pressOptions', JSON.stringify(timeObj), (err) => {

      if (err) {
        console.error(err)
      }

      this.setState({
        timeValue: timeValue,
        save: 'Saved'
      })
    })
    
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
  }
})

module.exports = PressOptions