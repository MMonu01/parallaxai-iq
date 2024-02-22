export const ErrorExtractor = (err) => {
  let text = "";
  let Error = "";
  for (let i = 0; i < err.length; i++) {
    if (text.includes("<pre>")) {
      Error += err[i];
      if (text.includes("<br>")) {
        break;
      }
    }
    text += err[i];
  }

  Error = Error.replace("<br>", "");

  return Error;
};
