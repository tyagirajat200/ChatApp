import React, { useState, useEffect } from 'react'
import { Paper, makeStyles, List, ListItem, ListItemAvatar, Avatar, ListItemText, Divider } from '@material-ui/core'
import { getUsers } from '../Actions/ChatService'
import { useDispatch, useSelector } from "react-redux";
import PeopleIcon from '@material-ui/icons/People';

const useStyles = makeStyles(theme => ({

    root: {
        height: "100%",
    }
}))

function Users(props) {

    const [users, setUsers] = useState([]);
    const [click, setClick] = useState(false)


    const dispatch = useDispatch()

    const userId=useSelector((state)=>{
        return state.auth.user._id;
      })


    useEffect(() => {
        if (click === false)
            setUsers(props.onlineUsers)

            // eslint-disable-next-line  
    }, [props.onlineUsers])


    const handleClick = () => {
        if (click === false) {
            setClick(true)
            dispatch(getUsers()).then(res => {
                setUsers(res)
                console.log(res);
            })
        }
        else {
            setClick(false)
            setUsers(props.onlineUsers)
        }
    }

    const classes = useStyles()
    return (
        <Paper className={classes.root}>
            <List>
                <ListItem
                    onClick={handleClick}
                    button
                >
                    <ListItemAvatar>
                        <Avatar >
                            <PeopleIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary="Users"
                    />
                </ListItem>
                <Divider />


                {users && (
                    <React.Fragment>
                        {users.filter(data=>data._id!==userId).map((u, key) => (
                            <ListItem
                                key={key}
                                onClick={() => { props.setUser(u); props.setScope(u.name); }}
                                button
                            >
                                <ListItemAvatar>
                                    <Avatar>AD</Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={u.name} />
                               {click===false && <Avatar src="https://i.stack.imgur.com/wopRD.png"></Avatar>}
                            </ListItem>
                        ))}
                    </React.Fragment>
                )}
            </List>
        </Paper>


    )
}

export default Users
