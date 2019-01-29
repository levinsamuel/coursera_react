import React from 'react';
import {View, Text, ScrollView, FlatList, Modal, TextInput} from 'react-native';
import {Card, Icon, Rating, Button} from 'react-native-elements';
import {connect} from 'react-redux';
import BASEURL from '../shared/baseUrl';
import {postFavorite} from '../redux/ActionCreators';
import {commonStyles, modalStyles, formStyles} from '../shared/commonStyles';

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
        <View key={index} style={{margin: 10, alignItems: 'flex-start'}}>
            <Text style={{fontSize: 14}}>{item.comment}</Text>
            <Rating readonly startingValue={item.rating} imageSize={14}
                style={{paddingVertical: 5}}/>
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
        <View style={{justifyContent: 'center', flexDirection: 'row'}}>
          <Icon raised reverse name={props.favorite ? 'heart' : 'heart-o'}
              type='font-awesome' color='#f50'
              onPress={() => props.favorite ? console.log('already favorite') : props.onPress()}
            />
          <Icon raised reverse name='comment'
              type='font-awesome' color='#512DA8'
              onPress={() => props.commentModal()} />
        </View>
      </Card>
    )
  } else {
    return (<View></View>)
  }

}

const initialState = () => ({
  showModal: false,
  rating: 0,
  txt: ''
})

class DishDetail extends React.Component {

  constructor(props) {
    super(props);
    this.state = initialState()
    this.commentModal = this.commentModal.bind(this);
    this.rate = this.rate.bind(this);
    this.submitRating = this.submitRating.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  static navigationOptions = {
    title: 'Dish Details'
  };

  commentModal() {
    this.setState((state, props) => ({
      showModal: !state.showModal
    }))
  }

  rate(rating) {
    this.setState({
      rating
    })
  }

  submitRating() {
    console.log(this.state);
    this.resetForm()
  }

  resetForm() {
    this.setState(initialState())
  }

  render() {
    const dishId = this.props.navigation.getParam('dishId', '');
    return (
      <ScrollView>
        <RenderDish dish={this.props.dishes.dishes[+dishId]}
            favorite={this.props.favorites.favorites.some(el => el === dishId)}
            onPress={() => this.props.postFavorite(dishId)}
            commentModal={this.commentModal}
          />
        <RenderComments comments={this.props.comments.comments.filter(
            comm => comm.dishId === dishId
          )} />

        <Modal animationType='slide' transparent={false} visible={this.state.showModal}
            onDismiss={()=>{this.commentModal(); }}
            onRequestClose = {() => this.commentModal() }>
          <View style={modalStyles.modal}>
            <Text style={modalStyles.modalTitle}>Your Comment</Text>
            <Rating ratingCount={5} imageSize={60} showRating onFinishRating={this.rate}
                style={modalStyles.modalText}/>
            <TextInput value={this.state.text} onChangeText={txt => this.setState({txt})}
                inlineImageLeft='search_icon' style={{margin: 5}}/>
                style={modalStyles.modalText}/>
            <TextInput value={this.state.text} onChangeText={txt => this.setState({txt})}
                inlineImageLeft='search_icon' style={{margin: 5}}/>
              <Button onPress={this.submitRating}
                buttonStyle={commonStyles.button} title="Comment" />
            <Button onPress={() => {this.resetForm();}}
                buttonStyle={commonStyles.cancelButton} title="Cancel" />
          </View>
        </Modal>
      </ScrollView>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DishDetail);
