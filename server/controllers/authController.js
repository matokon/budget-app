const { signupSchema } = require("../middlewares/validator");
const User = require("../models/userModel");
const { hash } = require('../utils/hash');
const { compare } = require('../utils/compare');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { error } = signupSchema.validate({ email, password }, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        success: false,
        message: "Nieprawidłowe dane wejściowe",
        details: error.details.map(d => d.message),
      });
    }

    const normalizedEmail = String(email).trim().toLowerCase();

    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(409).json({ success: false, message: "User already exists!" });
    }

    const hashedPassword = await hash(password, 12);

    const newUser = new User({ email: normalizedEmail, password: hashedPassword });
    const user = await newUser.save();

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


exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required!" });
    }

    const normalizedEmail = String(email).trim().toLowerCase();

 
    const user = await User.findOne({ email: normalizedEmail }).select("+password");
    if (!user) {
      return res.status(401).json({ success: false, message: "Wrong email or password!" });
    }

    const ok = await compare(password, user.password);
    if (!ok) {
      return res.status(401).json({ success: false, message: "Wrong email or password!" });
    }

    const token = jwt.sign(
      { sub: user._id.toString(), email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    return res.status(200).json({
      success: true,
      message: "Signed in successfully",
      token,
      user: { id: user._id, email: user.email },
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.signout = async (req, res)=>{
    res
    .clearCookie('Authorization')
    .status(200)
    .json({success: true, message: "Logged out successfully"});
};

exports.sendVerificationCode = async (req, res)=>{
    const {email} = req.body;
    try{
        const existingUser = await User.findOne((email));
        if(!existingUser){
            return res
            .status(404)
            .json({success: false, message: "User does not exist!"});
        }

        if(existingUser.verified){
            return res
            .status(400)
            .json({success: false, message: "You are already verified!"});
        }
        const codeValue = Math.floor(Math.random() * 1000000).toString();
        
    }catch (error){
        console.log(error);
    }
}