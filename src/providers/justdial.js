export const run = async (axios, number) => {
  return await axios({
    method: "GET",
    url: "https://t.justdial.com/api/india_api_write/18july2018/sendvcode.php",
    params: {
      mobile: number,
    },
  });
};
