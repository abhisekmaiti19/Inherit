import {
	Box,
	Card,
	CardBody,
	Heading,
	Image,
	Stack,
	Text,
} from '@chakra-ui/react';

import { useContext, useEffect, useState } from 'react';
import DashboardContext from '../Store/DashboardContext';
import GlobalContext from '../Store/GlobalContext';

const EnrolledCourse = () => {
	const {getApplicationStatus} = useContext(DashboardContext);
	const {batches} = useContext(GlobalContext);
	const [application, setApplication] = useState({});
	
	const setApplicationStatus = async ()=>{
		const res = await getApplicationStatus();
		if(res) {
			res['batch'] = batches.filter((b)=>b._id==res.batchId)[0];
			setApplication(res);
			console.log(res)
		}
	}
	
	useEffect(()=> {
		setApplicationStatus();
	}, [])

	return (
		<Stack direction={'column'} w={'100%'}>
			<Card
				direction={{ base: 'column', sm: 'row' }}
				variant="outline"
				alignItems={'start'}
				w={'100%'}
				position={'relative'}
				border={'2px solid'}
				borderColor={'gray.200'}
			>
				<Image
					maxW={{ base: '100%', sm: '200px' }}
					w={{ base: '95%', sm: '200px' }}
					aspectRatio={'4/3'}
					src={application?.batch?.batchImg}
					alt="Course Image"
                    m={3}
                    my={2}
					objectFit={'fill'}
                    border={'1px solid'}
                    borderColor={'brand.100'}
                    borderRadius={10}
				/>
				<Box
				position={'absolute'}
				bg={application?.isAccepted?'green.500': 'red.500'}
				minH={'5'}
				minW={'5'}
				borderRadius={'50%'}
				top={'-10px'}
				right={'-10px'}
				></Box>
				<Stack>
					<CardBody>
						<Heading fontSize={{base: '5.5vw', sm: '4vw', lg: 36}}  color={'brand.900'}>{application.courseName}</Heading>

						<Text py="2" color={'brand.900'} fontWeight={500}>
                            <Text as={'span'} fontSize={{base: 14, sm: 15, md: 17}} fontWeight={600}>Instructor: </Text> {application?.batch?.teacher}
                            <br />
                            <Text as={'span'} fontSize={{base: 14, sm: 15, md: 17}} fontWeight={600}>Start Date: </Text> {new Date(application?.batch?.batchStart).toDateString()}
                            <br />
						</Text>
					</CardBody>
				</Stack>
			</Card>
		</Stack>
	);
};

export default EnrolledCourse;
