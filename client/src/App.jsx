import React, { useState }  from 'react';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';

import {ChannelListContainer, ChannelContainer, Auth} from './components'

import 'stream-chat-react/dist/css/index.css';
import './App.css';

const cookies = new Cookies();
const apiKey = "b5ns8psk9w46";
const authToken = cookies.get("token");
const client = StreamChat.getInstance(apiKey);

if(authToken){
  client.connectUser({
    id: cookies.get('userId'),
    name: cookies.get('username'),
    fullName: cookies.get('fullName'),
    image: cookies.get('avatarURL'),
    hashedPassword: cookies.get('hashedPassword'),
    phoneNumber: cookies.get('phoneNumber'),
  }, authToken)
}

// Two underscores for the className
const App = () => {
  const [createType, setCreateType] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);


  // If there is no authentication Token, render authentication page
  // so user has to log in
  if(!authToken) return <Auth  />

  return (
    <div className = "app__wrapper">
        <Chat client = {client} theme = "team dark">
            <ChannelListContainer 
                  isCreating={isCreating}
                  setIsCreating={setIsCreating}
                  setCreateType={setCreateType}
                  setIsEditing={setIsEditing}
            />
            <ChannelContainer  
                  isCreating={isCreating}
                  setIsCreating={setIsCreating}
                  isEditing={isEditing}
                  setIsEditing={setIsEditing}
                  createType={createType}
            />
        </Chat>
    </div>
  );
}

export default App
