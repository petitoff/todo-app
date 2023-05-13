package com.todoapp.todo.controller;

import com.todoapp.todo.entity.Task;
import com.todoapp.todo.repository.TaskRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/")
public class TaskController {
    private final TaskRepository taskRepository;

    public TaskController(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @GetMapping("/tasks")
    public List<Task> getAllTasks(){
        return taskRepository.findAll();
    }

    @PostMapping("/task")
    public Task createTask(@RequestBody Task task) {
        return taskRepository.save(task);
    }
}