import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useDrag } from '@/context/DragContext';
import { generatePath, getCardPosition, identityDescriptions, identityColors } from '@/lib/utils';

const SVGConnections: React.FC = () => {
  const [paths, setPaths] = useState<JSX.Element[]>([]);
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { getDraggableRef } = useDrag();
  const requestRef = useRef<number>();
  
  const identities = ['engineer', 'developer', 'designer', 'technopreneur', 'human'];

  // Define updateConnections as a memoized callback to prevent infinite loops
  const updateConnections = useCallback(() => {
    if (!svgRef.current || !containerRef.current) return;

    // Only show connections on larger screens
    if (window.innerWidth < 1024) {
      setPaths([]);
      return;
    }

    // Find the heading element in the new design
    const primaryStatementEl = document.querySelector('h1.text-3xl');
    if (!primaryStatementEl) return;

    const primaryBox = primaryStatementEl.getBoundingClientRect();
    const svgRect = containerRef.current.getBoundingClientRect();

    // Calculate the center position of the primary statement
    const primaryCenterX = primaryBox.left + primaryBox.width / 2 - svgRect.left;
    const primaryCenterY = primaryBox.top + primaryBox.height - svgRect.top;

    const newPaths: JSX.Element[] = [];

    identities.forEach((identity, index) => {
      const cardRef = getDraggableRef(`identity-${identity}`);
      if (!cardRef || !cardRef.current) return;

      const cardPosition = getCardPosition(cardRef.current, containerRef.current);
      if (!cardPosition) return;

      const cardTopCenterX = cardPosition.x;
      const cardTopCenterY = cardPosition.y;

      // Create path from primary to card
      const pathD = generatePath(
        primaryCenterX,
        primaryCenterY,
        cardTopCenterX,
        cardTopCenterY
      );

      // Create a slightly different path for the text
      const midX = (primaryCenterX + cardTopCenterX) / 2;
      const midY = (primaryCenterY + cardTopCenterY) / 2;
      const textPathD = `M ${primaryCenterX + 20} ${primaryCenterY + 20} Q ${midX} ${midY + 10}, ${cardTopCenterX - 20} ${cardTopCenterY + 10}`;

      const { role } = identityDescriptions[identity];
      const { color } = identityColors[identity] || { color: 'text-white' };
      // Extract the color class name to get just the identity-specific part
      const colorClass = color.replace('text-', '');

      newPaths.push(
        <g key={`path-${identity}`}>
          <path
            d={pathD}
            fill="none"
            stroke={`hsl(var(--${colorClass}))`}
            strokeWidth="1.5"
            strokeDasharray="5,5"
            data-identity={identity}
          />
          <path
            d={textPathD}
            id={`text-path-${index}`}
            fill="none"
            style={{ display: 'none' }}
          />
          <text fontSize="14" fontWeight="bold" fill={`hsl(var(--${colorClass}))`} opacity="0.9">
            <textPath
              href={`#text-path-${index}`}
              startOffset="50%"
              textAnchor="middle"
            >
              {role}
            </textPath>
          </text>
        </g>
      );
    });

    setPaths(newPaths);
  }, [getDraggableRef, identities]);

  // Use this effect to handle initial setup and cleanup
  useEffect(() => {
    const handleResize = () => {
      // Cancel any pending animation frame
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      
      // Schedule an update in the next animation frame
      requestRef.current = requestAnimationFrame(updateConnections);
    };

    // Run once on mount
    updateConnections();
    
    // Add resize listener
    window.addEventListener('resize', handleResize);
    
    // Schedule a few updates with decreasing frequency to handle animations settling
    const timeouts = [
      setTimeout(updateConnections, 500),
      setTimeout(updateConnections, 1000),
      setTimeout(updateConnections, 2000)
    ];

    return () => {
      window.removeEventListener('resize', handleResize);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      timeouts.forEach(clearTimeout);
    };
  }, [updateConnections]);

  return (
    <div 
      ref={containerRef} 
      className="hidden lg:block absolute inset-0 pointer-events-none" 
      aria-hidden="true"
    >
      <svg 
        ref={svgRef}
        id="connections" 
        width="100%" 
        height="100%" 
        className="absolute top-0 left-0" 
      >
        {paths}
      </svg>
    </div>
  );
};

export default SVGConnections;
