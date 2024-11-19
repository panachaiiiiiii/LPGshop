const prisma = require("../config/prisma");
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");
exports.sellitem = async (req, res) => {
  try {
    const products = req.body.products;

    dayjs.extend(utc);
    dayjs.extend(timezone);

    // เวลาปัจจุบันในเขตเวลาไทย
    const thaiTime = dayjs().tz("Asia/Bangkok").toDate();
    //console.log(dayjs(thaiTime).tz("Asia/Bangkok").format("YYYY-MM-DD HH:mm:ss"));
    const newOrder = await prisma.order.create({
      data: {
        seller: req.body.seller,
        total: req.body.total,
        createdAt: thaiTime, // บันทึกเวลาในเขตเวลาไทย
      },
    });
    let newproduct = products.map((w) => ({ ...w, orderId: newOrder.id }));

    // // ตรวจสอบว่า products มีข้อมูลหรือไม่

    // // เพิ่ม orderId ลงในแต่ละ product

    const newOrdersss = await prisma.productOnOrder.createMany({
      data: newproduct,
    });

    // ส่ง ID ของ order กลับไปยัง client
    res.status(201).json("242");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};
