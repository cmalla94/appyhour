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
    this.state = {
      params: {}
    }
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
  async getVenueDetails(venueID){
    let venueEndPoint = 'https://api.foursquare.com/v2/venues/'
    let VENUE_ID = venueID
    const config = 'client_id=HATDNQSDKZP0CBNXS1MFPY5LHNIWRUO20ABSN200332SSTJS&client_secret=PG1CZTXS5TL5ECZGFOLCSZQDLNRCAUC4BYJ0K1WL3ZAMTQ4P&v=20170801'
    const res = await fetch(venueEndPoint + VENUE_ID + '?' + config)
    const resJson = await res.json()
    console.log(resJson)
    const params = {
      name: resJson.response.venue.name,
      lat: resJson.response.venue.location.lat,
      long: resJson.response.venue.location.lng
    }
    console.log(params)
    this.setState({params: params})
  }
  componentDidMount() {
    this.getVenueDetails(this.venueID)
  }
  render(){
    let result = this.state.params.name

    console.log(result)
    return(
      <View>
        <Text>{result}</Text>
      </View>
    )
  }
}
