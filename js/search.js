/**
 * Enhanced Search Functionality for Alma 31 Study App
 * Provides comprehensive search across all content with relevance ranking
 */

class Alma31Search {
    constructor() {
        this.searchIndex = {};
        this.pageContent = {};
        this.searchHistory = [];
        this.maxHistoryItems = 10;

        this.init();
    }

    init() {
        this.buildSearchIndex();
        this.setupSearchInterface();
        this.loadSearchHistory();
    }

    /**
     * Build search index from all page content
     */
    buildSearchIndex() {
        // Define searchable content structure
        this.pageContent = {
            'home': {
                title: 'Alma 31 Study - Home',
                url: '../index.html',
                content: [
                    'Alma 31 Rameumptom prayer power word God',
                    'Zoramites pride false worship true prayer',
                    'dangers of pride compassion afflicted',
                    'holy stand selfsame prayer chosen people'
                ]
            },
            'scripture': {
                title: 'Alma 31 Scripture Text',
                url: 'pages/scripture.html',
                content: [
                    'preaching word great tendency lead people just',
                    'powerful effect minds people sword anything happened',
                    'Zoramites perverting ways Lord Zarah idols',
                    'Antionum east Zarahemla seashore Jershon wilderness Lamanites',
                    'synagogues day Lord worship manner never beheld',
                    'place built center standing high above head',
                    'holy holy God believe thou art God holy spirit',
                    'separated us brethren tradition childishness fathers',
                    'elected thy holy children no Christ',
                    'yesterday today forever elected saved cast wrath hell',
                    'chosen holy people Amen',
                    'selfsame prayer Rameumptom interpreted holy stand',
                    'heart grieved wicked perverse people gold silver fine goods',
                    'hearts lifted great boasting pride',
                    'lifted voice heaven cried how long Lord suffer',
                    'servants dwell flesh behold gross wickedness children men',
                    'cry unto thee hearts swallowed pride puffed greatness',
                    'costly apparel ringlets bracelets ornaments gold precious things',
                    'hearts set upon them cry thank God chosen people',
                    'Lord God how long suffer wickedness infidelity people',
                    'give strength bear infirmities infirm wickedness pain soul',
                    'heart exceedingly sorrowful comfort soul Christ',
                    'grant strength suffer patience afflictions iniquity people',
                    'comfort soul success fellow laborers Ammon Aaron Omner',
                    'Amulek Zeezrom two sons comfort souls Christ',
                    'grant strength bear afflictions iniquity people',
                    'grant success bringing again unto thee Christ',
                    'souls precious many brethren give power wisdom',
                    'clapped hands upon them filled Holy Spirit',
                    'separate themselves taking thought eat drink put on',
                    'Lord provided hunger thirst strength suffer afflictions',
                    'swallowed joy Christ according prayer Alma prayed faith'
                ]
            },
            'analysis': {
                title: 'Alma 31 Analysis & Commentary',
                url: 'pages/analysis.html',
                content: [
                    'historical context Zoramite background geopolitical situation',
                    'power Gods word verse five sword transformation',
                    'Rameumptom symbol false worship elevated platform pride',
                    'prayer contrast true false worship humility',
                    'pride cycle manifestations material wealth intellectual arrogance',
                    'Alma compassion Christ-like response apostasy opposition',
                    'modern applications contemporary Rameumptoms social media',
                    'authentic worship principles reflection questions',
                    'families leaders teachers individuals applications'
                ]
            },
            'gallery': {
                title: 'Alma 31 Visual Gallery',
                url: 'pages/gallery.html',
                content: [
                    'Rameumptom structure holy stand Zoramite prayer',
                    'synagogue interior architectural rendering',
                    'Alma younger portrait missionary companions',
                    'Zoramites wealthy costly apparel ornaments',
                    'Antionum map geographic location lands',
                    'landscape artistic interpretation terrain',
                    'Alma prayer heartfelt supplication scene',
                    'witnessing false worship astonishment',
                    'filled Holy Spirit divine preparation',
                    'tower pride symbolic interpretation',
                    'contrasting prayers true false comparison',
                    'power word sword symbolism scriptural art'
                ]
            },
            'applications': {
                title: 'Alma 31 Study Applications',
                url: 'pages/applications.html',
                content: [
                    'prayer self-assessment personal study improvement',
                    'pride inventory honest examination spiritual growth',
                    'word power study Alma 31:5 cross-references',
                    'compassion challenge Christ-like love struggling faith',
                    'family activities home evening age groups',
                    'build Rameumptom object lesson blocks symbolism',
                    'prayer drama contrast Zoramite Alma worship',
                    'teaching ideas Sunday school seminary primary',
                    'interactive demo digital Rameumptom demonstration',
                    'discussion questions personal group community',
                    'printable resources study guide family cards'
                ]
            },
            'about': {
                title: 'About Alma 31 Study App',
                url: 'pages/about.html',
                content: [
                    'purpose mission spiritual focus educational excellence',
                    'features capabilities scripture analysis gallery applications',
                    'technology design progressive web app responsive',
                    'sources attribution scripture commentary visual assets',
                    'feedback support privacy accessibility version information'
                ]
            }
        };

        // Build reverse index for fast searching
        for (const pageId in this.pageContent) {
            const page = this.pageContent[pageId];
            const allText = [page.title, ...page.content].join(' ').toLowerCase();

            // Split into words and create index
            const words = allText.match(/\b\w+\b/g) || [];
            words.forEach(word => {
                if (word.length > 2) { // Ignore very short words
                    if (!this.searchIndex[word]) {
                        this.searchIndex[word] = [];
                    }
                    if (!this.searchIndex[word].some(item => item.page === pageId)) {
                        this.searchIndex[word].push({
                            page: pageId,
                            relevance: this.calculateWordRelevance(word, page)
                        });
                    }
                }
            });
        }
    }

    /**
     * Calculate relevance score for a word on a page
     */
    calculateWordRelevance(word, page) {
        const titleWords = page.title.toLowerCase().split(' ');
        const contentText = page.content.join(' ').toLowerCase();

        let score = 0;

        // Higher score for title matches
        if (titleWords.includes(word)) {
            score += 10;
        }

        // Count occurrences in content
        const matches = (contentText.match(new RegExp(word, 'g')) || []).length;
        score += matches;

        return score;
    }

    /**
     * Setup search interface and event listeners
     */
    setupSearchInterface() {
        const searchInputs = document.querySelectorAll('.search-input, #searchInput');

        searchInputs.forEach(input => {
            // Add search functionality
            input.addEventListener('input', this.debounce((e) => {
                this.performSearch(e.target.value);
            }, 300));

            // Add keyboard shortcuts
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.performAdvancedSearch(e.target.value);
                }
                if (e.key === 'Escape') {
                    this.clearSearch();
                }
            });

            // Show search history on focus
            input.addEventListener('focus', () => {
                this.showSearchHistory(input);
            });
        });

        // Add global search shortcut (Ctrl/Cmd + K)
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                const searchInput = document.querySelector('.search-input');
                if (searchInput) {
                    searchInput.focus();
                    searchInput.select();
                }
            }
        });
    }

    /**
     * Perform search with query
     */
    performSearch(query) {
        if (!query || query.trim().length < 2) {
            this.clearSearchResults();
            return;
        }

        const results = this.searchContent(query.trim());
        this.displaySearchResults(results, query);
        this.addToSearchHistory(query);
    }

    /**
     * Advanced search with better ranking
     */
    performAdvancedSearch(query) {
        if (!query || query.trim().length < 2) return;

        const results = this.searchContent(query.trim());

        if (results.length === 0) {
            this.showNoResultsMessage(query);
            return;
        }

        // If we're not on a results page, create one
        this.showAdvancedSearchResults(results, query);
    }

    /**
     * Search content and return ranked results
     */
    searchContent(query) {
        const queryWords = query.toLowerCase().match(/\b\w+\b/g) || [];
        const pageScores = {};

        // Calculate scores for each page
        queryWords.forEach(word => {
            if (this.searchIndex[word]) {
                this.searchIndex[word].forEach(({ page, relevance }) => {
                    if (!pageScores[page]) {
                        pageScores[page] = 0;
                    }
                    pageScores[page] += relevance;
                });
            }
        });

        // Convert to sorted array
        const results = Object.entries(pageScores)
            .map(([pageId, score]) => ({
                ...this.pageContent[pageId],
                pageId,
                score,
                matches: this.getMatchingSnippets(query, pageId)
            }))
            .sort((a, b) => b.score - a.score);

        return results;
    }

    /**
     * Get matching text snippets for display
     */
    getMatchingSnippets(query, pageId) {
        const page = this.pageContent[pageId];
        const queryWords = query.toLowerCase().match(/\b\w+\b/g) || [];
        const snippets = [];

        page.content.forEach(content => {
            const lowerContent = content.toLowerCase();
            queryWords.forEach(word => {
                if (lowerContent.includes(word)) {
                    // Create snippet with context
                    const index = lowerContent.indexOf(word);
                    const start = Math.max(0, index - 30);
                    const end = Math.min(content.length, index + word.length + 30);
                    let snippet = content.substring(start, end);

                    if (start > 0) snippet = '...' + snippet;
                    if (end < content.length) snippet = snippet + '...';

                    // Highlight the matching word
                    snippet = snippet.replace(
                        new RegExp(`\\b${word}\\b`, 'gi'),
                        `<mark>$&</mark>`
                    );

                    snippets.push(snippet);
                }
            });
        });

        return [...new Set(snippets)].slice(0, 3); // Remove duplicates, max 3
    }

    /**
     * Display search results in current page
     */
    displaySearchResults(results, query) {
        // For now, just highlight matches in current page content
        this.highlightSearchMatches(query);

        // If no results found, could show suggestions
        if (results.length === 0) {
            this.showSearchSuggestions(query);
        }
    }

    /**
     * Highlight search matches in current page
     */
    highlightSearchMatches(query) {
        if (!query) return;

        // Clear previous highlights
        this.clearSearchHighlights();

        const content = document.querySelector('.content');
        if (!content) return;

        const queryWords = query.toLowerCase().match(/\b\w+\b/g) || [];

        queryWords.forEach(word => {
            this.highlightWord(content, word);
        });

        // Scroll to first match
        const firstMatch = content.querySelector('.search-highlight');
        if (firstMatch) {
            firstMatch.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    /**
     * Highlight specific word in element
     */
    highlightWord(element, word) {
        const walker = document.createTreeWalker(
            element,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode: (node) => {
                    const parent = node.parentElement;
                    if (parent && (parent.tagName === 'SCRIPT' || parent.tagName === 'STYLE')) {
                        return NodeFilter.FILTER_REJECT;
                    }
                    return node.textContent.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
                }
            }
        );

        const textNodes = [];
        let node;
        while (node = walker.nextNode()) {
            textNodes.push(node);
        }

        textNodes.forEach(textNode => {
            const regex = new RegExp(`\\b${this.escapeRegex(word)}\\b`, 'gi');
            if (regex.test(textNode.textContent)) {
                const highlightedHTML = textNode.textContent.replace(regex, '<span class="search-highlight">$&</span>');
                const wrapper = document.createElement('span');
                wrapper.innerHTML = highlightedHTML;
                textNode.parentNode.replaceChild(wrapper, textNode);
            }
        });
    }

    /**
     * Clear all search highlights
     */
    clearSearchHighlights() {
        const highlights = document.querySelectorAll('.search-highlight');
        highlights.forEach(highlight => {
            const parent = highlight.parentNode;
            parent.replaceChild(document.createTextNode(highlight.textContent), highlight);
            parent.normalize();
        });
    }

    /**
     * Show advanced search results in overlay or new view
     */
    showAdvancedSearchResults(results, query) {
        // Create search results overlay
        const overlay = this.createSearchOverlay(results, query);
        document.body.appendChild(overlay);
    }

    /**
     * Create search results overlay
     */
    createSearchOverlay(results, query) {
        const overlay = document.createElement('div');
        overlay.className = 'search-overlay';
        overlay.innerHTML = `
            <div class="search-results-container">
                <div class="search-results-header">
                    <h3>Search Results for "${query}"</h3>
                    <button class="close-search" onclick="this.closest('.search-overlay').remove()">×</button>
                </div>
                <div class="search-results-list">
                    ${results.map(result => `
                        <div class="search-result-item">
                            <h4><a href="${result.url}" onclick="this.closest('.search-overlay').remove()">${result.title}</a></h4>
                            <div class="search-result-snippets">
                                ${result.matches.map(match => `<p class="search-snippet">${match}</p>`).join('')}
                            </div>
                            <div class="search-result-meta">Score: ${result.score}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .search-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                z-index: 1000;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 2rem;
            }
            .search-results-container {
                background: white;
                border-radius: 8px;
                max-width: 800px;
                max-height: 80vh;
                overflow-y: auto;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            }
            .search-results-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1.5rem;
                border-bottom: 1px solid #ddd;
                background: var(--church-blue);
                color: white;
                border-radius: 8px 8px 0 0;
            }
            .close-search {
                background: none;
                border: none;
                color: white;
                font-size: 1.5rem;
                cursor: pointer;
                padding: 0.5rem;
                border-radius: 50%;
            }
            .close-search:hover {
                background: rgba(255, 255, 255, 0.2);
            }
            .search-results-list {
                padding: 1.5rem;
            }
            .search-result-item {
                margin-bottom: 2rem;
                padding-bottom: 1.5rem;
                border-bottom: 1px solid #eee;
            }
            .search-result-item:last-child {
                border-bottom: none;
            }
            .search-result-item h4 {
                margin-bottom: 0.5rem;
            }
            .search-result-item a {
                color: var(--church-blue);
                text-decoration: none;
            }
            .search-result-item a:hover {
                text-decoration: underline;
            }
            .search-snippet {
                margin: 0.5rem 0;
                font-size: 0.9rem;
                color: #666;
                line-height: 1.4;
            }
            .search-snippet mark {
                background: #ffeb3b;
                padding: 2px 4px;
                border-radius: 2px;
            }
            .search-result-meta {
                font-size: 0.8rem;
                color: #888;
            }
        `;
        document.head.appendChild(style);

        // Close on outside click
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.remove();
            }
        });

        // Close on escape key
        const closeOnEscape = (e) => {
            if (e.key === 'Escape') {
                overlay.remove();
                document.removeEventListener('keydown', closeOnEscape);
            }
        };
        document.addEventListener('keydown', closeOnEscape);

        return overlay;
    }

    /**
     * Search history management
     */
    addToSearchHistory(query) {
        if (!query || query.length < 2) return;

        // Remove if already exists
        this.searchHistory = this.searchHistory.filter(item => item !== query);

        // Add to beginning
        this.searchHistory.unshift(query);

        // Limit size
        if (this.searchHistory.length > this.maxHistoryItems) {
            this.searchHistory = this.searchHistory.slice(0, this.maxHistoryItems);
        }

        this.saveSearchHistory();
    }

    loadSearchHistory() {
        try {
            const stored = localStorage.getItem('alma31-search-history');
            if (stored) {
                this.searchHistory = JSON.parse(stored);
            }
        } catch (e) {
            console.log('Could not load search history');
        }
    }

    saveSearchHistory() {
        try {
            localStorage.setItem('alma31-search-history', JSON.stringify(this.searchHistory));
        } catch (e) {
            console.log('Could not save search history');
        }
    }

    showSearchHistory(input) {
        if (this.searchHistory.length === 0) return;

        // Create dropdown with history
        const dropdown = document.createElement('div');
        dropdown.className = 'search-history-dropdown';
        dropdown.innerHTML = `
            <div class="search-history-header">Recent Searches</div>
            ${this.searchHistory.map(query => `
                <div class="search-history-item" data-query="${query}">
                    <span class="history-query">${query}</span>
                    <button class="remove-history" data-query="${query}">×</button>
                </div>
            `).join('')}
        `;

        // Position dropdown
        const rect = input.getBoundingClientRect();
        dropdown.style.cssText = `
            position: absolute;
            top: ${rect.bottom + window.scrollY}px;
            left: ${rect.left + window.scrollX}px;
            width: ${rect.width}px;
            background: white;
            border: 1px solid #ddd;
            border-radius: 4px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            z-index: 1000;
            max-height: 200px;
            overflow-y: auto;
        `;

        // Add styles for history dropdown
        if (!document.getElementById('search-history-styles')) {
            const style = document.createElement('style');
            style.id = 'search-history-styles';
            style.textContent = `
                .search-history-header {
                    padding: 0.5rem;
                    font-size: 0.8rem;
                    color: #666;
                    border-bottom: 1px solid #eee;
                    background: #f8f9fa;
                }
                .search-history-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0.5rem;
                    cursor: pointer;
                    border-bottom: 1px solid #f0f0f0;
                }
                .search-history-item:hover {
                    background: #f8f9fa;
                }
                .history-query {
                    flex: 1;
                    font-size: 0.9rem;
                }
                .remove-history {
                    background: none;
                    border: none;
                    color: #999;
                    cursor: pointer;
                    padding: 2px 6px;
                    border-radius: 50%;
                }
                .remove-history:hover {
                    background: #e9ecef;
                    color: #dc3545;
                }
            `;
            document.head.appendChild(style);
        }

        // Event listeners
        dropdown.addEventListener('click', (e) => {
            if (e.target.classList.contains('remove-history')) {
                e.stopPropagation();
                const query = e.target.dataset.query;
                this.removeFromHistory(query);
                dropdown.remove();
            } else if (e.target.closest('.search-history-item')) {
                const query = e.target.closest('.search-history-item').dataset.query;
                input.value = query;
                this.performSearch(query);
                dropdown.remove();
            }
        });

        // Remove dropdown on outside click
        setTimeout(() => {
            document.addEventListener('click', function closeHistory(e) {
                if (!dropdown.contains(e.target) && e.target !== input) {
                    dropdown.remove();
                    document.removeEventListener('click', closeHistory);
                }
            });
        }, 100);

        document.body.appendChild(dropdown);
    }

    removeFromHistory(query) {
        this.searchHistory = this.searchHistory.filter(item => item !== query);
        this.saveSearchHistory();
    }

    clearSearch() {
        const searchInputs = document.querySelectorAll('.search-input, #searchInput');
        searchInputs.forEach(input => {
            input.value = '';
        });
        this.clearSearchResults();
        this.clearSearchHighlights();
    }

    clearSearchResults() {
        this.clearSearchHighlights();
        // Remove any search results displays
        const overlay = document.querySelector('.search-overlay');
        if (overlay) {
            overlay.remove();
        }
    }

    showNoResultsMessage(query) {
        console.log(`No results found for: ${query}`);
        // Could show suggestions or alternative searches
    }

    showSearchSuggestions(query) {
        // Could implement search suggestions based on common terms
        console.log(`Search suggestions for: ${query}`);
    }

    /**
     * Utility functions
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    escapeRegex(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
}

// Initialize search when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.alma31Search = new Alma31Search();
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Alma31Search;
}