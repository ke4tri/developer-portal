import axios from 'axios';
import apiKeys from '../apiKeys';

const firebaseUrl = apiKeys.firebaseConfig.databaseURL;

const getRequest = () => new Promise((resolve, reject) => {
  axios
    .get(`${firebaseUrl}/blogs.json`)
    .then((res) => {
      const blogs = [];
      if (res.data !== null) {
        Object.keys(res.data).forEach((key) => {
          res.data[key].id = key;
          blogs.push(res.data[key]);
        });
      }
      resolve(blogs);
    })
    .catch(err => reject(err));
});

// all of the below are just for that of tutorials and nothing else
const deleteBlog = blogId => axios.delete(`${firebaseUrl}/blogs/${blogId}.json`);

const postRequestBlog = blog => axios.post(`${firebaseUrl}/blogs.json`, blog);

const getSingleBlog = blogId => axios.get(`${firebaseUrl}/blogs/${blogId}.json`);

const putRequestBlog = (blogId, blog) => axios.put(`${firebaseUrl}/blogs/${blogId}.json`, blog);

export default {
  getRequest,
  deleteBlog,
  getSingleBlog,
  putRequestBlog,
  postRequestBlog,
};
