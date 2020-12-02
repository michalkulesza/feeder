import React from "react";

const InfoPost = ({ children }) => {
	return (
		<div className="post info-post">
			<p>{children}</p>
		</div>
	);
};

export default InfoPost;
