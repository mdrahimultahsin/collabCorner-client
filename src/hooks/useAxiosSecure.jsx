import axios from "axios";
import useAuth from "./useAuth";
import {getIdToken} from "firebase/auth";

const axiosSecure = axios.create({
  baseURL: "https://collab-corner-server.vercel.app",
});

const useAxiosSecure = () => {
  const {user} = useAuth();

  axiosSecure.interceptors.request.use(
    async (config) => {
      if (user) {
        const token = await getIdToken(user, true); 
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
