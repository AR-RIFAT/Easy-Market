import React, { Component } from 'react'
// import {Link} from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextFieldGroup from '../common/TextFieldGroup';

import { addToCart, clearMyCart } from '../../actions/cartActions';
import { requestOrder } from '../../actions/bankActions';

class Cart extends Component {

    constructor(props){
        super(props);
        this.state = {
            bankInfo: '',
            password: '',
            admin: '999999',
            customstyle: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onPopupClick = this.onPopupClick.bind(this);
        this.onPopCloseClick = this.onPopCloseClick.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value});
      }

    onAddtoCartClick(id) {
        console.log(id);
        this.props.addToCart(id);
        console.log(this.props.cart.cart.products[0]);
    }

    onPopupClick() {
        if(this.props.auth.isAuthenticated === true){
            console.log(this.props.auth);
            this.setState(() => ({ customstyle: { display: 'block' } }));
        } else {
            this.props.history.push("/login");
        }
        
    }

    onPopCloseClick(e) {
        e.preventDefault();
        this.setState(() => ({ customstyle: { display: 'none' } }));
    }

    getTableRowData(i) {
        console.log(i);
    }

    clearCart(e){
        e.preventDefault();
        this.props.clearMyCart();
    }

    onSubmit(e){
    
        e.preventDefault();

        var products = this.props.cart.cart.products;
        var details = '';
        const productArrLength = products.length;

        products.map((item, i)=>{
            details = details + item.qty + ' x ' + item.item.title
            if(productArrLength === i+1){
                details = details + '.'
            }else{
                details = details + ', '
            }
            return '';
        })
    
        const userData = {
            bankInfo: this.state.bankInfo,
            password: this.state.password,
            price: this.props.cart.cart.totalPrice,
            admin: this.state.admin,
            details: details
        };
    
        this.props.requestOrder(userData, this.props.history);
    }

  render() {

    var productsObj = [];
    var count = 1;
    var uid = 555;

    if(this.props.cart.cart.products){
        //console.log(this.props.cart.cart.products);
        productsObj = this.props.cart.cart.products;
        //console.log('koto : '+productsObj.length);

    }

    let addedItems = productsObj.length ?
    (  
        productsObj.map(item=>{
            let table = []
            let children = []

            children.push(<td key={++uid} className="column1">{count}</td>)
            children.push(<td key={++uid} className="column2">{item.item.title}</td>)
            children.push(<td key={++uid} className="column3">{item.item.price}</td>)
            children.push(<td key={++uid} className="column4">{item.qty}</td>)
            children.push(<td key={++uid} className="column5">{item.qty * item.item.price}</td>)

            table.push(<tr key={++count} onClick={() => this.getTableRowData(item)}>{children}</tr>)

            return table
        })
    ):

     (
        <tr>
            <td>
            Your cart is Empty!
            </td>
        </tr>
     )

    return (
        
        <div className="row">
            <div className="col-md-12" style={{ marginLeft: '46%', marginBottom:'6px' }}>
                <h2>Cart</h2>
            </div>
            <button
                onClick={this.clearCart.bind(this)}
                className="btn btn-danger"
                style={{ marginLeft: '3%', marginBottom:'20px', height: '40px' }}>
                Clear Cart
            </button>
            <table>
                <thead>
                    <tr className="table100-head">
                        <th className="column1">No</th>
                        <th className="column2">Name</th>
                        <th className="column3">Price</th>
                        <th className="column4">Quantity</th>
                        <th className="column5">Total</th>
                    </tr>
                </thead>
                <tbody>
                        {addedItems}
                        <tr>
                            <th className="column1"></th>
                            <td className="column2"></td>
                            <td className="column3"></td>
                            <td className="column4"><h4>Total</h4></td>
                            <td className="column5">{this.props.cart.cart.totalPrice}</td>
                        </tr>

                </tbody>
            </table> 
            <button
                onClick={this.onPopupClick}
                className="btn btn-primary"
                style={{ marginLeft: '46%', marginBottom:'20px', marginTop:'32px', height: '46px' }}>
                Checkout & Place Order
            </button>
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
                        Provide your Bank Acount Information </h5>

                <div className="container">

                <TextFieldGroup
                    placeholder = "Bank Account No"
                    name = "bankInfo"
                    value = {this.state.bankInfo}
                    onChange = {this.onChange}
                />

                <TextFieldGroup
                    placeholder = "PIN"
                    name = "password"
                    type = "password"
                    value = {this.state.password}
                    onChange = {this.onChange}
                />

                <input value="Buy" type="submit" className="btn btn-info btn-block mt-4" />

                </div>
                    
                </form>
            </div>
            <div style={{ marginTop: '226px' }} />
        </div>
        
    )
  }
}

Cart.propTypes = {
    addToCart: PropTypes.func.isRequired,
    requestOrder: PropTypes.func.isRequired,
    clearMyCart: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) =>({
    auth: state.auth,
    cart: state.cart
});

export default connect(mapStateToProps, { addToCart, requestOrder, clearMyCart })(withRouter(Cart));

