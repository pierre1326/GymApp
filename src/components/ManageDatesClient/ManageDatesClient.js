import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useEffect } from 'react';
import { getDates, insertDate, updateDate, deleteDate } from '../../utils/dates';
import { getUsers } from '../../utils/user';
import Toast from 'react-native-toast-message';
import MyButton from '../../UI/Button';
import List from '../../UI/List/List';
import ModalForm from '../ModalForm/ModalForm';
import MyTextInput from '../../UI/TextInput';
import MyPicker from '../../UI/Picker';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
})

const ManageDatesClient = ({ user, onBack }) => {

  const [dates, setDates] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState();
  const [trainers, setTrainers] = useState([]);

  const changeVisiblity = () => {
    setVisible(state => !state);
  }

  useEffect(() => {
    getDates().then(dates => {
      const filter = dates.filter(date => date.cliente === user.name)
      setDates(filter);
    }).catch(() => setDates([]))
    getUsers().then(users => {
      const trainers = users.filter(user => user.type === 'Entrenador').map(trainer => trainer.name)
      setTrainers(trainers);
    }).catch(err => setTrainers([]))
  }, []);

  const handleDate = date => {
    setSelectedDate(date)
    changeVisiblity()
  }

  const handleUpdate = form => {
    const newForm = {
      ...form,
      cliente: user.name,
    }
    if(selectedDate) {
      updateDate(newForm).then(result => {
        changeVisiblity()
        Toast.show({
          type: 'success',
          text1: 'Actualizacion completa',
          text2: 'Se ha logrado actualizar la cita con exito'
        })
        getDates().then(dates => {
          const filter = dates.filter(date => date.cliente === user.name)
          setDates(filter);
        }).catch(() => setDates([]))
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
      insertDate(newForm).then(result => {
        changeVisiblity()
        Toast.show({
          type: 'success',
          text1: 'Cita reservada',
          text2: 'Se reservo la cita con el entrenador'
        })
        getDates().then(dates => {
          const filter = dates.filter(date => date.cliente === user.name)
          setDates(filter);
        }).catch(() => setDates([]))
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

  const handleDelete = () => {
    deleteDate(selectedDate).then(result => {
      changeVisiblity()
      Toast.show({
        type: 'success',
        text1: 'Cita cancelada',
        text2: 'Se cancelo la cita exitosamente'
      })
      getDates().then(dates => {
        const filter = dates.filter(date => date.cliente === user.name)
        setDates(filter);
      }).catch(() => setDates([]))
    }).catch(error => {
      changeVisiblity()
      Toast.show({
        type: 'error',
        text1: 'Eliminacion fallida',
        text2: 'Error al comunicarse con el servidor'
      })
    })
  }

  const addDate = () => {
    setSelectedDate(null)
    changeVisiblity()
  }

  return (
    <View style={styles.container}>
      <List onPress={handleDate} titleKey="entrenador" data={dates}/>
      <MyButton title="Reservar cita" onPress={addDate}/>
      <MyButton title="Regresar" onPress={onBack}/>
      <ModalForm
        title="Reservar cita"
        submitTitle="Finalizar"
        submitForm={handleUpdate}
        closeModal={changeVisiblity}
        visible={visible}
        defaultForm={selectedDate}
      >
        <MyPicker name="entrenador" items={trainers} />
        <MyPicker name="motivo" items={['Mediciones', 'Actualizacion de Rutina']}/>
        <MyTextInput name="nota" placeHolder="Detalle a indicar" />
        <MyTextInput name="fecha" placeHolder="Indique la fecha" />
        {selectedDate ? <MyButton title="Cancelar cita" onPress={handleDelete} /> : null}
      </ModalForm>
    </View>
  )

}

export default ManageDatesClient;