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
  TouchableHighlight
} from 'react-native';

const Nav = require('./nav.js')

class PressOptions extends Component {

  constructor(props) {
    super(props)

    this.state = {
      timeValue: 240,
      minutes: 4,
      seconds: 0,
    }
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
            <TouchableHighlight onPress={this.setTime.bind(this)}>
              <Text>
                Set
              </Text>
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