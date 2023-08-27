import { Box, HStack, Heading, Image, Text, VStack } from '@chakra-ui/react';
import { useContext } from 'react';
import GlobalContext from '../../Store/GlobalContext';

const PublishedBatches = () => {
	const { batches } = useContext(GlobalContext);
	return (
		<Box>
			<Heading fontSize={'3xl'} mb={10}>
				Published Batches
			</Heading>
			<HStack w={'100%'} overflowY={'auto'} gap={5} align={'start'}
             style={{ '&::WebkitScrollbar': { width: 0, height: 0 } }}
            >
				{batches.map((batch, index) => (
					<VStack key={index} align={'left'}
                    w={'200px'}
							minW={'200px'}
                    >
						<Image
							src={batch.batchImg}
							w={'100%'}
							minW={'100%'}
							h={'150px'}
							minH={'90px'}
							bg={'gray.100'}
							border={'1px solid'}
							borderColor={'gray.300'}
							borderRadius={5}
                            objectFit={'cover'}
						/>
						<Box>
							<Text fontWeight={500} fontSize={'sm'}>{batch.courseName}</Text>
							<Text fontSize={'xs'}>
								{batch.teacher}
							</Text>
						</Box>
					</VStack>
				))}
			</HStack>
		</Box>
	);
};

export default PublishedBatches;
