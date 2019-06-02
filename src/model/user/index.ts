export const getUser = {
    userId: { required: true },
};

export const getUsers = {
    sort_by: {  }
};

export const registerUser = {
    firstName: { required: true },
    lastName: { required: true },
    password: { required: true },
    username: { required: true },
};

export const deleteUser = {
    userId: { required: true }
};
