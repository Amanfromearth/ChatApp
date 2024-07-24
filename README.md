# Real-Time Chat Application made for ayna ai job applicatin

## Overview
This project is a real-time chat web application built using a modern frontend stack and Strapi for the backend. It facilitates instant messaging between a user and a server through WebSocket communication. The application is responsive and designed to run smoothly on various screen sizes and devices.

## Features
- **User Authentication**: Users can sign up, log in, and log out of the application.
- **WebSocket Communication**: Real-time messaging between client and server.
- **Chat Interface**: Intuitive interface for sending and receiving messages.
- **Multiple Chat Sessions**: Users can switch between different chat sessions.
- **Local Storage**: Chat sessions and user data are stored locally for persistence.
- **Responsive Design**: Adapts to different screen sizes (desktop, tablet, mobile).
- **Attach emoji**: user can emoji's to the chat.

## Technical Stack
- **Frontend**: React with Next.js
- **Backend**: Strapi (Headless CMS)
- **WebSocket**: Socket.io
- **Styling**: Tailwind CSS
- **Form Validation**: Zod

## Usage
1. Sign up or log in to the application.
2. Create a new chat session or select an existing one.
3. Send messages in the chat interface.
4. Receive real-time responses from the server.
5. Switch between different chat sessions as needed.

## Authentication
The application uses JWT (JSON Web Tokens) for user authentication. Tokens are stored in HTTP-only cookies for security.

## Data Persistence
Chat sessions and messages are stored in the browser's local storage, allowing for data persistence across page reloads.

## Responsive Design
The application is designed to be fully responsive:
- **Desktop**: Full layout with sidebar and chat area.
- **Tablet/Mobile**: Collapsible sidebar for better space utilization.

  Thank You
