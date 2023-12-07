import client from "./client";

// create user
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

// sign in
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

// sign in google function
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

// signout function
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

// update user function
export const updateUser = async (id, formData) => {
  const token = localStorage.getItem("token");
  try {
    const { data } = await client.post(`/user/update/${id}`, formData, {
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

// delete user function
export const deleteUser = async (id) => {
  const token = localStorage.getItem("token");
  try {
    const { data } = await client.delete(`/user/delete/${id}`, {
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

export const getUserListings = async (id) => {
  const token = localStorage.getItem("token");
  try {
    const { data } = await client(`/user/listings/${id}`, {
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

export const getUser = async (id) => {
  const token = localStorage.getItem("token");
  try {
    const { data } = await client(`/user/${id}`, {
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
