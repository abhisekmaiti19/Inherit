/* eslint-disable react/prop-types */
import {
	Stack,
	TabPanel,
} from '@chakra-ui/react';
import FilterStudents from './FilterStudents';
import TableFlex from './TableFlex';
import { useContext } from 'react';
import DashboardContext from '../../Store/DashboardContext';

const Accepted = ({isAccepted = true}) => {
	const {enrollments} = useContext(DashboardContext);

	const headings = [
			'FAID',
			'Name',
			'Course',
			'Email',
			'Phone',
			'College',
			'CourseType',
			'Experience',
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
			</Stack>
			<TableFlex caption={isAccepted?'Accepted Candidatures (All Batches)': 'Rejected Candidatures (All Batches)'} headings={headings} data={
				enrollments.filter(e=>(e.isAccepted==isAccepted)).map((enrollment)=>{return {
					'FAID': enrollment._id,
					'Name': enrollment.user.name,
					'Course': enrollment.courseName,
					'Email': enrollment.user.email,
					'Phone': enrollment.user.phone,
					'College': enrollment.user.college,
					'CourseType': enrollment.user.course,
					'Experience': enrollment.user.experience,
				}})
			}
			/>
		</TabPanel>
	);
};

export default Accepted;




