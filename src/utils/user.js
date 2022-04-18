import { deleteDatabase, getData, insertDatabase, updateDatabase } from "../helper/database";
import { collections } from "../constants/api";

export const login = data => {
  return getData(collections.USERS).then(users => {
    if(users) {
      const filter = Object.keys(users).filter(key => users[key].email === data.email && users[key].password === data.password);
      if(filter.length > 0) {
        const key = filter[0];
        return {
          ...users[key],
          key,
        }
      }
    }
    return {};
  }).catch(err => {
    console.log(err);
    return err; 
  });
};

export const register = data => {
  return getData(collections.USERS).then(users => {
    if(users) {
      const filter = Object.keys(users).filter(key => users[key].email === data.email && users[key].password === data.password);
      if(filter.length > 0) {
        return false;
      }
    }
    return insertDatabase(data, collections.USERS);
  }).then(() => {
    return true;
  }).catch(() => {
    return false;
  });
};

export const getUsers = () => {
  return getData(collections.USERS).then(users => {
    if(users) {
      return Object.keys(users).map(key => {
        return {
          ...users[key],
          key
        }
      })
    }
    return []
  }).catch(() => {
    return [];
  });
}

export const deleteUser = user => {
  return deleteDatabase(user.key, collections.USERS).then(result => {
    return result.status
  }).catch(error => {
    console.log(error)
    return error;
  })
}

export const updateUser = user => {
  return updateDatabase(user.key, user, collections.USERS).then(result => {
    return result.status;
  }).catch(err => {
    console.log(err)
    return err;
  })
}