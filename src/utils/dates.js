import { deleteDatabase, getData, insertDatabase, updateDatabase } from "../helper/database";
import { collections } from "../constants/api";

export const getDates = () => {
  return getData(collections.DATES).then(dates => {
    if(dates) {
      return Object.keys(dates).map(key => {
        return {
          ...dates[key],
          key
        }
      })
    }
    return []
  }).catch(() => {
    return [];
  });
}

export const deleteDate = date => {
  return deleteDatabase(date.key, collections.DATES).then(result => {
    return result.status
  }).catch(error => {
    console.log(error)
    return error;
  })
}

export const updateDate = date => {
  return updateDatabase(date.key, date, collections.DATES).then(result => {
    return result.status;
  }).catch(err => {
    console.log(err)
    return err;
  })
}

export const insertDate = date => {
  return insertDatabase(date, collections.DATES).then(result => {
    return result.status
  }).catch(err => {
    console.log(err)
    return err;
  })
}