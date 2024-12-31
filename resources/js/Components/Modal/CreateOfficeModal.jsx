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
import { useEffect, useState } from 'react';
import { PrimaryButton } from '../PrimaryButton';
import { CancelButton } from '../CancelButton';

const CreateOfficeModal = props => {
    const { isOpen, onClose, modalTitle, fields, onSubmit, errors } = props;
    const [errorMessages, setErrorMessages] = useState([]);

    const { data, setData, post, processing } = useForm(
        fields.reduce((result, field) => {
            // フィールドに初期値がある場合、それを使用
            result[field.name] = field.defaultValue || (field.inputType === 'selected' ? '1' : '');
            return result;
        }, {})
    );

    const handleChange = e => {
        setData(e.target.name, e.target.value);
    };

    // フォーム送信
    const handleSubmit = () => {
        setErrorMessages([]);
        let newErrorMessage = [];
        newErrorMessage.length = 0;
        if(!data['office_password'] && data['office_public_flag'] === '0') {
            newErrorMessage.push('パスワードを入力してください。');
            setErrorMessages([...new Set([...errorMessages, ...newErrorMessage])]);
        }
        console.log(errorMessages);
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
                            {errorMessages.length > 0 &&
                                errorMessages.map((error, index) => (
                                    <Text key={index} color="red.500" fontSize="sm">{error}</Text>
                                ))
                            }
                            {fields.map((field, index) => (
                                <FormControl key={index}>
                                    <FormLabel>{field.label}</FormLabel>
                                    {field.inputType == "text" ?
                                        <Input
                                            name={field.name}
                                            value={data[field.name]}
                                            onChange={handleChange}
                                            placeholder={field.placeHolder && field.placeHolder}
                                            disabled={field.name === "office_password" && data['office_public_flag'] === "1"}
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

export default CreateOfficeModal;
