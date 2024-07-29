import { useState, useEffect } from 'react';
import { API } from '../../../service/api';
import { Box, Grid} from '@mui/material';
import React from 'react';

import Post from './Post';

import { useSearchParams, Link } from 'react-router-dom';

const Posts = () => {
    const [posts, setPosts] = useState([]);

    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await API.getAllPosts({ category: category || ''});
                if (response && response.isSuccess) {
                    setPosts(response.data);
                } else {
                    console.error('Error fetching posts:', response);
                }
            } catch (error) {
                console.error('Error while fetching posts:', error);
            }
        }
        fetchData();
    }, [category]);

    return (
        <>
            {posts && posts.length > 0 ? (
                posts.map(post => (
                    <Grid item lg={3} sm={4} xs={12}>
                    <Link to={`details/${post._id}`} style={{ textDecoration: 'none', color: 'inherit'}}>
                    <Post post={post}/>
                    </Link>
                    </Grid>
                ))
            ) : (
                <Box style={{ color: '#878787', margin: '30px 80px', fontSize: 18 }}>No data available to display</Box>
            )}
        </>
    );
}

export default Posts;
