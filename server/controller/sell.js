const prisma = require("../config/prisma");

exports.sellitem = async (req, res) => {
  try {
    const products = req.body.products;

    // สร้าง order ใหม่
    const newOrder = await prisma.order.create({
      data: {
        seller: req.body.seller,
        total: req.body.total,
      },
    });
    let newproduct = products.map((w) => ({ ...w, orderId: newOrder.id }));

    // // ตรวจสอบว่า products มีข้อมูลหรือไม่

    // // เพิ่ม orderId ลงในแต่ละ product

    const newOrdersss = await prisma.productOnOrder.createMany({
      data: newproduct,
    });

    // ส่ง ID ของ order กลับไปยัง client
    res.status(201).json("sell in ordering");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};
