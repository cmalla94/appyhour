import React from 'react';
import {AppRegistry, Component} from 'react-native'
import {StackNavigator} from 'react-navigation'


const RootNavigator = StackNavigator({
  Home: {
    screen: HomeScreen,
  } ,

})

export default class App extends React.Component {
  render() {
    return (
      <RootNavigator />
    );
  }
}


AppRegistry.registerComponent('App', () => App)
