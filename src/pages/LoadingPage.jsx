import React, {useState, useEffect} from 'react'
import { Textanimation } from '../components/common/Textanimation'
import { useNavigate } from 'react-router-dom';

export const LoadingPage = () => {
    // const [isLoading, setIsLoading] = useState(true);
    // const navigate = useNavigate();
    //   useEffect(() => {
    //         const timer = setTimeout(() => {
    //           setIsLoading(false);
    //         }, 4660);
        
    //         return () => clearTimeout(timer);
    //       }, []);
        
    //       if (!isLoading) {
    //         return navigate("/primary-questionnaire");
    //       }
  return (
    <div>
        <Textanimation/>
    </div>
  )
}
