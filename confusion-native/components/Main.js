import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Menu from './Menu';
import {DISHES} from '../shared/dishes';

class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES
    }
  }

  render() {
    return (
      <Menu dishes={this.state.dishes}/>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Main;
