# --- Этап 1: сборка JAR ---
FROM gradle:8.7-jdk21 AS build
WORKDIR /app

# копируем gradle wrapper и файлы конфигурации
COPY gradlew .
COPY gradle gradle
COPY build.gradle settings.gradle ./
RUN chmod +x gradlew

# сначала качаем зависимости (кэшируется)
RUN ./gradlew dependencies --no-daemon

# копируем исходники
COPY src src

# сборка JAR
RUN ./gradlew bootJar -x test --no-daemon


# --- Этап 2: финальный образ ---
FROM eclipse-temurin:21-jdk
WORKDIR /app

# копируем собранный jar
COPY --from=build /app/build/libs/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]