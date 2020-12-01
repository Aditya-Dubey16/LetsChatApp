import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import styles from './styles';
import Divider from '@material-ui/core/Divider';
import { Badge} from '@material-ui/core';



class FriendList extends React.Component {

      selectChat =  (index) => {
        this.props.selectChatFn(index);
      }

  render(){
    const { classes } = this.props;
    if( this.props.optionsSelected === 'Friends') {
    return(
      <main className={classes.content}>
          <List>
          {
            this.props.chats.map((_chat, _index) =>  {
              return(
                <div key={_index}>

                <ListItem onClick={()  =>  this.selectChat(_index)}
                className={classes.listItem}
                selected={this.props.selectedChatIndex === _index}
                alignItems='flex-start'>

                <ListItemAvatar>
                      <Avatar  alt='User'>{(_chat.users.filter(_user  => _user !== this.props.userEmail)[0].split('')[0]).toUpperCase()}</Avatar>

                </ListItemAvatar>

                <ListItemText primary={(_chat.users.filter(_user  => _user !== this.props.userEmail)[0].split('@')[0]).charAt(0).toUpperCase() + (_chat.users.filter(_user  => _user !== this.props.userEmail)[0].split('@')[0]).slice(1)}>
                </ListItemText>
                </ListItem>
                <Divider></Divider>


                </div>

              );
            })
          }
          </List>
      </main>
    );
  } else if (this.props.optionsSelected === 'Profile') {


    return(
    <main className={classes.content}>




          <div className={classes.profile}>


            <div  className={classes.av}>
            <Badge anchorOrigin={{
                vertical: 'bottom',
                  horizontal: 'right',}}  className={classes.badge} overlap="circle" color="primary" badgeContent=" ">
                <Avatar className={ classes.large} alt='User'>

                      {((this.props.userEmail)[0].split('')[0]).toUpperCase()}

                      </Avatar>
                      </Badge>


                </div><br/>

          <Typography className={classes.lo} >{(( this.props.userEmail).split('@')[0]).charAt(0).toUpperCase() + ((this.props.userEmail).split('@')[0]).slice(1)}
          </Typography>




          </div>






    </main>
  );
}  else {
  return(
  <main className={classes.content}></main>
);
}

  }

}
export default withStyles(styles)(FriendList);
