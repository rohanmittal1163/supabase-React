import React from 'react';
import Input from './Input';

function FormikController({ control, ...rest }) {
	switch (control) {
		case 'input':
			return <Input {...rest} />;
		default:
			return null;
	}
}

export default FormikController;
