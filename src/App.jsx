import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './component/Navbar';
import Home from './component/Home';
import Create from './component/Create';
import Update from './component/Update';
import Signin from './component/Signin';

function App() {
	return (
		<>
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path="/" element={<Signin />}></Route>
					<Route path="/home" element={<Home />}></Route>
					<Route path="/create" element={<Create />}></Route>
					<Route path="/update/:id" element={<Update />}></Route>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
