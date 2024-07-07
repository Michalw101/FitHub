import { useContext, useState } from 'react';
import { UserContext } from '../App';
import '../css/trainerStep2.css';
import { serverRequests } from '../Api';

const TrainerStep2 = ({  handleChanged, signupUser, errors }) => {

    const [instegramLink, setInstegramLink] = useState(false);
    const [facebookLink, setFacebookLink] = useState(false);
    const [twitterLink, setTwitterLink] = useState(false);
    const [file, setFile] = useState(null);
    const [uploadError, setUploadError] = useState('');
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile && selectedFile.type !== 'application/pdf') {
            setUploadError('Please select a PDF file.');
            setFile(null);
            setUploadSuccess(false);
        } else {
            setFile(selectedFile);
            setUploadError('');
            setUploadSuccess(false);
        }
    };

    const handleFileUpload = async (event) => {
        event.preventDefault();
        if (!file) {
            setUploadError('Please select a file to upload.');
            return;
        }

        setIsUploading(true);

        const fileFormData = new FormData();
        fileFormData.append('file', file);

        serverRequests('POST', 'upload', fileFormData)
            .then(response => {
                setIsUploading(false);
                console.log(response);
                if (!response.ok) {
                    setUploadError('Failed to upload file.');
                    return;
                }
                return response.json();
            })
            .then(data => {
                if (data) {
                    handleChanged({ target: { name: "degree_link", value: data.url } });
                    setUploadSuccess(true);
                    setFile(null);
                }
            })
            .catch(error => {
                setIsUploading(false);
                setUploadError('An error occurred while uploading the file.');
                console.error('File upload error:', error);
            });
    };
    return (
        <div className='details'>
            <p className='headerP'>Now, let's talk about your experience...</p><br></br><br></br>
            <p className='topics'>What's your ID number?</p>
            <div className='inputGroup'>
                <input
                    type="text"
                    required=""
                    autoComplete="off"
                    name="user_id"
                    value={signupUser.user_id || ''}
                    onChange={handleChanged} />
            {errors.user_id && <p className="error">{errors.user_id}</p>}
            </div>

            <p className='topics'>Where was your last place of work?</p>
            <div className='inputGroup'>
                <input
                    type="text"
                    required=""
                    autoComplete="off"
                    name="last_work_place"
                    value={signupUser.last_work_place || ''}
                    onChange={handleChanged} />
            {errors.last_work_place && <p className="error">{errors.last_work_place}</p>}
            </div>

            <p className='topics'>Where did you study and acquire a trainer's degree?</p>
            <div className='inputGroup'>
                <input
                    type="text"
                    required=""
                    autoComplete="off"
                    name="diploma"
                    value={signupUser.diploma || ''}
                    onChange={handleChanged} />
            {errors.diploma && <p className="error">{errors.diploma}</p>}
            </div>

            <p className='topics'>What's your specialization?</p>
            <div className='inputGroup'>
                <input
                    type="text"
                    required=""
                    autoComplete="off"
                    name="specialization"
                    value={signupUser.specialization || ''}
                    onChange={handleChanged} />
            {errors.specialization && <p className="error">{errors.specialization}</p>}
            </div>

            <p className='topics'>Please upload a PDF file of your degree</p><br></br>
            <form className="file-upload-form" onSubmit={handleFileUpload}>
                
                <label htmlFor="file" className="file-upload-label">
                    <div className="file-upload-design">
                        <svg viewBox="0 0 640 512" height="1em">
                            <path
                                d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"
                            ></path>
                        </svg>
                        
                        <span className="browse-button">Browse file</span>
                    </div>
                    <input id="file" type="file" onChange={handleFileChange} />
                </label>
                <button type="submit" disabled={isUploading} className="btn"><i className="animation"></i>Upload<i className="animation"></i>
                </button>
            </form>

            {uploadError && <p className="error">{uploadError}</p>}
            {uploadSuccess && <p className="success">File uploaded successfully!</p>}
            {isUploading && <p className="loading">Uploading...</p>}
            {errors.degree_link && <p className="error">{errors.degree_link}</p>}

            <br></br>
            <p className='topics'>How many years of experience do you have?</p>
            <div className='inputGroup'>
                <input type="number" name="experience" min="0" max="50" onChange={handleChanged} />
            </div>
            {errors.experience && <p className="error">{errors.experience}</p>}


            <br></br>
            <p className='topics'>Want to share your social life as a Trainer?</p><br />
           
            <div className='linksInput'>

                <button className="button" onClick={() => setInstegramLink((prev) => !prev)}>
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        height="24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        className="w-6 h-6 text-gray-800 dark:text-white"
                    >
                        <path
                            clipRule="evenodd"
                            d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z"
                            fillRule="evenodd"
                            fill="currentColor"
                        ></path>
                    </svg>
                </button>

                <button className="button" onClick={() => setFacebookLink((prev) => !prev)}>
                    <svg fill="white" width="24px" height="24px" viewBox="-5.5 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <title>facebook</title>
                        <path d="M1.188 5.594h18.438c0.625 0 1.188 0.563 1.188 1.188v18.438c0 0.625-0.563 1.188-1.188 1.188h-18.438c-0.625 0-1.188-0.563-1.188-1.188v-18.438c0-0.625 0.563-1.188 1.188-1.188zM14.781 17.281h2.875l0.125-2.75h-3v-2.031c0-0.781 0.156-1.219 1.156-1.219h1.75l0.063-2.563s-0.781-0.125-1.906-0.125c-2.75 0-3.969 1.719-3.969 3.563v2.375h-2.031v2.75h2.031v7.625h2.906v-7.625z"></path>
                    </svg>
                </button>

                <button className="button" onClick={() => setTwitterLink((prev) => !prev)}>
                    <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        height="24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        className="w-6 h-6 text-gray-800 dark:text-white"
                    >
                        <path
                            clipRule="evenodd"
                            d="M22 5.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.343 8.343 0 0 1-2.605.981A4.13 4.13 0 0 0 15.85 4a4.068 4.068 0 0 0-4.1 4.038c0 .31.035.618.105.919A11.705 11.705 0 0 1 3.4 4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 6.1 13.635a4.192 4.192 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 2 18.184 11.732 11.732 0 0 0 8.291 20 11.502 11.502 0 0 0 19.964 8.5c0-.177 0-.349-.012-.523A8.143 8.143 0 0 0 22 5.892Z"
                            fillRule="evenodd"
                        ></path>
                    </svg>
                </button>
            </div><br />

            {instegramLink && (<div className='inputGroup'>
                <input
                    type="text"
                    required=""
                    autoComplete="off"
                    name="instegram_link"
                    value={signupUser.instegram_link || ''}
                    onChange={handleChanged}
                    placeholder='Instegram link' />
            </div>)}

            {facebookLink && (<div className='inputGroup'>
                <input
                    type="text"
                    required=""
                    autoComplete="off"
                    name="facebook_link"
                    value={signupUser.facebook_link || ''}
                    onChange={handleChanged}
                    placeholder='Facebook link' />
            </div>)}
            {twitterLink && (<div className='inputGroup'>
                <input
                    type="text"
                    required=""
                    autoComplete="off"
                    name="twitter_link"
                    value={signupUser.twitter_link || ''}
                    onChange={handleChanged}
                    placeholder='Twitter link' />
            </div>)}
        </div>
    );
};

export default TrainerStep2;
