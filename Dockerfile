# Use OpenJDK 21 as the base image
FROM openjdk:21-jdk-slim

# Set the working directory
WORKDIR /app

# Copy Maven wrapper and project files
COPY .mvn .mvn
COPY mvnw pom.xml ./

# Give execution permission to Maven wrapper
RUN chmod +x mvnw

# Copy the entire project source code
COPY src ./src

# Build the application
RUN ./mvnw clean package -DskipTests

# Copy the built JAR file into the container
COPY target/*.jar app.jar

# Expose the default Spring Boot port
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
