/**
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Animated
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Ionicons';

export default class App extends Component<{}> {

  constructor() {
    super();
    this.state = {
      isLoading: true,
      isLightOn: false,
      fadeAnimation: new Animated.Value(1)
    }
    this.buttonPress = this.buttonPress.bind(this);
  }
  
  componentDidMount() {
    setTimeout(() => {this.startAnimation()}, 1000);
    setTimeout(() => {this.setState({ isLoading: false })}, 1500);
  }

  buttonPress() {
    this.setState({ isLightOn: !this.state.isLightOn});
  }

  startAnimation() {
      Animated.timing(
        this.state.fadeAnimation,
        {
          toValue: 0,
          duration: 500,
          useNativeDriver: true
        },
      )
    .start();
  }

  _renderInitPage() {
    return (
      <View style={styles.initContainer}>
      <Animated.View style={{ opacity: this.state.fadeAnimation }}>
      <Icon name="md-bulb" size={80} color={'#ededed'} style={styles.icon}/>
      <Text style={styles.appName}>LIGHT UP</Text>
      <Text style={styles.owner}>by MindHunt</Text>
      </Animated.View>
      </View>
    );
  }

  _renderMainContainer() {
    return (
      <View style={[styles.mainContainer, { backgroundColor: this.state.isLightOn ? '#ffffff' : '#2d2d2d'}]}>
        <Icon name="md-power" size={75} color={this.state.isLightOn ? '#2d2d2d': '#ededed'} onPress={this.buttonPress}/>
        </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
       {this.state.isLoading ? this._renderInitPage() : this._renderMainContainer()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  initContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2d2d2d'
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buton: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  appName: {
    color: '#ededed',
    alignSelf: 'center',
    fontSize: 24,
    fontWeight: '700',
    paddingTop: 10
  }, 
  icon: {
    alignSelf: 'center'
  },
  owner: {
    color: '#ededed',
    alignSelf: 'center',
    fontSize: 14,
    fontWeight: '400',
    paddingTop: 8, 
  }
});
