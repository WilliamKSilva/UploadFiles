import React, { Fragment, useState } from 'react'; 
import '../styles/layoutUpload.css'  
import axios from 'axios'; 



const FileUpload = () => {
    const [file, setFile] = useState('');
    const [filename, setFilename] = useState('Choose File'); 
    const [uploadedFile, setUploadedFile] = useState({});

    const onChange = e => {
        setFile(e.target.files[0]); 
        setFilename(e.target.files[0].name);
    };
        
    const onSubmit = async e => {
        e.preventDefault(); 
        const formData = new FormData(); 
        formData.append('file', file);
    
        try {
            const res = await axios.post('http://localhost:5000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }); 

            const { fileName, filePath } = res.data; 

            setUploadedFile({ fileName, filePath });
        
        } catch(err) { 
            if(err.response.status === 500) {
                console.log('Problem detected with the server'); 

            } else {
                console.log(err.response.data.msg);
            }  
        }
    
        showArchive();
    };

    const showArchive = () => {
        
        const hideElement = document.getElementById("text-1").style.visibility = "hidden"; 
        const showElement = document.getElementById("text-2").style.visibility = "visible";
        const showImage = document.getElementById("uploadedImage").style.visibility = "visible";
    }

        return (
            <Fragment>
                <div id="uploadBox">
                    <form onSubmit={onSubmit}>
                        <div className="custom-file">
                            <input type="file" className='custom-file-input' id="customFile" onChange={onChange} />
                            <label className='custom-file-label' htmlFor="customFile">
                                {filename}
                            </label>
                        </div>
                        <input type="submit" value="Upload" className="btn-primary"/>
                    </form>
                    <section id="uploadContainer">
                    <p id="text-1">
                        SEM NENHUM ARQUIVO
                    </p>
                    <p id="text-2">
                        <img id="uploadedImage" src="/images/folder.png"></img> 
                            Arquivo carregado!
                    </p>
                    </section>
                </div>
                <div id="icon-fonts">Ícones feitos por <a href="https://www.flaticon.com/br/autores/srip" title="srip">srip</a> from <a href="https://www.flaticon.com/br/" title="Flaticon">www.flaticon.com</a></div>
                <div id="icon-fonts-1">Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
                <div id="icon-fonts-2">Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
            </Fragment>

        );
    }; 


export default FileUpload;


