import jwtDecode from "jwt-decode";

const tokenKey = "pokedexToken";

export default function isAuthenticated() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return false;
  }
}
