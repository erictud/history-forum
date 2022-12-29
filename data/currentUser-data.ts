import { atom } from "recoil";

export const currentUserData = atom({
  key: "currentUserData",
  default: {
    username: "",
    imgUser: null,
    creationDate: "",
    description: "",
    nrOfBulbs: 0,
  },
});
