import React, {Component} from 'react'
import {
  View,
  TouchableHighlight,
  Text,
  StyleSheet,
  Image,
  Button,
} from 'react-native';
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
import {StackNavigator} from 'react-navigation'
import Restaurant from './Restaurant'
import Test from './Test'



export default class RestaurantItem extends Component {
  constructor(props){
    super(props)
  }
  render() {
    // const {navigate} = this.props.navigation
    let data = {
      name: this.props.name,
      hours: this.props.hours,
      img: this.props.img,
      lat: this.props.lat,
      long: this.props.long,
      myLat: this.props.myLat,
      myLong: this.props.myLong
    }
    return (
      <View style={styles.container}>
        <Content>
          <Card>
            <CardItem style={{backgroundColor: '#fffacd'}}>
              <Left>
                {/* //the prop is this.state.diningIcon */}
                <Thumbnail source={{uri: this.props.icon}} />
                <Body>
                  {/* //prop: item.name */}
                  <Text>{this.props.name}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              {/* //prop: this.state.img (needs to be changed) */}
              <Image source={{uri: this.props.img}} style={{height: 200, width: null, flex: 1}}/>
            </CardItem>
            <CardItem style={{backgroundColor: '#fffacd'}}>
              <Left>
                <Text>{this.props.distance}</Text>
              </Left>
              <Body>
                <Text>{this.props.hours}</Text>
              </Body>
              <Right>
                {/* //prop: itemPress() function */}

                <Button onPress={() => this.props.itemPress(data)} title="Details" />
                {/* <Button onPress={() =>
                  navigate('MapImage',{
                    //pass the coords of the restaurant to the MapImage component
                    lat: this.state.lat,
                    _long: this.state._long
                  })} title="Show Map" /> */}
              </Right>
            </CardItem>
          </Card>
        </Content>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#5ED7FF',
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
