import React, {Component} from 'react'
import {
  View,
  TouchableHighlight,
  Text,
  StyleSheet,
} from 'react-native';
import {StackNavigator} from 'react-navigation'
import Restaurant from './Restaurant'



export default class ListItem extends Component {
  render() {
    const { navigate } = this.props.navigation
    return (
      <TouchableHighlight onPress={() => navigate('Restaurant')}>
        <View style={styles.li}>
          <Text style={styles.liText}>{this.props.item.name}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
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
