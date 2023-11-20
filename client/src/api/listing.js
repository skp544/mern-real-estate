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

export const updateListing = async (id, formData) => {
  const token = localStorage.getItem("token");

  try {
    const { data } = await client.post(`/listing/update/${id}`, formData, {
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

export const deleteListing = async (id) => {
  const token = localStorage.getItem("token");

  try {
    const { data } = await client.delete(`/listing/delete/${id}`, {
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

export const getListing = async (id) => {
  const token = localStorage.getItem("token");

  try {
    const { data } = await client(`/listing/get-listing/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
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
