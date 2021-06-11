const auth = require('basic-auth');
const bcrypt = require('bcryptjs');
const { User } = require('../models');

exports.authenticateUser = async (req, res, next) => {
  let issue = false;
  const credentials = auth(req);
  if (credentials) {
    const user = await User.findOne({
      where: { emailAddress: credentials.name },
      // filter these here as not needed ever on display
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
    if (user) {
      const authenticated = bcrypt.compareSync(credentials.pass, user.password);
      if (authenticated) {
        req.currentUser = user;
      } else {
        issue = true;
      }
    } else {
      issue = true;
    }
  } else {
    issue = true;
  }
  if (issue) {
    res.status(401).json({ message: 'Access Denied' });
  } else {
    next();
  }
};
