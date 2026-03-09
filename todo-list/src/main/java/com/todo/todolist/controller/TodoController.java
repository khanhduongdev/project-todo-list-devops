package com.todo.todolist.controller;

import com.todo.todolist.dto.TodoDTO;
import com.todo.todolist.entity.Priority;
import com.todo.todolist.service.TodoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/todos")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173") // Cấu hình CORS cho Vite
public class TodoController {

    private final TodoService todoService;

    @GetMapping
    public List<TodoDTO> getAllTodos(
            @RequestParam(required = false) Boolean completed,
            @RequestParam(required = false) Priority priority,
            @RequestParam(required = false) String search) {
        return todoService.getAllTodos(completed, priority, search);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public TodoDTO createTodo(@Valid @RequestBody TodoDTO todoDTO) {
        return todoService.createTodo(todoDTO);
    }

    @PutMapping("/{id}")
    public TodoDTO updateTodo(@PathVariable Long id, @Valid @RequestBody TodoDTO todoDTO) {
        return todoService.updateTodo(id, todoDTO);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteTodo(@PathVariable Long id) {
        todoService.deleteTodo(id);
    }

    @PostMapping("/bulk-delete")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteMultiple(@RequestBody List<Long> ids) {
        todoService.deleteMultiple(ids);
    }

    @PostMapping("/bulk-complete")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void markMultipleAsCompleted(@RequestBody List<Long> ids) {
        todoService.markMultipleAsCompleted(ids);
    }
}
