import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';
import Toast from 'react-native-toast-message';
import HomeScreen from './src/views/HomeScreen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#727272',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const App = () => {
  return (
    <>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <HomeScreen />
      </View>
      <Toast />
    </>
  );
}

export default App;