package com.cloud.postcardbackend.controller;

import com.amazonaws.services.sns.AmazonSNS;
import com.amazonaws.services.sns.model.PublishRequest;
import com.cloud.postcardbackend.entity.EmailEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class EmailController {

    @Autowired
    private AmazonSNS amazonSNS;

    @Value("${frontendHost}")
    private String frontendHost;

    @Value("${frontendPort}")
    private String frontendPort;

    @Value("${snsTopic}")
    private  String snsTopic;

    @PostMapping("/send-email")
    public void sendEmail(@RequestBody EmailEntity emailEntity) {
        System.out.println(("Received request to send email to: " + emailEntity.getEmail()));
        String email = emailEntity.getEmail();
        String postId = emailEntity.getPostId();
        String postcardLink = "http://" + frontendHost + ":" + frontendPort + "/postcard/" + postId;

        // Construct the email message
        String message = "Here is the postcard link: " + postcardLink;
        System.out.println(("Constructed email message: "+ message));

        try{
            // Publish the message to the SNS topic
            PublishRequest request = new PublishRequest()
                    .withTopicArn(snsTopic)
                    .withMessage(message);
            amazonSNS.publish(request);
        } catch (Exception e){
            System.out.println("Failed to send email to {}: {}" + email + e.getMessage());
        }


    }
}

