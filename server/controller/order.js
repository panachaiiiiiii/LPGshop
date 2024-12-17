const jwt = require("jsonwebtoken");
const prisma = require("../config/prisma");

exports.OrderProduct = async (req, res) => {
  try {
    //start token
    let Iduser;
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      return res.status(403).send("Token is required");
    }
    await jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send("Invalid or expired token");
      }
      Iduser = decoded.id;
    });
    //End token
    const { payby } = req.body;
    if (!Iduser) {
      return res.status(401).send("Invalid or expired token");
    }
    let order = await prisma.order.create({
      data: {
        sellerId: Iduser,
        PayBy: String(payby),
      },
    });
    let sum = 0;
    const { Products } = req.body;
    for (const product of Products) {
      const detail_product = await prisma.product.findFirst({
        where: { id: product.id },
      });

      if (!detail_product) {
        return res
          .status(404)
          .json({ message: `ไม่พบสินค้า ID ${product.id}` });
      }

      const OrderProduct = await prisma.productOnOrder.create({
        data: {
          orderId: order.id,
          productId: detail_product.id,
          nameAt: detail_product.name,
          priceAt: detail_product.price,
          quantity: product.count,
          costAt: detail_product.cost,
        },
      });
      const ProductupDate = await prisma.product.update({
        where: { id: product.id },
        data: { quantity: detail_product.quantity - product.count },
      });
      sum += OrderProduct.priceAt * product.count;
    }

    const updateOrder = await prisma.order.update({
      where: { id: order.id },
      data: { total: sum },
    });
    res.status(200).json({ message: "Ordered" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getorder = async (req, res) => {
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
    const { gte, le } = req.body;

    console.log(gte, "and le : " + le);
    const dataorder = await prisma.order.findMany({
      where: { createdAt: { gte: gte, lt: le } },
      include: {
        products: true,
        Users: true,
      },
    });

    res.send(dataorder);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getdetailorder = async (req, res) => {
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
    const { Orderid } = req.body;

    const dataorder = await prisma.productOnOrder.findMany({
      where: { orderId: Orderid },
    });
    res.send(dataorder);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};
