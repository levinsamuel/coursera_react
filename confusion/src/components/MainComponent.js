import React, { Component } from 'react';
import Home from './HomeComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Contact from './ContactComponent';
import DishDetail from './DishdetailComponent'
import Menu from './MenuComponent';
import About from './AboutComponent';
import {DISHES} from '../shared/dishes';
import {COMMENTS} from '../shared/comments';
import {PROMOTIONS} from '../shared/promotions';
import {LEADERS} from '../shared/leaders';
import {Switch, Route, Redirect} from 'react-router-dom'

class Main extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dishes: DISHES,
      comments: COMMENTS,
      promotions: PROMOTIONS,
      leaders: LEADERS
    }
  }

  render() {

    const HomePage = () => {
      return (
          <Home
            dish={this.state.dishes.filter((dish) => dish.featured)[0]}
            promotion={this.state.promotions.filter((p) => p.featured)[0]}
            leader={this.state.leaders.filter((l) => l.featured)[0]}
            />
      );
    }

    const DishWithId = ({match}) => {

        return (
          <DishDetail dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishid))[0]}
              comments={this.state.comments.filter((comm) => comm.dishId === parseInt(match.params.dishid))} />
        );
    }

    return (
      <div className="Main">
        <Header/>
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route exact path="/menu" component={
              () => <Menu dishes={this.state.dishes} comments={this.state.comments}/>
            } />
          <Route path="/menu/:dishid" component={DishWithId} />
          <Route path="/contactus" component={Contact} />
          <Route path="/aboutus" component={About} />
          <Redirect to="/home" />
        </Switch>
        <Footer/>
      </div>
    );
  }

}

export default Main;
