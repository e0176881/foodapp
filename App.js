/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,StatusBar} from 'react-native';
import Routes from './src/Routes';


type Props = {};
export default class App extends Component<> {
  render() {
    return (
      <View style={styles.container}>
      <StatusBar
         backgroundColor="#1c313a"
         barStyle="light-content"
       />
      <Routes/>
    </View>


    );
  }
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
  }
});