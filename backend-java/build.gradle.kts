plugins {
  id("org.springframework.boot") version "3.5.0"
  id("io.spring.dependency-management") version "1.1.7"
  id("com.diffplug.spotless") version "6.20.0"
  java
  jacoco
}

group = "com"
version = "0.3.0"

java {
	toolchain {
		languageVersion = JavaLanguageVersion.of(17)
	}
}

spotless {
  java {
    googleJavaFormat("1.15.0")
    target("src/**/*.java")
    importOrder("|javax|java|\\#")
    removeUnusedImports()
    trimTrailingWhitespace()
    endWithNewline()
  }
}

configurations {
	compileOnly {
		extendsFrom(configurations.annotationProcessor.get())
	}
}

repositories {
	mavenCentral()
}

dependencies {
	implementation("org.springframework.boot:spring-boot-starter-web")
  implementation("com.h2database:h2")
  implementation("org.springframework.boot:spring-boot-starter-data-jpa")
	compileOnly("org.projectlombok:lombok")
	annotationProcessor("org.projectlombok:lombok")
	testImplementation("org.springframework.boot:spring-boot-starter-test")
	testRuntimeOnly("org.junit.platform:junit-platform-launcher")
}

jacoco {
  toolVersion = "0.8.10"
}

tasks.withType<Test> {
  useJUnitPlatform()
  finalizedBy(tasks.jacocoTestReport)
}

tasks.jacocoTestReport {
  dependsOn(tasks.test)
  reports {
    xml.required.set(true)
    html.required.set(true)
    csv.required.set(false)
  }
}

tasks.named<JacocoCoverageVerification>("jacocoTestCoverageVerification") {
  dependsOn(tasks.test)
  violationRules {
    rule {
      limit {
        counter = "INSTRUCTION"
        value = "COVEREDRATIO"
        minimum = "0.80".toBigDecimal()
      }
    }
  }
}
