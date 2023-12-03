import React from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, loginUser } from '../user/UserSlice';
import { getDataAsync } from '../../app/firebase';

export const withAuthentication = (Component) =>
{
    return (props) =>
    {
        const [loading, setLoading] = React.useState(true);
        const [authenticated, setAuthenticated] = React.useState(false);
        const dispatch = useDispatch();
        const appUser = useSelector(getUser);

        React.useEffect(() =>
        {
            const auth = getAuth();
            const unsubscribe = onAuthStateChanged(auth, (user) =>
            {
                if (user)
                {
                    setAuthenticated(true);

                    if (user.uid != appUser.id)
                        getDataAsync('/users/' + user.uid, handleGetUserData);
                    else
                        setLoading(false);
                }
                else
                    setLoading(false);
            });
            return () =>
            {
                unsubscribe(); // Cleanup the subscription on unmount
                //dispatch(loginUser({ id: 0 }));
            }
        }, []);

        const handleGetUserData = (user) =>
        {
            dispatch(loginUser(user));
            setLoading(false);
        }

        if (loading)
        {
            return <div>Loading...</div>; // You can replace this with a loading spinner or other placeholder
        }

        if (!authenticated)
        {
            return <Navigate  to="/login" />;
        }

        return <Component {...props} />;
    };
};
