import React from 'react';

interface NothingProps {
  // Define your props here
  className?: string;
}

const Nothing: React.FC<NothingProps> = ({ className = '' }) => {
  return (
    <div className={`nothing-component ${className}`}>
      <h1>Nothing Component</h1>
      <p>This is a boilerplate React component.</p>
    </div>
  );
};

export default Nothing;
