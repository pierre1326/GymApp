import { TextInput, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  inputs: {
    marginBottom: 20,
    padding: 6,
    backgroundColor: '#3a3a3a',
    color: 'white',
    borderRadius: 10,
    width: '80%',
  },
});

const MyTextInput = ({ onChangeText, placeHolder = '', name = '', value = '', secureTextEntry = false, keyboardType}) => {
  return (
    <TextInput 
      placeholderTextColor="gray" 
      style={styles.inputs} 
      placeholder={placeHolder}
      onChangeText={text => onChangeText(name, text)} 
      value={value}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
    />
  )
};

export default MyTextInput;