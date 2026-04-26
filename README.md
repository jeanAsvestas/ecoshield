# EcoShield Mobile

📱 Internal mobile application for pest control service operations.

## Overview

EcoShield Mobile is the internal field operations application for pest control technicians. Designed for mobile use, it gives employees a clear, real-time view of their daily schedule and everything they need to get the job done — from appointment details and client information to job notes and service history.
Technicians can browse their assigned appointments day by day, navigate to past or upcoming dates to stay ahead of their workload, and mark jobs as completed directly from the field. Each appointment card surfaces the key details on the spot — location, service type, client contact info, and any special instructions — so there's no need to call back to the office.
The app also provides notifications for updates and alerts, ensuring efficient communication and workflow.
Built to support a fast-moving team working outdoors, the app keeps things simple and reliable: the right information, at the right time, in the hands of the people who need it.

## Usage

Internal use only – restricted to authorized personnel.

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

## Tech Stack

- React Native
- Firebase (Auth, Firestore, Messaging)

### Core Framework

- **Expo** (~54.0.32) — Development platform for building React Native apps with managed services and rapid iteration
- **React Native** (0.81.5) — Cross-platform framework for building iOS and Android apps with React
- **React** (19.1.0) — JavaScript library for building user interfaces with component-based architecture

### Navigation & Routing

- **Expo Router** (~6.0.22) — File-based routing for React Native and web, similar to Next.js
- **React Navigation** (^7.x) — Popular navigation library with support for bottom tabs and stack navigation

### UI Components & Styling

- **Gluestack UI** (^3.0.x) — Comprehensive component library with accessibility built-in
- **NativeWind** (^4.1.23) — Tailwind CSS support for React Native, enabling utility-first styling
- **Lucide React Native** (^0.563.0) — Icon library for React Native with a wide selection of icons

### Lists

- **Shopify Flash List** (2.0.2) — High-performance virtualized list component for React Native

### Animations & Interactions

- **React Native Reanimated** (~4.1.0) — High-performance animation library for React Native
- **Legend App Motion** (^2.3.0) — Animation library for smooth, gesture-driven interactions
- **React Native Gesture Handler** (~2.28.0) — Gesture detection and handling for native interactions

### Accessibility & Input

- **React Aria** (^3.33.0) — Collection of accessibility hooks for building accessible components
- **React Stately** (^3.39.0) — State management hooks for interactive components

### Icons & Visual Assets

- **Expo Vector Icons** (^15.0.3) — Vector icon library collection for Expo
- **Expo Symbols** (~1.0.8) — Expo's symbol icon library
