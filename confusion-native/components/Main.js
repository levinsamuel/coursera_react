import React from 'react';
import { View, Platform } from 'react-native';
import {createStackNavigator, createAppContainer, createDrawerNavigator}
  from 'react-navigation'
import {MainNavigator} from './Navigators';

const MainContainer = createAppContainer(MainNavigator);

class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedDish: null
    };
  }

  onDishSelect(dishId) {
    console.log('pressed with dish id: ', dishId)
    this.setState({selectedDish: dishId});
  }
  render() {
    return (
      <View style={{
            flex:1,
            paddingTop: Platform.OS === 'ios' ?
                        0 : Expo.Constants.statusBarHeight
          }} >
        <MainContainer />
      </View>
    )

  }
}

export default Main;
