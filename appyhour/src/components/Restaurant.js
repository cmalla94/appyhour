import React from 'react'
import {Component} from 'react'
import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from 'react-native'
import firebase from './firebase'

export default class Restaurant extends Component {
  render(){

    return(
      <View style={styles.container}>
        <FlatList
          data={[
            {key: this.props.navigation.state.params.id},
            {key: this.props.navigation.state.params.name},
            {key: this.props.navigation.state.params.startDay},
            {key: this.props.navigation.state.params.endDay},
            {key: this.props.navigation.state.params.startTime},
            {key: this.props.navigation.state.params.endTime}
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
