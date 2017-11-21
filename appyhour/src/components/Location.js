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
import firebase from '../firebase'
import {StackNavigator} from 'react-navigation'
import RestaurantItem from './RestaurantItem'
import Restaurant from './Restaurant'
import Test from './Test'


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

  //--------------------------------------------------------------------------
  //RENDER STARTS HERE
  render(){
    const { navigate } = this.props.navigation

    let distance = (myLat, myLong, lat, _long) => {
      let theDist = geolib.getDistance(
        {latitude: myLat, longitude: myLong}, {latitude: lat, longitude: _long}
      )
      return Math.round(theDist/1000) + ' KM'
      console.log(theDist);
    }
    let hours = (start, end) => {
      theHours = start + ' to ' + end
      return theHours
    }
    let itemPress = (data) =>  {
      console.log(data);
      navigate('Restaurant', {
        data: data
      })
    }


    return(
      <View style={styles.container}>
        <FlatList
          data={this.state.data}
          keyExtractor={this._keyExtractor}
          renderItem={
            ({item}) => {
              let distText = distance(
                this.state.myLat, this.state.myLong, item.lat, item.long)
              let hourText = hours(item.startTime, item.endTime)
              return (
                //to be optimized by only passing in the id to Restaurant component
                <RestaurantItem
                  navigation={navigate}
                  name={item.name}
                  icon={this.state.diningIcon}
                  img={item.imgPath}
                  distance={distText}
                  hours={hourText}
                  lat={item.lat}
                  long={item.long}
                  itemPress={itemPress}
                />
              )
            }
          } style={styles.listview}
        />
      </View>

    );

  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#5ED7FF',
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
