import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './SkillCard.css';

const SkillCard = ({ skill }) => {
  const { user } = useSelector(state => state.auth);
  const isOwnSkill = skill.userId === user?.id;

  const getLevelColor = (level) => {
    switch (level.toLowerCase()) {
      case 'expert':
        return 'badge-accent';
      case 'intermediate':
        return 'badge-secondary';
      case 'beginner':
        return 'badge-primary';
      default:
        return 'badge-primary';
    }
  };

  return (
    <div className="skill-card">
      <div className="skill-header">
        <div className="skill-user">
          <img 
            src={skill.user.avatar} 
            alt={skill.user.name}
            className="user-avatar"
          />
          <div className="user-info">
            <h3 className="user-name">{skill.user.name}</h3>
            <p className="user-location">{skill.location}</p>
          </div>
        </div>
        <div className="skill-badges">
          <span className={`badge ${getLevelColor(skill.level)}`}>
            {skill.level}
          </span>
          {isOwnSkill && (
            <span className="badge badge-primary">Your Skill</span>
          )}
        </div>
      </div>

      <div className="skill-content">
        <h4 className="skill-title">{skill.title}</h4>
        <p className="skill-description">{skill.description}</p>
        
        <div className="skill-tags">
          {skill.tags.map((tag, index) => (
            <span key={index} className="skill-tag">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="skill-footer">
        <div className="skill-meta">
          <span className="skill-category">{skill.category}</span>
          <span className="skill-date">
            {new Date(skill.createdAt).toLocaleDateString()}
          </span>
        </div>
        
        {!isOwnSkill && (
          <Link 
            to={`/skills/${skill.id}`} 
            className="btn btn-primary btn-sm"
          >
            Request Swap
          </Link>
        )}
      </div>
    </div>
  );
};

export default SkillCard; 