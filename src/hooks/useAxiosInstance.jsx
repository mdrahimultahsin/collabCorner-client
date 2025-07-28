import axios from "axios";
const axiosInstance = axios.create({
    baseURL:  "https://collab-corner-server.vercel.app", 
  });
const useAxiosInstance = () => {
  
  return axiosInstance;
};

export default useAxiosInstance;
