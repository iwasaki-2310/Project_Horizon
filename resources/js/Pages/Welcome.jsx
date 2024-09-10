import { Link, Head } from '@inertiajs/react';
import { useEffect } from 'react';

const Welcome = (props) => {
    useEffect(() => {
        console.log("Welcome Page Mounted!!");
    })
    return <h1>{props.greeting}Welcome Inertia.js</h1>
}

export default Welcome;
