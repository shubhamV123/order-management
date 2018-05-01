import React, { Component } from 'react';
import { Button, Checkbox, Form, Container,Card,Input,Message } from 'semantic-ui-react'
import { Link, browserHistory } from 'react-router';
import _ from 'lodash';
import axios from 'axios';
import Alert from 'react-s-alert';

class RegisterForm extends Component{
constructor(props){
    super(props);
    this.state={
        name:'',
        email:'',
        password:'',
        errors:[],
        success:false,
        loading: false,

    }
}
isValidEmail(email)
  {
    let email_regex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/); // regex from http://emailregex.com/
    return( (email_regex.test(email))? true : false );
  }
handleSignupClick(event, data)
  {
    event.preventDefault();

    let errors = [];
    let { email, password } = this.state;

    if(_.isEmpty(password)){
      errors.push("Empty Password Field");
    }
    if(_.isEmpty(email)){
      errors.push("Empty Phone Number Field");
    }
    /* if(!this.isValidPhoneNumber(phone_number)){
      errors.push("Bad Phone number (check for spaces, '+' signs or if it is 10 numbers long)")
    } */

    if(errors.length > 0){
      this.setState({ errors })
    }
    else{
      this.signup(); // fetches details from state
    }
  }
  signup(){
      console.log("Date is",this.state);
      let errors = []
     const {name,email,password} = this.state;
     if(this.isValidEmail(email)){
     this.setState({loading: true});


        axios.post('https://order-apiv1.herokuapp.com/api/auth/register',{name,email,password})
          .then((result) => {
            //access the results here....
            console.log("result is:",result);
            this.setState({
              email:'',
              password:'',
              name:'',
              success:true
            })
            Alert.success('Successfully registered')
            this.setState({loading: false,error:[]});

          });
        }
        else{
          errors.push('Invalid email')
          this.setState({errors})
        }

  }
handleDismiss(){
  this.setState({success:false})
}
handleDetailsChange(event, data)
  {
    //console.log(data);
    switch(data.id)
    {
      case "email":
        //this.state.phone_number = data.value;
        // this.state.email = data.value;
        this.setState({email:data.value,errors:[]});
      break;

      case "password":
        // this.state.password = data.value;
        this.setState({password:data.value});
      break;

      case "name":
        // this.state.name = data.value;
        this.setState({name:data.value});
      break;
    }
   
  }
render(){
  let {  name, password,  email } = this.state;

  let fields_are_empty = ( _.isEmpty(name) || _.isEmpty(password) || _.isEmpty(email))? true : false;

    return(
       <Container fluid textAlign="center" style={{ margin: "2em", height: window.innerHeight + "px" }} >
                {/* <Card fluid  >
                    <h1 style={{textAlign:"center"}}>Welcome</h1>
                    <Card.Content >
                        <Card.Header content="Admin Login" />
                    </Card.Content>
                    <Card.Content> */}
                    <Message
                        error
                        hidden={(this.state.errors.length > 0)? false : true}
                        header="Error(s):"
                        list={this.state.errors}
                    />
                    {this.state.success? <Message
                        onDismiss={this.handleDismiss.bind(this)}
                          success
                          header='Your user registration was successful'
                          content='You may now log-in with the username you have chosen'
                        />:''}
                        <center>
                            <h1>Register</h1>
                            <Input id="name" value={this.state.name} onChange={this.handleDetailsChange.bind(this)} placeholder="Owner Name" focus icon="user circle" /><br/><br/>
                            <Input id="email" value={this.state.email} onChange={this.handleDetailsChange.bind(this)}  focus placeholder="Email" type="tel" icon="at" /> <br/><br/>
                            <Input id="password" value={this.state.password} onChange={this.handleDetailsChange.bind(this)} required focus placeholder="Password" type="password" icon="lock" /><br/><br/>

                            <Button
                        
                              content="Login"
                              color="green"
                              icon="user"
                              style={{ marginLeft: "0.5em" }}
                              labelPosition="right"
                              onClick={() => browserHistory.push("/login")}

                            />
                            <Button 
                            icon={(this.state.loading)? "spinner" : "add user"}
                            loading={this.state.loading}
                            disabled={this.state.loading || (this.state.errors.length > 0) || fields_are_empty}
                                content="Sign Up" 
                                color="blue" 
                                labelPosition="right" 
                                onClick={this.handleSignupClick.bind(this)} 

                            />
                            
                            <br />
                        </center>
                       
                   
            </Container>
    )
}
}
export default RegisterForm