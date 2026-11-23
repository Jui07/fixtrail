import React, { useRef, useEffect } from 'react';

/**
 * High-performance HTML5 Canvas Digital Circuit Network.
 * Renders orthogonal PCB traces, connection nodes, and animated current packets.
 * Includes mouse interaction, off-screen pausing, and prefers-reduced-motion support.
 */
export const CircuitNetworkCanvas = ({ className = '', opacity = 0.6 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let isVisible = true;

    // Check reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Resize handler
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio || window.innerWidth;
      canvas.height = rect.height * window.devicePixelRatio || 600;
      ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Track mouse for interactive circuit illumination
    let mouse = { x: -1000, y: -1000, active: false };
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };
    const handleMouseLeave = () => {
      mouse.active = false;
    };

    canvas.parentElement?.addEventListener('mousemove', handleMouseMove);
    canvas.parentElement?.addEventListener('mouseleave', handleMouseLeave);

    // Intersection observer to pause rendering when scrolled out of view
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(canvas);

    // Generate PCB Circuit Grid Nodes & Pathways
    const width = () => canvas.width / (window.devicePixelRatio || 1);
    const height = () => canvas.height / (window.devicePixelRatio || 1);

    // Fixed deterministic nodes representing engineering network
    const nodeCount = window.innerWidth < 768 ? 16 : 32;
    const nodes = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: (Math.random() * 0.9 + 0.05) * width(),
        y: (Math.random() * 0.9 + 0.05) * height(),
        radius: Math.random() * 2 + 2,
        pulseAlpha: 0.2 + Math.random() * 0.4,
        pulseSpeed: 0.02 + Math.random() * 0.02,
        connections: []
      });
    }

    // Connect nodes with orthogonal / 45-deg PCB traces
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = Math.abs(nodes[i].x - nodes[j].x);
        const dy = Math.abs(nodes[i].y - nodes[j].y);
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < (window.innerWidth < 768 ? 140 : 200) && nodes[i].connections.length < 3) {
          // Orthogonal PCB trace waypoint
          const midX = nodes[i].x + (nodes[j].x - nodes[i].x) * 0.5;
          nodes[i].connections.push({
            target: nodes[j],
            midX: midX,
            midY: nodes[i].y,
            dist: dist
          });
        }
      }
    }

    // Packets travelling along traces
    const packetCount = window.innerWidth < 768 ? 8 : 16;
    const packets = [];
    for (let i = 0; i < packetCount; i++) {
      const startNode = nodes[Math.floor(Math.random() * nodes.length)];
      packets.push({
        currentNode: startNode,
        targetConnection: null,
        progress: Math.random(),
        speed: 0.006 + Math.random() * 0.008,
        color: Math.random() > 0.4 ? '#38BDF8' : '#14B8A6' // Cyan or Teal
      });
    }

    // Main animation render loop
    let tick = 0;
    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width(), height());
      tick += 1;

      // Draw Circuit Traces
      ctx.lineWidth = 1;
      nodes.forEach((node) => {
        node.connections.forEach((conn) => {
          // Check proximity to mouse
          const midDist = mouse.active
            ? Math.hypot((node.x + conn.target.x) / 2 - mouse.x, (node.y + conn.target.y) / 2 - mouse.y)
            : 999;
          const isHighlighted = midDist < 120;

          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          // 45-degree / orthogonal PCB routing
          ctx.lineTo(conn.midX, node.y);
          ctx.lineTo(conn.midX, conn.target.y);
          ctx.lineTo(conn.target.x, conn.target.y);

          ctx.strokeStyle = isHighlighted
            ? 'rgba(56, 189, 248, 0.4)'
            : 'rgba(37, 99, 235, 0.12)';
          ctx.stroke();
        });
      });

      // Draw Moving Data Packets
      if (!prefersReducedMotion) {
        packets.forEach((p) => {
          if (!p.targetConnection || !p.currentNode.connections.length) {
            if (p.currentNode.connections.length > 0) {
              p.targetConnection = p.currentNode.connections[Math.floor(Math.random() * p.currentNode.connections.length)];
              p.progress = 0;
            } else {
              p.currentNode = nodes[Math.floor(Math.random() * nodes.length)];
              return;
            }
          }

          p.progress += p.speed;

          if (p.progress >= 1) {
            p.currentNode = p.targetConnection.target;
            p.targetConnection = null;
            p.progress = 0;
          } else {
            // Interpolate packet position along 3 segments (node.x,node.y -> midX,node.y -> midX,target.y -> target.x,target.y)
            const conn = p.targetConnection;
            let px, py;
            if (p.progress < 0.33) {
              const segT = p.progress / 0.33;
              px = p.currentNode.x + (conn.midX - p.currentNode.x) * segT;
              py = p.currentNode.y;
            } else if (p.progress < 0.66) {
              const segT = (p.progress - 0.33) / 0.33;
              px = conn.midX;
              py = p.currentNode.y + (conn.target.y - p.currentNode.y) * segT;
            } else {
              const segT = (p.progress - 0.66) / 0.34;
              px = conn.midX + (conn.target.x - conn.midX) * segT;
              py = conn.target.y;
            }

            // Draw glowing packet head
            ctx.beginPath();
            ctx.arc(px, py, 2, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.shadowColor = p.color;
            ctx.shadowBlur = 8;
            ctx.fill();
            ctx.shadowBlur = 0; // reset
          }
        });
      }

      // Draw Nodes / Solder Pads
      nodes.forEach((node) => {
        const mouseDist = mouse.active ? Math.hypot(node.x - mouse.x, node.y - mouse.y) : 999;
        const isNear = mouseDist < 100;

        ctx.beginPath();
        ctx.arc(node.x, node.y, isNear ? node.radius + 1.5 : node.radius, 0, Math.PI * 2);
        ctx.fillStyle = isNear ? '#38BDF8' : 'rgba(37, 99, 235, 0.4)';
        ctx.fill();

        // Subtle pulsing ring on select nodes
        if (node.radius > 3) {
          const pulse = (Math.sin(tick * node.pulseSpeed) + 1) * 0.5;
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius + pulse * 4, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(20, 184, 166, ${pulse * 0.35})`;
          ctx.stroke();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      observer.disconnect();
      canvas.parentElement?.removeEventListener('mousemove', handleMouseMove);
      canvas.parentElement?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none w-full h-full ${className}`}
      style={{ opacity }}
    />
  );
};
