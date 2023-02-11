export const run = async (axios, number) => {
  return await axios({
    method: "GET",
    url: "https://securedapi.confirmtkt.com/api/platform/register",
    params: {
      newOtp: true,
      mobileNumber: number,
    },
  });
};
