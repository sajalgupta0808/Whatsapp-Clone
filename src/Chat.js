import {React,useState,useEffect} from 'react'
import { Avatar, IconButton } from '@material-ui/core'
import './Chat.css'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import MicIcon from '@material-ui/icons/Mic';
import { useParams } from 'react-router-dom'
import db from './firebase';
import {useStateValue} from './StateProvider'
import firebase from 'firebase'

function Chat() {
    const [input,setInput] = useState();
    const [seed,setSeed] = useState();
    const {roomId} = useParams();
    const [roomName,setRoomName] = useState("");
    const [messages,setMessages] = useState([]);
    const [{user},dispatch] = useStateValue();

    useEffect(()=>{
        if(roomId){
            db.collection("rooms").
            doc(roomId).
            onSnapshot(snapshot => 
                setRoomName(snapshot.data().name)
            );
            db.collection("rooms")
            .doc(roomId).
            collection("messages").
            orderBy('timestamp','asc').
            onSnapshot((snapshot) => (
                setMessages(snapshot.docs.map((doc)=>
                doc.data())))
            )
        }

    },[roomId])

    const sendMessage = async(e) => {
        e.preventDefault();
        console.log({input});
        db.collection("rooms").doc(roomId).collection('messages').add({
            message:input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        setInput("");
    }

    useEffect(()=>{
        setSeed(Math.floor(Math.random() * 5000))
    },[])
  
    

    return (
        <div className="chat">
            <div className="chat_header">
                <Avatar src={`http://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className="chat_headerInfo">
                    <h3>{roomName}</h3>
                    {/* <p>{(messages[messages.length-1]?.
                    timestamp?.toDate().toUTCString())}</p> */}
                </div>
                <div className="chat_headerRight">
                    <IconButton>
                        <SearchIcon/>
                    </IconButton>
                    <IconButton>
                        <AttachFileIcon/>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>
                </div>
            </div>

            <div className="chat_body">

                {messages.map((message) => (

                    <p className={`chat_message ${message.name==user.displayName && 'chat_sent'}`}>
                    <span className="chat_name">{message.name}</span>
                    {/* This is a message */}
                    {message.message}
                    {/* {new Date(message.timestamp.toDate()).toUTCString().slice(17,22)} */}
                    {/* <span className="chat_timestamp">timestamp</span> */}
                    </p>

                ))}

                
            </div>

            <div className="chat_footer">
                <IconButton>
                    <InsertEmoticonIcon/>
                </IconButton>
                <form>
                    <input value = {input} onChange={e => 
                        {
                            setInput(e.target.value);
                        }
                    } placeholder="Type Your Message" type="text"/>
                    <button 
                    onClick={sendMessage}
                    type="submit">Send</button>
                </form>
                <IconButton>
                    <MicIcon/>
                </IconButton>
                
            </div>
            
    
        </div>
    )
}

export default Chat
