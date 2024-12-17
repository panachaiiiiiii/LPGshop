const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const prisma = require("../config/prisma");
const { response } = require("express");

exports.AuthMe = async (req, res) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1]; // ดึง token จาก "Authorization: Bearer <token>"
    if (!token) {
      return res.status(403).send("Token is required");
    }

    // ตรวจสอบ token
    jwt.verify(token, process.env.SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).send("Invalid or expired token");
      }
      // ถ้า token ถูกต้อง, decoded จะเป็นข้อมูลที่ได้จาก JWT payload
      // res.send(decoded);
      const user = await prisma.users.findFirst({
        where: {
          id: decoded.id,
        },
        select: {
          id: true,
          nickName: true,
          role: true,
        },
      });
      res.send(user);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.PostLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username) {
      return res.status(400).json({ message: "username is wrong" });
    }
    if (!password) {
      return res.status(400).json({ message: "password is wrong" });
    }
    const user = await prisma.users.findFirst({
      where: {
        username: username,
      },
    });

    if (!user || !user.enabled) {
      return res.status(400).json({ message: "กรอก username ไม่ถูกต้อง" });
    }
    //Password
    const iMatch = await bcrypt.compare(password, user.password);
    if (!iMatch) {
      return res.status(400).json({ message: "กรอก Password ไม่ถูกต้อง" });
    }
    const payload = {
      id: user.id,
    };
    //Token
    jwt.sign(payload, process.env.SECRET, { expiresIn: "7d" }, (err, token) => {
      if (err) {
        return res.status(500).json({ message: "server err" + err });
      }

      res.json({ payload, token });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.PostRegister = async (req, res) => {
  try {
    let Iduser = 0;
    const token = req.headers["authorization"]?.split(" ")[1]; // ดึง token จาก "Authorization: Bearer <token>"
    if (!token) {
      return res.status(403).send("Token is required");
    }
    await jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send("Invalid or expired token");
      }
      Iduser = decoded.id;
    });
    const myuser = await prisma.users.findFirst({ where: { id: Iduser } });
    if (myuser.role != 2) {
      return res.status(400).send("You do not have access rights.");
    }
    const { username, password, nickname, roles } = req.body;
    console.log(req.body);
    if (!username) {
      return res.status(400).json({ message: "username is wrong" });
    }
    if (!password) {
      return res.status(400).json({ message: "password is wrong" });
    }
    const User = await prisma.users.findFirst({
      where: { username: username },
    });
    if (User) {
      return res.status(401).json({ message: "Username ซ้ำ" });
    }
    const hashPassword = await bcrypt.hash(password, 7);
    await prisma.users.create({
      data: {
        nickName: nickname,
        username: username,
        password: hashPassword,
        role: roles,
      },
    });
    res.status(201).json({ message: "User ถูกสร้างเเล้ว" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.EditUser = async (req, res) => {
  try {
    let Iduser = 0;
    const { password, nickname, role, username } = req.body;
    const token = req.headers["authorization"]?.split(" ")[1]; // ดึง token จาก "Authorization: Bearer <token>"
    if (!token) {
      return res.status(403).send("Token is required");
    }
    await jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send("Invalid or expired token");
      }
      Iduser = decoded.id;
    });
    const myuser = await prisma.users.findFirst({ where: { id: Iduser } });
    if (myuser.role != 2) {
      return res.status(400).send("You do not have access rights.");
    }
    if (Iduser === Number(req.params.id)) {
      return res.status(405).send("ไม่สามารถแก้ไขตัวเองได้");
    }

    if (password) {
      const hashPassword = await bcrypt.hash(password, 7);
      await prisma.users.update({
        where: {
          id: Number(req.params.id),
        },
        data: {
          role: role,
          nickName: nickname,
          username: username,
          password: hashPassword,
        },
      });
    } else {
      await prisma.users.update({
        where: {
          id: Number(req.params.id),
        },
        data: {
          role: role,
          nickName: nickname,
          username: username,
        },
      });
    }

    res.status(200).json({ message: "Edited" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.EditUserself = async (req, res) => {
  try {
    let IdUser = 0;
    const token = req.headers["authorization"]?.split(" ")[1]; // ดึง token จาก "Authorization: Bearer <token>"
    if (!token) {
      return res.status(403).send("Token is required");
    }
    await jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send("Invalid or expired token");
      }
      IdUser = decoded.id;
    });

    await prisma.users.update({
      where: {
        id: IdUser,
      },
      data: {
        nickName: req.body.nickName,
      },
    });
    res.status(200).json({ message: "Edited" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};
exports.EditUserselfPassword = async (req, res) => {
  try {
    let IdUser;
    const token = req.headers["authorization"]?.split(" ")[1]; // ดึง token จาก "Authorization: Bearer <token>"
    if (!token) {
      return res.status(403).send("Token is required");
    }
    await jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send("Invalid or expired token");
      }
      IdUser = decoded.id;
    });
    const { oldPassword, newPassword } = req.body;
    console.log(oldPassword, newPassword);
    if (oldPassword) {
      const hashPassword = await bcrypt.hash(newPassword, 7);
      const user = await prisma.users.findFirst({
        where: {
          id: Number(IdUser),
        },
        select: { password: true },
      });
      const iMatch = await bcrypt.compare(oldPassword, user.password);
      if (!iMatch) {
        return res.status(400).json({ message: "Password ไม่ถูกต้อง" });
      }
      await prisma.users.update({
        where: {
          id: IdUser,
        },
        data: {
          password: hashPassword,
        },
      });
      res.status(200).json({ message: "Edited" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.GetProfile = async (req, res) => {
  try {
    let IdUser = 0;
    const token = req.headers["authorization"]?.split(" ")[1]; // ดึง token จาก "Authorization: Bearer <token>"
    if (!token) {
      return res.status(403).send("Token is required");
    }
    await jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send("Invalid or expired token");
      }
      IdUser = decoded.id;
    });

    const data = await prisma.users.findFirst({
      where: {
        id: IdUser,
      },
      select: { nickName: true, username: true, role: true },
    });
    res.status(200).send(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};
exports.DELuser = async (req, res) => {
  try {
    let Iduser;
    const token = req.headers["authorization"]?.split(" ")[1]; // ดึง token จาก "Authorization: Bearer <token>"
    if (!token) {
      return res.status(403).send("Token is required");
    }
    await jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send("Invalid or expired token");
      }
      Iduser = decoded.id;
    });
    const myusers = await prisma.users.findFirst({
      where: { id: Number(Iduser) },
      select: { id: true, role: true },
    });
    if (myusers.role != 2) {
      return res.status(400).send("You do not have access rights.");
    }
    if (Iduser === Number(req.params.id)) {
      return res.status(402).send("ลบตัวเองไม่ได้");
    }
    await prisma.users.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(200).json({ message: "deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.Alluser = async (req, res) => {
  try {
    let Iduser = 0;
    const token = req.headers["authorization"]?.split(" ")[1]; // ดึง token จาก "Authorization: Bearer <token>"
    if (!token) {
      return res.status(403).send("Token is required");
    }
    await jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send("Invalid or expired token");
      }
      Iduser = decoded.id;
    });
    const user = await prisma.users.findFirst({
      where: {
        id: Iduser,
      },
    });
    if (user.role != 2) {
      return res.status(400).send("You do not have access rights.");
    }
    const item = await prisma.users.findMany({
      select: {
        id: true,
        enabled: true,
        nickName: true,
        username: true,
        role: true,
        createdAt: true,
      },
    });
    res.send(item);
  } catch (err) {}
};

exports.EditUserEnabled = async (req, res) => {
  try {
    let IDuser;
    const token = req.headers["authorization"]?.split(" ")[1]; // ดึง token จาก "Authorization: Bearer <token>"
    if (!token) {
      return res.status(403).send("Token is required");
    }
    await jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send("Invalid or expired token");
      }
      IDuser = decoded.id;
    });
    const myuser = await prisma.users.findFirst({ where: { id: IDuser } });
    if (myuser.role != 2) {
      return res.status(400).send("You do not have access rights.");
    }
    if (IDuser === Number(req.params.id)) {
      return res.status(405).send("ไม่สามารถปิดใช้งานตัวเองได้");
    }
    await prisma.users.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        enabled: req.body.enabled,
      },
    });
    res.status(200).json({ message: "Edited" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};
