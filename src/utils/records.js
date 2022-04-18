import { deleteDatabase, getData, insertDatabase, updateDatabase } from "../helper/database";
import { collections } from "../constants/api";

export const getRecords = () => {
  return getData(collections.RECORDS).then(records => {
    if(records) {
      return Object.keys(records).map(key => {
        return {
          ...records[key],
          key
        }
      })
    }
    return []
  }).catch(() => {
    return [];
  });
}

export const deleteRecord = record => {
  return deleteDatabase(record.key, collections.RECORDS).then(result => {
    return result.status
  }).catch(error => {
    console.log(error)
    return error;
  })
}

export const updateRecord = record => {
  return updateDatabase(record.key, record, collections.RECORDS).then(result => {
    return result.status;
  }).catch(err => {
    console.log(err)
    return err;
  })
}

export const insertRecord = record => {
  return insertDatabase(record, collections.RECORDS).then(result => {
    return result.status
  }).catch(err => {
    console.log(err)
    return err;
  })
}