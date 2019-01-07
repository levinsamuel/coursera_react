import React from 'react';
import { View, Platform } from 'react-native';
import {createStackNavigator, createAppContainer, createDrawerNavigator}
  from 'react-navigation';
import {connect} from 'react-redux';
import {MainNavigator} from './Navigators';
import {fetchDishes, fetchComments, fetchPromos, fetchLeaders}
  from '../redux/ActionCreators';

const mapStateToProps = state => ({
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
});

const mapDispatchToProps = dispatch => ({
  fetchDishes: () => dispatch(fetchDishes()),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders()),
});

const MainContainer = createAppContainer(MainNavigator);

class Main extends React.Component {

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
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

export default connect(mapStateToProps, mapDispatchToProps)(Main);
