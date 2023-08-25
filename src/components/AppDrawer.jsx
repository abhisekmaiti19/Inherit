import React from 'react';
import {
	Button,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	Hide,
	Text,
	VStack,
	useDisclosure,
} from '@chakra-ui/react';

import { FiMenu } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import ApplyButton from './ApplyButton';

const AppDrawer = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = React.useRef();

	return (
		<>
			<Button
				p={0}
				ref={btnRef}
				variant={'ghost'}
				colorScheme="brand"
				onClick={onOpen}
				minW={'28px'}
			>
				<FiMenu fontSize={'26px'} />
			</Button>
			<Drawer
				isOpen={isOpen}
				placement="right"
				onClose={onClose}
				finalFocusRef={btnRef}
			>
				<DrawerOverlay />
				<DrawerContent bg={'brand.900'} color={'white'}>
					<DrawerCloseButton />
					<DrawerHeader borderBottom={'1px dotted #ffffff55'}>
						Quick Links
					</DrawerHeader>
					<DrawerBody>
						<VStack
							align={'start'}
							fontSize={'lg'}
							fontWeight={600}
							pt={5}
							spacing={5}
						>
							<Hide above="sm">
								<ApplyButton />
							</Hide>
							<Text
								as={Link}
								to={'/'}
								p={3}
								w={'100%'}
								borderRadius={3}
								transition={'0.15s'}
								_hover={{ bg: '#ffffff11' }}
							>
								Home
							</Text>
							<Text
								as={Link}
								to={'/login'}
								p={3}
								w={'100%'}
								borderRadius={3}
								transition={'0.15s'}
								_hover={{ bg: '#ffffff11' }}
							>
								Courses
							</Text>
							<Text
								as={Link}
								to={'/login'}
								p={3}
								w={'100%'}
								borderRadius={3}
								transition={'0.15s'}
								_hover={{ bg: '#ffffff11' }}
							>
								Admission
							</Text>
							<Text
								as={Link}
								to={'/login'}
								p={3}
								w={'100%'}
								borderRadius={3}
								transition={'0.15s'}
								_hover={{ bg: '#ffffff11' }}
							>
								About Us
							</Text>
						</VStack>
					</DrawerBody>
					<DrawerFooter>Abhisek Maiti&copy;Fynd</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</>
	);
};

export default AppDrawer;
