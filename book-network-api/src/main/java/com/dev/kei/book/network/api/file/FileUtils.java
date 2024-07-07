package com.dev.kei.book.network.api.file;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;

import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Slf4j
public class FileUtils {

    public static String getFilePathFromBytes(byte[] fileBytes, String fileExtension) {
        // Check if the byte array is not null and has some content
        if (fileBytes == null || fileBytes.length == 0) {
            return null;
        }

        FileOutputStream fos = null;
        try {
            // Create a temporary file
            Path tempFile = Files.createTempFile("temp", fileExtension);

            // Write the bytes to the temporary file
            fos = new FileOutputStream(tempFile.toFile());
            fos.write(fileBytes);
            fos.flush();

            // Get the absolute path of the temporary file
            String filePath = tempFile.toAbsolutePath().toString();
            return filePath;
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        } finally {
            try {
                if (fos != null) {
                    fos.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

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
