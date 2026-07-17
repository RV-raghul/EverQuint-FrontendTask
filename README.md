# Team Workflow Board

A simplified Kanban-style task management app built with React and TypeScript.
Inspired by tools like Trello and Jira.

## LOOM VIDEO LINK
https://www.loom.com/share/a29bdcff65874c31bfd6155da3d8c1d0

## NETLIFY DEPLOYED LINK 
https://ravi-raghul-team-workflow-board.netlify.app/


## 🚀 Getting Started

## 🔑 Key Decisions

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
| TypeScript 7 | Language |
| Vite 8 | Build tool |
| Tailwind CSS v4 | Styling |
| @dnd-kit | Drag and drop |
| React Router v7 | URL-based filter sync |
| date-fns | Relative timestamps |
| Vitest + React Testing Library (RTL) | Testing |


### Folder Structure
```
src/
├── components/
│   └── ui/               # Reusable UI components
│       ├── Button.tsx
│       ├── TextInput.tsx
│       ├── TextArea.tsx
│       ├── Select.tsx
│       ├── Tag.tsx
│       ├── Card.tsx
│       ├── Modal.tsx
│       ├── Toast.tsx
│       └── index.ts
├── features/
│   └── board/            # Board feature components
│       ├── BoardView.tsx
│       ├── BoardColumn.tsx
│       ├── TaskCard.tsx
│       ├── FilterBar.tsx
│       ├── TaskModal.tsx
│       └── TaskForm.tsx
├── hooks/                # Custom hooks
│   ├── useFilters.ts
│   └── useTaskForm.ts
├── store/                # Global state
│   └── TaskContext.tsx
├── types/
│   └── task.ts
├── utils/                # Utilities
│   ├── constants.ts
│   ├── helpers.ts
│   └── migration.ts
├── tests/                # Tests (unchanged for now)
│   ├── setup.js
│   ├── Button.test.jsx
│   ├── helpers.test.js
│   └── useTaskForm.test.js
├── App.tsx
└── main.tsx


```

### State Management

Used **React Context + useReducer** instead of Zustand or Redux because:
- The app state is simple — just a list of tasks
- No extra dependencies

---

## ⚠️ Known Limitations & Trade-offs

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

