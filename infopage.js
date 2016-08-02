'use strict'

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Image,
  Text,
  View,
  TouchableHighlight,
  TextInput,
  AsyncStorage
} from 'react-native';

const Nav = require('./nav.js')

const InfoPage = React.createClass({

  componentWillMount: function () {

    this.setState({
      ratio: 19,
      water: 570,
      coffee: 30,
      save: 'Save'
    })

    AsyncStorage.getItem('ratioInfo', (err, data) => {
      if (err) {
         console.error(err)
      }

      let parsedData = JSON.parse(data)

      this.setState({
        ratio: parsedData ? parsedData.ratio : 19,
        water: parsedData ? parsedData.water : 570,
        coffee: parsedData ? parsedData.coffee : 30,
      })
    })
    
  },

  render: function() {
    return (
      <View style={styles.container}> 
        <Nav style={styles.nav} title={this.props.title} left={{title: 'Back', goto: this.goBack}} />
        <View style={styles.mainView}>
          <Text>Coffee to Water Ratio</Text>
          <View style={styles.section}>
            <Text style={styles.label}>1:</Text>
            <TextInput 
              keyboardType={'numeric'} 
              onChangeText={(e) => this.setState({ratio: +e})}
              onEndEditing={this.calculateWater}
              value={this.state.ratio + ""} 
              style={styles.input} 
              maxLength={5}
            />
          </View>

          <Text>Water</Text>
          <View style={styles.section}>
            <TextInput 
              keyboardType={'numeric'}  
              onChangeText={(e) => this.setState({water: +e})}
              onEndEditing={this.calculateCoffee} 
              value={this.state.water.toString()} 
              style={styles.input} 
            />
            <Text style={styles.label}>g</Text>
          </View>

          <Text>Coffee</Text>
          <View style={styles.section}>
            <TextInput 
              keyboardType='numeric' 
              onChangeText={(e) => this.setState({coffee: +e})}
              onEndEditing={this.calculateWater}
              value={this.state.coffee.toString()} 
              style={styles.input} 
            />
            <Text style={styles.label}>g</Text>
          </View>
          <TouchableHighlight onPress={this.save}>
            <Text>{this.state.save}</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  },

  calculateCoffee: function() {
    let water = this.state.water
    let coffee = Math.floor(water / this.state.ratio)

    this.setState({
      water: water,
      coffee: coffee
    })
  },

  calculateWater: function () {
    let coffee = this.state.coffee
    let water = coffee * this.state.ratio

    this.setState({
      water: water,
      coffee: coffee
    })
  },
  save: function () {
    let data = {
      ratio: this.state.ratio,
      coffee: this.state.coffee,
      water: this.state.water
    }

    AsyncStorage.setItem('ratioInfo', JSON.stringify(data), (err) => {
      if (err) 
        console.error(err)
      this.setState({save: 'Saved'})
    })
  },
  goBack: function () {
    this.props.navigator.pop()
  }
})

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    section: {
      flexDirection: 'row',
      justifyContent: 'center'
    },
    mainView: {
      flex: 0.93,
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: '#fffacd'
    },
    label: {
      fontSize: 40
    },
    input: {
      height: 40,
      width: 80,
      fontSize: 40,
      borderWidth: 2,
      borderColor: '#333333',
      textAlign: 'right'
    }

});

module.exports = InfoPage