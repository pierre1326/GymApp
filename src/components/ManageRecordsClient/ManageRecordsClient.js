import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useEffect } from 'react';
import { getRecords } from '../../utils/records';
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

const ManageRecordsClient = ({ user, onBack }) => {

  const [records, setRecords] = useState([]);

  useEffect(() => {
    getRecords().then(records => {
      const filter = records.filter(record => record.client === user.name)
      setRecords(filter);
    }).catch(() => setRecords([]))
  }, []);

  const handleRecord = record => {
    console.log(record)
  }

  return (
    <View style={styles.container}>
      <List onPress={handleRecord} titleKey="entrenador" data={records}/>
      <MyButton title="Regresar" onPress={onBack}/>
    </View>
  )

}

export default ManageRecordsClient;