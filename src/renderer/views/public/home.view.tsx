import React from 'react';
import icon from '../../../../assets/icon.svg';

const Home = () => {
  return (
    <div>
      <div className="Hello">
        <img width="200px" alt="icon" src={icon} />
      </div>
      <h1>electron-react-boilerplate</h1>
      <div className="bg-gray-500 p-5 text-center">Tailwind</div>
      <div className="Hello" />
    </div>
  );
};

export default Home;
