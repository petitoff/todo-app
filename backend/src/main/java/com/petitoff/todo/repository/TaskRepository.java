package com.petitoff.todo.repository;

import com.petitoff.todo.model.Task;
import com.petitoff.todo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByUser(User user);

    @Query("SELECT t FROM Task t WHERE t.id = :taskId AND t.user = :user")
    Optional<Task> findByIdAndUser(@Param("taskId") Long taskId, @Param("user") User user);
}
