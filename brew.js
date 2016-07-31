'use strict'

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Image,
  Text,
  View,
  TouchableHighlight
} from 'react-native';
const Timer = require('./timer-logic.js')
const Nav = require('./nav.js')

class Brew extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Nav 
          title={this.props.title} 
          left={{title: 'Back', goto: this.goBack.bind(this)}} 
          right={{title: 'Options', goto: this.goToOptions.bind(this)}} 
        />
        <View style={styles.helloView}>
          <Image style={styles.frenchPressIcon} 
            source={
              this.props.isChemex 
              ? require("./img/chemexIcon.png") 
              : require("./img/FrenchPressIcon.png")
            } 
          />
          <Timer style={styles.brewButtonView} isChemex={this.props.isChemex} />
        </View>
      </View>
    );
  }

  goBack () {
    this.props.navigator.pop()
  }

  goToOptions () {
    if(this.props.isChemex)
      this.props.navigator.push({id: 'pourover-options', name: 'Pourover Options'})
    else
      this.props.navigator.push({id: 'press-options', name: 'Frech Press Options'})
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  helloView: {
    flex: 0.93,
    justifyContent: 'space-around',
    backgroundColor: "#bbddff",
    padding: 15
  },
  frenchPressIcon: {
    height: 300,
    width: 240,
    resizeMode: 'contain',
    alignSelf: 'center'
  }

});

module.exports = Brew
