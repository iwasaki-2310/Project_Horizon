import { Button } from '@chakra-ui/react';

export const PrimaryButton = ({ children, onClick, type = 'button' }) => {
    return (
        <Button
            bg="blue.500"
            color="white"
            _hover={{
                bg: 'blue.200',
            }}
            type={type}
            onClick={onClick}
        >
            {children}
        </Button>
    );
};
