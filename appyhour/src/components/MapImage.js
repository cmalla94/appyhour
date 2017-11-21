import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Text,
} from 'react-native'
import MapView from 'react-native-maps'

export default class MapImage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lat: 37.78825,
      long: -122.4324,
      latDelta: 0.0008,
      longDelta: 0.0008,

    }
  }
  render(){
    return(
      <View style={styles.container}>
        <MapView style={styles.map}
          initialRegion={{
            latitude: this.props.navigation.state.params.lat,
            longitude: this.props.navigation.state.params.long,
            latitudeDelta: this.state.latDelta,
            longitudeDelta: this.state.longDelta,
          }}
        >
          <MapView.Marker
            coordinate={{
              latitude: this.props.navigation.state.params.lat,
              longitude: this.props.navigation.state.params.long
            }}
          />
        </MapView>
      </View>


    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5ED7FF',

  },
  map: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
  },
})
