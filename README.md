# Todo App Frontend

A modern, responsive Todo application built with React and Material-UI.

## Features

- User Authentication (Login/Register)
- Create, Read, Update, Delete (CRUD) operations for Todo notes
- Sticky note style interface
- Responsive design for mobile and desktop
- JWT-based authentication
- Real-time updates
- Beautiful Material-UI components

## Technologies Used

- React
- TypeScript
- Material-UI (MUI)
- Axios for API calls
- JWT for authentication

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repository-url>
cd <repository-name>
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory and add your environment variables:
```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3000`.

## Environment Variables

- `NEXT_PUBLIC_API_URL`: The URL of your backend API server

## Project Structure

```
src/
├── api/
│   └── config.ts         # Axios configuration
├── components/
│   ├── Login.tsx         # Login/Register component
│   ├── StickyNote.tsx    # Individual note component
│   └── TodoList.tsx      # Main todo list component
└── App.tsx               # Root component
```

## Deployment

This project is configured for deployment on Vercel. To deploy:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure the environment variables in Vercel
4. Deploy!

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Material-UI for the beautiful components
- The React team for the amazing framework 