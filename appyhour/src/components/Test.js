import React from 'react'
import {Component} from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native'
import firebase from '../firebase'




export default class Test extends Component{
  constructor(){
    super()

    this.FourSquareVenueIDRef = firebase.database()
      .ref().child('VenueIDs')
    this.venueID = '4b77ba28f964a52064a82ee3'
  }
  //Getting the IDs from the table in firebase
  listenForVenues(FourSquareVenueIDRef) {
    FourSquareVenueIDRef.once('value',
    (snapshot) => {
      var IDArray = []
      //for loop starts
      snapshot.forEach((child) => {
        IDArray.push(child.key)
      })
      //for loop ends
      console.log("The IDArray is:  " + IDArray)
    })
  }
  //pass in the venueID and try to fetch from foursquare api
  getVenueDetails(venueID){
    let venueEndPoint = 'https://api.foursquare.com/v2/venues/'
    let VENUE_ID = venueID
    const params = 'client_id=HATDNQSDKZP0CBNXS1MFPY5LHNIWRUO20ABSN200332SSTJS&client_secret=PG1CZTXS5TL5ECZGFOLCSZQDLNRCAUC4BYJ0K1WL3ZAMTQ4P&v=20170801'
    // const params = {
    //   clientID: 'HATDNQSDKZP0CBNXS1MFPY5LHNIWRUO20ABSN200332SSTJS',
    //   clientSecret: 'PG1CZTXS5TL5ECZGFOLCSZQDLNRCAUC4BYJ0K1WL3ZAMTQ4P',
    //   style: 'foursquare', // default: 'foursquare'
    //   version: '20170801', //  default: '20140806'
    //   VENUE_ID: '4b77ba28f964a52064a82ee3'
    // }
    fetch(venueEndPoint + VENUE_ID + '?' + params)
      .then(response => response.json())
        .then((responseJson) => console.log(responseJson.response.venue.name))
  }


  componentDidMount(){
    //this.listenForVenues(this.FourSquareVenueIDRef)
    this.getVenueDetails(this.venueID)

  }
  render(){
    return(
      <View>
        <Text>TEST</Text>
      </View>
    )
  }
}
