import React from "react";

import { toast } from "react-toastify";

const toastconfig = {
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: 0,
  theme: "dark",
};

export const errortoast = (message) => {
  toast.error(message, toastconfig);
};
export const successtoast = (message) => {
  toast.success(message, toastconfig);
};
export const warningtoast = (message) => {
  toast.warning(message, toastconfig);
};
export const infotoast = (message) => {
  toast.info(message, toastconfig);
};
