import {StyleSheet} from 'react-native';

export const commonStyles = StyleSheet.create({
  button: {
    backgroundColor: '#512DA8',
    margin: 5
  },
  cancelButton: {
    backgroundColor: 'gray',
    margin: 5
  }
})

export const formStyles = StyleSheet.create({
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
});

export const modalStyles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    margin: 20
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: '#512DA8',
    color: 'white',
    textAlign: 'center',
    marginBottom: 20
  },
  modalText: {
    fontSize: 18,
    margin: 10
  }
});
