import React, { Component } from 'react';
import { Button, Checkbox, Form, Container,Card,Input,Message } from 'semantic-ui-react'
import { Link, browserHistory } from 'react-router';
import _ from 'lodash';
import axios from 'axios';

class LoginForm extends Component{
constructor(props){
    super(props);
    this.state={
        loading:false,
        disable:false,
        email:'',
        password:'',
        errors: []
    }
}
handleEmailChange(event, data){
    this.setState({errors:[]})
this.setState({email:data.value})
}
handlePasswordChange(event, data){
    this.setState({errors:[]})
    this.setState({password:data.value})

}
handleLoginClick(event, data)
  {
    event.preventDefault();

    let errors = [];
    let { email, password } = this.state;

    if(_.isEmpty(password)){
      errors.push("Empty Password Field");
    }
    if(_.isEmpty(email)){
      errors.push("Empty Email Field");
    }
    /* if(!this.isValidPhoneNumber(phone_number)){
      errors.push("Bad Phone number (check for spaces, '+' signs or if it is 10 numbers long)")
    } */

    if(errors.length > 0){
      this.setState({ errors })
    }
    else{
      this.login(); // fetches details from state
    }
  }

  login()
  {
    let errors = [];
    const {email,password} = this.state;
    console.log("state is",this.state)    
    this.setState({loading: true});
    
    console.log("logging in...");
    axios.post('https://order-apiv1.herokuapp.com/api/auth/login',{email,password},{
        headers: {
            'Content-Type': 'application/json',
        }
    })
          .then((result) => {
            //access the results here....
            console.log("result is:",result);
            if(result.data.token==null){
                alert('Incorrenct password')
            }
            localStorage.setItem('token',result.data.token);
            // localStorage.setItem('name',result.data.name);

            browserHistory.push('/admin')
            this.setState({loading: false,error:[]});

          })
          .catch((err) => {
              errors.push("Please check email id or password");
              this.setState({loading: false,errors:errors});

          })
   
    
  }
render(){
    return(
       <Container fluid textAlign="center" style={{ margin: "2em", height: window.innerHeight + "px" }} >
                {/* <Card fluid  >
                    <h1 style={{textAlign:"center"}}>Welcome</h1>
                    <Card.Content >
                        <Card.Header content="Admin Login" />
                    </Card.Content>
                    <Card.Content> */}
                    {/* <Message
                        error
                        hidden={(this.state.errors.length > 0)? false : true}
                        header="Error(s):"
                        list={this.state.errors}
                    /> */}
                        <center>
                        <Message
                            error
                            hidden={(this.state.errors.length > 0)? false : true}
                            header="Error(s):"
                            list={this.state.errors}
                        />
                            <h1>Login</h1>
                            <Input onChange={this.handleEmailChange.bind(this)} focus placeholder="Email" type="tel" icon="at" /> <br /><br />
                            <Input onChange={this.handlePasswordChange.bind(this)} required focus placeholder="Password" type="password" icon="lock" /><br /><br />
                            <Button
                                content="Sign Up"
                                color="blue"
                                icon="add user"
                                labelPosition="right"
                                style={{ marginRight: "0.5em" }}
                                onClick={() => browserHistory.push("/register")}
                            />

                            <Button
                                icon={(this.state.loading)? "spinner" : "user"}
                                loading={this.state.loading}
                                disabled={this.state.loading}
                                content="Login"
                                color="green"
                                style={{ marginLeft: "0.5em" }}
                                labelPosition="right"
                                onClick={this.handleLoginClick.bind(this)} 

                            />
                            <br />
                        </center>
                   
            </Container>
    )
}
}
export default LoginForm