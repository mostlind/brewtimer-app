import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Image,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

const Nav = require('./nav.js')

class MainPage extends Component {

  render() {
    return (
      <View style={styles.container}>
        
        <Nav title={this.props.title} right={{title: 'Info', goto: this.gotoInfo.bind(this) }} />
        
        <View style={styles.helloView}>
          <TouchableHighlight onPress={this.goToMethod.bind(this, 'chemex')}>
            <Image source={require("./img/chemexIcon.png")} style={[styles.chemexIcon, styles.icon]} />
          </TouchableHighlight>
          <Text style={styles.orText}>Or</Text>
          <TouchableHighlight onPress={this.goToMethod.bind(this, 'press')}>
            <Image source={require("./img/FrenchPressIcon.png")} style={[styles.frenchPressIcon, styles.icon]} />
          </TouchableHighlight>
        </View>
      </View>
    )
  }

  goToMethod (method) {
    this.props.navigator.push({id: method, name: method})
  }

  gotoInfo () {
    this.props.navigator.push({id: 'infopage', name: 'Info Page'})
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  helloView: {
    flex: 0.93,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#bbddff"
  },
  icon: {
    resizeMode: 'contain',
    borderRadius: 5
  },
  chemexIcon: {
    height: 242,
    width: 160,
    resizeMode: 'contain'
  },
  frenchPressIcon: {
    height: 275,
    width: 250,
    resizeMode: 'contain'
  },
  orText: {
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
    fontWeight: "bold",
    fontSize: 30,
    color: "#333333"
  }
    
});

module.exports = MainPage