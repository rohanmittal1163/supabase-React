import React, { useEffect, useState } from 'react';
import supabase from '../config/supabaseClient';
import { CiEdit } from 'react-icons/ci';
import { MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { MoonLoader } from 'react-spinners';

function Home() {
	const [data, setData] = useState([]);
	const [orderBy, setOrderBy] = useState('created_at');
	const [error, setError] = useState('');
	const [imageLoaded, setImageLoaded] = useState(false);
	const [email, setEmail] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		fetchingData();
		getUser();
	}, [orderBy]);

	const fetchingData = async () => {
		const { data: smoothies, error } = await supabase
			.from('smoothies')
			.select()
			.order(orderBy, { ascending: true });
		if (error) {
			setData([]);
			setError('Could not fetch the data');
		} else {
			setError(null);
			setData(smoothies);
		}
	};
	async function getUser() {
		const {
			data: { user },
		} = await supabase.auth.getUser();
		if (!user) {
			navigate('/');
		} else {
			setEmail(user.email);
		}
	}

	const handleEdit = (val) => {
		navigate(`/update/${val.id}`);
	};

	const handleDelete = async (val) => {
		const a = data.filter((value, index) => {
			return value.id !== val.id;
		});
		setData(a);
		const { error } = await supabase.storage
			.from('bucket')
			.remove([`smoothies/${val.image}`]);
		await supabase.from('smoothies').delete().eq('id', val.id);
	};

	const handleLogout = async () => {
		let { error } = await supabase.auth.signOut();
		navigate('/');
	};
	const handleLoad = () => {
		setImageLoaded(true);
	};

	return (
		<div>
			{error ? (
				<p>{error}</p>
			) : (
				<div className="flex w-full flex-col items-center justify-center gap-10 mt-6 flex-wrap rounded-md">
					<div className="flex flex-row gap-4 text-sm font-bold items-center">
						<p className="text-white">Ordering</p>
						<button
							onClick={() => setOrderBy('title')}
							className="text-white bg-teal-500 cursor-pointer hover:bg-teal-700 capitalize font-bold text-sm px-4 py-1 rounded-sm "
						>
							title
						</button>
						<button
							onClick={() => setOrderBy('method')}
							className="text-white bg-teal-500 cursor-pointer hover:bg-teal-700 capitalize font-bold text-sm px-4 py-1 rounded-sm "
						>
							method
						</button>
						<button
							onClick={() => setOrderBy('rating')}
							className="text-white bg-teal-500 cursor-pointer hover:bg-teal-700 capitalize font-bold text-sm px-4 py-1 rounded-sm "
						>
							rating
						</button>
						<button
							onClick={handleLogout}
							className="text-white bg-teal-500 cursor-pointer hover:bg-teal-700 capitalize font-bold text-sm px-4 py-1 rounded-sm "
						>
							Logout
						</button>
					</div>
					{data.length === 0 ? (
						<MoonLoader loading={1} size={100} color="#2dd4bf"></MoonLoader>
					) : (
						<div className="flex flex-row w-full items-center justify-center gap-10 mt-6 flex-wrap rounded-md">
							{data.map((val, index) => {
								return (
									<>
										<div className="bg-white w-3/12 px-5 py-2 flex flex-col gap-4 relative">
											<LazyLoadImage
												draggable={false}
												alt="error"
												src={`https://hdlfkyzrdvrinixnvhpx.supabase.co/storage/v1/object/public/bucket/smoothies/${val.image}`}
												effect="blur"
												afterLoad={handleLoad}
												className={`blurry-image ${
													imageLoaded ? 'image-loaded' : ''
												}`}
											/>
											<p className="font-extrabold capitalize">{val.title}</p>
											<p className="text-sm">{val.method}</p>
											<div className="absolute -top-3 -right-4 bg-teal-500 flex items-center justify-center text-white w-[38px] aspect-square rounded-md text-sm font-bold">
												{val.rating}
											</div>
											<div
												className={`flex flex-row items-center gap-3 justify-end text-4xl w-full ${
													val.email === email ? 'visible' : 'invisible'
												}`}
											>
												<CiEdit
													className="cursor-pointer rounded-full hover:bg-gray-100 p-1.5"
													onClick={() => handleEdit(val)}
												/>
												<MdDelete
													onClick={() => handleDelete(val)}
													className="cursor-pointer rounded-full hover:bg-gray-100 p-1.5"
												/>
											</div>
										</div>
									</>
								);
							})}
						</div>
					)}
				</div>
			)}
		</div>
	);
}

export default Home;
