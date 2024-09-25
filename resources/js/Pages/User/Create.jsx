import Layouts from '@/Layouts/Layouts';
import { Box, Button, Heading } from '@chakra-ui/react';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

const Create = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
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
    Inertia.post('/user', values);
  };
  return (
    <>
      <Head title="ユーザー登録"></Head>
      <Heading as="h2">ユーザーの登録</Heading>
      <Box>
        <form onSubmit={handleSubmit}>
          <Box>
            <label htmlFor="name">名前：</label>
            <input id="name" value={values.name} onChange={handleChange} />
          </Box>
          <Box>
            <label htmlFor="email">メールアドレス：</label>
            <input id="email" value={values.email} onChange={handleChange} />
          </Box>
          <Box>
            <label htmlFor="password">パスワード：</label>
            <input
              id="password"
              value={values.password}
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
