import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import styles from './styles';
import Divider from '@material-ui/core/Divider';
import {Button, IconButton, Menu, MenuItem} from '@material-ui/core';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import NotificationImportant from '@material-ui/icons/NotificationImportant';


class ChatListComponent extends React.Component{

  constructor(){
    super();
    this.state = {
      anchorEl: null

    };
  }

  render() {
    const options = ['Friends', 'Profile'];


    const open = Boolean(this.state.anchorEl);

    const {classes} = this.props;

       if(this.props.chats.length > 0) {
    return(
      <main className={classes.root}>
          <Button variant='contained'
            color='primary'
          className={classes.newChatBtn}
          onClick={this.newChat}>New Chats </Button>


          <IconButton
          className={classes.moreBtn}
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={this.handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu  onSubmit={(event)  => this.handleClose(event)}
        id="long-menu"
        anchorEl={this.state.anchorEl}
        keepMounted
        open={open}
        disableBackdropClick
        disableEscapeKeyDown
        onBackdropClick={this.onBackdropClick}
        onClose={this.handleClose}>
        {options.map((option, index) => (
          <MenuItem key={index} selected  = {null} value = {option} onClick={(event)=>this.handleClose(event, option)}>
            {option}
          </MenuItem>
        ))}
      </Menu>


            <List>
          {
            this.props.chats.map((_chat, _index) => {

              return(
            <div key={_index}>
                <ListItem onClick={()  =>  this.selectChat(_index)}
                className={classes.listItem}
                selected={this.props.selectedChatIndex === _index}
                alignItems='flex-start'>

                    <ListItemAvatar>
                          <Avatar  alt='User'>{(_chat.users.filter(_user  => _user !== this.props.userEmail)[0].split('')[0]).toUpperCase()}</Avatar>

                    </ListItemAvatar>
                    <ListItemText primary={(_chat.users.filter(_user  => _user !== this.props.userEmail)[0].split('@')[0]).charAt(0).toUpperCase() + (_chat.users.filter(_user  => _user !== this.props.userEmail)[0].split('@')[0]).slice(1)}
                        secondary={
                          <React.Fragment>
                          <Typography component='span' color='textPrimary'>
                          { _chat.messages[ _chat.messages.length  - 1].message.substring(0, 10) +  '...'}

                          </Typography>
                          </React.Fragment>
                        }>
                    </ListItemText>
                    {

                        _chat.receiverHasRead === false && !this.userIsSender(_chat) ?
                        <ListItemIcon>
                              <NotificationImportant className={classes.unreadMessage} />
                        </ListItemIcon> :

                        null


                    }

                </ListItem>
                <Divider></Divider>
          </div>
              );
            })

          }
          </List>


      </main>
    );
  }
  else  {
    return(
        <main className={classes.root}>
          <Button variant="contained"
            fullWidth
            color='primary'
            onClick={this.newChat}
            className={classes.newChatBtn}>
              No Chats
          </Button>
          <List></List>
        </main>
    );
  }
}

  newChat = () => {
    this.props.newChatBtnFn();
  }

  selectChat =  (index) => {
        this.props.selectChatFn(index);
  }

  userIsSender = (chat) =>  chat.messages[chat.messages.length  -  1].sender === this.props.userEmail;

   handleClick = (event) => {
    this.setState({anchorEl: event.currentTarget});

  }

   handleClose = (event, option) => {
    this.setState({anchorEl: null});
    this.props.optionsSelected(option);
    console.log('sel:', option)

  }

  onBackdropClick = () => {

     this.setState({anchorEl: null});
  }

  selected = (index) => {

  }


}

export default withStyles(styles)(ChatListComponent);
