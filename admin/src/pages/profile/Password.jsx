import React, { useState, useEffect } from 'react'
import jwt from 'jsonwebtoken'
import { connect } from 'react-redux'
import TemplateHeader from '../components/template/TemplateHeader.jsx'
import FormError from '../components/template/FormError.jsx'
import { useForm } from 'react-hook-form'
import { show_error, show_success } from '../../redux/actions/SnackbarActions.js'
import { change_password } from '../../redux/actions/ProfileActions.js'
import { hide_progress, show_progress } from '../../redux/actions/ProgressAction.js'

const Password = (props) => {

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm()

    const [profileDetails, setProfileDetails] = useState([])

    useEffect(() => {
        setProfileDetails(jwt.decode(localStorage.getItem('jsonwebtoken')))
    }, [])

    const changePassword = async (data) => {
        if (data.newPassword !== data.confirmPassword) {
            props.show_error({
                message: "Passwords doesn't match"
            })
        } else {
            props.show_progress()
            try {
                const result = await props.change_password({
                    email: profileDetails.email,
                    old_password: data.currentPassword,
                    new_password: data.confirmPassword
                })
                if (result.status == 200) {
                    props.show_success({
                        message: result.data.message
                    })
                } else {
                    props.show_error({
                        message: result.data.message
                    })
                }
            } catch (err) {
                props.show_error({
                    message: err.response.data.message
                })
            }
            props.hide_progress()
        }
    }


    return (
        <>
            <TemplateHeader header="Profile" />
            <div className="card rounded">
                <div className="card-body profile-menu">
                    <ul className="nav nav-tabs nav-tabs-solid" role="tablist">
                        <li className="nav-item home_tab">
                            <a className="nav-link active" data-toggle="tab" href="#profile_settings" role="tab" aria-selected="false">
                                Profile Settings
							</a>
                        </li>
                        <li className="nav-item home_add">
                            <a className="nav-link" data-toggle="tab" href="#change_password" role="tab" aria-selected="false">
                                Change password
							</a>
                        </li>
                    </ul>
                    <div className="tab-content">
                        <div className="tab-pane fade show active" id="profile_settings" role="tabpanel">
                            <form>
                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" className="form-control" value={profileDetails.name} disabled />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="text" className="form-control" value={profileDetails.email} disabled />
                                </div>
                                <div className="form-group">
                                    <label>Member since</label>
                                    <input type="text" className="form-control" value={profileDetails.joined} disabled />
                                </div>
                            </form>
                        </div>
                        <div className="tab-pane fade" id="change_password" role="tabpanel">
                            <form onSubmit={handleSubmit(changePassword)}>
                                <div className="form-group">
                                    <label>Current Password</label>
                                    <input type="password" {...register('currentPassword', { required: true })} className="form-control" />
                                    {errors.currentPassword && <FormError error={errors.currentPassword} />}
                                </div>
                                <div className="form-group">
                                    <label>New Password</label>
                                    <input type="password" {...register('newPassword', { required: true, minLength: 6 })} className="form-control" />
                                    {errors.newPassword && <FormError error={errors.newPassword} />}
                                </div>
                                <div className="form-group">
                                    <label>Confirm Password</label>
                                    <input type="password" {...register('confirmPassword', { required: true, minLength: 6 })} className="form-control" />
                                    {errors.confirmPassword && <FormError error={errors.confirmPassword} />}
                                </div>
                                <div className="mt-4 save-form">
                                    <button className="btn save-btn btn-primary" type="submit">Save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const MapDispatchToProps = (dispatch) => {
    return {
        show_error: (payload) => dispatch(show_error(payload)),
        show_success: (payload) => dispatch(show_success(payload)),
        change_password: (payload) => dispatch(change_password(payload)),
        show_progress: () => dispatch(show_progress()),
        hide_progress: () => dispatch(hide_progress()),
    }
}

export default connect(null, MapDispatchToProps)(Password)