const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");
const { v4: uuidv4 } = require('uuid');

const userLogin = async (req, res) => {
  const { email, password,role } = req.body;
  const [users] = await db.execute("SELECT * FROM users WHERE email = ?", [
    email,
  ]);

  if (users.length === 0)
    return res.status(400).json({ message: "User not found" });

  const user = users[0];
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user.id, role: "USER" }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  res.json({ token, user,role });
};

const providerLogin = async (req, res) => {
  const { email, password ,role} = req.body;
  const [providers] = await db.execute(
    "SELECT * FROM providers WHERE email = ?",
    [email]
  );

  if (providers.length === 0)
    return res.status(400).json({ message: "Provider not found" });

  const provider = providers[0];
  const isMatch = await bcrypt.compare(password, provider.password);

  if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: provider.id, role: "PROVIDER" }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  res.json({ token, provider,role });
};

const userSignUp = async (req, res) => {
  try {
    const { name, email, password, phone_no, dob, aadhar_card } = req.body;

    // Check if user already exists
    const [existing] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);

    if (existing.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = uuidv4();

    // Insert user into database
    await db.execute(
      "INSERT INTO users (id, name, email, password, phone_no, dob, aadhar_card) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [userId, name, email, hashedPassword, phone_no, dob, aadhar_card]
    );

    // Create JWT token
    const token = jwt.sign(
      { id: userId, role: "USER" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({
      token,
      user: { id: userId, name, email, role: "USER" },
    });
  } catch (error) {
    console.error("User Signup Error:", error);
    res.status(500).json({ message: "Server error during user signup" });
  }
};

const providerSignUp = async (req, res) => {
  try {
    const { name, email, password, provider_type, contact_number, gst_number, train_name, train_number, station_name } = req.body;

    const [existing] = await db.execute("SELECT * FROM providers WHERE email = ?", [email]);
    if (existing.length > 0) return res.status(400).json({ message: "Provider already exists" });

    const providerId = uuidv4();
    // Validate required fields based on provider_type
    if (provider_type === "Train_Service" && (!train_name || !train_number)) {
      return res.status(400).json({ message: "Train name and number required for Train_Service" });
    }

    if (provider_type === "Station_Vendor" && !station_name) {
      return res.status(400).json({ message: "Station name required for Station_Vendor" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.execute(
      `INSERT INTO providers 
        (id, name, email, password, provider_type, contact_number, gst_number, train_name, train_number, station_name)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?)`,
      [providerId, name, email, hashedPassword, provider_type, contact_number, gst_number, train_name || null, train_number || null, station_name || null]
    );

    const token = jwt.sign({ id: providerId, role: "PROVIDER" }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.status(201).json({
      token,
      provider: {
        id: providerId,
        name,
        email,
        role: "PROVIDER",
        provider_type,
        contact_number,
        gst_number,
        train_name,
        train_number,
        station_name
      }
    });
  } catch (error) {
    console.error("Provider Signup Error:", error);
    res.status(500).json({ message: "Server error during provider signup" });
  }
};

module.exports = { userLogin, providerLogin, userSignUp, providerSignUp };