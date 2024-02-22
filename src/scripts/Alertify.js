import { toast } from "react-toastify";

export const Alertify = {
  error: (text) => {
    toast.error(text, { style: { background: "red", color: "white" } });
  },
  success: (text) => {
    toast.success(text, { style: { background: "#1df57b", color: "white" } });
  },
  default: (text) => {
    toast.info(text, { style: { background: "gray", color: "white" } });
  },
};
