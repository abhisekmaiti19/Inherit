import {
	Box,
	Button,
	Checkbox,
	HStack,
	Heading,
	Image,
	Input,
	Show,
	Text,
	VStack,
	useToast,
} from '@chakra-ui/react';

import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';

import LoginBanner from '../assets/login-banner.png';
import { useContext, useEffect, useState } from 'react';
import GlobalContext from '../Store/GlobalContext';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const {login, isLoggedIn} = useContext(GlobalContext);

	const navigate = useNavigate();

	useEffect(()=>{
		if(isLoggedIn){
			navigate('/');
		}
	})

	const toast = useToast()

	const onSubmit = async () => {
		const emailPattern = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
		const passwordPattern = /[A-Za-z0-9@#]{6,16}/g;
		if(!emailPattern.test(email)) {
			toast({
				title: 'Invalid Email',
				description: "Check the email you have entered",
				status: 'error',
				duration: 2000,
				isClosable: true,
			})
			console.log('invalid')
		}
		else if(!passwordPattern.test(password)) {
			toast({
				title: 'Invalid Password',
				description: "Password should contain minimum 6 Alphanumeric characters and special characters - @, #",
				status: 'error',
				duration: 2000,
				isClosable: true,
			})
			console.log('invalid')
			return
		}
		else {
			toast({
				title: 'Log In',
				description: "Signing You In",
				status: 'info',
				duration: 2000,
			});
			const {status, message} = await login(email.trim(), password.trim())
			if(status) {
				toast({
					title: 'Succesfully Logged In',
					status: 'success',
					duration: 2000,
					isClosable: true,
				});
				setEmail('');
			} else {
				toast({
					title: message,
					status: 'error',
					duration: 2000,
					isClosable: true,
				});
			}
			setPassword('')
		}
	};

	return (
		<HStack justify={'center'} pt={'8'} w={'100%'}>
			<HStack
				maxW={{ xl: '6xl', lg: '4xl' }}
				w={'100%'}
				justify={{ md: 'space-between', base: 'center' }}
				align={'bottom'}
				spacing={{ lg: '50px' }}
			>
				<VStack p={3} align={'start'}>
					<VStack color={'brand.500'} align={'start'}>
						<Heading fontSize={'3xl'}>Hi! Welcome Back.</Heading>
						<Box
							borderRadius={2}
							h={'14px'}
							w={'120%'}
							bg={'linear-gradient(61deg, #10409D, transparent)'}
						/>
					</VStack>
					<VStack
						align={'start'}
						mt={7}
						width={{ sm: '', base: '100%' }}
					>
						<Text fontSize={'sm'}>
							Continue with google or Enter details
						</Text>
						<Button
							display={'flex'}
							gap={3}
							w={{ sm: 450, base: '85vw' }}
							variant={'outline'}
							size={'md'}
							fontSize={15}
							borderWidth={2}
							borderColor={'brand.300'}
							borderRadius={15}
						>
							<FcGoogle fontSize={'21px'} />
							Continue with Google
						</Button>
					</VStack>
					<HStack justify={'space-between'} w={'100%'} pt={5}>
						<Box
							h={'2px'}
							minW={'100px'}
							w={'100%'}
							bg={'brand.200'}
						/>
						<Text color={'brand.200'}>or</Text>
						<Box
							h={'2px'}
							minW={'100px'}
							w={'100%'}
							bg={'brand.200'}
						/>
					</HStack>
					<VStack spacing={3} color={'brand.500'} w={'100%'}>
						<Input
							placeholder="Email"
							size="md"
							w={'100%'}
							border={'none'}
							borderBottom={'2px solid'}
							borderColor={'brand.500'}
							borderRadius={0}
							_focus={{ borderRadius: 5 }}
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<Input
							placeholder="Password"
							type='password'
							size="md"
							w={'100%'}
							border={'none'}
							borderBottom={'2px solid'}
							borderColor={'brand.500'}
							borderRadius={0}
							_focus={{ borderRadius: 5 }}
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<HStack
							justify={'space-between'}
							w={'100%'}
							fontSize={'sm'}
						>
							<Checkbox>
								<Text fontSize={'sm'}>Remember Me</Text>
							</Checkbox>
							<Link to={'/'}>
								<Text fontWeight={600} decoration={'underline'}>
									Forgot password?
								</Text>
							</Link>
						</HStack>
						<Button
							mt={5}
							w={'100%'}
							size={'lg'}
							bg={
								'linear-gradient(61deg, #10409D 50%, transparent)'
							}
							bgSize={'130%'}
							bgPos={'bottom'}
							_hover={{ bgPos: 'left' }}
							transition={'0.25s'}
							color={'white'}
							borderRadius={15}
							onClick={onSubmit}
						>
							Login
						</Button>
						<Link style={{ width: '100%' }} to={'/signup'}>
							<Text
								textAlign={'right'}
								w={'100%'}
								fontSize={'sm'}
							>
								Don&apos;t have an account?{' '}
								<Text
									fontWeight={600}
									as={'span'}
									decoration={'underline'}
								>
									Signup Now
								</Text>
							</Text>
						</Link>
					</VStack>
				</VStack>

				<Show above="md">
					<HStack
						m={10}
						mb={5}
						mr={0}
						border={{ xl: '1px solid' }}
						borderRadius={10}
						boxShadow={{ xl: '-2px 4px 2px #514572' }}
						width={'100%'}
						justify={'center'}
						align={'bottom'}
					>
						<Image
							src={LoginBanner}
							w={'330px'}
							objectFit={'contain'}
							objectPosition={'bottom'}
						></Image>
					</HStack>
				</Show>
			</HStack>
		</HStack>
	);
};

export default Login;
