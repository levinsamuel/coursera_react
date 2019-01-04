import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {Card} from 'react-native-elements';

const styles = StyleSheet.create({
  address: {
    margin: 10,
    fontWeight: 'bold'
  }
})

function Contact(props)  {

  return (
    <Card
        title='Contact Information'
      >
      <Text style={styles.address}>121, Clear Water Bay Road</Text>
      <Text style={styles.address}>Clear Water Bay, Kowloon</Text>
      <Text style={styles.address}>HONG KONG</Text>
      <Text style={styles.address}>Tel: +852 1234 5678</Text>
      <Text style={styles.address}>Fax: +852 8765 4321</Text>
      <Text style={styles.address}>Email:confusion@food.net</Text>

    </Card>
  )
}

export default Contact;
