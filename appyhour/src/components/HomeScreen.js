import React from 'react'
import {Component} from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native'
import { Constants, Location, Permissions} from 'expo'
import {Button} from 'native-base'
import ByLocation from './Location'
import Rating from './Rating'
import Test from './Test'




//HomeScreen component
export default class HomeScreen extends Component {
  state = {
    myLat: null, //pass to Location component
    myLong: null, //pass to Location component
    errorMessage: null,
    backgroundUrl: 'https://firebasestorage.googleapis.com/v0/b/appyhour-113cc.appspot.com/o/craft.jpg?alt=media&token=aedbf424-41fb-4644-80a9-135fd5d15c4d',
  }

  componentDidMount() {
    //get the devices position once mounted
    this._getLocationAsync()
  }

  _getLocationAsync = async () => {
    //first time -> alerts user to allow app to use device location
    let { status } = await Permissions.askAsync(Permissions.LOCATION)
    if (status != 'granted') {
      //if user denies -> set state of errorMessage to that response
      this.setState ({
        errorMessage: 'Permissions to access location denied.',
      })
    }
    //else -> let variable location be the current location using expo's Location api
    let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true})
    //set myLat and myLong states to device coords
    this.setState({myLat: location.coords.latitude, myLong: location.coords.longitude})
  }
  render(){
    //will use navigate to navigate to Location
    const { navigate } = this.props.navigation
    //message to be displayed while we await response from _getLocationAsync
    let text = 'Waiting...'
    if (this.state.errorMessage) {
      //errorMessage will be displayed if user denied location permissions
      text = this.state.errorMessage
    }
    else if (this.state.myLat ) {
      //else the user's device coords
        text = this.state.myLat + ' ' + this.state.myLong

    }
    const resizeMode = 'center';

    return(
      // <View style={{flex: 1, backgroundColor: '#eee',}}>
      //   <View style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',}}>
      <Image style={styles.backgroundImage} source={{ uri: this.state.backgroundUrl }}>
        {/* </View> */}
        <View style={{flex: 1, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center'}}>
            <Button full success onPress={()=> navigate('ByLocation', {
              myLat: this.state.myLat,
              myLong: this.state.myLong
            })}>
              <Text>Search by Location</Text>
            </Button>
            <Button full primary onPress={()=> navigate('Rating')} title="Search By Rating">
              <Text>Search by Ratings</Text>
            </Button>
            <Button full danger onPress={() => navigate('Test')} title="Testing Page">
              <Text> Testing Page </Text>
            </Button>
        </View>
      </Image>

    )
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    backgroundColor: '#ccc',
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  }
})
