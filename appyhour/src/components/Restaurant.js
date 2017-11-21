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
      long: '',
      img: '../../assests/icon.png',
      diningIcon: 'https://firebasestorage.googleapis.com/v0/b/appyhour-113cc.appspot.com/o/diningIcon.png?alt=media&token=af5d0eef-7c7b-4bce-82ba-d24aa0ad4d7d',

    }
  }

  componentDidMount(){
    //once the Restaurant component gets rendered,
    //will update the state values of lat and _long of the restaurant
    //passed in from the ByLocation component in Location.js
    this.setState({
      lat: this.props.navigation.state.params.data.lat,
      long: this.props.navigation.state.params.data.long
    })
  }
  //-----------------------------------------------------------------------
  //RENDER STARTS HERE
  render(){
    const { navigate } = this.props.navigation
    let distance = geolib.getDistance(
      {latitude: this.props.navigation.state.params.data.myLat, longitude: this.props.navigation.state.params.data.myLong },
      {latitude: this.props.navigation.state.params.data.lat, longitude: this.props.navigation.state.params.data.long}
    )
    distance = Math.round(distance/1000)
    let hours = this.props.navigation.state.params.data.hours
    // this.props.navigation.state.params.data.startTime + ' to ' + this.props.navigation.state.params.data.endTime;
    let img = this.props.navigation.state.params.data.img
    console.log("REEEEEEE");
    console.log(this.props);
    return(
      <View style={styles.container}>
        <Content>
          <Card>
            <CardItem style={{backgroundColor: '#fffacd'}}>
              <Left>
                <Thumbnail source={{uri: this.state.diningIcon}} />
                <Body>
                  <Text>{this.props.navigation.state.params.data.name}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image source={{uri: img}} style={{height: 200, width: null, flex: 1}}/>
            </CardItem>
            <CardItem style={{backgroundColor: '#fffacd'}}>
              <Left>
                <Text>{distance} KM</Text>
              </Left>
              <Body>
                <Text>{hours}</Text>
              </Body>
              <Right>
                <Button onPress={() =>
                  navigate('MapImage',{
                    //pass the coords of the restaurant to the MapImage component
                    lat: this.state.lat,
                    long: this.state.long
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
