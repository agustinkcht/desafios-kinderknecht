import CustomRouter from "../CustomRouter.js";
import { create, read, readOne, update, destroy } from "../../controllers/users.controller.js";

class UsersRouter extends CustomRouter {
  init() {
    this.create("/", ["PUBLIC"], create);
    this.read("/", ["USER", "ADMIN"], read);
    this.read("/:uid", ["USER", "ADMIN"], readOne);
    this.update("/:uid", ["USER", "ADMIN"], update);
    this.destroy("/:uid", ["USER", "ADMIN"], destroy);
  }
}

const usersRouter = new UsersRouter();
export default usersRouter.getRouter();