# Use an official OpenJDK runtime as a parent image
FROM openjdk:17-jdk-slim

# Set the working directory
WORKDIR /library

# Copy the application JAR file into the container
COPY target/Digital-Library-Book-Management-System-0.0.1-SNAPSHOT.jar library.jar

# Expose the application port
EXPOSE 8080

# Command to run the application
ENTRYPOINT ["java", "-jar", "library.jar"]