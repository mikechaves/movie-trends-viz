// Debug helper
function debugLog(message) {
    console.log(message);
    const debugInfo = document.getElementById('debug-info');
    if (debugInfo) {
        debugInfo.textContent = message;
    }
}

// Mock movie data
const mockMovieData = {
    action: {
        "2020": { title: "The Outpost", director: "Rod Lurie", rating: 91, description: "A small unit of U.S. soldiers, alone at the remote Combat Outpost Keating, located deep in the valley of three mountains in Afghanistan, battles an overwhelming force of Taliban fighters in a coordinated attack. The Battle of Kamdesh became the bloodiest American engagement of the Afghanistan War in 2009, and Bravo Troop 3-61 CAV became one of the most decorated units of the 19-year conflict.", posterId: "poster-action-2020" },
        "2021": { title: "The Paper Tigers", director: "Quoc Bao Tran", rating: 98, description: "Three martial artists--notorious in their prime as 'the three tigers'--have grown into middle-aged men one kick from a pulled muscle. But after their teacher's murder, they must juggle dead-end jobs, dad duties, and old grudges to avenge him.", posterId: "poster-action-2021" },
        "2022": { title: "Top Gun: Maverick", director: "Joseph Kosinski", rating: 96, description: "After more than thirty years of service as one of the Navys top aviators, Pete “Maverick” Mitchell (Tom Cruise) is where he belongs, pushing the envelope as a courageous test pilot and dodging the advancement in rank that would ground him. When he finds himself training a detachment of Top Gun graduates for a specialized mission the likes of which no living pilot has ever seen, Maverick encounters Lt. Bradley Bradshaw (Miles Teller), call sign: “Rooster,” the son of Mavericks late friend and Radar Intercept Officer Lt. Nick Bradshaw, aka “Goose”. Facing an uncertain future and confronting the ghosts of his past, Maverick is drawn into a confrontation with his own deepest fears, culminating in a mission that demands the ultimate sacrifice from those who will be chosen to fly it.", posterId: "poster-action-2022" },
        "2023": { title: "Mission: Impossible, Dead Reckoning Part One", director: "Christopher McQuarrie", rating: 96, description: "In Mission: Impossible - Dead Reckoning Part One, Ethan Hunt (Tom Cruise) and his IMF team embark on their most dangerous mission yet: To track down a terrifying new weapon that threatens all of humanity before it falls into the wrong hands. With control of the future and the fate of the world at stake, and dark forces from Ethan's past closing in, a deadly race around the globe begins. Confronted by a mysterious, all-powerful enemy, Ethan is forced to consider that nothing can matter more than his mission -- not even the lives of those he cares about most.", posterId: "poster-action-2023" },
        "2024": { title: "Ocean's Storm", director: "Nia DaCosta", rating: 8.7, description: "Deep sea explorers discover more than treasures in the Mariana Trench.", posterId: "poster-action-2024" }
    },
    comedy: {
        "2020": { title: "Office Party Gone Wrong", director: "Paul Feig", rating: 7.8, description: "A routine office celebration spirals into an unforgettable adventure.", posterId: "poster-comedy-2020" },
        "2021": { title: "The Wedding Crashers 2", director: "David Dobkin", rating: 8.1, description: "The legendary duo returns, this time crashing royal weddings.", posterId: "poster-comedy-2021" },
        "2022": { title: "Space Vacation", director: "Taika Waititi", rating: 8.9, description: "A family's first space tourism trip goes hilariously wrong.", posterId: "poster-comedy-2022" },
        "2023": { title: "AI Best Friend", director: "Olivia Wilde", rating: 8.5, description: "When your robot bestie takes 'being helpful' too literally.", posterId: "poster-comedy-2023" },
        "2024": { title: "Time Travel Dating", director: "Greta Gerwig", rating: 9.0, description: "Finding love is hard enough without temporal paradoxes.", posterId: "poster-comedy-2024" }
    },
    drama: {
        "2020": { title: "The Last Letter", director: "Kenneth Branagh", rating: 8.7, description: "A discovered letter changes three generations of a family.", posterId: "poster-drama-2020" },
        "2021": { title: "Silent Echo", director: "Barry Jenkins", rating: 9.1, description: "A musician faces losing her hearing and her identity.", posterId: "poster-drama-2021" },
        "2022": { title: "The Long Road Home", director: "Chloé Zhao", rating: 8.9, description: "A journey across America becomes a journey of self-discovery.", posterId: "poster-drama-2022" },
        "2023": { title: "Digital Dreams", director: "Christopher Nolan", rating: 9.4, description: "The line between reality and virtual life blurs for a programmer.", posterId: "poster-drama-2023" },
        "2024": { title: "Memory Keepers", director: "Sofia Coppola", rating: 9.2, description: "An AI archival project uncovers long-buried family secrets.", posterId: "poster-drama-2024" }
    },
    horror: {
        "2020": { title: "The Empty House", director: "Ari Aster", rating: 8.3, description: "A house-sitter discovers why the position pays so well.", posterId: "poster-horror-2020" },
        "2021": { title: "Digital Demon", director: "James Wan", rating: 8.6, description: "A cursed algorithm spreads terror through social media.", posterId: "poster-horror-2021" },
        "2022": { title: "The Last Stream", director: "Mike Flanagan", rating: 8.8, description: "A livestreamer's final broadcast becomes a fight for survival.", posterId: "poster-horror-2022" },
        "2023": { title: "Quantum Horror", director: "Jordan Peele", rating: 9.0, description: "Scientists open a door to somewhere they shouldn't have.", posterId: "poster-horror-2023" },
        "2024": { title: "Memory Eaters", director: "Robert Eggers", rating: 8.9, description: "Something is stealing people's memories... and their minds.", posterId: "poster-horror-2024" }
    },
    sciFi: {
        "2020": { title: "Mars Colony One", director: "Alex Garland", rating: 8.8, description: "The first Mars colony faces an unexpected threat from within.", posterId: "poster-scifi-2020" },
        "2021": { title: "Time Merchants", director: "Rian Johnson", rating: 8.9, description: "When time becomes a commodity, every second counts.", posterId: "poster-scifi-2021" },
        "2022": { title: "The Last Algorithm", director: "Neill Blomkamp", rating: 8.7, description: "An AI makes a discovery that changes everything we know.", posterId: "poster-scifi-2022" },
        "2023": { title: "Quantum Horizon", director: "Denis Villeneuve", rating: 9.3, description: "Multiple realities collide in this mind-bending epic.", posterId: "poster-scifi-2023" },
        "2024": { title: "Solar Dreams", director: "Gareth Edwards", rating: 9.1, description: "A solar energy project awakens something in the sun.", posterId: "poster-scifi-2024" }
    }
};

// Main component
AFRAME.registerComponent('genre-bars', {
    init: function () {
        debugLog('Initializing visualization...');

        this.genres = ['action', 'comedy', 'drama', 'horror', 'sciFi'];
        this.colors = {
            action: '#FF4444',
            comedy: '#44FF44',
            drama: '#4444FF',
            horror: '#FF44FF',
            sciFi: '#44FFFF'
        };

        this.currentYear = "2020";
        this.selectedGenreIndex = 0;
        this.dataLoaded = false;
        this.isDetailView = false;
        this.isMovieDetailView = false;

        // Texture references
        this.textureRefs = {
            main: '#filmstripMainTexture',
            movie: '#filmstripTexture'
        };

        this.onKeyDown = this.onKeyDown.bind(this);
        window.addEventListener('keydown', this.onKeyDown);

        // Add volume control
        window.addEventListener('keydown', (event) => {
            if (event.key === '+' || event.key === '=') {
                this.adjustVolume(0.1);
            } else if (event.key === '-' || event.key === '_') {
                this.adjustVolume(-0.1);
            } else if (event.key === 'm') {
                this.toggleMute();
            }
        });

        this.audioElements = {
            main: document.querySelector('#main-audio'),
            action: document.querySelector('#action-audio'),
            comedy: document.querySelector('#comedy-audio'),
            drama: document.querySelector('#drama-audio'),
            horror: document.querySelector('#horror-audio'),
            sciFi: document.querySelector('#sciFi-audio')
        };

        // Set up audio properties
        Object.values(this.audioElements).forEach(audio => {
            if (audio) {
                audio.loop = true;
                audio.volume = 0.5;
            }
        });

        // Wait for assets to load before playing main audio
        const scene = document.querySelector('a-scene');
        if (scene.hasLoaded) {
            this.initMainAudio();
        } else {
            scene.addEventListener('loaded', () => this.initMainAudio());
        }

        // Add click/touch event listener for user interaction
        document.addEventListener('click', () => {
            if (!this.isDetailView && !this.isMovieDetailView) {
                this.playMainAudio();
            }
        }, { once: true });

        this.createLoadingIndicator();
        this.loadData();
    },

    playMainAudio: function() {
        // Stop all genre audio
        this.genres.forEach(genre => {
            if (this.audioElements[genre]) {
                this.audioElements[genre].pause();
                this.audioElements[genre].currentTime = 0;
            }
        });

        // Play main audio
        if (this.audioElements.main) {
            this.audioElements.main.play().catch(error => {
                console.warn('Audio autoplay failed:', error);
            });
        }
    },

    playGenreAudio: function(genre) {
        // Stop main audio
        if (this.audioElements.main) {
            this.audioElements.main.pause();
            this.audioElements.main.currentTime = 0;
        }

        // Stop any other genre audio
        this.genres.forEach(g => {
            if (g !== genre && this.audioElements[g]) {
                this.audioElements[g].pause();
                this.audioElements[g].currentTime = 0;
            }
        });

        // Play selected genre audio
        if (this.audioElements[genre]) {
            this.audioElements[genre].play().catch(error => {
                console.warn('Audio autoplay failed:', error);
            });
        }
    },

    createLoadingIndicator: function () {
        const loading = document.createElement('a-text');
        loading.setAttribute('id', 'loading-text');
        loading.setAttribute('value', 'Loading visualization...');
        loading.setAttribute('align', 'center');
        loading.setAttribute('position', '0 1.5 -3');
        loading.setAttribute('scale', '1 1 1');
        loading.setAttribute('color', '#FFFFFF');
        this.el.appendChild(loading);
    },

    loadData: function () {
        const defaultData = [
            { "year": "2020", "action": 15, "comedy": 10, "drama": 20, "horror": 5, "sciFi": 10 }
        ];

        fetch('data/data.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                debugLog('Data loaded successfully');
                this.data = Array.isArray(data) ? data : data.data;
                this.removeLoadingIndicator();
                this.createVisualization();
                this.dataLoaded = true;
            })
            .catch(error => {
                console.error('Error loading data:', error);
                debugLog('Using default data due to loading error');
                this.data = defaultData;
                this.removeLoadingIndicator();
                this.createVisualization();
                this.dataLoaded = true;
            });
    },

    removeLoadingIndicator: function () {
        const loadingText = document.querySelector('#loading-text');
        if (loadingText) {
            loadingText.parentNode.removeChild(loadingText);
        }
    },

    addControlInstructions: function (text) {
        const existingInstructions = this.el.querySelector('#control-instructions');
        if (existingInstructions) {
            existingInstructions.parentNode.removeChild(existingInstructions);
        }
    
        const instructions = document.createElement('a-entity');
        instructions.setAttribute('id', 'control-instructions');
        
        // Position instructions below the bars
        if (this.isDetailView) {
            instructions.setAttribute('position', '0 -0.5 -6');
        } else {
            instructions.setAttribute('position', '0 -0.5 -6'); 
        }
    
        const instructionText = document.createElement('a-text');
        instructionText.setAttribute('value', text || (this.isDetailView ?
            'Press ESC to return to main view' :
            '← Previous Year | Next Year → | ↑↓ Select Genre | SPACE for detail view'));
        instructionText.setAttribute('align', 'center');
        instructionText.setAttribute('color', '#FFFFFF');
        instructionText.setAttribute('scale', '1 1 1'); 
    
        instructions.appendChild(instructionText);
        this.el.appendChild(instructions);
    },

    createVisualization: function () {
        this.createTitle();
        this.createGenreButtons();
        this.createBars();
        this.setupControls();
        this.addControlInstructions();
        this.updateGenreSelection();
    },

    createTitle: function() {
        const existingTitle = this.el.querySelector('#visualization-title');
        if (existingTitle) {
            existingTitle.parentNode.removeChild(existingTitle);
        }
    
        const titleEntity = document.createElement('a-entity');
        titleEntity.setAttribute('id', 'visualization-title');
        titleEntity.setAttribute('position', '0 7 -6');
        
        const titleText = document.createElement('a-text');
        titleText.setAttribute('value', 'Movie Streaming Trends By Genre in Millions');
        titleText.setAttribute('align', 'center');
        titleText.setAttribute('color', '#FFFFFF');
        titleText.setAttribute('scale', '1.5 1.5 1.5');
        
        titleEntity.appendChild(titleText);
        this.el.appendChild(titleEntity);
    },

    createGenreButtons: function () {
        const existingButtons = this.el.querySelector('#genre-buttons');
        if (existingButtons) {
            existingButtons.parentNode.removeChild(existingButtons);
        }

        const BUTTON_HEIGHT = 0.5;
        const BUTTON_SPACING = 0.8;
        const BUTTON_WIDTH = 1.6;

        const buttonContainer = document.createElement('a-entity');
        buttonContainer.setAttribute('id', 'genre-buttons');
        buttonContainer.setAttribute('position', '-6 4 -6');

        this.genres.forEach((genre, index) => {
            const buttonEntity = document.createElement('a-entity');
            buttonEntity.setAttribute('position', `0 ${-index * BUTTON_SPACING} 0`);

            const button = document.createElement('a-box');
            button.setAttribute('width', BUTTON_WIDTH);
            button.setAttribute('height', BUTTON_HEIGHT);
            button.setAttribute('depth', 0.05);
            button.setAttribute('color', index === this.selectedGenreIndex ? '#FFA500' : '#808080');
            button.setAttribute('id', `genre-button-${genre}`);

            const text = document.createElement('a-text');
            text.setAttribute('value', genre.toUpperCase());
            text.setAttribute('align', 'center');
            text.setAttribute('position', '0 0 0.03');
            text.setAttribute('scale', '1 1 1');
            text.setAttribute('color', '#FFFFFF');
            text.setAttribute('width', 4);

            buttonEntity.appendChild(button);
            buttonEntity.appendChild(text);
            buttonContainer.appendChild(buttonEntity);
        });

        this.el.appendChild(buttonContainer);
    },

    updateGenreSelection: function () {
        this.genres.forEach((genre, index) => {
            const button = this.el.querySelector(`#genre-button-${genre}`);
            if (button) {
                const isSelected = index === this.selectedGenreIndex;
                button.setAttribute('color', isSelected ? '#FFA500' : '#808080');

                if (isSelected) {
                    button.setAttribute('animation', {
                        property: 'material.emissive',
                        from: '#000000',
                        to: '#333333',
                        dur: 1000,
                        dir: 'alternate',
                        loop: true
                    });
                } else {
                    button.removeAttribute('animation');
                }
            }
        });

        this.highlightSelectedGenre();
    },

    createBars: function() {
        const existingBars = this.el.querySelectorAll('[id^="bar-"]');
        existingBars.forEach(bar => bar.parentNode.removeChild(bar));
    
        if (this.isDetailView) {
            // Detail view - show selected genre across all years
            const selectedGenre = this.genres[this.selectedGenreIndex];
            
            this.data.forEach((yearData, yearIndex) => {
                const value = yearData[selectedGenre];
                if (typeof value !== 'number') {
                    debugLog(`Invalid value for genre ${selectedGenre} in year ${yearData.year}: ${value}`);
                    return;
                }
    
                const FRAME_WIDTH = 1.0;
                const FRAME_HEIGHT = 0.6;
                const VERTICAL_GAP = 0.8;
                const START_X = -4;
                const START_Y = 4;
                const Z_POSITION = -6;
    
                const container = document.createElement('a-entity');
                container.setAttribute('id', `bar-${yearData.year}`);
                container.setAttribute('position', {
                    x: START_X,
                    y: START_Y - (yearIndex * VERTICAL_GAP),
                    z: Z_POSITION
                });
    
                const scaleFactor = 0.3;
                const numFrames = Math.ceil(value * scaleFactor);
    
                for (let j = 0; j < numFrames; j++) {
                    const frameContainer = document.createElement('a-entity');
                    frameContainer.setAttribute('position', {
                        x: j * FRAME_WIDTH,
                        y: 0,
                        z: 0
                    });
    
                    const filmstrip = document.createElement('a-plane');
                    filmstrip.setAttribute('width', FRAME_WIDTH);
                    filmstrip.setAttribute('height', FRAME_HEIGHT);
                    filmstrip.setAttribute('material', {
                        shader: 'flat',
                        src: this.textureRefs.main,
                        transparent: true,
                        opacity: 0.85,
                        color: this.colors[selectedGenre]
                    });
                    frameContainer.appendChild(filmstrip);
    
                    container.appendChild(frameContainer);
                }
    
                const label = document.createElement('a-text');
                label.setAttribute('value', `${value}`);
                label.setAttribute('position', {
                    x: numFrames * FRAME_WIDTH + 0.2,
                    y: 0,
                    z: 0
                });
                label.setAttribute('scale', '0.6 0.6 0.6');
                label.setAttribute('align', 'left');
                label.setAttribute('color', '#FFFFFF');
                container.appendChild(label);
    
                this.el.appendChild(container);
            });
        } else {
            // Main view - show all genres for current year
            const yearData = this.data.find(d => d.year === this.currentYear);
            if (!yearData) {
                debugLog('No data found for year: ' + this.currentYear);
                return;
            }
    
            const FRAME_WIDTH = 1.0;
            const FRAME_HEIGHT = 0.6;
            const VERTICAL_GAP = 0.8;
            const START_X = -4;
            const START_Y = 4;
            const Z_POSITION = -6;
    
            this.genres.forEach((genre, i) => {
                const value = yearData[genre];
                if (typeof value !== 'number') {
                    debugLog(`Invalid value for genre ${genre}: ${value}`);
                    return;
                }
    
                const container = document.createElement('a-entity');
                container.setAttribute('id', `bar-${genre}`);
                container.setAttribute('position', {
                    x: START_X,
                    y: START_Y - (i * VERTICAL_GAP),
                    z: Z_POSITION
                });
    
                const scaleFactor = 0.3;
                const numFrames = Math.ceil(value * scaleFactor);
    
                for (let j = 0; j < numFrames; j++) {
                    const frameContainer = document.createElement('a-entity');
                    frameContainer.setAttribute('position', {
                        x: j * FRAME_WIDTH,
                        y: 0,
                        z: 0
                    });
    
                    const filmstrip = document.createElement('a-plane');
                    filmstrip.setAttribute('width', FRAME_WIDTH);
                    filmstrip.setAttribute('height', FRAME_HEIGHT);
                    filmstrip.setAttribute('material', {
                        shader: 'flat',
                        src: this.textureRefs.main,
                        transparent: true,
                        opacity: 0.85,
                        color: this.colors[genre]
                    });
                    frameContainer.appendChild(filmstrip);
    
                    container.appendChild(frameContainer);
                }
    
                const label = document.createElement('a-text');
                label.setAttribute('value', `${value}`);
                label.setAttribute('position', {
                    x: numFrames * FRAME_WIDTH + 0.2,
                    y: 0,
                    z: 0
                });
                label.setAttribute('scale', '0.6 0.6 0.6');
                label.setAttribute('align', 'left');
                label.setAttribute('color', '#FFFFFF');
                container.appendChild(label);
    
                this.el.appendChild(container);
            });
        }
    },

    highlightSelectedGenre: function () {
        const selectedGenre = this.genres[this.selectedGenreIndex];
        debugLog(`Highlighting genre: ${selectedGenre}`);

        this.genres.forEach((genre) => {
            const bar = this.el.querySelector(`#bar-${genre}`);
            if (bar) {
                const frames = bar.querySelectorAll('[geometry]');
                frames.forEach(frame => {
                    frame.setAttribute('material', {
                        shader: 'flat',
                        src: this.textureRefs.main,
                        transparent: true,
                        opacity: 0.85,
                        color: this.colors[genre],
                        emissive: '#000000',
                        emissiveIntensity: 0
                    });
                });

                const label = bar.querySelector('a-text');
                if (label) {
                    label.setAttribute('color', '#FFFFFF');
                    label.setAttribute('scale', '0.6 0.6 0.6');
                }
            }
        });

        const selectedBar = this.el.querySelector(`#bar-${selectedGenre}`);
        if (selectedBar) {
            const frames = selectedBar.querySelectorAll('[geometry]');
            frames.forEach(frame => {
                frame.setAttribute('material', {
                    shader: 'flat',
                    src: this.textureRefs.main,
                    transparent: true,
                    opacity: 0.85,
                    color: this.colors[selectedGenre],
                    emissive: '#FFFFFF',
                    emissiveIntensity: 1
                });
            });

            const label = selectedBar.querySelector('a-text');
            if (label) {
                label.setAttribute('color', '#FFFF00');
                label.setAttribute('scale', '0.8 0.8 0.8');
            }
        }
    },

    setupControls: function () {
        const yearSelector = document.createElement('a-entity');
        yearSelector.setAttribute('id', 'year-selector');
        yearSelector.setAttribute('position', '0 6 -6');

        const buttonWidth = 1.0;
        const buttonSpacing = 0.2;
        const totalWidth = (this.data.length * buttonWidth) + ((this.data.length - 1) * buttonSpacing);
        const startX = -totalWidth / 2;

        this.data.forEach((yearData, i) => {
            const buttonX = startX + (i * (buttonWidth + buttonSpacing));

            const buttonContainer = document.createElement('a-entity');
            buttonContainer.setAttribute('position', `${buttonX} 0 0`);

            const yearButton = document.createElement('a-box');
            yearButton.setAttribute('width', buttonWidth);
            yearButton.setAttribute('height', 0.5);
            yearButton.setAttribute('depth', 0.1);
            yearButton.setAttribute('color', yearData.year === this.currentYear ? '#FFA500' : '#808080');

            const yearText = document.createElement('a-text');
            yearText.setAttribute('value', yearData.year);
            yearText.setAttribute('align', 'center');
            yearText.setAttribute('position', '0 0 0.06');
            yearText.setAttribute('scale', '0.7 0.7 0.7');
            yearText.setAttribute('color', '#FFFFFF');

            buttonContainer.appendChild(yearButton);
            buttonContainer.appendChild(yearText);
            yearSelector.appendChild(buttonContainer);
        });

        this.el.appendChild(yearSelector);
    },

    updateYear: function (year) {
        if (year === this.currentYear) return;

        this.currentYear = year;
        debugLog(`Updating to year: ${year}`);

        const yearSelector = document.querySelector('#year-selector');
        if (yearSelector) {
            yearSelector.querySelectorAll('a-box').forEach(button => {
                const buttonYear = button.nextElementSibling.getAttribute('value');
                button.setAttribute('color', buttonYear === year ? '#FFA500' : '#808080');

                if (buttonYear === year) {
                    button.setAttribute('animation', {
                        property: 'material.emissive',
                        from: '#000000',
                        to: '#333333',
                        dur: 1000,
                        dir: 'alternate',
                        loop: true
                    });
                } else {
                    button.removeAttribute('animation');
                }
            });
        }

        this.createBars();
        this.highlightSelectedGenre();
    },

    enterDetailView: function() {
        debugLog('Entering detail view');
        this.isDetailView = true;
        
        // More thorough cleanup - remove ALL existing elements
        const allElements = this.el.querySelectorAll('a-entity');
        allElements.forEach(element => {
            if (element.id !== 'camera' && element.id !== 'rig') {
                element.parentNode.removeChild(element);
            }
        });

        // Play genre-specific audio
        const selectedGenre = this.genres[this.selectedGenreIndex];
        this.playGenreAudio(selectedGenre);
        
        this.createTitle();

        const titleEntity = document.createElement('a-entity');
        titleEntity.setAttribute('id', 'genre-title');
        titleEntity.setAttribute('position', '0 6 -6');
        
        const titleText = document.createElement('a-text');  
        titleText.setAttribute('value', selectedGenre.toUpperCase());
        titleText.setAttribute('align', 'center');
        titleText.setAttribute('color', this.colors[selectedGenre]);
        titleText.setAttribute('scale', '2 2 2');
        
        titleEntity.appendChild(titleText);
        this.el.appendChild(titleEntity);
        
        const yearButtons = this.createYearButtonsForDetailView();
        this.el.appendChild(yearButtons);
        
        this.createBars();
        this.addControlInstructions('Press ESC to return to main view');
    },

    enterMovieDetailView: function () {
        debugLog('Entering movie detail view');
        this.isMovieDetailView = true;
        const selectedGenre = this.genres[this.selectedGenreIndex];
        const movieData = mockMovieData[selectedGenre][this.currentYear];

        // Thorough cleanup of ALL elements
        const allElements = this.el.querySelectorAll('a-entity');
        allElements.forEach(element => {
            if (element.id !== 'camera' && element.id !== 'rig') {
                element.parentNode.removeChild(element);
            }
        });

        // Remove any remaining text elements
        const allText = this.el.querySelectorAll('a-text');
        allText.forEach(element => {
            element.parentNode.removeChild(element);
        });

        this.createTitle();

        // Create movie detail view elements
        const titleEntity = document.createElement('a-entity');
        titleEntity.setAttribute('id', 'movie-detail-title');
        titleEntity.setAttribute('position', '0 6 -6');

        const titleText = document.createElement('a-text');
        titleText.setAttribute('value', movieData.title);
        titleText.setAttribute('align', 'center');
        titleText.setAttribute('color', this.colors[selectedGenre]);
        titleText.setAttribute('scale', '2 2 2');

        titleEntity.appendChild(titleText);
        this.el.appendChild(titleEntity);

        const container = document.createElement('a-entity');
        container.setAttribute('id', 'movie-filmstrip');
        container.setAttribute('position', '-4 2 -6');

        const FRAME_WIDTH = 5.0;
        const FRAME_HEIGHT = 3.0;

        // Single large poster plane
        const posterPlane = document.createElement('a-plane');
        posterPlane.setAttribute('width', FRAME_WIDTH);
        posterPlane.setAttribute('height', FRAME_HEIGHT);
        posterPlane.setAttribute('position', '0 0 0');
        posterPlane.setAttribute('material', {
            shader: 'flat',
            src: `#${movieData.posterId}`,
            transparent: true
        });
        container.appendChild(posterPlane);

        // Single large filmstrip overlay
        const filmstripOverlay = document.createElement('a-plane');
        filmstripOverlay.setAttribute('width', FRAME_WIDTH);
        filmstripOverlay.setAttribute('height', FRAME_HEIGHT);
        filmstripOverlay.setAttribute('position', '0 0 0.01');
        filmstripOverlay.setAttribute('material', {
            shader: 'flat',
            src: this.textureRefs.movie,
            transparent: true,
            opacity: 0.85,
            color: this.colors[selectedGenre]  // Use genre color
        });
        container.appendChild(filmstripOverlay);

        this.el.appendChild(container);

        // Create info panel
        const infoPanel = document.createElement('a-entity');
        infoPanel.setAttribute('id', 'movie-info-panel');
        infoPanel.setAttribute('position', '-1 3 -5');

        const movieInfo = [
            `Director: ${movieData.director}`,
            `Rating: ${movieData.rating}/10`,
            `Description: ${movieData.description}`
        ];

        movieInfo.forEach((info, index) => {
            const text = document.createElement('a-text');
            text.setAttribute('value', info);
            text.setAttribute('color', '#FFFFFF');
            text.setAttribute('scale', '0.5 0.5 0.5');
            text.setAttribute('position', `0 ${-index * 0.5} 0`);
            text.setAttribute('width', 8);
            infoPanel.appendChild(text);
        });

        this.el.appendChild(infoPanel);
        this.addControlInstructions('Press ESC to return to genre detail view');
    },

    createYearButtonsForDetailView: function () {
        const buttonContainer = document.createElement('a-entity');
        buttonContainer.setAttribute('id', 'year-buttons-detail');
        buttonContainer.setAttribute('position', '-6 4 -6');

        const BUTTON_HEIGHT = 0.5;
        const BUTTON_SPACING = 0.8;
        const BUTTON_WIDTH = 1.6;

        this.data.forEach((yearData, index) => {
            const buttonEntity = document.createElement('a-entity');
            buttonEntity.setAttribute('position', `0 ${-index * BUTTON_SPACING} 0`);

            const button = document.createElement('a-box');
            button.setAttribute('width', BUTTON_WIDTH);
            button.setAttribute('height', BUTTON_HEIGHT);
            button.setAttribute('depth', 0.1);
            button.setAttribute('color', yearData.year === this.currentYear ? '#FFA500' : '#808080');
            button.setAttribute('id', `year-button-${yearData.year}`);

            const text = document.createElement('a-text');
            text.setAttribute('value', yearData.year);
            text.setAttribute('align', 'center');
            text.setAttribute('position', '0 0 0.06');
            text.setAttribute('scale', '0.5 0.5 0.5');
            text.setAttribute('color', '#FFFFFF');

            buttonEntity.appendChild(button);
            buttonEntity.appendChild(text);
            buttonContainer.appendChild(buttonEntity);
        });

        return buttonContainer;
    },

    updateDetailViewYear: function (year) {
        if (!this.isDetailView) return;

        this.currentYear = year;
        debugLog(`Updating detail view to year: ${year}`);

        const yearButtons = this.el.querySelectorAll('[id^="year-button-"]');
        yearButtons.forEach(button => {
            const buttonYear = button.getAttribute('id').replace('year-button-', '');
            button.setAttribute('color', buttonYear === year ? '#FFA500' : '#808080');

            if (buttonYear === year) {
                button.setAttribute('animation', {
                    property: 'material.emissive',
                    from: '#000000',
                    to: '#333333',
                    dur: 1000,
                    dir: 'alternate',
                    loop: true
                });
            } else {
                button.removeAttribute('animation');
            }
        });

        this.createBars();
    },

    exitDetailView: function() {
        if (this.isMovieDetailView) {
            debugLog('Exiting movie detail view to genre detail view');
            this.isMovieDetailView = false;
            
            // Thorough cleanup of ALL elements
            const allElements = this.el.querySelectorAll('a-entity');
            allElements.forEach(element => {
                if (element.id !== 'camera' && element.id !== 'rig') {
                    element.parentNode.removeChild(element);
                }
            });
            
            // Remove any remaining text elements
            const allText = this.el.querySelectorAll('a-text');
            allText.forEach(element => {
                element.parentNode.removeChild(element);
            });
            
            this.enterDetailView();
        } else {
            debugLog('Exiting detail view to main view');
            this.isDetailView = false;

            // Return to main audio
            this.playMainAudio();
            
            // Thorough cleanup of ALL elements
            const allElements = this.el.querySelectorAll('a-entity');
            allElements.forEach(element => {
                if (element.id !== 'camera' && element.id !== 'rig') {
                    element.parentNode.removeChild(element);
                }
            });
            
            // Remove any remaining text elements
            const allText = this.el.querySelectorAll('a-text');
            allText.forEach(element => {
                element.parentNode.removeChild(element);
            });
            
            this.createVisualization();
        }
    },

    // Add a helper method for thorough cleanup
    cleanupAllElements: function() {
        // Remove all a-entity elements except camera and rig
        const allElements = this.el.querySelectorAll('a-entity');
        allElements.forEach(element => {
            if (element.id !== 'camera' && element.id !== 'rig') {
                element.parentNode.removeChild(element);
            }
        });

        // Remove all text elements
        const allText = this.el.querySelectorAll('a-text');
        allText.forEach(element => {
            element.parentNode.removeChild(element);
        });

        // Remove any other potential leftovers
        const allOthers = this.el.querySelectorAll('a-plane, a-box');
        allOthers.forEach(element => {
            element.parentNode.removeChild(element);
        });
    },

    onKeyDown: function (event) {
        if (!this.dataLoaded) {
            debugLog('Data not loaded yet, cannot navigate.');
            return;
        }

        debugLog(`Key pressed: ${event.key}`);

        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space', 'Escape'].includes(event.key)) {
            event.preventDefault();
            event.stopPropagation();
        }

        if (this.isMovieDetailView) {
            if (event.key === 'Escape') {
                this.exitDetailView();
            }
        } else if (this.isDetailView) {
            switch (event.key) {
                case 'ArrowUp':
                    const prevIndex = this.data.findIndex(d => d.year === this.currentYear);
                    if (prevIndex > 0) {
                        this.updateDetailViewYear(this.data[prevIndex - 1].year);
                    }
                    break;
                case 'ArrowDown':
                    const nextIndex = this.data.findIndex(d => d.year === this.currentYear);
                    if (nextIndex < this.data.length - 1) {
                        this.updateDetailViewYear(this.data[nextIndex + 1].year);
                    }
                    break;
                case 'Escape':
                    this.exitDetailView();
                    break;
                case ' ':
                case 'Space':
                    debugLog('Space pressed in detail view - entering movie detail view');
                    this.enterMovieDetailView();
                    break;
            }
        } else {
            switch (event.key) {
                case 'ArrowUp':
                    if (this.selectedGenreIndex > 0) {
                        this.selectedGenreIndex--;
                        this.updateGenreSelection();
                    }
                    break;
                case 'ArrowDown':
                    if (this.selectedGenreIndex < this.genres.length - 1) {
                        this.selectedGenreIndex++;
                        this.updateGenreSelection();
                    }
                    break;
                case 'ArrowLeft':
                    const currentIndex = this.data.findIndex(d => d.year === this.currentYear);
                    if (currentIndex > 0) {
                        this.updateYear(this.data[currentIndex - 1].year);
                    }
                    break;
                case 'ArrowRight':
                    const nextIndex = this.data.findIndex(d => d.year === this.currentYear);
                    if (nextIndex < this.data.length - 1) {
                        this.updateYear(this.data[nextIndex + 1].year);
                    }
                    break;
                case ' ':
                case 'Space':
                    debugLog('Space pressed in main view - entering detail view');
                    this.enterDetailView();
                    break;
            }
        }
    },

    adjustVolume: function(delta) {
        const audioElements = document.querySelectorAll('audio');
        audioElements.forEach(audio => {
            audio.volume = Math.max(0, Math.min(1, audio.volume + delta));
        });
    },

    toggleMute: function() {
        const audioElements = document.querySelectorAll('audio');
        audioElements.forEach(audio => {
            audio.muted = !audio.muted;
        });
    },

    initMainAudio: function() {
        // Try to play main audio, with fallback for autoplay restrictions
        if (this.audioElements.main) {
            this.audioElements.main.play()
                .catch(error => {
                    console.log('Autoplay prevented. Waiting for user interaction.');
                    // Add a visible prompt for user interaction if needed
                    this.createAudioPrompt();
                });
        }
    },

    createAudioPrompt: function() {
        // Only create prompt if it doesn't exist
        if (!document.querySelector('#audio-prompt')) {
            const prompt = document.createElement('a-entity');
            prompt.setAttribute('id', 'audio-prompt');
            prompt.setAttribute('position', '0 2 -3');
            prompt.setAttribute('text', {
                value: 'Click anywhere to start audio',
                align: 'center',
                width: 2,
                color: '#FFFFFF'
            });
            this.el.appendChild(prompt);

            // Remove prompt after first interaction
            document.addEventListener('click', () => {
                const existingPrompt = document.querySelector('#audio-prompt');
                if (existingPrompt) {
                    existingPrompt.parentNode.removeChild(existingPrompt);
                }
            }, { once: true });
        }
    },

    remove: function () {
        // Stop all audio when component is removed
        Object.values(this.audioElements).forEach(audio => {
            if (audio) {
                audio.pause();
                audio.currentTime = 0;
            }
        });

        window.removeEventListener('keydown', this.onKeyDown);
    }
});