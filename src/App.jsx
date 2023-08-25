import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Signup from './pages/Signup';
import { Box, VStack } from '@chakra-ui/react';
import Dashboard from './pages/Dashboard';
import Profile from './components/Profile';
import ApplicationStatus from './components/ApplicationStatus';
import EnrolledCourse from './components/EnrolledCourse';
import Enrollments from './components/Admin/Enrollments';
import { useContext, useEffect } from 'react';
import GlobalContext from './Store/GlobalContext';

function App() {
	const {checkLoginStatus} = useContext(GlobalContext);
	
	useEffect(()=>{
		checkLoginStatus();
	}, []);
	return (
		<>
			<VStack
				align={'start'}
				w={'100vw'}
				h={'100vh'}
				gap={0}
				overflowY={'hidden'}
			>
				<Navbar />
				<Box w={'100%'} overflowY={'auto'} h={'100%'}>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/login" element={<Login />} />
						<Route path="/signup" element={<Signup />} />
						<Route path="/dashboard" element={<Dashboard />}>
							<Route path="profile" element={<Profile />} />
							<Route path="application-status" element={<ApplicationStatus />} />
							<Route path="enrolled-course" element={<EnrolledCourse />} />
							<Route path="enrollments" element={<Enrollments />} />
						</Route>
					</Routes>
				</Box>
			</VStack>
		</>
	);
}

export default App;
