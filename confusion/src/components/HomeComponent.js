import React from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle} from 'reactstrap';
import {FadeTransform} from 'react-animation-components';
import {Loading} from './LoadingComponent';
import {baseUrl} from '../shared/baseUrl';

const RenderCard = ({item, isLoading, err}) => {

  if (isLoading) {
    return (<Loading/>);
  } else if (err) {
    return (<h4>{err}</h4>);
  } else {

    return (
      <FadeTransform in transformProps={{
        exitTransform: 'scale(0.5) translateY(-50%)'
      }}>
        <Card>
          <CardImg src={baseUrl + item.image} alt={item.name}/>
          <CardBody>
            <CardTitle>{item.name}</CardTitle>
            {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle> : null}
            <CardText>{item.description}</CardText>
          </CardBody>
        </Card>
      </FadeTransform>
    );
  }
}

const Home = (props) => {

  return (
    <div className="container">
      <div className="row align-items-start">
        <div className="col-12 col-md m-1">
          <RenderCard item={props.dish} isLoading={props.dishesLoading}
              err={props.dishesErr}/>
        </div>
        <div className="col-12 col-md m-1">
          <RenderCard item={props.promotion} err={props.promotionsErr}
              isLoading={props.promotionsLoading}/>
        </div>
        <div className="col-12 col-md m-1">
          <RenderCard item={props.leader} err={props.leadersFailed}
              isLoading={props.leadersLoading}/>
        </div>
      </div>
    </div>
  );
}


export default Home;
