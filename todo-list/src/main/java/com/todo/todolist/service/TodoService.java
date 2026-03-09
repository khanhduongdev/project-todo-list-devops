package com.todo.todolist.service;

import com.todo.todolist.dto.TodoDTO;
import com.todo.todolist.entity.Priority;
import com.todo.todolist.entity.Todo;
import com.todo.todolist.repository.TodoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TodoService {

    private final TodoRepository todoRepository;

    public List<TodoDTO> getAllTodos(Boolean completed, Priority priority, String search) {
        List<Todo> todos;
        if (completed != null && priority != null) {
            todos = todoRepository.findByCompletedAndPriority(completed, priority);
        } else if (completed != null) {
            todos = todoRepository.findByCompleted(completed);
        } else if (priority != null) {
            todos = todoRepository.findByPriority(priority);
        } else if (search != null && !search.isEmpty()) {
            todos = todoRepository.findByTitleContainingIgnoreCase(search);
        } else {
            todos = todoRepository.findAll();
        }
        return todos.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    @Transactional
    public TodoDTO createTodo(TodoDTO todoDTO) {
        Todo todo = Todo.builder()
                .title(todoDTO.getTitle())
                .description(todoDTO.getDescription())
                .priority(todoDTO.getPriority())
                .dueDate(todoDTO.getDueDate())
                .completed(false)
                .build();
        return convertToDTO(todoRepository.save(todo));
    }

    @Transactional
    public TodoDTO updateTodo(Long id, TodoDTO todoDTO) {
        Todo todo = todoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy công việc với ID: " + id));
        
        todo.setTitle(todoDTO.getTitle());
        todo.setDescription(todoDTO.getDescription());
        todo.setCompleted(todoDTO.isCompleted());
        todo.setPriority(todoDTO.getPriority());
        todo.setDueDate(todoDTO.getDueDate());
        
        return convertToDTO(todoRepository.save(todo));
    }

    @Transactional
    public void deleteTodo(Long id) {
        todoRepository.deleteById(id);
    }

    @Transactional
    public void deleteMultiple(List<Long> ids) {
        todoRepository.deleteAllById(ids);
    }

    @Transactional
    public void markMultipleAsCompleted(List<Long> ids) {
        List<Todo> todos = todoRepository.findAllById(ids);
        todos.forEach(todo -> todo.setCompleted(true));
        todoRepository.saveAll(todos);
    }

    private TodoDTO convertToDTO(Todo todo) {
        return TodoDTO.builder()
                .id(todo.getId())
                .title(todo.getTitle())
                .description(todo.getDescription())
                .completed(todo.isCompleted())
                .priority(todo.getPriority())
                .dueDate(todo.getDueDate())
                .createdAt(todo.getCreatedAt())
                .build();
    }
}
