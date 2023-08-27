import {
	Box,
	Button,
	Center,
	HStack,
	Heading,
	Image,
	Text,
	VStack,
	useToast,
} from '@chakra-ui/react';
import { useContext } from 'react';
import GlobalContext from '../Store/GlobalContext';

const Home = () => {
	const { batches, applyCourse } = useContext(GlobalContext);
	const toast = useToast();

	const onApply = async (batchId, courseName) => {
		const res = await applyCourse(batchId, courseName);
		if (res.ok) {
			toast({
				title: 'Applied Successfully',
        description: courseName,
				status: 'success',
				duration: 3000,
				isClosable: true,
			});
		} else {
			toast({
				title: 'Cannot Apply',
				status: 'error',
				duration: 3000,
				isClosable: true,
			});
		}
	};

	return (
		<>
			<Center
				flexDirection={'column'}
				gap={5}
				px={{ base: 5, md: 10, lg: 20, xl: 40 }}
				pt={5}
			>
				<Heading>Our Courses</Heading>
				<HStack w={'100%'} flexWrap={'wrap'} gap={5} pb={5} justify={'space-evenly'}>
					{batches.map((batch, index) => (
						<VStack
							key={index}
							align={'left'}
							w={'200'}
							minW={500}
              maxW={500}
							border={'1px solid'}
							borderColor={'gray.300'}
							p={4}
							borderRadius={5}
						>
							<Image
								src={batch.batchImg}
								w={'100%'}
								h={'150px'}
								objectFit={'cover'}
								minW={'120px'}
								minH={'90px'}
								bg={'gray.100'}
								borderRadius={5}
							/>
							<Box>
								<Text fontWeight={500} fontSize={'sm'}>{batch.courseName}</Text>
								<Text fontSize={'xs'}>
									By {batch.teacher}
								</Text>
							</Box>
							<Button
								colorScheme="brand"
								onClick={() => onApply(batch._id, batch.courseName)}
							>
								Apply
							</Button>
						</VStack>
					))}
				</HStack>
				
			
			
			</Center>

			
		</>
	);
};

export default Home;
