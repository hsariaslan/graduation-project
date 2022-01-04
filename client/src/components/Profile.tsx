import React, {useEffect} from "react";
import { useDispatch } from 'react-redux';
import { update } from '../features/title/title';

const Profile = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(update("Profil"));
    }, []);

    return (
        <div>Profile.tsx</div>
    );
};

export default Profile;
