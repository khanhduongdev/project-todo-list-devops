package com.todo.todolist.entity;

public enum Priority {
    URGENT("Gấp"),
    IMPORTANT("Quan trọng"),
    NORMAL("Bình thường");

    private final String displayName;

    Priority(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
