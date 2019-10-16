import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import TextFieldGroup from '../common/TextFieldGroup';
import Spinner from '../common/Spinner';

import { getAllOrders, processOrder } from '../../actions/orderActions';

class AdminDashboard extends Component{

    constructor(props){
        super(props);
        this.state = {
            menu: "1",
            order_id: '',
            amount: '',
            navStyle1: {background: "#ffffff", color: "#000000"},
            navStyle2: {},
            customstyle: {}
        }
        //this.onChange = this.onChange.bind(this);
        this.onPopupClick = this.onPopupClick.bind(this);
        this.onPopCloseClick = this.onPopCloseClick.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        const checkData = {
            check: "1"
        };
        this.props.getAllOrders(checkData);
    }

    componentWillReceiveProps(nextProps) {
        //console.log(nextProps.order.order);
        this.props.order.order = nextProps.order.order;
    }

    onPopupClick(item) {
        console.log(item);
        this.setState(() => ({ 
            order_id: item._id,
            amount: item.price,
            customstyle: { display: 'block' }
        }));
    }

    onPopCloseClick(e) {
        e.preventDefault();
        this.setState(() => ({ customstyle: { display: 'none' } }));
    }

    menu1(e){
        e.preventDefault();

        const checkData = {
            check: "1"
        };
        this.props.getAllOrders(checkData);

        this.setState(() => ({
             menu: "1",
             navStyle1: {background: "#ffffff", color: "#000000"},
             navStyle2: {}
        }));
    }

    menu2(e){
        e.preventDefault();

        const checkData = {
            check: "2"
        };
        this.props.getAllOrders(checkData);

        this.setState(() => ({
            menu: "2",
            navStyle1: {},
            navStyle2: {background: "#ffffff", color: "#000000"}
       }));
    }

    onSubmit(e){
        e.preventDefault();

        const orderData = {
            order_id: this.state.order_id,
            amount: this.state.amount
        };
        
        this.props.processOrder(orderData);

    }

    render(){

        // const { user } = this.props.auth;
        const { loading } = this.props.order;

        var orderObj = []
        var count = 1;
        var uid = 777;

        //console.log(user);

        let orderContent;

        if(loading){
            orderContent = <Spinner />;
            console.log(loading)
        } else {
            if(this.props.order.order){
                if(this.state.menu === "1"){
                    orderObj = this.props.order.newOrder;
                }else{
                    orderObj = this.props.order.order;
                }
            }
        }

        let allOrders = orderObj.length ?
        (  
            orderObj.map(item=>{
                let table = []
                let children = []
    
                children.push(<td key={++uid} className="column1">{count}</td>)
                children.push(<td key={++uid} className="column3">{item.user_id}</td>)
                children.push(<td key={++uid} className="column3">Rich Computers</td>)
                children.push(<td key={++uid} className="column2">{item.details}</td>)
                children.push(<td key={++uid} className="column4">{item.price}</td>)
                children.push(<td key={++uid} className="column5">{item.status}</td>)
    
                table.push(<tr key={++count} onClick={() => this.onPopupClick(item)}>{children}</tr>)
    
                return table
            })
        ): (<div>Loading</div>)

        if(orderObj.length > 0){
            orderContent = (
                <div>
                    <table>
                        <thead>
                            <tr className="table100-head">
                                <th className="column1">Order No</th>
                                <th className="column3">Customer</th>
                                <th className="column3">Supplier</th>
                                <th className="column2">Details</th>
                                <th className="column4">Price</th>
                                <th className="column5">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allOrders}
                        </tbody>
                    </table> 
                </div>
            );
        } else{
            orderContent = <Spinner />;
        }

        return(
            <div className="dashboard">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h2 style={{ marginLeft: '40%', marginBottom:'12px' }}>Orders</h2>
                            <div className="mNav">
                                <ul>
                                    <li style={this.state.navStyle1}>
                                    <Link to="" style={{ textDecoration: 'none', color: "#000000" }} onClick={this.menu1.bind(this)} >
                                        New Order</Link></li>
                                    <li style={this.state.navStyle2}>
                                    <Link to="" style={{ textDecoration: 'none', color: "#000000" }} onClick={this.menu2.bind(this)} >
                                        Order Status</Link></li>
                                </ul>
                            </div>
                            { orderContent }
                        </div>
                        <div className="modal" id="modal-wrapper" style={this.state.customstyle}>
                            <form noValidate className="modal-content animate" onSubmit={this.onSubmit}>
                                <div className="imgcontainer">
                                <button
                                    onClick={this.onPopCloseClick}
                                    className="btn btn-danger">
                                    Back
                                </button>
                                </div>

                                <h5 style={{ marginLeft: '16px', marginBottom: '26px', marginTop: '40px' }}>
                                    Accept order and Request Supplier for confirmation</h5>

                                <div className="container">

                                <input value="Accept and Send request" type="submit" className="btn btn-info btn-block mt-4" />

                            </div>
                                
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

AdminDashboard.propTypes = {
    getAllOrders: PropTypes.func.isRequired,
    processOrder: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) =>({
    auth: state.auth,
    order: state.order
});

export default connect(mapStateToProps, { getAllOrders, processOrder })(AdminDashboard);