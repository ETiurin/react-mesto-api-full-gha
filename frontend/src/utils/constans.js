export const apiUrl = "https://api.etiurin.nomoreparties.co";

export const getToken = () => {
    const token = localStorage.getItem('jwt');
  
    return token;
  }