import fs from "fs";

class UserManager {
  constructor() {
    this.path = "./src/dao/fs/files/users.json";
    this.init();
  }
  init() {
    const exists = fs.existsSync(this.path);
    if (!exists) {
      const initData = JSON.stringify([], null, 4);
      fs.writeFileSync(this.path, initData);
      console.log("File created");
    } else {
      console.log("File located");
    }
  }
  async create(data) {
    try {
      let allUsers = await fs.promises.readFile(this.path, "utf-8");
      allUsers = JSON.parse(allUsers);
      allUsers.push(data);
      allUsers = JSON.stringify(allUsers, null, 4);
      await fs.promises.writeFile(this.path, allUsers);
      return data;
    } catch (err) {
      throw err;
    }
  }
  async read(role = null) {
    try {
      let allUsers = await fs.promises.readFile(this.path, "utf-8");
      allUsers = JSON.parse(allUsers);
      if (role) {
        allUsers = allUsers.filter((each) => each.role === role);
      }
      if (allUsers.length === 0) {
        return null;
      }
      return allUsers;
    } catch (err) {
      throw err;
    }
  }
  async readByEmail(email) {
    try {
      let allUsers = await fs.promises.readFile(this.path, "utf-8");
      allUsers = JSON.parse(allUsers);
      let selected = allUsers.find((each) => each.email === email);
      return selected;
    } catch (err) {
      throw err;
    }
  }
  async paginate({ filter = {}, opts = {} }) {
    try {
      let allUsers = await fs.promises.readFile(this.path, "utf-8");
      allUsers = JSON.parse(allUsers);
      //filter
      if (filter.role) {
        allUsers = allUsers.filter((user) => user.role === filter.role);
      } // if filter exists, show me only the users that match the role
      const totalDocs = allUsers.length;
      const limit = opts.limit || 10;
      const page = opts.page || 1;
      const totalPages = Math.ceil(totalDocs / limit);
      const offset = (page - 1) * limit;
      const paginatedUsers = allUsers.slice(offset, offset + limit);
      // paginatedUsers uses slice, takes the offset as starting point, and the limit as limit... it will always return 10 users, the ones that match the paginate options.
      const paginateInfo = {
        page,
        totalPages,
        limit,
        prevPage: page > 1 ? page - 1 : null,
        nextPage: page < totalPages ? page + 1 : null,
        totalDocs,
      };
      return { docs: paginatedUsers, ...paginateInfo };
    } catch (err) {
      throw err;
    }
  }
  async readOne(id) {
    try {
      let allUsers = await fs.promises.readFile(this.path, "utf-8");
      allUsers = JSON.parse(allUsers);
      let selected = allUsers.find((each) => each._id === id);
      return selected;
    } catch (err) {
      throw err;
    }
  }
  async destroy(id) {
    try {
      let allUsers = await fs.promises.readFile(this.path, "utf-8");
      allUsers = JSON.parse(allUsers);
      let selected = allUsers.find((each) => each._id === id);
      let withoutSelected = allUsers.filter((each) => each._id !== id);
      withoutSelected = JSON.stringify(withoutSelected, null, 4);
      await fs.promises.writeFile(this.path, withoutSelected);
      return selected;
    } catch (err) {
      throw err;
    }
  }
  async update(id, data) {
    try {
      let allUsers = await this.read();
      let selected = allUsers.find((each) => each._id === id);
      for (let prop in data) {
        selected[prop] = data[prop];
      }
      allUsers = JSON.stringify(allUsers, null, 4);
      await fs.promises.writeFile(this.path, allUsers);
      return selected;
    } catch (err) {
      throw err;
    }
  }
}

const userManager = new UserManager();
export default userManager;
