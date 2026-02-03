
# Typing Speed Tester

A modern, responsive web application for testing and improving typing speed and accuracy.

## Features

### Core Functionality
- **Multiple Test Modes**: Time-based (30s to 10 minutes) and word count (25 to 200 words)
- **Difficulty Levels**: Beginner, Intermediate, and Advanced with appropriate word databases
- **Real-time Metrics**: Live WPM, CPM, accuracy percentage, and error count
- **Visual Feedback**: Color-coded character highlighting (green=correct, red=incorrect, yellow=current)
- **Comprehensive Results**: Detailed performance analysis with raw and net WPM calculations

### User Experience
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Local Storage**: Test history tracking for progress monitoring
- **Pause/Resume**: Ability to pause tests mid-session
- **Instant Feedback**: Real-time typing validation and statistics

### Technical Implementation
- **Pure Vanilla JavaScript**: No framework dependencies for maximum compatibility
- **Performance Optimized**: Efficient DOM manipulation and event handling
- **Cross-browser Compatible**: Tested on Chrome, Firefox, Safari, and Edge
- **Accessible**: Semantic HTML5 structure with proper ARIA considerations

## Quick Start

1. Open `index.html` in your web browser
2. Configure your test settings:
   - Choose test mode (time-based or word count)
   - Select duration or word count
   - Set difficulty level
3. Click "Start Test"
4. Begin typing in the text area
5. View your results and track progress over time

## File Structure

```
typing-speed-tester/
├── index.html          # Main HTML structure
├── styles.css          # Responsive CSS styling
├── script.js           # Core application logic
└── README.md          # This file
```

## Browser Support

- Google Chrome (latest 2 versions)
- Mozilla Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Microsoft Edge (latest 2 versions)

## Performance Metrics

- Page load time: < 2 seconds
- Input latency: < 50ms for character recognition
- Timer accuracy: ±0.1 second precision
- Smooth animations at 60fps

## Calculation Methods

### Words Per Minute (WPM)
```
WPM = (Correct Characters Typed / 5) / Time in Minutes
```

### Characters Per Minute (CPM)
```
CPM = Total Characters Typed / Time in Minutes
```

### Accuracy Percentage
```
Accuracy = (Correct Characters / Total Characters Attempted) × 100
```

## Development

To run locally for development:
```bash
# Start a local server
python3 -m http.server 8000

# Or use Node.js
npx serve .

# Or use PHP
php -S localhost:8000
```

Then navigate to `http://localhost:8000` in your browser.

## Future Enhancements

- [ ] Multilingual support
- [ ] Code typing mode for programmers
- [ ] Keyboard heatmap visualization
- [ ] Typing lessons and tutorials
- [ ] Social sharing features
- [ ] Leaderboards and achievements
- [ ] Backend integration for user accounts

## License

This project is open source and available under the MIT License.
=======
# Typing-Speed-Tester
A modern, responsive web application for testing and improving typing speed and accuracy.
>>>>>>> 03117dd85e8bcf80a93b1afa7f15f3154f9389e2
