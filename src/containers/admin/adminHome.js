import React, { Component } from 'react';
import { Table, Input, Button, Icon } from 'semantic-ui-react';
import axios from 'axios';

class adminHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            brocolliWeight: 0,
            brocollibtn: true,
            icebergWeight: 0,
            icebergbtn: true,
            loading:false,

        }
    }
    handleInputChange(event) {
        // let onlyNumber = new RegExp("^[0-9]\d{0,9}(\.\d{1})?%?$");
        // var regex = "^[0-9]\d{0,9}(\.\d{1})?%?$", m;
        // console.log(onlyNumber.exe(event.target.value))
        // if(onlyNumber.test(event.target.value)){
        //     this.setState({brocolliWeight:event.target.value})
        // }
        this.setState({ brocolliWeight: event.target.value.replace(/\D/, '') })


    }
    increaseWeight(data) {
        let number1 = Number(this.state.brocolliWeight) + 1;
        let number2 = Number(this.state.icebergWeight) + 1

        // console.log("Number ",number);

        if (data == 'brocolli') {
            this.setState({ brocolliWeight: number1, brocollibtn: false })
        }
        if (data == 'iceberg') {
            this.setState({ icebergWeight: number2, icebergbtn: false })
        }
    }
    decrementWeight(data) {
        if (data == 'brocolli') {
            if ((this.state.brocolliWeight - 1) == 0) {
                this.setState({ brocolliWeight: 0, brocollibtn: true })
            } else {
                this.setState({ brocolliWeight: this.state.brocolliWeight - 1 })
                // console.log("data after ",this.state.brocolliWeight-1);

            }
        }
        if (data == 'iceberg') {
            if ((this.state.icebergWeight - 1) == 0) {
                this.setState({ icebergWeight: 0, icebergbtn: true })
            } else {
                this.setState({ icebergWeight: this.state.icebergWeight - 1 })
                // console.log("data after ",this.state.brocolliWeight-1);

            }
        }
        // console.log("data after ",this.state.brocolliWeight);

    }
    handleSubmit(data) {
        this.setState({loading:true})
        axios.post('https://order-apiv1.herokuapp.com/api/auth/order', data, {
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token')
            }
        })
            .then((result) => {
                //access the results here....
                // console.log("order:", result);
                alert( 'You have successfully submitted order');
                this.setState({loading:false,brocolliWeight: 0,
                    brocollibtn: true,
                    icebergWeight: 0,
                    icebergbtn: true})

            })
            .catch((err) => {
                console.log("there is somethinig error here");


            })
    }
    render() {

        let { brocolliWeight, icebergWeight } = this.state;
        let total_weight = 45 * brocolliWeight + 90 * icebergWeight;
        let final_Data = {
            brocolli_weight: brocolliWeight,
            brocolli_price: 45 * brocolliWeight,
            iceberg_weight: icebergWeight,
            iceberg_price: 90 * icebergWeight,
            email: this.props.user.email,
            name: this.props.user.name,
            total: total_weight
        };

        return (
            <div>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell />
                            <Table.HeaderCell></Table.HeaderCell>
                            <Table.HeaderCell>Price per kg</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>Customer Name</Table.Cell>
                            <Table.Cell> <Input placeholder='Search...' value={this.props.user.name} disabled /></Table.Cell>
                            <Table.Cell></Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>Brocolli</Table.Cell>
                            <Table.Cell>
                                <Button icon disabled={this.state.brocollibtn} onClick={this.decrementWeight.bind(this, 'brocolli')}>
                                    <Icon name='minus' />
                                </Button>
                                &nbsp;
                        <Input
                                    label={{ basic: true, content: 'kg' }}
                                    labelPosition='right'
                                    placeholder='Enter weight...'
                                    value={this.state.brocolliWeight}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                                &nbsp;&nbsp;
                    <Button icon onClick={this.increaseWeight.bind(this, 'brocolli')}>
                                    <Icon name='add' />
                                </Button></Table.Cell>
                            <Table.Cell>&#8377;45/kg</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>Iceberg</Table.Cell>
                            <Table.Cell>
                                <Button icon disabled={this.state.icebergbtn} onClick={this.decrementWeight.bind(this, 'iceberg')}>
                                    <Icon name='minus' />
                                </Button>
                                &nbsp;
                        <Input
                                    label={{ basic: true, content: 'kg' }}
                                    labelPosition='right'
                                    placeholder='Enter weight...'
                                    value={this.state.icebergWeight}
                                    onChange={this.handleInputChange.bind(this)}
                                />
                                &nbsp;&nbsp;
                    <Button icon onClick={this.increaseWeight.bind(this, 'iceberg')}>
                                    <Icon name='add' />
                                </Button></Table.Cell>
                            <Table.Cell>&#8377;90/kg</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>Grand Total</Table.Cell>
                            <Table.Cell>
                            </Table.Cell>
                            <Table.Cell>&#8377;{total_weight}  <Button loading={this.state.loading} animated='vertical' onClick={this.handleSubmit.bind(this, final_Data)}>
                                <Button.Content hidden>Checkout</Button.Content>
                                <Button.Content visible>
                                    <Icon name='shop' />
                                </Button.Content>
                            </Button></Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </div>
        );
    }
}

export default adminHome;