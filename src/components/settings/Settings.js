import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import "./settings.css";
import { createApp } from "store/actions/settingsActions";
import { getApps } from "store/actions/settingsActions";
import SpockTest from "../tests/SpockTest";
import * as StringUtil from "../../util/StringUtil";

const Settings = (props) => {
	const [testTitle, setTestTitle] = useState(null);

	const { apps } = props;
	const { getApps, createApp } = props;

	useEffect(() => {
		getApps();
		return function cleanup() {
			// unsubscribeGetApps(); //todo - power implement
			// resetGetApps(); //todo - power implement
		};
	}, [apps]);

	const onClickCreateApp = () => {
		const app = {
			"title": testTitle,
			"value": StringUtil.createValue(testTitle) //todo caution: manually update value for existing Tala data
		}
		createApp(app)
	};


	const handleChangeForTextField = (e) => {
		const value = e.target.value;
		switch (e.target.id) {
			case 'testTitle':
				setTestTitle(value);
				break;
			default:
				break;
		}
	};

	return (
		<div id="reports-section">
			<div id="settings-title">Settings</div>

			<div className="settings-section">
				<span className="section-title">Configure Apps</span>
				<hr />

				{ apps && apps.map(app => {
					return (
						<div>
							<Link to={'/settings/' + app.id} key={app.id}>
								<div className="section-service">{app.title}</div>
							</Link>
						</div>
					)
				})
				}

				<input
					id="testTitle"
					type="text"
					name="createApp"
					value={testTitle}
					onChange={handleChangeForTextField}
				/>
				<span id="add-config" onClick={onClickCreateApp}>
					Create App
				</span>
			</div>

			<div className="settings-section">
				<div className="section-title">
					Test Types (To show on the Feature details page)
				</div>
				<hr />
				<div>
					<input
						checked={true} // Intially its true, this will then be changed in the database and plugged in
						type="checkbox"
						value="100"
						name="perfomance-service"
						className="section-service"
					/>
					Perfomance
				</div>

				<div>
					<input
						checked={true} // Intially its true, this will then be changed in the database and plugged in
						type="checkbox"
						value="200"
						name="perfomance-service"
						className="section-service"
					/>
					Manual
				</div>

				<div>
					<input
						checked={true} // Intially its true, this will then be changed in the database and plugged in
						type="checkbox"
						value="200"
						name="perfomance-service"
						className="section-service"
					/>
					Postman
				</div>
			</div>

			<div className="settings-section">
				<Link to="/settings/general">
					<div className="section-title">Account</div>
				</Link>
				<hr />

				<Link to="/settings/general">
					<div className="section-service">Change Email</div>
				</Link>
				<Link to="/settings/general">
					<div className="section-service">View Team</div>
				</Link>
				<Link to="/settings/general">
					<div className="section-service">Profile settings</div>
				</Link>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		user: state.auth.user,
		apps: state.settings.apps
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		// setPrevUrl: (url) => dispatch(setPrevUrl(url)), // TODO Power implement this

		createApp: (app) => dispatch(createApp(app)),
		getApps: (message) => dispatch(getApps(message)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
