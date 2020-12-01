import React from 'react';
import styles from './styles';
import { withStyles, Typography, Grid } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';


class  ChatViewComponent extends React.Component {

  constructor(){
    super();
    this.state  = {
      sign: 0
    };
  }


  componentDidUpdate  = () => {
    const container = document.getElementById('chat-view');
    if(container)
      container.scrollTo(0 , container.scrollHeight);


  }

  componentDidMount  = () => {
    const container = document.getElementById('chat-view');
    if(container)
      container.scrollTo(0 , container.scrollHeight);


  }

  render(){

    const { classes, chat, user } = this.props;

    if(chat === undefined)  {
      return(<main id='chat-view' className={classes.content} /> );
    }
    else {
      return(

        <div>
          <div className={classes.chatHeader}>
              {(chat.users.filter(_usr => _usr !==  user)[0].split('@')[0]).charAt(0).toUpperCase() + (chat.users.filter(_usr => _usr !==  user)[0].split('@')[0]).slice(1) }
          </div>
          <main id='chat-view' className={classes.content} >

          <div className={classes.stampDate}>


              {new Date(chat.messages[0].timestamp).getDate()}/{( new Date(chat.messages[0].timestamp).getMonth() + 1)}/{new Date(chat.messages[0].timestamp).getFullYear()}



          </div>


          {
            chat.messages.map((mes, index) => {
              {this.state.sign = index + 1}
              return(

                <div key={index}>



                <div  className={mes.sender === user ? classes.userSent : classes.friendSent} >

                  <div className={mes.sender !== user ?  classes.emp : null}>
                  {
                      mes.sender !== user ?
                    <Avatar  alt='User' >{((mes.sender).split('@'))[0].charAt(0).toUpperCase()}</Avatar>:
                    null
                  }
                  <div className={mes.sender !== user ? classes.p  :  null}>
                  {mes.message}<br/>
                  </div>
                  </div>

                  <Typography className={classes.stamp}> &nbsp; {new Date(mes.timestamp).getHours()}:{('0' + new Date(mes.timestamp).getMinutes()).slice(-2)}
                  </Typography>



                </div>




                <div>
                {
                  this.state.sign < chat.messages.length     ?
                  <div>
                  {
                     new Date(chat.messages[this.state.sign -  1].timestamp).getDate() !== new Date(chat.messages[this.state.sign ].timestamp).getDate()    ?
                   <Typography className={classes.stampDate}>{new Date(chat.messages[index + 1].timestamp).getDate()}/{(new Date(chat.messages[index + 1].timestamp).getMonth() + 1)}/{new Date(chat.messages[index + 1].timestamp).getFullYear()}</Typography>:
                    null

                  }
                </div>:
                null
                }
                </div>






              </div>

              );
            })

          }

          </main>
        </div>

      );
    }
  }


}

export default withStyles(styles)(ChatViewComponent);
