import { Link } from '@inertiajs/react';

const NavBar = props => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link href={route('welcome')}>Welcome</Link>
          </li>
          <li>
            <Link href={route('about')}>About</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default NavBar;
