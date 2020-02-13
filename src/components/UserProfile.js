import React from "react";

import UserDetails from "./UserDetails";

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
