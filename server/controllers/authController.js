const { signupSchema } = require("../middlewares/validator");
const User = require("../models/userModel");
const { hash } = require("../utils/hash");

exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Walidacja
    const { error } = signupSchema.validate({ email, password }, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        success: false,
        message: "Nieprawidłowe dane wejściowe",
        details: error.details.map(d => d.message),
      });
    }

    // Normalizacja emaila
    const normalizedEmail = String(email).trim().toLowerCase();

    // Duplikat
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(409).json({ success: false, message: "User already exists!" });
    }

    // Hash hasła
    const hashedPassword = await hash(password, 12);

    // Zapis (możesz też: const user = await User.create({...}))
    const newUser = new User({ email: normalizedEmail, password: hashedPassword });
    const user = await newUser.save();

    // Odpowiedź (NA `res`, nie na `user/result`)
    return res.status(201).json({
      success: true,
      message: "Your account has been created successfully",
      user: { id: user._id, email: user.email },
    });
  } catch (err) {
    if (err && err.code === 11000) {
      return res.status(409).json({ success: false, message: "User already exists!" });
    }
    console.error(err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};
