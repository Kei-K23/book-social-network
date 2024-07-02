package com.dev.kei.book.network.api.file;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

@Slf4j
public class FileUtils {
    public static byte[] readFileFromLocation(String fileDir) {
        // Check file path dir is not blank
        if (StringUtils.isBlank(fileDir)) {
            return null;
        }
        try {
            // Return reading file byes
            return Files.readAllBytes(Paths.get(fileDir));
        } catch (IOException e) {
            log.error("Failed to read file from location: {}", fileDir, e);
        }
        return null;
    }
}
