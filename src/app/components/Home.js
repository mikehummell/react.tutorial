import React from "react";
import PropTypes from 'prop-types';


export class Home extends React.Component {
    render() {
        return(
            <div>
                <p>In a new Component! </p>
                <p>You name is {this.props.name}, your ag is {this.props.age}</p>
                <p>User Object => Name: {this.props.user.name}</p>
                <div>
                    <h4>Hobbies</h4>
                    <ul>
                        {this.props.user.hobbies.map(((hobbie,i)=> <li key={i}>{hobbie}</li>))}
                    </ul>
                    <hr/>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

Home.propTypes = {
    name: PropTypes.string,
    age: PropTypes.number,
    user: PropTypes.object,
    children: PropTypes.element.isRequired
}
