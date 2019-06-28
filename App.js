/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,AsyncStorage} from 'react-native';
import Tabs from './src';


type Props = {};
const key= 'state';
export default class App extends Component<Props> {
  state={
    cities:[]
  }
  addCity= (city)=>{
    const cities=this.state.cities
    cities.push(city);
    this.setState({cities});
    AsyncStorage.setItem(key,JSON.stringify(cities))
    .then(()=> console.log('storage updated!'))
    .catch(()=> console.log('e:',e));
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
    this.setState({cities},()=>{
      AsyncStorage.setItem(key,JSON.stringify(cities))
      .then(()=> console.log('storage updated!'))
      .catch(e=> console.log('e:',e));
    });
  }
  async componentDidMount(){
    try{
      let cities=await AsyncStorage.getItem(key);
      if(cities!=null){
        cities=JSON.parse(cities);
        this.setState({cities});
      }
    }catch(e){
      console.log('error from AsyncStorage',e);
    }
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
