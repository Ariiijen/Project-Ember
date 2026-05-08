# Project Ember

A fitness tracker web application that compares calories burned per minute between running and gym workouts.

## Tech Stack

- **Backend**: Laravel (PHP) with MySQL
- **Frontend**: React with Vite
- **Authentication**: Laravel Sanctum
- **API**: RESTful API with Axios

## Features

- User registration and login
- Add running workouts (distance, duration, date)
- Add gym workouts (exercise, duration, date)
- Automatic calorie calculation using MET formula
- Dashboard with weekly calorie summary
- Calories per minute comparison chart
- CRUD operations for workouts
- Responsive UI with ember theme

## Setup Instructions

### Prerequisites

- PHP 8.2+
- Composer
- Node.js 18+
- MySQL
- Laravel CLI (optional)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install PHP dependencies:
   ```bash
   composer install
   ```

3. Copy environment file:
   ```bash
   cp .env.example .env
   ```

4. Generate application key:
   ```bash
   php artisan key:generate
   ```

5. Configure your MySQL database in `.env`:
   ```
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=project_ember
   DB_USERNAME=your_username
   DB_PASSWORD=your_password
   ```

6. Run database migrations:
   ```bash
   php artisan migrate
   ```

7. Start the Laravel development server:
   ```bash
   php artisan serve
   ```
   The backend will run on `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install Node.js dependencies:
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

### Usage

1. Open your browser and go to `http://localhost:5173`
2. Register a new account or login
3. Add running or gym workouts
4. View your dashboard with calorie summaries and comparisons

## API Endpoints

- `POST /api/register` - User registration
- `POST /api/login` - User login
- `POST /api/logout` - User logout
- `GET /api/user` - Get current user
- `GET /api/workouts` - Get user's workouts
- `POST /api/workouts/run` - Add running workout
- `POST /api/workouts/gym` - Add gym workout
- `PUT /api/workouts/{id}` - Update workout
- `DELETE /api/workouts/{id}` - Delete workout
- `GET /api/workouts/comparison` - Get weekly comparison data

## Calorie Calculation

Uses MET (Metabolic Equivalent of Task) formula:
- Calories = MET × weight(kg) × (duration_minutes / 60)
- Running MET = 9.8
- Gym MET = 6.0
| **Project Title** | Project Ember |
| **Course** | Web Systems and Technologies (WebSys) |
| **Semester** | Second Semester, A.Y. 2025-2026 |
| **Institution** | University of Science and Technology of Southern Philippines (USTP) |
| **Project Type** | Final Project |

---

## 📖 About The Project

Project Ember is a full-stack web application that allows users to track running and gym workouts in one unified dashboard. Unlike traditional fitness apps that treat activities separately, Ember calculates **calories per minute** for each activity type and provides a meaningful comparison — helping users understand which workout gives better results for their time.

### Problem Statement

Fitness apps today face three major issues:
- **Inaccurate calorie data** (up to 25% underestimation per a 2026 Nature study)
- **Fragmented experiences** (running and gym tracking are separate)
- **User dropout** (81 days retention for free users per JMIR study)

Project Ember solves this by merging both activity types and providing contextual calorie intelligence.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 19 + Vite |
| **Backend** | Laravel 12 (PHP) |
| **Database** | MySQL |
| **API Communication** | Axios + REST |
| **Authentication** | Laravel Sanctum |
| **Version Control** | Git + GitHub |

### Architecture (MVC)

This project follows the **Model-View-Controller** architecture as required by the course:

- **Model** (Laravel Eloquent) – Database interaction
- **View** (React Components) – User interface
- **Controller** (Laravel Controllers) – Business logic

---

## 📁 Folder Structure
