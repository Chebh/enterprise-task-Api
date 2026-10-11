package com.example.enterprise_task_Api;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/ai")
public class AiController {

    @PostMapping("/suggest-tasks")
    public ResponseEntity<Map<String, Object>> suggestTasks(@RequestBody Map<String, String> request) {
        String topic = request.getOrDefault("topic", "productivity");

        // Simple rule-based suggestions for now (we can later connect to a real AI API)
        List<String> suggestions = switch (topic.toLowerCase()) {
            case "work", "office" -> List.of(
                    "Prepare weekly report",
                    "Schedule team meeting",
                    "Review project timeline",
                    "Reply to important emails",
                    "Update task board"
            );
            case "study", "learning" -> List.of(
                    "Review Java notes",
                    "Practice Spring Boot exercises",
                    "Watch one technical video",
                    "Solve 3 coding problems",
                    "Write summary of what you learned"
            );
            case "personal", "life" -> List.of(
                    "Go for a walk",
                    "Plan weekly meals",
                    "Call a family member",
                    "Clean workspace",
                    "Read for 30 minutes"
            );
            default -> List.of(
                    "Break down your main goal into smaller tasks",
                    "Set priority for pending items",
                    "Review progress from last week",
                    "Plan the next 3 important actions",
                    "Eliminate one low-value task"
            );
        };

        return ResponseEntity.ok(Map.of(
                "topic", topic,
                "suggestions", suggestions
        ));
    }
}