import React from 'react';
import './Loading.css'

function Loading() {
    return (
        <div className="loading-container">
            
          <div className="loading-center">
            <h3 className="loading-title">Loading...</h3>
            <div className="loading-spin"></div>
          
          </div>
        </div>
      );
}

export default Loading