# Click Bait — Full Project Blueprint (Design • Requirements • Task List)

Below are the three **master sections** you need to execute Click Bait from zero to MVP: **Design Document**, **Requirements**, and a **Brutal, No‑Excuses Task List**.

---

## 1. DESIGN DOCUMENT

### **Game Identity**
- **Core Loop:** Tap as fast as you can for 60 seconds while random distractions interrupt you.
- **Fantasy:** "Chaos vs Focus." Your job is to beat your own brain.
- **Tone:** Playfully serious, raw, minimal, a little unhinged.
- **Visual Style:**
  - Big typography.
  - Stupid‑simple UI.
  - Organic animations (not template-coded junk).
  - Infiniteam black + white + pastel periwinkle accents.

### **Screens (MVP)**
1. **Splash Screen** – Infiniteam branding.
2. **Home Screen** – Play button, profile, leaderboard.
3. **Game Screen** – The circle/button + timer + chaos events.
4. **Results Screen** – Score, personal best.
5. **Leaderboard** – Global + local.
6. **Profile** – Username, avatar, share card.
7. **Auth** – Email signup + Google.

### **Core Game Mechanics**
- 60‑second round.
- Central tappable object with shrink/grow microinteraction.
- Event interruptions:
  - Fake notifications.
  - Screen shake.
  - Random blocking UI elements.
- Every round produces:
  - total\_taps
  - taps\_per\_second
  - best\_record

### **Visual Interaction Rules**
- Every tap => shrink to 80% → pop back.
- Break personal record => sparks + floating XP.
- Use haptics (light impact).

---

## 2. REQUIREMENTS DOCUMENT
### **Tech Stack**
- **React Native(Expo) + Nativewind**.
- **Firebase** for:
  - Auth (email + Google)
  - Firestore (profiles, scores)
  - Storage (profile avatars)
- **External libraries**
  - lucide-icons
  - gorhom-animated-tabbar
  - 

### **Data Structure**
```
users/{uid}
  username: string
  email: string
  avatar: url
  createdAt: timestamp
  bestScore: number
  totalGames: number
  recentScores: [number,...]

leaderboard/global/{autoid}
  uid
  score
  timestamp
```

### **MVP Requirements**
**Functional:**
- User can create account.
- User can play a round.
- Game records score.
- Leaderboard rankings display.
- Profile screen displays stats.
- Share card exports simple image.

**Non‑Functional:**
- Load time < 3 sec.
- Offline play allowed (but scores sync later).
- UI must feel handcrafted (no template animations).

### **Brand Requirements (Infiniteam)**
- Use Infiniteam font set: **Garet** for headings, **DM Sans** for body.
- Keep aesthetic minimal.
- Tone: High‑confidence Gen Z realism.
- Show the pawn + bent-circle icon on splash.

---

## 3. TASK LIST (DAY 1 → MVP DEPLOYMENT)
### **Day 1 — Foundation**
- Create project folder.
- Install React Native.
- Create screens placeholders.
- Set fonts.
- Wire navigation.

### **Day 2 — Core Game Loop**
- Implement 60‑second timer.
- Implement tap mechanic.
- Add shrink/pop microinteraction.
- Add score state.

### **Day 3 — Chaos Events**
- Add notification fake popups.
- Add screen shake.
- Add blockers.

### **Day 4 — UI Polish**
- Style Game Screen.
- Add animations.
- Add periwinkle accent.

### **Day 5 — Auth**
- Firebase setup.
- Email signup.
- Google login.
- Store user profile.

### **Day 6 — Firestore Integration**
- Save game results.
- Update best score.
- Sync recent scores.
- Create leaderboard records.

### **Day 7 — Leaderboard + Profile**
- Build leaderboard UI.
- Build profile UI.
- Add share-card export.

### **Day 8 — QA + Polish**
- Fix animation jitter.
- Check auth bugs.
- Test score syncing.
- Add vibration and tiny sound.

### **Day 9 — Branding Assets**
- Create social media teaser.
- Apply Infiniteam style.
- Build screenshots.

### **Day 10 — MVP Launch Prep**
- Build + generate APK.
- Test on 3+ devices.
- Prep marketing script.

---

If you follow this as written, you will have an MVP that feels intentional — not vibe-coded slop.

---

## 4. SCREEN WIREFRAMES (LOW-FIDELITY / TEXT-BASED)
Below are clean, minimal, actionable wireframes you can translate directly into your UI builds.

### **1. Splash Screen**
```
 ------------------------------
|           (ICON)             |
|                              |
|                              |
|                              |
|          CLICK BAIT          |
|                              |
|        [Loading… ••• ]       |
 ------------------------------
```

### **2. Home Screen**
```
 ------------------------------
|  Click Bait           Streak |
|------------------------------|
|                              |
|          [ PLAY ]            |
|                              |
|   Best: 0       Rank: —      |
|                              |
| [Leaderboard][Home][Profile] |
|                              |
 ------------------------------
```

### **3. Game Screen**
```
 ------------------------------
|   Time: 60s                  |
|------------------------------|
| [Fake Notification Popup]    |
|                              |
|          ( BIG TAP )         |
|          (  CIRCLE  )        |
|                              |
|     Score: 0   TPS: 0        |
|                              |
|                              |
 ------------------------------
```

### **4. Results Screen**
```
 ------------------------------
|           SCORE              |
|------------------------------|
|        Your Score: 432       |
|      Personal Best: 510      |
|                              |
|        [ PLAY AGAIN ]        |
|        [ SHARE SCORE ]       |
|                              |
 ------------------------------
```

### **5. Leaderboard Screen**
```
 ------------------------------
|Leaderboard            Streak |
|------------------------------|
|   TOP 1–20                   |
|   1.  @kofi         1200     |
|   2.  @ama           950     |
|   ...                        |
|   20. @yaw            410    |
|                              |
| — — —   YOUR POSITION  — — — |
|                              |
|   50. @you            275    |
|                              |
|   (Tabbar always shows here) |
 ------------------------------
```

**Logic:**
- Always show ranks 1–20.
- Add spacing.
- Then show **user’s actual position**, even if it's rank 300.
- User row has a **slight highlight**.
- Clean, readable, scrollable.

---

### **Bottom Tab Bar Rule (Global for Home, Leaderboard, Profile, Game)**
- Tabs = **Home**, **Game**, **Leaderboard**, **Profile**.
- Visible on all screens **except when the game starts**.
- On *Start Game* → Tab Bar + Status Bar **fade out in 300ms**.
- On *Game End* → Fade back in with results.
- Tabs use icons only (minimal, no labels).

### **6. Profile Screen (with Streaks)**
```
 ------------------------------
| Profile              Streak  |
|------------------------------|
|  (Avatar)   @username        |
|  {followers}{following}      |
|------------------------------|
|  Stats                       |
|  [Curnt Streak] [Curnt Lvl]  |
|  [High Score]    [Total XP]  |
|                              |
|  Achievements                |
|  [     Achievement  1     ]  |
|  [     Achievement  2     ]  |
|  [     Achievement  3     ]  |
|                              |
|      [ Edit Profile ]        |
|      [ Share Card ]          |
|------------------------------|
|   (Tabbar always shows here) |
 ------------------------------
```

**Streak Logic:**
- Streak increases if user plays at least once per day.
- Resets if they skip a day.
- «🔥» icon shows when streak >= 3.
- Streak data stored in Firestore: `currentStreak`, `longestStreak`, `lastPlayedAt`.



### **7. Auth Screen (Email + Google)**
```
 ------------------------------
|         Sign Up / Log In     |
|------------------------------|
|  Email:  [_____________]     |
|  Pass:   [_____________]     |
|                              |
|       [ Continue ]           |
|                              |
|   Or continue with Google    |
|          [ Google ]          |
|                              |
 ------------------------------
```

