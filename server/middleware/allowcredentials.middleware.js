

const allowCredentials = (req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
};

export default allowCredentials;
