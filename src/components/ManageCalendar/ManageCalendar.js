import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useEffect } from 'react';
import { getDays, insertDay, updateDay, deleteDay } from '../../utils/calendar';
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

const ManageCalendar = ({ onBack }) => {

  const [days, setDays] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedDay, setSelectedDay] = useState();

  useEffect(() => {
    getDays().then(days => setDays(days)).catch(() => setDays([]))
  }, []);

  const changeVisiblity = () => {
    setVisible(state => !state)
  }

  const handleUpdate = form => {
    if(selectedDay) {
      updateDay(form).then(result => {
        changeVisiblity()
        Toast.show({
          type: 'success',
          text1: 'Actualizacion completa',
          text2: 'Se ha logrado actualizar el dia con exito'
        })
        getDays().then(days => setDays(days)).catch(() => setDays([]))
      }).catch(err => {
        changeVisiblity()
        Toast.show({
          type: 'error',
          text1: 'Actualizacion incompleta',
          text2: 'No se pudo actualizar el horario, intente nuevamente'
        })
      }).catch(err => {
        Toast.show({
          type: 'error',
          text1: 'Actualizacion fallida',
          text2: 'Error al comunicarse con el servidor'
        })
      })
    }
    else {
      insertDay(form).then(result => {
        changeVisiblity()
        Toast.show({
          type: 'success',
          text1: 'Nuevo horario',
          text2: 'Se logro agregar el dia correctamente'
        })
        getDays().then(days => setDays(days)).catch(() => setDays([]))
      }).catch(err => {
        console.log(err)
        changeVisiblity()
        Toast.show({
          type: 'error',
          text1: 'Eliminacion fallida',
          text2: 'Error al comunicarse con el servidor'
        })
      })
    }
  }

  const handleDay = day => {
    setSelectedDay(day);
    changeVisiblity();
  }

  const handleDelete = () => {
    deleteDay(selectedDay).then(result => {
      changeVisiblity()
      Toast.show({
        type: 'success',
        text1: 'Eliminacion completa',
        text2: 'Se logro eliminar el dia con exito'
      })
      getDays().then(days => setDays(days)).catch(() => setDays([]))
    }).catch(error => {
      changeVisiblity()
      Toast.show({
        type: 'error',
        text1: 'Eliminacion fallida',
        text2: 'Error al comunicarse con el servidor'
      })
    })
  }

  const addDay = () => {
    setSelectedDay(null);
    changeVisiblity()
  }

  return (
    <View style={styles.container}>
      <List onPress={handleDay} titleKey="day" data={days}/>
      <MyButton title="Agregar" onPress={addDay}/>
      <MyButton title="Regresar" onPress={onBack}/>
      <ModalForm
        title="Horario del gimnasio"
        submitTitle="Finalizar"
        submitForm={handleUpdate}
        closeModal={changeVisiblity}
        visible={visible}
        defaultForm={selectedDay}
      >
        <MyPicker name="day" items={['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo']} />
        <MyTextInput name="schedule" placeHolder="Ingrese el horario" />
        {selectedDay ? <MyButton title="Eliminar dia" onPress={handleDelete} /> : null}
      </ModalForm>
    </View>
  )

}

export default ManageCalendar;