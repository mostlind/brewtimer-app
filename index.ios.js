/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

'use strict'

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Image,
  Text,
  View,
  Navigator
} from 'react-native';

const MainPage = require("./mainpage")
const Brew = require("./brew")
const PouroverOptions = require("./pourover-options")
const PressOptions = require('./press-options.js')
const InfoPage = require('./infopage')


class brewtimer extends Component {
  render() {
    return (
      <Navigator
        renderScene={this.renderScene.bind(this)}
        initialRoute={{id: 'mainpage', name:'Choose Your Method'}}
      />
    );
  }

  renderScene(route, navigator) {

    if (route.id === 'mainpage') {
      return (
        <MainPage title={route.name} navigator={navigator} />
      )
    }

    if (route.id === 'chemex') {
      return (
        <Brew isChemex={true} title={'Pourover'} navigator={navigator} />
      )
    }

    if (route.id === 'press') {
        return (
        <Brew isChemex={false} title={'French Press'} navigator={navigator} />
      )
    }

    if (route.id === 'pourover-options') {
      return (
        <PouroverOptions title={route.name} navigator={navigator} />
      )
    }

    if (route.id === 'press-options') {
      return (
        <PressOptions title={route.name} navigator={navigator} />
      )
    }

    if (route.id === 'infopage') {
      return (
        <InfoPage title={route.name} navigator={navigator} />
      )
    }

  }
}


AppRegistry.registerComponent('brewtimer', () => brewtimer);
