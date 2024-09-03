import axios from "axios";

export const getAllUsersData = async ({
  searchTerm,
  sortBy,
  sortOrder,
  currentPage,
  itemsPerPage,
}) => {
  try {
    let { data } = await axios.get(
      `https://apnaorganicstore.in/crud_api/users.php?search=${searchTerm}&sort_by=${sortBy}&sort_order=${sortOrder}&page=${currentPage}&limit=${itemsPerPage}`
    );
    console.log("data in api===>", data);
    return data;
  } catch (error) {
    console.log("error is access to all users data is =>", error);
  }
};

export const getUser = async (id) => {
  try {
    const { data } = await axios.get(
      `https://apnaorganicstore.in/crud_api/user.php?id=${id}`
    );
    return data;
  } catch (error) {
    console.log("error in get user =>", error);
  }
};

export const addUser = async (formData) => {
  try {
    const response = await axios.post(
      "https://apnaorganicstore.in/crud_api/add_update.php",
      formData
    );
  } catch (error) {
    console.error("Error adding user==>", error);
  }
};

export const updateUser = async (formData) => {
  try {
    const response = await axios.put(
      "https://apnaorganicstore.in/crud_api/add_update.php",
      formData
    );
  } catch (error) {
    console.log("error in update User=>", error);
  }
};

export const deleteUser = async (selectedUser) => {
  try {
    const { data } = await axios.delete(
      `https://apnaorganicstore.in/crud_api/add_update.php?id=${selectedUser.id}`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
