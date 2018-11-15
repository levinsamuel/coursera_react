import React from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle} from 'reactstrap';


const DishDetail = props => {
  if (props.dish) {

    return (
      <div className="row">
        <div className="col-12 col-md-5 m-1">
          <RenderDish dish={props.dish}/>
        </div>
        <div className="col-12 col-md-5 m-1">
          <RenderComments comments={props.comments}/>
        </div>
      </div>
    );
  } else {
    return (<div></div>);
  }
}

function RenderDish({dish}) {
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

function RenderComments({comments}) {

  if (comments) {

    const commsRender = comments.map((comm) => {
        console.debug("date value: ", comm.date)
        const dt = new Date(comm.date);
        return (
            <div key={comm.id} className="mt-2">
              <li className="">{comm.id}: {comm.comment}</li>
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


export default DishDetail;
