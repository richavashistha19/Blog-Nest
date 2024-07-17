import { Box, styled, FormControl, InputBase, Button } from '@mui/material';
import {AddCircle as Add} from '@mui/icons-material';

const Container = styled(Box)`
margin: 50px 100px
`

const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover'
});

const styledFormControl = styled(FormControl)`
margin-top: 10px;
display: flex;
flex-direction: row;
`

const InputTextField = styled(InputBase)`
flex: 1;
margin: 0 30px;
`

const CreatePost = () => {

    const url = '';
    return(
        <Container>
            <Image src={url} alt="banner" />

            <formControl>
                <label htmlFor="fileInput">
                    <Add fontSize="large" color="action"/>
                </label>
                <input 
                type="file"
                id="fileInput"
                style={{ display: 'none'}} />

                <InputBase placeholder='Title' />
                <Button variant="contained">Publish</Button>
            </formControl>
        </Container>
        
    )
}

export default CreatePost;