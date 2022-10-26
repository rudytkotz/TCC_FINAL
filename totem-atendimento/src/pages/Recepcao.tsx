import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import '../styles/login.style.css'

const Recepcao = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
          navigate('/')
        }, 5000);
        return () => clearTimeout(timer);
      }, []);

    return (
        <main>
            <div className="container-mod" style={{justifyContent: 'center'}}>
            <h1>Por favor, se direcionar para a recepção.</h1>
            </div>
        </main>
    )
}

export default Recepcao