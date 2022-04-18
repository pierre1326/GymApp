import { Pressable, View, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  subtitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    color: '#c4c4c4',
    fontSize: 15,
    marginBottom: 5
  },
  listElement: {
    marginBottom: 20,
    padding: 10,
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 5,
    backgroundColor: '#3a3a3a'
  },
});

const capitalizeFirstLetter = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const ListElement = ({ data, titleKey, onPress }) => {
  return (
    <Pressable onPress={() => onPress(data)}>
      <View style={styles.listElement}>
        <Text style={styles.subtitle}>{data[titleKey]}</Text>
        {Object.keys(data).map(key => {   
          if(key !== 'key' && key !== titleKey && typeof data[key] !== 'object') {
            return <Text key={key} style={styles.text}>{`${capitalizeFirstLetter(key)}: ${data[key]}`}</Text>
          }
          return null;
        })}
      </View>
    </Pressable>
  );
};

export default ListElement;