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
import {Spinner} from 'native-base'
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
      mergeData: [],
      data: [],
      foursquareArray: [],
      foursquareLoaded: false,
      dataMerged: false,
      readyToRender: false,
      id: '',
      startDay: '',
      endDay: '',
      startTime: '',
      endTime: '',
      myLat: '',
      myLong: '',
      name: '',
      lat: '',
      long: '',
      diningIcon: 'https://firebasestorage.googleapis.com/v0/b/appyhour-113cc.appspot.com/o/diningIcon.png?alt=media&token=af5d0eef-7c7b-4bce-82ba-d24aa0ad4d7d',
    }
  }

  //NEW METHOD FOR LISTENING TO Restaurants
  listenForHours(hoursRef, lat, long) {
    hoursRef.on('value', (snapshot) => {
      var restaurantIDs = []
      var restaurants = []
      snapshot.forEach((child) => {
        restaurantIDs.push(child.key)
      })
      restaurantIDs.forEach((ID) => {
        //console.log("The id number is : " + ID);
        //this will be a snapshot of VenueIDs/
        firebase.database().ref('VenueIDs/' + ID).on(
          'value', (snapshot) => {
            restaurants.push({
              startDay: snapshot.val().startDay,
              endDay: snapshot.val().endDay,
              startTime: snapshot.val().startTime,
              endTime: snapshot.val().endTime,
              id: snapshot.key,
              //imgPath: snapshot.val().imgPath
           })
           restaurants.map(i => i.myLat = lat)
           restaurants.map(v => v.myLong = long)
           this.setState({data: restaurants})
        })
        //console.log("this is the restaurants array after each push: " + restaurants)
      })
      //
      //console.log("This is the restaurants array: ......... " + restaurants);
    })
  }
  foursquareDataFetch(hoursRef) {
    hoursRef.on('value', (snapshot) => {
      let IDArray = []
      let foursquareArray = []
      snapshot.forEach((child) => {
        IDArray.push(child.key)
        //console.log("child.key ==== " + child.key);
      })
      let venueEndPoint = 'https://api.foursquare.com/v2/venues/'
      const config = 'client_id=HATDNQSDKZP0CBNXS1MFPY5LHNIWRUO20ABSN200332SSTJS&client_secret=F54DMUF3U5KGE420IZPR1MQ2UPFHPKPXUAEYBUIZL42VXJZC&v=20170801'
      IDArray.forEach(async (id) => {
        const res = await fetch(venueEndPoint + id + '?' + config)
        const resJson = await res.json()
        console.log("resJson.response.venue.name: ====== " + resJson.response.venue.name)
        await foursquareArray.push({
          id: id,
          name: resJson.response.venue.name,
          lat: resJson.response.venue.location.lat,
          long: resJson.response.venue.location.lng
        })
        foursquareArray.length === IDArray.length ? this.setState({
          foursquareArray: foursquareArray,
          foursquareLoaded: true
        }) : null
      })
    })
  }
  //returns the item's key, used in the renderRow in FlatList
  _keyExtractor(item){
    return item.id
  }
  //MERGE DATA FUNCTION
  mergeData(arr1, arr2) {
    let dataArray = arr1
    let foursquareData = arr2
    //STEP 1: get both arrays in the same order
    //map by the id number
    let mappedData = dataArray.map((el, i) => {
      return {index: i, value: el.id}
    })
    // console.log("mappedData ========================")
    // console.log(mappedData)
    // console.log("end===f=sdfa=sd=f=asdf=asd=f=asd=f=asd=f=asd=f=asd=f")
    let mappedFoursquare = foursquareData.map((el, i ) => {
      return {index: i, value: el.id}
    })
    //SORT by the ID numbers
    mappedData.sort(function(a,b){
      if (a.value > b.value) {
        return 1
      }
      if (a.value < b.value) {
        return -1
      }
      return 0
    })
    // console.log("mappedData SORTED ======================")
    // console.log(mappedData)
    // console.log("end-=====================================")
    mappedFoursquare.sort(function(a,b){
      if (a.value > b.value) {
        return 1
      }
      if (a.value < b.value) {
        return -1
      }
      return 0
    })
    // console.log("mappedFoursquare SORTED========================")
    // console.log(mappedFoursquare)
    // console.log("end======================================")
    //Step 2: NOW PUSH THE OBJECTS FROM dataArray and foursquareData into new array with a certain order
    let data = []
    mappedData.forEach((obj) => {
      data.push(dataArray[obj.index])
    })
    // console.log("data======================================")
    // data ? console.log(data) : null
    // console.log("end--------------------------------------")
    let fsData = []
    mappedFoursquare.forEach((obj) => {
      fsData.push(foursquareData[obj.index])
    })
    //STEP 3 merge the two arrays
    let i = 0
    let merge = false
    data.forEach((obj) => {
      //console.log("fsData[i] ====== "  + fsData[i])
      Object.assign(obj, fsData[i])
      //console.log("data[i].name ====== " + data[i].name);
      i++
      i === data.length ? merge = true : null
    })
    const merged = i === data.length ? data : false
    //console.log(merged)
    return merged
  }

  //COMPONET DID MOUNT : :
  componentDidMount(){
    console.log("componentDidMount")
    //location of device passed from HomeScreen
    this.setState({
      //set the coords for the device, passed in from HomeScreen component
      myLat: this.props.navigation.state.params.myLat,
      myLong: this.props.navigation.state.params.myLong
    })
    //each time component is rendered, listen to firebase and push data into data[]
    this.listenForHours(this.hoursRef, this.props.navigation.state.params.myLat, this.props.navigation.state.params.myLong)
    this.foursquareDataFetch(this.hoursRef)
  }
  //--------------------------------------------------------------------------
  //RENDER STARTS HERE
  render(){
    const { navigate } = this.props.navigation
    let result = []
    let readyToRender = false
    //MERGE BOTH ARRAYS--------------------------------------------------------
    this.state.foursquareLoaded ? console.log("foursquareLoaded: " + this.state.foursquareLoaded) : null
    const dataMerged = this.state.foursquareLoaded ? this.mergeData(this.state.data, this.state.foursquareArray) : null
    dataMerged ? console.log("data is merged :   " + dataMerged) : null
    //SORT ARRAY BY DISTANCE---------------------------------------------------
    if(dataMerged){
      let data = dataMerged
      console.log("DATA ARRAY AFTER BEING MERGEDDDDDDDDD!!!!!!");
      console.log(data)
      console.log("END=======================================");
      let mapped = data.map(function(el, i) {
        return {index: i, value: geolib.getDistance(
          {latitude: el.myLat, longitude: el.myLong},
          {latitude: el.lat, longitude: el.long}
        )}
      })
      console.log("MAPPINGGGGGGGGGGGGGGGGGGGGG");
      console.log(mapped)
      mapped.sort(function(a,b){
        if (a.value > b.value) {
          return 1
        }
        if (a.value < b.value) {
          return -1
        }
        return 0
      })
      //console.log("MAPPPPPPPPED SORTED");
      //console.log(mapped);
      result = mapped.map(function(el){
        return data[el.index]
      })
      readyToRender = result.length === data.length ? true : false
      console.log("readyToRender=======                " + readyToRender)
    } else {null}
    readyToRender ? console.log(readyToRender) : null
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
        { !readyToRender ? (<Spinner color="green" />)
          : (<FlatList
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
                    img={this.state.diningIcon}
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
          />)}
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
