# Stage 1: Build the application
FROM gradle:8.14-jdk17 AS build
WORKDIR /app

# Copy default Gradle files to the image
COPY build.gradle settings.gradle ./
COPY src src

# Build the application without running tests
RUN gradle build -x test

# Stage 2: Run the application
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app

# Copy the built jar file from the previous stage
COPY --from=build /app/build/libs/*.jar app.jar

# Expose port 8080
EXPOSE 8080

# Run the jar file
ENTRYPOINT ["java", "-jar", "app.jar"]
