import axios from "axios";

//methods for interacting with API Auth routes
export default {
  dashboard: token =>
     axios.get('/api/dashboard')
};
