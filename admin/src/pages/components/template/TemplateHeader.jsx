import React from 'react'

const TemplateHeader = ({ header, more }) => {
    return (
        <div className="page-header">
            <div className="row">
                <div className="col">
                    <h3 className="page-title">{header}</h3>
                </div>
                {more}
            </div>
        </div>
    )
}

export default TemplateHeader