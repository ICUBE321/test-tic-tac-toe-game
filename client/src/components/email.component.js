
//Emailjs used as notification service

import React, { Component } from 'react';
import emailjs, { init } from 'emailjs-com';
//initialize using my emailjs user ID
init("user_v9B5gRcVDJoDmGqGthBR6");

export default class Email extends Component {
    constructor(props) {
        super(props);

        //define state with username and email
        this.state = {
            username: "",
            email: Email,
        };

        //bind the functions to use correct this context
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.sendFeedback = this.sendFeedback.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    render () {
        return (
            <form>
                <label>Username</label>
                <input type="text" onChange={this.handleUsernameChange} required value={this.state.username}/>
                <label>Email</label>
                <input type="email" onChange={this.handleEmailChange} required value={this.state.email}/>
                <input type="button" value="Send" className="btn btn-primary" onClick={this.handleSubmit}/>
                <input type="button" value="Cancel" className="btn btn-cancel" onClick={this.handleCancel}/>
            </form>
        )
    }

    //handle change in inputs
    handleUsernameChange(event) {
        //set the username in the state as the input value
        this.setState({username: event.target.value})
    }

    handleEmailChange(event) {
        this.setState({email: event.target.value})
    }

    //handle submitting 
    handleSubmit(event) {
        event.preventDefault();

        //get game log details from url
        const urlParams = new URLSearchParams(window.location.search);
        //compose email message using the details
        const message = urlParams.get('PlayerX') + " was X. " + urlParams.get('PlayerO') + " was O. And " + urlParams.get('Winner') + " won the game.";
  
        console.log('Message: ' + message);
        //console.log('Message from state: ' + this.state.message);
        //validate submit
        if(this.state.username.trim().length < 1 || this.state.username === null || this.state.email == null || (Object.keys(this.state.email).length === 0 && this.state.email.constructor === Object)) {
            window.alert("Please fill in the required information to send!");
        } else {
            this.sendFeedback({user_name: this.state.username, user_email: this.state.email, message: message});
        }
    }

    //redirect user to homepage 
    handleCancel() {
        window.location = '/';
    }

    //connect and send email using Emailjs
    sendFeedback(variables) {
        emailjs.send('contact_service', 'contact_form', variables)
        .then(res => {
            console.log("Email successfully sent!", res.status, res.text);
            window.alert("Email successfully sent!");
            this.handleCancel();
        })
        //handle errors
        .catch(error => {
            console.error("This occurred: ", error);
            window.alert("Email not sent!");
            this.handleCancel();
        });

        //this.handleCancel();
    }
}