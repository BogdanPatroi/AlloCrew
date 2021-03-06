::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey; 
  border-radius: 10px;
  background-color: #313131;
  ;
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #F7BE24; 
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #F7BE24; 
}
position: relative;
overflow-y: auto;
flex-direction: column;
justify-content: flex-end;
grid-row: 1 / 4;
padding-right: 1rem;
border-right: 1px solid #272727;
.discussion:first-of-type {
  margin-top: 4rem;
}
.active {
background-color: rgb(241, 241, 241);
opacity: 1;
}
.sticky {
  border-radius: 100vmax;
  position: sticky;::-webkit-scrollbar {
    width: 10px;
  }
  
  /* Track */
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey; 
    border-radius: 10px;
    background-color: #313131;
    ;
  }
   
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #F7BE24; 
    border-radius: 10px;
  }
  
  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #F7BE24; 
  }
  position: relative;
  overflow-y: auto;
  flex-direction: column;
  justify-content: flex-end;
  grid-row: 1 / 4;
  padding-right: 1rem;
  border-right: 1px solid #272727;
  .discussion:first-of-type {
    margin-top: 4rem;
  }
  .active {
  background-color: rgb(241, 241, 241);
  opacity: 1;
  }
  .sticky {
    border-radius: 100vmax;
    position: sticky;import React, { useRef, useEffect, useState } from "react";
import './style.scss';
import { Link } from "react-router-dom";

const DiscussionList = ({by_creator, by_receiver, message, handleMessage, onMessageSubmit,deleteD, userId}) => {
  

  const ref = useRef(null)
  //State du menu burger
  const [menuState, setMenuState] = useState(false);
  //ecouteur d'évenement
 
  //fonction pour l'écouteur  
  const handleClick = (e) => {
    setMenuState(e.target.id)
    if (menuState == e.target.id){
      setMenuState(false)
    }
   }




  return (
  <div className="discussion__flex"> 
    {/* <div className="discussion__half">
      <h2 className="discussion__title">Demandes envoyées</h2>    
    {
      by_creator.map((discussion) =>
      <div key={discussion.id} className="discussion__absolute">
        <form method="delete" onSubmit={deleteD} name={discussion.id}>
        <button name={discussion.id} className="discussion__delete button" type="submit" method="delete">+</button>
        </form>
        <h3 className="discussion__spaceText">
          <Link to={`/profile/${discussion.receiver.id}`}>
            <span className="discussion__spaceText">{discussion.receiver.firstname} {discussion.receiver.lastname}</span>             
          </Link>
        </h3> 
        <h4> {discussion.announcement.title}</h4>
      
        <button ref={ref} id={discussion.id} className="button discussion_message" onClick={handleClick} >+</button>
      {menuState == discussion.id && (
      <div> 
        <div className="message__container">
        {discussion.messages.map((messages) => 
          <div key={messages.id} className={messages.user.id == discussion.creator.id? "you":"other"}>
            <h4>{messages.user.id == discussion.creator.id? "Vous": messages.user.firstname} : </h4>               
            <p>{messages.content}</p>
          </div>
        )}
        </div>

        <div className="message__input__flex"
        >
          <form onSubmit={onMessageSubmit} method="post" name={discussion.id}>
            <div className="test">
              <textarea className="message__textarea input " name={discussion.id} value={message} onChange={handleMessage} />
            </div>
            <div>
              <button className="button discussion_message" type="submit">Send</button>
            </div>
          </form>
        </div>
      </div>
    )}
    </div>
    )}
    </div>
  

    <div className="discussion__half">
      <h2 className="discussion__title">Demandes reçues</h2>

      {
        by_receiver.map((discussion) =>
        <div key={discussion.id} className="discussion__absolute">
          <form method="delete" onSubmit={deleteD} name={discussion.id}>
            <button name={discussion.id} className="discussion__delete button" type="submit" method="delete">+</button>
          </form>
          <h3 className="discussion__spaceText">
            <Link to={`/profile/${discussion.creator.id}`}>
            <span className="discussion__spaceText">{discussion.creator.firstname} {discussion.creator.lastname}</span>             
            </Link>
            </h3> 
            <h4> {discussion.announcement.title}</h4>
          <button  ref={ref} id={discussion.id} className="button discussion_message" onClick={handleClick}  >+</button> 
        {menuState == discussion.id && (
        <div>  
          <div  className="message__container">          
            {discussion.messages.map((messages) =>  

            <div key={messages.id}  className={messages.user.id == discussion.receiver.id? "you":"other"}>
              <h4>{messages.user.id == discussion.receiver.id? "Vous": messages.user.firstname} : </h4>               
              <p>{messages.content}</p>
            </div>
          
          )}

          </div>

          <div className="message__input__flex">
            
            <form onSubmit={onMessageSubmit} method="post" name={discussion.id} >
            <div>
              {console.log("DISCUSSIONIDTEXTAREA", discussion.id)}
              <textarea className="message__textarea input"  name={discussion.id} value={message} onChange={handleMessage} />
            </div>
            <div>
              <button className="button discussion_message" type="submit">Send</button>
            </div>
            </form>
          </div>

        </div>  
      )}
    </div>
      )}
    </div> */}
  </div>
  )
}
;


export default DiscussionList;