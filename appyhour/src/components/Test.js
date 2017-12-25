import React from 'react'
import {Component} from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
} from 'react-native'
import {Spinner} from 'native-base'
import firebase from '../firebase'
import RestaurantItem from './RestaurantItem'




export default class Test extends Component{
  constructor(){
    super()

    this.FourSquareVenueIDRef = firebase.database()
      .ref().child('VenueIDs')
    this.venueID = '4b77ba28f964a52064a82ee3'
    this.state = {
      data: [],
      loaded: false,
    }
  }
  //Getting the IDs from the table in firebase
  listenForVenues(FourSquareVenueIDRef) {
    let IDArray = []
    FourSquareVenueIDRef.on('value',
    (snapshot) => {
      //for loop starts
      snapshot.forEach((child) => {
        //console.log("this is the child.key in first loop : " + child.key);
        IDArray.push(child.key)
      })
    //console.log("The IDArray is:  " + IDArray)
    let venueEndPoint = 'https://api.foursquare.com/v2/venues/'
    const config = 'client_id=HATDNQSDKZP0CBNXS1MFPY5LHNIWRUO20ABSN200332SSTJS&client_secret=PG1CZTXS5TL5ECZGFOLCSZQDLNRCAUC4BYJ0K1WL3ZAMTQ4P&v=20170801'
    let data = []
    IDArray.forEach(async (id) => {
      console.log("Trying to fetch data for : " + id);
      const res = await fetch(venueEndPoint + id + '?' + config)
      const resJson = await res.json()
      console.log("The venue name is : " + resJson.response.venue.name);
      await data.push({
        id: id,
        name: resJson.response.venue.name
      })
      data.length === IDArray.length ? this.setState({
        data: data,
        loaded: true

      }) : null
    })
  }
)}
//key extracter for the flatlist
_keyExtractor(item){
  return item.id
}
  //COMPONET DID MOUNT ::
  componentDidMount() {
    this.listenForVenues(this.FourSquareVenueIDRef)
  }
  render(){
    let dataArray = this.state.data
    this.state.loaded ? console.log(this.state.loaded) : null
    this.state.loaded ? console.log(this.state.data) : null

    return(
      <View style={styles.container}>
        { this.state.loaded ? (<FlatList
          data={dataArray}
          keyExtractor={this._keyExtractor}
          renderItem={
            ({item}) => {
              return (
                <RestaurantItem
                  name={item.name}
                  // icon={this.state.diningIcon}
                  // img={item.imgPath}
                  distance={this.state.loaded}
                  // hours={hourText}
                  // lat={item.lat}
                  // long={item.long}
                  // itemPress={itemPress}
                  // myLat={this.state.myLat}
                  // myLong={this.state.myLong}
                />
              )
            }
          } style={styles.listview}
        /> ): (<Spinner color="green" />) }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#5ED7FF',
    flex: 1,
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
