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
import { useState } from 'react';
import { Link as LinkRouter } from 'react-router-dom';
import { BsOption } from 'react-icons/bs';


const data = [
    {
        title: 'Application Submission',
        complete: true,
        body: [
            {
                title: 'You Have Successfully applied for Java Fullstack Developer Course',
                status: 'green',
            },
        ],
    },
    {
        title: 'Admission Test',
        complete: true,
        body: [
            {
                title: 'Your application is shortlisted for Java Fullstack Developer Course',
                status: 'green',
            },
            {
                linkUrl: 'https://google.com',
                linkTitle: 'Join',
                title: 'Complete test',
                description: 'Deadline: 30th Aug, 2023 12:00PM',
            },
        ],
    },
    {
        title: 'Waiting for the next steps',
        description: 'One-on-One Interview',
        complete: false,
    },
]

//const data = [];

const ApplicationStatus = () => {
	const [steps] = useState(data);

	const [step] = useState(steps.filter((s) => s.complete).length);

	return (
		<Stack direction={'column'} w={'100%'}>
			{steps.length == 0 && (
				<Center
					display={'flex'}
					flexDir="column"
					h={'100%'}
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
				index={step}
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
