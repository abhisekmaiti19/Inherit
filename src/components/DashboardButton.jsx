/* eslint-disable react/prop-types */
import { Button, HStack, Show, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const DashboardButton = ({text, to, icon}) => {
    const loc = useLocation();
	const [location, setLocation] = useState('');

	useEffect(() => {
		setLocation(loc.pathname);
	}, [loc]);
    
	return (
		<Button
			as={Link}
			size={{ md: 'md', sm: 'sm', base: 'md' }}
			to={to}
			w={'100%'}
			border={'1px solid #ffffff11'}
			bg={{
				md:
					location == to? 'gray.400' : 'transparent',
				base:
					location == to? 'gray.400' : '#ffffff11',
			}}
			color={location == to? 'gray.800' : 'gray.500'}
			_hover={{
				bg: location == to? 'gray.400' : '#ffffff11',
			}}
			justifyContent={{ md: 'start', base: 'center' }}
		>
			<HStack>
				{icon}
				<Show above="sm">
					<Text>{text}</Text>
				</Show>
			</HStack>
		</Button>
	);
};

export default DashboardButton;