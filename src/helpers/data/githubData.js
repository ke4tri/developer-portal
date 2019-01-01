import axios from 'axios';
// import apiKeys from '../apiKeys';

// const clientId = apiKeys.githubApi.client_id;
// const clientSecret = apiKeys.githubApi.client_secret;

const getUser = user => new Promise((resolve, reject) => {
  axios.get('https://api.github.com/users/ke4tri')
    .then((res) => {
      resolve(res.data);
    })
    .catch((err) => {
      reject(err);
    });
});

// const getUserEvents = username => new Promise((resolve, reject) => {
//   axios.get('https://api.github.com/users/ke4tri/events/public')
//     .then((res) => {
//       // resolve(res.data[0]["actor"]);
//       resolve(res.data);
//     })
//     .catch((err) => {
//       reject(err);
//     });
// });

// export default {
//   getUser,
//   getUserEvents,
// };
export default getUser;
