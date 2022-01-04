import React from "react";
import { useDispatch } from 'react-redux';
import { update } from '../features/title/title';

const Selections = () => {
    const dispatch = useDispatch();

    dispatch(update("Seçimler"));

    return (
        <div>Selections.tsx</div>
    );
};

export default Selections;
