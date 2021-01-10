import React from 'react'
import {Spinner} from 'react-bootstrap'
const Loader = () => {
    return (
        <div>
            <Spinner animation="border" role="status" style={{display:"block",width:"100px",height:"100px",margin:"auto"}}>
                <span className="sr-only"> Loading...</span>
            </Spinner>
        </div>
    )
}

export default Loader
