package com.petitoff.todo.model;

import com.petitoff.todo.model.Task;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "sub_task")

public class SubTask {
    @Id
    @GeneratedValue
    private Long id;

    private String title;
    private String description;
    private boolean completed;
    private LocalDateTime deadline;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ToString.Exclude
    @ManyToOne
    @JoinColumn(name = "parent_task_id")
    private Task parentTask;
}