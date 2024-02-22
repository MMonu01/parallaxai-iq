import { useState } from "react";

export const useLoader = (props) => {
  const [loader, setLoader] = useState(props);

  const startLoader = () => {
    setLoader(true);
  };

  const endLoader = () => {
    setLoader(false);
  };

  return [loader, startLoader, endLoader];
};
