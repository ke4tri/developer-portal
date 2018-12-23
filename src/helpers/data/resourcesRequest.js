import axios from 'axios';
import apiKeys from '../apiKeys';

const firebaseUrl = apiKeys.firebaseConfig.databaseURL;

const getRequest = () => new Promise((resolve, reject) => {
  axios
    .get(`${firebaseUrl}/resources.json`)
    .then((res) => {
      const resources = [];
      if (res.data !== null) {
        Object.keys(res.data).forEach((key) => {
          res.data[key].id = key;
          resources.push(res.data[key]);
        });
      }
      resolve(resources);
    })
    .catch(err => reject(err));
});

// all of the below are just for that of tutorials and nothing else
const deleteResources = resourcesId => axios.delete(`${firebaseUrl}/resources/${resourcesId}.json`);

const postRequestResources = resources => axios.post(`${firebaseUrl}/resources.json`, resources);

const getSingleResources = resourcesId => axios.get(`${firebaseUrl}/resources/${resourcesId}.json`);

const putRequestResources = (resourcesId, resources) => axios.put(`${firebaseUrl}/resources/${resourcesId}.json`, resources);

export default {
  getRequest,
  deleteResources,
  getSingleResources,
  putRequestResources,
  postRequestResources,
};
