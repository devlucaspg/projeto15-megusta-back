import {
  sessionsCollection,
  usersCollection,
  rootUsersCollection,
} from "../database/db.js";

export async function authValidation(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) {
    console.log("AuthValidation");
    return res.sendStatus(401);
  }

  try {
    const session = await sessionsCollection.findOne({ token });
    const user = await usersCollection.findOne({ _id: session?.userId });
    const rootUser = await rootUsersCollection.findOne({
      _id: session?.userId,
    });

    if (!user && !rootUser) {
      return res.sendStatus(401);
    }

    res.locals.user = user?._id;
    res.locals.rootUser = rootUser?._id;
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }

  next();
}
