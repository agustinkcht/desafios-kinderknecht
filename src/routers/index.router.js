import CustomRouter from "./CustomRouter.js";
import apiRouter from "./api/index.api.js";
import artilleryRouter from "./artillery.router.js";
import { sendVerificationEmail } from "../utils/mailing.util.js";

class IndexRouter extends CustomRouter {
  init() {
    this.use("/api", apiRouter);
    this.use("/artillery", artilleryRouter)
    this.create("/api/nodemailer", ["PUBLIC"], async(req, res, next) => {
      try {
        const { email, name } = req.body // coming from the register form (or postman)
        await sendVerificationEmail({ to: email, name })
        return res.suc200mes("Email Sent")
      } catch (err) {
        return next(err)
      }
    })
  }
}

const indexRouter = new IndexRouter();

export default indexRouter.getRouter();
