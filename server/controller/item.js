exports.showitem = async (req, res) => {
  try {
    res.send("hi this from showitem in controller");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error" });
  }
};

exports.remove = async (req, res) => {
  try {
    console.log(req.params.id);
    res.send("hi this from remove in controller");
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



