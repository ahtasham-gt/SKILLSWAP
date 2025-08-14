# SkillSwap 🔄

A modern web application for skill swapping and learning, built with React, Redux, and modern web technologies.

## Features ✨

- **User Authentication**: Secure login system with demo account
- **Skill Management**: Add, browse, and manage skills with categories and levels
- **Skill Swapping**: Request and manage skill swaps with other users
- **Advanced Filtering**: Search and filter skills by category, level, and location
- **Responsive Design**: Beautiful UI that works on all devices
- **Real-time Notifications**: Toast notifications for user feedback
- **Modern UI/UX**: Clean, intuitive interface with smooth animations

## Tech Stack 🛠️

- **Frontend**: React 18 with Hooks
- **State Management**: Redux Toolkit
- **Routing**: React Router DOM
- **Styling**: CSS3 with CSS Custom Properties
- **Build Tool**: Create React App
- **Icons**: Emoji and SVG icons
- **UI Components**: Custom-built components with modern design

## Getting Started 🚀

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd skillswap
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Demo Account

For testing purposes, you can use the demo account:
- **Email**: demo@skillswap.com
- **Password**: demo123

## Project Structure 📁

```
src/
├── components/          # Reusable UI components
│   ├── layout/         # Layout components (Header, Footer, Sidebar)
│   ├── skills/         # Skill-related components
│   ├── swaps/          # Swap-related components
│   └── ui/             # UI components (Notifications, etc.)
├── pages/              # Page components
├── store/              # Redux store and slices
│   └── slices/         # Redux Toolkit slices
├── App.js              # Main app component
└── index.js            # Entry point
```

## Key Features 🔑

### Authentication
- User login with email/password
- Persistent session with localStorage
- Protected routes for authenticated users

### Skills Management
- Browse skills with advanced filtering
- Add new skills with categories and tags
- Skill cards with user information and levels

### Skill Swapping
- Request skill swaps with other users
- Accept/decline swap requests
- Track swap status and history

### User Interface
- Responsive design for all screen sizes
- Modern CSS with custom properties
- Smooth animations and transitions
- Toast notifications for user feedback

## Available Scripts 📜

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App

## Contributing 🤝

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License 📄

This project is licensed under the MIT License.

## Acknowledgments 🙏

- Built with React and Redux Toolkit
- Icons from Emoji and custom SVG
- UI inspiration from modern design systems
- Color scheme inspired by modern web applications 