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
      water: 510,
      coffee: 26,
      save: 'Save'
    })

    AsyncStorage.getItem('ratioInfo', (err, result) => {
      if (err) {
         console.error(err)
      }

      parsedResult = JSON.parse(result)

      this.setState({
        ratio: parsedResult.ratio || 17,
        water: parsedResult.water || 510,
        coffee: parsedResult.coffee || 30,
      })
    })
    
  },

  render: function() {
    return (
      <View style={styles.container}> 
        <Nav style={styles.nav} title={this.props.title} left={{title: 'Back', goto: this.goBack}} />
        <View style={styles.mainView}>
          <Text>Coffee to Water Ratio</Text>
          <Text>1:</Text>
          <TextInput 
            keyboardType={'numeric'} 
            onChangeText={(e) => this.setState({ratio: +e})}
            onEndEditing={this.calculateWater}
            value={this.state.ratio + ""} 
            style={{height: 40}} 
            maxLength={5}
          />

          <Text>Water</Text>
          <TextInput 
            keyboardType={'numeric'}  
            onChangeText={(e) => this.setState({water: +e})}
            onEndEditing={this.calculateCoffee} 
            value={this.state.water.toString()} 
            style={{height: 40}} 
          />
          <Text>g</Text>

          <Text>Coffee</Text>
          <TextInput 
            keyboardType='numeric' 
            onChangeText={(e) => this.setState({coffee: +e})}
            onEndEditing={this.calculateWater}
            value={this.state.coffee.toString()} 
            style={{height: 40}} 
          />
          <Text>g</Text>
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
    mainView: {
      flex: 0.93,
      justifyContent: 'space-around',
      alignItems: 'center'
    }

});

module.exports = InfoPage