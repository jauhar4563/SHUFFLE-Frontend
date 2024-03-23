import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

function Protect({children}) {

    const navigate = useNavigate()
    const selectUser = (state:any)=>state.auth.user;
    const user = useSelector(selectUser);
    // const isValid = useSelector((state)=> state?.auth?.user);

    if(user){
      return children
    } else {
      navigate("/login")
    }

  
}

export default Protect