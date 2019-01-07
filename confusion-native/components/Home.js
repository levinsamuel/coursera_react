import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {Card} from 'react-native-elements';
import {connect} from 'react-redux';
import BASEURL from '../shared/baseUrl';

const mapStateToProps = state => ({
    dishes: state.dishes,
    promotions: state.promotions,
    leaders: state.leaders
})

function RenderItem(props) {

  const item = props.item;
  if (item != null) {
    return (
      <Card featuredTitle={item.name}
          featuredSubTitle={item.designation}
            image={{uri: BASEURL + item.image}}
        >
        <Text style={{margin: 10}}>
          {item.description}
        </Text>
      </Card>
    );
  } else {
    return (<View></View>);
  }
}

class Home extends React.Component {

  static navigationOptions = {
    title: 'Home'
  }

  render() {
    return (
      <ScrollView>
        <RenderItem item={this.props.dishes.dishes.filter(dish => dish.featured)[0]} />
        <RenderItem item={this.props.promotions.promotions.filter(p => p.featured)[0]} />
        <RenderItem item={this.props.leaders.leaders.filter(l => l.featured)[0]} />
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps)(Home);
