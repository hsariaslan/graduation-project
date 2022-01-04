import { configureStore } from '@reduxjs/toolkit';
import title from '../features/title/title';

export default configureStore({
    reducer: {
        title: title,
    },
});