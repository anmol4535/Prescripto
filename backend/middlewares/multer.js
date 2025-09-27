import multer from 'multer';


const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'uploads/'); // You need to define a destination
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});

const upload = multer({storage})

export default upload;
