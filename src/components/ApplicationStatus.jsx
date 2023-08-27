import {
	Box,
	Button,
	Center,
	HStack,
	Link,
	Stack,
	Step,
	StepDescription,
	StepIcon,
	StepIndicator,
	StepSeparator,
	StepStatus,
	StepTitle,
	Stepper,
	Text,
} from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { Link as LinkRouter } from 'react-router-dom';
import { BsOption } from 'react-icons/bs';
import DashboardContext from '../Store/DashboardContext';

const ApplicationStatus = () => {
	const {getApplicationStatus} = useContext(DashboardContext);
	const [steps, setSteps] = useState([]);

	const setApplicationSteps = async()=>{
		const res = await getApplicationStatus();
		if (res!==null) {
			const data = [];

			data.push({
				title: 'Application Submission',
				complete: true,
				body: [
					{
						title: `You Have Successfully applied for ${res?.courseName} Course`,
						status: 'green',
					},
				],
			});

			if(res.isShortlistedForExam!==null){
				let sub = {
					title: 'Admission Test',
					complete: true,
					body: [
						{
							title: `Your application is ${res.isShortlistedForExam?'':'not'} shortlisted for ${res?.courseName} Course`,
							status: res.isShortlistedForExam?'green':'red',
						},
					],
				};
				if(res.examLink)
					sub.body.push({
						linkUrl: res.examLink.split('#')[0],
						linkTitle: 'Test Link',
						title: 'Complete test',
						description: res.examLink.split('#')[1],
					})
				data.push(sub)
			} else {
				data.push({
					title: 'Waiting for the next steps',
					description: 'Admission Test',
					complete: false
				})
				setSteps(data);
				return
			}
			if(res.isShortlistedForInterview!==null){
				let sub = {
					title: 'Interview',
					complete: true,
					body: [
						{
							title: `Your application is ${res.isShortlistedForInterview?'':'not'} shortlisted for Interview`,
							status: res.isShortlistedForInterview?'green':'red',
						},
					],
				};
				if(res.interviewLink)
					sub.body.push({
						linkUrl: res.interviewLink.split('#')[0],
						linkTitle: 'Join',
						title: 'Interview is Scheduled',
						description: res.interviewLink.split('#')[1],
					})
				data.push(sub)
			} else {
				data.push({
					title: 'Waiting for the next steps',
					description: 'Interview',
					complete: false
				})
				setSteps(data);
				return
			}
			if(res.isAccepted!==null){
				let sub = {
					title: 'Selection Results',
					complete: true,
					body: [
						{
							title: `Your application is ${res.isAccepted?'':'not'} Selected`,
							status: res.isAccepted?'green':'red',
						},
					],
				};
				data.push(sub)
			} else {
				data.push({
					title: 'Waiting for the next steps',
					description: 'Selection Results',
					complete: false
				})
				setSteps(data);
				return
			}

			if(!res.isShortlistedForExam || !res.isShortlistedForInterview || !res.isAccepted) {
				data.push({
					title: `Candidature Rejected`,
					complete: true,
				})
			}

			setSteps(data);
		}
	}

	useEffect(()=>{
		setApplicationSteps();
	}, []);

	return (
		<Stack direction={'column'} w={'100%'}>
			{steps.length == 0 && (
				<Center
					display={'flex'}
					flexDir="column"
					h={'100%'}
					py={10}
					gap={15}
					border={'1px dotted'}
					borderColor={'brand.200'}
					borderRadius={20}
				>
					<Text color={'brand.300'}>
						<BsOption size={60} />
					</Text>
					<Text color={'brand.300'} fontWeight={'600'}>
						You have not applied to any Courses
					</Text>
					<Button
						as={LinkRouter}
						size={'sm'}
						p={1}
						bg={'linear-gradient(129deg, #6D10FC 0%, #F96295 100%)'}
						bgSize={'150%'}
						transition={'0.25s'}
						_hover={{ bgPos: 'top right' }}
						to={''}
					>
						<Text
							fontWeight={600}
							fontSize={'sm'}
							bg={'#fff'}
							color={'brand.500'}
							p={1}
							borderRadius={3}
						>
							Apply Now
						</Text>
					</Button>
				</Center>
			)}
			<Stepper
				index={steps.filter((s) => s.complete).length}
				orientation="vertical"
				minH="200px"
				w={'100%'}
				gap="0"
				colorScheme="brand"
			>
				{steps.map((step, index) => (
					<Step key={index} w={'100%'}>
						<StepIndicator>
							<StepStatus complete={<StepIcon />} />
						</StepIndicator>

						<Box flexShrink="0" w={'85%'}>
							<StepTitle>{step.title}</StepTitle>
							<StepDescription w={'100%'} as='div'>
								{step.description}
								<Box pb={10}>
									{step.body?.map((sub, i) => (
										<HStack
											key={i}
											w={'100%'}
											justifyContent={'space-between'}
											m={3}
											p={3}
											border={'2px dashed'}
											borderColor={`${
												sub.status || 'blue'
											}.200`}
											borderRadius={10}
											fontWeight={600}
											color={`${
												sub.status || 'blue'
											}.500`}
										>
											<Box>
												<Text>{sub.title}</Text>
												<Text fontSize={'xs'}>
													{sub.description}
												</Text>
											</Box>
											{sub.linkUrl && (
												<Link
													border={'2px solid'}
													px={2}
													py={1}
													borderRadius={8}
													target="_blank"
													href={sub.linkUrl}
												>
													{sub.linkTitle}
												</Link>
											)}
										</HStack>
									))}
								</Box>
							</StepDescription>
						</Box>

						<StepSeparator />
					</Step>
				))}
			</Stepper>
		</Stack>
	);
};

export default ApplicationStatus;
