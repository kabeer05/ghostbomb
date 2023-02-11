export const run = async (axios, number) => {
  return await axios({
    method: "POST",
    url: "https://login.housing.com/api/v2/send-otp",
    params: {
      phone: number,
    },
  });
};
