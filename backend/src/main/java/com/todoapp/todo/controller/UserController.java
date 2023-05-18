package com.todoapp.todo.controller;

import com.todoapp.todo.entity.Task;
import com.todoapp.todo.entity.User;
import com.todoapp.todo.service.TaskService;
import com.todoapp.todo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
@CrossOrigin(origins = "http://localhost:3000") // Allow requests from the React app running on localhost:3000
public class UserController {
    private final UserService userService;
    private final TaskService taskService;

    @Autowired
    public UserController(UserService userService, TaskService taskService) {
        this.userService = userService;
        this.taskService = taskService;
    }

    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    @PostMapping("/login")
    public ResponseEntity<User> loginUser(@RequestBody User user) {
        User authenticatedUser = userService.authenticateUser(user);
        if (authenticatedUser == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(authenticatedUser);
    }

    @GetMapping("/{userId}/tasks")
    public List<Task> getTasksByUserId(@PathVariable Long userId) {
        return taskService.getTasksByUserId(userId);
    }
}
