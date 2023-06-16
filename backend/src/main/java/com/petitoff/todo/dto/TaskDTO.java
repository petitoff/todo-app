package com.petitoff.todo.dto;

import java.time.LocalDateTime;
import java.util.List;

public record TaskDTO(Long id, String title, String description, boolean completed, LocalDateTime deadline,
                      List<TaskDTO> subTasks) {
}