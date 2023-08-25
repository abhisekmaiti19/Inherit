import {
	Box,
	Show,
	Stack,
	Step,
	StepIcon,
	StepIndicator,
	StepNumber,
	StepSeparator,
	StepStatus,
	StepTitle,
	Stepper,
} from '@chakra-ui/react';
import { useContext, useState } from 'react';

import BasicInfo from './Proflie/BasicInfo';
import Education from './Proflie/Education';
import Experience from './Proflie/Experience';
import GlobalContext from '../Store/GlobalContext';


const steps = ['Basic Info', 'Education', 'Experience'];

const Profile = () => {
	const {user} = useContext(GlobalContext);
	const [stepIndex, setStepIndex] = useState(0);

	const incrementStep = () => {
    if(stepIndex<3)
      setStepIndex((step) => step + 1);
	};
	const decrementStep = () => {
    if(stepIndex>0)
		setStepIndex((step) => step - 1);
	};

	return (
		<Stack direction={'column'} w={'100%'}>
			<Stepper
				index={stepIndex}
				border={'3px solid'}
				borderColor={'brand.300'}
				p={[3,5,5]}
				borderRadius={10}
				colorScheme="brand"
			>
				{steps.map((step, index) => (
					<Step key={index}>
						<StepIndicator>
							<StepStatus
								complete={<StepIcon />}
								incomplete={<StepNumber />}
								active={<StepNumber />}
							/>
						</StepIndicator>
						<Show above='sm'>
							<Box flexShrink="0">
								<StepTitle>{step}</StepTitle>
							</Box>
						</Show>
						<StepSeparator />
					</Step>
				))}
			</Stepper>

			{stepIndex == 0 && <BasicInfo user={user} stepIndex={stepIndex} decrementStep={decrementStep} incrementStep={incrementStep} />}
			{stepIndex == 1 && <Education user={user} stepIndex={stepIndex} decrementStep={decrementStep} incrementStep={incrementStep} />}
			{(stepIndex == 2 || stepIndex == 3) && <Experience user={user} stepIndex={stepIndex} decrementStep={decrementStep} incrementStep={incrementStep} />}
		</Stack>
	);
};

export default Profile;
