import React, { useState } from 'react';
import { ChannelList, useChat, useChatContext } from 'stream-chat-react';
import Cookies from 'universal-cookie';

import { ChannelSearch, TeamChannelList, TeamChannelPreview } from './';
import PeopleTalkingIcon from '../assets/ppl_talking.png';
import LogoutIcon from '../assets/logout.png';
import { initialState } from 'stream-chat-react/dist/components/Channel/channelState';

const cookies = new Cookies();

/*
The function below will be the sidebar that holds all of our channels.
*/

const SideBar = ({ logout }) => (
    <div className = "channel-list__sidebar">
        <div className = "channel-list__sidebar__icon1">
            <div className = "icon1__inner">
                <img src = {PeopleTalkingIcon} alt="ppl_talking" width= "30" />
            </div>
        </div>
        <div className = "channel-list__sidebar__icon2">
            <div className = "icon1__inner" onClick={logout}>
                <img src={LogoutIcon} alt="Logout" width= "30" />
            </div>
        </div>
    </div>
);


const CompanyHeader = () => (
    <div className = "channel-list__header">
        <p className="channel-list__header__text">Chat Room</p>
    </div>
)

const customChannelTeamFilter = (channels) => {
    return channels.filter((channel) => channel.type === 'team');
}

const customChannelMessagingFilter = (channels) => {
    return channels.filter((channel) => channel.type === 'messaging');
}

// Destructing props (in order to get data from objects or arrays and assign them to a variable)
const ChannelListContent = ({ isCreating, setIsCreating, setCreateType, setIsEditing, setToggleContainer }) => {
    const { client } = useChatContext();
    
    
    const logout = () => {
        cookies.remove("token");
        cookies.remove('userId');
        cookies.remove('username');
        cookies.remove('fullName');
        cookies.remove('avatarURL');
        cookies.remove('hashedPassword');
        cookies.remove('phoneNumber');

        window.location.reload();
    }
    
    // Store ALL of the channels the current user is apart of 
    const filters = { members: { $in: [client.userID] } };

  return (
        <>
            <SideBar logout ={logout}  />
            <div className="channel-list__list__wrapper">
                <CompanyHeader />
                <ChannelSearch  setToggleContainer={setToggleContainer}/>
                <ChannelList 
                    filters={filters} 
                    channelRenderFilterFn={customChannelTeamFilter}
                    List={(listProps) => (
                        <TeamChannelList 
                            {...listProps} // ...listProps shorthand way of getting all props from ChannelList into TeamChannelList
                                           // ... is called the spread operator
                            type = "team"
                            isCreating={isCreating} 
                            setIsCreating={setIsCreating}
                            setCreateType={setCreateType}
                            setIsEditing={setIsEditing}
                            setToggleContainer={setToggleContainer}                   
                        />
                    )}
                    Preview={(previewProps) => (
                        <TeamChannelPreview
                            {...previewProps}
                            setIsCreating={setIsCreating}
                            setIsEditing={setIsEditing}
                            setToggleContainer={setToggleContainer}
                            type="team" // team -> 3+ people 
                        />
                    )} 
                />
                <ChannelList 
                    filters={filters} 
                    channelRenderFilterFn={customChannelMessagingFilter}
                    List={(listProps) => (
                        <TeamChannelList 
                            {...listProps} // ...listProps shorthand way of getting all props from ChannelList into TeamChannelList
                                           // ... is called the spread operator
                            type = "messaging" // messaging -> 2 people 
                            isCreating={isCreating} 
                            setIsCreating={setIsCreating}
                            setCreateType={setCreateType}
                            setIsEditing={setIsEditing}
                            setToggleContainer={setToggleContainer} 
                        />
                    )}
                    Preview={(previewProps) => (
                        <TeamChannelPreview
                            {...previewProps}
                            setIsCreating={setIsCreating}
                            setIsEditing={setIsEditing}
                            setToggleContainer={setToggleContainer}
                            type="messaging"
                        />
                    )} 
                />
            </div>
        </>
  );    
}
// Toggles container based on width (for mobile devices)
const ChannelListContainer = ( { setCreateType, setIsCreating, setIsEditing }) => {
    const [toggleContainer, setToggleContainer] = useState(false);

    return (
        <>
            <div className="channel-list__container">
                <ChannelListContent 
                    setIsCreating = {setIsCreating}
                    setCreateType = {setCreateType}
                    setIsEditing = {setIsEditing}    
                />
            </div>
            
            <div className="channel-list__container-responsive"
                style={{ left: toggleContainer ? "0%" : "-89%", backgroundColor: "#005fff   "}}
            >
                <div className='channel-list__container-toggle' onClick={() => setToggleContainer((prevToggleContainer) => !prevToggleContainer)}>
                </div>
                <ChannelListContent 
                    setIsCreating = {setIsCreating}
                    setCreateType = {setCreateType}
                    setIsEditing = {setIsEditing}
                    setToggleContainer={setToggleContainer}
                />
            </div>
        </>
    )
}

export default ChannelListContainer;