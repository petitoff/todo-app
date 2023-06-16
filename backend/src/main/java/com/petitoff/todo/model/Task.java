package com.petitoff.todo.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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

    @ToString.Exclude
    @OneToMany(mappedBy = "parentTask", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SubTask> subTasks = new ArrayList<>();

    public void addSubTask(SubTask subTask) {
        subTasks.add(subTask);
        subTask.setParentTask(this);
    }

    public void removeSubTask(SubTask subTask) {
        subTasks.remove(subTask);
        subTask.setParentTask(null);
    }
}