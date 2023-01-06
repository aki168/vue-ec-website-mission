import checkAdmin from "./checkAdmin";
import axios from "axios";

function logout() {
  document.cookie = "hexToken='';expires=0; path=/";
  const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
  axios.defaults.headers.common.Authorization = token;
  checkAdmin()
}

export default logout