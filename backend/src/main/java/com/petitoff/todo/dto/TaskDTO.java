package com.petitoff.todo.dto;

import java.time.LocalDateTime;

public record TaskDTO(Long id, String title, String description, LocalDateTime deadline) {
}