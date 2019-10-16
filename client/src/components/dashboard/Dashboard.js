import React, { Component } from 'react'
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateBankInfo } from '../../actions/authActions';
import { createBankInfo } from '../../actions/bankActions';
import { getOrder } from '../../actions/orderActions';
import Spinner from '../common/Spinner';
import TextFieldGroup from '../common/TextFieldGroup';

class Dashboard extends Component {

    constructor() {
        super();
        this.state = {
          bankInfo: '',
          password: '',
          order: {},
          balance: '',
          customstyle: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
      }

      componentDidMount() {
        this.props.getOrder();
      }

      componentWillReceiveProps(nextProps) {
        console.log(nextProps.order.order);
        this.props.order.order = nextProps.order.order;
      }

      onChange(e){
        this.setState({[e.target.name]: e.target.value});
      }

      onSubmit(e){
    
        e.preventDefault();
    
        const userData = {
            bankInfo: this.state.bankInfo,
            password: this.state.password,
        };
    
        this.props.updateBankInfo(userData, this.props.history);
        this.props.createBankInfo(userData);
      }

    render() {

        const { user } = this.props.auth;
        const { loading } = this.props.order;

        console.log(user);

        var orderObj = []
        var count = 1;
        var uid = 777;

        if(this.props.order.order){
            orderObj = this.props.order.order;
        }

        let orderContent;

        let allOrders = orderObj.length ?
        (  
            orderObj.map(item=>{
                let table = []
                let children = []
    
                children.push(<td key={++uid} className="column1">{count}</td>)
                children.push(<td key={++uid} className="column3">Rich Computers</td>)
                children.push(<td key={++uid} className="column2">{item.details}</td>)
                children.push(<td key={++uid} className="column4">{item.price}</td>)
                children.push(<td key={++uid} className="column5">{item.status}</td>)
    
                table.push(<tr key={++count} onClick={() => this.getTableRowData(item)}>{children}</tr>)
    
                return table
            })
        ): (<div>Loading</div>)

        if(orderObj.length > 0){
            orderContent = (
                <div>
                    <h4> My Orders </h4>
                    <table>
                        <thead>
                            <tr className="table100-head">
                                <th className="column1">Order No</th>
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
            orderContent = (
                <div>
                    <h4> My Orders </h4>
                    <h6>You have no orders</h6>
                </div>
            );
        }

        let dashboardContent;

        if(loading){
            dashboardContent = <Spinner />;
        } else {
            if(user.bankAccNo === null){
                dashboardContent = (
                    <div style={{ margin: '26px 200px 162px 200px' }}>
                    <h5>Please provide your Bank account Information</h5>
                    <form noValidate onSubmit={this.onSubmit}>
    
                        <TextFieldGroup
                        placeholder = "Bank Account No."
                        name = "bankInfo"
                        value = {this.state.bankInfo}
                        onChange = {this.onChange}
                        />
    
                        <TextFieldGroup
                        placeholder="PIN"
                        name="password"
                        type="password"
                        value={this.state.password}
                        onChange={this.onChange}
                        />
    
                        <input value="Submit" type="submit" className="btn btn-info btn-block mt-4" />
                    </form>
                </div>
                );
            } else {
                dashboardContent = (
                    <div>
                        { orderContent }
                    </div>
                );
            }
        }

        return (
            <div className="dashboard">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h2 style={{ marginLeft: '40%', marginBottom:'12px' }}>Dashboard</h2>
                            { dashboardContent }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Dashboard.propTypes = {
    updateBankInfo: PropTypes.func.isRequired,
    createBankInfo: PropTypes.func.isRequired,
    getOrder: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) =>({
    auth: state.auth,
    order: state.order
});

export default connect(mapStateToProps, { updateBankInfo, createBankInfo, getOrder })(withRouter(Dashboard));