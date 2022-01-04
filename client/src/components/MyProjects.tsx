import React, {useEffect} from "react";
import { useDispatch } from 'react-redux';
import { update } from '../features/title/title';

const MyProjects = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(update("Projelerim"));
    }, []);

    return (
        <div>MyProjects.tsx</div>
    );
};

export default MyProjects;
