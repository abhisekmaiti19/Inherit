import {
	Button,
	HStack,
	Image,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Text,
} from '@chakra-ui/react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import GlobalContext from '../Store/GlobalContext';
import { BsChevronDown } from 'react-icons/bs';
import { BiLogOut } from 'react-icons/bi';
import { LuLayoutDashboard } from 'react-icons/lu';

const UserProfileButton = () => {
	const { isLoggedIn, user, logout } = useContext(GlobalContext);
	return (
		<>
			{isLoggedIn == false ? (
				<Button
					as={Link}
					to={'/login'}
					variant="outline"
					colorScheme="brand"
					flexBasis={{ sm: '160px', xs: '' }}
					w={{ sm: '160px', base: '' }}
					_hover={{ bg: 'brand.100' }}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="26"
						height="26"
						viewBox="0 0 35 35"
						fill="none"
					>
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M17.5002 5.83334C14.2772 5.83334 11.6668 8.44376 11.6668 11.6667C11.6668 14.8896 14.2772 17.5 17.5002 17.5C20.7231 17.5 23.3335 14.8896 23.3335 11.6667C23.3335 8.44376 20.7231 5.83334 17.5002 5.83334ZM20.4168 11.6667C20.4168 10.0625 19.1043 8.75001 17.5002 8.75001C15.896 8.75001 14.5835 10.0625 14.5835 11.6667C14.5835 13.2708 15.896 14.5833 17.5002 14.5833C19.1043 14.5833 20.4168 13.2708 20.4168 11.6667ZM26.2502 24.7917C25.9585 23.7563 21.4377 21.875 17.5002 21.875C13.5627 21.875 9.04183 23.7563 8.75016 24.8063V26.25H26.2502V24.7917ZM5.8335 24.7917C5.8335 20.9125 13.6064 18.9583 17.5002 18.9583C21.3939 18.9583 29.1668 20.9125 29.1668 24.7917V29.1667H5.8335V24.7917Z"
							fill="url(#paint0_linear_265_81)"
						/>
						<defs>
							<linearGradient
								id="paint0_linear_265_81"
								x1="6.00015"
								y1="6"
								x2="29.0002"
								y2="29"
								gradientUnits="userSpaceOnUse"
							>
								<stop stopColor="#6D10FC" />
								<stop offset="1" stopColor="#F96295" />
							</linearGradient>
						</defs>
					</svg>
					<Text fontWeight={700} ml={2} color={'brand.900'}>
						Login
					</Text>
				</Button>
			) : (
				<Menu>
					<MenuButton
						as={Button}
						rightIcon={<BsChevronDown />}
						p={0}
						maxW={200}
						minW={150}
						pr={4}
					>
						<HStack w={'100%'} justifyContent={'space-between'}>
							<Image
								src={user.photo}
								w={10}
								h={10}
								minW={10}
								objectFit={'cover'}
								borderRadius={5}
								border={'1px solid'}
								borderColor={'gray.200'}
								outline={'4px solid'}
								outlineColor={'white'}
							/>
							<Text noOfLines={1} fontSize={'sm'}>
								{user?.name}
							</Text>
						</HStack>
					</MenuButton>
					<MenuList bg={'white'} px={4}>
						<MenuItem
							as={Link}
							to={'/dashboard/profile'}
							bg={'#ffffff00'}
							color={'#000'}
							_hover={{ bg: '#00000011' }}
							w={'100%'}
							justifyContent={'start'}
							gap={3}
						>
							<LuLayoutDashboard />
							Dashboard
						</MenuItem>
						<MenuItem
							bg={'#ffffff00'}
							color={'#000'}
							_hover={{ bg: '#00000011' }}
							w={'100%'}
							justifyContent={'start'}
							gap={3}
							onClick={() => logout()}
						>
							<BiLogOut />
							Logout
						</MenuItem>
					</MenuList>
				</Menu>
			)}
		</>
	);
};

export default UserProfileButton;
