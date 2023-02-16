export const run = async (axios, number) => {
  return await axios({
    method: "POST",
    url: "https://login.web.ajio.com/api/auth/signupSendOTP",
    data: {
      firstName: "xxps",
      login: "wiqpdl223@wqew.com",
      password: "QASpw@1s",
      genderType: "Male",
      mobileNumber: number,
      requestType: "SENDOTP",
    },
  });
};
