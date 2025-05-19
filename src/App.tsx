import { useState, useEffect } from "react";
import type { Channel as StreamChannel } from "stream-chat";
import {
  useCreateChatClient,
  Chat,
  Channel,
  ChannelHeader,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";

import "stream-chat-react/dist/css/v2/index.css";
import "./layout.css";

// your Stream app information
const apiKey = import.meta.env.VITE_apiKey || "";
const userId = import.meta.env.VITE_userId || "";
const userName = import.meta.env.VITE_userName || "";
const channelId = import.meta.env.VITE_channelId || "";
const userToken = import.meta.env.VITE_userToken || "";

const App = () => {
  const [channel, setChannel] = useState<StreamChannel>();
  const client = useCreateChatClient({
    apiKey,
    tokenOrProvider: userToken,
    userData: { id: userId, name: userName },
  });

  useEffect(() => {
    if (!client) return;

    const channel = client.channel("medical", channelId);

    setChannel(channel);
  }, [client]);

  if (!client) return <div>Setting up client & connection...</div>;

  return (
    <Chat client={client} theme="str-chat__theme-custom">
      <Channel channel={channel}>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput minRows={2} maxRows={5} shouldSubmit={() => false} />
        </Window>
        <Thread />
      </Channel>
    </Chat>
  );
};

export default App;
