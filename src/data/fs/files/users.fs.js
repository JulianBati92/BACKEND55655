const fs = require('fs');
const path = require('path');

class UsersManager {
  constructor() {
    this.filePath = './data/fs/files/users.json';
  }

  create(data) {
    const users = this.read();
    const newUser = {
      id: this.generateUniqueId(),
      ...data,
    };
    users.push(newUser);
    this.save(users);
    return newUser;
  }

  read() {
    try {
      const data = fs.readFileSync(this.filePath, 'utf8');
      return JSON.parse(data) || [];
    } catch (error) {
      return [];
    }
  }

  readOne(id) {
    const users = this.read();
    return users.find((user) => user.id === id);
  }

  destroy(id) {
    const users = this.read();
    const updatedUsers = users.filter((user) => user.id !== id);
    this.save(updatedUsers);
  }

  save(data) {
    fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2), 'utf8');
  }

  generateUniqueId() {
    const timestamp = new Date().getTime().toString(16);
    const randomString = Math.random().toString(16).substring(2);
    return `${timestamp}-${randomString}`;
  }
}

module.exports = UsersManager;
