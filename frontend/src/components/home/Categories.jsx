import { Button, Table, TableBody, TableHead, TableRow, TableCell , styled} from '@mui/material';

import { categories } from '../../constants/data';

import { Link } from 'react-router-dom';

const styledTable = styled(Table)`
border: 1px solid rgba(224, 224, 224, 1);
`

const StyledButton = styled(Button)`
margin: 20px;
width: 85%;
background: #6495ED;
color: #fff;
`

const Categories = () => {
    return (
        <>
        <Link to ='/create' style={{ textDecoration: 'none'}}>
        <StyledButton variant="contained">Create Blog</StyledButton>
        </Link>
        <styledTable>
            <TableHead>
                <TableRow>
                    <TableCell>
                        All Categories
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableHead>
                <TableBody>
                    {
                        categories.map(category => (
                            <TableRow key={category.id}>
                            <TableCell>{category.type}</TableCell>
                        </TableRow> 
                        ))
                    }
                </TableBody>
            </TableHead>
        </styledTable>
        </>
    )
}

export default Categories;