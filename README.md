# Click Bait

A fast-paced mobile tapping game built with React Native and Expo. Challenge yourself to tap as fast as possible for 60 seconds while random distractions try to break your focus.

## Game Concept

**Core Loop:** Tap as fast as you can for 60 seconds while random distractions interrupt you.

**Fantasy:** "Chaos vs Focus" - Your job is to beat your own brain.

**Tone:** Playfully serious, raw, minimal, a little unhinged.

## Features

### Core Gameplay
- 60-second tapping challenge
- Real-time tap counter and timer
- Dynamic button animations (shrink, rotate, ripple effects)
- Spark burst effects on milestones
- Timer ring with color transitions (green → yellow → orange → red)
- Background flash in final 10 seconds

### Distraction System
- Fake notification popups
- Advertisement banners that shrink the tap button
- Popup overlays covering the button
- Unpredictable timing and placement
- Designed to test your focus

### Progression & Stats
- Personal best tracking
- Streak counter (consecutive highscore improvements)
- Previous score history
- Daily quest system (3 mid-difficulty quests per day)
- Quest types: tap count, speed, consistency, accuracy

### Social Features
- Global leaderboard
- Weekly league system (10 leagues: Bronze → Diamond)
- Division-based competition (15 players per division)
- Promotion/demotion mechanics (top 5 promote, bottom 3 demote)
- Diamond Tournament for top players
- Profile sharing with custom cards
- Score sharing after each game

### League System
- **10 Competitive Leagues:** Bronze, Silver, Gold, Platinum, Emerald, Sapphire, Ruby, Master, Grandmaster, Diamond
- **Weekly Divisions:** Compete with 15 players in your skill bracket
- **Smart Matchmaking:** Activity-based placement with timezone grouping
- **Promotion Zones:** Top 5 advance, middle 7 stay, bottom 3 demote
- **Diamond Tournament:** Quarterly elimination tournament for Diamond League players
- **Anti-Cheat System:** Automated detection and enforcement
- **Opt-Out Option:** Play casually without competitive pressure

## Tech Stack

### Frontend
- **Framework:** React Native with Expo SDK 54
- **Routing:** Expo Router (file-based routing)
- **Styling:** NativeWind (Tailwind CSS for React Native)
- **State Management:** Zustand + React Hooks
- **Animations:** React Native Animated API + react-useanimations
- **Icons:** @expo/vector-icons (Ionicons) + react-useanimations

### Backend
- **Authentication:** Firebase Authentication (email/password, Google)
- **Database:** Cloud Firestore (real-time leaderboards, user data)
- **Cloud Functions:** Scheduled functions for weekly resets and quest generation
- **Storage:** Firebase Storage (profile avatars)

### Local Storage
- **Persistence:** @react-native-async-storage/async-storage
- **Offline Support:** Queue score submissions, sync when online

### Sharing & Graphics
- **Sharing:** expo-sharing + react-native-view-shot
- **Graphics:** react-native-svg for circular progress indicators

## Project Structure

```
click-bait-app/
├── app/                      # Expo Router screens
│   ├── index.tsx            # Splash screen
│   ├── home.tsx             # Home screen with play button
│   ├── game.tsx             # Main game screen
│   ├── results.tsx          # Game over results
│   ├── leaderboard.tsx      # Global & league leaderboards
│   ├── profile.tsx          # User profile & stats
│   ├── auth.tsx             # Authentication screen
│   └── _layout.tsx          # Root layout
├── components/              # Reusable components
│   ├── Button.tsx
│   ├── Container.tsx
│   └── TouchRipple.tsx
├── store/                   # Zustand state management
│   └── store.ts
├── utils/                   # Utility functions
│   └── firebase.ts          # Firebase configuration
├── .kiro/specs/            # Project specifications
│   └── click-bait-game/
│       ├── design.md        # Design document
│       ├── requirements.md  # Requirements specification
│       └── tasks.md         # Implementation tasks
└── assets/                  # Images, fonts, icons
```

## Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (Mac) or Android Studio (for emulators)
- Firebase project (for backend features)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd click-bait-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:
```env
EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
EXPO_PUBLIC_FIREBASE_DATABASE_URL=your_database_url
EXPO_PUBLIC_PROJECT_ID=your_project_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

4. **Start the development server**
```bash
npm start
```

5. **Run on device/simulator**
```bash
# iOS
npm run ios

# Android
npm run android
```

## Firebase Setup

### 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Add iOS and Android apps
4. Download configuration files

### 2. Enable Authentication
1. Go to Authentication → Sign-in method
2. Enable Email/Password
3. (Optional) Enable Google Sign-In

### 3. Set Up Firestore
1. Go to Firestore Database → Create database
2. Start in production mode
3. Set up security rules (see Firebase Security Rules section)

### 4. Deploy Cloud Functions
```bash
cd functions
npm install
firebase deploy --only functions
```

### 5. Configure Indexes
Create composite indexes for:
- `divisions/{divisionId}/rankings` ordered by `weeklyScore` descending
- `users` filtered by `leaderboardEnabled` and ordered by `currentLeague`

## Development Scripts

```bash
# Start development server
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Lint and format code
npm run lint
npm run format

# Build for development
npm run build:dev

# Build for production
npm run build:prod
```

## Game Mechanics

### Scoring
- Each tap = 1 point
- 60-second time limit
- No penalties for missed taps
- Distractions don't affect score (but test your focus)

### Streak System
- Streak increases when you beat your personal best
- Resets if you don't beat your highscore
- Visual indicator changes color based on streak level:
  - 🟢 Green: 1-2 streak
  - 🟡 Yellow: 3-4 streak
  - 🟠 Orange: 5-9 streak
  - 🔴 Red: 10+ streak

### Daily Quests
- 3 new quests generated daily at midnight
- Mid-difficulty targets (achievable in 2-4 games)
- Quest types:
  - **Tap Count:** "Reach 75 taps in one game"
  - **Speed:** "Average 2 taps per second"
  - **Consistency:** "Play 3 games today"
  - **Accuracy:** "Avoid clicking distractions 5 times"

### Weekly League Competition
- **League Week:** Starts every Sunday at local timezone midnight
- **Division Size:** Exactly 15 players per division
- **Scoring:** Cumulative taps across all games during the week
- **Promotion:** Top 5 players advance to next league
- **Safe Zone:** Middle 7 players stay in current league
- **Demotion:** Bottom 3 players drop to lower league
- **Diamond Permanence:** Once you reach Diamond, you never demote

## Visual Design

### Color Palette
- **Primary:** Indigo (#6366F1, #4C51BF)
- **Success:** Green (#10B981)
- **Warning:** Yellow/Orange (#FBBF24, #F59E0B)
- **Danger:** Red (#EF4444)
- **Neutral:** Gray scale (#F9FAFB to #1F2937)
- **Accent:** Pastel Periwinkle

### Typography
- **Headings:** Garet (bold, high-impact)
- **Body:** DM Sans (clean, readable)
- **Style:** Big typography, minimal UI

### Animation Principles
- Organic, not template-coded
- Haptic feedback on interactions
- Microinteractions on every tap
- Smooth transitions (300-600ms)
- Native driver for performance

## Firebase Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Users can read their own data
    match /users/{userId} {
      allow read: if request.auth.uid == userId;
      allow write: if request.auth.uid == userId 
        && !request.resource.data.diff(resource.data).affectedKeys()
          .hasAny(['currentLeague', 'isFlagged', 'banUntil']);
    }
    
    // Anyone can read division rankings
    match /divisions/{divisionId} {
      allow read: if true;
      allow write: if false;  // Only Cloud Functions
      
      match /rankings/{userId} {
        allow read: if true;
        allow write: if false;
      }
    }
    
    // Users can read their own stats
    match /weeklyStats/{statId} {
      allow read: if request.auth.uid == resource.data.userId;
      allow write: if false;
    }
    
    // Users can read active tournaments
    match /tournaments/{tournamentId} {
      allow read: if true;
      allow write: if false;
    }
    
    // Users can read their own rewards
    match /rewards/{rewardId} {
      allow read: if request.auth.uid == resource.data.userId;
      allow update: if request.auth.uid == resource.data.userId
        && request.resource.data.diff(resource.data).affectedKeys()
          .hasOnly(['claimed']);
      allow create, delete: if false;
    }
    
    // Users can read/write their own quests
    match /dailyQuests/{questId} {
      allow read, write: if request.auth.uid == resource.data.userId;
    }
  }
}
```

## Anti-Cheat System

### Detection Methods
1. **Score Spike Detection:** Flags 300%+ increases from average
2. **Impossible Score Validation:** Max 15 taps/second (900 in 60s)
3. **Pattern Analysis:** Detects bot-like behavior

### Enforcement
- Automatic removal from leaderboards
- 30-day ban from league participation
- Admin review for appeals
- All events logged for analysis

## Performance Optimization

### Animation Performance
- Use `useNativeDriver: true` for transforms and opacity
- Limit spark particles to 12 per burst
- Clean up completed animations
- Avoid layout animations during gameplay

### State Management
- Minimize re-renders during active gameplay
- Use refs for values that don't need re-renders
- Batch state updates
- Memoize expensive calculations

### Storage Strategy
- Write to AsyncStorage only on game end
- Read from storage only on app launch
- Queue score submissions when offline
- Sync when connection restored

## Roadmap

### Phase 1: MVP (Current)
- [x] Core game mechanics
- [x] Score tracking and persistence
- [x] Basic animations
- [ ] Daily quest system
- [ ] Distraction mechanics
- [ ] Profile and sharing

### Phase 2: Social Features
- [ ] Firebase authentication
- [ ] Global leaderboard
- [ ] Weekly league system
- [ ] Division matchmaking
- [ ] Real-time rank updates

### Phase 3: Advanced Features
- [ ] Diamond Tournament
- [ ] Anti-cheat system
- [ ] Achievement system
- [ ] Power-ups
- [ ] Multiple game modes

### Phase 4: Polish & Launch
- [ ] Sound effects and haptics
- [ ] Onboarding flow
- [ ] Tutorial
- [ ] App store assets
- [ ] Marketing materials

## Contributing

This is a personal project, but feedback and suggestions are welcome! Please open an issue to discuss any changes.

## License

All rights reserved. This project is not open source.

## Credits

**Design & Development:** Infiniteam

**Fonts:** 
- Garet (headings)
- DM Sans (body)

**Inspiration:** The chaos of modern mobile UX

---

Built with ❤️ and a little bit of chaos by Infiniteam
