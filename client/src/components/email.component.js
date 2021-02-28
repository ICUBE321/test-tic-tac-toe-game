
//Emailjs used as notification service

import React, { Component } from 'react';
import emailjs from 'emailjs-com';

export default class Email extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            email: Email,
        };

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

    handleUsernameChange(event) {
        this.setState({username: event.target.value})
    }

    handleEmailChange(event) {
        this.setState({email: event.target.value})
    }

    handleSubmit(event) {
        event.preventDefault();

        const urlParams = new URLSearchParams(window.location.search);
        const message = urlParams.get('PlayerX') + " was X. " + urlParams.get('PlayerO') + " was O. And " + urlParams.get('Winner') + " won the game.";
  
        console.log('Message: ' + message);
        //console.log('Message from state: ' + this.state.message);

        this.sendFeedback({user_name: this.state.username, user_email: this.state.email, message: message});
    }

    handleCancel() {
        window.location = '/';
    }

    sendFeedback(variables) {
        window.emailjs.send(
            'contact_service', 'contact_form',
            variables
        ).then(res => {
            console.log("Email successfully sent!")
        })
        //handle errors
        .catch(error => console.error("This occurred: ", error));
        this.handleCancel();
    }
}