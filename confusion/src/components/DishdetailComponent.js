import React, {Component} from 'react';
import {Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle} from 'reactstrap';


class DishDetail extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.dish) {

      return (
        <div className="row">
          <div className="col-12 col-md-5 m-1">
            {this.renderDish(this.props.dish)}
          </div>
          <div className="col-12 col-md-5 m-1">
            {this.renderComments(this.props.dish.comments)}
          </div>
        </div>
      );
    } else {
      return (<div></div>);
    }
  }

  renderDish(dish) {
    return (
      <div>
        <Card>
          <CardImg width="100%" src={dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle heading="true">{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      </div>
    )
  }

  renderComments(comments) {

    if (comments) {

      const commsRender = comments.map((comm) => {
          console.debug("date value: ", comm.date)
          const dt = new Date(comm.date);
          return (
              <div key={comm.id}>
                <li className="mt-2">{comm.comment}</li>
                <li className="mt-1">-- {comm.author}, {dt.toLocaleDateString()}</li>
              </div>
          );
      });
      return (
        <div className="text-left">
          <h4>Comments</h4>
          <ul className="list-unstyled">
            {commsRender}
          </ul>
        </div>
      )
    } else {
      return (<div></div>)
    }
  }
};

export default DishDetail;
