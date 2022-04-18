import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useEffect } from 'react';
import { getDates } from '../../utils/dates';
import MyButton from '../../UI/Button';
import List from '../../UI/List/List';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
})

const ManageDates = ({ user, onBack }) => {

  const [dates, setDates] = useState([]);

  useEffect(() => {
    getDates().then(dates => {
      const filter = dates.filter(date => date.entrenador === user.name)
      setDates(filter);
    }).catch(() => setBills([]))
  }, []);

  const handleDate = date => {
    console.log(date)
  }

  return (
    <View style={styles.container}>
      <List onPress={handleDate} titleKey="cliente" data={dates}/>
      <MyButton title="Regresar" onPress={onBack}/>
    </View>
  )

}

export default ManageDates;