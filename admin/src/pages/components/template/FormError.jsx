import React from 'react'

const FormError = ({ error }) => {

    const getMessage = (err) => {
        if (err.type == 'required') {
            return "This field is required"
        } else if (err.type == 'maxLength') {
            return "Max length exceeded"
        } else if (err.type == 'minLength') {
            return "Input is too short"
        } else {
            return "This field is required"
        }
    }
    return (
        <>
            <span style={{
                color: 'red'
            }}>{getMessage(error)}</span>
        </>
    )
}

export default FormError