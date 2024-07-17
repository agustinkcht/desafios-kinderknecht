import { verifyToken } from "../utils/token.util.js";

async function isValidAdmin(req, res, next) {
  try {
    const { token } = req.cookies;
    const data = verifyToken(token);
    const { role } = data;
    if (role === "1") {
      return next();
    } else {
      return res.err403();
    }
  } catch (err) {
    return next(err);
  }
}

export default isValidAdmin;
