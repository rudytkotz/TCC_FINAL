import React, { useContext, useEffect, useState } from 'react'
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
    const [imgSrc, setImgSrc] = useState<string>("");

    const getFileFromBase64 = (string64: string, fileName: string) => {
        const trimmedString = string64.replace('data:image/jpeg;base64,', '');
        const imageContent = atob(trimmedString);
        const buffer = new ArrayBuffer(imageContent.length);
        const view = new Uint8Array(buffer);

        for (let n = 0; n < imageContent.length; n++) {
            view[n] = imageContent.charCodeAt(n);
        }
        const type = 'image/jpg';
        const blob = new Blob([buffer], { type });
        return new File([blob], fileName, { lastModified: new Date().getTime(), type });
    }

    const capture = React.useCallback(async () => {
        const webcam: Webcam = webcamRef.current!
        const base64 = webcam.getScreenshot() ?? ""
        setImgSrc(base64)
        try {
            const fd = new FormData();
            const arquivo = getFileFromBase64(base64, 'perfil.jpg')
            fd.append('file', arquivo)
            fetch(`${import.meta.env.VITE_FACIAL_API_URL}`, { method: 'POST', body: fd }).then(res => res.json()).then(res => {
                const cpf = res.faces[0].id
                fetch(`${import.meta.env.VITE_API_URL}/api/pacientes?filters[$and][0][CPF][$eq]=${cpf}`)
                    .then((response) => response.json())
                    .then(({data}) => {
                        if(data.length === 0){
                            return navigate("/recepcao")
                        } else {
                            user.setUserInContext(data[0].attributes)
                            user.setPhotoInContext(base64)
                            user.setUserIdInContext(data[0].id)
                            return navigate("/paciente")
                        }
                    }).catch((e) => navigate("/recepcao"))
            })
        } catch (error) {
            alert("Erro ao capturar a foto!")
        }
    }, [])


    return (
        <main>
            <div className='container-mod'>
                <div className="webcam">
                    <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        screenshotQuality={1}
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