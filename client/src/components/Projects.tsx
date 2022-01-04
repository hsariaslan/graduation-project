import React, {useEffect} from "react";
import { useDispatch } from 'react-redux';
import { update } from '../features/title/title';

const Projects = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(update("Projeler"));
    }, []);

    return (
        <div>Projects.tsx</div>
    );
};

export default Projects;
