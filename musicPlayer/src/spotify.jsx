import axios from 'axios';
const authEndpoint ="https://accounts.spotify.com/authorize?" ;
const clientId="a4df8200b6bc42118fd7af0d861fe90e";
const redirectUri="http://localhost:5173/";
const scopes=["user-library-read","user-top-read", "playlist-read-private","playlist-read-collaborative","user-read-playback-state","user-modify-playback-state","user-read-currently-playing","app-remote-control","streaming"]; 

export const loginEndpoint = `${authEndpoint}client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
    "%20"
    )}&response_type=token&show_dialog=true`;
  
  const apiClient = axios.create({
    baseURL: "https://api.spotify.com/v1/",
  });
  
  export const setClientToken = (token) => {
    apiClient.interceptors.request.use(async function (config) {
      config.headers.Authorization = "Bearer " + token;
      return config;
    });
  };
  
  export default apiClient;