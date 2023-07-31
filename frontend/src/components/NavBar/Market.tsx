import { HiMiniBuildingStorefront } from 'react-icons/hi2';
import { Link } from 'react-router-dom';


const Market = () => {
    return (
        <div>
            <Link to="/market">
                <HiMiniBuildingStorefront size="59" color="838383"/> 
            </Link>
        </div>
    )
}

export default Market;