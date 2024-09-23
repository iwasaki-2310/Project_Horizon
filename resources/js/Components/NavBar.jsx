import { Link, usePage } from '@inertiajs/react';
import '../../css/NavBar.css';
import { ListItem, UnorderedList } from '@chakra-ui/react';

const NavBar = props => {
  const { url, component } = usePage();
  console.log(url);
  return (
    <>
      <p>URL: {url}</p>
      <p>Component: {component}</p>
      <nav>
        <UnorderedList
          display="flex"
          justifyContent="space-between"
          listStyleType="none"
        >
          <ListItem>
            <Link class={url === '/' ? 'active' : ''} href={route('welcome')}>
              Welcome
            </Link>
          </ListItem>
          <ListItem>
            <Link
              class={url === '/about' ? 'active' : ''}
              href={route('about')}
            >
              About
            </Link>
          </ListItem>
          <ListItem>
            <Link
              class={url === url.startsWith('/users') ? 'active' : ''}
              href={route('users')}
            >
              Users
            </Link>
          </ListItem>
        </UnorderedList>
      </nav>
    </>
  );
};

export default NavBar;
