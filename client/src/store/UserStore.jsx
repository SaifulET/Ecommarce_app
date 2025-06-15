import { create } from "zustand";
import axios from "axios";
import { getEmail, setEmail, unauthorized } from "../utility/utility";
import Cookies from "js-cookie";
const UserStore = create((set) => ({
  isLogin: () => {
    return !!Cookies.get("token");
  },

  loginFormData: { email: "" },
  loginOnChange: async (name, value) => {
    set((state) => ({
      loginFormData: {
        ...state.loginFormData,
        [name]: value,
      },
    }));
  },
  OtpFormData: { otp: "" },
  OtpOnChange: async (name, value) => {
    set((state) => ({
      OtpFormData: {
        ...state.OtpFormData,
        [name]: value,
      },
    }));
  },

  isFormSubmit: false,

  UserOtpRequest: async (email) => {
    set({ isFormSubmit: true });
    let res = await axios.post("/api/login", { email: email });
    console.log("aaa");
    setEmail(email);
    set({ isFormSubmit: false });
    return res.data["status"] === "success";
  },
  VerifyLoginRequest: async (otp) => {
    set({ isFormSubmit: true });
    let email = getEmail();
    let res = await axios.post("/api/VerifyLogin", { email: email, otp: otp });
    if (res.data["status"] === "success") {
      Cookies.set("token", res.data["token"]);
      set({ isFormSubmit: false });
      return res.data["status"] === "success";
    } else {
      set({ isFormSubmit: false });
      return false;
    }
  },
  UserLogoutRequest: async () => {
    set({ isFormSubmit: true });
    let res = await axios.get("/api/Logout");
    Cookies.remove("token");
    set({ isFormSubmit: false });
    return res.data["status"];
  },
  ProfileForm: {
    cus_add: "",
    cus_city: "",
    cus_country: "",
    cus_fax: "",
    cus_name: "",
    cus_phone: "",
    cus_postcode: "",
    cus_state: "",
    ship_name: "",
    ship_phone: "",
    ship_country: "",
    ship_city: "",
    ship_state: "",
    ship_postcode: "",
    ship_add: "",
  },
  ProfileFormChange: (name, value) => {
    set((state) => ({
      ProfileForm: {
        ...state.ProfileForm,
        [name]: value,
      },
    }));
  },
  ProfileDetails: null,
  ProfileDetailsRequest: async () => {
    try {
  let res = await axios.get("/api/ReadUserProfile",{
  withCredentials: true,
});

  if (res.data['Message']['data']) {
    set({ ProfileDetails: res.data['Message']['data'] });
    set({ ProfileForm: res.data['Message']['data']
     });
  } else {
    set({ ProfileDetails: [] });
  }
} catch (e) {
  console.log(e);
}

  },

  ProfileSaveRequest: async (PostBody) => {
    try {
      set({ ProfileDetails: null });
      let res = await axios.post("/api/UpdateUserProfile", PostBody ,{
  withCredentials: true,
});
      return res.data["status"] === "success";
    } catch (e) {
      unauthorized(e.response.status);
    }
  },
}));

export default UserStore;
