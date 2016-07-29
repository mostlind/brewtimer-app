import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Image,
  Text,
  View,
  TouchableHighlight
} from 'react-native';
Timer = require('./timerLogic.js')
Nav = require('./nav.js')

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
            source={this.props.isChemex 
              ? require("./img/chemexIcon.png") 
              : require("./img/FrenchPressIcon.png")
            } 
          />
          <Timer style={styles.brewButtonView} />
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
    //else
      //go to press options
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
    height: 352,
    width: 240,
    resizeMode: 'contain',
    alignSelf: 'center'
  }

});

module.exports = Brew
