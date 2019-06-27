/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Tabs from './src';

type Props = {};
export default class App extends Component<Props> {
  state={
    cities:[]
  }
  addCity= (city)=>{
    const cities=this.state.cities
    cities.push(city);
    this.setState({cities})
  }
  addLocation=(location,city)=>{
    const index=this.state.cities.findIndex(item=>{
      return item.id === city.id
    });
    const chosenCity=this.state.cities[index];
    chosenCity.locations.push(location);
    const cities=[
      ...this.state.cities.slice(0,index),
      chosenCity,
      ...this.state.cities.slice(index+1)
    ]
    this.setState({cities});
  }
  render() {
    return (
      <Tabs screenProps={{cities:this.state.cities,addCity:this.addCity,addLocation:this.addLocation}}/>
      
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
