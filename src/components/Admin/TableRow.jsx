/* eslint-disable react/prop-types */
import { Button, HStack, Link, Td, Text, Tr } from '@chakra-ui/react';
import { BsCheckLg, BsXLg } from 'react-icons/bs';
import DashboardContext from '../../Store/DashboardContext';
import { useContext } from 'react';

const TableRow = ({ rowData = {}, keyS={}, hasFunction=false, acceptOption={}, declineOption={} }) => {
	const {updateEnrollment} = useContext(DashboardContext);

	const pattern = /(www|http:|https:)+[^\s]+[\w]/;
	return (
		<Tr>
			{Object.values(rowData).map((field, i) => (
				<Td key={i} maxW={200}>
					<Text textOverflow={'ellipses'} overflow={'hidden'} isTruncated>
						{pattern.test(field) ? (
							<Link color={'blue.500'} target='_blank' href={field}>View</Link>
						) : (
							field
						)}
					</Text>
				</Td>
			))}
            {hasFunction && (<Td>
                <HStack>
                    <Button size={'xs'} colorScheme='green'
					onClick={()=>updateEnrollment(keyS.userId, keyS.batchId, acceptOption.key, acceptOption.value)}
					>
                        <BsCheckLg /> 
                    </Button>
                    <Button size={'xs'} colorScheme='red'
					onClick={()=>updateEnrollment(keyS.userId, keyS.batchId, declineOption.key, declineOption.value)}
					>
                        <BsXLg /> 
                    </Button>
                </HStack>
            </Td>)}
		</Tr>
	);
};

export default TableRow;
