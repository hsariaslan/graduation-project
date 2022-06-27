import React, {useEffect} from "react";
import { useDispatch } from 'react-redux';
import { update } from '../features/title/title';
import Typography from '@mui/material/Typography';

const Home = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(update("Anasayfa"));
    }, []);

    return (
        <div>
            <Typography variant="h5" component="div" gutterBottom>
                Bitirme Projesi Eşleştiricisine Hoşgeldiniz!
            </Typography>
            <Typography variant="h6" component="div" gutterBottom>
                Soldaki menüyü kullanarak sisteme kayıtlı olan projeleri görebilir ve işlem yapabilirsiniz.
            </Typography>
        </div>
    );
};

export default Home;
