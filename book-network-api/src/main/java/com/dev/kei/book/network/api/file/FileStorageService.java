package com.dev.kei.book.network.api.file;

import jakarta.annotation.Nonnull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
@Slf4j
@RequiredArgsConstructor
public class FileStorageService {
    @Value("${application.security.file.upload-dir}")
    private String uploadDir;

    // Check bookId is actually need for this method
    public String saveFile(
            @Nonnull MultipartFile file,
            @Nonnull Long bookId,
            @Nonnull Long userId) {
        final String fileUploadSubPath = "users" + File.separator + userId;
        return uploadFile(file, fileUploadSubPath);
    }

    private String uploadFile(@Nonnull MultipartFile file, @Nonnull String fileUploadSubPath) {
        final String completeUploadPath = uploadDir + File.separator + fileUploadSubPath;

        File targetFolder = new File(completeUploadPath);

        if (!targetFolder.exists()) {
            boolean folderCreated = targetFolder.mkdirs();
            if (!folderCreated) {
                log.warn("Filed to create the target folder: {}", completeUploadPath);
                return null;
            }
        }

        // Get file extension
        final String fileExtension = getFileExtension(file.getOriginalFilename());
        if (fileExtension.isEmpty()) {
            return null;
        }
        // Setup complete file path
        final String targetFilePath = completeUploadPath + File.separator + System.currentTimeMillis() + "." + fileExtension;
        Path targetPath = Paths.get(targetFilePath);

        try {
            Files.write(targetPath, file.getBytes());
            log.info("File saved to: {}", targetFilePath);
            return targetFilePath;
        } catch (IOException e) {
            log.error("File was not saved", e);
        }
        return null;
    }

    private String getFileExtension(String fileName) {
        // Check file name is not null, if null then return empty string
        if (fileName == null || fileName.isEmpty()) {
            return "";
        }

        // Get last dot index e.g name.file.jpg
        // so the last dot index is dot before file extension
        int lastDotIndex = fileName.lastIndexOf(".");
        if (lastDotIndex == -1) {
            return "";
        }

        // Return file extension
        return fileName.substring(lastDotIndex + 1).toLowerCase();
    }
}
