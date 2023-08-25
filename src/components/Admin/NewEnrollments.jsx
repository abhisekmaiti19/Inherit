import {
	Button,
	FormControl,
	FormHelperText,
	FormLabel,
	Input,
	InputGroup,
	InputRightAddon,
	Stack,
	TabPanel,
} from '@chakra-ui/react';
import { BsSend } from 'react-icons/bs';
import FilterStudents from './FilterStudents';
import TableFlex from './TableFlex';

const NewEnrollments = () => {
	const data = [
		{
			FAID: '0011',
			DOR: '2023-05-11',
			Name: 'Abhisek Maiti',
			Course: 'Java Full Stack',
			Email: 'abhi@gmail.com',
			Phone: '',
			College: 'Future Institute of Engineering and Management',
			CourseType: 'BTech',
			Experience: '0',
			Resume: 'http://google',
		},
	];

	return (
		<TabPanel p={{base: 0, lg: 4}}>
			<Stack
				py={8}
				direction={{ base: 'column', lg: 'row' }}
				gap={{ base: 4, lg: '5vw' }}
				w={'100%'}
			>
				<FilterStudents />
				<Stack direction={'row'} w={'100%'}>
					<FormControl>
						<FormLabel>Test Date</FormLabel>
						<Input placeholder="Deadline: dd/mm/yyyy" />
					</FormControl>
					<FormControl>
						<FormLabel>Test Link</FormLabel>
						<InputGroup>
							<Input placeholder="Test Link here" />
							<InputRightAddon p={0}>
								<Button>
									<BsSend />
								</Button>
							</InputRightAddon>
						</InputGroup>
						<FormHelperText fontSize={'xx-small'}>
							Careful once a link will send that can’t be editable
						</FormHelperText>
					</FormControl>
				</Stack>
			</Stack>
			<TableFlex headings={Object.keys(data[0])} data={data} />
		</TabPanel>
	);
};

export default NewEnrollments;
