import React from "react";
import "./UserProfile.scss";

import { UserDetails } from "../../containers";

const UserProfile = props => {
	return (
		<div className="container">
			<div className="wrapper userprofile">
				<UserDetails match={props.match} />
			</div>
		</div>
	);
};

export default UserProfile;
