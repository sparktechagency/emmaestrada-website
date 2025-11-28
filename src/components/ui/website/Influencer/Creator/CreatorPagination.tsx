import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useState } from 'react';
import { FaBackward } from 'react-icons/fa';


// Main App component for demonstration
const CreatorPagination = () => {

  return (

    <div className="flex items-center justify-center w-full p-4">
      <div className="flex items-center space-x-2 md:space-x-4">
        
        <ChevronLeft />
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white">1</div>        
        <div className="flex items-center justify-center w-12 h-12 rounded-full border border-primary text-primary">2</div>        
        <div className="flex items-center justify-center w-12 h-12 rounded-full border border-primary text-primary">3</div>        
        <div className="flex items-center justify-center w-12 h-12 rounded-full border border-primary text-primary">4</div>        
        <div className="flex items-center justify-center w-12 h-12 rounded-full border border-primary text-primary">5</div>        
        <ChevronRight />
      </div>
    </div>
  );
};

export default CreatorPagination;