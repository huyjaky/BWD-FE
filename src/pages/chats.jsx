import React, { useState, useEffect, useContext } from "react";

// import { Context } from "../context";

import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { userAccContext } from "@/contexts/userAcc";
import HeaderForm from "@/components/headers/headerForm/HeaderForm";

const ChatEngine = dynamic(() =>
  import("react-chat-engine").then((module) => module.ChatEngine)
);
const MessageFormSocial = dynamic(() =>
  import("react-chat-engine").then((module) => module.MessageFormSocial)
);

const Chats = () => {
  // const { username, secret } = useContext(Context);
  const { user, setUser } = useContext(userAccContext)
  const { data: session, status } = useSession();
  const [showChat, setShowChat] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof document !== undefined) {
      setShowChat(true);
    }
  }, []);

  useEffect(()=>{
    if (status!=='loading' && status !== 'authenticated') {
      router.push('/login', undefined, {shallow: true});
    }
  }, [status])

  useEffect(() => {
    const auth = async () => {
      const temp = await session?.userAcc;

      if (temp) {
        setUser({ ...user, ...temp });
      } else {
        setUser({ ...user, UserId: 'none user' });
      }
    }
    auth();
  }, [status])


  useEffect(() => {
    if (user.UserId && user.UserName) {
      setShowChat(true);
    }
    console.log(user);
  }, [user]);

  if (!showChat || status === 'unauthenticated') return (
    <>
      <HeaderForm />
      <div className="bg-slate-700">
        <div className="w-screen h-screen box-border scale-90
shadow-xl rounded-xl overflow-hidden">
          <div className="w-screen h-screen"></div>
        </div>
      </div>
    </>
  );

  return (
    <>
      <HeaderForm />
      <div className="bg-slate-700">
        <div className="w-screen h-screen box-border scale-90
shadow-xl rounded-xl overflow-hidden">
          <ChatEngine
            height="100vh"
            width="100vw"
            projectID="e826bc24-a46b-4897-ba21-9bb5145f9aa0"
            userName={user?.UserName + ''}
            userSecret={user?.UserId + ''}
            renderNewMessageForm={() => <MessageFormSocial />}
          />
        </div>
      </div>
    </>
  );
}


export default Chats;