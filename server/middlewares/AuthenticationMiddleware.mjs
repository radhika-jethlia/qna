import jwt from 'jsonwebtoken'

export const AdminMiddleware = async (req, res, next) => {
    let token = await req.headers.authorization
    if (!token) {
        req.admin = undefined
        next()
    } else {
        jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
            if (err) {
                req.admin = undefined
                next()
            } else {
                req.admin = decoded
                next()
            }
        })
    }
}

export const adminLoginRequired = async (req, res, next) => {
    if (req.admin) {
        next()
    } else {
        res.status(401).json({ message: 'Unauthorized user!!' })
    }
}

export const adminProfile = async (req, res, next) => {
    if (req.admin) {
        // res.send(req.admin)
        next()
    } else {
        res.status(401).json({ message: 'Unauthorized user!!' })
    }
}