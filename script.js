// Typing Speed Tester Application

class TypingSpeedTester {
    constructor() {
        // DOM Elements
        this.elements = {
            // Configuration
            configuration: document.getElementById('configuration'),
            testMode: document.getElementById('testMode'),
            duration: document.getElementById('duration'),
            wordCountGroup: document.getElementById('wordCountGroup'),
            wordCount: document.getElementById('wordCount'),
            difficulty: document.getElementById('difficulty'),
            startBtn: document.getElementById('startBtn'),
            
            // Test Section
            testSection: document.getElementById('testSection'),
            timerDisplay: document.getElementById('timerDisplay'),
            wpmDisplay: document.getElementById('wpmDisplay'),
            accuracyDisplay: document.getElementById('accuracyDisplay'),
            errorsDisplay: document.getElementById('errorsDisplay'),
            textDisplay: document.getElementById('textDisplay'),
            textInput: document.getElementById('textInput'),
            resetBtn: document.getElementById('resetBtn'),
            pauseBtn: document.getElementById('pauseBtn'),
            
            // Results Section
            resultsSection: document.getElementById('resultsSection'),
            finalWPM: document.getElementById('finalWPM'),
            finalAccuracy: document.getElementById('finalAccuracy'),
            finalCPM: document.getElementById('finalCPM'),
            finalErrors: document.getElementById('finalErrors'),
            totalChars: document.getElementById('totalChars'),
            correctChars: document.getElementById('correctChars'),
            timeTaken: document.getElementById('timeTaken'),
            rawWPM: document.getElementById('rawWPM'),
            retryBtn: document.getElementById('retryBtn'),
            newTestBtn: document.getElementById('newTestBtn'),
            historyBtn: document.getElementById('historyBtn'),
            
            // History Section
            historySection: document.getElementById('historySection'),
            historyList: document.getElementById('historyList'),
            clearHistoryBtn: document.getElementById('clearHistoryBtn'),
            backFromHistoryBtn: document.getElementById('backFromHistoryBtn')
        };

        // Word database by difficulty
        this.wordDatabase = {
            beginner: [
                'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'I',
                'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at',
                'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she',
                'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what',
                'so', 'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me',
                'when', 'make', 'can', 'like', 'time', 'no', 'just', 'him', 'know', 'take',
                'people', 'into', 'year', 'your', 'good', 'some', 'could', 'them', 'see', 'other',
                'than', 'then', 'now', 'look', 'only', 'come', 'its', 'over', 'think', 'also',
                'back', 'after', 'use', 'two', 'how', 'our', 'work', 'first', 'well', 'way',
                'even', 'new', 'want', 'because', 'any', 'these', 'give', 'day', 'most', 'us'
            ],
            intermediate: [
                'business', 'computer', 'education', 'environment', 'government', 'important',
                'information', 'international', 'management', 'necessary', 'organization',
                'professional', 'responsibility', 'technology', 'understand', 'development',
                'economic', 'financial', 'industry', 'marketing', 'political', 'relationship',
                'significant', 'society', 'structure', 'successful', 'available', 'different',
                'effective', 'experience', 'government', 'important', 'individual', 'knowledge',
                'management', 'necessary', 'particular', 'political', 'possible', 'practice',
                'present', 'previous', 'private', 'probably', 'problem', 'program', 'provide',
                'question', 'real', 'recent', 'research', 'require', 'right', 'school', 'second',
                'service', 'should', 'social', 'special', 'state', 'student', 'study', 'system',
                'though', 'today', 'together', 'various', 'where', 'whether', 'world', 'would'
            ],
            advanced: [
                'accommodate', 'acknowledgment', 'acquisition', 'adaptation', 'administration',
                'advancement', 'advertisement', 'alternative', 'application', 'appreciation',
                'architecture', 'assessment', 'association', 'atmosphere', 'authentication',
                'authorization', 'availability', 'biodiversity', 'broadcasting', 'capitalization',
                'classification', 'collaboration', 'communication', 'comprehensive', 'compromise',
                'concentration', 'conceptualization', 'conclusion', 'configuration', 'confirmation',
                'consciousness', 'conservation', 'consideration', 'construction', 'consultation',
                'contemporary', 'controversial', 'convenience', 'coordination', 'corporation',
                'correspondence', 'cryptocurrency', 'cybersecurity', 'decentralization',
                'demonstration', 'denominational', 'description', 'destabilization', 'determination',
                'differentiation', 'disadvantage', 'disappearance', 'discrimination', 'distribution',
                'documentation', 'domestication', 'economical', 'education', 'effectiveness',
                'electromagnetic', 'encouragement', 'endorsement', 'entertainment', 'entrepreneurial',
                'environmental', 'establishment', 'evaluation', 'examination', 'excellence',
                'exchange', 'expansion', 'experimentation', 'exploration', 'exportation'
            ]
        };

        // Test state
        this.testState = {
            isRunning: false,
            isPaused: false,
            startTime: null,
            timeRemaining: 60,
            totalDuration: 60,
            textToType: '',
            typedText: '',
            correctCharacters: 0,
            totalCharacters: 0,
            errors: 0,
            timer: null
        };

        // Initialize event listeners
        this.initEventListeners();
    }

    initEventListeners() {
        // Configuration listeners
        this.elements.testMode.addEventListener('change', () => this.handleTestModeChange());
        this.elements.startBtn.addEventListener('click', () => this.startTest());

        // Test listeners
        this.elements.textInput.addEventListener('input', (e) => this.handleInput(e));
        this.elements.resetBtn.addEventListener('click', () => this.resetTest());
        this.elements.pauseBtn.addEventListener('click', () => this.togglePause());

        // Results listeners
        this.elements.retryBtn.addEventListener('click', () => this.retryTest());
        this.elements.newTestBtn.addEventListener('click', () => this.newTest());
        this.elements.historyBtn.addEventListener('click', () => this.showHistory());

        // History listeners
        this.elements.clearHistoryBtn.addEventListener('click', () => this.clearHistory());
        this.elements.backFromHistoryBtn.addEventListener('click', () => this.hideHistory());

        // Prevent default form submission
        document.addEventListener('submit', (e) => e.preventDefault());
    }

    handleTestModeChange() {
        const testMode = this.elements.testMode.value;
        if (testMode === 'words') {
            this.elements.wordCountGroup.style.display = 'block';
            this.elements.duration.parentElement.style.display = 'none';
        } else {
            this.elements.wordCountGroup.style.display = 'none';
            this.elements.duration.parentElement.style.display = 'block';
        }
    }

    generateTestText() {
        const difficulty = this.elements.difficulty.value;
        const testMode = this.elements.testMode.value;
        const words = this.wordDatabase[difficulty];
        let targetWordCount;

        if (testMode === 'words') {
            targetWordCount = parseInt(this.elements.wordCount.value);
        } else {
            // Generate approximately 100 words for time-based tests
            targetWordCount = 100;
        }

        const selectedWords = [];
        for (let i = 0; i < targetWordCount; i++) {
            const randomIndex = Math.floor(Math.random() * words.length);
            selectedWords.push(words[randomIndex]);
        }

        // Create sentences (5-10 words per sentence)
        const sentences = [];
        let currentSentence = [];
        let wordsPerSentence = 5 + Math.floor(Math.random() * 6);

        selectedWords.forEach((word, index) => {
            currentSentence.push(word);
            
            if (currentSentence.length >= wordsPerSentence || index === selectedWords.length - 1) {
                sentences.push(currentSentence.join(' ') + '.');
                currentSentence = [];
                wordsPerSentence = 5 + Math.floor(Math.random() * 6);
            }
        });

        return sentences.join(' ');
    }

    startTest() {
        // Get test configuration
        const testMode = this.elements.testMode.value;
        const difficulty = this.elements.difficulty.value;
        
        if (testMode === 'time') {
            this.testState.totalDuration = parseInt(this.elements.duration.value);
            this.testState.timeRemaining = this.testState.totalDuration;
        } else {
            this.testState.totalDuration = parseInt(this.elements.wordCount.value) * 5; // Estimate time
            this.testState.timeRemaining = this.testState.totalDuration;
        }

        // Generate test text
        this.testState.textToType = this.generateTestText();
        
        // Reset test state
        this.testState.isRunning = true;
        this.testState.isPaused = false;
        this.testState.startTime = null;
        this.testState.typedText = '';
        this.testState.correctCharacters = 0;
        this.testState.totalCharacters = 0;
        this.testState.errors = 0;

        // Update UI
        this.elements.configuration.style.display = 'none';
        this.elements.testSection.style.display = 'block';
        this.elements.textDisplay.innerHTML = this.formatTextDisplay(this.testState.textToType);
        this.elements.textInput.value = '';
        this.elements.textInput.disabled = false;
        this.elements.textInput.focus();
        
        // Update displays
        this.updateTimerDisplay();
        this.updateStatsDisplay();

        // Start timer on first keystroke
        this.elements.textInput.addEventListener('keydown', this.startTimerOnFirstKeystroke.bind(this), { once: true });
    }

    startTimerOnFirstKeystroke(e) {
        if (!this.testState.startTime && this.testState.isRunning && !this.testState.isPaused) {
            this.testState.startTime = performance.now();
            this.startTimer();
        }
    }

    formatTextDisplay(text) {
        return text.split('').map(char => 
            `<span class="char-untyped">${this.escapeHtml(char)}</span>`
        ).join('');
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    handleInput(e) {
        if (!this.testState.isRunning || this.testState.isPaused) return;

        const typedText = e.target.value;
        const textToType = this.testState.textToType;
        
        this.testState.typedText = typedText;
        
        // Calculate metrics
        this.calculateMetrics();
        
        // Update visual feedback
        this.updateTextDisplay();
        this.updateStatsDisplay();

        // Check if test is complete
        if (this.elements.testMode.value === 'words') {
            const targetWords = parseInt(this.elements.wordCount.value);
            const typedWords = typedText.trim().split(/\s+/).length;
            if (typedWords >= targetWords) {
                this.endTest();
            }
        }
    }

    updateTextDisplay() {
        const textToType = this.testState.textToType;
        const typedText = this.testState.typedText;
        
        let html = '';
        
        for (let i = 0; i < textToType.length; i++) {
            const char = textToType[i];
            let className = 'char-untyped';
            
            if (i < typedText.length) {
                if (typedText[i] === char) {
                    className = 'char-correct';
                } else {
                    className = 'char-incorrect';
                }
            } else if (i === typedText.length) {
                className = 'char-current';
            }
            
            html += `<span class="${className}">${this.escapeHtml(char)}</span>`;
        }
        
        this.elements.textDisplay.innerHTML = html;
    }

    calculateMetrics() {
        const textToType = this.testState.textToType;
        const typedText = this.testState.typedText;
        
        let correct = 0;
        let total = typedText.length;
        let errors = 0;
        
        for (let i = 0; i < Math.min(textToType.length, typedText.length); i++) {
            if (typedText[i] === textToType[i]) {
                correct++;
            } else {
                errors++;
            }
        }
        
        this.testState.correctCharacters = correct;
        this.testState.totalCharacters = total;
        this.testState.errors = errors;
    }

    updateStatsDisplay() {
        // Calculate WPM
        const wpm = this.calculateWPM();
        this.elements.wpmDisplay.textContent = Math.round(wpm);
        
        // Calculate Accuracy
        const accuracy = this.calculateAccuracy();
        this.elements.accuracyDisplay.textContent = accuracy + '%';
        
        // Update errors
        this.elements.errorsDisplay.textContent = this.testState.errors;
    }

    calculateWPM() {
        if (!this.testState.startTime) return 0;
        
        const currentTime = performance.now();
        const timeElapsed = (currentTime - this.testState.startTime) / 1000 / 60; // in minutes
        
        if (timeElapsed === 0) return 0;
        
        // Standard WPM calculation: (characters typed / 5) / minutes
        const wordsTyped = this.testState.correctCharacters / 5;
        return wordsTyped / timeElapsed;
    }

    calculateAccuracy() {
        if (this.testState.totalCharacters === 0) return 100;
        
        return Math.round((this.testState.correctCharacters / this.testState.totalCharacters) * 100);
    }

    calculateCPM() {
        if (!this.testState.startTime) return 0;
        
        const currentTime = performance.now();
        const timeElapsed = (currentTime - this.testState.startTime) / 1000 / 60; // in minutes
        
        if (timeElapsed === 0) return 0;
        
        return Math.round(this.testState.totalCharacters / timeElapsed);
    }

    startTimer() {
        this.testState.timer = setInterval(() => {
            if (!this.testState.isPaused) {
                this.testState.timeRemaining--;
                this.updateTimerDisplay();
                
                if (this.testState.timeRemaining <= 0) {
                    this.endTest();
                }
            }
        }, 1000);
    }

    updateTimerDisplay() {
        const timeRemaining = this.testState.timeRemaining;
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        this.elements.timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    togglePause() {
        if (!this.testState.isRunning) return;
        
        this.testState.isPaused = !this.testState.isPaused;
        this.elements.pauseBtn.textContent = this.testState.isPaused ? 'Resume' : 'Pause';
        this.elements.textInput.disabled = this.testState.isPaused;
        
        if (this.testState.isPaused) {
            this.elements.textInput.blur();
        } else {
            this.elements.textInput.focus();
        }
    }

    resetTest() {
        if (this.testState.timer) {
            clearInterval(this.testState.timer);
        }
        
        this.elements.configuration.style.display = 'block';
        this.elements.testSection.style.display = 'none';
        this.elements.resultsSection.style.display = 'none';
    }

    endTest() {
        if (this.testState.timer) {
            clearInterval(this.testState.timer);
        }
        
        this.testState.isRunning = false;
        
        // Calculate final metrics
        const finalWPM = this.calculateWPM();
        const finalAccuracy = this.calculateAccuracy();
        const finalCPM = this.calculateCPM();
        const timeElapsed = this.testState.totalDuration - this.testState.timeRemaining;
        
        // Update results display
        this.elements.finalWPM.textContent = Math.round(finalWPM);
        this.elements.finalAccuracy.textContent = finalAccuracy;
        this.elements.finalCPM.textContent = finalCPM;
        this.elements.finalErrors.textContent = this.testState.errors;
        this.elements.totalChars.textContent = this.testState.totalCharacters;
        this.elements.correctChars.textContent = this.testState.correctCharacters;
        this.elements.timeTaken.textContent = `${timeElapsed}s`;
        this.elements.rawWPM.textContent = Math.round((this.testState.totalCharacters / 5) / (timeElapsed / 60));
        
        // Save to history
        this.saveToHistory(finalWPM, finalAccuracy, finalCPM, timeElapsed);
        
        // Show results
        this.elements.testSection.style.display = 'none';
        this.elements.resultsSection.style.display = 'block';
    }

    saveToHistory(wpm, accuracy, cpm, timeTaken) {
        const history = JSON.parse(localStorage.getItem('typingTestHistory') || '[]');
        
        const result = {
            date: new Date().toISOString(),
            wpm: Math.round(wpm),
            accuracy: accuracy,
            cpm: cpm,
            timeTaken: timeTaken,
            errors: this.testState.errors,
            testMode: this.elements.testMode.value,
            duration: this.elements.testMode.value === 'time' 
                ? `${this.elements.duration.value}s` 
                : `${this.elements.wordCount.value} words`,
            difficulty: this.elements.difficulty.value
        };
        
        history.unshift(result);
        
        // Keep only last 50 results
        if (history.length > 50) {
            history.splice(50);
        }
        
        localStorage.setItem('typingTestHistory', JSON.stringify(history));
    }

    retryTest() {
        this.elements.resultsSection.style.display = 'none';
        this.startTest();
    }

    newTest() {
        this.elements.resultsSection.style.display = 'none';
        this.resetTest();
    }

    showHistory() {
        const history = JSON.parse(localStorage.getItem('typingTestHistory') || '[]');
        
        if (history.length === 0) {
            this.elements.historyList.innerHTML = '<p class="no-history">No test history available.</p>';
        } else {
            let html = '';
            history.forEach((result, index) => {
                const date = new Date(result.date);
                const dateStr = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
                
                html += `
                    <div class="history-item">
                        <div class="history-item-header">
                            <span class="history-date">${dateStr}</span>
                            <span class="history-mode">${result.testMode} - ${result.duration}</span>
                        </div>
                        <div class="history-stats">
                            <div class="history-stat">
                                <strong>WPM:</strong> ${result.wpm}
                            </div>
                            <div class="history-stat">
                                <strong>Accuracy:</strong> ${result.accuracy}%
                            </div>
                            <div class="history-stat">
                                <strong>CPM:</strong> ${result.cpm}
                            </div>
                            <div class="history-stat">
                                <strong>Time:</strong> ${result.timeTaken}s
                            </div>
                            <div class="history-stat">
                                <strong>Errors:</strong> ${result.errors}
                            </div>
                        </div>
                    </div>
                `;
            });
            this.elements.historyList.innerHTML = html;
        }
        
        this.elements.resultsSection.style.display = 'none';
        this.elements.historySection.style.display = 'block';
    }

    hideHistory() {
        this.elements.historySection.style.display = 'none';
        this.elements.resultsSection.style.display = 'block';
    }

    clearHistory() {
        if (confirm('Are you sure you want to clear all test history?')) {
            localStorage.removeItem('typingTestHistory');
            this.showHistory(); // Refresh the display
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TypingSpeedTester();
});