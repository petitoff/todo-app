package com.petitoff.todo.service;

import com.petitoff.todo.dto.TaskDTO;
import com.petitoff.todo.model.Task;
import com.petitoff.todo.model.User;
import com.petitoff.todo.repository.TaskRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class TaskService {
    private final TaskRepository taskRepository;

    public TaskDTO saveTask(Task task) {
        Task savedTask = taskRepository.save(task);
        return toTaskDTO(savedTask);
    }

    public List<TaskDTO> findByUser(User user) {
        List<Task> tasks = taskRepository.findByUser(user);
        return tasks.stream()
                .map(this::toTaskDTO)
                .collect(Collectors.toList());
    }

    public TaskDTO toTaskDTO(Task task) {
        return new TaskDTO(
                task.getId(),
                task.getTitle(),
                task.getDescription(),
                task.isCompleted(),
                task.getDeadline()
        );
    }

    public TaskDTO updateTask(Long taskId, Task task, User user) {
        Optional<Task> existingTaskOptional = taskRepository.findByIdAndUser(taskId, user);
        if (existingTaskOptional.isPresent()) {
            Task existingTask = existingTaskOptional.get();
            existingTask.setTitle(task.getTitle());
            existingTask.setDescription(task.getDescription());
            existingTask.setCompleted(task.isCompleted());

            Task savedTask = taskRepository.save(existingTask);
            return toTaskDTO(savedTask);
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
