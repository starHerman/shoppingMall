import React from 'react'
import {Alert} from 'react-bootstrap'
const Message = ({variant,message}) => {
    return (
        <div>
            <Alert variant={variant}>{message}</Alert>
        </div>
    )
}
Message.defaultProps={
    variant:"info"
}

export default Message
