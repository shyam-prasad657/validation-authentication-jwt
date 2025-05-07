import axiosInstance from '../api/axios';

const logout = async (setAuth) => {
  try {
    await axiosInstance.post('http://localhost:3500/logout', {}, { withCredentials: true });
    localStorage.clear(); // optional: clear token and expiry
    if (setAuth) {
      setAuth({});
    }
  } catch (error) {
    console.error('Logout failed:', error);
  }
};

export default logout;