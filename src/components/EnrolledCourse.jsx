import {
	Card,
	CardBody,
	Heading,
	Image,
	Stack,
	Text,
} from '@chakra-ui/react';

import CourseImage from '../assets/cuate.png';

const EnrolledCourse = () => {
	return (
		<Stack direction={'column'} w={'100%'}>
			<Card
				direction={{ base: 'column', sm: 'row' }}
				variant="outline"
			>
				<Image
					objectFit="contain"
					maxW={{ base: '100%', sm: '200px' }}
					src={CourseImage}
					alt="Caffe Latte"
                    m={3}
                    border={'1px solid'}
                    borderColor={'brand.100'}
                    borderRadius={10}
				/>

				<Stack>
					<CardBody>
						<Heading fontSize={{base: '5.5vw', sm: '4vw', lg: 36}}  color={'brand.900'}>Java Fullstack Development </Heading>

						<Text py="2" color={'brand.900'} fontWeight={500}>
                            <Text as={'span'} fontSize={{base: 14, sm: 15, md: 17}} fontWeight={600}>Instructor: </Text> Richa Aurora
                            <br />
                            <Text as={'span'} fontSize={{base: 14, sm: 15, md: 17}} fontWeight={600}>Start Date: </Text> 15th Sep, 2023
                            <br />
                            <Text as={'span'} fontSize={{base: 14, sm: 15, md: 17}} fontWeight={600}>Duration: </Text> 10 Weeks
                            <br />
						</Text>
					</CardBody>
				</Stack>
			</Card>
		</Stack>
	);
};

export default EnrolledCourse;
