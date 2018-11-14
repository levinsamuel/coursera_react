import React, { Component } from 'react';
import Header from './HeaderComponent'
import Footer from './FooterComponent'
import Menu from './MenuComponent'
import {DISHES} from '../shared/dishes'
import DishDetail from './DishdetailComponent'

class Main extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dishes: DISHES,
      selectedDish: null
    }
  }

  render() {
    return (
      <div className="Main">
        <Header/>
        <div className="container">
          <Menu dishes={this.state.dishes}
              onClick={(dishId) => this.onDishSelect(dishId)} />
          <DishDetail
              dish={this.state.dishes.filter((dish) =>
                  dish.id === this.state.selectedDish)[0]} />
        </div>
        <Footer/>
      </div>
    );
  }

  onDishSelect(dishId) {
    this.setState({selectedDish: dishId});
  }
}

export default Main;
