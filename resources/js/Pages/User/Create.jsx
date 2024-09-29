import Layouts from '@/Layouts/Layouts';
import { Box, Button, Heading, Text } from '@chakra-ui/react';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import { useEffect, useState } from 'react';

const Create = () => {
  //   const { errors } = usePage().props;
  const { data, setData, post, processing, errors } = useForm({
    email: '',
    family_name: '',
    first_name: '',
    family_name_kana: '',
    first_name_kana: '',
    display_name: '',
    tel: '',
    phrase: '',
    encrypted_password: '',
  });

  const handleChange = e => {
    setData(e.target.id, e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    post('/users');
  };
  return (
    <>
      <Head title="ユーザー登録"></Head>
      <Heading as="h2">ユーザーの登録</Heading>
      <Box>
        <form onSubmit={handleSubmit}>
          <Box>
            <label htmlFor="family_name">性：</label>
            <input
              id="family_name"
              value={data.family_name}
              onChange={handleChange}
            />
            {errors.family_name && (
              <Text color="red">{errors.family_name}</Text>
            )}
          </Box>
          <Box>
            <label htmlFor="first_name">名：</label>
            <input
              id="first_name"
              value={data.first_name}
              onChange={handleChange}
            />
            {errors.first_name && <Text color="red">{errors.first_name}</Text>}
          </Box>
          <Box>
            <label htmlFor="family_name_kana">性（カナ）：</label>
            <input
              id="family_name_kana"
              value={data.family_name_kana}
              onChange={handleChange}
            />
            {errors.family_name_kana && (
              <Text color="red">{errors.family_name_kana}</Text>
            )}
          </Box>
          <Box>
            <label htmlFor="first_name_kana">名（カナ）：</label>
            <input
              id="first_name_kana"
              value={data.first_name_kana}
              onChange={handleChange}
            />
            {errors.family_name_kana && (
              <Text color="red">{errors.family_name_kana}</Text>
            )}
          </Box>
          <Box>
            <label htmlFor="display_name">表示名：</label>
            <input
              id="display_name"
              value={data.display_name}
              onChange={handleChange}
            />
            {errors.display_name && (
              <Text color="red">{errors.display_name}</Text>
            )}
          </Box>
          <Box>
            <label htmlFor="email">メールアドレス：</label>
            <input id="email" value={data.email} onChange={handleChange} />
            {errors.email && <Text color="red">{errors.email}</Text>}
          </Box>
          <Box>
            <label htmlFor="tel">電話番号：</label>
            <input id="tel" value={data.tel} onChange={handleChange} />
            {errors.tel && <Text color="red">{errors.tel}</Text>}
          </Box>
          <Box>
            <label htmlFor="phrase">一言：</label>
            <input id="phrase" value={data.phrase} onChange={handleChange} />
            {errors.phrase && <Text color="red">{errors.phrase}</Text>}
          </Box>
          <Box>
            <label htmlFor="encrypted_password">パスワード：</label>
            <input
              id="encrypted_password"
              value={data.encrypted_password}
              onChange={handleChange}
            />
            {errors.encrypted_password && (
              <Text color="red">{errors.encrypted_password}</Text>
            )}
          </Box>
          <Button type="submit">登録</Button>
        </form>
      </Box>
    </>
  );
};

Create.layout = page => <Layouts>{page}</Layouts>;

export default Create;
