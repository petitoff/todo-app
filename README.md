# Todo App - README

## Description

Todo App is a task management application. It allows users to create, edit, delete and view tasks and their subtasks. The application consists of two main parts: a backend (API) written in Spring Boot and a frontend created using React.js.

## Project Structure

### Backend

Main backend packages and classes:

```
com.petitoff.todo
└───controller
    ├───TaskController.java
    └───AuthenticationController.java
```

`TaskController.java` manages tasks and subtasks, handling operations such as creating, updating, deleting, and fetching.

`AuthenticationController.java` is responsible for user authentication, allowing users to register and log in.

### Frontend

Frontend structure:

```
src
├───App.tsx
├───config.ts
├───index.tsx
├───components
│   ├───AuthForm
│   │   ├───AuthForm.tsx
│   ├───BottomNavigation
│   │   ├───BottomNavigation.module.scss
│   │   ├───BottomNavigation.tsx
│   ├───common
│   │   ├───CustomDrawer
│   │   │   ├───CustomDrawer.tsx
│   │   ├───GradientInput
│   │   │   ├───GradientInput.module.scss
│   │   │   ├───GradientInput.tsx
│   │   └───Modal
│   │       ├───Modal.scss
│   │       ├───Modal.tsx
│   ├───EditTaskForm
│   │   ├───EditTaskForm.module.scss
│   │   ├───EditTaskForm.tsx
│   ├───Header
│   │   ├───Header.module.scss
│   │   ├───Header.tsx
│   ├───Menu
│   │   ├───Menu.module.scss
│   │   ├───Menu.tsx
│   ├───NewTaskForm
│   │   ├───NewTaskForm.module.scss
│   │   ├───NewTaskForm.tsx
│   ├───SubTaskInForm
│   │   ├───SubTaskInForm.module.scss
│   │   ├───SubTaskInForm.tsx
│   ├───TaskCard
│   │   ├───TaskCard.module.scss
│   │   ├───TaskCard.tsx
│   ├───TaskForm
│   │   ├───TaskForm.module.scss
│   │   ├───TaskForm.tsx
│   └───TaskList
│       ├───TaskList.module.scss
│       ├───TaskList.tsx
├───hooks
│   ├───hooks.ts
│   ├───tasksHooks
│   │   ├───useFetchTasks.ts
│   │   ├───useFetchUserTasks.ts
│   │   ├───useTask.ts
│   └───userHooks
│       ├───useUser.ts
├───Pages
│   ├───Home
│   │   ├───HomePage.module.scss
│   │   ├───HomePage.tsx
│   ├───Login
│   │   ├───LoginPage.module.scss
│   │   ├───LoginPage.tsx
│   └───Signup
│       ├───SignupPage.tsx
├───store
│   ├───store.ts
│   └───slices
│       ├───authSlice.ts
│       ├───sidebarSlice.ts
│       ├───taskSlice.ts
├───styles
│   ├───Global.scss
├───types
│   ├───Task.ts
│   ├───User.ts
└───utils
    ├───isTokenValid.ts
```

The frontend consists of components, hooks, pages, application state (store), styles, types, and utilities.

## Installation and Running

### Requirements

- Java JDK 17
- Maven
- Node.js and npm
