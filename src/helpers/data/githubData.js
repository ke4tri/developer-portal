import axios from 'axios';

const getUser = user => new Promise((resolve, reject) => {
  axios.get('https://api.github.com/users/ke4tri')
    .then((res) => {
      const profile = res.data;
      resolve(profile);
    })
    .catch((err) => {
      reject(err);
    });
});

const getUserEvents = username => new Promise((resolve, reject) => {
  axios.get(`'https://api.github.com/users/${username}/events/public'`)
    .then((res) => {
      resolve(res.data);
    })
    .catch((err) => {
      reject(err);
    });
});

export default { getUser, getUserEvents };
