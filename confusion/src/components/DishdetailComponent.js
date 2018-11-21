import React from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem}
  from 'reactstrap';
import {Link} from 'react-router-dom';
import CommentForm from './CommentFormComponent'

const DishDetail = props => {
  if (props.dish) {

    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
            <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.dish.name}</h3>
          </div>
        </div>
        <div className="row row-content">
          <div className="col-12 col-md-5 m-1">
            <RenderDish dish={props.dish}/>
          </div>
          <div className="col-12 col-md-5 m-1">
            <RenderComments comments={props.comments}/>
          </div>
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
        <CommentForm/>
      </div>
    )
  } else {
    return (<div></div>)
  }
}


export default DishDetail;
