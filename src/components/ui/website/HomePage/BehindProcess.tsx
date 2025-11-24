import React from 'react';

// Data for the 3 steps in the process, mimicking the structure and text from the image.
const stepsData = [
  {
    number: '01',
    title: 'Create Campaign',
    description: 'Upload your track, set your goals and budget, define your audience, and let our platform help you reach the right listeners, grow your fanbase, and amplify your music to the next level.',
    // Using placeholders for images as per the guidelines.
    imageSrc: 'https://placehold.co/500x350/f43f5e/ffffff?text=LIVE+CONCERT',
    alt: 'People at a live concert',
    layout: 'left', // Text content on the left side of the timeline
  },
  {
    number: '02',
    title: 'Influencers Promote',
    description: 'Upload your track, set your goals and budget, define your audience, and let our platform help you reach the right listeners, grow your fanbase, and amplify your music to the next level.',
    imageSrc: 'https://placehold.co/500x350/f43f5e/ffffff?text=STUDIO+PRODUCTION',
    alt: 'A music producer working in a studio',
    layout: 'right', // Text content on the right side of the timeline (image on left)
  },
  {
    number: '03',
    title: 'Track & Get Paid',
    description: 'Upload your track, set your goals and budget, define your audience, and let our platform help you reach the right listeners, grow your fanbase, and amplify your music to the next level.',
    imageSrc: 'https://placehold.co/500x350/f43f5e/ffffff?text=MUSIC+ANALYTICS',
    alt: 'Music waveform and analytics chart',
    layout: 'left', // Text content on the left side of the timeline
  },
];

// Reusable component for the content box of each step.
const StepContent = ({ title, description }:any) => (
  <div className="flex flex-col space-y-2">
    <h3 className="text-xl font-bold text-gray-900">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </div>
);

// Reusable component for the image box of each step.
const StepImage = ({ src, alt }:any) => (
  <div className="overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl">
    <img
      src={src}
      alt={alt}
      className="w-full h-auto object-cover"      
    />
  </div>
);

// The core component for a single step in the timeline.
const TimelineStep = ({ step, isLast }:any) => {
  const isLeft = step.layout === 'left';
  const isRight = step.layout === 'right';

  // Content rendering based on layout (for desktop)
  const Content = <StepContent title={step.title} description={step.description} />;
  const Image = <StepImage src={step.imageSrc} alt={step.alt} />;

  return (
    <div className="relative flex min-h-[300px] py-4 md:py-12">
      
      {/* 1. Content Area (Left/Right) */}
      <div 
        className={`flex w-full md:w-1/2 p-4 md:p-6 ${
          isLeft ? 'md:order-1 md:text-right md:justify-end' : 'md:order-3'
        }`}
      >
        <div className="max-w-md w-full">
          {isLeft ? Content : Image}
        </div>
      </div>
      
      {/* 2. Timeline Axis (Center) */}
      <div className="relative w-12 flex justify-center md:order-2">
        {/* Dashed Line */}
        {!isLast && (
          <div 
            className="absolute top-0 bottom-0 w-1 bg-rose-500/50" 
            style={{ 
              borderLeft: '2px dashed', 
              borderColor: 'rgb(244 63 94 / 0.5)', 
              marginLeft: '-1px' 
            }}
          ></div>
        )}
        
        {/* Number Circle */}
        <div className="absolute top-1/2 transform -translate-y-1/2 w-10 h-10 md:w-16 md:h-16 flex items-center justify-center rounded-full bg-white border-4 border-rose-500 z-10 shadow-lg">
          <span className="text-lg md:text-2xl font-extrabold text-gray-900">{step.number}</span>
        </div>
      </div>

      {/* 3. Image Area (Left/Right) */}
      <div 
        className={`flex w-full md:w-1/2 p-4 md:p-6 ${
          isLeft ? 'md:order-3' : 'md:order-1 md:text-right md:justify-end'
        } hidden md:flex`}
      >
        <div className="max-w-md w-full">
          {isLeft ? Image : Content}
        </div>
      </div>

      {/* Mobile: Re-display Image/Content for clarity */}
      <div className={`md:hidden flex w-full p-4 ${isLeft ? 'order-3' : 'order-1'} `}>
         <div className="max-w-full w-full">
          {isLeft ? Image : Content}
        </div>
      </div>
    </div>
  );
};

const BehindProcess = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        
        {/* Header Section */}
        <header className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-start md:space-x-12">
          
          {/* Title Block */}
          <div className="flex-shrink-0 md:w-1/3 mb-6 md:mb-0">
            <span className="inline-block px-4 py-1.5 text-lg font-extrabold text-white bg-rose-500 rounded-full shadow-md mb-3">
              The Beat
            </span>
            <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
              Behind the Process
            </h1>
          </div>

          {/* Description Block */}
          <div className="md:w-2/3 flex items-center pt-2">
            <p className="text-xl text-gray-700 max-w-2xl">
              Discover how our platform helps music creators and influencers connect, grow, and shine
            </p>
          </div>
        </header>

        {/* Timeline Steps */}
        <div className="relative">
          {stepsData.map((step, index) => (
            <TimelineStep 
              key={step.number} 
              step={step} 
              isLast={index === stepsData.length - 1} 
            />
          ))}
        </div>

      </div>     
    </div>
  );
};

export default BehindProcess;