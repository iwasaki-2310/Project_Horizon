import Layouts from '@/Layouts/Layouts';
import { Box, Button, Heading } from '@chakra-ui/react';
import { Head } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import { useState } from 'react';

const Create = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    familly_name: '',
    first_name: '',
    family_name_kana: '',
    first_name_kana: '',
    display_name: '',
    tel: '',
    phrase: '',
    encrypted_password: '',
  });

  const handleChange = e => {
    const key = e.target.id;
    const value = e.target.value;
    setValues(values => ({
      ...values,
      [key]: value,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    Inertia.post('/users', values);
  };
  return (
    <>
      <Head title="ユーザー登録"></Head>
      <Heading as="h2">ユーザーの登録</Heading>
      <Box>
        <form onSubmit={handleSubmit}>
          <Box>
            <label htmlFor="familly_name">性：</label>
            <input
              id="familly_name"
              value={values.familly_name}
              onChange={handleChange}
            />
          </Box>
          <Box>
            <label htmlFor="first_name">名：</label>
            <input
              id="first_name"
              value={values.first_name}
              onChange={handleChange}
            />
          </Box>
          <Box>
            <label htmlFor="family_name_kana">性（カナ）：</label>
            <input
              id="family_name_kana"
              value={values.family_name_kana}
              onChange={handleChange}
            />
          </Box>
          <Box>
            <label htmlFor="first_name_kana">名（カナ）：</label>
            <input
              id="first_name_kana"
              value={values.first_name_kana}
              onChange={handleChange}
            />
          </Box>
          <Box>
            <label htmlFor="display_name">表示名：</label>
            <input
              id="display_name"
              value={values.display_name}
              onChange={handleChange}
            />
          </Box>
          <Box>
            <label htmlFor="email">メールアドレス：</label>
            <input id="email" value={values.email} onChange={handleChange} />
          </Box>
          <Box>
            <label htmlFor="tel">電話番号：</label>
            <input id="tel" value={values.tel} onChange={handleChange} />
          </Box>
          <Box>
            <label htmlFor="phrase">一言：</label>
            <input id="phrase" value={values.phrase} onChange={handleChange} />
          </Box>
          <Box>
            <label htmlFor="encrypted_password">パスワード：</label>
            <input
              id="encrypted_password"
              value={values.encrypted_password}
              onChange={handleChange}
            />
          </Box>
          <Button type="submit">登録</Button>
        </form>
      </Box>
    </>
  );
};

Create.layout = page => <Layouts>{page}</Layouts>;

export default Create;
