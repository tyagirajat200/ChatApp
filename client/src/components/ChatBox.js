import React, { useState, useEffect } from 'react'
import { Paper, TextField, makeStyles, Grid, IconButton, ListItem, ListItemAvatar, List, Avatar, ListItemText, Typography } from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send';
import ScrollToBottom from 'react-scroll-to-bottom'
import { getGlobalMessages, sendGlobalMessages, getConversationMessages, sendConversationMessage } from '../Actions/ChatService'
import { useDispatch } from "react-redux";


const useStyles = makeStyles(theme => ({

    root: {
        height: "100%",
    },

    form: {
        display: "flex",
        width: "100%",
        padding: theme.spacing(0, 2),
    },
    scroll: {
        height: "75vh",
    },
    header:{
        textAlign:"center"
    }
}))


function ChatBox(props) {

    const [newMessage, setNewMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const dispatch = useDispatch()



    useEffect(() => {
        reloadMessages();

        // eslint-disable-next-line  
    }, [props.lastMessage, props.scope]);


    const reloadMessages = () => {
        if (props.scope === 'Global Chat') {
            dispatch(getGlobalMessages()).then(res => {
                setMessages(res.messages);
            });
        } else if (props.scope !== null) {
            dispatch(getConversationMessages(props.user._id)).then(res =>
                setMessages(res.messages)
            );
        } else {
            setMessages([]);
        }
    };

    const onSubmit = e => {
        e.preventDefault();
        if (props.scope === 'Global Chat') {
            dispatch(sendGlobalMessages(newMessage)).then(() => {
                setNewMessage('');
            });
        } else {
            dispatch(sendConversationMessage(props.user._id, newMessage)).then(res => {
                setNewMessage('');
            });
        }
    };


    const classes = useStyles()
    return (
        <Paper className={classes.root}>
            <Grid container>
                <Grid item xs={12}>
                    <Paper className={classes.header} >
                        <Typography color="inherit" variant="h6">
                            {props.scope}
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} >
                    {messages && (
                        <List>
                            <ScrollToBottom className={classes.scroll}>
                                {messages.map((m, key) => (

                                    <ListItem
                                        key={key}

                                    >

                                        <ListItemAvatar>
                                            <Avatar>H</Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={m.from.name}
                                            secondary={
                                                <React.Fragment>
                                                    {m.body}
                                                </React.Fragment>
                                            }
                                        />

                                    </ListItem>

                                ))}
                            </ScrollToBottom>
                        </List>
                    )}


                </Grid>

                <Grid item xs={12}>
                    <form className={classes.form} onSubmit={onSubmit}>
                        <TextField
                            label="Message"
                            variant="outlined"
                            margin="dense"
                            fullWidth
                            value={newMessage}
                            onChange={e => setNewMessage(e.target.value)}
                        />
                        <IconButton type="submit">
                            <SendIcon />
                        </IconButton>
                    </form>
                </Grid>
            </Grid>

        </Paper>
    )
}

export default ChatBox
