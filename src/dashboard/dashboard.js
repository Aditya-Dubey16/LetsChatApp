import React from 'react';
import ChatListComponent from '../chatlist/chatList';
import ChatViewComponent from '../chatView/chatView';
import {Button , withStyles} from '@material-ui/core';
import ChatTextBox from  '../chatTextBox/chatTextBox';
import NewChat from '../newChat/newChat';
import FriendList from '../chatView/friendList';
import styles from './styles';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';



class DashboardComponent extends React.Component {

  constructor(){
    super();
    this.state = {
      selectedChat: null,
      newChatFormVisible: false,
      optionsForm: false,
      optionsSelected: null,
      email: null,
      chats: []

    };
  }

render() {

    const { classes } = this.props;

  return(
    <div>
    {
    <ChatListComponent history={this.props.history}
    newChatBtnFn={this.newChatBtnClicked}
    selectChatFn={this.selectChat}
    chats={this.state.chats}
    userEmail={this.state.email}
    selectedChatIndex={this.state.selectedChat}
    optionsSelected={this.optionsSelected} />

  }


    {

      this.state.newChatFormVisible === false && this.state.optionsForm === true ?
      null :
      <ChatViewComponent
          user={this.state.email}
          chat={this.state.chats[this.state.selectedChat]}/>

    }

    {
      this.state.optionsForm ?
      <FriendList  optionsSelected={this.state.optionsSelected}
      chats={this.state.chats}
      userEmail={this.state.email}
      selectChatFn={this.selectChat}/>:
      null


    }


    {
      this.state.selectedChat !== null && !this.state.newChatFormVisible && this.state.optionsForm === false ?
      <ChatTextBox messageReadFn={this.messageRead} submitMessageFn={this.submitMessage}    newChatFormVisible={ this.state.newChatFormVisible}/> :
      null
    }
    {
      this.state.newChatFormVisible ?
      <NewChat  goToChatFn={this.goToChat} newChatSubmitFn={this.newChatSubmit}/>:
      null
    }
    <Button  className={ classes.signOutBtn} onClick={this.signOut}>Sign Out </Button>
    </div>
  );
}

signOut = () => firebase.auth().signOut();

selectChat = async (chatIndex) => {
  console.log('index:', chatIndex);
  await this.setState({ selectedChat: chatIndex, newChatFormVisible: false, optionsForm: false });

  this.messageRead();
}

optionsSelected =  async (option) => {
   await this.setState({optionsSelected: option, optionsForm: true});

}

submitMessage = (msg) => {
      const docKey = this.buildDocKey(this.state.chats[this.state.selectedChat].users.filter(_user =>  _user !== this.state.email)[0]);
      firebase
      .firestore()
      .collection('chats')
      .doc(docKey)
      .update({
        messages: firebase.firestore.FieldValue.arrayUnion({
          sender:this.state.email,
          message:msg,
          timestamp: Date.now()
        }),
        receiverHasRead:  false
      });
}

buildDocKey = (friend) => [this.state.email, friend].sort().join(':');

newChatBtnClicked = () => this.setState({ newChatFormVisible:  true, selectedChat: null});

messageRead = () => {
    const docKey  = this.buildDocKey(this.state.chats[this.state.selectedChat].users.filter(_user =>  _user !== this.state.email)[0]);
    if (this.clickedMessageWhereNotSender(this.state.selectedChat)) {
      firebase
        .firestore()
        .collection('chats')
        .doc(docKey)
        .update({receiverHasRead:  true})
    } else{
      console.log(' I am the sender')
    }
}

goToChat  = async (docKey, msg) =>  {
  const userInChat = docKey.split(':');
  const chat = this.state.chats.find(_chat => userInChat.every(_user => _chat.users.includes(_user)));
  this.setState({ newChatFormVisible: false});
  await  this.selectChat(this.state.chats.indexOf(chat));
  this.submitMessage(msg);
}

newChatSubmit = async (chatObj) => {
  const docKey =this.buildDocKey(chatObj.sendTo);
  await firebase
  .firestore()
  .collection('chats')
  .doc(docKey)
  .set({
    receiverHasRead: false,
    users: [this.state.email, chatObj.sendTo],
    messages: [{
      message: chatObj.message,
      sender: this.state.email,
        timestamp: Date.now()
    }]
  });
  this.setState({newChatFormVisible: false});
  this.selectChat(this.state.chats.length - 1);
}

clickedMessageWhereNotSender = (chatIndex) => this.state.chats[chatIndex].messages[this.state.chats[chatIndex].messages.length - 1].sender !== this.state.email;

componentDidMount = () =>  {
  firebase.auth().onAuthStateChanged(async _user => {
    if(!_user){
      this.props.history.push('/login');
    }
    else {
      await firebase
            .firestore()
            .collection('chats')
            .where('users', 'array-contains', _user.email)
            .onSnapshot(async res => {
              const chats  = res.docs.map( doc => doc.data());
              await this.setState( {
                email: _user.email,
                chats: chats
              });
              console.log(this.state);
            })
    }
  })
}

}

export default withStyles(styles)(DashboardComponent);
