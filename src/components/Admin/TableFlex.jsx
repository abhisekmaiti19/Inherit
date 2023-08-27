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

const TableFlex = ({ headings = [], data = [], hasFunction=false, acceptOption={}, declineOption={}, caption='New Enrollments (All Batches)' }) => {
	return (
		<Box w={'100%'} overflowX={'auto'}>
			<TableContainer>
				<Table variant="simple">
					<TableCaption>
						{caption}
					</TableCaption>
					<Thead>
						<Tr>
							{headings.map((heading, i) => (
								<Th key={i}>{heading}</Th>
							))}
							{hasFunction && <Th>Actions</Th>}
						</Tr>
					</Thead>
					<Tbody>
						{data.map((row, i) => (
							<TableRow key={i} keyS={{userId: row.userId, batchId: row.batchId}} rowData={{
								...headings.map((h)=>row[h])
							}} hasFunction={hasFunction} acceptOption={acceptOption} declineOption={declineOption}/>
						))}
					</Tbody>
				</Table>
			</TableContainer>
		</Box>
	);
};

export default TableFlex;
