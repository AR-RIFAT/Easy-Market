import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../common/Spinner';
import { addToCart } from '../../actions/cartActions';

class Landing extends Component {

    componentDidMount() {
        //this.props.addToCart();
    }

    onAddtoCartClick(id) {
        // console.log(id);
        this.props.addToCart(id);
        // console.log(this.props.cart.cart);
    }

  render() {

    //console.log(this.props.cart);

    const { loading } = this.props.cart;

    let showLoading;

    if(loading === true) {
        showLoading = <Spinner />;
    }else{
        showLoading = null;
    }

    return (

        <div style={{ margin: '0 26px 0 26px' }}>
        
        <div className="row" style={{ position: "relative" }}>
        
            <div className="col-sm-6 col-md-4">
                <div className="card">
                <img src={require("../../img/item0.jpg")} className="img-card card-img-top" alt="game 0"/>
                <div className="card-body">
                    <h5 className="card-title">SAMSUNG S10</h5>
                    <p className="card-text">Latest Android phone from SAMSUNG comes with powerful processor, bigger RAM and Storage.</p>
                    <div className="clearfix">
                        <div className="text-danger float-left"><h4>60,000 Tk</h4></div>
                        <button
                        onClick={()=>{this.onAddtoCartClick('5cfeb51a1c9d4400008a7632')}}
                        className="btn btn-primary float-right">
                        Add to cart
                        </button>
                    </div>
                </div>
                </div>
            </div>

            <div className="col-sm-6 col-md-4">
                <div className="card">
                <img src={require("../../img/item1.jpg")} className="img-card card-img-top" alt="game 0"/>
                <div className="card-body">
                    <h5 className="card-title">RADO SBG</h5>
                    <p className="card-text">Gold platet limited edition RADO masterpiece. Elegence with simplicity redefined !</p>
                    <div className="clearfix">
                        <div className="text-danger float-left"><h4>5000 Tk</h4></div>
                        <button
                        onClick={()=>{this.onAddtoCartClick('5cfd00741c9d44000041703d')}}
                        className="btn btn-primary float-right">
                        Add to cart
                        </button>
                    </div>
                </div>
                </div>
            </div>

            <div className="col-sm-6 col-md-4">
                <div className="card">
                <img src={require("../../img/item2.jpg")} className="img-card card-img-top" alt="game 0"/>
                <div className="card-body">
                    <h5 className="card-title">Halo 4</h5>
                    <p className="card-text">An unstoppable force threatens the galaxy, and the Master Chief is missing. PC, Xbox</p>
                    <div className="clearfix">
                        <div className="text-danger float-left"><h4>500 Tk</h4></div>
                        <button
                        onClick={()=>{this.onAddtoCartClick('5d2048df1c9d440000ce78ec')}}
                        className="btn btn-primary float-right">
                        Add to cart
                        </button>
                    </div>
                </div>
                </div>
            </div>

            <div className="col-md-12" style={{ position: "fixed", top: 80, left:0 }}>
                { showLoading }
            </div>

            <div className="col-sm-6 col-md-4">
                <div className="card">
                <img src={require("../../img/item3.jpg")} className="img-card card-img-top" alt="game 0"/>
                <div className="card-body">
                    <h5 className="card-title">North Star Sneaker</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <div className="clearfix">
                        <div className="text-danger float-left"><h4>2000 Tk</h4></div>
                        <Link to="/" className="btn btn-primary float-right">Add to cart</Link>
                    </div>
                </div>
                </div>
            </div>

            <div className="col-sm-6 col-md-4">
                <div className="card">
                <img src={require("../../img/item4.jpg")} className="img-card card-img-top" alt="game 0"/>
                <div className="card-body">
                    <h5 className="card-title">Mi Powerbank</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <div className="clearfix">
                        <div className="text-danger float-left"><h4>1200 Tk</h4></div>
                        <Link to="/" className="btn btn-primary float-right">Add to cart</Link>
                        
                    </div>
                </div>
                </div>
            </div>
        </div>

        </div>
        
    )
  }
}

Landing.propTypes = {
    addToCart: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) =>({
    auth: state.auth,
    cart: state.cart
});

export default connect(mapStateToProps, { addToCart })(Landing);