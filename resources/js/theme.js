import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      'li::marker': {
        content: 'none', // 全ての liタグのマーカーを非表示に
      },
    },
  },
});

export default theme;
