exports.login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user) throw "User [" + username + "] doesn't exists.";

  // Compare password (NO hashing here)
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) throw "Password is incorrect.";

  // ✅ Correct env variable name
  const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET);

  res.json({
    message: "Logged in successfully!",
    token,
  });
};
