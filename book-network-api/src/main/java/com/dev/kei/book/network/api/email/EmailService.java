package com.dev.kei.book.network.api.email;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class EmailService {
    private final JavaMailSender javaMailSender;
    private final SpringTemplateEngine templateEngine;

    @Async
    public void sendEmail(String to,
                          String subject,
                          String username,
                          EmailTemplateName emailTemplateName,
                          String confirmationUrl,
                          String activationCode) throws MessagingException {
        // Template name is email HTML design that get from resources folder
        String templateName;
        if (emailTemplateName == null) {
            templateName = "confirm_email";
        } else {
            templateName = emailTemplateName.name();
        }

        // Create mail message
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(
                mimeMessage,
                MimeMessageHelper.MULTIPART_MODE_MIXED,
                StandardCharsets.UTF_8.name()
        );

        // Set properties to use in mail template
        Map<String, Object> properties = new HashMap<>();
        properties.put("username", username);
        properties.put("confirmationUrl", confirmationUrl);
        properties.put("activationCode", activationCode);

        // Create context for thymeleaf and pass properties values
        Context ctx = new Context();
        ctx.setVariables(properties);

        helper.setFrom("dsn@contact.gmail.com");
        helper.setTo(to);
        helper.setSubject(subject);

        String template = templateEngine.process(templateName, ctx);
        helper.setText(template, true);

        javaMailSender.send(mimeMessage);
    }
}
