const prisma = require("../config/prisma");

exports.sellitem = async (req, res) => {
  try {
    // สร้าง order ใหม่
    const newOrder = await prisma.order.create({
      data: {
        seller: req.body.seller,
        total: req.body.total,
      },
    });

    // ตรวจสอบว่า products มีข้อมูลหรือไม่
    const products = req.body.products;
    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: "Products are required" });
    }

    // เพิ่ม orderId ลงในแต่ละ product
    const newProducts = products.map((result) => ({
      ...result,
      orderId: newOrder.id, // เพิ่ม orderId จาก newOrder ที่สร้าง
    }));

    // ใช้ createMany เพื่อเพิ่มข้อมูลสินค้าหลายรายการ
    await prisma.productOnOrder.createMany({
      data: newProducts,
    });

    // ส่ง ID ของ order กลับไปยัง client
    res.status(201).json({ id: newOrder.id });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};
