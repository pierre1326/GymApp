import { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MyButton from '../../UI/Button';

import ManageRoutinesClient from '../../components/ManageRoutinesClient';
import ManageBillsClient from '../../components/ManageBillsClient/ManageBillsClient';
import ManageRecordsClient from '../../components/ManageRecordsClient';
import ManageDatesClient from '../../components/ManageDatesClient';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  title: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 30,
  },
})

const Client = ({ user, closeSesion }) => {
  const [screen, setScreen] = useState('home')

  const manageDates = () => {
    setScreen('dates')
  }

  const manageRecord = () => {
    setScreen('records')
  }

  const manageRoutine = () => {
    setScreen('routines')
  }

  const manageBills = () => {
    setScreen('bills')
  }

  const onBack = () => {
    setScreen('home')
  }

  switch(screen) {
    case 'dates':
      return (
        <ManageDatesClient user={user} onBack={onBack} />
      )
    case 'records':
      return (
        <ManageRecordsClient user={user} onBack={onBack} />
      )
    case 'routines':
      return (
        <ManageRoutinesClient user={user} onBack={onBack} />
      )
    case 'bills':
      return (
        <ManageBillsClient user={user} onBack={onBack}/>
      )
    default:
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Bienvenido {user.name}</Text>
          <MyButton title="Gestionar citas" onPress={manageDates}/>
          <MyButton title="Ver rutinas de entrenamiento" onPress={manageRoutine}/>
          <MyButton title="Ver facturas" onPress={manageBills}/>
          <MyButton title="Ver expediente" onPress={manageRecord}/>
          <MyButton title="Cerrar sesion" onPress={closeSesion}/>
        </View>
      )
  }
}

export default Client;