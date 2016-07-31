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

class Nav extends Component {

  //take a left and right object with a title and a function and a title

  render() {
    return ( 
      <View style={styles.nav}>
        <View style={styles.side}>
          <TouchableHighlight style={styles.sideLeft} onPress={this.goToLeft.bind(this)}>
            <Text style={styles.sideText}>
              {this.props.left ? this.props.left.title : ''}
            </Text>
          </TouchableHighlight>
        </View>
        <View style={styles.center}>
          <Text style={styles.chooseText}>{this.props.title}</Text>
        </View>
        <View style={styles.side}>
          <TouchableHighlight style={styles.sideRight} onPress={this.goToRight.bind(this)}>
            <Text style={styles.sideText}>
              {this.props.right ? this.props.right.title : ''}
            </Text>  
          </TouchableHighlight>
        </View>
      </View>  
    )
  }

  goToLeft () {
    if (this.props.left !== undefined)
      this.props.left.goto()
  }

  goToRight () {
    if (this.props.right !== undefined)
      this.props.right.goto()
  }
}

const styles = StyleSheet.create({

  center: {
    flex: 0.6
  },
  side: {
    flex: 0.2
  },
  nav: {
    flex: 0.07,
    backgroundColor: '#f5f5f5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#999999',
    paddingTop: 18
  },
  chooseText: {
    color: '#333333',
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  sideRight: {
  
    paddingRight: 10,
    alignSelf: 'flex-end'
  
  },
  sideLeft: {
  
    paddingLeft: 10,
    alignSelf: 'flex-start'
  
  },
  sideText: {
    color: '#99aaff',
  }
    
});

module.exports = Nav