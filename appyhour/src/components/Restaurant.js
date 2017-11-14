import React from 'react'
import {Component} from 'react'
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Button,
} from 'react-native'
import firebase from './firebase'
import {StackNavigator} from 'react-navigation'
import MapImage from './MapImage'


export default class Restaurant extends Component {
  constructor(props){
    super(props)
    this.state = {
      lat: '',
      _long: '',
    }
  }

  componentDidMount(){
    this.setState({
      lat: this.props.navigation.state.params.lat,
      _long: this.props.navigation.state.params.long
    })
  }
  render(){
    const { navigate } = this.props.navigation
    return(
      <View style={styles.container}>
        <FlatList
          data={[
            {key: this.props.navigation.state.params.id},
            {key: this.props.navigation.state.params.name},
            {key: this.props.navigation.state.params.startDay},
            {key: this.props.navigation.state.params.endDay},
            {key: this.props.navigation.state.params.startTime},
            {key: this.props.navigation.state.params.endTime},
            {key: this.props.navigation.state.params.lat},
            {key: this.props.navigation.state.params.long}
          ]}
          renderItem={
            ({item}) => {
              return(
                <View style={styles.li}>
                  <Text style={styles.liText}>{item.key}</Text>
                </View>
              )
            }
          } style={styles.listview}
        />
        <Button onPress={() =>
          navigate('MapImage',{
            lat: this.state.lat,
            _long: this.state._long
          })}
          title="Show me Map"/>


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
