import React from 'react';
import {View, Text} from 'react-native';

class Home extends React.Component {

  constructor(props) {
      super(props);
  }

  static navigationOptions = {
    title: 'Home'
  }

  render() {
    return (<View><Text>Home Component</Text></View>)
  }
}

export default Home;
