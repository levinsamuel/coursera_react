import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Menu from './Menu';
import DishDetail from './Dishdetail'
import {DISHES} from '../shared/dishes';

class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
      selectedDish: null
    };
  }

  onDishSelect(dishId) {
    console.log('pressed with dish id: ', dishId)
    this.setState({selectedDish: dishId});
  }
  render() {
    return (
      <View style={{flex:1}} >
        <Menu dishes={this.state.dishes}
            onPress={dishId => this.onDishSelect(dishId)}
          />
        <DishDetail dish={this.state.dishes.filter(
              dish => dish.id === this.state.selectedDish
            )[0]}
          />
      </View>
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
