import { ScrollView, StyleSheet } from "react-native";
import ListElement from "../ListElement";

const styles = StyleSheet.create({
  scrollView: {
    marginTop: 75,
    width: '100%'
  },
})

const List = ({ data, titleKey, onPress }) => {
  return (
    <ScrollView style={styles.scrollView}>
      {data.map(item => {
        return (
          <ListElement key={item.key} data={item} titleKey={titleKey} onPress={onPress}/>
        )
      })}
    </ScrollView>
  )
}

export default List;