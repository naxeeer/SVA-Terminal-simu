# Student Verification Assistant (SVA) Terminal Simulation

A modern, interactive simulation of a Student Verification Assistant terminal designed for examination identity verification. This simulation demonstrates the complete workflow of student verification during examinations.

## Features

### 🎯 Complete Verification Workflow
- **Face Scanning Simulation**: Animated face recognition with progress indicators
- **Student Information Display**: Shows student details including name, ID, class, department, faculty, and registered courses
- **Course Registration Verification**: Checks if the student is registered for the current examination
- **Fingerprint Verification**: Simulated fingerprint scanning with visual feedback
- **Approval/Rejection Flow**: Clear indication of verification results with appropriate actions

### 🎨 Modern UI Design
- Clean, professional interface suitable for kiosk mode
- Responsive design with smooth animations and transitions
- Color-coded feedback (green for success, red for errors, yellow for warnings)
- Progress indicators for scanning operations
- Modern icons and typography

### 🔄 Automated Workflow
- Auto-reset functionality after successful verification
- Continuous loop for processing multiple students
- Error handling with clear instructions for resolution
- Timeout and retry mechanisms

### 📊 Mock Data System
- Pre-populated student database with realistic information
- Current examination details
- Randomized verification results for demonstration

## Technology Stack

- **Frontend**: React 18 with modern hooks
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui component library
- **Icons**: Lucide React icons
- **Build Tool**: Vite
- **Package Manager**: pnpm

## Project Structure

```
sva-terminal-simulation/
├── src/
│   ├── components/
│   │   ├── ui/              # shadcn/ui components
│   │   └── SVATerminal.jsx  # Main terminal component
│   ├── data/
│   │   └── mockData.js      # Mock student and exam data
│   ├── App.jsx              # Root application component
│   ├── App.css              # Global styles
│   └── main.jsx             # Application entry point
├── public/                  # Static assets
├── package.json             # Dependencies and scripts
└── README.md               # This file
```

## Mock Data

The simulation includes:
- **5 Students** with varying course registrations
- **Current Exam**: Advanced Database Systems (CSC401)
- **Randomized Results**: Face recognition and fingerprint verification with realistic success/failure rates

### Sample Students:
- John Doe (STU001) - Computer Science 400L - Registered for CSC401
- Jane Smith (STU002) - Computer Science 300L - Not registered for CSC401
- Michael Johnson (STU003) - Computer Science 400L - Registered for CSC401
- Sarah Williams (STU004) - Information Technology 300L - Registered for CSC401
- David Brown (STU005) - Computer Science 200L - Not registered for CSC401

## Workflow Demonstration

1. **Welcome Screen**: Shows current examination details and instructions
2. **Face Scanning**: Animated scanning with progress bar (2-second simulation)
3. **Student Identification**: Displays recognized student information
4. **Course Verification**: Checks registration for current exam
5. **Fingerprint Prompt**: Requests fingerprint verification if course registration is valid
6. **Fingerprint Scanning**: Animated fingerprint verification (1.5-second simulation)
7. **Result Display**: Shows approval or rejection with detailed information
8. **Auto-Reset**: Returns to welcome screen after 5 seconds for next student

## Error Handling

The simulation handles various error scenarios:
- **Unrecognized Face**: Shows error message with retry option
- **Course Registration Failure**: Indicates student is not registered for the current exam
- **Fingerprint Verification Failure**: Prompts for retry or administrator contact
- **System Errors**: Graceful error handling with user-friendly messages

## Kiosk Mode Features

- **Full-screen friendly design**
- **Large, touch-friendly buttons**
- **Clear visual hierarchy**
- **Automatic timeouts and resets**
- **Minimal user interaction required**
- **Professional appearance suitable for institutional use**

## Development

### Prerequisites
- Node.js 18+ 
- pnpm (or npm/yarn)

### Installation
```bash
cd sva-terminal-simulation
pnpm install
```

### Development Server
```bash
pnpm run dev
```

### Build for Production
```bash
pnpm run build
```

## Deployment Considerations

For actual deployment on Raspberry Pi 4:
- Optimize for touch screen interfaces
- Configure kiosk mode in the browser
- Set up auto-start on boot
- Implement actual biometric hardware integration
- Add database connectivity for real student data
- Include logging and audit trail functionality

## Future Enhancements

- **Admin Panel**: Interface for managing student data and exam schedules
- **Real Biometric Integration**: Connect to actual face recognition and fingerprint hardware
- **Database Integration**: Replace mock data with real database connectivity
- **Audit Logging**: Track all verification attempts and results
- **Multi-language Support**: Support for multiple languages
- **Accessibility Features**: Enhanced accessibility for users with disabilities

---

**Note**: This is a simulation for demonstration purposes. For production use, integrate with actual biometric hardware and secure database systems.

