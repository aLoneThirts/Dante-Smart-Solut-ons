// src/components/Team.jsx
import React from "react";
import team from "../data/team";

export default function Team() {
  return (
    <div className="team-grid">
      {team.map(member => (
        <div key={member.name} className="member-card">
          <img src={member.photo} alt={member.name} />
          <h3>{member.name}</h3>
          <p>{member.role}</p>
        </div>
      ))}
    </div>
  );
}
