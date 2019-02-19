import React from 'react';
import {View, Text, ScrollView, FlatList, Modal, TextInput} from 'react-native';
import {Card, Icon, Rating, Button} from 'react-native-elements';
import {connect} from 'react-redux';
import BASEURL from '../shared/baseUrl';
import {postFavorite, toggleCommentModal, closeCommentModal, postComment}
  from '../redux/ActionCreators';
import {commonStyles, modalStyles, formStyles} from '../shared/commonStyles';

const mapStateToProps = state => ({
  dishes: state.dishes,
  comments: state.comments,
  favorites: state.favorites
});

const mapDispatchToProps = dispatch => ({
  postFavorite: dishId => dispatch(postFavorite(dishId)),
  toggleModal: () => dispatch(toggleCommentModal()),
  closeModal: () => dispatch(closeCommentModal()),
  postComment: comment => dispatch(postComment(comment))
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
              onPress={props.commentModal} />
        </View>
      </Card>
    )
  } else {
    return (<View></View>)
  }

}

const initialState = () => ({
  rating: 3,
  fields: {
    author: {
      name: 'Author',
      value: '',
      error: null,
      order: 1
    },
    comment: {
      name: 'Comment',
      value: '',
      error: null,
      order: 2
    }
  }
})

class DishDetail extends React.Component {

  constructor(props) {
    super(props);
    this.state = initialState()
    this.commentModal = this.commentModal.bind(this);
    this.submitRating = this.submitRating.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.validate = this.validate.bind(this);
    this.validateAll = this.validateAll.bind(this);
    this.setText = this.setText.bind(this);
  }

  static navigationOptions = {
    title: 'Dish Details'
  };

  commentModal() {
    this.props.toggleModal();
  }

  submitRating() {
    if (this.validateAll()) {
      const dishId = this.props.navigation.getParam('dishId', '');
      const {rating, fields} = this.state;
      commstr = {
        dishId, rating,
        comment: fields.comment.value,
        author: fields.author.value,
        date: JSON.stringify(new Date())
      }
      console.log(commstr);
      this.props.postComment(commstr);
      this.resetForm();
    } else {
      console.log('invalid input')
    }
  }

  resetForm() {
    this.props.closeModal();
    this.setState(initialState());
  }

  componentWillUnmount() {
    this.resetForm();
  }

  setText(field, text) {
    this.setState((state, props) => ({
      fields: {
        ...state.fields,
        [field]: {
          ...state.fields[field],
          value: text
        }
      }
    }), () => {
      this.validate(field);
    })
  }

  validateAll() {
    valid = true;
    // console.log(Object.keys(this.state.fields))
    for (var k of Object.keys(this.state.fields)) {
      // validate all even if invalid one found, in order to show errors
      valid = this.validate(k) && valid;
    }
    return valid;
  }

  validate(field) {
    console.log('validating', this.state.fields[field])
    if (!this.state.fields[field].value) {
      console.log('invalid, empty value: ', field)
      this.setState((state, props) =>
        ({
          fields: {
            ...state.fields,
            [field]: {
              ...state.fields[field],
              error: 'Value for ' + field + ' is required.'
            }
          }
        })
      )

      return false;
    } else {

      // if valid, remove error message
      if (this.state.fields[field].error) {
        this.setState((state, props) =>
          ({
            fields: {
              ...state.fields,
              [field]: {
                ...state.fields[field],
                error: null
              }
            }
          })
        )
      }

      return true;
    }
  }


  render() {

    const dishId = this.props.navigation.getParam('dishId', '');
    const fields = this.state.fields;

    var i = 0;
    const inputs = Object.keys(fields).sort((a, b) => {
      var ord = fields[a].order - fields[b].order;
      return ord > 0 ? 1 : -1
    }).map(p => {
        console.log('create input: ', p)
        field = fields[p];
        return (
          <ValidatedInput key={i++} field={field.name} onBlur={this.validate}
              error={field.error} value={field.value} setText={this.setText}
              />
        )
      });
    console.log(inputs.length)

    return (
      <ScrollView>
        <RenderDish dish={this.props.dishes.dishes[+dishId]}
            favorite={this.props.favorites.favorites.some(el => el === dishId)}
            onPress={() => this.props.postFavorite(dishId)}
            commentModal={this.props.toggleModal}
          />
        <RenderComments comments={this.props.comments.comments.filter(
            comm => comm.dishId === dishId
          )} />

        <Modal animationType='slide' transparent={false} visible={this.props.comments.showModal}
            onDismiss={this.props.toggleModal}
            onRequestClose={this.resetForm}>

          <View style={modalStyles.modal}>

            <Text style={modalStyles.modalTitle}>Your Comment</Text>
            <Rating ratingCount={5} imageSize={60} showRating
              onFinishRating={rating => this.setState({rating})}
              style={{margin: 10}} startingValue={this.state.rating}/>

            {inputs}

            <Button onPress={this.submitRating}
              buttonStyle={commonStyles.button} title="Comment" />
            <Button onPress={this.resetForm}
              buttonStyle={commonStyles.cancelButton} title="Cancel" />
          </View>
        </Modal>
      </ScrollView>
    )
  }

}


const ValidatedInput = props => {

  const field = props.field.toLowerCase();
  const error = props.error;

  console.log('rendering for:', field)
  return (
    <>
      <TextInput value={props.value} style={commonStyles.textInput}
        onBlur={() => props.onBlur(field)}
        onChangeText={text => props.setText(field, text)} placeholder={props.field} />
      {error &&
        (<Text style={{color: 'red'}}>{error}</Text>)}
    </>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(DishDetail);
