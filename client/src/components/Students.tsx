import React, {useEffect} from "react";
import { useDispatch } from 'react-redux';
import { update } from '../features/title/title';

const Students = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(update("Öğrenciler"));
    }, []);

    return (
        <div>Students.tsx</div>
    );
};

export default Students;
