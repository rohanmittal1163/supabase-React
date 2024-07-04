import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import FormikController from './FormikController';
import { FastField, Form, Formik } from 'formik';
import { number, object, string } from 'yup';
import supabase from '../config/supabaseClient';
import { RingLoader } from 'react-spinners';

function Update() {
	const navigate = useNavigate();
	const params = useParams();
	const [fetchedData, setFetchedData] = useState(null);
	const [loading, setLoading] = useState(true);

	const fetchingData = async () => {
		const { data, error } = await supabase
			.from('smoothies')
			.select('rating,title,method')
			.eq('id', params.id);
		setFetchedData(data[0]);
		setLoading(false);
	};

	useEffect(() => {
		fetchingData();
	}, [params.id]);

	let initialValues = {
		title: fetchedData?.title || '',
		method: fetchedData?.method || '',
		rating: fetchedData?.rating || 0,
	};

	const onSubmit = async (values, action) => {
		const { data, error } = await supabase
			.from('smoothies')
			.update(values)
			.eq('id', params.id)
			.select();
		action.resetForm();
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

	if (loading) {
		return (
			<div className="absolute top-0  left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2">
				<RingLoader loading={1} size={100} color="#2dd4bf" />
			</div>
		);
	}
	return (
		<div className="w-full flex item-center justify-center">
			<Formik
				initialValues={initialValues}
				onSubmit={onSubmit}
				validationSchema={validationSchema}
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
							<FastField
								type="submit"
								value="update smoothie reciepe"
								className="bg-teal-400 cursor-pointer px-3 py-2 rounded-sm text-white font-bold capitalize text-sm w-fit hover:brightness-105"
							></FastField>
						</Form>
					);
				}}
			</Formik>
		</div>
	);
}

export default Update;
