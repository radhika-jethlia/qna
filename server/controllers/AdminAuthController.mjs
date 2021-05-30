import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import AdminAuthModel from '../models/AdminAuthModel.mjs'

export const AdminLogin = async (req, res, next) => {
    await AdminAuthModel.findOne({
        email: req.body.email
    }, (err, admin) => {
        if (err) return res.status(500).json({
            message: "An error occured",
            err
        })
        if (!admin) return res.status(401).json({
            message: "Invalid Email"
        })
        if (!bcrypt.compareSync(req.body.password, admin.password, 10)) return res.status(401).json({
            message: "Invalid Password"
        })
        if (!admin.is_active) return res.status(200).json({
            message: "Account not active"
        })
        return res.status(200).json({
            token: jwt.sign({
                email: admin.email,
                name: admin.name,
                joined: admin.added_on,
                is_active: admin.is_active
            },
                process.env.JWT_KEY,
                {
                    expiresIn: "1h"
                })
        })
    })
}

export const AdminSignUp = async (req, res, next) => {
    let newAdmin = new AdminAuthModel(req.body)
    newAdmin.password = bcrypt.hashSync(req.body.password, 10)
    newAdmin.save(function (err, user) {
        if (err) {
            return res.status(400).send({
                message: err
            })
        } else {
            user.password = undefined;
            return res.status(200).json({
                message: "Admin added successfully",
                user
            });
        }
    })
}

export const changePasswordAdmin = async (req, res, next) => {
    await AdminAuthModel.findOne({
        email: req.body.email
    }, async (err, admin) => {
        if (err) res.status(500).json({
            message: 'Something went wrong',
            err
        })
        if (!admin) return res.status(401).json({
            message: "Invalid Email"
        })
        if (!bcrypt.compareSync(req.body.old_password, admin.password, 10))
            return res
                .status(401)
                .json({
                    message: "Invalid Password"
                })
        try {
            const result = await AdminAuthModel.updateOne(
                { email: req.body.email },
                {
                    $set: {
                        password: bcrypt.hashSync(req.body.new_password, 10)
                    }
                }
            )
            res.status(200).json({
                message: 'Password updated',
                result
            })
        } catch (err) {
            res.status(401).json({
                message: "An error occured",
                err
            })
        }
    })
}