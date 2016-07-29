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

const Nav = require('./nav.js')

class PouroverOptions extends Component {

  constructor(props) {
    super(props)

    this.state = {numberOfPulses: 3}
  }

  render() {
    return (
      <View style={styles.container}>
        <Nav title={'Pourover Options'} left={{title: 'Back', goto: this.goBack.bind(this)}} />
        <View style={styles.aFineView}>
          <Text>Brew Time</Text>
          <Slider />
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
  }
})

module.exports = PouroverOptions
