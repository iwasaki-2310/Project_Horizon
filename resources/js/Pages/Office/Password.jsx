import FormModal from '@/Components/Modal/FormModal';
import Layouts from '@/Layouts/Layouts';
import {
    Box,
    Heading,
    Image,
    Link,
    ListItem,
    Text,
    UnorderedList,
} from '@chakra-ui/react';
import axios from 'axios';

const Password = ({ officeId }) => {

    const fields = [
        {
            inputType: 'text',
            label: 'パスワード',
            name: 'office_password',
            placeHolder: 'オフィスのパスワードを入力してください',
        },
    ];

    const handleSubmit = async data => {
        try {
            const response = await axios.post( route('office.joinOffice', { office_id: officeId }),{
                office_password: data.office_password,
            } );
            console.log(response);
            if(response.status === 200) {
                console.log('オフィスに遷移');
                window.location.href = route('office.show', { office_id: officeId });
            }
        } catch (error) {
            if(error.response.status === 401) {
                alert('パスワードが間違っています。');
            }
        }
    };


    return (
        <Box w='100vw' h="100vh" bg='#0f172a'>
            <FormModal
                isOpen={true}
                onClose={() => {}} closeOnOverlayClick={false} closeOnEsc={false}
                modalTitle={'オフィスのパスワードを入力'}
                fields={fields}
                onSubmit={handleSubmit}
                errors={''}
            />
        </Box>
    );
};

export default Password;
