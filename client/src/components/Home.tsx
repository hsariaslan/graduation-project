import React from "react";
import { useDispatch } from 'react-redux';
import { update } from '../features/title/title';

const Home = () => {
    const dispatch = useDispatch();

    dispatch(update("Anasayfa"));

    return (
        <div>Home.tsx</div>
    );
};

export default Home;
