import React from 'react'
import {compose} from "redux";
import connect from "react-redux/es/connect/connect";
import {Redirect} from 'react-router-dom'
import {setPrevUrl} from "../../../store/actions/authActions";


const Home = (props) => {
  const { auth, setPrevUrl, reports } = props;

  if (!auth.uid) {
    setPrevUrl(props.location.pathname);
    return <Redirect to='/login' />;
  } else {
    return <Redirect to='/completed/loans' />
  }
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPrevUrl: (url) => dispatch(setPrevUrl(url))
  }
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(Home)
