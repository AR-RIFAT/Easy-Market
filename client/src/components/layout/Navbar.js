import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {logoutUser} from '../../actions/authActions';
import { getTotalItem, getCart, test } from '../../actions/cartActions';

class Navbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      totalItem: 0
    };
  }

  componentDidMount() {
    this.props.getTotalItem();
  }

  componentWillReceiveProps(nextProps) {
    //console.log(nextProps.cart)
    if(nextProps.cart.cart.cart) {
      this.setState({
        totalItem: nextProps.cart.cart.cart.totalQty
      });
    }
  }

  onCartClick(e){
    e.preventDefault();
    
    this.props.getCart(this.props.history);
  }

  onLogoutClick(e){
    e.preventDefault();
    // this.props.clearCurrentProfile();
    this.props.logoutUser();
  }

  testf(e){
    e.preventDefault();
    this.props.test();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    var total = this.props.totalItem;

    let checkCart;
    let checkWho;

    total = this.props.cart.totalItem.total;

    const cartfragment = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link to="" className="nav-link" onClick={this.onCartClick.bind(this)} style={{ color: '#ffffff'}}>
                    <i className="fa fa-shopping-cart" aria-hidden="true"></i> Cart
                    <span className="badge badge-pill badge-danger" style={{ marginLeft: '6px' }}>{total}</span>
          </Link>
        </li>
      </ul>
    );

    const adminfragment = (
      <li className="nav-item">
          <Link className="nav-link" to="/adminDashboard">Orders</Link>
      </li>
    );

    const supplierfragment = (
      <li className="nav-item">
          <Link className="nav-link" to="/suppDashboard">Orders</Link>
      </li>
    );

    const userImgfragment = (
      <li className="nav-item">
        <img
        className = "rounded-circle"
        src = {require("../../img/logout.png")}
        alt = {user.name}
        style = {{ width: '25px', marginLeft: '8px', marginTop: '8px' }}
        />
      </li>
    );

    const btnLogoutfragment = (
      // <li className="nav-item">
      //   <button onClick={this.onLogoutClick.bind(this)} className="nav-link" id="btnLogout">
      //     <img
      //     className = "rounded-circle"
      //     src = {require("../../img/logout.png")}
      //     alt = {user.name}
      //     style = {{ width: '25px', marginRight: '5px' }}
      //     />
      //     Logout
      //   </button>
      // </li>

      <li className="nav-item dropdown">

        <Link to="" className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{this.props.auth.user.name} </Link>

        <div className="dropdown-menu" aria-labelledby="navbarDropdown">

          <Link className="dropdown-item" to="">Orders</Link>
          <Link className="dropdown-item" to="/balance" >Balance</Link>
          
          <div className="dropdown-divider"></div>
          <Link className="dropdown-item" to="" onClick={this.onLogoutClick.bind(this)}>Sign Out</Link>

        </div>
      </li>
    );

    const authLinks = (
      <ul className="navbar-nav ml-auto">
       <li className="nav-item">
          <Link className="nav-link" to="/dashboard">Dashboard</Link>
       </li>
       { userImgfragment }
       { btnLogoutfragment }
     </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link className="nav-link" to="/register">Sign Up</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/login">Login</Link>
      </li>
      </ul>
    );

    if(isAuthenticated){
      if(user.type === 'admin'){
        checkWho = (
          <ul className="navbar-nav ml-auto">
            { adminfragment }
            { userImgfragment }
            {btnLogoutfragment}
          </ul>
        );
      }else if(user.type === 'supplier'){
        checkWho = (
          <ul className="navbar-nav ml-auto">
            {supplierfragment}
            { userImgfragment }
            {btnLogoutfragment}
          </ul>
        );
      } else{
        checkCart = cartfragment;
        checkWho = authLinks;
      }
    }else{
      checkCart = cartfragment;
      checkWho = guestLinks;
    }

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <a className="navbar-brand" href="/">Easy Market</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
            <span className="navbar-toggler-icon"></span>
          </button>
    
          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <a className="nav-link" href="profiles.html"> Search
                </a>
              </li>
            </ul>
            { checkCart }
            { checkWho }
          </div>
        </div>
      </nav>
    )
  }
}


Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  getCart: PropTypes.func.isRequired,
  getTotalItem: PropTypes.func.isRequired,
  test: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) =>({
  auth: state.auth,
  cart: state.cart
});


export default  connect(mapStateToProps, { logoutUser, getTotalItem, getCart, test })(withRouter(Navbar)); 