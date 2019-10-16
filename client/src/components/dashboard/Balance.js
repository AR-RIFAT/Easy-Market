import React, { Component } from 'react'
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { checkBalance } from '../../actions/bankActions'
import TextFieldGroup from '../common/TextFieldGroup'
import Spinner from '../common/Spinner';

class Balance extends Component {

    constructor() {
        super();
        this.state = {
          bankInfo: '',
          password: '',
          balance: '',
          customstyle: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onPopupClick = this.onPopupClick.bind(this);
        this.onPopCloseClick = this.onPopCloseClick.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
      }

      componentDidMount() {
        //this.props.getOrder();
      }

      componentWillReceiveProps(nextProps) {
          //console.log(nextProps.auth.balance.balance);
          this.setState(() => ({ 
            balance: nextProps.auth.balance.balance
        }));
      }

      onChange(e){
        this.setState({[e.target.name]: e.target.value});
      }

      onPopupClick() {
        this.setState(() => ({ 
            customstyle: { display: 'block' }
        }));
    }

    onPopCloseClick(e) {
        e.preventDefault();
        this.setState(() => ({ 
            customstyle: { display: 'none' },
            balance: ''
        }));
    }

    onSubmit(e){

    e.preventDefault();

    if(this.props.auth.user.bankAccNo === this.state.bankInfo){
        const userData = {
            bankInfo: this.state.bankInfo,
            password: this.state.password,
        };
    
        this.props.checkBalance(userData);
        this.setState(() => ({ 
            bankInfo: '',
            password: ''
        }));
        this.onPopupClick();
    }else {
        window.alert('Invalid request! Please try again');
    }
    }

    render() {

        let popUpContent;

        if(this.state.balance !== ''){
            if(this.state.balance === 'wPass'){
                popUpContent = (
                    <h3 style={{ marginLeft: '10px', marginBottom: '26px', marginTop: '40px' }}>
                    <div style={{ color: "#E74C3C" }}>Wrong Password</div></h3>
                );
            } else {
                popUpContent = (
                    <h4 style={{ marginLeft: '10px', marginBottom: '26px', marginTop: '40px' }}>
                    Your bank account Balance is 
                    <div style={{ color: "#E74C3C" }}>{this.state.balance} BDT</div></h4>
                );
            }
        } else {
            popUpContent = <Spinner />;
        }

        return (
            <div className="dashboard">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div style={{ margin: '26px 200px 162px 200px' }}>
                                <h2 style={{ marginLeft: '39%', marginBottom:'40px' }}>Check Balance</h2>
                                <div>
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

                                        <input value="Check Balance" type="submit" className="btn btn-info btn-block mt-4" />
                                    </form>
                                </div>
                            </div>
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

                                <div className="container">

                                    { popUpContent }

                                </div>
                                
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Balance.propTypes = {
    checkBalance: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) =>({
    auth: state.auth
});

export default connect(mapStateToProps, { checkBalance })(Balance);