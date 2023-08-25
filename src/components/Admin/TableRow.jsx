/* eslint-disable react/prop-types */
import { Button, HStack, Link, Td, Tr } from '@chakra-ui/react';
import { BsCheckLg, BsXLg } from 'react-icons/bs';

const TableRow = ({ rowData = {} }) => {
	const pattern = /(www|http:|https:)+[^\s]+[\w]/;
	return (
		<Tr>
			{Object.values(rowData).map((field, i) => (
				<Td key={i}>
					{pattern.test(field) ? (
						<Link color={'blue.500'} href={field}>{field}</Link>
					) : (
						field
					)}
				</Td>
			))}
            <Td>
                <HStack>
                    <Button size={'xs'} colorScheme='green'>
                        <BsCheckLg /> 
                    </Button>
                    <Button size={'xs'} colorScheme='red'>
                        <BsXLg /> 
                    </Button>
                </HStack>
            </Td>
		</Tr>
	);
};

export default TableRow;
