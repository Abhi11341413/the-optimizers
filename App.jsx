// import React, { useState, useEffect, useRef } from 'react';
// import ReactPlayer from 'react-player';
// import { Play, Pause, Volume2, Plus, Trash2, CheckCircle, Circle, Keyboard, Quote, FastForward } from 'lucide-react';

// const STATIONS = [
//   { name: 'Lofi Girl', url: 'https://www.youtube.com/watch?v=jfKfPfyJRdk' },
//   { name: 'Synthwave', url: 'https://www.youtube.com/watch?v=4xDzrJKXOOY' }
// ];

// export default function App() {
//   // --- STATE ---
//   const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem('tasks')) || []);
//   const [newTask, setNewTask] = useState('');
  
//   // Timer State
//   const [timeLeft, setTimeLeft] = useState(25 * 60);
//   const [isActive, setIsActive] = useState(false);
//   const [sessions, setSessions] = useState(0);

//   // Music State
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [volume, setVolume] = useState(0.5);
//   const [stationIndex, setStationIndex] = useState(0);

//   const taskInputRef = useRef(null);

//   // --- EFFECTS ---
//   useEffect(() => {
//     localStorage.setItem('tasks', JSON.stringify(tasks));
//   }, [tasks]);

//   useEffect(() => {
//     let interval = null;
//     if (isActive && timeLeft > 0) {
//       interval = setInterval(() => setTimeLeft((time) => time - 1), 1000);
//     } else if (timeLeft === 0) {
//       setIsActive(false);
//       setSessions((s) => s + 1);
//       setTimeLeft(5 * 60); // Auto switch to 5 min break
//       new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3').play().catch(()=>console.log("Audio blocked"));
//     }
//     return () => clearInterval(interval);
//   }, [isActive, timeLeft]);

//   // Keyboard Shortcuts
//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (e.target.tagName === 'INPUT') return;
//       if (e.code === 'Space') { e.preventDefault(); setIsPlaying(p => !p); }
//       if (e.key.toLowerCase() === 's') setIsActive(a => !a);
//       if (e.key.toLowerCase() === 'n') { e.preventDefault(); taskInputRef.current?.focus(); }
//       if (e.key.toLowerCase() === 'c') setTasks(t => t.filter(task => !task.completed));
//     };
//     window.addEventListener('keydown', handleKeyDown);
//     return () => window.removeEventListener('keydown', handleKeyDown);
//   }, []);

//   // --- HANDLERS ---
//   const addTask = (e) => {
//     e.preventDefault();
//     if (!newTask.trim()) return;
//     setTasks([{ id: Date.now(), text: newTask, completed: false }, ...tasks]);
//     setNewTask('');
//   };

//   const toggleTask = (id) => {
//     setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
//   };

//   const deleteTask = (id) => {
//     setTasks(tasks.filter(t => t.id !== id));
//   };

//   // --- RENDER HELPERS ---
//   const formatTime = (seconds) => {
//     const m = Math.floor(seconds / 60);
//     const s = seconds % 60;
//     return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
//   };

//   const completedCount = tasks.filter(t => t.completed).length;

//   // SVG Ring Math
//   const radius = 60;
//   const circumference = 2 * Math.PI * radius;
//   const strokeDashoffset = circumference - (timeLeft / (25 * 60)) * circumference;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 text-slate-100 font-sans flex flex-col items-center justify-center p-6 selection:bg-indigo-500/30">
      
//       {/* Hidden YouTube Player */}
//       <div className="hidden">
//         <ReactPlayer 
//           url={STATIONS[stationIndex].url} 
//           playing={isPlaying} 
//           volume={volume} 
//           controls={false}
//         />
//       </div>

//       {/* Header Info */}
//       <div className="w-full max-w-5xl flex justify-between items-start mb-8">
//         <div>
//           <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400 drop-shadow-sm">
//             DeepSpace Focus
//           </h1>
//           <p className="text-indigo-200/60 mt-1 flex items-center gap-2 text-sm">
//             <Quote size={14} /> "Stay disciplined. The results will follow."
//           </p>
//         </div>
        
//         {/* Shortcuts Legend (Bounty) */}
//         <div className="bg-white/5 backdrop-blur-md border border-white/10 p-3 rounded-xl text-xs text-indigo-200/70 flex flex-col gap-1 shadow-xl">
//           <div className="flex items-center gap-2 border-b border-white/5 pb-1 mb-1 font-semibold text-indigo-200"><Keyboard size={14}/> Shortcuts</div>
//           <p><kbd className="bg-white/10 px-1 rounded">Space</kbd> Play/Pause Music</p>
//           <p><kbd className="bg-white/10 px-1 rounded">S</kbd> Start/Pause Timer</p>
//           <p><kbd className="bg-white/10 px-1 rounded">N</kbd> New Task</p>
//           <p><kbd className="bg-white/10 px-1 rounded">C</kbd> Clear Done</p>
//         </div>
//       </div>

//       {/* Main Grid */}
//       <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-12 gap-6 mb-24">
        
//         {/* TIMER MODULE (Left) */}
//         <div className="md:col-span-5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 flex flex-col items-center shadow-2xl relative overflow-hidden">
//           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-cyan-400 opacity-50"></div>
//           <h2 className="text-lg font-semibold text-indigo-200 mb-6 tracking-wide uppercase text-sm">Focus Session</h2>
          
//           {/* Animated SVG Timer Ring */}
//           <div className="relative flex items-center justify-center w-48 h-48 mb-6">
//             <svg className="absolute inset-0 w-full h-full transform -rotate-90">
//               <circle cx="96" cy="96" r={radius} stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/5" />
//               <circle cx="96" cy="96" r={radius} stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} className="text-indigo-400 transition-all duration-1000 ease-linear drop-shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
//             </svg>
//             <div className="text-center z-10">
//               <span className="text-5xl font-bold tabular-nums tracking-tight">{formatTime(timeLeft)}</span>
//               <p className="text-indigo-300/70 mt-1 text-sm">{isActive ? 'Focusing...' : 'Paused'}</p>
//             </div>
//           </div>

//           <div className="flex gap-4">
//             <button onClick={() => setIsActive(!isActive)} className="bg-indigo-600 hover:bg-indigo-500 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(79,70,229,0.4)] transition-all transform hover:scale-105">
//               {isActive ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
//             </button>
//             <button onClick={() => { setIsActive(false); setTimeLeft(25 * 60); }} className="bg-white/10 hover:bg-white/20 text-white w-14 h-14 rounded-full flex items-center justify-center transition-all border border-white/10">
//               <div className="w-4 h-4 bg-white rounded-sm"></div>
//             </button>
//           </div>
//           <p className="mt-6 text-sm text-indigo-200/50">Sessions today: <span className="text-indigo-400 font-bold">{sessions}</span></p>
//         </div>

//         {/* TASK MODULE (Right) */}
//         <div className="md:col-span-7 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex flex-col shadow-2xl">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-lg font-semibold text-indigo-200 tracking-wide uppercase text-sm">Mission Objectives</h2>
//             <span className="bg-indigo-500/20 text-indigo-300 text-xs px-3 py-1 rounded-full border border-indigo-500/30">
//               {completedCount} / {tasks.length} Done
//             </span>
//           </div>

//           <form onSubmit={addTask} className="flex gap-2 mb-6">
//             <input ref={taskInputRef} type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder="What needs to be done? (Shortcut: N)" className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder-indigo-200/30" />
//             <button type="submit" className="bg-indigo-600/80 hover:bg-indigo-500 text-white px-4 rounded-xl transition-all flex items-center justify-center">
//               <Plus size={20} />
//             </button>
//           </form>

//           <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
//             {tasks.length === 0 && <p className="text-center text-indigo-200/40 mt-10 text-sm">No tasks yet. Press 'N' to add one.</p>}
//             {tasks.map(task => (
//               <div key={task.id} className={`flex items-center justify-between p-3 rounded-xl border transition-all ${task.completed ? 'bg-white/5 border-transparent text-indigo-200/40' : 'bg-white/10 border-white/10 hover:border-indigo-500/50'}`}>
//                 <div className="flex items-center gap-3 cursor-pointer overflow-hidden" onClick={() => toggleTask(task.id)}>
//                   {task.completed ? <CheckCircle size={18} className="text-indigo-400 flex-shrink-0" /> : <Circle size={18} className="text-indigo-200/50 flex-shrink-0" />}
//                   <span className={`text-sm truncate ${task.completed ? 'line-through' : ''}`}>{task.text}</span>
//                 </div>
//                 <button onClick={() => deleteTask(task.id)} className="text-indigo-200/30 hover:text-red-400 transition-colors p-1"><Trash2 size={16} /></button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* FLOATING MUSIC DOCK */}
//       <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-[90%] max-w-3xl bg-slate-900/90 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 flex items-center justify-between shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
//         <div className="flex items-center gap-4">
//           <button onClick={() => setIsPlaying(!isPlaying)} className="bg-indigo-600 hover:bg-indigo-500 text-white w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-lg">
//             {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
//           </button>
//           <div>
//             <p className="text-sm font-semibold flex items-center gap-2">
//               {STATIONS[stationIndex].name}
//               {isPlaying && <span className="flex gap-0.5 h-3 items-end">
//                 <span className="w-0.5 bg-indigo-400 animate-[bounce_1s_infinite] h-full"></span>
//                 <span className="w-0.5 bg-indigo-400 animate-[bounce_1s_infinite_0.2s] h-2/3"></span>
//                 <span className="w-0.5 bg-indigo-400 animate-[bounce_1s_infinite_0.4s] h-full"></span>
//               </span>}
//             </p>
//             <p className="text-xs text-indigo-200/50">{isPlaying ? 'Streaming live...' : 'Paused'}</p>
//           </div>
//         </div>

//         <div className="flex items-center gap-6">
//           <button onClick={() => setStationIndex((prev) => (prev + 1) % STATIONS.length)} className="flex items-center gap-1.5 text-xs bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1.5 rounded-full transition-all">
//             <FastForward size={14} /> Next Station
//           </button>
//           <div className="flex items-center gap-2 hidden sm:flex">
//             <Volume2 size={16} className="text-indigo-200/70" />
//             <input type="range" min="0" max="1" step="0.05" value={volume} onChange={(e) => setVolume(parseFloat(e.target.value))} className="w-24 accent-indigo-500 h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer" />
//           </div>
//         </div>
//       </div>

//     </div>
//   );
// }


// import React, { useState, useEffect, useRef } from 'react';
// import { Play, Pause, Volume2, VolumeX, Plus, Trash2, CheckCircle2, Circle, SkipForward, SkipBack, Repeat, Shuffle, Clock } from 'lucide-react';

// const STATIONS = [
//   { 
//     name: 'Lofi Beats', 
//     artist: 'laut.fm Live', 
//     cover: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=150&h=150&fit=crop', 
//     url: 'https://lofi.stream.laut.fm/lofi' 
//   },
//   { 
//     name: 'Chillhop Vibes', 
//     artist: 'laut.fm Live', 
//     cover: 'https://images.unsplash.com/photo-1493225457124-a1a2a5f5f924?w=150&h=150&fit=crop', 
//     url: 'https://chillhop.stream.laut.fm/chillhop' 
//   }
// ];

// export default function App() {
//   // --- STATE ---
//   const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem('tasks')) || []);
//   const [newTask, setNewTask] = useState('');
  
//   // Timer State
//   const [timeLeft, setTimeLeft] = useState(25 * 60);
//   const [isActive, setIsActive] = useState(false);
//   const [sessions, setSessions] = useState(0);

//   // Music State
//   const audioRef = useRef(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [volume, setVolume] = useState(0.5);
//   const [stationIndex, setStationIndex] = useState(0);

//   const taskInputRef = useRef(null);

//   // --- EFFECTS ---
//   // Save tasks to local storage
//   useEffect(() => {
//     localStorage.setItem('tasks', JSON.stringify(tasks));
//   }, [tasks]);

//   // Pomodoro Timer Logic
//   useEffect(() => {
//     let interval = null;
//     if (isActive && timeLeft > 0) {
//       interval = setInterval(() => setTimeLeft((time) => time - 1), 1000);
//     } else if (timeLeft === 0) {
//       setIsActive(false);
//       setSessions((s) => s + 1);
//       setTimeLeft(5 * 60); // 5 min break
//       // Optional: Add a browser beep here if needed
//     }
//     return () => clearInterval(interval);
//   }, [isActive, timeLeft]);

//   // Handle Audio Playback
//   useEffect(() => {
//     if (audioRef.current) {
//       audioRef.current.volume = volume;
//       if (isPlaying) {
//         audioRef.current.play().catch(e => console.error("Audio blocked:", e));
//       } else {
//         audioRef.current.pause();
//       }
//     }
//   }, [isPlaying, stationIndex]);

//   // Handle Volume Change
//   useEffect(() => {
//     if (audioRef.current) audioRef.current.volume = volume;
//   }, [volume]);

//   // Keyboard Shortcuts
//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (e.target.tagName === 'INPUT') return;
//       if (e.code === 'Space') { e.preventDefault(); setIsPlaying(p => !p); }
//       if (e.key.toLowerCase() === 's') setIsActive(a => !a);
//       if (e.key.toLowerCase() === 'n') { e.preventDefault(); taskInputRef.current?.focus(); }
//       if (e.key.toLowerCase() === 'c') setTasks(t => t.filter(task => !task.completed));
//     };
//     window.addEventListener('keydown', handleKeyDown);
//     return () => window.removeEventListener('keydown', handleKeyDown);
//   }, []);

//   // --- HANDLERS ---
//   const addTask = (e) => {
//     e.preventDefault();
//     if (!newTask.trim()) return;
//     setTasks([{ id: Date.now(), text: newTask, completed: false }, ...tasks]);
//     setNewTask('');
//   };

//   const toggleTask = (id) => {
//     setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
//   };

//   const formatTime = (seconds) => {
//     const m = Math.floor(seconds / 60);
//     const s = seconds % 60;
//     return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
//   };

//   // SVG Ring Math
//   const radius = 90;
//   const circumference = 2 * Math.PI * radius;
//   const strokeDashoffset = circumference - (timeLeft / (25 * 60)) * circumference;

//   const currentStation = STATIONS[stationIndex];

//   return (
//     <div className="min-h-screen bg-[#121212] text-[#B3B3B3] font-sans pb-24 selection:bg-[#1DB954]/30">
      
//       {/* HTML5 Audio Player (The Reliable Way) */}
//       <audio ref={audioRef} src={currentStation.url} preload="auto" />

//       {/* Main Content Layout */}
//       <div className="max-w-7xl mx-auto p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
//         {/* LEFT COLUMN: TIMER (Spotify Album Art Vibe) */}
//         <div className="lg:col-span-5 flex flex-col items-center">
//           <div className="w-full bg-[#181818] rounded-xl p-8 flex flex-col items-center hover:bg-[#282828] transition-colors duration-300">
//             <h2 className="text-white font-bold text-xl mb-8 tracking-wide">Focus Session</h2>
            
//             {/* Massive SVG Timer Ring */}
//             <div className="relative flex items-center justify-center w-64 h-64 mb-8">
//               <svg className="absolute inset-0 w-full h-full transform -rotate-90">
//                 <circle cx="128" cy="128" r={radius} stroke="#282828" strokeWidth="6" fill="transparent" />
//                 <circle cx="128" cy="128" r={radius} stroke="#1DB954" strokeWidth="6" fill="transparent" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} className="transition-all duration-1000 ease-linear drop-shadow-[0_0_8px_rgba(29,185,84,0.4)]" />
//               </svg>
//               <div className="text-center z-10 flex flex-col items-center">
//                 <span className="text-6xl font-bold text-white tabular-nums tracking-tighter">{formatTime(timeLeft)}</span>
//                 <span className="text-sm mt-2 flex items-center gap-1">
//                   <Clock size={14} /> {isActive ? 'Running' : 'Paused'}
//                 </span>
//               </div>
//             </div>

//             {/* Spotify-style Timer Controls */}
//             <div className="flex items-center gap-6">
//               <button onClick={() => { setIsActive(false); setTimeLeft(25 * 60); }} className="text-[#B3B3B3] hover:text-white transition-colors">
//                 <Repeat size={20} />
//               </button>
//               <button onClick={() => setIsActive(!isActive)} className="w-16 h-16 bg-[#1DB954] rounded-full flex items-center justify-center text-black hover:scale-105 transition-transform">
//                 {isActive ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1" />}
//               </button>
//               <div className="flex flex-col items-center">
//                 <span className="text-xs font-bold text-white">{sessions}</span>
//                 <span className="text-[10px] uppercase tracking-wider">Cycles</span>
//               </div>
//             </div>
//           </div>

//           {/* Shortcuts Legend */}
//           <div className="w-full mt-6 bg-[#181818] rounded-xl p-4 text-xs flex justify-between items-center text-[#B3B3B3]">
//             <span><kbd className="font-mono bg-[#282828] px-1.5 py-0.5 rounded text-white mr-1">Space</kbd> Play/Pause</span>
//             <span><kbd className="font-mono bg-[#282828] px-1.5 py-0.5 rounded text-white mr-1">S</kbd> Timer</span>
//             <span><kbd className="font-mono bg-[#282828] px-1.5 py-0.5 rounded text-white mr-1">N</kbd> Task</span>
//           </div>
//         </div>

//         {/* RIGHT COLUMN: TASKS (Spotify Playlist Vibe) */}
//         <div className="lg:col-span-7 bg-[#181818] rounded-xl p-6 flex flex-col h-[600px]">
//           <div className="flex items-end justify-between mb-6 pb-6 border-b border-[#282828]">
//             <div>
//               <p className="text-sm uppercase tracking-widest mb-1">Playlist</p>
//               <h1 className="text-4xl font-bold text-white tracking-tight">Mission Objectives</h1>
//             </div>
//             <p className="text-sm">{tasks.filter(t => t.completed).length} / {tasks.length} Completed</p>
//           </div>

//           <form onSubmit={addTask} className="relative mb-6">
//             <input ref={taskInputRef} type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder="What needs to be done?" className="w-full bg-[#282828] text-white border-none rounded-md py-3 pl-4 pr-12 focus:outline-none focus:ring-1 focus:ring-white/30 placeholder-[#B3B3B3]/50" />
//             <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-[#B3B3B3] hover:text-white p-1">
//               <Plus size={20} />
//             </button>
//           </form>

//           {/* Task List */}
//           <div className="flex-1 overflow-y-auto space-y-1 custom-scrollbar pr-2">
//             {tasks.length === 0 && <p className="text-center mt-10 text-sm">No tasks added yet.</p>}
//             {tasks.map((task, index) => (
//               <div key={task.id} className="group flex items-center justify-between p-3 rounded-md hover:bg-[#282828] transition-colors">
//                 <div className="flex items-center gap-4 cursor-pointer" onClick={() => toggleTask(task.id)}>
//                   <span className="text-sm w-4 text-right opacity-0 group-hover:opacity-100">{index + 1}</span>
//                   {task.completed ? <CheckCircle2 size={20} className="text-[#1DB954]" /> : <Circle size={20} />}
//                   <span className={`text-sm font-medium ${task.completed ? 'text-[#B3B3B3] line-through' : 'text-white'}`}>{task.text}</span>
//                 </div>
//                 <button onClick={() => deleteTask(task.id)} className="opacity-0 group-hover:opacity-100 text-[#B3B3B3] hover:text-red-400 transition-colors">
//                   <Trash2 size={16} />
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* BOTTOM PLAYBACK BAR (Exact Spotify Replica) */}
//       <div className="fixed bottom-0 left-0 w-full h-24 bg-[#181818] border-t border-[#282828] flex items-center justify-between px-4 z-50">
        
//         {/* Left: Now Playing Info */}
//         <div className="flex items-center gap-4 w-1/3">
//           <img src={currentStation.cover} alt="Cover art" className="w-14 h-14 rounded-md shadow-md" />
//           <div className="flex flex-col">
//             <span className="text-white text-sm font-semibold">{currentStation.name}</span>
//             <span className="text-xs text-[#B3B3B3] flex items-center gap-2">
//               {currentStation.artist}
//               {isPlaying && <span className="flex gap-0.5 h-2 items-end">
//                 <span className="w-0.5 bg-[#1DB954] animate-[bounce_1s_infinite] h-full"></span>
//                 <span className="w-0.5 bg-[#1DB954] animate-[bounce_1s_infinite_0.2s] h-2/3"></span>
//                 <span className="w-0.5 bg-[#1DB954] animate-[bounce_1s_infinite_0.4s] h-full"></span>
//               </span>}
//             </span>
//           </div>
//         </div>

//         {/* Center: Playback Controls */}
//         <div className="flex flex-col items-center justify-center w-1/3">
//           <div className="flex items-center gap-6 mb-2">
//             <Shuffle size={16} className="text-[#1DB954]" />
//             <button onClick={() => setStationIndex((prev) => (prev === 0 ? STATIONS.length - 1 : prev - 1))} className="text-[#B3B3B3] hover:text-white">
//               <SkipBack size={20} fill="currentColor" />
//             </button>
//             <button onClick={() => setIsPlaying(!isPlaying)} className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black hover:scale-105 transition-transform">
//               {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" className="ml-0.5" />}
//             </button>
//             <button onClick={() => setStationIndex((prev) => (prev + 1) % STATIONS.length)} className="text-[#B3B3B3] hover:text-white">
//               <SkipForward size={20} fill="currentColor" />
//             </button>
//             <Repeat size={16} className="text-[#B3B3B3]" />
//           </div>
//           {/* Fake timeline for "Live" streams */}
//           <div className="flex items-center gap-2 w-full max-w-md">
//             <span className="text-[10px]">LIVE</span>
//             <div className="h-1 flex-1 bg-[#4D4D4D] rounded-full overflow-hidden group">
//               <div className="h-full w-full bg-[#1DB954] rounded-full relative">
//                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 shadow"></div>
//               </div>
//             </div>
//             <span className="text-[10px]">--:--</span>
//           </div>
//         </div>

//         {/* Right: Volume Control */}
//         <div className="flex items-center justify-end gap-3 w-1/3">
//           <button onClick={() => setVolume(v => v === 0 ? 0.5 : 0)} className="text-[#B3B3B3] hover:text-white">
//             {volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
//           </button>
//           <div className="w-24 group flex items-center">
//             <input type="range" min="0" max="1" step="0.01" value={volume} onChange={(e) => setVolume(parseFloat(e.target.value))} className="w-full h-1 bg-[#4D4D4D] rounded-full appearance-none cursor-pointer accent-white group-hover:accent-[#1DB954]" />
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Plus, Trash2, CheckCircle2, Circle, SkipForward, SkipBack, Repeat, Shuffle, Clock } from 'lucide-react';

// Switched from Live Radio to Individual Third-Party MP3 Streams
const PLAYLIST = [
  { 
    name: 'Midnight Study', 
    artist: 'Lofi Vibes', 
    cover: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=150&h=150&fit=crop', 
    url: 'https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3' 
  },
  { 
    name: 'Chill Abstract', 
    artist: 'Study Beats', 
    cover: 'https://images.unsplash.com/photo-1493225457124-a1a2a5f5f924?w=150&h=150&fit=crop', 
    url: 'https://cdn.pixabay.com/audio/2022/04/27/audio_308c8fbdfb.mp3' 
  },
  { 
    name: 'Coffee Shop Lofi', 
    artist: 'Focus Flow', 
    cover: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=150&h=150&fit=crop', 
    url: 'https://cdn.pixabay.com/audio/2022/03/15/audio_141a54db68.mp3' 
  }
];

export default function App() {
  // --- STATE ---
  const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem('tasks')) || []);
  const [newTask, setNewTask] = useState('');
  
  // Timer State
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [sessions, setSessions] = useState(0);

  // Music State
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [trackIndex, setTrackIndex] = useState(0);
  
  // NEW: Track Progress State
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const taskInputRef = useRef(null);

  // --- EFFECTS ---
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Pomodoro Timer Logic
  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((time) => time - 1), 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      setSessions((s) => s + 1);
      setTimeLeft(5 * 60);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  // Handle Audio Playback
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Audio blocked:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, trackIndex]);

  // Handle Volume Change
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT') return;
      if (e.code === 'Space') { e.preventDefault(); setIsPlaying(p => !p); }
      if (e.key.toLowerCase() === 's') setIsActive(a => !a);
      if (e.key.toLowerCase() === 'n') { e.preventDefault(); taskInputRef.current?.focus(); }
      if (e.key.toLowerCase() === 'c') setTasks(t => t.filter(task => !task.completed));
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // --- HANDLERS ---
  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    setTasks([{ id: Date.now(), text: newTask, completed: false }, ...tasks]);
    setNewTask('');
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return "00:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Music Player Handlers
  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleSeek = (e) => {
    const time = Number(e.target.value);
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const nextTrack = () => {
    setTrackIndex((prev) => (prev + 1) % PLAYLIST.length);
  };

  const prevTrack = () => {
    setTrackIndex((prev) => (prev === 0 ? PLAYLIST.length - 1 : prev - 1));
  };

  // SVG Ring Math
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (timeLeft / (25 * 60)) * circumference;

  const currentTrack = PLAYLIST[trackIndex];

  return (
    <div className="min-h-screen bg-[#121212] text-[#B3B3B3] font-sans pb-24 selection:bg-[#1DB954]/30">
      
      {/* HTML5 Audio Player (Now tracks time and auto-plays next song) */}
      <audio 
        ref={audioRef} 
        src={currentTrack.url} 
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={nextTrack}
        preload="auto" 
      />

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: TIMER */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="w-full bg-[#181818] rounded-xl p-8 flex flex-col items-center hover:bg-[#282828] transition-colors duration-300">
            <h2 className="text-white font-bold text-xl mb-8 tracking-wide">Focus Session</h2>
            
            <div className="relative flex items-center justify-center w-64 h-64 mb-8">
              <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                <circle cx="128" cy="128" r={radius} stroke="#282828" strokeWidth="6" fill="transparent" />
                <circle cx="128" cy="128" r={radius} stroke="#1DB954" strokeWidth="6" fill="transparent" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} className="transition-all duration-1000 ease-linear drop-shadow-[0_0_8px_rgba(29,185,84,0.4)]" />
              </svg>
              <div className="text-center z-10 flex flex-col items-center">
                <span className="text-6xl font-bold text-white tabular-nums tracking-tighter">{formatTime(timeLeft)}</span>
                <span className="text-sm mt-2 flex items-center gap-1">
                  <Clock size={14} /> {isActive ? 'Running' : 'Paused'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <button onClick={() => { setIsActive(false); setTimeLeft(25 * 60); }} className="text-[#B3B3B3] hover:text-white transition-colors">
                <Repeat size={20} />
              </button>
              <button onClick={() => setIsActive(!isActive)} className="w-16 h-16 bg-[#1DB954] rounded-full flex items-center justify-center text-black hover:scale-105 transition-transform">
                {isActive ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1" />}
              </button>
              <div className="flex flex-col items-center">
                <span className="text-xs font-bold text-white">{sessions}</span>
                <span className="text-[10px] uppercase tracking-wider">Cycles</span>
              </div>
            </div>
          </div>

          <div className="w-full mt-6 bg-[#181818] rounded-xl p-4 text-xs flex justify-between items-center text-[#B3B3B3]">
            <span><kbd className="font-mono bg-[#282828] px-1.5 py-0.5 rounded text-white mr-1">Space</kbd> Play/Pause</span>
            <span><kbd className="font-mono bg-[#282828] px-1.5 py-0.5 rounded text-white mr-1">S</kbd> Timer</span>
            <span><kbd className="font-mono bg-[#282828] px-1.5 py-0.5 rounded text-white mr-1">N</kbd> Task</span>
          </div>
        </div>

        {/* RIGHT COLUMN: TASKS */}
        <div className="lg:col-span-7 bg-[#181818] rounded-xl p-6 flex flex-col h-[600px]">
          <div className="flex items-end justify-between mb-6 pb-6 border-b border-[#282828]">
            <div>
              <p className="text-sm uppercase tracking-widest mb-1">Playlist</p>
              <h1 className="text-4xl font-bold text-white tracking-tight">Mission Objectives</h1>
            </div>
            <p className="text-sm">{tasks.filter(t => t.completed).length} / {tasks.length} Completed</p>
          </div>

          <form onSubmit={addTask} className="relative mb-6">
            <input ref={taskInputRef} type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder="What needs to be done?" className="w-full bg-[#282828] text-white border-none rounded-md py-3 pl-4 pr-12 focus:outline-none focus:ring-1 focus:ring-white/30 placeholder-[#B3B3B3]/50" />
            <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-[#B3B3B3] hover:text-white p-1">
              <Plus size={20} />
            </button>
          </form>

          <div className="flex-1 overflow-y-auto space-y-1 custom-scrollbar pr-2">
            {tasks.length === 0 && <p className="text-center mt-10 text-sm">No tasks added yet.</p>}
            {tasks.map((task, index) => (
              <div key={task.id} className="group flex items-center justify-between p-3 rounded-md hover:bg-[#282828] transition-colors">
                <div className="flex items-center gap-4 cursor-pointer" onClick={() => toggleTask(task.id)}>
                  <span className="text-sm w-4 text-right opacity-0 group-hover:opacity-100">{index + 1}</span>
                  {task.completed ? <CheckCircle2 size={20} className="text-[#1DB954]" /> : <Circle size={20} />}
                  <span className={`text-sm font-medium ${task.completed ? 'text-[#B3B3B3] line-through' : 'text-white'}`}>{task.text}</span>
                </div>
                <button onClick={() => deleteTask(task.id)} className="opacity-0 group-hover:opacity-100 text-[#B3B3B3] hover:text-red-400 transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BOTTOM PLAYBACK BAR */}
      <div className="fixed bottom-0 left-0 w-full h-24 bg-[#181818] border-t border-[#282828] flex items-center justify-between px-4 z-50">
        
        {/* Left: Now Playing Info */}
        <div className="flex items-center gap-4 w-1/3">
          <img src={currentTrack.cover} alt="Cover art" className="w-14 h-14 rounded-md shadow-md" />
          <div className="flex flex-col">
            <span className="text-white text-sm font-semibold hover:underline cursor-pointer">{currentTrack.name}</span>
            <span className="text-xs text-[#B3B3B3] hover:underline cursor-pointer">{currentTrack.artist}</span>
          </div>
        </div>

        {/* Center: Playback Controls & Progress Bar */}
        <div className="flex flex-col items-center justify-center w-1/3">
          <div className="flex items-center gap-6 mb-2">
            <Shuffle size={16} className="text-[#1DB954]" />
            <button onClick={prevTrack} className="text-[#B3B3B3] hover:text-white transition-colors">
              <SkipBack size={20} fill="currentColor" />
            </button>
            <button onClick={() => setIsPlaying(!isPlaying)} className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black hover:scale-105 transition-transform">
              {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" className="ml-0.5" />}
            </button>
            <button onClick={nextTrack} className="text-[#B3B3B3] hover:text-white transition-colors">
              <SkipForward size={20} fill="currentColor" />
            </button>
            <Repeat size={16} className="text-[#B3B3B3]" />
          </div>
          
          {/* REAL Progress Timeline */}
          <div className="flex items-center gap-2 w-full max-w-md">
            <span className="text-xs text-[#B3B3B3] w-10 text-right">{formatTime(currentTime)}</span>
            <input 
              type="range" 
              min="0" 
              max={duration || 0} 
              value={currentTime} 
              onChange={handleSeek}
              className="flex-1 h-1 bg-[#4D4D4D] rounded-full appearance-none cursor-pointer accent-white hover:accent-[#1DB954] transition-all" 
            />
            <span className="text-xs text-[#B3B3B3] w-10">{formatTime(duration)}</span>
          </div>
        </div>

        {/* Right: Volume Control */}
        <div className="flex items-center justify-end gap-3 w-1/3">
          <button onClick={() => setVolume(v => v === 0 ? 0.5 : 0)} className="text-[#B3B3B3] hover:text-white">
            {volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
          <div className="w-24 group flex items-center">
            <input type="range" min="0" max="1" step="0.01" value={volume} onChange={(e) => setVolume(parseFloat(e.target.value))} className="w-full h-1 bg-[#4D4D4D] rounded-full appearance-none cursor-pointer accent-white group-hover:accent-[#1DB954]" />
          </div>
        </div>

      </div>
    </div>
  );
}