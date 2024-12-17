const prisma = require("../config/prisma");
const jwt = require("jsonwebtoken");
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // เดือนจะเริ่มจาก 0
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

exports.getallitem = async (req, res) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1]; // ดึง token จาก "Authorization: Bearer <token>"
    if (!token) {
      return res.status(403).send("Token is required");
    }
    const item = await prisma.product.findMany({
      where: {
        enabled: true,
      },
      select: {
        id: true,
        barcode: true,
        enabled: true,
        name: true,
        price: true,
        quantity: true,
      },
    });
    res.send(item);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error" });
  }
};
exports.getitemadmin = async (req, res) => {
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
    //
    const item = await prisma.product.findMany({
      select: {
        id: true,
        barcode: true,
        enabled: true,
        cost: true,
        name: true,
        price: true,
        quantity: true,
      },
    });
    res.send(item);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error" });
  }
};

exports.createItem = async (req, res) => {
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
    if (role === 2) {
      const currentDate = new Date();
      const existingProduct = await prisma.product.findUnique({
        where: {
          name: req.body.name,
        },
      });

      if (existingProduct) {
        return res.status(400).json({ message: "Product name already exists" });
      }
      const createdProduct = await prisma.product.create({
        data: {
          barcode: "",
          name: req.body.name,
          price: req.body.price,
          cost: req.body.cost,
          quantity: req.body.quantity,
          enabled: true,
        },
        select: {
          id: true,
        },
      });
      await prisma.product.update({
        where: {
          id: createdProduct.id,
        },
        data: {
          barcode: String(formatDate(currentDate)) + createdProduct.id,
        },
      });
      res.status(201).json({ message: "created" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error" + err });
  }
};

exports.removeItem = async (req, res) => {
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
    await prisma.product.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(200).json({ message: "deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error" });
  }
};

exports.updateproduct = async (req, res) => {
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
    await prisma.product.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        name: req.body.name,
        price: req.body.price,
        cost: req.body.cost,
        quantity: req.body.quantity,
        enabled: req.body.enabled,
      },
    });
    res.status(200).json({ message: "Edited" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error" });
  }
};
