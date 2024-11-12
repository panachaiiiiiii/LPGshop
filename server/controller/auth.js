exports.showitem = async (req, res) => {
  try {
    throw new Error("ttt")
    res.send("hi this from auth in controller");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error" });
  }
};
