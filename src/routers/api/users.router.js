const express = require("express");
const router = express.Router();
const { UserManager } = require("./manager.mongo");

router.post("/", async (req, res) => {
  try {
    await UserManager.create(req.body);
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(`Error creating user: ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await UserManager.read({});
    res.status(200).json(users);
  } catch (error) {
    console.error(`Error fetching users: ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:uid", async (req, res) => {
  try {
    const user = await UserManager.readOne(req.params.uid);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(`Error fetching user: ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/:uid", async (req, res) => {
  try {
    await UserManager.update(req.params.uid, req.body);
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error(`Error updating user: ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:uid", async (req, res) => {
  try {
    await UserManager.destroy(req.params.uid);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(`Error deleting user: ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
