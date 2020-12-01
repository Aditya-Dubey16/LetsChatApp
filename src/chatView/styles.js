const styles = theme => ({

  palette: {
      primary: 'purple',
      secondary: 'red'
    },
  content: {
    height: 'calc(100vh - 100px)',
    overflow: 'auto',
    padding: '25px',
    marginLeft: '300px',
    boxSizing: 'border-box',
    overflowY: 'scroll',
    top: '50px',
    width: 'calc(100% - 300px)',
    position: 'absolute'
  },

  friendSent: {
    float: 'left',
    clear: 'both',
    padding: '20px',
    boxSizing: 'border-box',
    wordWrap: 'break-word',
    marginTop: '10px',
    backgroundColor: '#707BC4',
    color: 'white',
    width: '300px',
    borderRadius: '10px',
  },

  userSent: {
    float: 'right',
    clear: 'both',
    padding: '20px',
    boxSizing: 'border-box',
    wordWrap: 'break-word',
    marginTop: '10px',
    backgroundColor: '#003366',
    color: 'white',
    width: '300px',
    borderRadius: '10px'
  },

  chatHeader: {
    width: 'calc(100% - 301px)',
    height: '50px',
    backgroundColor: '#344195',
    position: 'fixed',
    marginLeft: '301px',
    fontSize: '18px',
    textAlign: 'center',
    color: 'white',
    paddingTop: '10px',
    boxSizing: 'border-box'
  },

  stamp: {
    fontSize:'12px',
    float: 'right'
  },

  stampDate: {

    backgroundColor: '#e6e6e6',
    fontWeight: '600',
    marginLeft: '-20px',
      marginTop: '0px',
      clear: 'both',
    fontSize: '12px',
    textAlign: 'center',
    color: 'black',
    paddingTop: '0px',
    paddingBottom: '0px',
    boxSizing: 'border-box'
  },
  emp: {
    display:'box'
  },
  p:{
    marginTop:'10px',
    marginLeft:'10px'
  },
  listItem: {
    cursor: 'pointer'
  },
  profile: {
    marginTop:'10px',
    marginLeft:'100px',
    textAlign: 'center',

    justifyContent: 'center',

  },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    fontSize: '80px',

  },
  av :{
      display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

  },
  lo:{
    fontSize: '40px',
  },
  badge:{
    Color:'green',
  },


});

export default styles;
