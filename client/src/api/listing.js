import client from "./client";

export const createListing = async (formData) => {
  const token = localStorage.getItem("token");

  try {
    const { data } = await client.post("/listing/create", formData, {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });

    return data;
  } catch (error) {
    const { response } = error;

    if (response?.data) {
      return response?.data;
    }

    return { error: error.message || error };
  }
};
