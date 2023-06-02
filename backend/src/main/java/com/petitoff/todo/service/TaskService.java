package com.petitoff.todo.service;

import com.petitoff.todo.model.Task;
import com.petitoff.todo.model.User;
import com.petitoff.todo.repository.TaskRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class TaskService {
    private final TaskRepository taskRepository;

    public Task saveTask(Task task) {
        return taskRepository.save(task);
    }

    public List<Task> findByUser(User user) {
        return taskRepository.findByUser(user);
    }

    public Task updateTask(Long taskId, Task task, User user) {
        Optional<Task> existingTaskOptional = taskRepository.findByIdAndUser(taskId, user);
        if (existingTaskOptional.isPresent()) {
            Task existingTask = existingTaskOptional.get();
            existingTask.setTitle(task.getTitle());
            existingTask.setDescription(task.getDescription());
            existingTask.setCompleted(task.isCompleted());
            return taskRepository.save(existingTask);
        }
        throw new IllegalStateException("Task not found for the given user.");
    }

    public void deleteTask(Long taskId, User user) {
        Optional<Task> existingTaskOptional = taskRepository.findByIdAndUser(taskId, user);
        if (existingTaskOptional.isPresent()) {
            taskRepository.delete(existingTaskOptional.get());
        } else {
            throw new IllegalStateException("Task not found for the given user.");
        }
    }
}
