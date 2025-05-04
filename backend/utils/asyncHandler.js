const asyncHandler = (fn) => (req, res,next) => {
  Promise.resolve(fn(req, res,next)).catch((err) => {
    let status = res.statusCode !== 200 ? res.statusCode : 500;
    res.status(status).send({ message: err.message });
  });
};

export default asyncHandler;


