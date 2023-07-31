import axios, { AxiosResponse } from 'axios';
import { useState, useEffect } from 'react';
import { useDispatch  } from 'react-redux';
import { initToken } from '../../../services/Token/Token';
import styles from './MyMilage.module.css';


const MyMilage :React.FC = () => {
    const [myMileage, setMyMileage] = useState<number | null>(null);
    const dispatch = useDispatch();

    useEffect(() => {
        initToken(dispatch);
    }, [dispatch]);

    useEffect(() => {
        axios.get('/member')
            .then((response: AxiosResponse) => {
                console.log(response.data.mileage);
                
            })
            .catch(error => console.error('Error: ', error));
    }, [])

    useEffect(() => {
        const fetchData = async () => {

            try {
                const response = await axios.get('/member');
                setMyMileage(response.data.mileage);
                console.log(response);
            } catch (error) {
                console.log('mileage Error', error)
            }
        };

        fetchData();
    }, [myMileage]);

    return (
        <div>
            <div className={styles['mileage-box']}>
                <div className={styles.mileage}>{myMileage ? myMileage : '1260'}&nbsp;M</div>
            </div>
        </div>

    )
}

export default MyMilage;