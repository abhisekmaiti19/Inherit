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
	Image,
	Input,
	Select,
	Tag,
	TagCloseButton,
	TagLabel,
	Text,
	Textarea,
	VStack,
	useToast,
} from '@chakra-ui/react';
import { v4 } from 'uuid';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useContext, useState } from 'react';
import { storage } from '../../firebase';
import DashboardContext from '../../Store/DashboardContext';

const CreateBatch = () => {
	const [course, setCourse] = useState('');
	const [reg_end, setRegEnd] = useState(new Date().toISOString());
	const [batch_start, setBatchStart] = useState(new Date().toISOString());
	const [bannerImage, setBannerImage] = useState(null);
	const [teacher, setTeacher] = useState('');
	const [description, setDescription] = useState('');
	const [elig, setelig] = useState([]);

	const toast = useToast();
	const { publishBatch } = useContext(DashboardContext);

	const uploadImage = async () => {
		if (bannerImage == null) return null;
		const imageRef = ref(storage, `batches/${v4()}`);
		try {
			toast({
				title: 'Uploading Image',
				status: 'info',
				duration: 3000,
				isClosable: true,
			});
			const res = await uploadBytes(imageRef, bannerImage);
			toast({
				title: 'Image Uploaded',
				status: 'success',
				duration: 3000,
				isClosable: true,
			});
			const link = await getDownloadURL(res.ref);
			return link;
		} catch (e) {
			toast({
				title: 'Image Upload failed',
				description: e,
				status: 'error',
				duration: 3000,
				isClosable: true,
			});
			return null;
		}
	};

	const onPublish = async () => {
		let imageLink = await uploadImage();
		let data = {
			course,
			reg_end,
			batch_start,
			teacher,
			description,
			elig,
		};
		if (imageLink !== null) data.bannerImageUrl = imageLink;
		const res = await publishBatch(data);
		if (res.ok) {
			toast({
				title: 'Created Batch',
				status: 'success',
				duration: 3000,
				isClosable: true,
			});

			setCourse('');
			setRegEnd(new Date().toISOString());
			setBatchStart(new Date().toISOString());
			setBannerImage(null);
			setTeacher('');
			setDescription('');
			setelig([]);
		} else {
			toast({
				title: 'Error creating batch',
				description: res.data,
				status: 'error',
				duration: 3000,
				isClosable: true,
			});
		}
	};

	return (
		<Box pb={10}>
			<Heading fontSize={'3xl'} mb={10}>
				Create New Batch
			</Heading>
			<Grid
				maxW={'4xl'}
				m={'auto'}
				templateColumns="repeat(4, 1fr)"
				rowGap={8}
				gap={4}
			>
				<GridItem colSpan={{ base: 4, md: 2 }}>
					<VStack align={'start'} fontWeight={'600'} gap={1}>
						<Text pl={2}>Select Course</Text>
						<Select
							placeholder="Select Course"
							value={course}
							onChange={(e) => setCourse(e.target.value)}
						>
							{[
								'PHP 101',
								'Javascript Front to Back',
								'JAVA Fullstack Development',
								'MERN Fullstack Development',
								'MEAN Fullstack Development',
								'MEVN Fullstack Development',
							].map((c) => (
								<option key={c} value={c}>
									{c}
								</option>
							))}
						</Select>
					</VStack>
				</GridItem>
				<GridItem colSpan={{ base: 4, md: 2 }}>
					<VStack align={'start'} fontWeight={'600'} gap={1}>
						<Text pl={2}>Registration End Date</Text>
						<Input
							placeholder="Registration End Date"
							type="date"
							value={reg_end.split('T')[0]}
							onChange={(e) => setRegEnd(e.target.value)}
						/>
					</VStack>
				</GridItem>
				<GridItem colSpan={{ base: 4, md: 2 }}>
					<VStack align={'start'} fontWeight={'600'} gap={1}>
						<Text pl={2}>Batch Start Date</Text>
						<Input
							placeholder="Batch Start Date"
							type="date"
							value={batch_start.split('T')[0]}
							onChange={(e) => setBatchStart(e.target.value)}
						/>
					</VStack>
				</GridItem>
				<GridItem
					colSpan={{ base: 4, md: 2 }}
					rowSpan={{ md: 2, base: 6 }}
					colStart={{ md: 3 }}
					rowStart={{ md: 1 }}
				>
					<VStack
						align={'start'}
						h={'100%'}
						w={'100%'}
						fontWeight={'600'}
						gap={1}
					>
						<Text pl={2}>Course Banner Image</Text>
						<FormLabel w={'100%'} h={'100%'} m={0}>
							{bannerImage ? (
								<Box
									border={'1px solid'}
									borderColor={'gray.200'}
									borderRadius={5}
									overflow={'hidden'}
								>
									<Image
										maxH={{ base: 100, md: 150 }}
										h={'100%'}
										w={'100%'}
										objectFit={'contain'}
										src={URL.createObjectURL(bannerImage)}
									/>
								</Box>
							) : (
								<Box
									display={'flex'}
									justifyContent={'center'}
									alignItems={'center'}
									color={'gray.600'}
									p={3}
									py={2}
									borderRadius={5}
									border={'2px dashed'}
									borderColor={'gray.300'}
									w={'100%'}
									h={'100%'}
									textAlign={'center'}
									cursor={'pointer'}
									transition={'0.25s'}
									_hover={{ borderColor: 'gray.400' }}
								>
									Choose From Files / Drag and Drop
								</Box>
							)}
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
									setBannerImage(e.target?.files[0])
								}
							/>
							<Text fontSize={'xx-small'}></Text>
						</FormLabel>
					</VStack>
				</GridItem>
				<GridItem
					colSpan={{ base: 4, md: 2 }}
					rowSpan={{ md: 2, base: 6 }}
					colStart={{ md: 3 }}
					rowStart={{ md: 3 }}
				>
					<VStack
						align={'start'}
						h={'100%'}
						w={'100%'}
						fontWeight={'600'}
						gap={1}
					>
						<Text pl={2}>Course Description</Text>
						<Textarea
							resize={{ md: 'none' }}
							placeholder="Write Course description"
							w={'100%'}
							h={'100%'}
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</VStack>
				</GridItem>
				<GridItem colSpan={{ base: 4, md: 2 }}>
					<VStack align={'start'} fontWeight={'600'} gap={1}>
						<Text pl={2}>Teacher</Text>
						<Input
							placeholder="Teacher Name"
							value={teacher}
							onChange={(e) => setTeacher(e.target.value)}
						/>
					</VStack>
				</GridItem>
				<GridItem colSpan={4} rowSpan={3}>
					<VStack align={'start'} fontWeight={'600'} gap={1}>
						<Text pl={2}>Eligibility</Text>
						<FormControl>
							<Input
								placeholder="Type you skills"
								value={elig.join(',')}
								onChange={(e) =>
									setelig(e.target.value.split(','))
								}
							/>
							<FormHelperText fontSize={'xx-small'}>
								Your skills should be separated by comma
							</FormHelperText>
						</FormControl>
						<HStack flexWrap={'wrap'} overflowY={'auto'} w={'100%'}>
							{elig.map((el, index) => (
								<Tag
									size={'sm'}
									key={index}
									variant="solid"
									colorScheme="brand"
								>
									<TagLabel>{el}</TagLabel>
									<TagCloseButton
										onClick={() =>
											setelig(
												elig.filter((i) => el !== i)
											)
										}
									/>
								</Tag>
							))}
						</HStack>
					</VStack>
				</GridItem>
				<GridItem colSpan={4}>
					<HStack w={'100%'} justify={'end'}>
						<Button onClick={onPublish}>Publish</Button>
					</HStack>
				</GridItem>
			</Grid>
		</Box>
	);
};

export default CreateBatch;
