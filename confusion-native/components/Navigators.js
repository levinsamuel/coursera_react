import React from 'react';
import {createStackNavigator, createDrawerNavigator}
  from 'react-navigation'
import Menu from './Menu';
import DishDetail from './Dishdetail';
import Contact from './Contact';
import About from './About';
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

const ContactNavigator = createStackNavigator({
  Home: {
    screen: Contact,
    navigationOptions: ({navigation}) => ({
      title: 'Contact',
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

const AboutNavigator = createStackNavigator({
  Home: {
    screen: About,
    navigationOptions: ({navigation}) => ({
      title: 'About',
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
  About: {
    screen: AboutNavigator,
    navigationOptions: {
      title: 'About Us',
      drawerLabel: 'About Us'
    }
  },
  Menu: {
    screen: MenuNavigator,
    navigationOptions: {
      title: 'Menu',
      drawerLabel: 'Menu'
    }
  },
  Contact: {
    screen: ContactNavigator,
    navigationOptions: {
      title: 'Contact Us',
      drawerLabel: 'Contact Us'
    }
  }
}, {
  drawerBackgroundColor: '#D1C4E9'
});

export {MainNavigator, ContactNavigator, MenuNavigator, HomeNavigator};
