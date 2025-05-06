// import React from "react";
// // import ReactEmoji from "react-emoji";
// import GaugeChart from "react-gauge-chart";
// import Icon from "@material-ui/core/Icon";

// const Welcome = (props) => {
//   const [summary, setSummary] = React.useState(null);

//   React.useEffect(() => {
//     setSummary(createSummary(props.user));
//   }, [props.user]);

//   const createSummary = (user) => {
//     let totalMessages = 0,
//       positivePercentage = 0,
//       neutralPercentage = 0,
//       negativePercentage = 0,
//       overallSentiment = "";
//     if (user && user.totalMessages > 0) {
//       totalMessages = user.totalMessages;
//       positivePercentage = ((user.positive / user.totalMessages) * 100).toFixed(
//         2
//       );
//       neutralPercentage = ((user.neutral / user.totalMessages) * 100).toFixed(
//         2
//       );
//       negativePercentage = ((user.negative / user.totalMessages) * 100).toFixed(
//         2
//       );
//       overallSentiment =
//         user.positive > user.neutral && user.positive > user.negative
//           ? "POSITIVE"
//           : user.neutral > user.negative
//           ? "NEUTRAL"
//           : "NEGATIVE";
//     }
//     return {
//       totalMessages,
//       positivePercentage,
//       neutralPercentage,
//       negativePercentage,
//       overallSentiment,
//     };
//   };

//   return (
//     <div className='welcomeOuterContainer'>
//       <h1>Welcome!</h1>
//       <p className='intro'>
//   Don't miss out on the good stuff when you are just one chat away from your favorite topics{" "}
//   <span role="img" aria-label="heart">❤️</span>
// </p>


//       {summary ? (
//         <div className='summary'>
//           <p className='summaryHeading'>Your Overall Sentiment Level</p>
//           <p className='summaryTotalMessages'>
//             Total Messages : {summary.totalMessages}
//           </p>
//           <div className='summarySentimentsSection'>
//             <div className='summarySentiment'>
//               <Icon className='sentimentIcon fas fa-grin' />
//               <span className='sentimentDesc'>POSITIVE</span>
//               <span className='sentimentPerc'>
//                 {summary.positivePercentage}%
//               </span>
//             </div>
//             <div className='summarySentiment'>
//               <Icon className='sentimentIcon fas fa-meh' />
//               <span className='sentimentDesc'>NEUTRAL</span>
//               <span className='sentimentPerc'>
//                 {summary.neutralPercentage}%
//               </span>
//             </div>
//             <div className='summarySentiment'>
//               <Icon className='sentimentIcon fas fa-frown-open' />
//               <span className='sentimentDesc'>NEGATIVE</span>
//               <span className='sentimentPerc'>
//                 {summary.negativePercentage}%
//               </span>
//             </div>
//           </div>
//           <div>
//             <GaugeChart
//               id='gauge-chart'
//               nrOfLevels={3}
//               percent={
//                 summary.overallSentiment === "POSITIVE"
//                   ? 0.16
//                   : summary.overallSentiment === "NEUTRAL"
//                   ? 0.5
//                   : summary.overallSentiment === "NEGATIVE"
//                   ? 0.83
//                   : 0
//               }
//               arcPadding={0.02}
//               colors={["#5BE12C", "#F5CD19", "#EA4228"]}
//               style={{ height: 140, display: "block" }}
//               hideText={true}
//             />
//           </div>
//           <span className='summaryOverallSentiment'>
//             {summary.overallSentiment}
//           </span>
//         </div>
//       ) : (
//         ""
//       )}

//     {/* Copyright added here */}
//     <div className="copyright">
//       &copy; Pranjal Singh <br />
//       &copy; Rajdeep Shukla, B.Tech CSE
//     </div>
      
//     </div>
    
//   );
// };


// export default Welcome;

/// upper code is fully working 


import React from "react";
import GaugeChart from "react-gauge-chart";
import Icon from "@material-ui/core/Icon";
import { Typography, Card, CardContent, Fade } from "@material-ui/core";

const Welcome = (props) => {
  const [summary, setSummary] = React.useState(null);

  React.useEffect(() => {
    setSummary(createSummary(props.user));
  }, [props.user]);

  const createSummary = (user) => {
    let totalMessages = 0,
      positivePercentage = 0,
      neutralPercentage = 0,
      negativePercentage = 0,
      overallSentiment = "";
    if (user && user.totalMessages > 0) {
      totalMessages = user.totalMessages;
      positivePercentage = ((user.positive / user.totalMessages) * 100).toFixed(2);
      neutralPercentage = ((user.neutral / user.totalMessages) * 100).toFixed(2);
      negativePercentage = ((user.negative / user.totalMessages) * 100).toFixed(2);
      overallSentiment =
        user.positive > user.neutral && user.positive > user.negative
          ? "POSITIVE"
          : user.neutral > user.negative
          ? "NEUTRAL"
          : "NEGATIVE";
    }
    return {
      totalMessages,
      positivePercentage,
      neutralPercentage,
      negativePercentage,
      overallSentiment,
    };
  };

  return (
    <Fade in timeout={600}>
      <div className="welcomeOuterContainer" style={{ textAlign: "center", padding: "20px" }}>
        <Typography variant="h3" style={{ fontWeight: 600, marginBottom: "10px", color: "#3949ab" }}>
          Welcome to {props.selectedProject}!
        </Typography>

        {/* <Typography variant="subtitle1" style={{ marginBottom: "20px" }}>
          Get ready to dive into your conversations 🚀
        </Typography> */}

        {/* changes=========== */}

        <Typography variant="subtitle1" style={{ marginBottom: "20px" }}>
  Get ready to dive into your conversations{" "}
  <span role="img" aria-label="rocket">
    🚀
  </span>
</Typography>



        {summary && (
          <Card style={{ maxWidth: "600px", margin: "auto", marginTop: "20px", padding: "20px" }}>
            <CardContent>
              <Typography variant="h5" style={{ marginBottom: "10px", fontWeight: 500 }}>
                Your Chat Sentiment Overview
              </Typography>
              <GaugeChart
                id="gauge-chart"
                nrOfLevels={3}
                percent={
                  summary.overallSentiment === "POSITIVE"
                    ? 0.16
                    : summary.overallSentiment === "NEUTRAL"
                    ? 0.5
                    : summary.overallSentiment === "NEGATIVE"
                    ? 0.83
                    : 0
                }
                arcPadding={0.02}
                colors={["#5BE12C", "#F5CD19", "#EA4228"]}
                style={{ height: 140, display: "block" }}
                hideText={true}
              />
              <Typography variant="h6" style={{ marginTop: "20px", fontWeight: 600 }}>
                Overall Sentiment: {summary.overallSentiment}
              </Typography>

              <div className="summarySentimentsSection" style={{ marginTop: "20px", display: "flex", justifyContent: "space-around" }}>
                <div className="summarySentiment">
                  <Icon style={{ color: "#5BE12C" }}>sentiment_very_satisfied</Icon>
                  <p>Positive: {summary.positivePercentage}%</p>
                </div>
                <div className="summarySentiment">
                  <Icon style={{ color: "#F5CD19" }}>sentiment_neutral</Icon>
                  <p>Neutral: {summary.neutralPercentage}%</p>
                </div>
                <div className="summarySentiment">
                  <Icon style={{ color: "#EA4228" }}>sentiment_very_dissatisfied</Icon>
                  <p>Negative: {summary.negativePercentage}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="copyright" style={{ marginTop: "50px", color: "#888" }}>
          &copy; Pranjal Singh & Rajdeep Shukla, B.Tech CSE
        </div>
      </div>
    </Fade>
  );
};

export default Welcome;
