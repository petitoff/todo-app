package com.todoapp.todo.service;

import com.todoapp.todo.entity.User;
import com.todoapp.todo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public User authenticateUser(User user) {
        Optional<User> storedUserOptional = userRepository.findByEmail(user.getEmail());
        if (storedUserOptional.isPresent()) {
            User storedUser = storedUserOptional.get();
            if (user.getPassword().equals(storedUser.getPassword())) {
                return storedUser;
            }
        }
        return null;
    }
}
