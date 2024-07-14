# Variables
SPRING_BOOT_DIR=book-network-api
ANGULAR_DIR=book-network-ui
SPRING_BOOT_JAR=$(SPRING_BOOT_DIR)/target/book-network-api-0.0.1-SNAPSHOT.jar
SPRING_BOOT_MAIN_CLASS=com.dev.kei.book.network.api.BookNetworkApiApplication
ANGULAR_BUILD_DIR=$(ANGULAR_DIR)/dist
SPRING_BOOT_PID=spring_boot.pid
# This is not use for unconsistence PID capture
ANGULAR_PID=angular.pid

# Targets
.PHONY: all clean backend frontend run stop stop-backend stop-frontend help

all: backend frontend

# Clean up all build artifacts
clean:
	@echo "Cleaning up..."
	@cd $(SPRING_BOOT_DIR) && ./mvnw clean
	@cd $(ANGULAR_DIR) && npm run clean || rm -rf $(ANGULAR_BUILD_DIR)

# Build the Spring Boot project
backend:
	@echo "Building Spring Boot project..."
	@cd $(SPRING_BOOT_DIR) && ./mvnw clean package

# Build the Angular project
frontend:
	@echo "Building Angular project..."
	@cd $(ANGULAR_DIR) && npm install && npm run build

# Run both Spring Boot and Angular projects
run: backend frontend
	@echo "Running Spring Boot project..."
	@java -jar $(SPRING_BOOT_JAR) & echo $$! > $(SPRING_BOOT_PID)
	@echo "Running Angular project..."
	@cd $(ANGULAR_DIR) && npm start &

# Stop the Spring Boot and Angular projects
stop: stop-backend stop-frontend
	@echo "Services stopped successfully."
	@exit 0

# Stop the Frontend project
stop-frontend:
	@echo "Stopping Angular project..."
	@PID=`lsof -i :4200 -t`; \
	if [ -n "$$PID" ]; then \
		kill $$PID && echo "Angular project stopped."; \
	else \
		echo "Angular project is not running."; \
	fi

# Stop the Spring Boot project
stop-backend:
	@echo "Stopping Spring Boot project..."
	@if [ -f $(SPRING_BOOT_PID) ]; then kill `cat $(SPRING_BOOT_PID)` 2>/dev/null && rm -f $(SPRING_BOOT_PID) || echo "Failed to stop Spring Boot project."; else echo "Spring Boot project is not running."; fi

# Start the Angular project (for development)
start-frontend:
	@echo "Starting Angular project..."
	@cd $(ANGULAR_DIR) && npm start

# Start the Spring Boot project (for development)
start-backend:
	@echo "Starting Spring Boot project..."
	@cd $(SPRING_BOOT_DIR) && ./mvnw spring-boot:run

# Help message
help:
	@echo "Usage:"
	@echo "  make all            Build both Spring Boot and Angular projects"
	@echo "  make clean          Clean both projects"
	@echo "  make backend        Build Spring Boot project"
	@echo "  make frontend       Build Angular project"
	@echo "  make run            Run both projects"
	@echo "  make stop           Stop both projects"
	@echo "  make stop-backend   Stop Spring Boot project"
	@echo "  make stop-frontend  Stop Angular project"
	@echo "  make start-frontend Start Angular project for development"
	@echo "  make start-backend  Start Spring Boot project for development"
	@echo "  make help           Show this help message"
