import React from 'react';
import {Text, View, ScrollView, StyleSheet, Picker, Switch, Modal} from 'react-native';
import {Card, Button} from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import {modalStyles, formStyles, commonStyles} from '../shared/commonStyles';

const initialState = () => ({
  guests: 1,
  smoking: false,
  date: null,
  showModal: false
});

class Reservation extends React.Component {


  handleReservation() {
    console.log(this.state);
    this.toggleModal()
  }

  resetForm() {
    this.setState(initialState())
  }

  toggleModal() {
    this.setState((state, props) => ({
        showModal: !state.showModal
    }))
  }

  constructor(props) {
    super(props);

    this.state = initialState();
    this.handleReservation = this.handleReservation.bind(this)
  }

  render () {
    return (
      <ScrollView>
        <View style={formStyles.formRow}>
          <Text style={formStyles.formLabel}>Number of Guests</Text>
          <Picker style={formStyles.formItem} selectedValue={this.state.guests}
              onValueChange={(itemValue, itemIndex) => this.setState({guests: itemValue})}>
            <Picker.Item label='1' value='1'/>
            <Picker.Item label='2' value='2'/>
            <Picker.Item label='3' value='3'/>
            <Picker.Item label='4' value='4'/>
            <Picker.Item label='5' value='5'/>
            <Picker.Item label='6' value='6'/>
          </Picker>
        </View>
        <View style={formStyles.formRow}>
          <Text style={formStyles.formLabel}>Smoking/Non-Smoking</Text>
          <Switch style={formStyles.formItem} value={this.state.smoking}
              trackColor='#512DA8' onValueChange={val => this.setState({smoking: val})}>
          </Switch>
        </View>
        <View style={formStyles.formRow}>
          <Text style={formStyles.formLabel}>Date and Time</Text>
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

        <View style={formStyles.formRow}>
          <Text style={formStyles.formLabel}>Make Reservation</Text>
          <Button title='Reserve' buttonStyle={commonStyles.button} onPress={this.handleReservation}
            accessibilityLabel="Learn more about this purple button"/>
        </View>
        <Modal animationType='slide' transparent={false} visible={this.state.showModal}
            onDismiss={()=>{this.toggleModal(); this.resetForm()}}
            onRequestClose = {() => this.toggleModal() }>
          <View style = {modalStyles.modal}>
            <Text style = {modalStyles.modalTitle}>Your Reservation</Text>
            <Text style = {modalStyles.modalText}>Number of Guests: {this.state.guests}</Text>
            <Text style = {modalStyles.modalText}>Smoking?: {this.state.smoking ? 'Yes' : 'No'}</Text>
            <Text style = {modalStyles.modalText}>Date and Time: {this.state.date}</Text>
            <Button onPress = {() =>{this.toggleModal(); this.resetForm();}}
                buttonStyle={commonStyles.button} title="Close" />
          </View>
        </Modal>
      </ScrollView>
    )
  }
}


export default Reservation;
