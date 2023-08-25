/* eslint-disable react/prop-types */
import {
	Box,
	Button,
	FormControl,
	FormHelperText,
	FormLabel,
	Grid,
	GridItem,
	HStack,
	Heading,
	Input,
	Tag,
	TagCloseButton,
	TagLabel,
	Text,
	VStack,
	useToast,
} from '@chakra-ui/react';
import { useContext, useState } from 'react';
import DashboardContext from '../../Store/DashboardContext';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../firebase';
import { Link } from 'react-router-dom';

const Experience = ({ user, stepIndex, decrementStep, incrementStep }) => {
	const [company, setCompany] = useState(user.company);
	const [role, setRole] = useState(user.role);
	const [start_date, setStartDate] = useState(user.start_date);
	const [end_date, setEndDate] = useState(user.end_date);
	const [resume, setResume] = useState(user.resume);
	const [skills, setSkills] = useState(user.skills);

	const [resumeUpload, setResumeUpload] = useState(user.resumeUpload);

	const toast = useToast();
	const { updateProfile } = useContext(DashboardContext);

	const uploadResume = async () => {
		if (resumeUpload == null) return null;
		const resumeRef = ref(storage, `resumes/${user._id}`);
		try {
			toast({
				title: 'Uploading Resume',
				status: 'info',
				duration: 3000,
				isClosable: true,
			});
			const res = await uploadBytes(resumeRef, resumeUpload);
			toast({
				title: 'Resume Uploaded',
				status: 'success',
				duration: 3000,
				isClosable: true,
			});
			const link = await getDownloadURL(res.ref);
			return link;
		} catch (e) {
			toast({
				title: 'Resume Upload failed',
				description: e,
				status: 'error',
				duration: 3000,
				isClosable: true,
			});
		}
	};

	const onSave = async () => {
		const link = await uploadResume();
		if (link) setResume(link);

		const { status, message } = await updateProfile({
			company,
			role,
			start_date,
			end_date,
			resume,
			skills: skills.filter((i) => i != ''),
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
					Experience Details
				</Heading>
				<Grid
					maxW={'4xl'}
					m={'auto'}
					templateRows="repeat(4, 1fr)"
					templateColumns="repeat(4, 1fr)"
					gap={4}
				>
					<GridItem colSpan={2}>
						<VStack align={'start'} fontWeight={'600'} gap={1}>
							<Text pl={2}>Company Name</Text>
							<Input
								placeholder="ABC Company"
								value={company}
								onChange={(e) => setCompany(e.target.value)}
							/>
						</VStack>
					</GridItem>
					<GridItem colSpan={2}>
						<VStack align={'start'} fontWeight={'600'} gap={1}>
							<Text pl={2}>Designation</Text>
							<Input
								placeholder="Your Role in Company"
								value={role}
								onChange={(e) => setRole(e.target.value)}
							/>
						</VStack>
					</GridItem>
					<GridItem colSpan={2}>
						<VStack align={'start'} fontWeight={'600'} gap={1}>
							<Text pl={2}>Start Date</Text>
							<Input
								placeholder="Your Role in Company"
								type="date"
								value={start_date.split('T')[0]}
								onChange={(e) => setStartDate(e.target.value)}
							/>
						</VStack>
					</GridItem>
					<GridItem colSpan={2}>
						<VStack align={'start'} fontWeight={'600'} gap={1}>
							<Text pl={2}>End Date</Text>
							<Input
								placeholder="Your Role in Company"
								type="date"
								value={end_date.split('T')[0]}
								onChange={(e) => setEndDate(e.target.value)}
							/>
						</VStack>
					</GridItem>
					<GridItem colSpan={4} rowSpan={2}>
						<VStack align={'start'} fontWeight={'600'} gap={1}>
							<Text pl={2}>Your Resume/CV</Text>
							<FormLabel w={'100%'}>
								<Text
									color={'gray.600'}
									p={3}
									py={2}
									borderRadius={5}
									border={'2px dashed'}
									borderColor={'gray.300'}
									w={'100%'}
									textAlign={'center'}
									cursor={'pointer'}
									transition={'0.25s'}
									_hover={{ borderColor: 'gray.400' }}
								>
									{resumeUpload
										? resumeUpload.name
										: 'Drag and Drop/ Choose from device'}
								</Text>
								<Input
									placeholder="Upload your resume"
									type="file"
									m={0}
									pos={'absolute'}
									p={0}
									h={0}
									w={0}
									visibility={'hidden'}
									onChange={(e) =>
										setResumeUpload(e.target?.files[0])
									}
								/>
							</FormLabel>
							<Tag
								size={'lg'}
								h={'60px'}
								w={100}
								textOverflow={'ellipsis'}
								fontSize={'sm'}
								variant="outline"
								colorScheme="brand"
								justifyContent={'center'}
							>
								<TagLabel as={Link} target="_blank" to={resume}>
									{resume && resume.trim() != ''
										? 'View'
										: 'Upload Your CV'}
								</TagLabel>
							</Tag>
						</VStack>
					</GridItem>
					<GridItem colSpan={4} rowSpan={3}>
						<VStack align={'start'} fontWeight={'600'} gap={1}>
							<Text pl={2}>Skills</Text>
							<FormControl>
								<Input
									placeholder="Type you skills"
									value={skills.join(',')}
									onChange={(e) =>
										setSkills(e.target.value.split(','))
									}
								/>
								<FormHelperText fontSize={'xx-small'}>
									Your skills should be separated by comma
								</FormHelperText>
							</FormControl>
							<HStack
								flexWrap={'wrap'}
								overflowY={'auto'}
								w={'100%'}
							>
								{skills.map((skill, index) => (
									<Tag
										size={'sm'}
										key={index}
										variant="solid"
										colorScheme="brand"
									>
										<TagLabel>{skill}</TagLabel>
										<TagCloseButton
											onClick={() =>
												setSkills(
													skills.filter(
														(i) => skill !== i
													)
												)
											}
										/>
									</Tag>
								))}
							</HStack>
						</VStack>
					</GridItem>
				</Grid>
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

export default Experience;
