# Cloud Term Project

* *Date Created*: 09 APRIL 2024
* *Last Modification Date*: 09 APRIL 2024


## Authors

* [Shreya Kapoor](sh820878@dal.ca)

## Built With

* [Springboot](https://spring.io/projects/spring-boot) - Java Based Framework
* [Java](https://www.oracle.com/ca-fr/java/technologies/java-se-glance.html) - Programming Language
* [ReactJS](https://react.dev/) - Javascript Library
* [Material UI](https://mui.com/material-ui/) - Design Language

## Introduction

I have developed a web application to facilitate the sharing of personalized postcards among users. The 
primary objective of the application is to provide users with a platform where they can create customized 
postcards online and share it with their loved ones.
### Key Features:
1. Customized Postcard: Users can create personalized postcards by adding their own 
handwritten messages in a document. Additionally, users have the option to upload photos to 
include in their postcards to have a personal touch. 
2. Handwritten Recognition: The application incorporates handwriting recognition technology 
to convert handwritten messages on uploaded documents into text. This feature enhances the 
user experience by allowing handwritten messages to be easily incorporated into the 
postcards.
3. Sharing Functionality: Once a postcard is created, users can share it with their intended 
recipients by generating a shareable link or by clicking on view postcard. This link can be 
sent via email or shared through other messaging platforms

## Services Used
- *COMPUTE* : Elastic Container Service & Elastic Container Registry, Lambda
- *STORAGE* : S3, Relational Database Service
- *NETWORK* : Virtual Private Cloud
- *GENERAL* : SNS, Textract, Elastic Load Balancing

## Architecture Overview
<img width="517" alt="image" src="https://github.com/shreyakapoor08/Personalized-Postcard-Application/assets/31164665/0900540a-2643-4bc2-9ec0-105f7da37513">

In the context of the postcard application, the cloud mechanisms work together to ensure seamless operation 
and delivery of features to users: The frontend of the application is hosted on ECS, providing a user interface based on ReactJS. Elastic Load Balancing (ELB) forwards incoming requests from users to the ECS services, ensuring efficient distribution of traffic and high availability. The backend of the application comprises Springboot applications also deployed on ECS. It is configured to listen to requests on a specific port (8080) and handle incoming requests from the frontend. 
13 Amazon S3 is utilized for storing images and documents uploaded by users, providing durable and scalable storage. Relational Database Service (RDS), specifically Aurora (MySQL), hosts the database for storing structured data related to postcards like the image and document urls and the extracted text. AWS Lambda function is triggered when the images and the documents are uploaded in the S3 bucket and then my lambda function would call the textract and return the extracted text which would be stored in the Aurora-MySQL database. Once we have the extracted text, then we can send the email to the intended user using SNS.


## References of Images used in Project

1. https://www.clubcard.ca/collections/postcards
2. https://riverside.fm/blog/how-to-transcribe-audio-to-text
3. https://boutique.memoria.ca/cdn/shop/files/CARTESPOST_image1.jpg?v=1687892274
4. https://pikbest.com/backgrounds/foliage-and-leaves-vibrant-autumn-adorned-with-raindrops-on-a-dark-background-captivating-seasonal-image-in-yellow-green-tones-featuring-textured-perfect-for-november-postcard_9943900.html 
