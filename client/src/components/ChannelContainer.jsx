import React from 'react';
import { Channel, MessageSimple} from 'stream-chat-react';
// MessageSimple from the stream-chat-react docs is the default UI Component that we're using
// Can't use MessageTeam b/c it's deprecated...

// From the Components folder
import { ChannelInner, CreateChannel, EditChannel } from './';


const ChannelContainer = ({ isCreating, setIsCreating, isEditing, setIsEditing, createType }) => {
  if(isCreating) {
    return(
      <div className='channel__container'>
          <CreateChannel createType={createType} setIsCreating={setIsCreating} />
      </div>
    )
  }

  if(isEditing) {
    return(
      <div className='channel__container'>
          <EditChannel setIsEditing={setIsEditing} />
      </div>
    )
  }

  const EmptyState = () => (
    <div className='channel-empty__container'>
      <p className="channel-empty__first">This is the beginning of your chat history.</p>
      <p className="channel-empty__second">Send messages, attachments, links, emojis, and more!.</p>
    </div>
  )

  return (
    <div className='channel__container'>
        <Channel
            EmptyStateIndicator={EmptyState}
            Message={(messageProps, i) => <MessageSimple key={i} {...messageProps} />}
        >
          <ChannelInner setIsEditing={setIsEditing} />
        </Channel>
    </div>
  );
}

export default ChannelContainer;