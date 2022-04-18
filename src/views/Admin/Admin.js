import { StyleSheet, View, Text } from 'react-native';
import { useState } from 'react';
import MyButton from '../../UI/Button';

import ManageUsers from '../../components/ManageUsers'
import ManageCalendar from '../../components/ManageCalendar';
import ManageBills from '../../components/ManageBills';

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

const Admin = ({ user, closeSesion }) => { 

  const [screen, setScreen] = useState('home')

  const manageUsers = () => {
    setScreen('users')
  }

  const manageCalendar = () => {
    setScreen('calendar')
  }

  const manageBills = () => {
    setScreen('bills')
  }

  const onBack = () => {
    setScreen('home')
  }

  switch(screen) {
    case 'users':
      return (
        <ManageUsers user={user} onBack={onBack} />
      )
    case 'calendar':
      return (
        <ManageCalendar user={user} onBack={onBack} />
      )
    case 'bills':
      return (
        <ManageBills user={user} onBack={onBack} />
      )
    default:
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Bienvenido Administrador</Text>
          <MyButton title="Administrar usuarios" onPress={manageUsers}/>
          <MyButton title="Administrar Calendario" onPress={manageCalendar}/>
          <MyButton title="Administrar Facturas" onPress={manageBills}/>
          <MyButton title="Cerrar sesion" onPress={closeSesion}/>
        </View>
      )
  }
}

export default Admin;