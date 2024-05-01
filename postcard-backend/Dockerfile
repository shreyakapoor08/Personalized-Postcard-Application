FROM maven:3.8.3-openjdk-17 AS springboot_build
COPY . /home/app
WORKDIR /home/app
ENV FRONTEND_HOST=localhost
ENV FRONTEND_PORT=3000
ENV SNS_TOPIC=arn:aws:sns:us-east-1:339712816963:postcard-sns
ENV DATABASE_HOSTNAME="database-1.cluster-c1ywe8aogzqa.us-east-1.rds.amazonaws.com"
RUN mvn -f /home/app/pom.xml clean install
RUN dir -s

FROM openjdk:17
LABEL authors="Shreya"
COPY --from=springboot_build /home/app/target/postcard-backend.jar /app/postcard-backend.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app/postcard-backend.jar"]