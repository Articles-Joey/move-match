

const patternAdjectives = [
    'Clever', 'Logical', 'Swift', 'Sharp', 'Crafty', 'Witty', 'Brilliant', 'Curious',
    'Insightful', 'Creative', 'Bold', 'Dynamic', 'Intuitive', 'Strategic', 'Inventive',
    'Agile', 'Resourceful', 'Tactical', 'Analytical', 'Ingenious', 'Quick', 'Steady',
    'Persistent', 'Patient', 'Focused', 'Adaptive', 'Skillful', 'Resolute', 'Astute', 'Methodical'
];

const patternNouns = [
    'Solver', 'Matcher', 'Patternist', 'Strategist', 'Thinker', 'Cracker', 'Puzzler', 'Seeker',
    'Analyzer', 'Planner', 'Designer', 'Arranger', 'Fixer', 'Coder', 'Mapper', 'Linker',
    'Connector', 'Aligner', 'Organizer', 'Decoder', 'Synthesizer', 'Explorer', 'Tiler', 'Matcher',
    'Sequencer', 'Composer', 'SolverBot', 'Logicist', 'Arranger', 'Patterneer'
];



/**
 * Generates a random pattern/solving-themed nickname.
 * @returns {string} A random nickname like "CleverSolver42" or "SwiftMatcher7".
 */
const generateRandomNickname = () => {
    const adj = patternAdjectives[Math.floor(Math.random() * patternAdjectives.length)];
    const noun = patternNouns[Math.floor(Math.random() * patternNouns.length)];
    const num = Math.floor(Math.random() * 100);
    return `${adj}${noun}${num}`;
};

export default generateRandomNickname;