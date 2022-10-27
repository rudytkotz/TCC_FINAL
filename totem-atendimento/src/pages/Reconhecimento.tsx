import React from 'react'
import { useNavigate } from 'react-router-dom';
import Webcam from "react-webcam";

import "../styles/reconhecimento.css"

const Reconhecimento = () => {
    const navigate = useNavigate();
    const webcamRef = React.useRef(null);
    const [imgSrc, setImgSrc] = React.useState(null);
    const capture = React.useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        console.log(imageSrc)
        setImgSrc(imageSrc);
    }, [webcamRef, setImgSrc]);

    if(imgSrc){
        navigate("/paciente", {state:{cardId:12212312312,name:'Rodolfo Varanda',document: "CPF 126.121.124-21", photo: imgSrc}})
    }

    return (
        <main>
        <div className='container-mod'>
            <div className="webcam">
                <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                />
            </div>
            <div className="capture">
                <button className='button-photo' onClick={capture}>Tirar Foto</button>
            </div>
        </div>
        </main>
    )
}

export default Reconhecimento