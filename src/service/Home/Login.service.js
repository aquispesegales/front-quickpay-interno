import qs from 'querystring';
import Api from '../api.services';

const credenciales = btoa('exacta.tesla.resource' + ':' + '6pqn@Ean%3peC%o09.12zx_nWAS#');

const headers = {
  'Content-Type': 'application/x-www-form-urlencoded',
  Authorization: `Basic ${credenciales}`,
};
export default {
  login(usuario) {
    const params = {
      username: usuario.username,
      password: usuario.password,
      grant_type: 'password',
    };
  

    return Api().post('oauth/token', qs.stringify(params), {
      headers,
    });
  },
};
