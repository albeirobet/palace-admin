const constants = require("../../utils/constants/constants");
import { auth } from "boot/firebase";
import axios from "axios";
import { reactive, ref } from "vue";
const isPendingUser = ref(false);
let generalResponseUser = reactive({});

const checkUserExists = async (email) => {
  isPendingUser.value = true;
  try {
    const postRequest = {
      email: email,
    };
    await axios
      .post(
        `${constants.ACCESS_CONTROL_MS_URL}/api/v1/users/checkUserExists`,
        postRequest
      )
      .then((result) => {
        if (result.data) {
          generalResponseUser.value = result.data;
        }
      });
    isPendingUser.value = false;
    return generalResponseUser;
  } catch (err) {
    // Catch Service Exception
    if (err.response && err.response.data) {
      generalResponseUser.value = err.response.data;
    } else {
      // Catch Unhandled Exception
      let unhandledMessage = "";
      if (err.message === "Network Error") {
        unhandledMessage = "Error Conexión de Red";
      } else {
        unhandledMessage = err.message;
      }
      generalResponseUser.value = {
        success: false,
        apiError: {
          messageUser: unhandledMessage,
          messageDeveloper: err.message,
          code: "GEN-001",
        },
      };
    }
    isPendingUser.value = false;
  }
};

const updateUser = async (
  email,
  email_verified,
  lastLogin,
  lastPasswordReset
) => {
  isPendingUser.value = true;
  try {
    const patchRequest = {
      email: email,
      email_verified: email_verified,
      lastLogin: lastLogin,
      lastPasswordReset: lastPasswordReset,
    };
    await axios
      .patch(
        `${constants.ACCESS_CONTROL_MS_URL}/api/v1/users/updateUser`,
        patchRequest
      )
      .then((result) => {
        if (result.data) {
          generalResponseUser.value = result.data;
        }
      });
    isPendingUser.value = false;
    return generalResponseUser;
  } catch (err) {
    // Catch Service Exception
    if (err.response && err.response.data) {
      generalResponseUser.value = err.response.data;
    } else {
      // Catch Unhandled Exception
      let unhandledMessage = "";
      if (err.message === "Network Error") {
        unhandledMessage = "Error Conexión de Red";
      } else {
        unhandledMessage = err.message;
      }
      generalResponseUser.value = {
        success: false,
        apiError: {
          messageUser: unhandledMessage,
          messageDeveloper: err.message,
          code: "GEN-001",
        },
      };
    }
    isPendingUser.value = false;
  }
};

const recoverAccount = async (email) => {
  isPendingUser.value = true;
  try {
    const postRequest = {
      email: email,
    };
    await axios
      .post(
        `${constants.ACCESS_CONTROL_MS_URL}/api/v1/users/recoverAccount`,
        postRequest
      )
      .then((result) => {
        if (result.data) {
          generalResponseUser.value = result.data;
        }
      });
    isPendingUser.value = false;
    return generalResponseUser;
  } catch (err) {
    // Catch Service Exception
    if (err.response && err.response.data) {
      generalResponseUser.value = err.response.data;
    } else {
      // Catch Unhandled Exception
      let unhandledMessage = "";
      if (err.message === "Network Error") {
        unhandledMessage = "Error Conexión de Red";
      } else {
        unhandledMessage = err.message;
      }
      generalResponseUser.value = {
        success: false,
        apiError: {
          messageUser: unhandledMessage,
          messageDeveloper: err.message,
          code: "GEN-001",
        },
      };
    }
    isPendingUser.value = false;
  }
};

const userLogin = async (email, password) => {
  isPendingUser.value = true;
  try {
    const res = await auth.signInWithEmailAndPassword(email, password);
    generalResponseUser.value = {
      success: true,
      data: res,
    };
    isPendingUser.value = false;
  } catch (err) {
    console.log(err.message);
    isPendingUser.value = false;
    generalResponseUser.value = {
      success: false,
      apiError: {
        messageUser: "Credenciales incorrectas",
        messageDeveloper: err.message,
        code: "AUTH-001",
      },
    };
  }
};

const userSignUp = async (email, password, displayName, tokenId) => {
  isPendingUser.value = true;
  try {
    const postRequest = {
      email: email,
      password: password,
      name: displayName,
      tokenId: tokenId,
    };
    await axios
      .post(
        `${constants.ACCESS_CONTROL_MS_URL}/api/v1/users/signup`,
        postRequest
      )
      .then((result) => {
        if (result.data) {
          generalResponseUser.value = result.data;
        }
      });
    isPendingUser.value = false;
  } catch (err) {
    // Catch Service Exception
    if (err.response && err.response.data) {
      generalResponseUser.value = err.response.data;
    } else {
      // Catch Unhandled Exception
      let unhandledMessage = "";
      if (err.message === "Network Error") {
        unhandledMessage = "Error Conexión de Red";
      } else {
        unhandledMessage = err.message;
      }
      generalResponseInvoices.value = {
        success: false,
        apiError: {
          messageUser: unhandledMessage,
          messageDeveloper: err.message,
          code: "GEN-001",
        },
      };
    }
    isPendingUser.value = false;
  }
};

const userLogout = async () => {
  isPendingUser.value = true;
  try {
    const res = await auth.signOut();
    generalResponseUser.value = {
      success: true,
      data: res,
    };
    isPendingUser.value = false;
  } catch (err) {
    console.log(err.message);
    isPendingUser.value = false;
    generalResponseUser.value = {
      success: false,
      apiError: {
        messageUser: "Error al Cerrar Sesión",
        messageDeveloper: err.message,
        code: "AUTH-002",
      },
    };
  }
};

const useUser = () => {
  return {
    checkUserExists,
    recoverAccount,
    userLogin,
    userSignUp,
    userLogout,
    updateUser,
    isPendingUser,
    generalResponseUser,
  };
};

export default useUser;
