import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../common/Spinner';

import { getSupplierOrders, receiveOrder } from '../../actions/orderActions';

class SuppDashboard extends Component{

    constructor(props){
        super(props);
        this.state = {
            menu: "1",
            selectedStatus: '',
            selectedDetails: '',
            selectedPrice: '',
            order_id: '',
            transaction_id: '',
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
        this.props.getSupplierOrders(checkData);
    }

    componentWillReceiveProps(nextProps) {
        //console.log(nextProps.order.order);
        this.props.order.order = nextProps.order.order;
    }

    onPopupClick(item) {
        console.log(item);
        this.setState(() => ({ 
            selectedStatus: item.status,
            selectedDetails: item.details,
            selectedPrice: item.price,
            order_id: item._id,
            transaction_id: item.transaction_id,
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
        this.props.getSupplierOrders(checkData);

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
        this.props.getSupplierOrders(checkData);

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
            transaction_id: this.state.transaction_id
        };
        
        this.props.receiveOrder(orderData);

    }

    render(){

        // const { user } = this.props.auth;

        var orderObj = []
        var count = 1;
        var uid = 777;

        //console.log(user);

        if(this.props.order.order){
            if(this.state.menu === "1"){
                orderObj = this.props.order.newOrder;
            }else{
                orderObj = this.props.order.order;
            }
        }

        let orderContent ;

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

        let selectedItemInfo;

        if(this.state.selectedStatus === 'Order Received'){
            selectedItemInfo = (
                <h4 style={{ marginLeft: '12px' }}>Please, Supply received orders quickly.</h4>
            );
        } else {
            selectedItemInfo = (
                <table style={{ marginBottom: '40px' }}>
                    <thead>
                        <tr className="table100-head">
                            <th className="column2">Details</th>
                            <th className="column4">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr >
                            <td className="column2">{ this.state.selectedDetails }</td>
                            <td className="column4">{ this.state.selectedPrice }</td>
                        </tr>
                        <tr >
                            <td className="column2"></td>
                            <td className="column4"></td>
                        </tr>
                    </tbody>
                </table> 
            );
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
                                        Received Order</Link></li>
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

                                <h5 style={{ marginLeft: '16px', marginBottom: '26px', marginTop: '12px' }}>
                                    Selected order </h5>

                                { selectedItemInfo }

                                <div className="container">

                                <input value="Receive Order" type="submit" className="btn btn-info btn-block mt-4" />

                                </div>
                                
                            </form>
                        </div>
                        
                    </div>
                </div>
            </div>

        )
    }
}

SuppDashboard.propTypes = {
    getSupplierOrders: PropTypes.func.isRequired,
    receiveOrder: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) =>({
    auth: state.auth,
    order: state.order
});

export default connect(mapStateToProps, { getSupplierOrders, receiveOrder })(SuppDashboard);