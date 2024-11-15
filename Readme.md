# Event Management Application
This project is a full-stack application developed with TypeScript. It consists of a client folder (built with React, TypeScript, and Bootstrap for styling) and a server folder (built with Express.js and TypeScript). Additionally, there is a common folder to store shared TypeScript typings between the client and server. This design enables smooth data and type consistency across both ends of the application.

## Table of Contents
1. Features
2. Technologies Used
3. Folder Structure
4. Getting Started
5. Usage
6. Future Improvements
## Features
- Add Event: Users can add a new event using a form on the left side of the interface.
- Event List: The right side displays a list of added events, where each event can be edited or deleted.
- Real-Time Form Validation: Ensures data accuracy and user input consistency.
- Mock Database: The server mimics database behavior to manage event data.
## Technologies Used
- Client:
    - React
    - TypeScript
    - Bootstrap (for a clean, responsive design)
    - Axios (for API requests)
- Server:
    - Express.js
    - TypeScript
    - Morgan (logging)
    - CORS (Cross-Origin Resource Sharing)
    - Express-Validator (for request validation)
## Client
The App.tsx file serves as the main entry point of the application, consisting of:

- AddEventForm: A form for users to input new event details and add them to the list.
- EventList: A component that iterates over each event in the mock database and displays it using the `EventComponent`.
The `EventComponent` is used within `EventList` to render individual events. It also contains logic for conditional rendering using the `EventFormComponent` for editable states, which is shared with the `AddEventForm` to maintain modularity.

A `utils` folder contains form validation utilities to ensure user input is clean and validated before submission.

## Server
The server logic resides primarily in the `index.ts` file, which initializes and configures Express with:

- Morgan: For logging and debugging.
- CORS: Enables cross-origin requests for local development.
- Express JSON: Middleware for JSON data handling.

Routes are defined in controllers, separated by function:
- Create, Edit, Delete, and Fetch Events: Enables basic CRUD operations.
- Mock Database: The `DB` class mimics a persistent database layer, storing events in memory. It facilitates seamless data integration, enhances code readability, and make the code easier to optimize. It also supports scalability and smooth data modernization, allowing legacy and new data to coexist in modern architectures.

A `validators` folder in `routers` utilizes `express-validator` to validate and sanitize incoming requests, ensuring data integrity for each API endpoint.

## Getting Started

### Prerequisites
Node.js and npm installed.

### Installation
1. Clone this repository.
2. Navigate to the client folder:
```bash
cd client
npm install
```
3. Open new terminal and navigate to the server folder:
```bash
cd server
npm install
```
## Usage
To run the application:

1. Start the client:

```bash
cd client
npm run dev
```

2. Open new terminal and navigate start the server:

```bash
cd server
npm run start
```

## Challanges
Primarily, there were state issues (e.g., components not re-rendering or state not updating at the right time) and a minor backend issue with a JavaScript array losing context, which was resolved by creating a class.