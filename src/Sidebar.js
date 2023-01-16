import {React,useState,useEffect} from 'react'
import "./Sidebar.css";
import ChatIcon from '@material-ui/icons/Chat';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { IconButton } from '@material-ui/core';
import { Avatar } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import SidebarChat from './SidebarChat';
import db from './firebase.js'
import {useStateValue} from './StateProvider'
function Sidebar() {
    const [rooms, setRooms] = useState([]);
    const [{user},dispatch] = useStateValue();
    
    useEffect( () =>{
        const unsubscribe=db.collection('rooms').onSnapshot((snapshot) => 
            setRooms(snapshot.docs.map((doc) =>({
                id: doc.id,
                data: doc.data(),
            }))
        ))
        return () => {
            unsubscribe();
        }
    },[])

    return (
        <div className="sidebar">
            <div className="sidebar_header">
                <Avatar src={user?.photoURL}/>
                <div className="sidebar_headerRight">
                    <IconButton>
                        <DonutLargeIcon/>
                    </IconButton>
                    <IconButton>
                        <ChatIcon/>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>
                    
                </div>

            </div>
            <div className="sidebar_search">
                {/* <input type="text"/> */}
                <div className="sidebar_searchContainer">
                    <IconButton>
                        <SearchIcon/>
                    </IconButton>
                </div>
                <input type="text" placeholder="search or start new chat" />
            </div>
            <div className="sidebar_chats">
                <SidebarChat addNewChat/>
                {rooms.map(room => (
                    <SidebarChat key={room.id} id={room.id} name={room.data.name}/>
                ))}
                {/* <SidebarChat/>
                <SidebarChat/>
                <SidebarChat/>
                <SidebarChat/>
                <SidebarChat/> */}

            </div>
        </div>
    )
}

export default Sidebar
