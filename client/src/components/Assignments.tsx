import React from "react";
import { useDispatch } from 'react-redux';
import { update } from '../features/title/title';

const Assignments = () => {
    const dispatch = useDispatch();

    dispatch(update("Eşleşmeler"));

    return (
        <div>Assignments.tsx</div>
    );
};

export default Assignments;
