import React from 'react';
import {View, Text, ScrollView, StyleSheet, FlatList} from 'react-native';
import {Card, ListItem} from 'react-native-elements';
import {connect} from 'react-redux';
import BASEURL from '../shared/baseUrl';
import {Loading} from './Loading';

const styles = StyleSheet.create({
  history: {
    margin: 10,
    fontWeight: 'bold'
  }
})

const mapStateToProps = state => ({
  leaders: state.leaders
})

class About extends React.Component  {

  render() {

    if (this.props.leaders.isLoading) {
      return (
        <ScrollView>
          <History/>
          <Card title='Corporate Leadership'>
            <Loading/>
          </Card>
        </ScrollView>
      )
    } else if (this.props.leaders.errMess) {
      return (
        <ScrollView>
          <History/>
          <Card title='Corporate Leadership'>
            <Text>{this.props.leaders.errMess}</Text>
          </Card>
        </ScrollView>
      )
    } else {

      return (
        <ScrollView>
          <History/>
          <Card title='Corporate Leadership'>
            <FlatList
              data={this.props.leaders.leaders}
              keyExtractor={item => item.id.toString()}
              renderItem={
                ({item, index}) => {
                  // console.log(item);
                  return (
                    <ListItem
                      key={index}
                      title={item.name}
                      subtitle={item.description}
                      hideChevron={true}
                      leftAvatar={{ source: {uri: BASEURL + item.image} }}
                      />
                  );
                }
              }
            />
          </Card>
        </ScrollView>
      )
    }
  }
}

function History(props) {
  return (
      <Card title='Our History'>
        <Text style={styles.history}>Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.</Text>
        <Text style={styles.history}>The restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.</Text>
      </Card>
  )
}

export default connect(mapStateToProps)(About);
