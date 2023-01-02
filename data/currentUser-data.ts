import { atom } from "recoil";

export const currentUserData = atom({
  key: "currentUserData",
  default: {
    username: "" as string,
    imgUser: null as string | null,
    description: "" as string,
  },
});
