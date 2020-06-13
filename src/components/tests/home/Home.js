import React from "react";
import { compose } from "redux";
import connect from "react-redux/es/connect/connect";
import { Redirect, Link } from "react-router-dom";
import { setPrevUrl } from "../../../store/actions/authActions";

import "./home.css";

const Home = (props) => {
	const { user, setPrevUrl } = props;

	if (!user) {
		setPrevUrl(props.location.pathname);
		return <Redirect to="/login" />;
	}

	return (
		<div id="home">
			<div id="reports-section">

				<div id="home-cards-section">
					<div className="home-card">
						<Link to="/features/userflow">
							{/* Hard coded for now*/}
							<div className="home-card-title">Android User Flows</div>
							<div className="home-card-info">43 features</div>
						</Link>
					</div>

					<div className="home-card">
						<Link to="/features/surveys">
							{/* Hard coded for now*/}
							<div className="home-card-title">Surveys</div>
							<div className="home-card-info">23 features</div>
						</Link>
					</div>

					<div className="home-card">
						<Link to="/features/rules">
							{/* Hard coded for now*/}
							<div className="home-card-title">Rules</div>
							<div className="home-card-info">28 features</div>
						</Link>
					</div>
				</div>

        <div id="home-cards-section">
					<div className="home-card">
						<Link to="/features/loans">
							{/* Hard coded for now*/}
							<div className="home-card-title">Loans</div>
							<div className="home-card-info">13 features</div>
						</Link>
					</div>

					<div className="home-card">
						<Link to="/features/users">
							{/* Hard coded for now*/}
							<div className="home-card-title">Users</div>
							<div className="home-card-info">38 features</div>
						</Link>
					</div>

					<div className="home-card">
						<Link to="/features/auth">
							{/* Hard coded for now*/}
							<div className="home-card-title">Auth</div>
							<div className="home-card-info">75 features</div>
						</Link>
					</div>
				</div>

        <div id="home-cards-section">
					<div className="home-card">
						<Link to="/features/rails">
							{/* Hard coded for now*/}
							<div className="home-card-title">Rails</div>
							<div className="home-card-info">12 features</div>
						</Link>
					</div>

					<div className="home-card">
						<Link to="/features/comms">
							{/* Hard coded for now*/}
							<div className="home-card-title">Comms</div>
							<div className="home-card-info">34 features</div>
						</Link>
					</div>

					<div className="home-card">
						<Link to="/features/approval">
							{/* Hard coded for now*/}
							<div className="home-card-title">Approval</div>
							<div className="home-card-info">91 features</div>
						</Link>
					</div>
				</div>

			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		user: state.auth.user,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setPrevUrl: (url) => dispatch(setPrevUrl(url)),
	};
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(Home);
