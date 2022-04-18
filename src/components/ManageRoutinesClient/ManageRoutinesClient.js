import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { getRoutines } from '../../utils/routines';
import { useEffect } from 'react';
import MyButton from '../../UI/Button';
import List from '../../UI/List/List';
import Routine from '../Routine';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
})

const ManageRoutinesClient = ({ user, onBack }) => {

  const [routines, setRoutines] = useState([]);
  const [selectedRoutine, setSelectedRoutine] = useState();

  useEffect(() => {
    getRoutines().then(routines => {
      const filter = routines.filter(routine => routine.client === user.name)
      setRoutines(filter);
    }).catch(() => setRoutines([]))
  }, []);

  const handleRoutine = routine => {
    console.log(routine)
    setSelectedRoutine(routine.exercises)
  }

  const onBackRoutine = () => {
    setSelectedRoutine(null)
  }

  return (
    <View style={styles.container}>
      {
        selectedRoutine ? 
        <Routine user={user} routine={selectedRoutine} onBack={onBackRoutine}/> :
        <>
          <List onPress={handleRoutine} titleKey="entrenador" data={routines}/>
          <MyButton title="Regresar" onPress={onBack}/>
        </>
      }
    </View>
  )

}

export default ManageRoutinesClient;