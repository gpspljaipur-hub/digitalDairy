import { useSelector } from 'react-redux';
import { RootState } from '../Redux/Store/Store';
import Strings from './String';

const useStrings = () => {
    const language = useSelector((state: RootState) => state.user.language) || 'en';
    return Strings[language] || Strings.en;
};

export default useStrings;
