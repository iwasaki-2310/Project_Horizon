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

    // オフィスとユーザーの中間テーブル（オフィスユーザーテーブル）にユーザーid,入室時刻を付与
    const handleJoinOFfice = async(officeId) => {
        const response = await axios.post(route('office.joinOffice', officeId));
    }

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

                                {/* 表示を許容している値のみ表示 */}
                                {tableData.map((data, rowIndex) => ( //レコード単位に分割
                                    <Tr key={rowIndex}>
                                        {Object.values(data).map((parentKeys, colIndex) => ( //親キー単位に分割
                                            parentKeys['isAddColumn'] === true ? (
                                                <Td key={colIndex}>
                                                    {parentKeys['value']}
                                                </Td>
                                            ) : null
                                        ))}
                                        {data['office_id'] && (
                                            <Td p={0}>
                                                <Link href={`/office/${data['office_id']['value']}/top`} onClick={() => handleJoinOFfice(data['office_id']['value'])}>
                                                    <Image src={iconPath} w="25px" cursor="pointer" />
                                                </Link>
                                            </Td>
                                        )}
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
