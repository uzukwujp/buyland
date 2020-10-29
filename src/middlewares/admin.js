
const admin = async (req,res, next) => {
    if(req.customer.isAdmin){
        next()
    }else{
        res.status(403).json({message: "Access forbidden"})
    }
};

module.exports = admin;

