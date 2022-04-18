import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useEffect } from 'react';
import { getRoutines, insertRoutine, deleteRoutine } from '../../utils/routines';
import { getUsers } from '../../utils/user';
import Toast from 'react-native-toast-message';
import ModalForm from '../ModalForm/ModalForm';
import MyButton from '../../UI/Button';
import MyTextInput from '../../UI/TextInput';
import MyPicker from '../../UI/Picker'
import List from '../../UI/List/List';
import Routine from '../Routine/';

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

const processExercises = exercises => {
  return Object.keys(exercises).map(key => {
    let steps = {};
    exercises[key].forEach((step, index) => {
      steps[`ejercicio ${index + 1}`] = step;
    })
    return {
      day: key,
      ...steps,
    }
  })
}

const ManageRoutines = ({ user, onBack }) => {

  const [routines, setRoutines] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedRoutine, setSelectedRoutine] = useState();
  const [clients, setClients] = useState([]);
  const [exercises, setExercises] = useState({});

  useEffect(() => {
    getRoutines().then(routines => {
      const filters = routines.filter(routine => routine.entrenador === user.name)
      setRoutines(filters)
    }).catch(() => setRoutines([]))
    getUsers().then(users => {
      const clients = users.filter(user => user.type === 'Cliente').map(client => client.name)
      setClients(clients);
    }).catch(err => setUsers([]))
  }, []);

  const changeVisiblity = () => {
    setVisible(state => !state)
  }

  const handleUpdate = form => {
    const routine = {
      exercises: processExercises(exercises),
      fecha: new Date().toUTCString(),
      entrenador: user.name,
      cliente: form.cliente,
    }
    insertRoutine(routine).then(result => {
      changeVisiblity()
      Toast.show({
        type: 'success',
        text1: 'Rutina completa',
        text2: 'Se logro agregar la rutina con exito'
      })
      getRoutines().then(routines => {
        const filters = routines.filter(routine => routine.entrenador === user.name)
        setRoutines(filters)
      }).catch(() => setRoutines([]))
    }).catch(err => {
      changeVisiblity()
      Toast.show({
        type: 'error',
        text1: 'Eliminacion fallida',
        text2: 'Error al comunicarse con la servidor'
      })
    })
  }

  const handlePreview = form => {
    const day = form.dia || '';
    const exercise = form.ejercicio || '';
    setExercises(exercises => {
      const list = exercises[day] || [];
      return {
        ...exercises,
        [day]: [
          ...list,
          exercise,
        ]
      }
    });
    Toast.show({
      type: 'success',
        text1: 'Ejercicio agregado',
        text2: 'Se añadio el ejercicio al dia correspondiente'
    })
  }

  const handleRoutine = routine => {
    console.log(routine)
    setSelectedRoutine(routine);
  }

  const handleDelete = () => {
    deleteRoutine(selectedRoutine).then(result => {
      setSelectedRoutine(null)
      Toast.show({
        type: 'success',
        text1: 'Eliminacion completa',
        text2: 'Se logro eliminar la rutina con exito'
      })
      getRoutines().then(routines => {
        const filters = routines.filter(routine => routine.entrenador === user.name)
        setRoutines(filters)
      }).catch(() => setRoutines([]))
      
    }).catch(error => {
      setSelectedRoutine(null)
      Toast.show({
        type: 'error',
        text1: 'Eliminacion fallida',
        text2: 'Error al comunicarse con la servidor'
      })
    })
  }

  const addRoutine = () => {
    setSelectedRoutine(null);
    changeVisiblity()
  }

  const onBackRoutine = () => {
    setSelectedRoutine(null);
  }

  return (
    <View style={styles.container}>
      {
        selectedRoutine && selectedRoutine.exercises ?
          <Routine user={user} onDelete={handleDelete} onBack={onBackRoutine} routine={selectedRoutine.exercises}/> :
          <>
            <List onPress={handleRoutine} titleKey="cliente" data={routines}/>
            <MyButton title="Agregar" onPress={addRoutine}/>
            <MyButton title="Regresar" onPress={onBack}/>
            <ModalForm
              title="Factura"
              submitTitle="Finalizar"
              submitForm={handleUpdate}
              previewForm={handlePreview}
              previewTitle="Agregar ejercicio"
              closeModal={changeVisiblity}
              visible={visible}
              defaultForm={selectedRoutine}
            >
              <MyPicker name="cliente" items={clients} />
              <MyTextInput name="duracion (m)" placeHolder="Duracion aproximada (m)" keyboardType="numeric" />
              <MyPicker name="dia" items={['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo']} />
              <MyTextInput name="ejercicio" placeHolder="Ingrese el siguiente ejercicio de la rutina" />
            </ModalForm>    
          </>
      }
    </View>
  )

}

export default ManageRoutines;