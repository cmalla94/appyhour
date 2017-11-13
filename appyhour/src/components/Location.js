import React from 'react'
import {Component} from 'react'
import {
  ScrollView,
  Text,
  FlatList,
  StyleSheet,
  View,

} from 'react-native'
import firebase from '../firebase'
import ListItem from './ListItem'
import Restaurant from './Restaurant'


export default class Location extends Component {

  constructor(props){
    super(props)
    const {navigate} = this.props.navigation
    //this is the json of the Restaurants table in firebase db
    this.restaurantRef = firebase.database().ref().
                          child('Restaurants')

    this.state = {
      data: []
    }
  }

  //listener that listens for changes to restaurantRef
  listenForRestaurants(restaurantRef) {
    //snapshot is the DatabaseSnapshot from firebase
    restaurantRef.on('value', (snapshot) => {
      //an abitrary array that gets the key values pushed from
      //the DatabaseSnapshot
      var restaurants = [];
      snapshot.forEach((child) => {
        restaurants.push({
          name: child.val().name,
          id: child.key
        })
      })
      //each time this function runs
      //setState for data array to be the restaurants array
      //that gets populated in the for loop
      this.setState({data: restaurants})
    })
  }
  componentDidMount(){
    this.listenForRestaurants(this.restaurantRef)
  }
  _keyExtractor(item){
    console.log(item.id)
    return item.id
  }
  _renderItem({item}){
    itemPress = () => {navigate('Restaurant') }
    return(
      <ListItem item={item} onPress={itemPress} />

    )
  }



  render(){

    return(
      <View style={styles.container}>
        <FlatList
          data={this.state.data}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem} style={styles.listview}
        />
      </View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2f2f2',
    flex: 1,
  },
  liContainer: {
    flex: 2,
  },
  listview: {
    flex: 1,
  },
})
