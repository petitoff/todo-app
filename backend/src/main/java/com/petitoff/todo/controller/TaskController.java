package com.petitoff.todo.controller;

import com.petitoff.todo.model.Task;
import com.petitoff.todo.model.User;
import com.petitoff.todo.service.TaskService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/tasks")
@AllArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
public class TaskController {
    private final TaskService taskService;

    @PostMapping
    public ResponseEntity<Task> createTask(@RequestBody Task task, @AuthenticationPrincipal User user) {
        task.setUser(user);
        Task savedTask = taskService.saveTask(task);
        return ResponseEntity.ok(savedTask);
    }

    @PutMapping("/{taskId}")
    public ResponseEntity<Task> updateTask(@PathVariable Long taskId, @RequestBody Task task, @AuthenticationPrincipal User user) {
        Task updatedTask = taskService.updateTask(taskId, task, user);
        return ResponseEntity.ok(updatedTask);
    }

    @GetMapping
    public ResponseEntity<List<Task>> getUserTasks(@AuthenticationPrincipal User user) {
        List<Task> tasks = taskService.findByUser(user);
        return ResponseEntity.ok(tasks);
    }

    @DeleteMapping("/{taskId}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long taskId, @AuthenticationPrincipal User user) {
        taskService.deleteTask(taskId, user);
        return ResponseEntity.noContent().build();
    }
}
