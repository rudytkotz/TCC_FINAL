import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Webcam from "react-webcam";
import { UserContext } from '../contexts/user/UserContext';

import "../styles/reconhecimento.css"

export type UserDataType = {
    Nome: string,
    CPF: string,
    NCarteira: string
}

const Reconhecimento = () => {
    const user = useContext(UserContext)
    const navigate = useNavigate();
    const webcamRef = React.useRef(null);
    const [imgSrc, setImgSrc] = React.useState(null);
    const capture = React.useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();

        fetch(imageSrc)
            .then(res => res.blob())
            .then(blob => {
                const fd = new FormData();
                const file = new File([blob], "foto.jpeg");
                fd.append('file', file)
                fetch(import.meta.env.VITE_FACIAL_API_URL, { method: 'POST', body: fd })
                    .then(res => res.json())
                    .then(res => {
                        const cpf = res.faces[0].id
                        fetch(`${import.meta.env.VITE_API_URL}/api/pacientes?filters[$and][0][CPF][$eq]=${cpf}`)
                            .then((response) => response.json())
                            .then(({data}) => {
                                if(data.length === 0){
                                    return navigate("/recepcao")
                                } else {
                                    user.setUserInContext(data[0].attributes)
                                    user.setPhotoInContext(imageSrc)
                                    user.setUserIdInContext(data[0].id)
                                    setImgSrc(imageSrc)
                                    return navigate("/paciente")
                                }
                            }).catch((e) => navigate("/recepcao"))
                    })
            })

    }, [webcamRef, setImgSrc]);


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