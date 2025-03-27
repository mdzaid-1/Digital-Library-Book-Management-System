FROM maven:3.6.3-jdk-17 AS build
COPY . .
RUN mvn clean package =DskipTests

FROM openjdk:17-jdk-slim
COPY --from=build /target/library-0.0.1-SNAPSHOT.jar /app/library-0.0.1-SNAPSHOT.jar
EXPOSE 8080
ENTRYPOINT [ "java","jar","library.jar" ]