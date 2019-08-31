import React, { useState, useEffect, Fragment } from 'react';
import Posts from './components/Posts';
import Pagination from './components/Pagination';
import './App.css';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await fetch('https://jsonplaceholder.typicode.com/posts');
      const json = await res.json();
      setPosts(json);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts && posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className='container mt-5'>
      <h1 className='text-primary mb-3'>Page</h1>
      {posts&&
      <Fragment>
        <Posts posts={currentPosts} loading={loading} />
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={posts.length}
          paginate={paginate}
        />
      </Fragment>}
    </div>
  );
};

export default App;