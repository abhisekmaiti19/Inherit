import {
	Stack,
	TabPanel,
} from '@chakra-ui/react';
import FilterStudents from './FilterStudents';
import TableFlex from './TableFlex';
import { useContext } from 'react';
import DashboardContext from '../../Store/DashboardContext';

const NewEnrollments = () => {
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
			'Resume',
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
			<TableFlex headings={headings} data={
				enrollments.filter(e=>e.isShortlistedForExam==null).map((enrollment)=>{return {
					'FAID': enrollment._id,
					'Name': enrollment.user.name,
					'Course': enrollment.courseName,
					'Email': enrollment.user.email,
					'Phone': enrollment.user.phone,
					'College': enrollment.user.college,
					'CourseType': enrollment.user.course,
					'Experience': enrollment.user.experience,
					'Resume': enrollment.user.resume,
					'userId': enrollment.userId, 
					'batchId': enrollment.batchId, 
				}})
			} 
			hasFunction={true}
			acceptOption={{key: 'isShortlistedForExam', value: 'true'}}
			declineOption={{key:'isShortlistedForExam', value: 'false'}}
			/>
		</TabPanel>
	);
};

export default NewEnrollments;
