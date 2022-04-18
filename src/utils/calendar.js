import { deleteDatabase, getData, insertDatabase, updateDatabase } from "../helper/database";
import { collections } from "../constants/api";

export const getDays = () => {
  return getData(collections.CALENDAR).then(days => {
    if(days) {
      return Object.keys(days).map(key => {
        return {
          ...days[key],
          key
        }
      })
    }
    return []
  }).catch(() => {
    return [];
  });
}

export const deleteDay = day => {
  return deleteDatabase(day.key, collections.CALENDAR).then(result => {
    return result.status
  }).catch(error => {
    console.log(error)
    return error;
  })
}

export const updateDay = day => {
  return updateDatabase(day.key, day, collections.CALENDAR).then(result => {
    return result.status;
  }).catch(err => {
    console.log(err)
    return err;
  })
}

export const insertDay = day => {
  return insertDatabase(day, collections.CALENDAR).then(result => {
    return result.status
  }).catch(err => {
    console.log(err)
    return err;
  })
}