import React from 'react'
import {Component} from 'react'
import {
  ScrollView,
  Text,
  FlatList,
  StyleSheet,
  View,
  TouchableHighlight,

} from 'react-native'
import firebase from '../firebase'
import {StackNavigator} from 'react-navigation'
import ListItem from './ListItem'
import Restaurant from './Restaurant'


export default class Location extends Component {

  constructor(props){
    super(props)

    //this is the json of the Restaurants table in firebase db
    this.restaurantRef = firebase.database().ref().
                          child('Restaurants')
    this.state = {
      data: [],
      id: '',
      startDay: '',
      endDay: '',
      startTime: '',
      endTime: '',
      name: '',
      lat: '',
      long: ''
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
          startDay: child.val().startDay,
          endDay: child.val().endDay,
          startTime: child.val().startTime,
          endTime: child.val().endTime,
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

  render(){
    const { navigate } = this.props.navigation
    return(
      <View style={styles.container}>
        <FlatList
          data={this.state.data}
          keyExtractor={this._keyExtractor}
          renderItem={
            ({item}) => {
              return (
                <TouchableHighlight onPress={() =>
                  navigate('Restaurant', {id: item.id,
                    name: item.name,
                    startDay: item.startDay,
                    endDay: item.endDay,
                    startTime: item.startTime,
                    endTime: item.endTime,
                    lat: item.lat,
                    long: item.long
                    })}>
                  <View style={styles.li}>
                    <Text style={styles.liText}>{item.name}</Text>
                  </View>
                </TouchableHighlight>
              )
            }
          } style={styles.listview}
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
  liText: {
    color: '#333',
    fontSize: 16,
  },
  li: {
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderColor: 'transparent',
    borderWidth: 1,
    paddingLeft: 16,
    paddingTop: 14,
    paddingBottom: 16,
  },
})
