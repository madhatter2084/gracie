/**
 * SVG Loader Component
 * Handles loading and caching of SVG assets
 */

// SVG content cache
const svgCache = new Map();

// SVG definitions - these would normally be loaded from your SVG files
const SVG_DEFINITIONS = {
    GracieKayLogo: `<svg viewBox="0 0 274 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 30 Q 30 10, 50 30 Q 70 50, 90 30 L 110 60 Q 130 80, 150 60 Q 170 40, 190 60 L 210 30 Q 230 10, 254 30" 
              stroke="currentColor" stroke-width="3" fill="none"/>
        <text x="20" y="80" font-family="Gwendolyn, cursive" font-size="24" font-weight="700" fill="currentColor">
            Gracie Kay
        </text>
        <text x="20" y="100" font-family="Roboto, sans-serif" font-size="12" font-weight="300" fill="currentColor" opacity="0.7">
            Life Has No Script
        </text>
    </svg>`,
    
    GracieKayLogoSimple: `<svg viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="10" y="35" font-family="Gwendolyn, cursive" font-size="28" font-weight="700" fill="currentColor">
            Gracie Kay
        </text>
    </svg>`,
    
    MusicNote: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 3V13.55C11.41 13.21 10.73 13 10 13C7.79 13 6 14.79 6 17S7.79 21 10 21 14 19.21 14 17V7H18V3H12Z" 
              fill="currentColor"/>
    </svg>`,
    
    WavePattern: `<svg viewBox="0 0 300 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 50 Q 75 10, 150 50 Q 225 90, 300 50" 
              stroke="currentColor" stroke-width="2" fill="none" opacity="0.3"/>
        <path d="M0 60 Q 75 20, 150 60 Q 225 100, 300 60" 
              stroke="currentColor" stroke-width="2" fill="none" opacity="0.2"/>
    </svg>`
};

/**
 * Load SVG from definitions
 */
export async function loadSVG(name) {
    // Check cache first
    if (svgCache.has(name)) {
        return svgCache.get(name);
    }

    try {
        // Get SVG from definitions
        const svgContent = SVG_DEFINITIONS[name];
        
        if (!svgContent) {
            console.warn(`SVG "${name}" not found in definitions`);
            return null;
        }

        // Cache the SVG
        svgCache.set(name, svgContent);
        
        return svgContent;
        
    } catch (error) {
        console.error(`Error loading SVG "${name}":`, error);
        return null;
    }
}

/**
 * Load SVG and insert into element
 */
export async function insertSVG(elementId, svgName, options = {}) {
    const element = document.getElementById(elementId);
    if (!element) {
        console.warn(`Element with ID "${elementId}" not found`);
        return false;
    }

    const svgContent = await loadSVG(svgName);
    if (!svgContent) {
        return false;
    }

    // Create container div if needed
    if (options.wrap) {
        const wrapper = document.createElement('div');
        wrapper.className = options.wrapperClass || 'svg-wrapper';
        wrapper.innerHTML = svgContent;
        element.appendChild(wrapper);
    } else {
        element.innerHTML = svgContent;
    }

    // Apply additional options
    if (options.className) {
        const svg = element.querySelector('svg');
        if (svg) {
            svg.classList.add(...options.className.split(' '));
        }
    }

    return true;
}

/**
 * Create SVG element from definition
 */
export async function createSVGElement(svgName, options = {}) {
    const svgContent = await loadSVG(svgName);
    if (!svgContent) {
        return null;
    }

    const container = document.createElement('div');
    container.innerHTML = svgContent;
    const svg = container.querySelector('svg');

    if (svg && options.className) {
        svg.classList.add(...options.className.split(' '));
    }

    return svg;
}

/**
 * Preload multiple SVGs
 */
export async function preloadSVGs(svgNames) {
    const promises = svgNames.map(name => loadSVG(name));
    
    try {
        await Promise.all(promises);
        console.log(`Preloaded ${svgNames.length} SVGs`);
        return true;
    } catch (error) {
        console.error('Error preloading SVGs:', error);
        return false;
    }
}

/**
 * Get cached SVG names
 */
export function getCachedSVGs() {
    return Array.from(svgCache.keys());
}

/**
 * Clear SVG cache
 */
export function clearSVGCache() {
    svgCache.clear();
}

/**
 * Get SVG cache size
 */
export function getSVGCacheSize() {
    return svgCache.size;
}

// Preload essential SVGs when module loads
document.addEventListener('DOMContentLoaded', async () => {
    await preloadSVGs(['GracieKayLogo', 'GracieKayLogoSimple', 'MusicNote', 'WavePattern']);
});