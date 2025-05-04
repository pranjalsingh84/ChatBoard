   import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import NewChannel from "./NewChannel";

const ChannelsList = ({ channels, socket }) => {
  const [allChannels, setAllChannels] = useState(channels);

  useEffect(() => {
    setAllChannels(channels);
  }, [channels]);

  return (
    <div className='channelsListOuterContainer'>
      <div>
        <h1 className='channelsListHeading'>Channels</h1>
        {allChannels ? (
          <List>
            {allChannels.map((channel, i) => (
              <Link to={"/channel/" + channel._id} key={i}>
                <ListItem button key={channel._id} className='channel'>
                  <div>{channel.name}</div>
                </ListItem>
              </Link>
            ))}
          </List>
        ) : null}
      </div>
      <NewChannel socket={socket} />
    </div>
  );
};

export default ChannelsList;


// //-----------------1--------------------------



// import React, { useState, useEffect } from "react"; 
// import { Link } from "react-router-dom";
// import List from "@material-ui/core/List";
// import ListItem from "@material-ui/core/ListItem";
// import Button from "@material-ui/core/Button"; // ✅ add this

// import NewChannel from "./NewChannel";
// import axios from "axios"; // ✅ add this

// const ChannelsList = ({ channels, socket }) => {
//   const [allChannels, setAllChannels] = useState(channels);

//   useEffect(() => {
//     setAllChannels(channels);
//   }, [channels]);

//   ///-----------------------------------------------------------------------
//   // const deleteChannel = async (id) => {
//   //   try {
//   //     const token = localStorage.getItem("CC_Token"); // or your auth token name
//   //     await axios.delete(`/api/channel/${id}`, {
//   //       headers: { Authorization: `Bearer ${token}` },
//   //     });
//   //     setAllChannels(allChannels.filter((channel) => channel._id !== id));
//   //   } catch (err) {
//   //     console.error("Error deleting channel", err);
//   //   }
//   // };

//   //--------------------------------------------------------------------------------------
//   const deleteChannel = async (id) => {
//     try {
//       const token = localStorage.getItem("CC_Token"); // or your auth token name
//       // await axios.delete(`/api/channel/${id}`, {
//         await axios.delete(`/api/channel/${id}`, {

//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setAllChannels(allChannels.filter((channel) => channel._id !== id));
//     } catch (err) {
//       console.error("Error deleting channel", err);
//     }
//   }; 
  

//   //-----------------------------------------------------------------------------------------

//   return (
//     <div className='channelsListOuterContainer'>
//       <div>
//         <h1 className='channelsListHeading'>Channels</h1>
//         {allChannels ? (
//           <List>
//             {allChannels.map((channel, i) => (
//               <div key={channel._id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//                 <Link to={"/channel/" + channel._id}>
//                   <ListItem button className='channel'>
//                     <div>{channel.name}</div>
//                   </ListItem>
//                 </Link>
//                 <Button
//                   variant="contained"
//                   color="secondary"
//                   onClick={() => deleteChannel(channel._id)}
//                 >
//                   Delete
//                 </Button>
//               </div>
//             ))}
//           </List>
//         ) : null}
//       </div>
//       <NewChannel socket={socket} />
//     </div>
//   );
// };

// export default ChannelsList;


///---------------------new------------------------------------

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import List from "@material-ui/core/List";
// import ListItem from "@material-ui/core/ListItem";
// import Button from "@material-ui/core/Button";
// import NewChannel from "./NewChannel";
// import axios from "axios";

// const ChannelsList = ({ channels, socket }) => {
//   const [allChannels, setAllChannels] = useState([]);

//   useEffect(() => {
//     setAllChannels(channels);
//   }, [channels]);

//   const deleteChannel = async (id) => {
//     try {
//       const token = localStorage.getItem("CC_Token"); // ⚠️ Make sure token is stored in login
//       const response = await axios.delete(`/channel/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       console.log("✅ Channel deleted:", response.data.message);

//       // Update UI
//       setAllChannels((prev) =>
//         prev.filter((channel) => channel._id !== id)
//       );
//     } catch (err) {
//       console.error("❌ Error deleting channel", err);
//       alert("Failed to delete channel");
//     }
//   };

//   return (
//     <div className="channelsListOuterContainer">
//       <div>
//         <h1 className="channelsListHeading">Channels</h1>
//         {allChannels.length > 0 ? (
//           <List>
//             {allChannels.map((channel) => (
//               <div
//                 key={channel._id}
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "space-between",
//                   padding: "0 8px",
//                   borderBottom: "1px solid #ccc",
//                 }}
//               >
//                 <Link
//                   to={`/channel/${channel._id}`}
//                   style={{ textDecoration: "none", color: "inherit", flexGrow: 1 }}
//                 >
//                   <ListItem button className="channel">
//                     {channel.name}
//                   </ListItem>
//                 </Link>
//                 <Button
//                   variant="contained"
//                   color="secondary"
//                   onClick={() => deleteChannel(channel._id)}
//                   style={{ marginLeft: "10px" }}
//                 >
//                   Delete
//                 </Button>
//               </div>
//             ))}
//           </List>
//         ) : (
//           <p>No channels available.</p>
//         )}
//       </div>
//       <NewChannel socket={socket} />
//     </div>
//   );
// };

// export default ChannelsList;
