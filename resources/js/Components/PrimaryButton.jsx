import { Button } from '@chakra-ui/react';

export const PrimaryButton = ({ children, onClick, type = 'button', ...props}) => {
    return (
        <Button
            bg="blue.500"
            color="white"
            _hover={{
                bg: 'blue.200',
            }}
            type={type}
            onClick={onClick}
            {...props}
        >
            {children}
        </Button>
    );
};
