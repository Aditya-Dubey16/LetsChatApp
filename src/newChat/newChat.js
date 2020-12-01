import React from 'react';
import { FormControl, InputLabel, Input, Button, Paper, withStyles, CssBaseline, Typography} from '@material-ui/core';
import styles from './styles';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

 require("firebase");

class NewChat extends React.Component {

    constructor(){
      super();
      this.state = {
        username: null,
        message: null
      };
    }

    render()  {

      const {  classes } = this.props;

      return (
        <main className= {classes.main}>
          <CssBaseline />
        <Paper className={classes.paper}>
            <Typography component='h1' variant='h5'>Send A Message!</Typography>
        <form className={classes.form} onSubmit={(e) => this.submitNewChat(e)}>
            <FormControl fullWidth>
                <InputLabel htmlFor='new-chat-username'>
                Enter Your Friend's Email
                </InputLabel>
                <Input required
                className={classes.input}
                autoFocus
                onChange={(e) => this.userTyping('username', e)}
                id='new-chat-username'></Input>
              </FormControl>

              <FormControl fullWidth>
                  <InputLabel htmlFor='new-chat-message'>
                  Enter Your Message
                  </InputLabel>
                  <Input required
                  className={classes.input}
                  autoFocus
                  onChange={(e) => this.userTyping('message', e)}
                  id='new-chat-message'></Input>
                </FormControl>
                <Button fullWidth className={classes.submit} varient='contained' color='primary' type='submit'>Submit</Button>

          </form>
          </Paper>
          </main>


      );
    }

    userTyping = (type,e) => {
      switch (type) {
        case 'username':
          this.setState({  username: e.target.value});
          break;
        case 'message':
          this.setState({ message: e.target.value});
        break;
        default:
        break;

      }
    }

    submitNewChat = async (e) => {
      e.preventDefault();
      const  userExists = await  this.userExists();
      if(userExists)  {
        const chatExists  = await  this.chatExists();
        chatExists ? this.goToChat() : this.createChat();
      }
    }

    createChat = () => {
      this.props.newChatSubmitFn({
        sendTo: this.state.username,
        message: this.state.message,
      });
    }

    goToChat =() => this.props.goToChatFn(this.buildDocKey(), this.state.message);

    buildDocKey = ()  => {
      return [firebase.auth().currentUser.email, this.state.username].sort().join(':');
    }

    chatExists = async () => {
      const docKey = this.buildDocKey();
      const chat = await  firebase
      .firestore()
      .collection('chats')
      .doc(docKey)
      .get();
      console.log(chat.exists);
    }
    userExists = async () => {
      const UserSnapshot = await firebase
      .firestore()
      .collection('users')
      .get();
      const exists = UserSnapshot.docs
          .map(_doc => _doc.data().email)
          .includes(this.state.username);
          return  exists;
    }
  }

export default withStyles(styles)(NewChat);
