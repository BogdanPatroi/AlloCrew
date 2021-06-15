import React, { useState, useRef, useEffect } from 'react';
import './style.scss';
import socket from '../../socket';


const TchatRoom = ({
  chatList, userId, onMessageSubmit, handleMessage, content, deleteD, refreshData, userFirstname, socketMsg,
}) => {
  const [chatId, setChatId] = useState('');
  const currentChat = chatList.find((e) => e.id == chatId) || { messages: [] };
  const messageArea = useRef(null);
  const myMsg = useRef(null);

  // message div auto scroll down
  useEffect(() => {
    if (messageArea.current) {
      messageArea.current.scrollTo(0, messageArea.current.scrollHeight);
    }
  }, [chatList, chatId]);


  return (
    <>
      <h1 className="tchatRoom__title">Messagerie</h1>
      <div className="tchatRoom__container">

        <div className="discussion__container">
          <p className="sticky">Conversations en cours</p>

          {
            chatList.sort(({ id: previousID }, { id: currentID }) => currentID - previousID).map((chat) => (
              <div className={chat.id == chatId ? 'discussion active' : 'discussion'}>
                <div
                  className="discussion__name"
                  onClick={() => {
                    refreshData();
                    setChatId(chat.id);
                    socket.emit('change-room', chat.id);
                  }}
                >
                  <p className="contactName">
                    {chat.creator.id !== userId
                      ? `${chat.creator.firstname} ${chat.creator.lastname}`
                      : `${chat.receiver.firstname} ${chat.receiver.lastname}`}
                  </p>
                  <p>Annonce: {chat.announcement.title.substr(0, 20)}...</p>
                </div>
                <div
                  className="deleteChat"
                  onClick={() => {
                    setChatId(''); deleteD(chat.id);
                  }}
                >
                  Supprimer
                </div>
              </div>
            ))
          }
        </div>
        <div ref={messageArea} className={chatId ? 'message openedChat' : 'message'}>
          {!chatId && (
          <div className="emptyChat">
            <h2>Bienvenue dans votre messagerie</h2>
            {!chatList.length && <p>Vous n'avez pas de conversation en cours.</p>}
            {chatList.length == 1 && <p>Vous avez 1 conversation en cours.</p>}
            {chatList.length > 1 && <p>{`Vous avez ${chatList.length} conversations en cours.`}</p>}

            <p>Sélectionnez ou ajoutez une conversation pour commencer à discuter</p>
          </div>
          )}
          {!currentChat && <div>erreur</div>}
          {

            chatId && currentChat.messages.map((message) => {
              if (message.user.id == userId) {
                return (
                  <div className="userMessage__container">
                    <p className="you">Vous</p>
                    <p className="userMessage">{message.content}</p>
                  </div>
                );
              }

              return (
                <div className="contactMessage__container">
                  <p className="other">{message.user.firstname}</p>
                  <p className="contactMessage">{message.content}</p>
                </div>
              );
            })
          }
          {
            socketMsg.length > 0 && socketMsg.map((message) => {
              if (message.roomId == chatId) {
                if (message.id == userId) {
                  return (
                    <div className="userMessage__container">
                      <p className="you">Vous</p>
                      <p className="userMessage">{message.content}</p>
                    </div>
                  );
                }

                return (
                  <div className="contactMessage__container">
                    <p className="other">{message.firstname}</p>
                    <p className="contactMessage">{message.content}</p>
                  </div>
                );
              }
            })
          }
        </div>
        {/* input.. */}
        <form
          id={chatId}
          onSubmit={(e) => {
            e.preventDefault();
            socket.emit('send-message', {
              roomId: chatId, content: myMsg.current.value, id: userId, firstname: userFirstname,
            });
            onMessageSubmit(e.target.id);
          }}
          className="message__input"
        >
          <input ref={myMsg} onChange={handleMessage} value={content} type="text" placeholder="Envoyez un message" />
          <button className="" type="submit" />
        </form>
      </div>
    </>
  );
};


export default TchatRoom;
