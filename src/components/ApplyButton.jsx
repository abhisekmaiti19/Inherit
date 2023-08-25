import { Button, Hide, Show, Text } from '@chakra-ui/react';
import { BsUiChecksGrid } from 'react-icons/bs';

const ApplyButton = () => {
	return (
		<Button
			bg={'linear-gradient(129deg, #6D10FC 0%, #F96295 100%)'}
			color={'white'}
			py={5}
			bgSize={'150%'}
			transition={'0.25s'}
			_hover={{ bgPos: 'top' }}
			fontWeight={700}
			w={{ md: '160px' }}
		>
			<Show above="md">
				<Text>Apply</Text>
			</Show>
            <Show above='sm'>
                <Hide above="md">
                    <BsUiChecksGrid fontSize={'20px'} />
                </Hide>
            </Show>
            <Hide above="sm">
				<Text>Apply</Text>
			</Hide>
		</Button>
	);
};

export default ApplyButton;
