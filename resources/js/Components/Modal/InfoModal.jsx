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
    UnorderedList,
    ListItem,
    Flex,
} from '@chakra-ui/react';
import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import { PrimaryButton } from '../PrimaryButton';
import { CancelButton } from '../CancelButton';

const InfoModal = props => {
    const { isOpen, onClose, officeInfo } = props;

    const InfoItem = ({ infoLabel, infoValue }) => {
        return (
            <ListItem
                borderBottom="1px solid rgba(128, 128, 128, .2)"
                _last={{ borderBottom: 'none' }}
            >
                <Flex justifyContent="space-between" py={4}>
                    <Text fontWeight="bold">{infoLabel}</Text>
                    <Text>{infoValue}</Text>
                </Flex>
            </ListItem>
        );
    };

    console.log(officeInfo);
    return (
        <ChakraModal
            isOpen={isOpen}
            onClose={onClose}
            autoFocus={false}
            motionPreset="slideInBottom"
        >
            <ModalOverlay>
                <ModalContent pb={6}>
                    <ModalHeader>オフィス詳細</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody mx={4}>
                        <Stack spacing={4}>
                            <UnorderedList>
                                <InfoItem
                                    infoLabel="オフィス名"
                                    infoValue={officeInfo?.office_name}
                                />
                                <InfoItem
                                    infoLabel="オフィス概要"
                                    infoValue={officeInfo?.office_description}
                                />
                                <InfoItem
                                    infoLabel="参加人数"
                                    infoValue={officeInfo?.member_count}
                                />
                            </UnorderedList>
                        </Stack>
                    </ModalBody>
                </ModalContent>
            </ModalOverlay>
        </ChakraModal>
    );
};

export default InfoModal;
