// import React from "react";
// import ReactEmoji from "react-emoji";
// import ScrollToBottom from "react-scroll-to-bottom";

// const Messages = ({ messages, userId }) => {
//   const getContainerAlignment = (messageUserId) => {
//     return userId === messageUserId
//       ? "justifyEnd"
//       : messageUserId === "admin"
//       ? "justifyCenter"
//       : "justifyStart";
//   };

//   const getMessageBackground = (messageSentimentScore) => {
//     return messageSentimentScore > 1
//       ? "backgroundGreen"
//       : messageSentimentScore <= 1 && messageSentimentScore >= -1
//       ? "backgroundYellow"
//       : "backgroundRed";
//   };

//   return (
//     <ScrollToBottom className='messages'>
//       {messages.map((message, i) => (
//         <div key={i}>
//           <div
//             className={
//               "messageContainer " + getContainerAlignment(message.userId)
//             }
//           >
//             {userId === message.userId ? (
//               <p className='sentText pr-10'>{message.username}</p>
//             ) : (
//               ""
//             )}
//             <div
//               className={
//                 "messageBox " +
//                 (message.userId === "admin"
//                   ? "backgroundWhite"
//                   : getMessageBackground(message.sentimentScore))
//               }
//             >
//               <p
//                 className={
//                   "messageText " +
//                   (message.userId === "admin" ? "colorAdmin" : "colorUser")
//                 }
//               >
//                 {ReactEmoji.emojify(message.message)}
//               </p>
//             </div>
//             {userId !== message.userId ? (
//               <p className='sentText pl-10'>{message.username}</p>
//             ) : (
//               ""
//             )}
//           </div>
//         </div>
//       ))}
//     </ScrollToBottom>
//   );
// };

// export default Messages;


//1----------------------------------------------

import React, { useState } from "react";
import ReactEmoji from "react-emoji";
import ScrollToBottom from "react-scroll-to-bottom";
import axios from "axios";

const Messages = ({ messages, userId, setMessages }) => {
  const [pressedMessageId, setPressedMessageId] = useState(null);
  let pressTimer;

  const getContainerAlignment = (messageUserId) => {
    return userId === messageUserId
      ? "justifyEnd"
      : messageUserId === "admin"
      ? "justifyCenter"
      : "justifyStart";
  };

  const getMessageBackground = (messageSentimentScore) => {
    return messageSentimentScore > 1
      ? "backgroundGreen"
      : messageSentimentScore <= 1 && messageSentimentScore >= -1
      ? "backgroundYellow"
      : "backgroundRed";
  };

  const handleMouseDown = (id) => {
    pressTimer = setTimeout(() => {
      setPressedMessageId(id);
    }, 700);
  };

  const handleMouseUp = () => {
    clearTimeout(pressTimer);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("CC_Token");
    try {
      await axios.delete(`/api/message/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages((prev) => prev.filter((msg) => msg._id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
    setPressedMessageId(null);
  };

  return (
    <ScrollToBottom className='messages'>
      {messages.map((message, i) => (
        <div key={i}>
          <div
            className={"messageContainer " + getContainerAlignment(message.userId)}
          >
            {userId === message.userId && <p className='sentText pr-10'>{message.username}</p>}

            <div
              className={
                "messageBox " +
                (message.userId === "admin"
                  ? "backgroundWhite"
                  : getMessageBackground(message.sentimentScore))
              }
              onMouseDown={() => handleMouseDown(message._id)}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <p
                className={
                  "messageText " +
                  (message.userId === "admin" ? "colorAdmin" : "colorUser")
                }
              >
                {ReactEmoji.emojify(message.message)}
              </p>

              {/* Show Delete button on long press */}
              {pressedMessageId === message._id && userId === message.userId && (
                <button
                  style={{
                    position: "absolute",
                    top: "5px",
                    right: "10px",
                    backgroundColor: "red",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    padding: "4px 8px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleDelete(message._id)}
                >
                  Delete
                </button>
              )}
            </div>

            {userId !== message.userId && <p className='sentText pl-10'>{message.username}</p>}
          </div>
        </div>
      ))}
    </ScrollToBottom>
  );
};

export default Messages;
