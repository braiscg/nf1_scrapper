
import React from 'react'


class EmpleadoRow extends React.Component {

    render() {
        return(
            <li className="media">
                <div className="media-body">
                    <h4>{this.props.name}</h4>
                    <p>
                        {this.props.title} &nbsp;
                        <span className="label label-info">{this.props.department}</span>
                    </p>
                </div>
                <hr/>
            </li>
        )
    }
}

export default EmpleadoRow