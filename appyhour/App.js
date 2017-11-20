import React from 'react';
import {Component} from 'react'
import {AppRegistry,} from 'react-native'
import {View,Text} from 'react-native'

import {StackNavigator} from 'react-navigation'

import HomeScreen from './src/components/HomeScreen'
import ByLocation from './src/components/Location'
import Rating from './src/components/Rating'
import Restaurant from './src/components/Restaurant'
import MapImage from './src/components/MapImage'
const RootNavigator = StackNavigator({
  Home: {
    screen: HomeScreen,
  },
  ByLocation: {
    screen: ByLocation
  },
  Rating: {
    screen: Rating
  },
  Restaurant: {
    screen: Restaurant
  },
  MapImage: {
    screen: MapImage
  },
})


export default class App extends React.Component {
  render() {
    return (
      <RootNavigator />
    );
  }
}


AppRegistry.registerComponent('App', () => App)
