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
    console.log("results", results); // eslint-disable-line
    const models = [...new Set(results.map(item => item.attributes.Model))];
    return Array.from(models);
    // You can use the "get" method to get the value of an attribute
    // Ex: response.get("<ATTRIBUTE_NAME>")
    // if (typeof document !== 'undefined') {
    //   // document.write(`Car_Model_List found: ${JSON.stringify(results)}`);
    //   console.log('Car_Model_List found', results);
    //   results.map((car) => {
    //     console.log("Make: ", car.attributes.Make); // eslint-disable-line
    //     console.log("Model: ", car.attributes.Model); // eslint-disable-line
    //   })
    // }
  });
}