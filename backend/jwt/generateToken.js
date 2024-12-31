import jwt from "jsonwebtoken";

const createTokenAndSaveCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_TOKEN, {
    expiresIn: "80D",
  });
  res.cookie("jwt", token),
    {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    };
};

export default createTokenAndSaveCookie;
