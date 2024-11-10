import { Button } from '@chakra-ui/react';

export const PrimaryButton = ({ children, onClick }) => {
    return (
        <Button
            bg="blue.500"
            color="white"
            _hover={{
                bg: 'blue.200',
            }}
            onClick={onClick}
        >
            {children}
        </Button>
    );
};
