import React, { useState, useEffect } from 'react'
import { Paper, makeStyles, List, ListItem, ListItemAvatar, Avatar, ListItemText, Divider } from '@material-ui/core'
import LanguageIcon from '@material-ui/icons/Language';
import { getConversations } from '../Actions/ChatService'
import { useSelector, useDispatch } from "react-redux";


const useStyles = makeStyles(theme => ({

    root: {
        height: "100%",
    }
}))

function Conversations(props) {

    const [conversations, setConversations] = useState([]);

    const dispatch = useDispatch()
    const userId=useSelector((state)=>{
        return state.auth.user._id;
      })

    useEffect(() => {
        dispatch(getConversations())
            .then(res => setConversations(res.conversations));

            // eslint-disable-next-line  
    }, [props.newConversation]);




    const handleRecipient = recipients => {
        for (let i = 0; i < recipients.length; i++) {
            if (
                recipients[i]._id !== userId
               
            ) {
                return recipients[i];
            }
        }
        return null;
    };


    const classes = useStyles()
    return (

        <Paper className={classes.root}>
            <List>
                <ListItem
                    onClick={() => {
                        props.setScope('Global Chat');
                    }}
                    button
                >
                    <ListItemAvatar>
                        <Avatar >
                            <LanguageIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary="Global Chat"
                    />
                </ListItem>
                <Divider />
                {conversations && (
                    <React.Fragment>
                        {conversations.map((c, key) => (
                            <ListItem
                                key={key}
                                button
                                onClick={() => {
                                    props.setUser(handleRecipient(c.recipients));
                                    props.setScope( handleRecipient(c.recipients).name);                
                                }}
                            >
                                <ListItemAvatar>
                                    <Avatar>AD</Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={handleRecipient(c.recipients).name}
                                    secondary={
                                        <React.Fragment>
                                            {c.lastMessage.split(" ").slice(0,5).join(" ")}
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                        ))}
                    </React.Fragment>
                )}
            </List>
        </Paper>
    )
}

export default Conversations
