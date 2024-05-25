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

export const searchListing = async (searchQuery) => {
  try {
    const { data } = await client(`/listing/get?${searchQuery}`);

    return data;
  } catch (error) {
    const { response } = error;

    if (response?.data) {
      return response?.data;
    }

    return { error: error.message || error };
  }
};

export const getOfferListing = async () => {
  try {
    const { data } = await client(`/listing/get?offer=true&limit=4`);

    return data;
  } catch (error) {
    const { response } = error;

    if (response?.data) {
      return response?.data;
    }

    return { error: error.message || error };
  }
};

export const getRentListing = async () => {
  try {
    const { data } = await client(`/listing/get?type=rent&limit=4`);

    return data;
  } catch (error) {
    const { response } = error;

    if (response?.data) {
      return response?.data;
    }

    return { error: error.message || error };
  }
};

export const getSaleListing = async () => {
  try {
    const { data } = await client(`/listing/get?type=sale&limit=4`);

    return data;
  } catch (error) {
    const { response } = error;

    if (response?.data) {
      return response?.data;
    }

    return { error: error.message || error };
  }
};

export const getAllListings = async () => {
  try {
    const { data } = await client(`/listing/getall`);

    return data;
  } catch (error) {
    const { response } = error;

    if (response?.data) {
      return response?.data;
    }

    return { error: error.message || error };
  }
};

export const getByLocation = async (location) => {
  try {
    const { data } = await client(`/listing/get-location?location=${location}`);

    return data;
  } catch (error) {
    const { response } = error;

    if (response?.data) {
      return response?.data;
    }

    return { error: error.message || error };
  }
};

export const getByType = async (type) => {
  try {
    const { data } = await client(`/listing/get-type?type=${type}`);

    return data;
  } catch (error) {
    const { response } = error;

    if (response?.data) {
      return response?.data;
    }

    return { error: error.message || error };
  }
};
