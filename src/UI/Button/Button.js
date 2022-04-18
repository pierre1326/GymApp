import { View, Button, StyleSheet } from 'react-native';

const color = "#3a3a3a";

const styles = StyleSheet.create({
  button: {
    marginBottom: 20,
  },
})

const MyButton = ({ title, onPress }) => {
  return (
    <View style={styles.button}>
      <Button title={title} color={color} onPress={onPress}/>
    </View>
  )
}

export default MyButton;