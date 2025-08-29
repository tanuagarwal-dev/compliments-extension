# 🌟 Compliment Chrome Extension

A delightful AI-powered Chrome extension that gives you a daily boost of joy, confidence, or sass — right when you need it! Choose your vibe, save your favorite compliments, track your streaks, and make your day brighter with a click ✨

---

## 🔥 Features

- 💬 **Daily AI-Generated Compliments**  
- 🎭 **Customizable Vibes**: Choose between Bestie, Mentor, Sassy, or Flirty mode.
- 🌈 **Random Visual Themes**: New background + font styles with every compliment.
- 💖 **Save Favorites**: Keep the compliments you love.
- 📅 **Streak Tracker**: See how many days in a row you've shown up for yourself.
- 🗑️ **Manage Favorites**: Delete single or all saved compliments.
- 📤 **Share/Copy** (Planned): Send compliments to your friends or socials.

---

## 🧠 Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js + Express (optional for AI generation)
- **Storage**: `chrome.storage.local`
- **AI**: Cohere API (or local compliment list)

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/compliment-extension.git
cd compliment-extension
```


## Backend Setup(Optional)

cd backend

npm install

touch .env


Create env:  COHERE_API_KEY=your_api_key_here

Start backend: node index.js

##Load Extension in Chrome

Go to chrome://extensions

Enable Developer Mode

Click Load unpacked

Select the root compliment-extension folder
