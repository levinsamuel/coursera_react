import React, {Component} from 'react';
import {Card, CardImg, CardImgOverlay, CardTitle} from 'reactstrap';
import DishDetail from './DishdetailComponent';

class Menu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dish: null,
      comments: null
    }
  }

  render() {

    const menu = this.props.dishes.map((dish) => {
      return (
        <div key={dish.id} className="col-12 col-md-5 m-1">
          <RenderMenuItem dish={dish} onClick={() => this.onClick(dish.id)} />
        </div>
      )
    });
    return (
      <div className="container">
        <div className="row">
          {menu}
        </div>
        <div className="row">
          <DishDetail dish={this.state.dish} comments={this.state.comments} />
        </div>
      </div>
    );
  }


  onClick(dishId) {

    this.setState({
      dish: this.props.dishes.filter((dish) => dish.id === dishId)[0],
      comments: this.props.comments.filter((comm) => comm.dishId === dishId)
    });
  }

}

function RenderMenuItem({dish, onClick}) {

  return (
    <Card onClick={() => onClick(dish.id)}>
      <CardImg width="100%" src={dish.image} alt={dish.name} />
      <CardImgOverlay >
        <CardTitle heading="true">{dish.name}</CardTitle>
      </CardImgOverlay>
    </Card>
    );
}

export default Menu;
