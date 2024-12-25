import {
    Button,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Modal as ChakraModal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Stack,
    ModalFooter,
    Text,
    Flex,
    Box,
    Table,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    TableContainer,
    Link,
    Image,
} from '@chakra-ui/react';
import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import { PrimaryButton } from '../PrimaryButton';
import { CancelButton } from '../CancelButton';

const SearchModal = props => {
    const { isOpen, onClose, modalTitle, tableColumns, tableData, iconPath } = props;
    const iconsPath = '/icons';

    console.log(tableData);

    return (
        <ChakraModal
            isOpen={isOpen}
            onClose={onClose}
            autoFocus={false}
            motionPreset="slideInBottom"
        >
            <ModalOverlay>
                <ModalContent pb={6} maxW="initial" w="45vw">
                    <ModalHeader>{modalTitle}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody mx={4}>
                        <Stack spacing={4}>
                        <TableContainer>
                            <Table variant="simple">
                                <Thead>
                                    <Tr>
                                        {tableColumns && tableColumns.map((col, index) => (
                                            <Th key={index}>{col}</Th>
                                        ))}
                                    </Tr>
                                </Thead>
                                <Tbody>
                                {tableData.map((data, rowIndex) => (
                                    <Tr key={rowIndex}>
                                        {Object.values(data).map((value, colIndex) => (
                                            <Td key={colIndex}>
                                                {typeof value === 'object' && value !== null ? JSON.stringify(value) : value}
                                            </Td>
                                        ))}
                                        <Td>
                                            <Link href=''>
                                                <Image src={iconPath} w="40px" cursor="pointer" />
                                            </Link>
                                        </Td>
                                    </Tr>
                                ))}
                                </Tbody>
                            </Table>
                        </TableContainer>
                        </Stack>
                    </ModalBody>
                </ModalContent>
            </ModalOverlay>
        </ChakraModal>
    );
};

export default SearchModal;
