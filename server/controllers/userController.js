exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check input
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required" });
    }

    // Find user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: `User [${username}] doesn't exist` });
    }

    // Compare password (correct way)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Password is incorrect" });
    }

    // Check JWT secret
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is missing in environment variables");
      return res.status(500).json({ error: "Server configuration error (JWT_SECRET missing)" });
    }

    // Generate token
    const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET);

    // Success
    res.json({
      message: "Logged in successfully!",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });

  } catch (err) {
    console.error("🔥 LOGIN ERROR:", err);
    res.status(500).json({
      error: "Internal Server Error during login",
      detail: err.toString()
    });
  }
};
