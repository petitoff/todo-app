package com.petitoff.todo.service;

import com.petitoff.todo.dto.TaskDTO;
import com.petitoff.todo.model.SubTask;
import com.petitoff.todo.model.Task;
import com.petitoff.todo.model.User;
import com.petitoff.todo.repository.SubTaskRepository;
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
    private final SubTaskRepository subTaskRepository;

    public TaskDTO saveTask(Task task) {
        Task savedTask = taskRepository.save(task);
        return toTaskDTO(savedTask);
    }

    public List<TaskDTO> findByUser(User user, String filter) {
        List<Task> tasks = taskRepository.findByUser(user);
        if (filter != null && filter.equalsIgnoreCase("COMPLETED")) {
            tasks = tasks.stream()
                    .filter(Task::isCompleted)
                    .collect(Collectors.toList());
        }
        return tasks.stream().map(this::toTaskDTO).collect(Collectors.toList());
    }

    private List<TaskDTO> toTaskDTOList(List<Task> tasks) {
        return tasks.stream().map(this::toTaskDTO).collect(Collectors.toList());
    }

    public TaskDTO toTaskDTO(Task task) {
        return new TaskDTO(
                task.getId(),
                task.getTitle(),
                task.getDescription(),
                task.isCompleted(),
                task.getDeadline(),
                toSubTaskDTOList(task.getSubTasks())
        );
    }

    public TaskDTO toSubTaskDTO(SubTask subTask) {
        return new TaskDTO(
                subTask.getId(),
                subTask.getTitle(),
                subTask.getDescription(),
                subTask.isCompleted(),
                subTask.getDeadline(),
                null // SubTasks nie mają swoich podzadań (nie są zagnieżdżone)
        );
    }

    private List<TaskDTO> toSubTaskDTOList(List<SubTask> subTasks) {
        return subTasks.stream().map(this::toSubTaskDTO).collect(Collectors.toList());
    }

    public TaskDTO updateTask(Long taskId, Task task, User user) {
        Optional<Task> existingTaskOptional = taskRepository.findByIdAndUser(taskId, user);
        if (existingTaskOptional.isPresent()) {
            Task existingTask = existingTaskOptional.get();
            existingTask.setTitle(task.getTitle());
            existingTask.setDescription(task.getDescription());
            existingTask.setCompleted(task.isCompleted());
            existingTask.setDeadline(task.getDeadline());

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

    public Task findByIdAndUser(Long id, User user) {
        return taskRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new IllegalStateException("Task not found for the given id and user."));
    }

    public TaskDTO saveSubTask(SubTask subTask) {
        SubTask savedSubTask = subTaskRepository.save(subTask);
        return toSubTaskDTO(savedSubTask);
    }

    public TaskDTO updateSubTask(Long taskId, Long subTaskId, SubTask updatedSubTask, User user) {
        Task parentTask = findByIdAndUser(taskId, user);
        SubTask currentSubTask = findSubTaskByIdAndUser(subTaskId, user);

        if (currentSubTask.getParentTask().equals(parentTask)) {
            updatedSubTask.setId(subTaskId);
            updatedSubTask.setUser(user);
            updatedSubTask.setParentTask(parentTask);
            return saveSubTask(updatedSubTask);
        } else {
            throw new IllegalStateException("Subtask not found for the given parent task and user.");

        }
    }

    public void deleteSubTask(SubTask subTask) {
        subTaskRepository.delete(subTask);
    }

    public SubTask findSubTaskByIdAndUser(Long id, User user) {
        return subTaskRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new IllegalStateException("Subtask not found for the given id and user."));
    }
}
