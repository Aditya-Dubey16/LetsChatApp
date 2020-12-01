const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing(),
    marginRight: theme.spacing(),
    [theme.breakpoints.up(400 + theme.spacing())]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    padding: `${theme.spacing()}px ${theme.spacing()}px ${theme.spacing()}px`,
    position: 'absolute',
    width: '350px',
    top: '50px',
    left: 'calc(50% + 150px - 175px)'
  },
  input: {
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(),
  },
  submit: {
    marginTop: theme.spacing()
  },
  errorText: {
    color: 'red',
    textAlign: 'center'
  }
});

export default styles;
