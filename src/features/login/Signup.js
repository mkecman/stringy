import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { writeData } from '../../app/firebase';
import * as moment from 'moment';
import { withAuthentication } from '../../features/login/withAuthentication';


const Signup = () =>
{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSignUp = async (e) =>
    {
        e.preventDefault();

        const auth = getAuth();
        try
        {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            // Successfully signed up, you can redirect or show a success message
            writeData('/users/' + user.uid,
                {
                    id: user.uid,
                    email: email,
                    role: "guest",
                    lastLogin: moment().valueOf()
                });
        } catch (error)
        {
            setError(error.message); // Show error message if something went wrong
        }
    };

    return (
        <div>
            <h1>Sign Up</h1>
            {error && <p>{error}</p>}
            <form onSubmit={handleSignUp}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default Signup;