import jwt from 'jsonwebtoken'

export const AdminMiddleware = (req, res, next) => {
    next()
    // let token = req.headers.authorization || false
    // if (!token) { req.admin = undefined }
    // jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
    //     if (err) throw req.admin = undefined
    //     req.admin = decoded
    //     next()
    // })
}

export const adminLoginRequired = async (req, res, next) => {
    if (req.admin) {
        next()
    } else {
        return res.status(401).json({ message: 'Unauthorized user!!' })
    }
}

export const adminProfile = async (req, res, next) => {
    if (req.admin) {
        res.send(req.admin)
        next()
    } else {
        return res.status(401).json({ message: 'Unauthorized user!!' })
    }
}