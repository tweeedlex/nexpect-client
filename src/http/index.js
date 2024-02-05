import axios from "axios";

export const sendContact = async (data) => {
  try {
    const response = await axios.post(
      process.env.REACT_APP_API_URL + "/contact",
      data
    );
    return response.data;
  } catch (e) {
    console.log(e);
    return e.response.data;
  }
};
