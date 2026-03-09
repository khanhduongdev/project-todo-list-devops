package com.todo.todolist.dto;

import com.todo.todolist.entity.Priority;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TodoDTO {
    private Long id;

    @NotBlank(message = "Tiêu đề không được để trống")
    private String title;

    private String description;
    private boolean completed;

    @NotNull(message = "Mức độ ưu tiên không được để trống")
    private Priority priority;

    private LocalDate dueDate;
    private LocalDateTime createdAt;
}
