const prisma = require("../config/prisma");
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // เดือนจะเริ่มจาก 0
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

exports.showitem = async (req, res) => {
  try {
    const item = await prisma.product.findMany({
      select: {
        id: true,
        barcode: true,
        enabled: true,
        name: true,
        price: true,
        quantity: true,
      },
    });
    console.log(item);

    res.send(item);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error" });
  }
};
exports.showitemadmin = async (req, res) => {
  try {
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
    console.log(item);

    res.send(item);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error" });
  }
};

exports.create = async (req, res) => {
  try {
    const currentDate = new Date();

    const existingProduct = await prisma.product.findUnique({
      where: {
        name: req.body.name, // ชื่อที่ต้องการตรวจสอบ
      },
    });

    if (existingProduct) {
      return res.status(400).json({ message: "Product name already exists" });
    }
    let lastid = await prisma.product.findFirst({ orderBy: { id: "desc" } });
    if (lastid === null || lastid === undefined) {
      lastid = { id: 0 };
    }
    // String(formatDate(currentDate)) + String(lastid.id + 1)
    await prisma.product.create({
      data: {
        barcode: String(formatDate(currentDate)) + String(lastid.id + 1),
        name: req.body.name,
        price: req.body.price,
        cost: req.body.cost,
        quantity: req.body.quantity,
        enabled: true,
      },
    });
    res.status(202).json({ message: "created" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error" });
  }
};

exports.remove = async (req, res) => {
  try {
    console.log(req.params.id);
    await prisma.product.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(201).json({ message: "deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error" });
  }
};

exports.edit = async (req, res) => {
  try {
    console.log(req.params.id);
    res.send("hi this from remove in controller");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error" });
  }
};
