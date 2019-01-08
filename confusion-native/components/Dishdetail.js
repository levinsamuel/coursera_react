import React from 'react';
import {View, Text, ScrollView, FlatList} from 'react-native';
import {Card, Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import BASEURL from '../shared/baseUrl';
import {postFavorite} from '../redux/ActionCreators';

const mapStateToProps = state => ({
  dishes: state.dishes,
  comments: state.comments,
  favorites: state.favorites
});

const mapDispatchToProps = dispatch => ({
  postFavorite: dishId => dispatch(postFavorite(dishId))
});

function RenderComments(props) {
  const comms = props.comments;

  const renderCommentItem = ({item, index}) => {

    return (
        <View key={index} style={{margin: 10}}>
            <Text style={{fontSize: 14}}>{item.comment}</Text>
            <Text style={{fontSize: 12}}>{item.rating} Stars</Text>
            <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date} </Text>
        </View>
    )
  }

  return (
    <Card title="Comments">
      <FlatList data={comms} renderItem={renderCommentItem}
          keyExtractor={item => item.id.toString()} />
    </Card>
  )
}

function RenderDish(props) {

  const dish = props.dish;
  if (dish != null) {
    return (
      <Card
          featuredTitle={dish.name}
          image={{uri: BASEURL + dish.image}}
        >
        <Text style={{margin: 10}}>
          {dish.description}
        </Text>
        <Icon raised reverse name={props.favorite ? 'heart' : 'heart-o'}
            type='font-awesome' color='#f50'
            onPress={() => props.favorite ? console.log('already favorite') : props.onPress()}
          />
      </Card>
    )
  } else {
    return (<View></View>)
  }

}

class DishDetail extends React.Component {

    static navigationOptions = {
      title: 'Dish Details'
    };

    // markFavorite(dishId) {
    //   this.setState({favorites: this.state.favorites.concat(dishId)})
    // }

    render() {
      const dishId = this.props.navigation.getParam('dishId', '');
      return (
        <ScrollView>
          <RenderDish dish={this.props.dishes.dishes[+dishId]}
              favorite={this.props.favorites.favorites.some(el => el === dishId)}
              onPress={() => this.props.postFavorite(dishId)}
            />
          <RenderComments comments={this.props.comments.comments.filter(
              comm => comm.dishId === dishId
            )} />
        </ScrollView>
      )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DishDetail);
