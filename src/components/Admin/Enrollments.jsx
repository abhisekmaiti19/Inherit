import {
	Hide,
	Show,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
} from '@chakra-ui/react';
import { BiBlock, BiSolidUserVoice } from 'react-icons/bi';
import { BsFillClipboard2CheckFill, BsFillPatchCheckFill} from 'react-icons/bs';
import { FaLaptopCode } from 'react-icons/fa';
import NewEnrollments from './NewEnrollments';

const Enrollments = () => {
	return (
		<Tabs isLazy colorScheme="brand">
			<TabList>
				<Tab
					color={'brand.300'}
					transition={'0.15s'}
					fontWeight={'600'}
					borderTopRadius={10}
					_selected={{ color: 'brand.500',
                    bg: 'gray.100'}}
                    px={{base:'5.5vw', sm: '4vw', lg:4}}
				>
                    <Show above='lg'>New&nbsp;Enrollments</Show>
                    <Hide above='lg'><BsFillClipboard2CheckFill size={'22px'}/></Hide>
				</Tab>
				<Tab
					color={'brand.300'}
					transition={'0.15s'}
					fontWeight={'600'}
                    px={{base:'5.5vw', sm: '4vw', lg:4}}
                    borderTopRadius={10}
					_selected={{ color: 'brand.500',
                    bg: 'gray.100'
                }}
				>
                    <Show above='lg'>FAEE&nbsp;Test</Show>
                    <Hide above='lg'><FaLaptopCode size={'26px'}/></Hide>
				</Tab>
				<Tab
					color={'brand.300'}
					transition={'0.15s'}
					fontWeight={'600'}
                    px={{base:'5.5vw', sm: '4vw', lg:4}}
					borderTopRadius={10}
					_selected={{ color: 'brand.500',
                    bg: 'gray.100'}}
				>
                    <Show above='lg'>Interview</Show>
                    <Hide above='lg'><BiSolidUserVoice size={'28px'}/></Hide>
				</Tab>
				<Tab
					color={'brand.300'}
					transition={'0.15s'}
					fontWeight={'600'}
                    px={{base:'5.5vw', sm: '4vw', lg:4}}
					borderTopRadius={10}
					_selected={{ color: 'brand.500',
                    bg: 'gray.100'}}
				>
                    <Show above='lg'>Selected</Show>
                    <Hide above='lg'><BsFillPatchCheckFill size={'20px'}/></Hide>
				</Tab>
				<Tab
					color={'brand.300'}
					transition={'0.15s'}
					fontWeight={'600'}
                    px={{base:'5.5vw', sm: '4vw', lg:4}}
					borderTopRadius={10}
					_selected={{ color: 'brand.500',
                    bg: 'gray.100'}}
				>
                    <Show above='lg'>Rejected</Show>
                    <Hide above='lg'><BiBlock size={'22px'}/></Hide>
				</Tab>
			</TabList>
			
			
			<TabPanels>
				<NewEnrollments />
				<TabPanel>
					<p>two!</p>
				</TabPanel>
			</TabPanels>
		</Tabs>
	);
};

export default Enrollments;
