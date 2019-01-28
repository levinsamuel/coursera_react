import React from 'react';
import {Text, View, ScrollView, StyleSheet, Picker, Switch} from 'react-native';
import {Card, Button} from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import PropTypes from 'prop-types'

const initialState = () => ({
  guests: 1,
  smoking: false,
  date: null
});

class Reservation extends React.Component {


  handleReservation() {
    console.log(this.state);
    this.setState(initialState())
  }

  constructor(props) {
    super(props);

    this.state = initialState();
    this.handleReservation = this.handleReservation.bind(this)
  }

  render () {
    return (
      <ScrollView>
        <View style={styles.formRow}>
          <Text style={styles.formLabel}>Number of Guests</Text>
          <Picker style={styles.formItem} selectedValue={this.state.guests}
              onValueChange={(itemValue, itemIndex) => this.setState({guests: itemValue})}>
            <Picker.Item label='1' value='1'/>
            <Picker.Item label='2' value='2'/>
            <Picker.Item label='3' value='3'/>
            <Picker.Item label='4' value='4'/>
            <Picker.Item label='5' value='5'/>
            <Picker.Item label='6' value='6'/>
          </Picker>
        </View>
        <View style={styles.formRow}>
          <Text style={styles.formLabel}>Smoking/Non-Smoking</Text>
          <Switch style={styles.formItem} value={this.state.smoking}
              trackColor='#512DA8' onValueChange={val => this.setState({smoking: val})}>
          </Switch>
        </View>
        <View style={styles.formRow}>
          <Text style={styles.formLabel}>Date and Time</Text>
          <DatePicker style={{flex: 2, marginRight: 20}}
            date={this.state.date} format='' mode='datetime'
            placeholder='select date and time' minDate='2017-01-01'
            confirmBtnText='Confirm' cancelBtnText='Cancel'
            onDateChange={date => this.setState({date: date})}
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0, top: 4, marginLeft: 0
              },
              dateInput: {
                marginLeft: 36
              },
            }}
          />
        </View>

        <View style={styles.formRow}>
          <Text style={styles.formLabel}>Smoking/Non-Smoking</Text>
          <Button title='Reserve' color='#512DA8' onPress={this.handleReservation}
            accessibilityLabel="Learn more about this purple button"/>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  formRow: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
    margin: 20
  },
  formLabel: {
      fontSize: 18,
      flex: 2
  },
  formItem: {
      flex: 1
  }
})

export default Reservation;
