package com.petitoff.todo.repository;

import com.petitoff.todo.model.SubTask;
import com.petitoff.todo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface SubTaskRepository extends JpaRepository<SubTask, Long> {

    @Query("SELECT st FROM SubTask st WHERE st.id = :subTaskId AND st.user = :user")
    Optional<SubTask> findByIdAndUser(@Param("subTaskId") Long subTaskId, @Param("user") User user);
}