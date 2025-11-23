package com.announcementservice.authservice.config;

import liquibase.Liquibase;
import liquibase.database.Database;
import liquibase.database.DatabaseFactory;
import liquibase.database.jvm.JdbcConnection;
import liquibase.resource.ClassLoaderResourceAccessor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.liquibase.LiquibaseProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.DependsOn;

import javax.sql.DataSource;
import java.sql.Connection;

@Configuration
public class LiquibaseConfig {

    @Value("${spring.liquibase.change-log}")
    private String changeLog;

    @Bean
    @DependsOn("entityManagerFactory")
    public Liquibase liquibase(DataSource dataSource) throws Exception {
        try (Connection connection = dataSource.getConnection()) {
            Database database = DatabaseFactory.getInstance()
                    .findCorrectDatabaseImplementation(new JdbcConnection(connection));
            
            Liquibase liquibase = new Liquibase(
                    changeLog,
                    new ClassLoaderResourceAccessor(),
                    database
            );
            
            liquibase.update("");
            return liquibase;
        }
    }
}

