import types from "../../validator/types";

export const login = {
};

export const signup = {
    clientId: { required: true },
    firstName: { required: true },
    lastName: { required: true },
    levelId: { required: true },
    password: { required: true },
    username: { required: true },
};
