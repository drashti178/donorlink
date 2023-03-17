import {
    Button,
    Avatar
} from "@mui/material";
import PhotoCamera from '@mui/icons-material/PhotoCamera';

const FileInput = (props) => {

    return (
        <>
            <input
                accept="image/*"
                type="file"
                id="select-image"
                style={{ width: "20%" ,display: "none",marginRight:"590px",marginTop:"-80px",
            }} 
                
                onChange={props.onFileUpload}
            />
            <label htmlFor="select-image" >
                <Button  style={{ width: "20%" ,display:"flex",marginRight:"5000px",marginTop:"-80px",flexWrap:"nowrap",
            justifyContent:"flex-start"}} component="span">
                    <Avatar sx={{ bgcolor: "#9C7875", height: 130, width: 130 }}>
                        {(props.imageUrl && props.profile) ? (
                            <Avatar alt="" style={{ margin: "center center", height: 130, width: 130 }} src={props.imageUrl} />
                        ) : <PhotoCamera style={{ margin: "center center", height: 90, width: 90 }} />}
                    </Avatar>
                </Button>
            </label>
        </>
    );
};

export default FileInput;