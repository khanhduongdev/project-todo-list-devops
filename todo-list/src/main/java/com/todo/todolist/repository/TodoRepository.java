package com.todo.todolist.repository;

import com.todo.todolist.entity.Todo;
import com.todo.todolist.entity.Priority;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {
    List<Todo> findByCompleted(boolean completed);
    List<Todo> findByPriority(Priority priority);
    List<Todo> findByTitleContainingIgnoreCase(String title);
    List<Todo> findByCompletedAndPriority(boolean completed, Priority priority);
}
