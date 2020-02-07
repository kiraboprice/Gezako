import React from 'react'
import {compose} from "redux";
import connect from "react-redux/es/connect/connect";
import {Redirect} from 'react-router-dom'
import {setPrevUrl} from "../../../store/actions/authActions";


const Home = (props) => {
  const { user, setPrevUrl } = props;

  if (!user) {
    setPrevUrl(props.location.pathname);
    return <Redirect to='/login' />;
  } else {
    return <Redirect to='/features/userflow' />
  }
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPrevUrl: (url) => dispatch(setPrevUrl(url))
  }
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(Home)
