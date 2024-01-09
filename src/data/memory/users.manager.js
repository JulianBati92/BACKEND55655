const fs = require('fs');
const path = require('path');

class UsersManager {
  constructor() {
    this.filePath = './src/data/fs/files/users.json';
  }

  create(data) {
    const users = this.read();
    const newUser = {
      id: this.generateUniqueId(),
      ...data,
    };
    users.push(newUser);
    this.save(users);
    return { statusCode: 201, response: newUser };
  }

  read() {
    try {
      const data = fs.readFileSync(this.filePath, 'utf8');
      return JSON.parse(data) || [];
    } catch (error) {
      return { statusCode: 500, response: 'Internal Server Error' };
    }
  }

  readOne(id) {
    const users = this.read();
    const user = users.find((u) => u.id === id);
    if (user) {
      return { statusCode: 200, response: user };
    } else {
      return { statusCode: 404, response: 'User not found' };
    }
  }

  save(data) {
    fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2), 'utf8');
  }

  generateUniqueId() {
    return crypto.randomBytes(8).toString('hex');
  }
}

module.exports = UsersManager;
