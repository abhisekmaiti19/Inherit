/* eslint-disable react/prop-types */
import {
	Box,
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	TableCaption,
	TableContainer,
} from '@chakra-ui/react';
import TableRow from './TableRow';

const TableFlex = ({ headings = [], data = [] }) => {
	return (
		<Box w={'100%'} overflowX={'auto'}>
			<TableContainer>
				<Table variant="simple">
					<TableCaption>
						New Enrollments (All Batches)
					</TableCaption>
					<Thead>
						<Tr>
							{headings.map((heading, i) => (
								<Th key={i}>{heading}</Th>
							))}
							<Th>Actions</Th>
						</Tr>
					</Thead>
					<Tbody>
						{data.map((row, i) => (
							<TableRow key={i} rowData={row} />
						))}
					</Tbody>
				</Table>
			</TableContainer>
		</Box>
	);
};

export default TableFlex;
