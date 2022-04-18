import { StyleSheet, View, Text } from 'react-native';
import { useState } from 'react';
import MyButton from '../../UI/Button';

import ManageDates from '../../components/ManageDates'
import ManageRecords from '../../components/ManageRecords';
import ManageRoutines from '../../components/ManageRoutines';

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
    marginBottom: 50,
  },
});

const Trainer = ({ user, closeSesion }) => { 

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

  const onBack = () => {
    setScreen('home')
  }

  switch(screen) {
    case 'dates':
      return (
        <ManageDates user={user} onBack={onBack} />
      )
    case 'records':
      return (
        <ManageRecords user={user} onBack={onBack} />
      )
    case 'routines':
      return (
        <ManageRoutines user={user} onBack={onBack} />
      )
    default:
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Bienvenido {user.name}</Text>
          <MyButton title="Gestionar expediente" onPress={manageRecord}/>
          <MyButton title="Ingresar rutina" onPress={manageRoutine}/>
          <MyButton title="Ver citas" onPress={manageDates}/>
          <MyButton title="Cerrar sesion" onPress={closeSesion}/>
        </View>
      )
  }
}

export default Trainer;