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
} from '@chakra-ui/react';
import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';

const FormModal = props => {
    const { isOpen, onClose, modalTitle, fields, submitUrl } = props;

    const { data, setData, post, processing } = useForm(
        fields.reduce((result, field) => {
            result[field.name] = '';
            return result;
        }, {})
    );

    const handleChange = e => {
        setData(e.target.name, e.target.value);
    };

    // フォーム送信
    const handleSubmit = () => {
        post(submitUrl, {
            onSuccess: () => onClose(),
        });
    };
    return (
        <ChakraModal
            isOpen={isOpen}
            onClose={onClose}
            autoFocus={false}
            motionPreset="slideInBottom"
        >
            <ModalOverlay>
                <ModalContent pb={6}>
                    <ModalHeader>{modalTitle}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody mx={4}>
                        <Stack spacing={4}>
                            {fields.map((field, index) => (
                                <FormControl>
                                    <FormLabel>{field.label}</FormLabel>
                                    <Input
                                        name={field.name}
                                        value={data[field.name]}
                                        onChange={handleChange}
                                        placeholder={field.placeHolder}
                                    />
                                </FormControl>
                            ))}
                        </Stack>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={handleSubmit}>登録</Button>
                        <Button onClick={onclose}>キャンセル</Button>
                    </ModalFooter>
                </ModalContent>
            </ModalOverlay>
        </ChakraModal>
    );
};

export default FormModal;