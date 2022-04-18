import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useEffect } from 'react';
import { getBills, insertBill, updateBill, deleteBill } from '../../utils/bills';
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

const ManageBills = ({ onBack }) => {

  const [bills, setBills] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedBill, setSelectedBill] = useState();
  const [clients, setClients] = useState([]);

  useEffect(() => {
    getBills().then(bills => setBills(bills)).catch(() => setBills([]))
    getUsers().then(users => {
      const clients = users.filter(user => user.type === 'Cliente').map(client => client.name)
      setClients(clients);
    }).catch(err => setUsers([]))
  }, []);

  const changeVisiblity = () => {
    setVisible(state => !state)
  }

  const handleUpdate = form => {
    if(selectedBill) {
      updateBill(form).then(result => {
        changeVisiblity()
        Toast.show({
          type: 'success',
          text1: 'Actualizacion completa',
          text2: 'Se ha logrado actualizar la factura con exito'
        })
        getBills().then(bills => setBills(bills)).catch(() => setBills([]))
      }).catch(err => {
        changeVisiblity()
        Toast.show({
          type: 'error',
          text1: 'Actualizacion incompleta',
          text2: 'No se pudo actualizar la factura, intente nuevamente'
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
      insertBill(form).then(result => {
        changeVisiblity()
        Toast.show({
          type: 'success',
          text1: 'Nuevo horario',
          text2: 'Se logro agregar la factura correctamente'
        })
        getBills().then(bills => setBills(bills)).catch(() => setBills([]))
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

  const handleBill = bill => {
    setSelectedBill(bill);
    changeVisiblity();
  }

  const handleDelete = () => {
    deleteBill(selectedBill).then(result => {
      changeVisiblity()
      Toast.show({
        type: 'success',
        text1: 'Eliminacion completa',
        text2: 'Se logro laiminar la factura con exito'
      })
      getBills().then(bills => setBills(bills)).catch(() => setBills([]))
    }).catch(error => {
      changeVisiblity()
      Toast.show({
        type: 'error',
        text1: 'Eliminacion fallida',
        text2: 'Error al comunicarse con la servidor'
      })
    })
  }

  const addBill = () => {
    setSelectedBill(null);
    changeVisiblity()
  }

  return (
    <View style={styles.container}>
      <List onPress={handleBill} titleKey="client" data={bills}/>
      <MyButton title="Agregar" onPress={addBill}/>
      <MyButton title="Regresar" onPress={onBack}/>
      <ModalForm
        title="Factura"
        submitTitle="Finalizar"
        submitForm={handleUpdate}
        closeModal={changeVisiblity}
        visible={visible}
        defaultForm={selectedBill}
      >
        <MyPicker name="client" items={clients} />
        <MyTextInput name="date" placeHolder="Ingrese la fecha" />
        <MyTextInput name="price" placeHolder="Ingrese el monto" keyboardType="numeric" />
        <MyTextInput name="description" placeHolder="Motivo de la factura" />
        {selectedBill ? <MyButton title="Eliminar factura" onPress={handleDelete} /> : null}
      </ModalForm>
    </View>
  )

}

export default ManageBills;