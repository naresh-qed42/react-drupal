import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Header from './Header';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import Main from './Main';
import Footer from './Footer';
import post1 from './blog-post.1.md';
import post2 from './blog-post.2.md';
import post3 from './blog-post.3.md';
import { globalConstants } from "../services/constants";

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));


const featuredPosts = [
  {
    title: 'Featured post',
    date: 'Nov 12',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random',
    imageText: 'Image Text',
  },
  {
    title: 'Post title',
    date: 'Nov 11',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random',
    imageText: 'Image Text',
  },
];

const posts = [post1, post2, post3];

export default function Blog() {
  const classes = useStyles();
  const [sitename, setSiteName] = useState('');
  const initialmenu = [
    { title: '', value: "#" }];
  const [menus, setSiteMenu] = useState(initialmenu);

  const getSitename = () => {
    fetch(globalConstants.BASE_URL + '/rest/api/get/sitename', {
      method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
      if (data.site_name) {
        setSiteName(data.site_name)
      }
    })
  }
  const getSiteMenu = () => {
    fetch(globalConstants.BASE_URL + '/api/menu_items/main', {
      method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
      setSiteMenu(data);
    })
  }
  useEffect(() => {
    getSitename();
    getSiteMenu();
  },[]);
  return (

    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title={sitename} sections={menus} />
        <main>

          <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>
          <Grid container spacing={5} className={classes.mainGrid}>
            <Main title="From the firehose" posts={posts} />

          </Grid>
        </main>
      </Container>
      <Footer description="Decoupled Drupal website with React" />
    </React.Fragment>
  );
}
