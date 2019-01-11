import React from "react";
import { View, Text, ScrollView } from "react-native";
import { Card, Button } from "react-native-elements";
import { connect } from "react-redux";
import BASEURL from "../shared/baseUrl";
import { Loading } from "./Loading";

const mapStateToProps = state => ({
  dishes: state.dishes,
  promotions: state.promotions,
  leaders: state.leaders
});

function RenderItem(props) {
  if (props.isLoading) {
    return <Loading />;
  } else if (props.err) {
    return (
      <View>
        <Text>{props.err}</Text>
      </View>
    );
  } else {
    const item = props.item;
    if (item != null) {
      return (
        <Card
          featuredTitle={item.name}
          featuredSubTitle={item.designation}
          image={{ uri: BASEURL + item.image }}
        >
          <Text style={{ margin: 10 }}>{item.description}</Text>
          {
            props.onPress ?
            <Button title="Details" onPress={props.onPress}
              buttonStyle={{
                backgroundColor: '#512DA8'
              }}/> :
            <View/>
          }
        </Card>
      );
    } else {
      return <View />;
    }
  }
}

class Home extends React.Component {
  static navigationOptions = {
    title: "Home"
  };

  render() {

    const {navigate} = this.props.navigation;
    const dish = this.props.dishes.dishes.filter(dish => dish.featured)[0];
    return (
      <ScrollView>
        <RenderItem
          item={dish}
          isLoading={this.props.dishes.isLoading}
          err={this.props.dishes.errMess}
          onPress={() => navigate('Dishdetail', {dishId: dish.id})}
        />
        <RenderItem
          item={this.props.promotions.promotions.filter(p => p.featured)[0]}
          isLoading={this.props.promotions.isLoading}
          err={this.props.promotions.errMess}
        />
        <RenderItem
          item={this.props.leaders.leaders.filter(l => l.featured)[0]}
          isLoading={this.props.leaders.isLoading}
          err={this.props.leaders.errMess}
        />
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps)(Home);
