import axios from "axios";
import { useNavigate } from "react-router-dom";
import UseAuth from "./UseAuth";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut } = UseAuth();
  axiosSecure.interceptors.request.use(function (config) {
    const token = localStorage.getItem("access-token");
    console.log("request stope by interceptor", token);
    config.headers.authorization = `Bearer ${token}`;
    return config;
  }),
    function (error) {
      // do something with request error
      return Promise.reject(error);
    };

  // interceptor 401 and 403 status
  axiosSecure.interceptors.response.use(function (response) {
    return response;
  }),
    async (error) => {
      const status = error.response.status;
      console.log("status error in the interceptor", status);
      if (status === 401 || status === 403) {
        await logOut();
        navigate('/login');
      }
      return Promise.reject(error);
    };

  return axiosSecure;
};

export default useAxiosSecure;
