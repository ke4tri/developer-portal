import axios from 'axios';
import apiKeys from '../apiKeys';

const clientId = apiKeys.githubApi.client_id;
const clientSecret = apiKeys.githubApi.client_secret;


const getUser = githubUsername => new Promise((resolve, reject) => {
  axios
    .get(`https://api.github.com/users/${githubUsername}?client_id=${clientId}&client_secret=${clientSecret}`)
    .then((result) => {
      resolve(result.data);
    })
    .catch(err => reject(err));
});

const getUserEvents = githubUsername => new Promise((resolve, reject) => {
  axios
    .get(`https://api.github.com/users/${githubUsername}/events/public`)
    .then((result) => {
      let totalCommits = 0;
      const pushEvents = result.data.filter(event => event.type === 'PushEvent');
      pushEvents.forEach((pushEvent) => {
        totalCommits += pushEvent.payLoad.commits.length;
      });
      resolve(totalCommits);
    })
    .catch(err => reject(err));
});

// const getUser = user => new Promise((resolve, reject) => {
//   axios.get('https://api.github.com/users/ke4tri')
//     .then((res) => {
//       resolve(res.data);
//     })
//     .catch((err) => {
//       reject(err);
//     });
// });

// const getUserEvents = username => new Promise((resolve, reject) => {
//   axios.get(`https://api.github.com/users/${username}/events/public`)
//     .then((res) => {
//       resolve(res.data[0].actor);
//     })
//     .catch((err) => {
//       reject(err);
//     });
// });

export default { getUser, getUserEvents };
