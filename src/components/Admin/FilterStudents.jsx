import {
	Button,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	InputRightAddon,
	Select,
	Stack,
} from '@chakra-ui/react';
import { BsSearch } from 'react-icons/bs';

const FilterStudents = () => {
	return (
		<Stack direction={'row'} w={'100%'}>
			<FormControl>
				<FormLabel>Search students</FormLabel>
				<InputGroup>
					<Input placeholder="Search by name, faid or email" />
					<InputRightAddon p={0}>
						<Button>
							<BsSearch />
						</Button>
					</InputRightAddon>
				</InputGroup>
			</FormControl>
			<FormControl>
				<FormLabel>Filter by course</FormLabel>
				<Select>
					<option value="all">All</option>
					<option value="option1">Option 1</option>
					<option value="option2">Option 2</option>
					<option value="option3">Option 3</option>
				</Select>
			</FormControl>
		</Stack>
	);
};

export default FilterStudents;
