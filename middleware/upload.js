const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
destination: function (req, file, cb) {
    cb(null, "uploads/");
},
filename: function (req, file, cb) {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
}
});

const fileFilter = (req, file, cb) => {
const allowedTypes = /jpeg|jpg|png/;
const ext = allowedTypes.test(path.extname(file.originalname).toLowerCase());

if (ext) {
    cb(null, true);
} else {
    cb("Only images are allowed");
}
};

const upload = multer({
storage: storage,
fileFilter: fileFilter
});

module.exports = upload;