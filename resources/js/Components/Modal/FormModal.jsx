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
    Select,
} from '@chakra-ui/react';
import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import { PrimaryButton } from '../PrimaryButton';
import { CancelButton } from '../CancelButton';

const FormModal = props => {
    const { isOpen, onClose, modalTitle, fields, onSubmit, errors } = props;

    const { data, setData, post, processing } = useForm(
        fields.reduce((result, field) => {
            // フィールドに初期値がある場合、それを使用
            result[field.name] = field.defaultValue || (field.inputType === 'selected' ? '1' : '');
            return result;
        }, {})
    );

    const handleChange = e => {
        console.log(`Field: ${e.target.name}, Value: ${e.target.value}`);
        setData(e.target.name, e.target.value);
    };

    // フォーム送信
    const handleSubmit = () => {
        onSubmit(data);
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
                            {Object.entries(errors).map(([key, value]) => (
                                <Text key={key} color="red.500" fontSize="sm">
                                    {value}
                                </Text>
                            ))}
                            {fields.map((field, index) => (
                                <FormControl>
                                    <FormLabel>{field.label}</FormLabel>
                                    {field.inputType == "text" ?
                                        <Input
                                            name={field.name}
                                            value={data[field.name]}
                                            onChange={handleChange}
                                            placeholder={field.placeHolder && field.placeHolder}
                                        />:
                                        <Select name={field.name} value={data[field.name]} onChange={handleChange}>
                                            {field.options.map((option, optionIndex) => (
                                                <option key={optionIndex} value={option.value}>{option.label}</option>
                                            ))}
                                        </Select>
                                    }
                                </FormControl>
                            ))}
                        </Stack>
                    </ModalBody>
                    <ModalFooter>
                        <PrimaryButton onClick={handleSubmit}>
                            登録
                        </PrimaryButton>
                        <CancelButton marginLeft={4} onClick={onclose}>
                            キャンセル
                        </CancelButton>
                    </ModalFooter>
                </ModalContent>
            </ModalOverlay>
        </ChakraModal>
    );
};

export default FormModal;
