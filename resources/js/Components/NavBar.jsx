import { Link, usePage } from '@inertiajs/react';
import '../../css/NavBar.css';

const NavBar = props => {
  const { url, component } = usePage();
  console.log(url);
  return (
    <>
      <p>URL: {url}</p>
      <p>Component: {component}</p>
      <nav>
        <ul>
          <li>
            <Link class={url === '/' ? 'active' : ''} href={route('welcome')}>
              Welcome
            </Link>
          </li>
          <li>
            <Link
              class={url === '/about' ? 'active' : ''}
              href={route('about')}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              class={url === url.startsWith('/users') ? 'active' : ''}
              href={route('users')}
            >
              Users
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default NavBar;
