import React from 'react';
import { View, Platform } from 'react-native';
import {createStackNavigator, createAppContainer, createDrawerNavigator}
  from 'react-navigation'
import Menu from './Menu';
import DishDetail from './Dishdetail';
import Home from './Home';

const MenuNavigator = createStackNavigator({
  Menu: {screen: Menu},
  Dishdetail: {screen: DishDetail}
}, {
  initialRouteName: 'Menu',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#512DA8'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      color: '#fff'
    }
  }
})


const HomeNavigator = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: ({navigation}) => ({
      headerStyle: {
        backgroundColor: '#512DA8'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        color: '#fff'
      }
    })
  }
})

const MainNavigator = createDrawerNavigator({
  Home: {
    screen: HomeNavigator,
    navigationOptions: {
        title: 'Home',
        drawerLabel: 'Home'
    }
  },
  Menu: {
    screen: MenuNavigator,
    navigationOptions: {
      title: 'Menu',
      drawerLabel: 'Menu'
    }
  }
}, {
  drawerBackgroundColor: '#D1C4E9'
});

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
