import React, { useEffect, useState } from 'react';
import supabase from '../config/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { FastField, Form, Formik } from 'formik';
import { number, object, string } from 'yup';
import { v4 as uuidv4 } from 'uuid';
import FormikController from './FormikController';

function Create() {
	useEffect(() => {
		getUser();
	}, []);
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const initialValues = {
		title: '',
		method: '',
		rating: 0,
	};
	const onSubmit = async (values, action) => {
		const { data } = await supabase
			.from('smoothies')
			.insert([{ ...values, email, image: `${image.id}.jpg` }]);
		const { error } = await supabase.storage
			.from('bucket')
			.upload(`smoothies/${image.id}.jpg`, image.file);
		action.resetForm();
		setImage({ id: '', file: '' });
		navigate('/home');
	};
	const validationSchema = object({
		title: string().required('Title is Required'),
		method: string().required('method is Required'),
		rating: number()
			.required('rating is Required')
			.min(0, 'invalid input')
			.max(10, 'rating gt 10 does not exist'),
	});
	const getUser = async () => {
		const {
			data: { user },
		} = await supabase.auth.getUser();
		if (!user) {
			navigate('/');
		} else {
			setEmail(user.email);
		}
	};

	const [image, setImage] = useState({
		id: '',
		file: '',
	});

	return (
		<div className="w-full flex item-center justify-center">
			<Formik
				initialValues={initialValues}
				onSubmit={onSubmit}
				validationSchema={validationSchema}
				className="bg-red-300"
			>
				{(formik) => {
					return (
						<Form className="flex flex-col gap-4 w-4/12 mt-3 bg-white p-4">
							<FormikController
								control="input"
								label="title"
								type="text"
								name="title"
							/>
							<FormikController
								control="input"
								label="method"
								type="text"
								name="method"
							/>
							<FormikController
								control="input"
								label="rating"
								type="number"
								name="rating"
							/>

							<input
								type="file"
								onChange={(e) => {
									setImage({ id: uuidv4(), file: e.target.files[0] });
								}}
							/>
							<FastField
								type="submit"
								value="create smoothie reciepe"
								className="bg-teal-400 cursor-pointer px-3 py-2 rounded-sm text-white font-bold capitalize text-sm w-fit hover:brightness-105"
							></FastField>
						</Form>
					);
				}}
			</Formik>
		</div>
	);
}

export default Create;
