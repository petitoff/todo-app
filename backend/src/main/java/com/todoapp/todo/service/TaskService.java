package com.todoapp.todo.service;

import com.todoapp.todo.entity.Task;
import com.todoapp.todo.entity.User;
import com.todoapp.todo.repository.TaskRepository;
import com.todoapp.todo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class TaskService {
    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    @Autowired
    public TaskService(TaskRepository taskRepository, UserRepository userRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }

    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Optional<Task> getTaskById(Long id) {
        return taskRepository.findById(id);
    }

    public Task updateTask(Task task) {
        return taskRepository.save(task);
    }

    public void deleteTask(Long id){
        taskRepository.deleteById(id);
    }

    public List<Task> getTasksByUserId(Long userId) {
        return taskRepository.findAllByUserId(userId);
    }

    public Task addTaskToUser(String userEmail, String taskTitle, String taskDescription, LocalDateTime deadline) {
        // Find the user by email
        User userAccount = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Create a new task
        Task task = new Task();
        task.setTitle(taskTitle);
        task.setDescription(taskDescription);
        task.setDeadline(deadline); // Set the deadline

        // Assign the task to the user
        task.setUser(userAccount);

        // Save the task
        taskRepository.save(task);

        return task;
    }
}
