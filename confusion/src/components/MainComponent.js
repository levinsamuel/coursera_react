import React, { Component } from 'react';
import Home from './HomeComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Contact from './ContactComponent';
import DishDetail from './DishdetailComponent'
import Menu from './MenuComponent';
import About from './AboutComponent';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import { addComment } from '../redux/ActionCreators';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    leaders: state.leaders,
    promotions: state.promotions
  }
}

const mapDispatchToProps = dispatch => ({
  addComment: (dishId, rating, author, comment) =>
      dispatch(addComment(dishId, rating, author, comment))

});

class Main extends Component {

  constructor(props) {
    super(props);

  }

  render() {

    const HomePage = () => (
        <Home
          dish={this.props.dishes.filter((dish) => dish.featured)[0]}
          promotion={this.props.promotions.filter((p) => p.featured)[0]}
          leader={this.props.leaders.filter((l) => l.featured)[0]}
          />
      )


    const DishWithId = ({match}) => (
        <DishDetail dish={this.props.dishes.filter((dish) =>
                dish.id === parseInt(match.params.dishid))[0]}
            comments={this.props.comments.filter((comm) =>
                comm.dishId === parseInt(match.params.dishid))}
            addComment={this.props.addComment}/>
      )


    return (
      <div className="Main">
        <Header/>
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route exact path="/menu" component={
              () => <Menu dishes={this.props.dishes} comments={this.props.comments}/>
            } />
          <Route path="/menu/:dishid" component={DishWithId} />
          <Route path="/contactus" component={Contact} />
          <Route path="/aboutus" component={
            () => <About leaders={this.props.leaders}/>
            } />
          <Redirect to="/home" />
        </Switch>
        <Footer/>
      </div>
    );
  }

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
