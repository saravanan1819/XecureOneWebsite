import React from "react";
import "../styles/SideCard.css";

const StatCard = ({ title, value, icon, change, changeType }) => {
  const getChangeColor = () => {
    if (changeType === "increase") return "green";
    if (changeType === "decrease") return "red";
    return "gray";
  };

  return (
    // <div style={{
    //   flex: 1,
    //   background: 'white',
    //   borderRadius: '10px',
    //   padding: '20px',
    //   boxShadow: '0 1px 6px rgba(0,0,0,0.1)',
    //   display: 'flex',
    //   flexDirection: 'column',
    //   gap: '10px'
    // }}>
    //   <div style={{ fontSize: '14px', color: '#666' }}>{title}</div>
    //   <div style={{ fontSize: '28px', fontWeight: 'bold' }}>{value}</div>
    //   <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
    //     <span>{icon}</span>
    //     {change && (
    //       <span style={{ color: getChangeColor(), fontSize: '14px' }}>
    //         {changeType === 'increase' ? '▲' : '▼'} {change}%
    //       </span>
    //     )}
    //   </div>
    // </div>
    <div className="stat-card">
      <div className="stat-card-title">{title}  {icon}</div>
      <div className="stat-card-value">{value}</div>
        {/* <span>{icon}</span> */}
        {change && (
          <span className={`stat-card-change ${getChangeColor()}`}>
            {/* {changeType === "increase" ? "▲" : "▼"} {change}% */}
          </span>
        )}
    </div>
  );
};

export default StatCard;
