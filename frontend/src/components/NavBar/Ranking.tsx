import { FaRankingStar } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const Ranking = () => {
    return (
        <div>
            <Link to="/rank">
                <FaRankingStar size="59" color="838383"/>
            </Link>
        </div>
    )
}

export default Ranking;