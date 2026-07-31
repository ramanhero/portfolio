import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BracketButton from '../components/BracketButton';
import { useCursor } from '../context/CursorContext';


import CareerCopilotImg from '../assets/SplitScreenImgs/CareerCopilotDashboardImg.png';
import SkillScaleImg from '../assets/SplitScreenImgs/SkillScaleDashboardImg.png';
import fullScreenIcon from '../assets/SplitScreenImgs/FullScreenIcon.png';
import skillScaleLogo from '../assets/SplitScreenImgs/skill scale logo.png';
import cubeLogo from '../assets/SplitScreenImgs/cube-alt-1-svgrepo-com.svg';
import iitgLogo from '../assets/SplitScreenImgs/IIT_Gandhinagar_idM29o02Th_0.png';
import puLogo from '../assets/SplitScreenImgs/pu logo.png';

gsap.registerPlugin(ScrollTrigger);

const investorCards = [
  {
    title: 'Dynamic Multi-Stage Testing (MST) Orchestration Engine',
    num: '01',
    bullets: [
      'A continuous Multi-Stage Testing (MST) loop that dynamically escalates assessment complexity based on real-time candidate proficiency.',
      'Built a microservices bridge utilizing FastAPI to route LLM inference data, maintaining sub-second phase transition latencies.',
      'Tech Stack — FastAPI (Python), Spring Boot (Java 17+), Groq API (Llama 3) / OpenAI API (GPT-4o-mini), Pydantic (v2)',
    ],
    image: SkillScaleImg,
    fullScreenIcon: fullScreenIcon,
    bg: 'bg-accent-teal',
    text: 'text-[#1A1A1A]',
    architecturalDepth: [
      'This system replaces static, linear exams with a continuous AI-driven loop.',
      'When a candidate submits a test phase, React transmits a telemetry payload to Spring Boot orchestrator.',
      'Spring Boot instantly grades the baseline syntax and routes the performance metadata (score, time spent, specific failed sub-topics) to a Python FastAPI microservice.',
      'FastAPI ingests this data, queries a cloud LLM (via Groq or OpenAI) using strict Structured Output (JSON Mode), and computes the exact cognitive friction of the user.',
      'It then returns the specific database parameters (e.g., targetDifficulty: HARD, targetSubtopic: Rotated Arrays) back to Spring Boot to fetch and serve the next phase.',
    ],
    technicalComplexity: [
      'The hardest challenge was eliminating latency to maintain a snappy SPA user experience while waiting for AI inference. Open-source models running locally would choke the transition time.',
      'The solution was decoupling the AI logic from the state-manager by using a dedicated FastAPI router communicating with ultra-fast inference APIs (like Llama 3 via Groq at 200+ tokens/sec).',
      "Furthermore, ensuring the AI didn't hallucinate next steps required rigid Pydantic schemas and strict JSON-mode enforcement, guaranteeing the Java backend always received a parseable database query block.",
    ],
  },
  {
    title: 'High-Fidelity Behavioral Telemetry Pipeline',
    num: '02',
    bullets: [
      'Developed a silent client-side telemetry engine to harvest millisecond-level cognitive friction metrics, including context swapping, refactoring rates, and execution frequency.',
      'Implemented isolated React useRef timer matrices and background event listeners to capture continuous behavioral data without blocking the main DOM rendering thread.',
      'Tech Stack — React & TypeScript, Web Workers API, DOM Window APIs (visibilitychange, onblur)',
    ],
    image: SkillScaleImg,
    fullScreenIcon: fullScreenIcon,
    bg: 'bg-accent-orange',
    text: 'text-white',
    architecturalDepth: [
      'A silent, client-side tracking engine built directly into the React SPA.',
      'It monitors seven distinct vectors of human behavior: per-question latency, code execution frequency, syntactic hesitation, code refactoring rates, tab isolation (context swapping), idle thinking, and pattern regression.',
      'It utilizes high-resolution timers (performance.now()) tied to local React useRef maps to track time.',
      'It attaches event interceptors to window management APIs (window.onblur, visibilitychange) to track tab jumps, and uses debounced keystroke listeners to detect 8000ms+ hesitation pauses.',
    ],
    technicalComplexity: [
      'Capturing deep psychological friction without impacting the main DOM rendering thread or causing UI lag was critical.',
      'The biggest edge case was tracking per-question latency when users constantly clicked back and forth between questions.',
      'This was solved by engineering a localized key-value JavaScript object tracker state that explicitly pauses, caches the elapsed millisecond timestamp, and resumes isolated timers natively in the background upon component remounts—preventing timer corruption or memory leaks.',
    ],
  },
  {
    title: 'Remote Code Execution (RCE) Sandbox & IDE Integration',
    num: '03',
    bullets: [
      'Integrated a full-featured code workspace utilizing Monaco Editor, enabling real-time syntax highlighting, multi-language support, and read-only boilerplate templates.',
      "Secured arbitrary code execution by routing compilation requests through the Judge0 remote API, isolating untrusted runtime processes and capturing precise memory and time complexity metrics.",
      'Tech Stack — React, Monaco Editor / CodeMirror Node, Judge0 REST API, Spring Boot (Reverse Proxy/Routing)',
    ],
    image: SkillScaleImg,
    fullScreenIcon: fullScreenIcon,
    bg: 'bg-[#27272A]',
    text: 'text-white',
    architecturalDepth: [
      'This module powers the 50/50 split-screen active coding workspace.',
      'The client utilizes a Monaco Editor / CodeMirror instance configured for dynamic language switching (Python, Java, C++).',
      'When a candidate clicks the [Run Code] button, the frontend dispatches the raw code strings and test cases to Spring Boot, which acts as a secure reverse proxy to the Judge0 Remote Sandbox API.',
      "Judge0 executes the code inside isolated, ephemeral Docker containers, analyzes standard output (stdout), calculates memory allocation, and returns the runtime metrics to the client's collapsible terminal drawer.",
    ],
    technicalComplexity: [
      'Allowing untrusted candidates to execute arbitrary code infinitely is a massive security risk (e.g., infinite while loops, malicious file system access).',
      'The challenge was securing the host infrastructure while providing a seamless, local-feeling IDE experience.',
      "By offloading execution entirely to Judge0's remote sandboxed environments and managing asynchronous execution states on the frontend (using skeleton loaders and error diffing), the platform securely measures time/space complexity without exposing the core server.",
    ],
  },
  {
    title: 'AI Diagnostic & Markdown Verdict Engine',
    num: '04',
    bullets: [
      'Engineered an automated diagnostic engine that ingests complex session telemetry to generate brutally honest, hyper-personalized Markdown performance reports.',
      'Optimized LLM JSON-mode prompting to extract four distinct technical pillar scores directly derived from candidate hesitation and algorithmic edge-case failures.',
      'Tech Stack — FastAPI (Python), Cloud LLMs (JSON Mode), React Markdown, CSS Grid (Diagnostic UI mapping)',
    ],
    image: SkillScaleImg,
    fullScreenIcon: fullScreenIcon,
    bg: 'bg-[#121214]',
    text: 'text-white',
    architecturalDepth: [
      'Operating in "Zone 4" (the read-only final report phase), this system generates the definitive candidate evaluation.',
      'Once the MST loop terminates, Spring Boot aggregates the entire session\'s behavioral JSON log and posts it to FastAPI.',
      'FastAPI instructs the LLM to act as a "brutally honest" evaluator.',
      'The model parses the telemetry to expose psychological triggers (e.g., trial-and-error code spamming) and outputs a structured JSON response mapped to four hardcoded technical pillars (Syntax, Logic, Complexity, Edge Cases), alongside a dynamically generated Markdown breakdown of logical flaws.',
    ],
    technicalComplexity: [
      'Converting raw numerical arrays (timers, click counts) into highly specific, human-readable engineering insights without hallucinating generalized "study plans" required aggressive prompt constraints.',
      'The system had to reliably map the generated text directly back to the specific adaptive sub-topics queried during the test phases (e.g., Upper Bounds, Rotated Arrays).',
      'Strict system prompting and frontend Markdown rendering libraries were utilized to ensure the UI remained pristine and strictly diagnostic.',
    ],
  },
  {
    title: 'Hybrid Relational Data Orchestration Layer',
    num: '05',
    bullets: [
      'Architected a centralized state-machine layer using Spring Boot to orchestrate session lifecycles, API payload validation, and microservice routing.',
      'Optimized database schema design by leveraging PostgreSQL JSONB columns to persist heavily nested, multi-dimensional telemetry data efficiently.',
      'Tech Stack — Spring Boot (Java), PostgreSQL JSONB (Binary JSON), Spring Security & JWT',
    ],
    image: CareerCopilotImg,
    fullScreenIcon: fullScreenIcon,
    bg: 'bg-[#141519]',
    text: 'text-white',
    architecturalDepth: [
      'The core foundational backend layer of the application.',
      'Spring Boot manages the transactional state, REST API routing, and system security (via JWTs).',
      'It orchestrates communication between the React client and the FastAPI service.',
      'The database layer utilizes PostgreSQL.',
      'While user profiles, question banks, and session IDs are stored in standard relational tables, the highly dynamic, multi-dimensional candidate telemetry arrays are stored using optimized binary JSON format.',
    ],
    technicalComplexity: [
      'Designing a database schema for telemetry data is difficult because behavioral arrays are unstructured and deeply nested (e.g., tracking an array of individual keystroke delays mapped to specific code compilation attempts).',
      'Creating a dozen relational SQL tables to track this would cause massive query latency.',
      'The solution was leveraging PostgreSQL\'s JSONB column types to store the unrolled client telemetry logs directly inside the session rows, allowing for rapid read/write speeds while preserving indexing and querying capabilities.',
    ],
  },
  {
    title: 'AI-Driven Predictive Career Roadmap Engine',
    num: '01',
    bullets: [
      'Architected a highly scalable, nested roadmap state engine that parses user career profiles into dynamic, hierarchical learning paths with real-time progress calculations.',
      'Engineered an optimistic UI execution pipeline utilizing state management and debounced network requests, reducing perceived application latency for core interactive tasks to 0ms.',
      'Tech Stack — React, Tailwind CSS, Framer Motion, Node.js, Express, PostgreSQL / MongoDB, REST APIs.',
    ],
    image: CareerCopilotImg,
    fullScreenIcon: fullScreenIcon,
    bg: 'bg-accent-teal',
    text: 'text-[#1A1A1A]',
    architecturalDepth: [
      'This subsystem serves as the core intelligence framework, transforming unstructured target role inputs and career ambitions into deterministic, hierarchical execution paths.',
      'When a user selects a target role or company, the Roadmap Service initiates an asynchronous worker that evaluates the user\'s current baseline against target requirements.',
      'It constructs an acyclic, nested data structure consisting of Phases, Paths, and Subpaths, representing data at the lowest level as atomic RoadmapTask nodes.',
      'The orchestration layer relies on a dynamic directed acyclic graph (DAG) framework where checking a node triggers cascading state updates up to the root parent phase, calculating real-time completion percentages via optimized aggregation queries.',
    ],
    technicalComplexity: [
      'Managing dynamic, deeply nested subpaths (from macro phases down to atomic micro-tasks) without causing cascading re-renders on the frontend or expensive recursive read/write cycles on the database.',
      'The subsystem uses an optimistic UI update protocol via state management hooks. When a user checks a task, the completion state changes instantly (O(1) client side).',
      'A debounced network request fires concurrently to update the persistence layer (PUT /api/roadmaps/tasks/{id}/complete), handling automated rollbacks seamlessly if a network failure occurs.',
    ],
  },
  {
    title: 'Dynamic Skills-Gap & Real-Time Company Telemetry Hub',
    num: '02',
    bullets: [
      'Designed a real-time data orchestration pipeline integrating JSearch and Clearbit APIs to fetch, match, and render real-time corporate requirements and localized job telemetry.',
      'Optimized external API network overhead by implementing a custom 500ms debouncing wrapper and a smart local cache layer, reducing redundant external data calls by 40%.',
      'Tech Stack — React, Node.js, Express, JSearch API, Clearbit API, PostgreSQL.',
    ],
    image: CareerCopilotImg,
    fullScreenIcon: fullScreenIcon,
    bg: 'bg-accent-blue',
    text: 'text-white',
    architecturalDepth: [
      'This edge integration layer powers the Company Service, serving as a live intelligence dashboard comparing user capabilities against industry realities.',
      'The module acts as an API orchestration layer that aggregates data from external data pools (JSearch API and Clearbit API).',
      'Upon user search queries, the system executes debounced, concurrent fetch requests, retrieving job specifications and rendering high-resolution brand assets dynamically with localized cache fallbacks.',
      'The system then feeds the fetched text array and the user\'s explicit profile array into a client-side vector-matching routine, dynamically generating visual skill-gap indicators.',
    ],
    technicalComplexity: [
      'Preventing third-party API throttling and high resource consumption caused by live user search inputs.',
      'This was solved by engineering a custom 500ms debouncing layer combined with a local caching mechanism that checks existing database entities before dispatching new external API requests.',
      'Managing data persistence gracefully when transient search results are interactive. If a user decides to "Follow" a company discovered dynamically via the external search API, the system executes an atomic transaction that registers the company into the local relational schema before establishing the user-to-company link entity.',
    ],
  },
  {
    title: 'Adaptive Skill Diagnostic & Formative Assessment Pipeline',
    num: '03',
    bullets: [
      'Developed an isolated, finite-state diagnostic assessment engine capable of evaluating granular skill proficiencies through single-view query queues.',
      'Implemented an automated text-parsing extraction interface that converts unstructured text area entries into clean, normalized skill array tokens in real time.',
      'Tech Stack — React, Framer Motion, Tailwind CSS, State Management, Custom Keywords Tokenizer.',
    ],
    image: CareerCopilotImg,
    fullScreenIcon: fullScreenIcon,
    bg: 'bg-accent-purple',
    text: 'text-[#1A1A1A]',
    architecturalDepth: [
      'This module handles user verification and knowledge baseline mapping via the Skill Set Analysis and Formative Assessment frameworks.',
      'The system presents an isolated layout split into interactive search panels, raw multi-line string inputs, and an evaluation card array.',
      'When text inputs are provided, an intelligent text parser extracts core keywords to populate the user\'s active skill tokens.',
      'Once initialized, the application transitions into an exclusive testing environment managed via an explicit step-based state machine, showing exactly one question per screen.',
    ],
    technicalComplexity: [
      'Forcing the application interface into an exclusive testing layout while retaining all user state across navigation boundaries, preventing premature data loss if a user accidentally navigates away.',
      'Handling deep diagnostic assessments that trigger conditionally upon micro-task or phase completion.',
      'Dynamically calculating performance metrics below a maximum threshold (100%) to identify precise knowledge deficiencies and automatically serve remediation resources.',
    ],
  },
  {
    title: 'Isomorphic Portfolio & Live Project Microservice',
    num: '04',
    bullets: [
      'Built a scalable portfolio compilation service providing high-speed CRUD capabilities for multi-tenant technical project assets.',
      'Streamlined data flow across multiple isolated sub-modules by designing an event-driven state sync that updates profile metrics, resume panels, and search results concurrently.',
      'Tech Stack — React, Tailwind CSS, Node.js, Express, Relational / Document Schemas, Context State API.',
    ],
    image: CareerCopilotImg,
    fullScreenIcon: fullScreenIcon,
    bg: 'bg-accent-orange',
    text: 'text-[#1A1A1A]',
    architecturalDepth: [
      'This module functions as the Project Service, a specialized environment where users build, manage, and display their engineering proof-of-work.',
      'The backend exposes isolated REST endpoints (/api/projects) built explicitly for high-speed CRUD operations.',
      'The user interface uses clean modulations (modals, drawers, and grid layouts) to capture and serialize complex project payloads, including metadata titles, multi-line descriptions, and repository pointers.',
      'This data is fed directly into the client application dashboard, the global search query pools, and the dynamic resume generation engine.',
    ],
    technicalComplexity: [
      'Ensuring that changes, additions, or structural deletions of a user\'s project instantly populate all dependent views across the entire platform (e.g., updating dashboard metric cards, altering live resume templates, modifying public profile layouts) without data drifting out of sync.',
      'Managing dynamically added tech-stack arrays, allowing color-coded UI component generation depending on structural language categories while validating input strings to match standard development syntax.',
    ],
  },
  {
    title: 'Global Asynchronous State Orchestration & UI Layer',
    num: '05',
    bullets: [
      'Orchestrated a centralized layout architecture executing parallelized asynchronous API routines to fetch and mount multiple business data metrics simultaneously.',
      'Designed a standardized user experience system including global skeleton loading behaviors, contextual dark/light themes, and custom error boundaries with state recovery logic.',
      'Tech Stack — React, Tailwind CSS, Framer Motion, LocalStorage API, Error Boundaries.',
    ],
    image: CareerCopilotImg,
    fullScreenIcon: fullScreenIcon,
    bg: 'bg-accent-indigo',
    text: 'text-white',
    architecturalDepth: [
      'This system acts as the backbone of the application\'s overall user experience.',
      'It encapsulates the core layout engine (DashboardLayout), the global state synchronization mechanism, and the contextual theme pipeline.',
      'The architecture manages concurrent data fetching via parallelized promises during initial layout mounting, loading multiple structural panels simultaneously.',
      'The layer handles global user visibility toggles, standardizes user visual responses through skeleton states, and captures runtime errors through declarative Error Boundaries with built-in retry mechanisms.',
    ],
    technicalComplexity: [
      'Preventing race conditions and unhandled UI failures when firing several critical network calls simultaneously on boot (User data, Followed companies, Project counts, Roadmap status).',
      'Building a seamless visual transitions pipeline across all system interactions by standardizing UI responses, displaying beautiful skeleton placeholders during data fetching, and handling toast alert feedback configurations globally.',
    ],
  },

];

const founderCards = [
  {
    title: 'THE 2 AM INFERENCE BOTTLENECK',
    num: '01',
    subtitle: 'IIT Gandhinagar',
    description: 'During live testing, our AI engine started choking transition times and stalling the interface.\n\nWith hours left, I decoupled the heavy blocking AI logic from the main application thread and routed requests to high-speed inference endpoints, dropping phase latency to sub-second speeds before the final demo presentation.',
    bg: 'bg-accent-teal',
    text: 'text-[#1A1A1A]',
    customLogo: iitgLogo,
    logoSize: 'w-16 h-16',
  },
  {
    title: 'THE DEPLOYMENT HANDSHAKE CRUNCH',
    num: '02',
    subtitle: 'Parul University',
    description: 'Our full-stack prototype compiled perfectly on localhost but broke completely on the live staging server due to hidden CORS errors and broken environment configurations an hour before judging.\n\nRe-routed the backend authentication headers and patched the server-side proxy on the fly to rescue the live submission.',
    bg: 'bg-accent-orange',
    text: 'text-white',
    customLogo: puLogo,
    logoSize: 'w-24 h-24 scale-125',
  },
  {
    title: 'THE TOKEN OVERFLOW EXCEPTION',
    num: '03',
    subtitle: 'Outskill Speed Build',
    description: 'Ran into repeated API crashes during rapid prototyping because unstructured, multi-line inputs were exceeding the model\'s token context thresholds.\n\nQuickly built a client-side keyword tokenization script to clean, filter, and condense raw payloads before dispatching them to the cloud engine.',
    bg: 'bg-bg-light',
    text: 'text-[#1A1A1A]',
    customLogo: puLogo,
    logoSize: 'w-24 h-24 scale-125',
  },
];

function CardIcon({ card, index }) {
  const isDarkText = card?.text?.includes('#1A1A1A');

  if (card?.customLogo) {
    const sizeClass = card.logoSize || 'w-14 h-14';
    return (
      <div className="opacity-70 shrink-0 flex items-center justify-center">
        <img
          src={card.customLogo}
          alt="Sprint Logo"
          className={`${sizeClass} object-contain grayscale ${isDarkText ? 'brightness-0' : 'brightness-200'}`}
        />
      </div>
    );
  }

  const useSkillScale = index < 4;
  const logoSrc = useSkillScale ? skillScaleLogo : cubeLogo;

  const filterClass = useSkillScale
    ? (isDarkText ? 'brightness-0' : 'brightness-200')
    : (isDarkText ? '' : 'invert');

  return (
    <div className="opacity-40 shrink-0">
      <img
        src={logoSrc}
        alt="Card Icon Logo"
        className={`w-14 h-14 object-contain ${filterClass}`}
      />
    </div>
  );
}

/* ── Popover overlay with prev/next navigation arrows ── */
function CardPopover({ card, cards, currentIndex, onClose, onNavigate }) {
  const { setCursorHover, setCursorDefault } = useCursor();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if ((e.key === 'ArrowLeft' || e.key === '<' || e.key === ',') && currentIndex > 0) {
        onNavigate(currentIndex - 1);
      } else if ((e.key === 'ArrowRight' || e.key === '>' || e.key === '.') && currentIndex < cards.length - 1) {
        onNavigate(currentIndex + 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [currentIndex, cards.length, onClose, onNavigate]);

  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < cards.length - 1;

  const navButtonStyle = {
    background: 'transparent',
    border: '1px solid rgba(255,255,255,0.25)',
    color: 'rgba(255,255,255,0.6)',
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'none',
    transition: 'all 0.25s ease',
    fontFamily: "'Space Mono', monospace",
    fontSize: '18px',
    lineHeight: 1,
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-10 bg-black/85 backdrop-blur-md cursor-none"
      onClick={onClose}
    >
      {/* ◀ Left arrow button with hover tooltip */}
      {hasPrev && (
        <div
          className="group relative"
          style={{
            position: 'fixed',
            left: '24px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10000,
          }}
        >
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-300 pointer-events-none whitespace-nowrap font-mono text-[10px] uppercase tracking-wider bg-black/90 text-white/70 px-3 py-1.5 rounded-md border border-white/20 shadow-xl backdrop-blur-md text-center leading-tight">
            <div>press &lt;</div>
            <div>on keyboard</div>
          </div>
          <button
            style={navButtonStyle}
            onClick={(e) => { e.stopPropagation(); onNavigate(currentIndex - 1); }}
            onMouseEnter={(e) => {
              setCursorHover();
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)';
              e.currentTarget.style.color = 'rgba(255,255,255,0.95)';
            }}
            onMouseLeave={(e) => {
              setCursorDefault();
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)';
              e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
            }}
            aria-label="Previous project"
          >
            ‹
          </button>
        </div>
      )}

      {/* ▶ Right arrow button with hover tooltip */}
      {hasNext && (
        <div
          className="group relative"
          style={{
            position: 'fixed',
            right: '24px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10000,
          }}
        >
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-300 pointer-events-none whitespace-nowrap font-mono text-[10px] uppercase tracking-wider bg-black/90 text-white/70 px-3 py-1.5 rounded-md border border-white/20 shadow-xl backdrop-blur-md text-center leading-tight">
            <div>press &gt;</div>
            <div>on keyboard</div>
          </div>
          <button
            style={navButtonStyle}
            onClick={(e) => { e.stopPropagation(); onNavigate(currentIndex + 1); }}
            onMouseEnter={(e) => {
              setCursorHover();
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)';
              e.currentTarget.style.color = 'rgba(255,255,255,0.95)';
            }}
            onMouseLeave={(e) => {
              setCursorDefault();
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)';
              e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
            }}
            aria-label="Next project"
          >
            ›
          </button>
        </div>
      )}

      {/* Popover body */}
      <div
        className={`relative w-full max-w-4xl ${card.bg} ${card.text} border border-current/15 rounded-card p-8 md:p-12 max-h-[85vh] overflow-y-auto flex flex-col justify-between cursor-none`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          onMouseEnter={setCursorHover}
          onMouseLeave={setCursorDefault}
          className="absolute top-6 right-6 font-mono text-xs uppercase tracking-widest hover:bg-current/10 px-3 py-1.5 rounded cursor-none transition-colors"
        >
          [ CLOSE ]
        </button>
        {/* Header inside popover */}
        <div className="mb-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] opacity-75">
            PROJECT DETAILS / {card.num}
          </span>
          <h2 className="font-heading text-2xl md:text-3xl font-bold uppercase tracking-tight mt-2 leading-tight pr-12">
            {card.title}
          </h2>
        </div>
        {/* Popover Content */}
        <div className="grid grid-cols-1 gap-8 mt-6 border-t border-current/15 pt-8">
          {card.architecturalDepth && (
            <div>
              <h4 className="font-heading text-base md:text-lg font-bold uppercase tracking-wide mb-4">
                The Architectural Depth
              </h4>
              <ul className="space-y-2 font-mono text-[11px] md:text-xs leading-relaxed opacity-90">
                {card.architecturalDepth.map((point, idx) => (
                  <li key={idx} className="flex gap-2 items-start">
                    <span className="font-bold mt-0.5 select-none shrink-0">→</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {card.technicalComplexity && (
            <div>
              <h4 className="font-heading text-base md:text-lg font-bold uppercase tracking-wide mb-4">
                The Technical Complexity &amp; Challenges
              </h4>
              <ul className="space-y-2 font-mono text-[11px] md:text-xs leading-relaxed opacity-90">
                {card.technicalComplexity.map((point, idx) => (
                  <li key={idx} className="flex gap-2 items-start">
                    <span className="font-bold mt-0.5 select-none shrink-0">→</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}

function SplitCard({ card, index, onOpenPopover }) {
  const { setCursorHover, setCursorDefault } = useCursor();

  const openPopover = () => {
    onOpenPopover(index);
  };

  if (card.image) {
    return (
      <div className={`scroll-card ${card.bg} ${card.text} p-8 md:p-10 rounded-card flex flex-col justify-between min-h-[60vh] md:min-h-[85vh] relative`}>
        {/* Top: heading and logo */}
        <div className="flex justify-between items-start gap-4 mb-4">
          <h3 className="font-heading text-[clamp(1.2rem,2.2vw,1.8rem)] font-bold uppercase leading-tight max-w-[80%]">
            {card.title}
          </h3>
          <CardIcon card={card} index={index} />
        </div>
        {/* Clickable Image */}
        <div
          onClick={openPopover}
          onMouseEnter={setCursorHover}
          onMouseLeave={setCursorDefault}
          className=" mx-auto overflow-hidden rounded-[8px] cursor-none aspect-[16/9] w-full max-w-md flex items-center justify-center bg-black/10 relative group"
        >
          <img
            src={card.image}
            alt={card.title}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
          {/* Overlay hint on image hover */}
          <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="font-mono text-[10px] text-white bg-black/80 px-3 py-1.5 rounded uppercase tracking-wider">
              View ⬈
            </span>
          </div>
        </div>
        {/* Paragraph (Action-Oriented Bullet Points) */}
        <div className="flex-1 flex flex-col justify-center my-3">
          {card.bullets ? (
            <ul className="space-y-4 font-mono text-[11px] md:text-[12px] leading-relaxed opacity-90">
              {card.bullets.map((bullet, i) => (
                <li key={i} className="flex gap-2 items-start">
                  <span className="text-current font-bold mt-0.5 select-none">→</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="font-heading text-sm md:text-base leading-relaxed opacity-85 whitespace-pre-line">
              {card.description}
            </p>
          )}
        </div>
        {/* Bottom border + number + full screen button */}
        <div className="flex justify-between items-center border-t border-current/20 pt-4 mt-2">
          <span className="font-mono text-[11px] tracking-[0.15em]">{card.num}</span>
          {card.fullScreenIcon && (
            <button
              onClick={openPopover}
              onMouseEnter={setCursorHover}
              onMouseLeave={setCursorDefault}
              className="w-10 h-10 flex items-center justify-center bg-transparent hover:scale-110 active:scale-95 transition-transform duration-200 cursor-none rounded-full border border-current/15 text-current"
              aria-label="Open fullscreen details"
            >
              {/* Inline SVG replaces the <img> tag entirely */}
              <svg
                xmlns="http://w3.org"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5 opacity-80 hover:opacity-100 transition-opacity"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75v4.5m0-4.5h-4.5m4.5 0L15 9m5.25 11.25v-4.5m0 4.5h-4.5m4.5 0L15 15" />
              </svg>
            </button>
          )}
        </div>

      </div>
    );
  }

  return (
    <div className={`scroll-card ${card.bg} ${card.text} p-8 md:p-12 rounded-card flex flex-col justify-between min-h-[50vh] md:min-h-[80vh]`}>
      <div className="flex justify-between items-start gap-4">
        <h3 className="font-heading text-[clamp(1.3rem,2.5vw,2rem)] font-bold uppercase leading-tight max-w-[70%]">
          {card.title}
        </h3>
        <CardIcon card={card} index={index} />
      </div>
      <div className="flex-1 flex flex-col justify-start mt-16">
        <p className="font-heading text-base md:text-lg leading-relaxed opacity-85 whitespace-pre-line">
          {card.description}
        </p>
      </div>
      <div className="flex justify-between items-center pt-2">
        <span className="font-mono text-[11px] tracking-[0.15em]">{card.num}</span>
      </div>
    </div>
  );
}

export default function SplitScreen() {
  const sectionRef = useRef(null);
  const { setCursorHover, setCursorDefault } = useCursor();

  // Popover state lifted to parent: index of the open card (-1 = closed)
  const [activePopoverIndex, setActivePopoverIndex] = useState(-1);
  // "Show more" state for investor cards
  const INITIAL_VISIBLE = 3;
  const [showAll, setShowAll] = useState(false);

  const visibleInvestorCards = showAll
    ? investorCards
    : investorCards.slice(0, INITIAL_VISIBLE);
  const hasMore = investorCards.length > INITIAL_VISIBLE;

  const openPopover = (index) => {
    setActivePopoverIndex(index);
    setCursorDefault();
  };
  const closePopover = () => {
    setActivePopoverIndex(-1);
    setCursorDefault();
  };
  const navigatePopover = (index) => {
    setActivePopoverIndex(index);
  };

  useEffect(() => {
    const mm = gsap.matchMedia();

    // Card scroll-in animations only — pinning is handled by CSS sticky
    mm.add('(min-width: 768px)', () => {
      sectionRef.current?.querySelectorAll('.scroll-card').forEach((card) => {
        gsap.fromTo(card, { y: 60, opacity: 0 }, {
          y: 0, opacity: 1,
          scrollTrigger: { trigger: card, start: 'top 85%', end: 'top 50%', scrub: 1 },
        });
      });
    });

    mm.add('(max-width: 767px)', () => {
      sectionRef.current?.querySelectorAll('.scroll-card').forEach((card) => {
        gsap.fromTo(card, { y: 40, opacity: 0 }, {
          y: 0, opacity: 1,
          scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none reverse' },
        });
      });
    });

    return () => mm.revert();
  }, [showAll]); // re-run when cards expand so new cards animate in

  return (
    <section id="caseStudies" ref={sectionRef} className="section-content">
      {/* === INVESTORS === */}
      <div id="investor-section" className="relative grid grid-cols-1 md:grid-cols-2 min-h-[250vh]">
        {/* Sticky left panel — CSS sticky, grid-aware, never jumps */}
        <div className="bg-bg-dark flex flex-col justify-center px-8 md:px-16 py-20 md:py-0 self-start md:sticky md:top-0 md:h-screen">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent-teal mb-6">
            FEATURED WORK
          </p>
          <h2 className="font-heading text-[clamp(2rem,4vw,4rem)] font-bold text-white leading-[0.98] uppercase mb-6">
            DISCOVER<br />MY HIGHEST<br />IMPACT RESULTS.
          </h2>
          <div className="w-[450px] h-[1px] bg-white/20 mb-6" />
          <p className="font-mono text-[11px] text-text-off-white leading-relaxed max-w-sm uppercase tracking-wide mb-8">
            EXAMINE MY TOP ENGINEERING WORKS AND DIVE INTO MY CUSTOM MICROSERVICES, RUNTIME SANDBOXES, AND LOW-LATENCY DATA PIPELINES.
          </p>
          <BracketButton onClick={() => openPopover(0)}>ARCHITECTURE OVERVIEW</BracketButton>
        </div>

        {/* Scrolling cards right */}
        <div className="flex flex-col gap-6 p-6 md:p-8 justify-center">
          {visibleInvestorCards.map((card, i) => (
            <SplitCard key={i} card={card} index={i} onOpenPopover={openPopover} />
          ))}
          {/* "more" button */}
          {hasMore && !showAll && (
            <button
              onClick={() => setShowAll(true)}
              onMouseEnter={setCursorHover}
              onMouseLeave={setCursorDefault}
              className="cursor-none self-center font-mono text-[12px] uppercase tracking-[0.25em] mt-2 mb-4 transition-opacity duration-300 hover:opacity-60"
              style={{ color: 'rgba(255, 255, 255, 0.4)' }}
            >
              more
            </button>
          )}
        </div>
      </div>

      {/* Popover rendered once, controlled by parent state */}
      {activePopoverIndex >= 0 && activePopoverIndex < investorCards.length && (
        <CardPopover
          card={investorCards[activePopoverIndex]}
          cards={investorCards}
          currentIndex={activePopoverIndex}
          onClose={closePopover}
          onNavigate={navigatePopover}
        />
      )}

      {/* === LIVE SPRINTS === */}
      {/* DOM order: cards first (left col), sticky panel second (right col) */}
      <div id="founder-section" className="relative grid grid-cols-1 md:grid-cols-2 min-h-[250vh]">
        {/* Scrolling cards — left column on desktop */}
        <div className="flex flex-col gap-6 p-6 md:p-8 justify-center">
          {founderCards.map((card, i) => (
            <SplitCard key={i} card={card} index={i} onOpenPopover={() => { }} />
          ))}
        </div>

        {/* Sticky right panel */}
        <div className="bg-bg-dark flex flex-col justify-center px-8 md:px-16 py-20 md:py-0 self-start md:sticky md:top-0 md:h-screen">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent-teal mb-6">
            LIVE SPRINTS
          </p>
          <h2 className="font-heading text-[clamp(2rem,4vw,4rem)] font-bold text-white leading-[0.98] uppercase mb-6">
            PRESSURE PROVEN,<br />RELIABLE in<br />fast-paced environments.
          </h2>
          <div className="w-12 h-[1px] bg-white/20 mb-6" />
          <p className="font-mono text-[11px] text-text-off-white leading-relaxed max-w-sm uppercase tracking-wide mb-8">
            HACKATHONS ARE MESSY. HERE IS HOW I NAVIGATE API THROTTLING, HANDSHAKE FAILURES, AND LAST-MINUTE CODING EMERGENCIES WHEN THE CLOCK HITS ZERO.
          </p>
          <BracketButton href="https://www.linkedin.com/in/ramansahu/">View Linkedin</BracketButton>
        </div>
      </div>
    </section>
  );
}
