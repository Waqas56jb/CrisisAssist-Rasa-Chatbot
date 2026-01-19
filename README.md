# CrisisAssist - Emergency Response Chatbot Frontend

A comprehensive React.js frontend application for the Crisis-Response Conversational Agent, designed to assist citizens during natural disasters and emergencies.

## Features

### Core Functionality
- **Crisis Intake Module**: Adaptive multi-turn questioning interface
- **Location Detection**: GPS integration and manual address input
- **Information Retrieval**: Display of emergency shelters, instructions, and verified information via carousels
- **Risk Assessment Engine**: Interactive questionnaire with visual risk level indicators
- **Human Operator Escalation**: Seamless handover with full conversation context
- **User Intent Recovery**: Quick reply buttons and fallback mechanisms

### UI/UX Features
- **Blue and White Theme**: Professional, calming color scheme
- **Crisis Icons**: Visual indicators for different emergency types
- **Safety Alerts**: Color-coded alerts (high/medium/low/info)
- **Quick Replies**: Button-based interaction for faster responses
- **Information Carousels**: Swipeable cards for shelter and location information
- **Accessibility**: Screen-reader support, keyboard navigation, ARIA labels
- **Responsive Design**: Works on desktop, tablet, and mobile devices

### Technical Features
- **React.js**: Modern React with hooks
- **Tailwind CSS**: Utility-first CSS framework
- **React Icons**: Comprehensive icon library
- **Voice Input**: Speech recognition support (browser-dependent)
- **Real-time Updates**: Live typing indicators and message updates
- **Error Handling**: Graceful error handling and user feedback

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── components/
│   ├── ChatInterface.js       # Main chat container
│   ├── MessageList.js          # Message display component
│   ├── MessageBubble.js        # Individual message bubbles
│   ├── MessageInput.js         # Input field with voice support
│   ├── LocationDetector.js     # GPS and manual location input
│   ├── CrisisTypeSelector.js   # Emergency type selection
│   ├── RiskAssessment.js       # Risk level questionnaire
│   ├── InformationCarousel.js  # Shelter/info carousel display
│   ├── SafetyInstructions.js   # Safety guidelines display
│   ├── HumanHandover.js        # Operator connection UI
│   ├── SafetyAlert.js          # Alert notifications
│   ├── QuickReplies.js         # Quick reply buttons
│   └── Header.js               # Application header
├── App.js                      # Main application component
├── App.css                     # Application styles
├── index.js                    # Entry point
└── index.css                   # Global styles with Tailwind
```

## Integration with Rasa Backend

The frontend is designed to integrate with a Rasa chatbot backend. To connect:

1. Update the API endpoint in `ChatInterface.js` (currently using simulated responses)
2. Configure the Rasa server URL
3. Implement WebSocket or REST API communication

Example integration:
```javascript
// In ChatInterface.js
const sendMessage = async (text) => {
  const response = await axios.post('http://localhost:5005/webhooks/rest/webhook', {
    sender: 'user',
    message: text
  });
  // Handle response
};
```

## Accessibility

- ARIA labels and roles throughout
- Keyboard navigation support
- Screen-reader friendly
- Focus indicators
- Semantic HTML structure

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Deployment

Build for production:
```bash
npm run build
```

The `build` folder contains the optimized production build.

## License

This project is part of an academic assignment for MSc in Artificial Intelligence.
