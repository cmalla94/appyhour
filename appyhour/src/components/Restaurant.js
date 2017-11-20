import React from 'react'
import {Component} from 'react'
import {
  View,
  Text,
  FlatList,
  StyleSheet,
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
import MapImage from './MapImage'
import geolib from 'geolib'


export default class Restaurant extends Component {
  constructor(props){
    super(props)
    this.state = {
      lat: '',
      _long: '',
      img: '../../assests/icon.png',
      diningIcon: 'https://firebasestorage.googleapis.com/v0/b/appyhour-113cc.appspot.com/o/diningIcon.png?alt=media&token=af5d0eef-7c7b-4bce-82ba-d24aa0ad4d7d',

    }
  }

  componentDidMount(){
    //once the Restaurant component gets rendered,
    //will update the state values of lat and _long of the restaurant
    //passed in from the ByLocation component in Location.js
    this.setState({
      lat: this.props.navigation.state.params.lat,
      _long: this.props.navigation.state.params.long
    })
  }
  //method to take in imgPath passed in from Location component
  getImage(path) {
    //returns the download url from the firebase storage where image is stored
    firebase.storage().refFromURL(path).getDownloadURL().then((url) => {
      this.setState({img: url}) //img is set to uri: url
      //in image , only need to pass this.state.img in source
      console.log(this.state.img);
    })
  }

  render(){
    const { navigate } = this.props.navigation
    // let distance = geolib.getDistance(
    //   {latitude: this.props.navigation.state.params.myLat, longitude: this.props.navigation.state.params.myLong },
    //   {latitude: this.props.navigation.state.params.lat, longitude: this.props.navigation.state.params.long}
    // )
    // distance = Math.round(distance/1000)
    let hours = this.props.navigation.state.params.startTime + ' to ' + this.props.navigation.state.params.endTime;
    let img = this.props.navigation.state.params.img
    return(
      <View style={styles.container}>
        <Content>
          <Card>
            <CardItem style={{backgroundColor: '#fffacd'}}>
              <Left>
                <Thumbnail source={{uri: this.state.diningIcon}} />
                <Body>
                  <Text>{this.props.navigation.state.params.name}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image source={{uri: img}} style={{height: 200, width: null, flex: 1}}/>
            </CardItem>
            <CardItem style={{backgroundColor: '#fffacd'}}>
              <Left>
                <Text>KM</Text>
              </Left>
              <Body>
                <Text>{hours}</Text>
              </Body>
              <Right>
                <Button onPress={() =>
                  navigate('MapImage',{
                    //pass the coords of the restaurant to the MapImage component
                    lat: this.state.lat,
                    _long: this.state._long
                  })} title="Show Map" />
              </Right>
            </CardItem>
          </Card>
        </Content>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2f2f2',
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
