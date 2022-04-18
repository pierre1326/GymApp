import { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { login, register } from '../../utils/user';
import Toast from 'react-native-toast-message'
import ModalForm from "../../components/ModalForm/ModalForm";
import MyTextInput from "../../UI/TextInput";
import MyPicker from "../../UI/Picker/Picker";

import Admin from "../Admin";
import Client from '../Client'
import Trainer from '../Trainer'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  title: {
    color: 'white',
    fontSize: 70,
    fontWeight: 'bold',
    marginBottom: 50,
  },
  inputs: {
    marginBottom: 20,
    padding: 6,
    backgroundColor: '#3a3a3a',
    textAlign: 'center',
    color: 'white',
    borderRadius: 10,
    width: '80%',
  },
  button: {
    marginBottom: 20,
  },
  modal: { 
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: '#727272',
  }
})

const renderUserScreen = (user, closeSesion) => {
  switch(user.type) {
    case 'Admin':
      return <Admin user={user} closeSesion={closeSesion}/>
    case 'Cliente':
      return <Client user={user} closeSesion={closeSesion}/>
    case 'Entrenador':
      return <Trainer user={user} closeSesion={closeSesion}/>
  }
}

const HomeScreen = () => {

  const [form, setForm] = useState({});
  const [visible, setVisible] = useState(false);
  const [user, setUser] = useState({type: 'Entrenador', name: 'Pierre'});

  const changeVisiblity = () => {
    setVisible(visible => !visible);
  }

  const onChangeText = (name, input) => {
    setForm(state => {
      return {
        ...state,
        [name]: input,
      }
    })
  }

  const closeSesion = () => {
    setUser(null);
  }

  const submitLogin = () => {
    login(form).then(result => {
      if(Object.keys(result).length > 0) {
        setUser(result);
      }
      else {
        Toast.show({
          type: 'error',
          text1: 'Inicio de sesion fallido',
          text2: 'El usuario no existe o la contraseña es incorrecta'
        })
      }
    }).catch(() => {
      Toast.show({
        type: 'error',
        text1: 'Inicio de sesion',
        text2: 'Error al comunicarse con el servidor'
      });
    })
  };

  const submitRegister = form => {
    changeVisiblity();
    register(form).then(result => {
      if(result) {
        Toast.show({
          type: 'success',
          text1: 'Registro exitoso',
          text2: 'Se ha logrado registrar el usuario de forma correcta'
        })
      }
      else {
        Toast.show({
          type: 'error',
          text1: 'Registro fallido',
          text2: 'No se pudo registrar el usuario, por favor revise las credenciales'
        })
      }
    }).catch(() => {
      Toast.show({
        type: 'error',
        text1: 'Registro fallido',
        text2: 'Error al comunicarse con el servidor'
      })
    })
  };

  return (
    <View style={styles.container}>
      {
        user ? renderUserScreen(user, closeSesion) :
        <>
          <Text style={styles.title}>Gym App</Text>
          <MyTextInput value={form.email ? form.email : ''} name="email" placeHolder="Correo electronico" onChangeText={onChangeText} keyboardType="email-address" />    
          <MyTextInput value={form.password ? form.password: ''} name="password" placeHolder="Contraseña" secureTextEntry onChangeText={onChangeText}/>   
          <View style={styles.button}>
            <Button title="Iniciar Sesion" color="#3a3a3a" onPress={submitLogin}/>
          </View>
          <View style={styles.button}>
            <Button title="Registrarse" color="#3a3a3a" onPress={changeVisiblity}/>
          </View>
          <ModalForm
            title="Nuevo usuario"
            submitTitle="Registrarse"
            submitForm={submitRegister}
            closeModal={changeVisiblity}
            visible={visible}
          >
              <MyTextInput name="email" placeHolder="Correo electronico" keyboardType="email-address" />    
              <MyTextInput name="password" placeHolder="Contraseña" secureTextEntry />   
              <MyTextInput name="name" placeHolder="Nombre completo" />   
              <MyTextInput name="telefono" placeHolder="Numero telefonico" keyboardType="numeric"/>   
              <MyPicker name="type" items={['Entrenador', 'Cliente']} />
          </ModalForm>
        </>     
      }    
    </View>
  )
};

export default HomeScreen;