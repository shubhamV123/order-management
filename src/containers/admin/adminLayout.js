import React, { Component } from 'react'
import { Card, Image, Grid, Responsive, Button, Modal, Label, Icon, Menu } from 'semantic-ui-react';
import { Link, browserHistory } from 'react-router';
import axios from 'axios';

export default class adminLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: ''
        }
    }
    handleLogout() {
        localStorage.clear('token');
        localStorage.clear('name');
        browserHistory.push('/')

    }

    componentWillMount() {
        let token = localStorage.getItem('token');
        //  let name = localStorage.getItem('name');
        //  this.setState({name})
        if (!token) {
            browserHistory.push('/')
        }
    }
    componentDidMount() {
        axios.get('https://order-apiv1.herokuapp.com/api/auth/me', {
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token')
            }
        })
            .then((result) => {
                //access the results here....
                this.setState({ user: result.data })


            })
            .catch((err) => {
                console.log("there is somethinig error here");


            })
    }

    render() {
        return (
            <div>
                Welcome <h1>{this.state.user.name}
                    <div style={{ float: 'right' }}><Button onClick={this.handleLogout.bind(this)}>Logout</Button></div></h1>
                <Card.Content style={{ boxShadow: 'rgb(220,220,220) 0 0 8px inset', backgroundColor: '#f7f7f7', padding: '20px' }} >
                    {React.cloneElement(this.props.children, { user: this.state.user })}
                </Card.Content>
            </div>
        )
    }
}
