import { Link } from '@inertiajs/react';

const NavBar = props => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link href="/">Welcome</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default NavBar;
