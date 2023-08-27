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
import FilterStudents from './FilterStudents';
import TableFlex from './TableFlex';
import { useContext, useState } from 'react';
import DashboardContext from '../../Store/DashboardContext';
import { BsSend } from 'react-icons/bs';

const Interview = () => {
	const {enrollments, updateEnrollment} = useContext(DashboardContext);

    const [deadline, setDeadline] = useState('');
    const [interviewLink, setinterviewLink] = useState('');

    const sendinterviewLink = async()=>{
        enrollments.filter((e)=>(e.isShortlistedForInterview==true && e.isAccepted==null && (!e.interviewLink))).forEach(async (e)=>{
            await updateEnrollment(e.userId, e.batchId, 'interviewLink', `${interviewLink}#${deadline}`);
        })
    }

	const headings = [
			'FAID',
			'Name',
			'Course',
			'Email',
			'Phone',
			'College',
			'CourseType',
			'Experience',
            'Status'
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
						<FormLabel>Interview Date</FormLabel>
						<Input type='datetime-local' value={deadline} onChange={(e)=>setDeadline(e.target.value)}/>
					</FormControl>
					<FormControl>
						<FormLabel>Interview Link</FormLabel>
						<InputGroup>
							<Input placeholder="Test Link here" value={interviewLink} onChange={(e)=>setinterviewLink(e.target.value)}/>
							<InputRightAddon p={0}>
								<Button onClick={sendinterviewLink}>
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
			<TableFlex caption={'Interview (All Batches)'} headings={headings} data={
				enrollments.filter(e=>(e.isShortlistedForInterview==true && e.isAccepted==null)).map((enrollment)=>{return {
					'FAID': enrollment._id,
					'Name': enrollment.user.name,
					'Course': enrollment.courseName,
					'Email': enrollment.user.email,
					'Phone': enrollment.user.phone,
					'College': enrollment.user.college,
					'CourseType': enrollment.user.course,
					'Experience': enrollment.user.experience,
                    'Status': enrollment.interviewLink?'Link Sent':'pending',
					'userId': enrollment.userId, 
					'batchId': enrollment.batchId, 
				}})
			} 
			hasFunction={true}
			acceptOption={{key: 'isAccepted', value: 'true'}}
			declineOption={{key:'isAccepted', value: 'false'}}
			/>
		</TabPanel>
	);
};

export default Interview;




