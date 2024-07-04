import React from 'react';

function Error({ children }) {
	return (
		<div className="text-red-400 font-bold capitalize text-sm">{children}</div>
	);
}

export default Error;
