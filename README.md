# PhishProof

**The world's first interactive scam simulator built for Bharat.**

PhishProof is an interactive, gamified single-page application built to help Indian teens and users recognize, understand, and avoid real-world digital scams, such as fake UPI collect requests, digital arrests, and WhatsApp impersonators. By gamifying the experience and showing realistic UI clones of everyday apps, it builds a "3-second scam reflex" instead of relying on passive safety videos.

## Features

- ✨ **Bite-Sized Interactive Scenarios**: Learn by doing. PhishProof puts you in the hot seat of realistic chat, SMS, and UPI flows.
- 🎨 **Premium Aesthetic & UX**: Built with GSAP animations, Framer Motion, Spline 3D backgrounds, and a Duolingo-styled interface to ensure an engaging gamified experience.
- 📱 **Designed for Bharat**: Optimized for mobile, showcasing the exact threats targeting Indian users today (e.g. KYC fraud, fake recruitment).
- 🏆 **Gamified Progress Tracking**: Earn XP, maintain streaks, collect badges, and manage "Hearts" seamlessly with local-first persistent state management via Zustand.
- 🐶 **Kavach**: The friendly, fully-animated GSAP-powered mascot that reacts to your progress and provides in-depth scam breakdowns.

## Tech Stack

- **Frontend Framework**: React 18 (Create React App + Craco for Tailwind configuration)
- **Routing**: React Router DOM v6
- **State Management**: Zustand (Local Storage persistence)
- **Animations**: GSAP (ScrollTrigger & Physics), Framer Motion
- **Styling**: Tailwind CSS v3
- **Icons**: Lucide React
- **Backend**: FastAPI Server (Python) for API handling & analytics (expandable)

## Getting Started

### Prerequisites
- Node.js (v16+)
- Yarn package manager
- Python 3.9+ (For backend features)

### Frontend Service
```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
yarn install

# Start the development server
yarn start
```
The client will be available at [http://localhost:3000](http://localhost:3000).

### Backend Service
```bash
# Navigate to the backend directory
cd backend

# Create a virtual environment
python -m venv venv
venv\Scripts\activate

# Install requirements
pip install -r requirements.txt

# Run the FastAPI server
python server.py
```
The server will normally be available at [http://localhost:5000](http://localhost:5000).

## Deployment

This application is configured for seamless deployment to **Vercel** with optimized `vercel.json` SPA handling and WebP asset caching.

```bash
# From the frontend directory:
vercel --prod
```

## Disclaimer
The simulations within PhishProof are entirely fictional educational tools designed to mimic fraudulent interactions for training purposes only. Do not enter real credentials.

---
_Developed for digital Bharat. Stay safe._
