import client from "./client";

export const createUser = async (userInfo) => {
  try {
    const { data } = await client.post("/auth/signup", userInfo);
    return data;
  } catch (error) {
    const { response } = error;

    if (response?.data) {
      return response?.data;
    }

    return { error: error.message || error };
  }
};

export const signInUser = async (userInfo) => {
  try {
    const { data } = await client.post("/auth/signin", userInfo);
    return data;
  } catch (error) {
    const { response } = error;

    if (response?.data) {
      return response?.data;
    }

    return { error: error.message || error };
  }
};

export const signInGoogle = async (userInfo) => {
  try {
    const { data } = await client.post("/auth/google", userInfo);
    return data;
  } catch (error) {
    const { response } = error;

    if (response?.data) {
      return response?.data;
    }

    return { error: error.message || error };
  }
};

export const signOut = async () => {
  try {
    const { data } = await client("/auth/signout");
    return data;
  } catch (error) {
    const { response } = error;

    if (response?.data) {
      return response?.data;
    }

    return { error: error.message || error };
  }
};

export const updateUser = async (id, formData) => {
  // console.log(formData);

  const token = localStorage.getItem("token");
  try {
    const { data } = await client.post(`/user/update/${id}`, formData, {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "multipart/form-data",
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

export const deleteUser = async (id) => {
  const token = localStorage.getItem("token");
  try {
    const { data } = await client.delete(`/user/delete/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "multipart/form-data",
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
