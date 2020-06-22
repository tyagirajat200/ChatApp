import React, { useState, useEffect } from 'react'
import { Grid, makeStyles } from "@material-ui/core";
import Users from './Users'
import ChatBox from './ChatBox'
import Conversations from './Conversations'
import io from "socket.io-client"
import { useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
   root:{
    height: "91vh",
    backgroundColor:"black",
    width:"99%",
    justifyContent:"center",
    margin:"0.1rem auto"
   } 
    
}))

const socket = io.connect('https://mernchat7599.herokuapp.com');

function Postmessage() {
    const [scope, setScope] = useState('Global Chat');
    const [user, setUser] = useState(null);
    const [lastMessage, setLastMessage] = useState(null);
    const [newConversation, setNewConversation] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([])

    const userId=useSelector((state)=>{
        return state.auth.user;
      })


    useEffect(() => {
        
        socket.on('messages', data => setNewConversation(data));
        socket.on('messages', data => setLastMessage(data));
        socket.emit('newUser',userId)
        socket.on('online',data=>{  
            setOnlineUsers(data)   
            console.log(data);
             
        })

        return () => {
            socket.emit('offline',userId)
        
        };
        // eslint-disable-next-line 
    }, [])
    
    const classes=useStyles()
    return (
        <React.Fragment>
            <Grid container spacing={3} className={classes.root}>
                <Grid item xs={3}>
                    <Conversations  setUser={setUser} setScope={setScope} newConversation={newConversation}/>
                </Grid>
                <Grid item xs={6} >
                    <ChatBox scope={scope} user={user} lastMessage={lastMessage} socket={socket} />
                </Grid>
                <Grid item xs={3}>
                    <Users setUser={setUser} setScope={setScope} onlineUsers={onlineUsers}/>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default Postmessage
