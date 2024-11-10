import { Button } from '@chakra-ui/react';

export const CancelButton = ({ children, onClick, marginLeft }) => {
    return (
        <Button
            ml={marginLeft}
            bg="white"
            border="1px"
            borderColor="blue.500"
            color="blue.500"
            _hover={{
                opacity: '.7',
            }}
            onClick={onClick}
        >
            {children}
        </Button>
    );
};
