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
import Reservation from './Reservation';

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

const headerStyle = () => ({headerStyle: {
    backgroundColor: '#512DA8'
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    color: '#fff'
  }
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
    ...headerStyle()
  }
})


const HomeNavigator = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: ({navigation}) => ({...drawerIcon(navigation)})
  },
  Dishdetail: {screen: DishDetail}
}, {
  defaultNavigationOptions: ({navigation}) => ({
    ...headerStyle()
  })
})

const ContactNavigator = createStackNavigator({
  Contact: {
    screen: Contact,
    navigationOptions: ({navigation}) => ({
      title: 'Contact',
      ...headerStyle(),
      ...drawerIcon(navigation)
    })
  }
})

const AboutNavigator = createStackNavigator({
  About: {
    screen: About,
    navigationOptions: ({navigation}) => ({
      title: 'About',
      ...headerStyle(),
      ...drawerIcon(navigation)
    })
  }
});

const ReservationNavigator = createStackNavigator({
  Reservation: {
    screen: Reservation,
    navigationOptions: ({navigation}) => ({
      title: 'Reserve Table',
      ...headerStyle(),
      ...drawerIcon(navigation)
    })
  }
});

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
  },
  Reservation: {
    screen: ReservationNavigator,
    navigationOptions: {
      title: 'Make a Reservation',
      drawerLabel: 'Make a Reservation',
      drawerIcon: ({ tintColor, focused }) => (
        <Icon name='cutlery' type='font-awesome' size={24}  color={tintColor} />
      )
    }
  }
}, {
  drawerBackgroundColor: '#D1C4E9',
  contentComponent: CustomDrawerContentComponent
});



export {MainNavigator, ContactNavigator, MenuNavigator, HomeNavigator};
