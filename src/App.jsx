import React, { useState, useEffect, useRef } from 'react';
import { MOCK_CRIME_RECORDS, INITIAL_CHAT_MESSAGES, SAMPLE_QUERIES } from './data/mockKspData';

// Native SVG Icons
const ShieldIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const SparklesIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4M4 19h4M13 3l2.5 6.5L22 12l-6.5 2.5L13 21l-2.5-6.5L4 12l6.5-2.5L13 3z" />
  </svg>
);

const MapPinIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const NetworkIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const BarChartIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const MicIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
  </svg>
);

const SendIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  </svg>
);

const DownloadIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

const GlobeIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.6 9h16.8M3.6 15h16.8" />
  </svg>
);

const ServerIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2" />
  </svg>
);

export default function App() {
  const [messages, setMessages] = useState(INITIAL_CHAT_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [isKannada, setIsKannada] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [activeTab, setActiveTab] = useState('map');
  const [selectedRecord, setSelectedRecord] = useState(MOCK_CRIME_RECORDS[0]);
  const [showReportModal, setShowReportModal] = useState(false);
  const mapRef = useRef(null);
  const leafletInstance = useRef(null);
  const networkRef = useRef(null);

  useEffect(() => {
    if (activeTab === 'map' && mapRef.current && !leafletInstance.current) {
      const L = window.L;
      if (!L) return;

      const map = L.map(mapRef.current).setView([12.9716, 77.5946], 11);
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap &copy; CARTO',
        maxZoom: 19
      }).addTo(map);

      MOCK_CRIME_RECORDS.forEach((record) => {
        const isHigh = record.riskLevel === 'HIGH';
        const customIcon = L.divIcon({
          className: 'custom-div-icon',
          html: `<div style="background-color: ${isHigh ? '#ef4444' : '#f59e0b'}; width: 14px; height: 14px; border-radius: 50%; border: 2px solid #ffffff; box-shadow: 0 0 10px ${isHigh ? 'rgba(239, 68, 68, 0.8)' : 'rgba(245, 158, 11, 0.8)'};"></div>`,
          iconSize: [14, 14],
          iconAnchor: [7, 7]
        });

        const marker = L.marker([record.lat, record.lng], { icon: customIcon }).addTo(map);
        marker.bindPopup(`
          <div style="color: #0f172a; font-family: sans-serif; font-size: 12px; padding: 4px;">
            <strong style="color: #1e3a8a;">${record.firNo}</strong><br/>
            <b>Station:</b> ${record.station}<br/>
            <b>Type:</b> ${record.crimeType}<br/>
            <b>Suspects:</b> ${record.suspects.join(', ')}
          </div>
        `);

        marker.on('click', () => {
          setSelectedRecord(record);
        });
      });

      leafletInstance.current = map;
    }
  }, [activeTab]);

  useEffect(() => {
    if (activeTab === 'network' && networkRef.current && window.vis) {
      const vis = window.vis;
      const nodes = new vis.DataSet([
        { id: 'g1', label: 'Koramangala Bike Gang', shape: 'ellipse', color: { background: '#7c3aed', border: '#a78bfa' }, font: { color: '#fff', size: 13 } },
        { id: 'g2', label: 'South Blr Break-in Syndicate', shape: 'ellipse', color: { background: '#c026d3', border: '#f0abfc' }, font: { color: '#fff', size: 13 } },
        { id: 's1', label: 'Raju "Apache" Kumar', shape: 'box', color: '#ef4444', font: { color: '#fff' } },
        { id: 's2', label: 'Vikram "Snake" Gowda', shape: 'box', color: '#ef4444', font: { color: '#fff' } },
        { id: 's3', label: 'Manja "Lock" Nathan', shape: 'box', color: '#f59e0b', font: { color: '#fff' } },
        { id: 'c1', label: 'Indiranagar Chain Snatching', shape: 'diamond', color: '#10b981', font: { color: '#fff' } },
        { id: 'c2', label: 'Jayanagar Night Burglary', shape: 'diamond', color: '#10b981', font: { color: '#fff' } }
      ]);

      const edges = new vis.DataSet([
        { from: 'g1', to: 's1', label: 'Leader' },
        { from: 'g1', to: 's2', label: 'Member' },
        { from: 'g2', to: 's3', label: 'Suspect' },
        { from: 's1', to: 'c1' },
        { from: 's2', to: 'c1' },
        { from: 's3', to: 'c2' }
      ]);

      new vis.Network(networkRef.current, { nodes, edges }, {
        physics: { stabilization: true },
        edges: { color: '#475569', smooth: true }
      });
    }
  }, [activeTab]);

  const handleSendMessage = (textToSend = inputText) => {
    if (!textToSend.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');

    setTimeout(() => {
      let botResponse = "Query parsed via Catalyst QuickML. Analyzed records across Bengaluru East & South divisions.";
      let matchedRecord = MOCK_CRIME_RECORDS[0];

      if (textToSend.toLowerCase().includes("chain") || textToSend.toLowerCase().includes("indiranagar")) {
        botResponse = "Analyzed 2 FIRs linked to Bike-Borne Chain Snatching in Indiranagar. Primary Gang Identified: Koramangala Bike Gang.";
        matchedRecord = MOCK_CRIME_RECORDS[0];
      } else if (textToSend.toLowerCase().includes("burglary") || textToSend.toLowerCase().includes("jayanagar") || textToSend.toLowerCase().includes("mysuru")) {
        botResponse = "Burglary MO match detected across Jayanagar & Mysuru. High probability link for Manja 'Lock' Nathan.";
        matchedRecord = MOCK_CRIME_RECORDS[1];
      }

      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: botResponse,
        kannadaText: `ಕರ್ನಾಟಕ ರಾಜ್ಯ ಪೊಲೀಸ್ ಡೇಟಾಬೇಸ್‌ನಿಂದ ವಿಶ್ಲೇಷಿಸಲಾಗಿದೆ: ${botResponse}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        matchedRecord
      };

      setMessages((prev) => [...prev, botMsg]);
      setSelectedRecord(matchedRecord);
    }, 700);
  };

  const handleVoiceToggle = () => {
    setIsListening(!isListening);
    if (!isListening) {
      setTimeout(() => {
        setInputText("Show repeat offenders in Indiranagar chain snatching cases");
        setIsListening(false);
      }, 1500);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0b132b', color: '#f8fafc', fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column' }}>
      
      {/* CLEAN HEADER BAR */}
      <header style={{ height: '64px', borderBottom: '1px solid #1e293b', backgroundColor: 'rgba(15, 23, 42, 0.95)', padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
        
        {/* Left Title Group */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ padding: '8px', backgroundColor: 'rgba(37, 99, 235, 0.2)', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <ShieldIcon className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h1 style={{ fontWeight: 700, fontSize: '17px', margin: 0, color: '#ffffff', letterSpacing: '-0.02em' }}>KSP CrimeIntel AI</h1>
              <span style={{ padding: '2px 8px', fontSize: '10px', backgroundColor: 'rgba(6, 182, 212, 0.15)', color: '#67e8f9', border: '1px solid rgba(6, 182, 212, 0.3)', borderRadius: '9999px', fontFamily: 'monospace', fontWeight: 600 }}>
                Catalyst Native
              </span>
            </div>
            <p style={{ fontSize: '11px', color: '#94a3b8', margin: 0 }}>Karnataka State Police Conversational Intelligence Platform</p>
          </div>
        </div>

        {/* Right Status Badges & Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 10px', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px', fontSize: '11px', fontFamily: 'monospace', flexShrink: 0 }}>
            <ServerIcon className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
            <span style={{ color: '#94a3b8' }}>Project:</span>
            <span style={{ color: '#34d399', fontWeight: 600 }}>Project-Rainfall</span>
            <span style={{ color: '#64748b' }}>(ID: 48882000000013025)</span>
          </div>

          <button 
            onClick={() => setIsKannada(!isKannada)}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', fontSize: '12px', color: '#f8fafc', cursor: 'pointer', flexShrink: 0 }}
          >
            <GlobeIcon className="w-3.5 h-3.5 text-cyan-400" />
            <span>{isKannada ? 'ಕನ್ನಡ' : 'English'}</span>
          </button>

          <button 
            onClick={() => setShowReportModal(true)}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 14px', backgroundColor: '#2563eb', border: 'none', borderRadius: '8px', fontSize: '12px', fontWeight: 600, color: '#ffffff', cursor: 'pointer', flexShrink: 0, boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)' }}
          >
            <DownloadIcon className="w-3.5 h-3.5" />
            <span>SCRB Report PDF</span>
          </button>
        </div>

      </header>

      {/* MAIN CONTAINER */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 0, height: 'calc(100vh - 64px)' }}>
        
        {/* LEFT COLUMN: CHAT (4 Cols) */}
        <div style={{ gridColumn: 'span 4', borderRight: '1px solid #1e293b', backgroundColor: 'rgba(15, 23, 42, 0.5)', display: 'flex', flexDirection: 'column', height: '100%' }}>
          
          <div style={{ padding: '14px 16px', borderBottom: '1px solid #1e293b', display: 'flex', alignItems: 'center', justifyBetween: 'space-between', backgroundColor: 'rgba(15, 23, 42, 0.8)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <SparklesIcon className="w-4 h-4 text-cyan-400" />
              <h2 style={{ fontSize: '13px', fontWeight: 600, margin: 0, color: '#e2e8f0' }}>Conversational AI Investigator</h2>
            </div>
            <span style={{ fontSize: '10px', padding: '2px 6px', backgroundColor: '#1e293b', color: '#94a3b8', borderRadius: '4px' }}>Catalyst QuickML RAG</span>
          </div>

          {/* Quick Query Chips */}
          <div style={{ padding: '10px 12px', backgroundColor: 'rgba(2, 6, 23, 0.5)', borderBottom: '1px solid #1e293b', display: 'flex', gap: '8px', overflowX: 'auto' }}>
            {SAMPLE_QUERIES.map((sq, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(sq.query)}
                style={{ padding: '4px 10px', fontSize: '11px', backgroundColor: '#1e293b', border: '1px solid #334155', color: '#cbd5e1', borderRadius: '9999px', whiteSpace: 'nowrap', cursor: 'pointer' }}
              >
                {sq.label}
              </button>
            ))}
          </div>

          {/* Messages Feed */}
          <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {messages.map((msg) => (
              <div 
                key={msg.id}
                style={{ display: 'flex', gap: '10px', justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}
              >
                {msg.sender === 'bot' && (
                  <div style={{ width: '28px', height: '28px', borderRadius: '8px', backgroundColor: 'rgba(37, 99, 235, 0.25)', border: '1px solid rgba(59, 130, 246, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <ShieldIcon className="w-3.5 h-3.5 text-blue-400" />
                  </div>
                )}
                <div style={{
                  maxWidth: '85%', borderRadius: '12px', padding: '10px 14px', fontSize: '12px', lineHeight: 1.5,
                  backgroundColor: msg.sender === 'user' ? '#2563eb' : 'rgba(30, 41, 59, 0.9)',
                  color: msg.sender === 'user' ? '#ffffff' : '#e2e8f0',
                  border: msg.sender === 'user' ? 'none' : '1px solid #334155'
                }}>
                  <p style={{ margin: 0 }}>{isKannada && msg.kannadaText ? msg.kannadaText : msg.text}</p>
                  {msg.matchedRecord && (
                    <div style={{ marginTop: '8px', paddingTop: '6px', borderTop: '1px solid #334155', display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                      <span style={{ color: '#67e8f9', fontFamily: 'monospace', fontWeight: 600 }}>{msg.matchedRecord.firNo}</span>
                      <span style={{ color: '#94a3b8' }}>{msg.matchedRecord.station}</span>
                    </div>
                  )}
                  <span style={{ display: 'block', fontSize: '10px', opacity: 0.6, textAlign: 'right', marginTop: '4px' }}>{msg.timestamp}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Input Bar */}
          <div style={{ padding: '12px', borderTop: '1px solid #1e293b', backgroundColor: 'rgba(15, 23, 42, 0.9)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#020617', border: '1px solid #1e293b', borderRadius: '12px', padding: '6px' }}>
              <button 
                onClick={handleVoiceToggle}
                style={{ padding: '6px', background: 'none', border: 'none', color: isListening ? '#ef4444' : '#94a3b8', cursor: 'pointer' }}
              >
                <MicIcon className="w-4 h-4" />
              </button>
              
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={isListening ? "Listening (Kannada/English)..." : "Ask KSP Crime Database..."}
                style={{ flex: 1, backgroundColor: 'transparent', border: 'none', outline: 'none', fontSize: '12px', color: '#f8fafc' }}
              />

              <button
                onClick={() => handleSendMessage()}
                style={{ padding: '6px 12px', backgroundColor: '#2563eb', border: 'none', borderRadius: '8px', color: '#ffffff', cursor: 'pointer' }}
              >
                <SendIcon className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: CANVAS (8 Cols) */}
        <div style={{ gridColumn: 'span 8', padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px', overflowY: 'auto', height: '100%' }}>
          
          {/* METRICS ROW */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
            <div style={{ backgroundColor: 'rgba(15, 23, 42, 0.75)', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '12px', borderRadius: '12px' }}>
              <span style={{ fontSize: '11px', color: '#94a3b8' }}>Total FIRs Analyzed</span>
              <div style={{ fontSize: '18px', fontWeight: 700, color: '#22d3ee', marginTop: '4px', fontFamily: 'monospace' }}>1,248</div>
            </div>

            <div style={{ backgroundColor: 'rgba(15, 23, 42, 0.75)', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '12px', borderRadius: '12px' }}>
              <span style={{ fontSize: '11px', color: '#94a3b8' }}>Active Gang Networks</span>
              <div style={{ fontSize: '18px', fontWeight: 700, color: '#c084fc', marginTop: '4px', fontFamily: 'monospace' }}>14</div>
            </div>

            <div style={{ backgroundColor: 'rgba(15, 23, 42, 0.75)', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '12px', borderRadius: '12px' }}>
              <span style={{ fontSize: '11px', color: '#94a3b8' }}>Top High-Risk MO</span>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#f87171', marginTop: '4px' }}>Bike Snatching</div>
            </div>

            <div style={{ backgroundColor: 'rgba(15, 23, 42, 0.75)', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '12px', borderRadius: '12px' }}>
              <span style={{ fontSize: '11px', color: '#94a3b8' }}>Top Crime Hotspot</span>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#fbbf24', marginTop: '4px' }}>Indiranagar PS</div>
            </div>
          </div>

          {/* CANVAS BOX */}
          <div style={{ flex: 1, backgroundColor: 'rgba(15, 23, 42, 0.75)', border: '1px solid #1e293b', borderRadius: '16px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            
            {/* Tab Header */}
            <div style={{ padding: '10px 14px', borderBottom: '1px solid #1e293b', backgroundColor: 'rgba(15, 23, 42, 0.9)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '6px', backgroundColor: '#020617', padding: '4px', borderRadius: '10px', border: '1px solid #1e293b' }}>
                <button
                  onClick={() => setActiveTab('map')}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', backgroundColor: activeTab === 'map' ? '#2563eb' : 'transparent', color: '#f8fafc', border: 'none', cursor: 'pointer' }}
                >
                  <MapPinIcon className="w-3.5 h-3.5" />
                  <span>Spatial Hotspots</span>
                </button>

                <button
                  onClick={() => setActiveTab('network')}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', backgroundColor: activeTab === 'network' ? '#7c3aed' : 'transparent', color: '#f8fafc', border: 'none', cursor: 'pointer' }}
                >
                  <NetworkIcon className="w-3.5 h-3.5" />
                  <span>Suspect Link Graph</span>
                </button>

                <button
                  onClick={() => setActiveTab('analytics')}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', backgroundColor: activeTab === 'analytics' ? '#059669' : 'transparent', color: '#f8fafc', border: 'none', cursor: 'pointer' }}
                >
                  <BarChartIcon className="w-3.5 h-3.5" />
                  <span>Demographics</span>
                </button>
              </div>

              <span style={{ fontSize: '11px', color: '#94a3b8', fontFamily: 'monospace' }}>FIR: {selectedRecord.firNo}</span>
            </div>

            {/* TAB CONTENT AREA */}
            <div style={{ flex: 1, position: 'relative', backgroundColor: '#020617', minHeight: '380px' }}>
              {activeTab === 'map' && (
                <div ref={mapRef} style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }} />
              )}

              {activeTab === 'network' && (
                <div ref={networkRef} style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, backgroundColor: '#020617' }} />
              )}

              {activeTab === 'analytics' && (
                <div style={{ padding: '20px', overflowY: 'auto' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: 700, margin: '0 0 6px 0', color: '#f8fafc' }}>Offender Recidivism & Time Distribution Analysis</h3>
                  <p style={{ fontSize: '11px', color: '#94a3b8', margin: '0 0 16px 0' }}>Aggregated pattern intelligence across Bengaluru and Mysuru divisions.</p>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
                    <div style={{ padding: '14px', backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}>
                      <span style={{ fontSize: '11px', color: '#94a3b8' }}>Peak Crime Hours</span>
                      <div style={{ fontSize: '16px', fontWeight: 700, color: '#fbbf24', marginTop: '4px', fontFamily: 'monospace' }}>20:00 - 02:00 IST</div>
                    </div>

                    <div style={{ padding: '14px', backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}>
                      <span style={{ fontSize: '11px', color: '#94a3b8' }}>Repeat Offender Rate</span>
                      <div style={{ fontSize: '16px', fontWeight: 700, color: '#f87171', marginTop: '4px', fontFamily: 'monospace' }}>42.5%</div>
                    </div>

                    <div style={{ padding: '14px', backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}>
                      <span style={{ fontSize: '11px', color: '#94a3b8' }}>Dominant Modus Operandi</span>
                      <div style={{ fontSize: '16px', fontWeight: 700, color: '#22d3ee', marginTop: '4px', fontFamily: 'monospace' }}>MO-TWO-WHEELER</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* RECORD DETAIL FOOTER */}
            <div style={{ padding: '10px 14px', backgroundColor: 'rgba(15, 23, 42, 0.9)', borderTop: '1px solid #1e293b', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px' }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <span style={{ fontFamily: 'monospace', fontWeight: 700, color: '#22d3ee' }}>{selectedRecord.firNo}</span>
                <span style={{ color: '#cbd5e1' }}>{selectedRecord.crimeType}</span>
                <span style={{ color: '#64748b' }}>|</span>
                <span style={{ color: '#94a3b8' }}>{selectedRecord.station}</span>
              </div>
              <div>
                <span style={{ color: '#94a3b8', marginRight: '6px' }}>Suspects:</span>
                <span style={{ color: '#fca5a5', fontWeight: 600 }}>{selectedRecord.suspects.join(', ')}</span>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* SCRB REPORT MODAL */}
      {showReportModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, backgroundColor: 'rgba(2, 6, 23, 0.8)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div style={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '16px', maxWidth: '480px', width: '100%', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1e293b', paddingBottom: '10px', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldIcon className="w-5 h-5 text-blue-400" />
                <h3 style={{ margin: 0, fontWeight: 700, color: '#f8fafc', fontSize: '14px' }}>KSP Executive Crime Intelligence Brief</h3>
              </div>
              <button onClick={() => setShowReportModal(false)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '16px' }}>✕</button>
            </div>

            <div style={{ fontSize: '11px', fontFamily: 'monospace', color: '#cbd5e1', backgroundColor: '#020617', padding: '14px', borderRadius: '12px', border: '1px solid #1e293b', lineHeight: 1.6 }}>
              <p style={{ margin: '0 0 6px 0' }}><strong style={{ color: '#60a5fa' }}>DOCUMENT ID:</strong> KSP-SCRB-REPORT-2026-0723</p>
              <p style={{ margin: '0 0 6px 0' }}><strong style={{ color: '#60a5fa' }}>TARGET DIVISION:</strong> Bengaluru East & South Police Divisions</p>
              <p style={{ margin: '0 0 6px 0' }}><strong style={{ color: '#60a5fa' }}>PRIMARY CASE:</strong> {selectedRecord.firNo} ({selectedRecord.crimeType})</p>
              <p style={{ margin: '0 0 6px 0' }}><strong style={{ color: '#60a5fa' }}>KEY SUSPECTS:</strong> {selectedRecord.suspects.join(', ')}</p>
              <p style={{ margin: '0 0 6px 0' }}><strong style={{ color: '#60a5fa' }}>MODUS OPERANDI:</strong> {selectedRecord.moCode}</p>
              <p style={{ margin: 0 }}><strong style={{ color: '#60a5fa' }}>RECOMMENDED ACTION:</strong> Deploy night beat patrols along Indiranagar 100ft Road and Jayanagar 4th Block between 20:00 - 02:00 IST.</p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '16px' }}>
              <button onClick={() => setShowReportModal(false)} style={{ padding: '7px 14px', backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#cbd5e1', cursor: 'pointer', fontSize: '12px' }}>Close</button>
              <button 
                onClick={() => {
                  alert("Executive PDF Report generated natively via Zoho Catalyst SmartBrowser!");
                  setShowReportModal(false);
                }}
                style={{ padding: '7px 14px', backgroundColor: '#2563eb', border: 'none', borderRadius: '8px', color: '#ffffff', fontWeight: 600, cursor: 'pointer', fontSize: '12px' }}
              >
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
