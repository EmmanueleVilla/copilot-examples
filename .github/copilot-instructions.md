# GitHub Copilot Instructions

## Project Overview

This is a **React + Vite** demonstration project showcasing GitHub Copilot's core capabilities through interactive examples. The project is designed as a live demonstration scaffold where each component highlights a specific Copilot feature.

## Technology Stack

- **React 18** - UI library
- **Vite** - Build tool with HMR
- **ESLint** - Code linting
- **NASA API** - Used in the APOD fetcher example
- **ES6+** - Modern JavaScript features

## Project Structure

```
src/
├── components/          # React components demonstrating Copilot features
│   ├── EmailValidator.jsx    # Completions example
│   ├── CsvParser.jsx         # FixMe example
│   ├── MergeSort.jsx         # Explain example
│   ├── ProcessNumbers.jsx    # Refactor example
│   └── ApodFetcher.jsx       # Agentic coding example
├── App.jsx             # Main application component
├── main.jsx            # Application entry point
└── App.css             # Application styles
```

## Coding Conventions

### React Components

- Use functional components with hooks
- Follow the existing component structure with consistent sections:
  - Import statements
  - Helper functions or algorithms (these may be incomplete for demo purposes)
  - Component definition with state management
  - Return statement with JSX
- Each component should be self-contained in a `<section>` with class `card`

### Styling

- Use existing CSS classes defined in `App.css`
- Common classes: `card`, `card-header`, `card-title`, `eyebrow`, `form`, `input`, `button`, `status`
- Maintain consistent visual styling across components

### State Management

- Use React's built-in `useState` hook for component-level state
- Keep state local to components unless there's a clear need for lifting state up

### Form Handling

- Use controlled components for form inputs
- Prevent default form submission behavior with `event.preventDefault()`
- Provide meaningful status messages for user actions

## Important Notes for Development

### Demo Nature

This is a **demonstration project** - some functions are intentionally incomplete or buggy to showcase Copilot's features:

- **EmailValidator.jsx**: `validateEmail()` function is empty (for Completions demo)
- **CsvParser.jsx**: Contains intentional bugs (for FixMe demo)
- **MergeSort.jsx**: Complex algorithm (for Explain demo)
- **ProcessNumbers.jsx**: Legacy code (for Refactor demo)
- **ApodFetcher.jsx**: More complex implementation (for Agentic coding demo)

When working on these files:
- Preserve the demonstration nature unless explicitly asked to complete implementations
- Maintain code comments that indicate the demo purpose
- Keep the user-facing instructions and descriptions intact

### Build and Test Commands

```bash
npm install      # Install dependencies
npm run dev      # Start development server
npm run build    # Build for production
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

### Code Quality

- Run `npm run lint` before committing changes
- Fix any ESLint errors or warnings
- Ensure the dev server runs without errors
- Test any changes in the browser during development

### API Usage

The `ApodFetcher.jsx` component uses NASA's APOD API:
- No API key required for basic usage
- Rate limited to a few requests per hour
- Handle errors gracefully with user-friendly messages

## Best Practices

1. **Maintain Simplicity**: This is a demo project - keep implementations straightforward and easy to understand
2. **Preserve Educational Value**: Don't over-optimize code that's meant to demonstrate Copilot features
3. **Keep It Interactive**: Ensure all examples remain interactive and functional in the browser
4. **Documentation**: Update README.md if adding new demonstration features
5. **Consistency**: Follow existing patterns for new components or features

## When Adding New Features

If adding new Copilot demonstration features:
1. Create a new component in `src/components/`
2. Import and include it in `App.jsx`
3. Follow the existing card-based layout structure
4. Add an entry to the README.md table of features
5. Include clear labels (like "Example: [feature-name]") in the UI
6. Provide instructions within the component about what to demonstrate

## Dependencies

- Only add new dependencies if absolutely necessary
- Prefer using built-in React and browser APIs
- Keep the bundle size small for fast demonstration loading
- Document any new dependencies in package.json and this file
