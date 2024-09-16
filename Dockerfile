# Use an official OpenJDK runtime as a parent image
FROM openjdk:17-jdk-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the application JAR file to the container
COPY target/digital-ebank_spring.jar /app/app.jar

# Expose the port your Spring Boot application listens on
EXPOSE 8090

# Define environment variables for PostgreSQL connection
ENV SPRING_DATASOURCE_URL=jdbc:postgresql://postgres-db:5432/digital_bank
ENV SPRING_DATASOURCE_USERNAME=postgres
ENV SPRING_DATASOURCE_PASSWORD=ehtp

# Run the Spring Boot application
ENTRYPOINT ["java", "-jar", "app.jar"]
