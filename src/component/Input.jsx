import { ErrorMessage, FastField } from 'formik';
import React from 'react';
import Error from './Error';

function Input({ label, type, name }) {
	return (
		<div className="flex flex-col gap-1 w-full">
			<label htmlFor={name} className="capitalize">
				{label}:
			</label>
			<FastField
				className="border-2 px-2 py-1.5 text-sm border-gray-100 border-solid outline-none w-full b"
				type={type}
				placeholder={`Enter ${label}`}
				id={name}
				name={name}
			/>
			<ErrorMessage name={name} component={Error} />
		</div>
	);
}

export default Input;
