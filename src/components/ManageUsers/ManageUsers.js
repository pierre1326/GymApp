import { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Pressable, Text } from 'react-native';
import { getUsers, updateUser, deleteUser } from '../../utils/user';
import Toast from 'react-native-toast-message';
import ModalForm from '../ModalForm/ModalForm';
import MyButton from '../../UI/Button';
import MyTextInput from '../../UI/TextInput';
import List from '../../UI/List/List';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
})

const ManageUsers = ({ onBack }) => {

  const [users, setUsers] = useState([])
  const [visible, setVisible] = useState(false)
  const [selectedUser, setSelectedUser] = useState({})

  useEffect(() => {
    getUsers().then(users => setUsers(users)).catch(() => setUsers([]))
  }, [])

  const changeVisiblity = () => {
    setVisible(state => !state)
  }

  const handleUpdate = form => {
    updateUser(form).then(result => {
      changeVisiblity()
      Toast.show({
        type: 'success',
        text1: 'Actualizacion completa',
        text2: 'Se ha logrado actualizar el usuario con exito'
      })
      getUsers().then(users => setUsers(users)).catch(() => setUsers([]))
    }).catch(err => {
      changeVisiblity()
      Toast.show({
        type: 'error',
        text1: 'Actualizacion incompleta',
        text2: 'No se pudo actualizar el usuario, intente nuevamente'
      })
    }).catch(err => {
      Toast.show({
        type: 'error',
        text1: 'Actualizacion fallida',
        text2: 'Error al comunicarse con el servidor'
      })
    })
  }

  const handleUser = user => {
    setSelectedUser(user)
    changeVisiblity()
  }

  const handleDelete = () => {
    deleteUser(selectedUser).then(result => {
      changeVisiblity()
      Toast.show({
        type: 'success',
        text1: 'Eliminacion completa',
        text2: 'Se logro eliminar el usuario con existo'
      })
      getUsers().then(users => setUsers(users)).catch(() => setUsers([]))
    }).catch(error => {
      changeVisiblity()
      Toast.show({
        type: 'error',
        text1: 'Eliminacion fallida',
        text2: 'Error al comunicarse con el servidor'
      })
    })
  }

  return (
    <View style={styles.container}>
      <List onPress={handleUser} titleKey="name" data={users}/>
      <MyButton title="Regresar" onPress={onBack}/>
      <ModalForm
        title="Actualizar usuario"
        submitTitle="Actualizar"
        submitForm={handleUpdate}
        closeModal={changeVisiblity}
        visible={visible}
        defaultForm={selectedUser}
      >
        <MyTextInput name="correo" placeHolder="Correo electronico" keyboardType="email-address" />     
        <MyTextInput name="nombre" placeHolder="Nombre completo" />
        <MyTextInput name="telefono" placeHolder="Numero telefonico" keyboardType="numeric"/> 
        <MyButton title="Eliminar usuario" onPress={handleDelete} />
      </ModalForm>
    </View>
  );

}

export default ManageUsers;