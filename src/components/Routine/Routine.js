import List from "../../UI/List/";
import MyButton from "../../UI/Button";

const Routine = ({ user, routine, onBack, onDelete }) => {

  const handlePress = () => {
    console.log(routine)
  }

  return (
    <>
      <List onPress={handlePress} titleKey="day" data={routine}/>
      {user.type === 'Entrenador' ? <MyButton title="Eliminar" onPress={onDelete}/> : null}
      <MyButton title="Regresar" onPress={onBack}/>
    </>
    
  )

}

export default Routine;