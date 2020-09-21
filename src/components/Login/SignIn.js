import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { globalConstants } from "../services/constants";
import CookieManager from "../services/cookieManager";


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [userpwd, setUserPwd] = useState('');
  const [errormsg, SetErrorMsg] = useState('');

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const data = new FormData();
    data.append("grant_type", globalConstants.grant_type);
    data.append("client_id", globalConstants.client_id);
    data.append("client_secret", globalConstants.client_secret);
    data.append("username", username);
    data.append("password", userpwd);
    fetch(globalConstants.BASE_URL + '/oauth/token', {
      method: 'POST',
      body: data,
    })
    .then(response => response.json())
    .then(data => {
      if (data.access_token) {
        window.location = '/blog';
        CookieManager.setCookie("drupal_cookie_session", data.access_token, data.expires_in)
      } else {
        SetErrorMsg(data.error)
      }
    })
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="User Name"
            name="email"
            autoComplete="email"
            onChange={event => setUsername(event.target.value)}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={event => setUserPwd(event.target.value)}
            autoComplete="current-password"
          />
          <span>{errormsg}</span>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>

        </form>
      </div>
      <Box mt={8}>
      </Box>
    </Container>
  );
}
