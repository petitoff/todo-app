package com.petitoff.todo.controller;

import com.petitoff.todo.dto.TaskDTO;
import com.petitoff.todo.model.Task;
import com.petitoff.todo.model.User;
import com.petitoff.todo.service.TaskService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
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
    public ResponseEntity<TaskDTO> createUserTask(@AuthenticationPrincipal User user, @RequestBody Task task) {
        task.setUser(user);
        TaskDTO savedTaskDTO = taskService.saveTask(task);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedTaskDTO);
    }

    @PutMapping("/{taskId}")
    public ResponseEntity<TaskDTO> updateTask(@PathVariable Long taskId, @RequestBody Task task, @AuthenticationPrincipal User user) {
        TaskDTO updatedTaskDTO = taskService.updateTask(taskId, task, user);
        return ResponseEntity.ok().body(updatedTaskDTO);
    }

    @GetMapping
    public ResponseEntity<List<TaskDTO>> getUserTasks(
            @AuthenticationPrincipal User user,
            @RequestParam(value = "filter", required = false) String filter) {
        List<TaskDTO> taskDTOs = taskService.findByUser(user, filter);
        return ResponseEntity.ok(taskDTOs);
    }

    @DeleteMapping("/{taskId}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long taskId, @AuthenticationPrincipal User user) {
        taskService.deleteTask(taskId, user);
        return ResponseEntity.noContent().build();
    }
}
