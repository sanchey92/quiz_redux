import axios from 'axios';

export default axios.create({
  baseURL: 'https://reactjs-my-test.firebaseio.com/'
})