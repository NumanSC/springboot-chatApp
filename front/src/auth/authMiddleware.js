import { loginSuccess } from "./authActions";

export const login = (credials) => {
  return async (dispatch) => {
    try {
      // Asenkron giriş işlemi burada gerçekleştirilir.
      // Örneğin, API çağrısı yapılır ve başarılı giriş durumunda
      // loginSuccess eylemi çağrılır.
      console.log(credials);
      // Başarılı giriş durumunda:
      dispatch(loginSuccess());
    } catch (error) {
      // Hata durumunda gerekli işlemler yapılabilir.
    }
  };
};
