import axios from "axios";

//methods for interacting with API Auth routes
export default {
  login: (username, password) =>
     axios.post('https://bootcampspot.com/api/instructor/v1/login', {
        "email": username,
        "password": password
     }),
  getMe: (authToken) => 
    axios({
      method: 'GET',
      url: 'https://bootcampspot.com/api/instructor/v1/me',
      headers: { 'Content-Type': 'application/json', 'authToken': authToken }
    }),
  getAttendance: (courseId, authToken) =>
    axios({
      method: 'POST',
      url: 'https://bootcampspot.com/api/instructor/v1/attendance',
      headers: { 'Content-Type': 'application/json', 'authToken': authToken },
      data: { courseId: courseId }
    })
};
