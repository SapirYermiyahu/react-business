import http from "./httpService";
import { apiUrl } from "../config.json";
import jwtDecode from "jwt-decode";
const tokenKey = "token";

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getMyFavsCards() {
  return http.get(`${apiUrl}/users/cards`);
}

export function getUsers() {
  return http.get(`${apiUrl}/users`);
}

export function addFavs(favs) {
  return http.put(`${apiUrl}/users/cards`, favs);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export async function login(email, password) {
  const { data } = await http.post(`${apiUrl}/auth`, { email, password });
  localStorage.setItem(tokenKey, data.token);
}

export default {
  login,
  getCurrentUser,
  logout,
  getJwt,
  addFavs,
  getMyFavsCards,
};
