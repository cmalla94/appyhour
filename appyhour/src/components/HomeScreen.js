import React from 'react'
import {Component} from 'react'
import {View, Text, Button} from 'react-native'

import Location from './Location'
import Rating from './Rating'




export default class HomeScreen extends Component {
  render(){
    const { navigate } = this.props.navigation
    return(
      <View>
        <Button onPress={()=> navigate('Location')} title="Search By Location"/>
        <Button onPress={()=> navigate('Rating')} title="Search By Rating"/>

      </View>
    )
  }

}
