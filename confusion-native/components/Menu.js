import React from 'react';
import {View, FlatList, Text} from 'react-native';
import {Tile} from 'react-native-elements';
import {connect} from 'react-redux';
import BASEURL from '../shared/baseUrl';
import {Loading} from './Loading';

const mapStateToProps = state => ({
  dishes: state.dishes
})

class Menu extends React.Component {

  static navigationOptions = {
    title: 'Menu'
  }

  render() {

    if (this.props.dishes.isLoading) {
      return (<Loading/>);
    } else if (this.props.dishes.errMess) {
      return (
        <View>
          <Text>{this.props.dishes.errMess}</Text>
        </View>
      )
    } else {

      const {navigate} = this.props.navigation;

      const renderMenuItem = ({item, index}) => {
        return (
          <Tile
            key={index}
            title={item.name}
            caption={item.description} featured
            onPress={() => navigate('Dishdetail', {dishId: item.id})}
            imageSrc={{uri: BASEURL + item.image}}
          />
        )
      };
  // require('./images/uthappizza.png')
      return (
        <FlatList
          data={this.props.dishes.dishes}
          renderItem={renderMenuItem}
          keyExtractor={item => item.id.toString()}
        />
      )
    }
  }
}

export default connect(mapStateToProps)(Menu);
