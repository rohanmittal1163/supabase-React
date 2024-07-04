import { Auth } from '@supabase/auth-ui-react';
import React, { useEffect, useState } from 'react';
import supabase from '../config/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { ThemeSupa } from '@supabase/auth-ui-shared';

function Signin() {
	const navigate = useNavigate();
	useEffect(() => {
		supabase.auth.onAuthStateChange(async (e) => {
			if (e === 'SIGNED_IN') {
				navigate('/home');
			} else if (e) {
				// navigate('/');
			}
		});
	}, []);

	const handle = async () => {
		const { data, error } = await supabase.auth.signInWithOtp({
			phone: '+919953565421',
		});
		console.log(data, error);
	};
	const [token, setToken] = useState('');
	const handlevv = async () => {
		const {
			data: { session },
			error,
		} = await supabase.auth.verifyOtp({
			phone: '+919891526944',
			token: token,
			type: 'sms',
		});
		console.log(data, error);
	};

	return (
		<div className="flex items-center justify-center w-full ">
			<Auth
				supabaseClient={supabase}
				appearance={{ theme: ThemeSupa }}
				providers={['discord', 'phone']}
				theme="dark"
			/>

			{/* <button className="text-white bg-red-400" onClick={handle}>
				sdf
			</button>
			<input
				type="text"
				value={token}
				onChange={(e) => setToken(e.target.value)}
			></input>
			<button className="text-white bg-red-400" onClick={handlevv}>
				verify
			</button> */}
		</div>
	);
}

export default Signin;
