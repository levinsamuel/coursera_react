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
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import {postComment, fetchDishes, fetchPromos, fetchLeaders, fetchComments,
  deleteComment, postFeedback} from '../redux/ActionCreators';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    leaders: state.leaders,
    promotions: state.promotions,
    contact: state.contact
  }
}

const mapDispatchToProps = dispatch => ({
  postComment: (dishId, rating, author, comment) =>
      dispatch(postComment(dishId, rating, author, comment)),
  postFeedback: feedback => dispatch(postFeedback(feedback)),
  fetchDishes: () => dispatch(fetchDishes()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchComments: () => dispatch(fetchComments()),
  fetchLeaders: () => dispatch(fetchLeaders()),
  deleteComment: (cid) => dispatch(deleteComment(cid))
});

class Main extends Component {

  constructor(props) {
    super(props);

  }

  componentDidMount() {
    console.debug("main did mount");
    this.props.fetchDishes();
    this.props.fetchPromos();
    this.props.fetchComments();
    this.props.fetchLeaders();
  }

  render() {

    const HomePage = () => (
        <Home
          dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
          dishesLoading={this.props.dishes.isLoading}
          dishesErr={this.props.dishes.err}
          promotion={this.props.promotions.promotions.filter((p) => p.featured)[0]}
          promotionsLoading={this.props.promotions.isLoading}
          promotionsErr={this.props.promotions.err}
          leader={this.props.leaders.leaders.filter((l) => l.featured)[0]}
          leadersLoading={this.props.leaders.isLoading}
          leadersFailed={this.props.leaders.err}
          />
      )


    const DishWithId = ({match}) => (
        <DishDetail dish={this.props.dishes.dishes.filter((dish) =>
                dish.id === parseInt(match.params.dishid))[0]}
            isLoading={this.props.dishes.isLoading}
            err={this.props.dishes.err}
            comments={this.props.comments.comments.filter((comm) =>
                comm.dishId === parseInt(match.params.dishid))}
            commentsErr={this.props.comments.err}
            postComment={this.props.postComment}
            deleteComment={this.props.deleteComment}
        />
      )


    return (
      <div className="Main">
        <Header/>
        <TransitionGroup>
          <CSSTransition key={this.props.location.key} classNames="page"
              timeout={300}>
            <Switch location={this.props.location}>
              <Route path="/home" component={HomePage} />
              <Route exact path="/menu" component={
                  () => <Menu dishes={this.props.dishes} comments={this.props.comments}/>
                } />
              <Route path="/menu/:dishid" component={DishWithId} />
              <Route path="/contactus" component={
                  () => <Contact
                      postFeedback={this.props.postFeedback}
                      submitDisabled={this.props.contact.submitDisabled}
                    />
                } />
              <Route path="/aboutus" component={
                () => <About leaders={this.props.leaders.leaders}/>
                } />
              <Redirect to="/home" />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
        <Footer/>
      </div>
    );
  }

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
