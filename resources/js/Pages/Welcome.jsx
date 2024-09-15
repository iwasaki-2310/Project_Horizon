import { Link, Head } from '@inertiajs/react';
import { useEffect } from 'react';

const Welcome = (props) => {
    const {greeting, canLogin, canRegister, laravelVersion, phpVersion} = props;
    useEffect(() => {
        console.log("Welcome Page Mounted!!");
    })
    return (
        <>
        <nav>
                <ul>
            <li><a href="/">Welcome</a></li>
                    <li><a href="/about">About</a></li>
                </ul>
            </nav>
            <h1>{greeting}Welcome Inertia.js</h1>
        </>
    )
}

export default Welcome;
