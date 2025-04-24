import asyncHandler from "../utils/asyncHandler.js";

const adminAuthenticate = asyncHandler(async (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    res.status(403);
    throw new Error("Access denied. Admins only.");
  }
  next();
});

export default adminAuthenticate;
