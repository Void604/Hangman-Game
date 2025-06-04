export const words: Record<string, string[]> = {
  easy: [
    "react", "vue", "html", "css", "code", "web", "app", "git", "node", "api",
    "data", "test", "file", "link", "user", "page", "form", "menu", "list",
    "grid", "flex", "font", "icon", "dark", "light", "blue", "card", "text",
    "type", "loop", "math", "time", "date", "path", "port", "host", "send",
    "game", "play", "save", "load", "edit", "view", "help", "info", "home"
  ],
  medium: [
    "javascript", "typescript", "database", "function", "variable", "component",
    "interface", "promise", "callback", "module", "import", "export", "class",
    "method", "object", "string", "number", "array", "state", "props", "hook",
    "effect", "router", "redux", "store", "action", "style", "theme", "build",
    "debug", "error", "stack", "queue", "tree", "graph", "sort", "search",
    "filter", "reduce", "async", "await", "fetch", "axios", "query", "param",
    "route", "model", "schema", "token", "cache", "proxy", "event", "input"
  ],
  hard: [
    "authentication", "authorization", "middleware", "dependency", "injection",
    "polymorphism", "encapsulation", "abstraction", "inheritance", "implementation",
    "asynchronous", "synchronization", "optimization", "serialization",
    "deserialization", "configuration", "architecture", "microservice",
    "orchestration", "containerization", "virtualization", "infrastructure",
    "scalability", "reliability", "availability", "maintainability",
    "observability", "idempotency", "consistency", "persistence", "transaction",
    "distributed", "concurrent", "parallel", "algorithm", "complexity",
    "recursion", "iteration", "validation", "sanitization", "encryption",
    "decryption", "compression", "decompression", "authentication", "websocket",
    "middleware", "framework", "deployment", "continuous", "integration"
  ]
};

export const getRandomWord = (difficulty: string): string => {
  const wordList = words[difficulty as keyof typeof words] || words.medium;
  return wordList[Math.floor(Math.random() * wordList.length)];
};

export const getWordHint = (word: string): string => {
  const hints = {
    // Easy words hints
    react: "A popular JavaScript library for building user interfaces",
    vue: "Progressive JavaScript framework for building UIs",
    html: "The standard markup language for web pages",
    css: "Style sheet language used for describing the presentation of a document",
    // Add more hints for other words...
  };
  
  return hints[word as keyof typeof hints] || "No hint available for this word";
};