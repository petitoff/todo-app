package com.petitoff.todo.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "task")
public class Task {
    @Id
    @GeneratedValue
    private Long id;

    private String title;
    private String description;
    private boolean completed;
    private LocalDateTime deadline;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
