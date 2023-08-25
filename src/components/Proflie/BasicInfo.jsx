/* eslint-disable react/prop-types */
import {
	Box,
	Button,
	FormLabel,
	Grid,
	GridItem,
	HStack,
	Heading,
	Image,
	Input,
	InputGroup,
	InputLeftElement,
	Stack,
	Tag,
	TagLabel,
	Text,
	Textarea,
	VStack,
	useToast,
} from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { BsTelephoneFill } from 'react-icons/bs';
import { AiOutlineEdit } from 'react-icons/ai';
import DashboardContext from '../../Store/DashboardContext';

import { storage } from '../../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const BasicInfo = ({ user, stepIndex, decrementStep, incrementStep }) => {
	
	const [name, setName] = useState(user.name);
	const [email, setEmail] = useState(user.email);
	const [phone, setPhone] = useState(user.phone);
	const [about, setAbout] = useState(user.about);
	const [imageUpload, setImageUpload] = useState(null);
	
	const toast = useToast();
	const { updateProfile } = useContext(DashboardContext);
	
	
	const uploadImage = async () => {
		if(imageUpload == null) return null;
		const imageRef = ref(storage, `images/${user._id}`);
		try {
			toast({
				title: 'Uploading Image',
				status: 'info',
				duration: 3000,
				isClosable: true,
			});
			const res = await uploadBytes(imageRef, imageUpload);
			toast({
				title: 'Image Uploaded',
				status: 'success',
				duration: 3000,
				isClosable: true,
			});
			const link = await getDownloadURL(res.ref);
			return link;
		} catch(e) {
			toast({
				title: 'Image Upload failed',
				description: e,
				status: 'error',
				duration: 3000,
				isClosable: true,
			});
		}
	}

	const onSave = async () => {
		const imageLink = await uploadImage();
		const { status, message } = await updateProfile({
			name,
			email,
			phone,
			about,
			photo: imageLink?imageLink:user.photo
		});
		if (status) {
			toast({
				title: 'Successfully saved details',
				description: 'Your details were updated.',
				status: 'info',
				duration: 3000,
				isClosable: true,
			});
		} else {
			toast({
				title: 'There were some errors',
				description: message,
				status: 'error',
				duration: 3000,
				isClosable: true,
			});
		}
	};

	return (
		<>
			<Box pt={4}>
				<Heading fontSize={'3xl'} textAlign={'center'} mb={10}>
					Edit your basic info
				</Heading>
				<Stack
					direction={{ lg: 'row', base: 'column' }}
					align={{ lg: 'start', base: 'center' }}
					justify={{ lg: 'space-between' }}
					maxW={'4xl'}
					m={'auto'}
					gap={10}
					pb={5}
				>
					<FormLabel>
						<Box
							mt={1}
							minW={{ xl: 200, base: 150 }}
							w={{ xl: 200, base: 150 }}
							h={{ xl: 200, base: 150 }}
							display={'flex'}
							justify={'center'}
							align="center"
							position={'relative'}
						>
							<Tag
								position={'absolute'}
								top={'-10px'}
								right={'-10px'}
								size={'sm'}
								variant="solid"
								colorScheme="brand"
							>
								<TagLabel>
									<AiOutlineEdit />
								</TagLabel>
							</Tag>
							<Image
								bg={'gray.100'}
								borderRadius={7}
								border={'2px solid'}
								borderColor={'brand.200'}
								m={'-1px'}
								w={'101%'}
								h={'101%'}
								objectFit={'cover'}
								src={imageUpload?URL.createObjectURL(imageUpload):user.photo}
							/>
						</Box>
						<Input
							placeholder="Upload your resume"
							type="file"
							m={0}
							pos={'absolute'}
							p={0}
							h={0}
							w={0}
							visibility={'hidden'}
							accept="image/jpeg, image/png, image/jpg"
							onChange={(e) => setImageUpload(e.target?.files[0])}
						/>
					</FormLabel>
					<Grid
						maxW={'4xl'}
						w={'100%'}
						m={'auto'}
						templateRows="repeat(5, 1fr)"
						templateColumns="repeat(4, 1fr)"
						gap={4}
					>
						<GridItem colSpan={4}>
							<VStack align={'left'} fontWeight={'600'} gap={1}>
								<Text pl={2}>Full Name</Text>
								<Input
									border={'2px solid'}
									borderColor={'brand.200'}
									placeholder="Your First Name"
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
							</VStack>
						</GridItem>
						<GridItem colSpan={4}>
							<VStack
								align={'left'}
								fontWeight={'600'}
								gap={1}
								w={'100%'}
							>
								<Text pl={2}>Email</Text>
								<Input
									border={'2px solid'}
									borderColor={'brand.200'}
									placeholder="Your Email"
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</VStack>
						</GridItem>
						<GridItem colSpan={4}>
							<VStack
								align={'left'}
								fontWeight={'600'}
								gap={1}
								w={'100%'}
							>
								<Text pl={2}>Phone Number</Text>
								<InputGroup>
									<InputLeftElement
										pointerEvents="none"
										bg={'#00000009'}
									>
										<BsTelephoneFill color="gray.300" />
									</InputLeftElement>
									<Input
										border={'2px solid'}
										borderColor={'brand.200'}
										type="tel"
										placeholder="Phone number"
										pl={'50px'}
										value={phone}
										onChange={(e) =>
											setPhone(e.target.value)
										}
									/>
								</InputGroup>
							</VStack>
						</GridItem>
						<GridItem colSpan={4} rowSpan={2}>
							<VStack
								align={'left'}
								fontWeight={'600'}
								gap={1}
								w={'100%'}
							>
								<Text pl={2}>About</Text>
								<Textarea
									border={'2px solid'}
									borderColor={'brand.200'}
									placeholder="Your summary"
									rows={4}
									resize={'none'}
									value={about}
									onChange={(e) => setAbout(e.target.value)}
								/>
							</VStack>
						</GridItem>
					</Grid>
				</Stack>
			</Box>
			<HStack
				justify={'space-between'}
				fontWeight={'600'}
				w={'100%'}
				gap={1}
				py={{ md: 10, base: 5 }}
			>
				<HStack>
					<Button
						display={stepIndex == 0 ? 'none' : 'flex'}
						onClick={decrementStep}
					>
						Back
					</Button>
				</HStack>
				<HStack>
					{stepIndex < 3 && (
						<Button
							bg={
								'linear-gradient(61deg, #EBF1FD 60%, transparent)'
							}
							bgSize={'130%'}
							bgPos={'bottom'}
							_hover={{ bgPos: 'left' }}
							color={'dark'}
							border={'2px solid'}
							borderColor={'brand.300'}
							transition={'0.25s'}
							colorScheme="brand"
							onClick={() => {
								onSave();
							}}
						>
							Save Details
						</Button>
					)}
					{stepIndex < 2 && (
						<Button colorScheme="brand" onClick={incrementStep}>
							Next
						</Button>
					)}
				</HStack>
			</HStack>
		</>
	);
};

export default BasicInfo;
