import React from 'react'

const Index = () => {
  const gradientTextStyle = {
    background: "linear-gradient(270deg, #ff3cac, #784ba0, #2b86c5, #ff3cac)",
    backgroundSize: "800% 800%",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    animation: "gradientAnimation 5s ease infinite",
    fontSize: "4rem",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "20px",
  };

  const dotsStyle = {
    display: "flex",
    justifyContent: "center",
    gap: "8px",
  };

  const dotStyle = {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    background: "#ff3cac",
    animation: "pulse 1.2s infinite ease-in-out",
  };

  return (
     <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        borderRadius: "8px",
        height: "70vh",
        background: "#1a1a1a",
        overflow: "hidden",
      }}
    >
      <h1 style={gradientTextStyle}>UNDER CONSTRUCTION</h1>

      <div style={dotsStyle}>
        <div style={{ ...dotStyle, animationDelay: "0s" }}></div>
        <div style={{ ...dotStyle, animationDelay: "0.2s" }}></div>
        <div style={{ ...dotStyle, animationDelay: "0.4s" }}></div>
      </div>

      {/* Keyframes */}
      <style>
        {`
          @keyframes gradientAnimation {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          @keyframes pulse {
            0%, 80%, 100% { transform: scale(0); opacity: 0.3; }
            40% { transform: scale(1); opacity: 1; }
          }
        `}
      </style>
    </div>
  )
}

export default Index;