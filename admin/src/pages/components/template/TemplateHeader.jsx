import React from 'react'

const TemplateHeader = ({ header }) => {
    return (
        <div class="page-header">
            <div class="row">
                <div class="col-sm-12">
                    <h3 class="page-title">{header}</h3>
                </div>
            </div>
        </div>
    )
}

export default TemplateHeader