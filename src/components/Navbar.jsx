import { Box, HStack, Hide, Image, Show, Text } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

// import img from '../assets/fynd_logo1.png';
import UserProfileButton from './UserProfileButton';
import ApplyButton from './ApplyButton';
import AppDrawer from './AppDrawer';

const Navbar = () => {
	const location = useLocation();
	const [isLoginPage, setIsLoginPage] = useState(false);

	useEffect(() => {
		if (location.pathname == '/login' || location.pathname == '/signup')
			setIsLoginPage(true);
		else setIsLoginPage(false);
	}, [location]);

	return (
		<Box
			p={isLoginPage ? 5 : 0}
			w={'100%'}
			mt={isLoginPage ? 6 : 0}
			position={'relative'}
			transition={'0.25s'}
			fontSize={'md'}
			boxShadow={'0 3px 14px 14px #fff'}
		>
			<HStack
				justify={{ xl: 'space-between', base: 'end' }}
				align={'center'}
				spacing={5}
				borderBottom={isLoginPage ? '2px solid' : '1px solid'}
				borderX={isLoginPage ? '4px solid' : 'none'}
				borderTop={isLoginPage ? '1px dotted' : 'none'}
				borderColor={isLoginPage ? 'brand.800' : 'brand.200'}
				p={5}
				px={8}
				h={{md: isLoginPage ? '80px' : '94px', base: '80px'}}
				maxW={isLoginPage ? '6xl' : '100vw'}
				margin={'auto'}
				borderRadius={isLoginPage ? '3xl' : '0'}
				transition={'0.25s'}
			>
				<Show above="lg">
					<HStack
						fontWeight={'700'}
						color={'brand.800'}
						spacing={isLoginPage ? '2.5vw' : '3vw'}
						transition={'0.25s'}
					>
						<Text
							as={Link}
							to={'/'}
							px={3}
							borderRadius={10}
							transition={'0.15s'}
							_hover={{ bg: 'blue.100' }}
						>
							Home
						</Text>
						<Text
							as={Link}
							to={'/login'}
							px={3}
							borderRadius={10}
							transition={'0.15s'}
							_hover={{ bg: 'blue.100' }}
						>
							Courses
						</Text>
						<Text
							as={Link}
							to={'/login'}
							px={3}
							borderRadius={10}
							transition={'0.15s'}
							_hover={{ bg: 'blue.100' }}
						>
							Admission
						</Text>
						<Text
							as={Link}
							to={'/login'}
							px={3}
							borderRadius={10}
							transition={'0.15s'}
							_hover={{ bg: 'blue.100' }}
						>
							About Us
						</Text>
					</HStack>
				</Show>
				<Link to={'/'}>
				<Image
					
					transition={'0.25s'}
					alt="Brand Icon"
					w={{md: isLoginPage ? '94px' : '85px', base: isLoginPage ? '94px' : '72px'}}
					position={'absolute'}
					zIndex={2}
					top={isLoginPage ? '-2px' : '3px'}
					left={{ xl: '50%', base: '10px' }}
					transform={{
						xl: 'translate(-50%, 0)',
						md: 'translate(0, 0)',
					}}
				/></Link>
				<HStack spacing={7} justify={'flex-end'}>
					<UserProfileButton />
					<Show above="sm">
						<ApplyButton />
					</Show>
					<Hide above="lg">
						<AppDrawer />
					</Hide>
				</HStack>
			</HStack>
		</Box>
	);
};

export default Navbar;
