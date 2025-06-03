const generateCookies = (res, name, token,maxAge) => {
  return res.cookie(name, token, {
    httpOnly: true,
    secure: false,
    sameSite:'strict',
    maxAge: maxAge,
  });
};
module.exports = generateCookies;
