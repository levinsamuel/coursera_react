import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {Card} from 'react-native-elements';
import {DISHES, LEADERS, PROMOTIONS, COMMENTS} from '../shared/data';

function RenderItem(props) {

  const item = props.item;
  if (item != null) {
    return (
      <Card featuredTitle={item.name}
          featuredSubTitle={item.designation}
          image={require('./images/uthappizza.png')}
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

  constructor(props) {
      super(props);
      this.state = {
        dishes: DISHES,
        promotions: PROMOTIONS,
        leaders: LEADERS
      }
  }

  static navigationOptions = {
    title: 'Home'
  }

  render() {
    return (
      <ScrollView>
        <RenderItem item={this.state.dishes.filter(dish => dish.featured)[0]} />
        <RenderItem item={this.state.promotions.filter(p => p.featured)[0]} />
        <RenderItem item={this.state.leaders.filter(l => l.featured)[0]} />
      </ScrollView>
    );
  }
}

export default Home;
