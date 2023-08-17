export const apiUrl = "https://api.etiurin.nomoreparties.co";

const getToken = () => {
    const token = localStorage.getItem('jwt');
  
    return token;
  }