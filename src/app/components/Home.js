import React from "react";
import PropTypes from 'prop-types';


export class Home extends React.Component {
    constructor(props){
        super();
        this.state = {
            age: props.initalAge,
            status: 0,
            homeLink:  props.initalLinkName

        }
        setTimeout(() => {
            this.setState({
                status: 1
            });
        },3000);
        console.log("Constructor")
    }
    componentWillMount() {
        console.log("Component will mount");
    }

    componentDidMount() {
        console.log("Component did mount!");
    }

    componentWillReceiveProps(nextProps) {
        console.log("Component will receive props", nextProps)
    } 
    
    shouldComponentUpdate(nextProps, nextState) {
        console.log("Should Component update", nextProps, nextState);
        // if (nextState.status ===1){
        //     return false;
        // }
        return true;
    }

    componentWillUpdate(nextProps, nextState) {
        console.log("Component will update", nextProps, nextState);
    }

    componentDidUpdate(prepProps, prevState) {
        console.log("component did update", prepProps, prevState)
    }

    componentWillUnmount() {
        console.log("Component will unmount");
    }


    onMakeOlder() {
        this.setState({
            age: this.state.age + 3
        });  
    }

    onChangeLink() {
        this.props.changeLink(this.state.homeLink);
    }

    onHandeChange(event){
        this.setState({
            homeLink: event.target.value
        });
    }

    render() {
        return(
            <div>
                <p>In a new Component! </p>
                <p>You name is {this.props.name}, your ag is {this.state.age}</p>
                <p>Status: {this.state.status} </p>
                <hr/>
                <button onClick={this.onMakeOlder.bind(this)} className="btn btn-primary" >Make me older!</button>
                <hr/>
                <button onClick={this.props.greet}className="btn btn-primary">Greet</button>
                <hr/>
                <input type="text" value={this.state.homeLink}
                                onChange={(event)=>this.onHandeChange(event)}/>
                <button onClick={this.onChangeLink.bind(this)} className="btn btn-primary">Change Header Link</button>

            </div>
        );
    }
}

Home.propTypes = {
    name: PropTypes.string,
    initalAge: PropTypes.number,
    greet: PropTypes.func,
    initalLinkName: PropTypes.string
}
