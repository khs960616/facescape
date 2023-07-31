import axios from 'axios';
import { Dispatch } from 'redux';
import { setToken } from '../../store/store';
import store from '../../store/store';

const fetchToken = async (): Promise<string | null> => {
  try {
    const response = await axios.post('/api/login', {
      username: 'yourUsername',
      password: 'yourPassword',
    });
    return response.data.token;
  } catch (error) {
    console.error('Failed to fetch token', error);
    return null;
  }
};

const initToken = async (dispatch: Dispatch) => {
  const { token } = store.getState().user;

  if (!token) {
    const newToken = await fetchToken();
    if (newToken) {
      dispatch(setToken(newToken));
      axios.defaults.headers.common.Authorization = `Bearer ${newToken}`;
    }
  }
};

export { initToken, fetchToken };
