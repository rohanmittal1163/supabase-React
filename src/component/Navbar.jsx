import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
	return (
		<div className="bg-teal-400 flex flex-col items-center p-3">
			<p className="font-bold text-2xl text-white capitalize ">
				supa smoothies
			</p>

			<div className="flex flex-row text-white/90 capitalize gap-4">
				<Link className="underline" to="/home">
					Home
				</Link>
				<Link className="underline" to="/create">
					create new smooothie
				</Link>
			</div>
		</div>
	);
}

export default Navbar;
