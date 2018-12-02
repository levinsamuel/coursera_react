import React from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb,
  BreadcrumbItem, Button} from 'reactstrap';
import {Link} from 'react-router-dom';
import {FadeTransform, Fade, Stagger} from 'react-animation-components';
import CommentForm from './CommentFormComponent'
import {Loading} from './LoadingComponent';
import {baseUrl} from '../shared/baseUrl'

const DishDetail = props => {

  if (props.isLoading) {
    return (
        <div className="container">
          <div className="row">
            <Loading/>
          </div>
        </div>
    )
  } else if (props.err) {
    return(
        <div className="container">
            <div className="row">
                <h4>{props.err}</h4>
            </div>
        </div>
    );
} else if (props.dish) {

    const comms = (props) => {
      if (props.commentsErr) {
        return (
          <h4>{props.commentsErr}</h4>
        )
      } else {
        return (
          <RenderComments comments={props.comments}
            postComment={props.postComment}
            deleteComment={props.deleteComment}
            dishId={props.dish.id}
          />
        )
      }
    }
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
            {comms(props)}
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
      <FadeTransform in transformProps={{
              exitTransform: 'scale(0.5) translateY(-50%)'
          }}>
        <Card>
          <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle heading="true">{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      </FadeTransform>
    </div>
  )
}

function RenderComments({comments, postComment, deleteComment, dishId}) {

  if (comments) {

    const commsRender = comments.map((comm) => {
        console.debug("date value: ", comm.date)
        const dt = new Date(comm.date);
        const grayed = comm.grayed ? " text-muted" : "";
        return (
          <Fade in key={comm.id}>
            <div className="row mt-2">
              <div className={`col-md-10 col-12${grayed}`}>
                <li className="">{comm.id}: {comm.comment}</li>
                <li className="mt-1">-- {comm.author}, {dt.toLocaleDateString()}</li>
              </div>
              <div className="col-md-2 col-12">
                <Button className="btn btn-light" disabled={comm.grayed}
                    onClick={() => deleteComment(comm.id)}>
                  <span className="fa fa-trash-o"></span>
                </Button>
              </div>
            </div>
          </Fade>
        );
    });
    return (
      <div className="text-left">
        <h4>Comments</h4>
        <ul className="list-unstyled">
          <Stagger in>
            {commsRender}
          </Stagger>
        </ul>
        <CommentForm dishId={dishId} postComment={postComment}/>
      </div>
    )
  } else {
    return (<div></div>)
  }
}


export default DishDetail;
