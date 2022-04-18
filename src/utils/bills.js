import { deleteDatabase, getData, insertDatabase, updateDatabase } from "../helper/database";
import { collections } from "../constants/api";

export const getBills = () => {
  return getData(collections.BILLS).then(bills => {
    if(bills) {
      return Object.keys(bills).map(key => {
        return {
          ...bills[key],
          key
        }
      })
    }
    return []
  }).catch(() => {
    return [];
  });
}

export const deleteBill = bill => {
  return deleteDatabase(bill.key, collections.BILLS).then(result => {
    return result.status
  }).catch(error => {
    console.log(error)
    return error;
  })
}

export const updateBill = bill => {
  return updateDatabase(bill.key, bill, collections.BILLS).then(result => {
    return result.status;
  }).catch(err => {
    console.log(err)
    return err;
  })
}

export const insertBill = bill => {
  return insertDatabase(bill, collections.BILLS).then(result => {
    return result.status
  }).catch(err => {
    console.log(err)
    return err;
  })
}