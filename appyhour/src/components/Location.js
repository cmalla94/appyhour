import React from 'react'
import {Component} from 'react'
import {
  ScrollView,
  Text,
  FlatList,
  StyleSheet,
  View,
  TouchableHighlight,
  Button,
  Image,
} from 'react-native'
import {
  Content,
  Card,
  CardItem,
  Thumbnail,
  Icon,
  Left,
  Body,
  Right,
} from 'native-base'
import firebase from '../firebase'
import {StackNavigator} from 'react-navigation'
import ListItem from './ListItem'
import Restaurant from './Restaurant'


export default class ByLocation extends Component {

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
      long: '',
      myLat: '',
      myLong: '',
      imgPath: '',
      diningIcon: 'https://firebasestorage.googleapis.com/v0/b/appyhour-113cc.appspot.com/o/diningIcon.png?alt=media&token=af5d0eef-7c7b-4bce-82ba-d24aa0ad4d7d',

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
          id: child.key,
          lat: child.val().lat,
          long: child.val().long,
          imgPath: child.val().imgPath

        })
      })
      //each time this function runs
      //setState for data array to be the restaurants array
      //that gets populated in the for loop
      this.setState({data: restaurants})
    })
  }

  componentDidMount(){
    //each time component is rendered, listen to firebase and push data into data[]
    this.listenForRestaurants(this.restaurantRef)
    this.setState({
      //set the coords for the device, passed in from HomeScreen component
      myLat: this.props.navigation.state.params.myLat,
      myLong: this.props.navigation.state.params.myLong
    })
  }

  _keyExtractor(item){
    return item.id
  }


  render(){
    const { navigate } = this.props.navigation
    // let text = this.state.myLat + ' ' + this.state.myLong //
    // let distance = geolib.getDistance(
    //   {latitude: this.state.myLat, longitude: this.state.myLong },
    //   {latitude: this.props.navigation.state.params.lat, longitude: this.props.navigation.state.params.long}
    // )
    // distance = Math.round(distance/1000)
    // let hours = this.props.navigation.state.params.startTime + ' to ' + this.props.navigation.state.params.endTime;
    return(
      <View style={styles.container}>
        <FlatList
          data={this.state.data}
          keyExtractor={this._keyExtractor}
          renderItem={
            ({item}) => {
              return (
                //to be optimized by only passing in the id to Restaurant component
                <TouchableHighlight onPress={() =>
                  navigate('Restaurant', {
                      id: item.id,
                      name: item.name,
                      startDay: item.startDay,
                      endDay: item.endDay,
                      startTime: item.startTime,
                      endTime: item.endTime,
                      lat: item.lat,
                      long: item.long,
                      myLat: this.state.myLat,
                      myLong: this.state.myLong,
                      imgPath: item.imgPath,
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
