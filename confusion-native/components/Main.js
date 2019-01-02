import React from 'react';
import { View, Platform } from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation'
import Menu from './Menu';
import DishDetail from './Dishdetail'

const MenuNavigator = createStackNavigator({
  Menu: {screen: Menu},
  Dishdetail: {screen: DishDetail}
}, {
  initialRouteName: 'Menu',
  navigationOptions: {
    headerStyle: {
      backgroundColor: '#512DA8'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      color: '#fff'
    }
  }
})

const MenuContainer = createAppContainer(MenuNavigator);

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
        <MenuContainer />
      </View>
    )

  }
}

export default Main;
