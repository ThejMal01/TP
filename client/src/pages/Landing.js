import main from '../assets/images/main.svg'
import Wrapper from '../assets/wrappers/LandingPage'
import Logo from '../components/Logo'
import {Link} from 'react-router-dom'

const Landing = () => {
  return (
    <Wrapper>
        <nav>
            <Logo/>
        </nav>
        <div className='container page'>
            <div className='info'>
                <h1>
                    Delivery <span>Management</span>
                </h1>
                <p>
                    My contribution to this project is handling the delivery management function
                </p>
                <Link to="/register" className='btn btn-hero'>
                    Login/Register
                </Link>
            </div>
            <img src={main} alt='MainImage' className='img img-main'/>
        </div>
    </Wrapper>
  )
}


export default Landing