/**
 * Application Constants
 * Centralized configuration and data
 */

export const GALLERY_ITEMS = [
    {
        id: 1,
        type: 'image',
        title: 'Behind the Scenes',
        description: 'Creating music in the studio',
        url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHdvbWFuJTIwcG9ydHJhaXQlMjBzaW5nZXIlMjBtdXNpY2lhbnxlbnwxfHx8fDE3NTczNDgzMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
        id: 2,
        type: 'image',
        title: 'Live Performance',
        description: 'On stage bringing music to life',
        url: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMHBlcmZvcm1hbmNlJTIwc2luZ2VyfGVufDF8fHx8MTc1NzM0ODMxNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
        id: 3,
        type: 'image',
        title: 'Acoustic Session',
        description: 'Intimate acoustic moments',
        url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHdvbWFuJTIwcG9ydHJhaXQlMjBzaW5nZXIlMjBtdXNpY2lhbnxlbnwxfHx8fDE3NTczNDgzMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
        id: 4,
        type: 'image',
        title: 'Recording Studio',
        description: 'Capturing the perfect sound',
        url: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMHBlcmZvcm1hbmNlJTIwc2luZ2VyfGVufDF8fHx8MTc1NzM0ODMxNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    }
];

export const TIMELINE_ITEMS = [
    {
        id: 'competitive-swimming',
        title: 'Competitive Swimming',
        description: 'Years of dedication in the pool',
        icon: 'bi-water',
        year: '2015-2020',
        content: 'Spent years perfecting technique and building discipline through competitive swimming.'
    },
    {
        id: 'transition-period',
        title: 'The Transition',
        description: 'Discovering music as my calling',
        icon: 'bi-arrow-right-circle',
        year: '2020',
        content: 'A pivotal moment when I realized music was my true passion.'
    },
    {
        id: 'first-songs',
        title: 'First Songs',
        description: 'Writing and recording my debut',
        icon: 'bi-music-note-beamed',
        year: '2021',
        content: 'Started writing and recording my first original songs.'
    },
    {
        id: 'professional-artist',
        title: 'Professional Artist',
        description: 'Pursuing music full-time',
        icon: 'bi-star',
        year: '2022-Present',
        content: 'Now performing and creating music professionally.'
    }
];

export const STORY_POSTS = [
    {
        id: 1,
        username: 'graciekay',
        avatar: 'GK',
        time: '2 days ago',
        content: `Sometimes the biggest risks lead to the greatest rewards. 

When I first stepped away from competitive swimming to pursue music, everyone thought I was crazy. "You're throwing away years of training," they said. "What if music doesn't work out?"

But here's the thing about taking leaps of faith - you never know until you try. The pool taught me discipline, persistence, and how to push through when things get tough. Those same qualities that made me a strong swimmer are what drive me as an artist today.

I don't want to reject the concept of building my self-confidence and chasing my potential out of this programmed fear of "what if it doesn't work out" because what if it does?

Life has no script. We're all improvising, and that's where the magic happens. ✨`,
        tags: ['#LifeHasNoScript', '#MusicJourney', '#TakeTheLeap'],
        likes: 1247,
        comments: 89,
        shares: 34,
        isExpanded: false
    },
    {
        id: 2,
        username: 'graciekay',
        avatar: 'GK',
        time: '1 week ago',
        content: `Behind every song is a story waiting to be told. 

Today I'm sharing a piece of my heart with you. "Undercover" isn't just a song - it's a confession, a revelation, a moment of vulnerability set to melody.

We all wear masks sometimes, hiding parts of ourselves we think the world isn't ready to see. But music has this incredible power to strip away pretense and reveal truth.

When I wrote this song, I was thinking about all the times I've held back, played it safe, stayed "undercover" instead of showing who I really am. It's scary to be seen, but it's scarier to stay hidden forever.

So here's to being brave enough to take off the mask. Here's to being authentically, unapologetically yourself. 🎵`,
        tags: ['#Undercover', '#Authentic', '#Vulnerable'],
        likes: 892,
        comments: 156,
        shares: 67,
        isExpanded: false
    }
];

export const SOCIAL_PLATFORMS = [
    {
        name: 'Spotify',
        handle: '@graciekay',
        icon: 'bi-spotify',
        color: '#1DB954',
        url: 'https://open.spotify.com/track/05NQHtHM970DIZPR0fabB9?si=BflHiamxSpm8KAkrFUeqow',
        description: 'Stream my latest music and discover my full discography'
    },
    {
        name: 'Instagram',
        handle: '@graciekamusic',
        icon: 'bi-instagram',
        color: '#E4405F',
        url: '#',
        description: 'Behind-the-scenes moments and daily inspiration'
    },
    {
        name: 'TikTok',
        handle: '@graciekay',
        icon: 'bi-tiktok',
        color: '#ff0050',
        url: '#',
        description: 'Creative videos, song snippets, and authentic moments'
    },
    {
        name: 'Apple Music',
        handle: 'Gracie Kay',
        icon: 'bi-music-note',
        color: '#FA233B',
        url: 'https://music.apple.com/ca/song/undercover/1822967268',
        description: 'Listen to my music on Apple Music and other platforms'
    }
];

export const BOOKING_STEPS = [
    {
        id: 'contact',
        title: 'Contact Information',
        subtitle: 'Tell us about yourself',
        icon: 'bi-person'
    },
    {
        id: 'event',
        title: 'Event Details',
        subtitle: 'Share your vision',
        icon: 'bi-calendar-event'
    },
    {
        id: 'preferences',
        title: 'Music Preferences',
        subtitle: 'What sounds perfect?',
        icon: 'bi-music-note-beamed'
    },
    {
        id: 'review',
        title: 'Review & Submit',
        subtitle: 'Confirm your booking',
        icon: 'bi-check-circle'
    }
];

export const EVENT_TYPES = [
    { value: 'wedding', label: 'Wedding', icon: 'bi-heart' },
    { value: 'corporate', label: 'Corporate Event', icon: 'bi-building' },
    { value: 'private-party', label: 'Private Party', icon: 'bi-balloon' },
    { value: 'festival', label: 'Festival', icon: 'bi-music-note-list' },
    { value: 'venue', label: 'Venue Performance', icon: 'bi-mic' },
    { value: 'other', label: 'Other', icon: 'bi-question-circle' }
];

export const PERFORMANCE_TYPES = [
    { value: 'acoustic-solo', label: 'Acoustic Solo', icon: 'bi-music-note' },
    { value: 'acoustic-duo', label: 'Acoustic Duo', icon: 'bi-people' },
    { value: 'full-band', label: 'Full Band', icon: 'bi-collection' },
    { value: 'dj-set', label: 'DJ Set', icon: 'bi-vinyl' }
];

export const SPOTIFY_TRACK = {
    name: 'Undercover',
    artist: 'Gracie Kay',
    album: 'Single',
    albumArt: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHdvbWFuJTIwcG9ydHJhaXQlMjBzaW5nZXIlMjBtdXNpY2lhbnxlbnwxfHx8fDE3NTczNDgzMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    previewUrl: null, // Will be populated if available
    spotifyUrl: 'https://open.spotify.com/track/05NQHtHM970DIZPR0fabB9?si=BflHiamxSpm8KAkrFUeqow',
    appleMusicUrl: 'https://music.apple.com/ca/song/undercover/1822967268'
};

export const ANIMATION_DELAYS = {
    SECTION_STAGGER: 200,
    ITEM_STAGGER: 100,
    FADE_DURATION: 300,
    SLIDE_DURATION: 400
};

export const BREAKPOINTS = {
    SM: 576,
    MD: 768,
    LG: 992,
    XL: 1200,
    XXL: 1400
};

export const THEME_STORAGE_KEY = 'gracie-kay-theme';
export const NAVIGATION_OFFSET = 190;