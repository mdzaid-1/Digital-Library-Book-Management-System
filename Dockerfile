# Stage 1: Build the application
FROM openjdk:21-jdk-slim AS builder
WORKDIR /app

# Copy Maven wrapper and project files
COPY .mvn .mvn
COPY mvnw .
COPY pom.xml .

# Give execution permission to Maven wrapper
RUN chmod +x mvnw

# Copy the entire project source code
COPY src ./src

# Build the application
RUN ./mvnw clean package -DskipTests

# Stage 2: Run the application
FROM openjdk:21-jdk-slim
WORKDIR /app

# Copy the built JAR file from the builder stage
COPY --from=builder /app/target/Digital-Library-Book-Management-System-0.0.1-SNAPSHOT.jar app.jar

# Expose the default Spring Boot port
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
