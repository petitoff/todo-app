# First stage: Build the application
FROM maven:3.8.2-openjdk-17-slim AS build
WORKDIR /workspace/app
COPY pom.xml .
COPY src src
RUN mvn package -DskipTests

# Second stage: Run the application
FROM openjdk:17
VOLUME /tmp
COPY --from=build /workspace/app/target/*.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
EXPOSE 8080