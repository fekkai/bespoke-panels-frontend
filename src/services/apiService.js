//this folder is essentially what interfaces with the api

const axios = require("axios");

const BASE_URL = "https://bespoke-backend-db.herokuapp.com/";

// const BASE_URL = "http://localhost:8001/";

const JWT_TOKEN = localStorage.getItem("token"); //returns false if does not exist

//create axios client that is reusable
const apiClient = axios.create({
  baseURL: BASE_URL, // this is where the api is coming from
  headers: {
    Authorization: `Bearer ${JWT_TOKEN}`
  }
});

//if you get a cors error, you cannot fix it from the front end

//this is login function, async bc api call
export const login = async data => {
  try {
    // console.log('this also works', data)
    const response = await apiClient.post("/auth/login", data);
    // console.log(response)
    const { token, user } = response.data; //token and user are being 'plucked' from resposne
    localStorage.setItem("token", token);
    return user;
  } catch (error) {
    throw error;
  }
};

export const getProfile = async () => {
  try {
    const response = await apiClient.get("/app/profile");
    const { user } = response.data;
    return user;
  } catch (error) {
    throw error;
  }
};

export const signUp = async data => {
  try {
    const response = await apiClient.post("/auth/signup", data);
    const { token, user } = response.data;
    localStorage.setItem("token", token); //this is the key to login after signing up. token in local storage
    return user;
  } catch (error) {
    throw error;
  }
};

const API_KEY = process.env.API_KEY;
const PASSWORD = process.env.PASSWORD;
