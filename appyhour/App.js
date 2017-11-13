import React from 'react';
import {Component} from 'react'
import {AppRegistry,} from 'react-native'
import {View,Text} from 'react-native'

import {StackNavigator} from 'react-navigation'

import HomeScreen from './src/components/HomeScreen'
import Location from './src/components/Location'
import Rating from './src/components/Rating'

const RootNavigator = StackNavigator({
  Home: {
    screen: HomeScreen,
  },
  Location: {
    screen: Location
  },
  Rating: {
    screen: Rating
  }
})


export default class App extends React.Component {
  render() {
    return (
      <RootNavigator />
    );
  }
}


AppRegistry.registerComponent('App', () => App)
