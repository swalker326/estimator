import Parse from 'parse';

const appID = process.env.REACT_APP_ACCESS_BACK4APP_APPLICATION_ID
const jsKey = process.env.REACT_APP_ACCESS_BACK4APP_JAVASCRIPT_KEY
const masterKey = process.env.REACT_APP_ACCESS_BACK4APP_MASTER_KEY
Parse.initialize(appID, jsKey, masterKey);
Parse.serverURL = 'https://parseapi.back4app.com';

export const getMakes = async () => {
  const Car_Model_List = Parse.Object.extend('Car_Model_List');
  const query = new Parse.Query(Car_Model_List);
  return query.find().then(results => {
    const makes = [...new Set(results.map(item => item.attributes.Make))];
    return Array.from(makes);
  })
}

export const getModels = async (year, make) => {
  const Car_Model_List = Parse.Object.extend('Car_Model_List');
  const query = new Parse.Query(Car_Model_List);
  query.equalTo("Make", make);
  query.equalTo("Year", year);
  /* query.equalTo("Model", 'A string'); */
  /* query.equalTo("Category", 'A string'); */
  return query.find().then((results) => {
    const models = [...new Set(results.map(item => item.attributes.Model))];
    return Array.from(models);
  });
}