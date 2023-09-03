import React, {useState} from 'react';
import axios from "axios"; 
import { Link } from 'react-router-dom'; 

// Imports for Uploads
import {Upload, Space, Typography, Progress} from 'antd';  
import { CloudUploadOutlined, FileTextOutlined } from "@ant-design/icons";
 
// Icons 
import ErrorIcon from '@mui/icons-material/Error';

// CSS Styles 
import '../../../../styles/pages/ADMIN_PAGES/STUDENTS/ADD_STUDENT/uploadFile.scss';

const UploadFile = () => {

    const {Dragger} = Upload;
    const [files, setFiles] = useState({}); 

    const handleFileUpload =  ({file}) => {
            console.log(file)
        const getFileObject = (progress, estimated)=> {
            return {
                entireFile: file,                 
                name: file.name,
                uid: file.uid,
                type: file.type,
                progress: progress,
                estimated: estimated || 0
            }
        }
        axios.post("http://localhost:4000/fileUpload", file, {
            onUploadProgress:((event) => {      
                //console.log(event.estimated)  
                setFiles((pre)=> {
                    return{[file.uid]:getFileObject(event.progress, event.estimated)}
                })
            })
        })
    };
     
    const getTimeString = (timeInSeconds) => {
        const hours = Math.floor(timeInSeconds/3600);
        const minutes = Math.floor(timeInSeconds/60 - hours*60);
        const seconds = Math.floor(timeInSeconds - minutes*60 -hours*3600);
        let timeString = `${seconds} sec`;

        if (minutes) {
            timeString = `${minutes} min ${timeString}`
        }
        if (hours) {
            timeString = `${hours} hrs ${timeString}`
        }
        return timeString;
    }

    return(
        <div className="upload-container">
            <Space className='space' direction="vertical">
                <Dragger className='dragger' 
                         multiple={false} 
                         accept='.csv'
                         customRequest={handleFileUpload} 
                         showUploadList={false} 
                         >
                    <p className="ant-upload-drag-icon">
                        <CloudUploadOutlined style={{fontSize:'5rem'}}/>
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                        Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                        banned files.
                    </p>
                </Dragger>
                {Object.values(files).map((file, index) => { 
                   
                    return(                       
                    file.type === "text/csv" ?
                        <div key={index} >
                            <Space  className='space2' direction="vertical">
                                <Space className='space3' 
                                    style={{backgroundColor: "rgba(0,0,0,0.05)", 
                                        
                                            padding: 8}}>
                                    <FileTextOutlined />
                                    <Typography  style={{color:'#17a2b8', fontWeight:'600'}}>{file.name}</Typography>
                                    {file.estimated ? (
                                            <Typography.Text type="secondary">
                                                {" "}
                                                is being uploaded in {getTimeString(file.estimated)} seconds
                                            </Typography.Text>
                                        ) : (
                                            <Typography.Text type="secondary">
                                                {" "}
                                                is uploaded Successfully!
                                            </Typography.Text>
                                        )
                                    }
                                </Space>
                                <Progress percent={Math.ceil(file.progress*100)}/>
                            </Space>
                            <div className="buttons" style={{marginLeft: 'center'}}>
                                <button className="next_step" type="button">                                     
                                    <Link style={{color:'white', zIndex:5}}  
                                        to =  {"/uth-ece_admin/add_student/validate_file"}
                                        state = {{state: file.entireFile}}
                                    >
                                    Επόμενο</Link></button>
                            </div> 
                        </div>
                        :
                        <Space key={index} className='spaceError' direction="vertical">
                            <div className='errorMessage'>
                            <ErrorIcon className='icon'/>
                            <div className='errorFile'><h3>Ο τύπος αρχείου "{file.type}" δεν είναι έγκυρος !</h3> <br></br> Παρακαλώ προσπαθήστε ξανά εισάγοντας αυτή τη φορά τον επιτρεπτό τύπο αρχείο (αρχείο τύπου <h4>csv</h4>) </div>
                            </div>
                        </Space>
                    )
                })}
            </Space>  
        </div>   
    )
}

export default UploadFile;