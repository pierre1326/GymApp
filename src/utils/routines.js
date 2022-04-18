import { deleteDatabase, getData, insertDatabase, updateDatabase } from "../helper/database";
import { collections } from "../constants/api";

export const getRoutines = () => {
  return getData(collections.ROUTINES).then(routines => {
    if(routines) {
      return Object.keys(routines).map(key => {
        return {
          ...routines[key],
          key
        }
      })
    }
    return []
  }).catch(() => {
    return [];
  });
}

export const deleteRoutine = routine => {
  return deleteDatabase(routine.key, collections.ROUTINES).then(result => {
    return result.status
  }).catch(error => {
    console.log(error)
    return error;
  })
}

export const insertRoutine = routine => {
  //PROCES ROUTINE
  return insertDatabase(routine, collections.ROUTINES).then(result => {
    return result.status
  }).catch(err => {
    console.log(err)
    return err;
  })
}