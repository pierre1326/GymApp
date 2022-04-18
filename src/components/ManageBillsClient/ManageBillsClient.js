import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useEffect } from 'react';
import { getBills } from '../../utils/bills';
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

const ManageBillsClient = ({ user, onBack }) => {

  const [bills, setBills] = useState([]);

  useEffect(() => {
    getBills().then(bills => {
      const filter = bills.filter(bill => bill.client === user.name)
      setBills(filter);
    }).catch(() => setBills([]))
  }, []);

  const handleBill = bill => {
    console.log(bill)
  }

  return (
    <View style={styles.container}>
      <List onPress={handleBill} titleKey="description" data={bills}/>
      <MyButton title="Regresar" onPress={onBack}/>
    </View>
  )

}

export default ManageBillsClient;