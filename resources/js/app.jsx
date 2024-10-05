import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ChakraProvider } from '@chakra-ui/react';
import customTheme from './theme';
import React from 'react';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // エラーが発生した際にエラーフラグをtrueにする
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // エラーログをコンソールに出力
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>; // エラー時に表示する内容
    }

    return this.props.children;
  }
}

createInertiaApp({
  title: title => `${title} - ${appName}`,
  resolve: name =>
    resolvePageComponent(
      `./Pages/${name}.jsx`,
      import.meta.glob('./Pages/**/*.jsx')
    ),
  setup({ el, App, props }) {
    const root = createRoot(el);

    root.render(
      <ErrorBoundary>
        <ChakraProvider theme={customTheme}>
          <App {...props} />
        </ChakraProvider>
      </ErrorBoundary>
    );
  },
  progress: {
    color: '#4B5563',
  },
});
