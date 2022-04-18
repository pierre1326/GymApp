import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useEffect } from 'react';
import { getRecords, insertRecord, updateRecord, deleteRecord } from '../../utils/records';
import { getUsers } from '../../utils/user';
import Toast from 'react-native-toast-message';
import ModalForm from '../ModalForm/ModalForm';
import MyButton from '../../UI/Button';
import MyTextInput from '../../UI/TextInput';
import MyPicker from '../../UI/Picker'
import List from '../../UI/List/List';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  listElement: {
    marginBottom: 20,
    padding: 10,
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 5,
    backgroundColor: '#3a3a3a'
  },
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
  scrollView: {
    marginTop: 75,
    width: '100%'
  }
})

const filterRecords = (records, user) => {
  console.log(records)
  return records.filter(record => record.trainer === user.name)
}

const ManageRecords = ({ user, onBack }) => {

  const [records, setRecords] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState();
  const [clients, setClients] = useState([]);

  useEffect(() => {
    getRecords().then(records => setRecords(filterRecords(records, user))).catch(() => setRecords([]))
    getUsers().then(users => {
      const clients = users.filter(user => user.type === 'Cliente').map(client => client.name)
      setClients(clients);
    }).catch(err => setUsers([]))
  }, []);

  const changeVisiblity = () => {
    setVisible(state => !state)
  }

  const handleUpdate = form => {
    if(selectedRecord) {
      updateRecord(form).then(result => {
        changeVisiblity()
        Toast.show({
          type: 'success',
          text1: 'Actualizacion completa',
          text2: 'Se ha logrado actualizar la factura con exito'
        })
        getRecords().then(records => setRecords(filterRecords(records, user))).catch(() => setRecords([]))
      }).catch(err => {
        changeVisiblity()
        Toast.show({
          type: 'error',
          text1: 'Actualizacion incompleta',
          text2: 'No se pudo actualizar el registro, intente nuevamente'
        })
      }).catch(err => {
        Toast.show({
          type: 'error',
          text1: 'Actualizacion fallida',
          text2: 'Error al comunicarse con la servidor'
        })
      })
    }
    else {
      const newRecord = {
        ...form,
        fecha: new Date().toUTCString(),
        entrenador: user.name,
      }
      insertRecord(newRecord).then(result => {
        changeVisiblity()
        Toast.show({
          type: 'success',
          text1: 'Nuevo horario',
          text2: 'Se logro agregar el registro correctamente'
        })
        getRecords().then(records => setRecords(filterRecords(records, user))).catch(() => setRecords([]))
      }).catch(err => {
        console.log(err)
        changeVisiblity()
        Toast.show({
          type: 'error',
          text1: 'Eliminacion fallida',
          text2: 'Error al comunicarse con la servidor'
        })
      })
    }
  }

  const handleRecord = bill => {
    setSelectedRecord(bill);
    changeVisiblity();
  }

  const handleDelete = () => {
    deleteRecord(selectedRecord).then(result => {
      changeVisiblity()
      Toast.show({
        type: 'success',
        text1: 'Eliminacion completa',
        text2: 'Se logro eliminar el registro con exito'
      })
      getRecords().then(records => setRecords(filterRecords(records, user))).catch(() => setRecords([]))
    }).catch(error => {
      changeVisiblity()
      Toast.show({
        type: 'error',
        text1: 'Eliminacion fallida',
        text2: 'Error al comunicarse con la servidor'
      })
    })
  }

  const addRecord = () => {
    setSelectedRecord(null);
    changeVisiblity()
  }

  return (
    <View style={styles.container}>
      <List onPress={handleRecord} titleKey="client" data={records}/>
      <MyButton title="Agregar" onPress={addRecord}/>
      <MyButton title="Regresar" onPress={onBack}/>
      <ModalForm
        title="Expediente"
        submitTitle="Finalizar"
        submitForm={handleUpdate}
        closeModal={changeVisiblity}
        visible={visible}
        defaultForm={selectedRecord}
      >
        <MyPicker name="client" items={clients} />
        <MyTextInput name="peso (kg)" placeHolder="Ingrese el peso" keyboardType="numeric" />
        <MyTextInput name="estatura (cm)" placeHolder="Ingrese la estatura" keyboardType="numeric" />
        <MyTextInput name="musculo (kg)" placeHolder="Ingrese la masa muscular" keyboardType="numeric" />
        <MyTextInput name="grasa (kg)" placeHolder="Ingrese la grasa corporal" keyboardType="numeric" />
        <MyTextInput name="pectorales (cm)" placeHolder="Pectorales medida(cm)" keyboardType="numeric" />
        <MyTextInput name="espalda (cm)" placeHolder="Espalda medida(cm)" keyboardType="numeric" />
        <MyTextInput name="cuello (cm)" placeHolder="Cuello medida(cm)" keyboardType="numeric" />
        <MyTextInput name="cintura (cm)" placeHolder="Cintura medida(cm)" keyboardType="numeric" />
        <MyTextInput name="cadera (cm)" placeHolder="Cadera medida(cm)" keyboardType="numeric" />
        <MyTextInput name="gluteos (cm)" placeHolder="Gluteos medida(cm)" keyboardType="numeric" />
        <MyTextInput name="piernas (cm)" placeHolder="Pierna medida(cm)" keyboardType="numeric" />
        <MyTextInput name="brazo (cm)" placeHolder="Brazo medida(cm)" keyboardType="numeric" />
        {selectedRecord ? <MyButton title="Eliminar factura" onPress={handleDelete} /> : null}
      </ModalForm>
    </View>
  )

}

export default ManageRecords;