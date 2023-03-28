import UserModel from "../db/models/User.js";

export async function getUsers(req, res) {
  try {
    const users = await UserModel.find();
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}
export async function getUser(req, res) {
  try {
    const user = await UserModel.findById(req.params.id);
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}
export async function createUser(req, res) {
  try {
    const { name, age, email } = req.body;
    if (!name || !age || !email)
      throw new Error("All required fields are not provided!");

    const alreadyUser = await UserModel.findOne({ email });
    if (alreadyUser) throw new Error(email + " already exists!");
    const user = await UserModel.create({ name, age, email });
    return res.status(201).json(user);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
}
export async function updateUser(req, res) {
  try {
    const { name, age } = req.body;
    if (!name || !age) throw new Error("All required fields are not provided!");

    const user = await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      { name, age },
      { new: true }
    );
    if (!user) throw new Error("User Not Found!");
    return res.status(202).json(user);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
}
export async function deleteUser(req, res) {
  try {
    const user = await UserModel.findOneAndDelete({ _id: req.params.id });
    if (!user) throw new Error("User Not Found!");
    return res.status(202).json({ message: "User Deleted Successfully!" });
  } catch (error) {
    return res.status(400).json({ message: err.message });
  }
}
