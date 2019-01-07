import React from 'react';
import { View, Platform, Text, ScrollView, Image, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import {createStackNavigator, createDrawerNavigator, DrawerItems, SafeAreaView }
  from 'react-navigation'
import Menu from './Menu';
import DishDetail from './Dishdetail';
import Contact from './Contact';
import About from './About';
import Home from './Home';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerHeader: {
    backgroundColor: '#512DA8',
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  drawerHeaderText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold'
  },
  drawerImage: {
    margin: 10,
    width: 80,
    height: 60
  }
});

const CustomDrawerContentComponent = (props) => (
    <ScrollView>
      <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
        <View style={styles.drawerHeader}>
          <View style={{flex:1}}>
            <Image source={require('./images/logo.png')} style={styles.drawerImage} />
          </View>
          <View style={{flex: 2}}>
            <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
          </View>
        </View>
        <DrawerItems {...props} />
      </SafeAreaView>
    </ScrollView>
  );

const drawerIcon = navigation => ({
  headerLeft: <Icon name="menu" size={27} color= 'white'
    onPress={ () => navigation.toggleDrawer() } />,
  headerLeftContainerStyle: {padding: 20}
});

const MenuNavigator = createStackNavigator({
  Menu: {
    screen: Menu,
    navigationOptions: ({navigation}) => ({...drawerIcon(navigation)})
  },
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
      },
      ...drawerIcon(navigation)
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
      },
      ...drawerIcon(navigation)
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
      },
      ...drawerIcon(navigation)
    })
  }
})

const MainNavigator = createDrawerNavigator({
  Home: {
    screen: HomeNavigator,
    navigationOptions: {
        title: 'Home',
        drawerLabel: 'Home',
        drawerIcon: ({ tintColor, focused }) => (
          <Icon name='home' type='font-awesome' size={24} color={tintColor}/>
        )
    }
  },
  About: {
    screen: AboutNavigator,
    navigationOptions: {
      title: 'About Us',
      drawerLabel: 'About Us',
      drawerIcon: ({ tintColor, focused }) => (
        <Icon name='info-circle' type='font-awesome' size={24} color={tintColor} />
      )
    }
  },
  Menu: {
    screen: MenuNavigator,
    navigationOptions: {
      title: 'Menu',
      drawerLabel: 'Menu',
      drawerIcon: ({ tintColor, focused }) => (
        <Icon name='list' type='font-awesome' size={24} color={tintColor} />
      )
    }
  },
  Contact: {
    screen: ContactNavigator,
    navigationOptions: {
      title: 'Contact Us',
      drawerLabel: 'Contact Us',
      drawerIcon: ({ tintColor, focused }) => (
        <Icon name='address-card' type='font-awesome' size={24}  color={tintColor} />
      )
    }
  }
}, {
  drawerBackgroundColor: '#D1C4E9',
  contentComponent: CustomDrawerContentComponent
});



export {MainNavigator, ContactNavigator, MenuNavigator, HomeNavigator};
