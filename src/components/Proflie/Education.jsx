/* eslint-disable react/prop-types */
import {
	Box,
	Button,
	HStack,
	Heading,
	Input,
	Select,
	SimpleGrid,
	Text,
	VStack,
	useToast,
} from '@chakra-ui/react';
import { useContext, useState } from 'react';
import DashboardContext from '../../Store/DashboardContext';

const Education = ({ user, stepIndex, decrementStep, incrementStep }) => {
	const [college, setCollege] = useState(user.college);
	const [course, setCourse] = useState(user.course);
	const [cgpa, setCgpa] = useState(user.cgpa);
	const [yog, setYog] = useState(user.yog);

	const toast = useToast();
	const { updateProfile } = useContext(DashboardContext);

	const onSave = async () => {
		const { status, message } = await updateProfile({
			college,
			course,
			cgpa,
			yog,
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
					Education Details
				</Heading>
				<SimpleGrid
					columns={2}
					spacing={10}
					w={'100%'}
					maxW={'4xl'}
					m={'auto'}
					align={'center'}
					gap={5}
					mb={'10vh'}
				>
					<VStack align={'start'} fontWeight={'600'} gap={1}>
						<Text pl={2}>University/College</Text>
						<Input
							placeholder="Your University/College"
							value={college}
							onChange={(e) => setCollege(e.target.value)}
						/>
					</VStack>
					<VStack align={'start'} fontWeight={'600'} gap={1}>
						<Text pl={2}>Course</Text>
						<Select
							placeholder="Select your course"
							value={course}
							onChange={(e) => setCourse(e.target.value)}
						>
							{[
								'Btech in Computer Science',
								'Btech in other streams',
								'Bachelor of Computer Application',
							].map((c) => (
								<option key={c} value={c}>
									{c}
								</option>
							))}
						</Select>
					</VStack>
					<VStack align={'start'} fontWeight={'600'} gap={1}>
						<Text pl={2}>Year of Graduation</Text>
						<Select
							placeholder="Your Graduation Year"
							value={yog}
							onChange={(e) => setYog(e.target.value)}
						>
							{[2022, 2023, 2024, 2025].map((year) => (
								<option key={year} value={year}>
									{year}
								</option>
							))}
						</Select>
					</VStack>
					<VStack align={'start'} fontWeight={'600'} gap={1}>
						<Text pl={2}>CGPA</Text>
						<Input
							placeholder="Your Overall GPA"
							value={cgpa}
							onChange={(e) => setCgpa(e.target.value)}
						/>
					</VStack>
				</SimpleGrid>
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

export default Education;
