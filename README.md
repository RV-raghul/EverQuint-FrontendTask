# Team Workflow Board

A simplified Kanban-style task management app built with React and JavaScript.
Inspired by tools like Trello and Jira.

## 🚀 Getting Started

## 🔑 Key Decisions

### JavaScript over TypeScript
The task specified TypeScript but I am currently in the process of learning TypeScript and have not yet fully grasped the complete syntax. To keep the focus on architecture, component design and logic rather than struggling with type definitions, I chose to use JavaScript for this task. All data shapes are well defined and consistent across `constants.js` and `helpers.js`, which demonstrates the same structural thinking that TypeScript enforces. Given more time, migrating this codebase to TypeScript would be a straightforward next step.

### Drag and Drop
Used `@dnd-kit` over `react-beautiful-dnd` because:
- `react-beautiful-dnd` is unmaintained
- `@dnd-kit` is lighter, accessible and has a simpler API

### No Drag and Drop between same column reordering
Kept it simple — dragging only changes task status (column).
Reordering within a column was skipped to keep the logic clean
and easy to explain. 

### URL-based Filters
Filters are stored in the URL query string using React Router's
`useSearchParams`. This means filters are shareable and survive
page refresh.

### LocalStorage with Migration
Tasks are stored in localStorage with a `schemaVersion` field.
When the app detects an older schema version it automatically
migrates the data and shows a toast notification to the user.

### Prerequisites
- Node.js v20.19+ or v22.12+
- npm

### Installation
```bash
git clone https://github.com/RV-raghul/EverQuint-FrontendTask.git
cd EverQuint-FrontendTask
npm install
npm run dev
```

Open your browser at `http://localhost:5173`

### Running Tests
```bash
npm run test
```

---

## 🏗️ Architecture Overview

### Tech Stack

| Tool | Purpose |
|------|---------|
| React 19 | UI framework |
| JavaScript (ES6+) | Language (task specified TS, using JS for simplicity) |
| Vite 8 | Build tool |
| Tailwind CSS v4 | Styling |
| @dnd-kit | Drag and drop |
| React Router v7 | URL-based filter sync |
| date-fns | Relative timestamps |
| Vitest + RTL | Testing |

### Folder Structure
```
src/
├── components/
│   └── ui/               # Reusable UI components
│       ├── Button.jsx
│       ├── TextInput.jsx
│       ├── TextArea.jsx
│       ├── Select.jsx
│       ├── Tag.jsx
│       ├── Card.jsx
│       ├── Modal.jsx
│       └── Toast.jsx
├── features/
│   └── board/            # Board feature components
│       ├── BoardView.jsx
│       ├── BoardColumn.jsx
│       ├── TaskCard.jsx
│       ├── TaskModal.jsx
│       └── TaskForm.jsx
├── hooks/                # Custom hooks
│   ├── useFilters.js
│   └── useTaskForm.js
├── store/                # Global state
│   └── TaskContext.jsx
├── utils/                # Utilities
│   ├── constants.js
│   ├── helpers.js
│   └── migration.js
├── tests/                # Tests
│   ├── setup.js
│   ├── Button.test.jsx
│   ├── helpers.test.js
│   └── useTaskForm.test.js
├── App.jsx
└── main.jsx
```

### State Management

Used **React Context + useReducer** instead of Zustand or Redux because:
- The app state is simple — just a list of tasks
- No need for middleware or complex side effects
- No extra dependencies

---

## ⚠️ Known Limitations & Trade-offs

- **No TypeScript** — used JavaScript instead as noted above
- **No backend** — data is stored in localStorage only
- **No user authentication** — single user app
- **No drag reordering within columns** — only cross-column dragging
- **No pagination** — all tasks rendered at once

---

## 🤖 AI Assistance

Some topics and logic were discussed with Claude (Anthropic) for better
understanding of the task requirements and to produce a better output.

- **Discussed for understanding**: Drag and drop concepts with @dnd-kit,
  localStorage migration strategy, URL-based filter sync with useSearchParams,
  and React Context + useReducer pattern
- **All code written and decisions made independently**: Separated `TaskForm`
  from `TaskModal` for better separation of concerns, added dedicated drag
  handle in `TaskCard`, improved `useFilters` with `useMemo` and stable
  dependency key, added `isLoaded` flag in `TaskContext` to prevent saving
  empty state on mount
---

## 📝 What I'd Do Next

- Add TypeScript (After Learning)
- Add due dates to tasks
- Add unit tests for TaskContext
- Add a backend with a REST API