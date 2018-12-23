import axios from 'axios';
import apiKeys from '../apiKeys';

const firebaseUrl = apiKeys.firebaseConfig.databaseURL;

const getRequest = () => new Promise((resolve, reject) => {
  axios
    .get(`${firebaseUrl}/podcasts.json`)
    .then((res) => {
      const podcasts = [];
      if (res.data !== null) {
        Object.keys(res.data).forEach((key) => {
          res.data[key].id = key;
          podcasts.push(res.data[key]);
        });
      }
      resolve(podcasts);
    })
    .catch(err => reject(err));
});

// all of the below are just for that of tutorials and nothing else
const deletePodcast = podcastId => axios.delete(`${firebaseUrl}/podcasts/${podcastId}.json`);

const postRequestPodcast = podcast => axios.post(`${firebaseUrl}/podcasts.json`, podcast);

const getSinglePodcast = podcastId => axios.get(`${firebaseUrl}/podcasts/${podcastId}.json`);

const putRequestPodcast = (podcastId, podcast) => axios.put(`${firebaseUrl}/podcasts/${podcastId}.json`, podcast);

export default {
  getRequest,
  deletePodcast,
  getSinglePodcast,
  putRequestPodcast,
  postRequestPodcast,
};
