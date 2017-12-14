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



export default class ByLocation extends Component {

  constructor(props){
    super(props)

    //this is the json of the Restaurants table in firebase db
    //*******UN COMMENT IF THE HOURS REF WAY DOESNT WORK*********//
    // this.restaurantRef = firebase.database().ref().
    //                       child('Restaurants')
    //*********************************************************//
    this.hoursRef = firebase.database().ref().
                      child('Hours/17/members')

    this.state = {

      data: [],
      foursquareDetails: [],
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

  //NEW METHOD FOR LISTENING TO Restaurants
  listenForHours(hoursRef, lat, long) {
    hoursRef.on('value', (snapshot) => {
      var restaurantIDs = []
      var restaurants = []
      var foursquareDetails = []
      snapshot.forEach((child) => {
        restaurantIDs.push(child.key)
        console.log("hoursRef.on method..... done")
      })
      //restaurantIDs.forEach((ID) => console.log("The restaurant id is: " + ID))
      //loop through the restaurantIDs array
      //api configurations

      let venueEndPoint = 'https://api.foursquare.com/v2/venues/'
      let config = 'client_id=HATDNQSDKZP0CBNXS1MFPY5LHNIWRUO20ABSN200332SSTJS&client_secret=PG1CZTXS5TL5ECZGFOLCSZQDLNRCAUC4BYJ0K1WL3ZAMTQ4P&v=20170801'
      console.log("this is restaurantIDs.length: " + restaurantIDs.length)
      restaurantIDs.forEach(async (ID) => {
        console.log("starting the api call thread........")
        //lets iterate and push the data into a temp array
        let res = await fetch(venueEndPoint + ID + '?' + config)
        let resJson = await res.json()
        console.log("resJson = " + resJson.response.venue.name);
        foursquareDetails.push({
          name: resJson.response.venue.name,
          lat: resJson.response.venue.location.lat,
          long: resJson.response.venue.location.lng
        })
        console.log("this is foursquareDetails.length: " + foursquareDetails.length)
      })


      restaurantIDs.forEach((ID) => {
        //this will be a snapshot of VenueIDs/
        firebase.database().ref('VenueIDs/' + ID).on(
          'value', (snapshot) => {
            //let venueDetails = await foursquareDetails.shift()
            console.log("this is foursquare.shift() : " + foursquareDetails);
            restaurants.push({
              //name: snapshot.val().name,
              startDay: snapshot.val().startDay,
              endDay: snapshot.val().endDay,
              startTime: snapshot.val().startTime,
              endTime: snapshot.val().endTime,
              id: snapshot.key,
              name: "test",
              lat: 11,
              long: 12
              //lat: snapshot.val().lat,
              //long: snapshot.val().long,
              //imgPath: snapshot.val().imgPath
           })
           restaurants.map(i => i.myLat = lat)
           restaurants.map(v => v.myLong = long)
           this.setState({data: restaurants})
        })
        console.log("this is the restaurants array after each push: " + restaurants)
      })
      console.log("This is the restaurants array: ......... " + restaurants);
    })
  }

  //listener that listens for changes to restaurantRef
  // listenForRestaurants(restaurantRef, lat, long) {
    //snapshot is the DatabaseSnapshot from firebase
    // restaurantRef.once('value', (snapshot) => {
      //an abitrary array that gets the key values pushed from
      //the DatabaseSnapshot
      //*********UNCOMMENT CODE FOR BEFORE HOURS BRANCH****//
      // var restaurants = [];
      // snapshot.forEach((child) => {
      //   restaurants.push({
      //     name: child.val().name,
      //     startDay: child.val().startDay,
      //     endDay: child.val().endDay,
      //     startTime: child.val().startTime,
      //     endTime: child.val().endTime,
      //     id: child.key,
      //     lat: child.val().lat,
      //     long: child.val().long,
      //     imgPath: child.val().imgPath,
      //     address: child.val().address
      //   })
      // })
      // restaurants.map(i => i.myLat = lat)
      // restaurants.map(v => v.myLong = long)
      // console.log('This is restaurants !!!!!!!');
      // console.log(restaurants);
      //***************************************************//
      //each time this function runs
      //setState for data array to be the restaurants array
      //that gets populated in the for loop
      //*********UNCOMMENT CODE FOR BEFORE HOURS BRANCH****//
  //     this.setState({data: restaurants})
  //   })
  // }
  //*********************************************************//
  componentDidMount(){
    //location of device passed from HomeScreen
    this.setState({
      //set the coords for the device, passed in from HomeScreen component
      myLat: this.props.navigation.state.params.myLat,
      myLong: this.props.navigation.state.params.myLong
    })
    //each time component is rendered, listen to firebase and push data into data[]
    this.listenForHours(this.hoursRef, this.props.navigation.state.params.myLat, this.props.navigation.state.params.myLong)

  }

  //returns the item's key, used in the renderRow in FlatList
  _keyExtractor(item){
    return item.id
  }



  //--------------------------------------------------------------------------
  //RENDER STARTS HERE
  render(){
    console.log("THIS IS DATA ARRAY IN LOCATION");
    console.log(this.state.data[0]);
    const { navigate } = this.props.navigation
    let dataArray = this.state.data
    let mapped = dataArray.map(function(el, i) {
      return {index: i, value: geolib.getDistance(
        {latitude: el.myLat, longitude: el.myLong},
        {latitude: el.lat, longitude: el.long}
      )}
    })
    console.log("MAPPINGGGGGGGGGGGGGGGGGGGGG");
    console.log(mapped);
    mapped.sort(function(a,b){
      if (a.value > b.value) {
        return 1
      }
      if (a.value < b.value) {
        return -1
      }
      return 0
    })
    console.log("MAPPPPPPPPED SORTED");
    console.log(mapped);
    let result = mapped.map(function(el){
      return dataArray[el.index]
    })
    console.log("RESULTTTTTTT");
    console.log(result);
    //geolib library method to get distance
    //distance is called each time a list item is rendered in the flatlist
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
    //navigate to Restaurant, the params are passed in the
    //Button component in RestaurantItem component
    let itemPress = (data) =>  {
      console.log(data);
      navigate('Restaurant', {
        data: data
      })
    }
    //let sortedData = geolib.orderByDistance({this.state.myLat, this.state.myLong})
    return(
      <View style={styles.container}>
        <FlatList
          data={result}
          keyExtractor={this._keyExtractor}
          renderItem={
            ({item}) => {
              let distText = distance(
                this.state.myLat, this.state.myLong, item.lat, item.long)
              let hourText = hours(item.startTime, item.endTime)
              return (
                  //to be optimized by only passing in the id to Restaurant component
                  <RestaurantItem
                    name={item.name}
                    icon={this.state.diningIcon}
                    img={item.imgPath}
                    distance={distText}
                    hours={hourText}
                    lat={item.lat}
                    long={item.long}
                    itemPress={itemPress}
                    myLat={this.state.myLat}
                    myLong={this.state.myLong}
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
