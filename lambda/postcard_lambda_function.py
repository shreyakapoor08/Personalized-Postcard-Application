import boto3
import mysql.connector
import os
# Initialize S3 and Textract clients
s3 = boto3.client('s3')
textract_client = boto3.client('textract')

# Database configuration
db_host = os.environ['DATABASE_HOST']
db_user = 'username'
db_password = 'password'
db_name = os.environ['DATABASE_NAME']#'db_postcard'

def lambda_handler(event, context):
    try:
        # Extract bucket and key from the S3 event
        print(event)
        s3_bucket = event['Records'][0]['s3']['bucket']['name']
        s3_key = event['Records'][0]['s3']['object']['key']
        document_url = f"https://{s3_bucket}.s3.amazonaws.com/{s3_key}"
        # Get metadata of the uploaded document
        metadata = s3.head_object(Bucket=s3_bucket, Key=s3_key)
        print('s3_bucket', s3_bucket);
        print('document_url',document_url);
        
        
        # Configure parameters for Textract
        textract_params = {
            'Document': {
                'S3Object': {
                    'Bucket': s3_bucket,
                    'Name': s3_key
                }
            }
        }
        
        # Call Textract to detect text in the document
        response = textract_client.detect_document_text(**textract_params)
        print('response', response);
        
        # Extract text from Textract response
        extracted_text = ''
        for item in response['Blocks']:
            if item['BlockType'] == 'LINE':
                extracted_text += item['Text'] + '\n'
        
        # Log the extracted text
        print("Extracted Text:")
        print(extracted_text)
        
        print("Connecting to RDS instance...")
        print(f"Host: {db_host}, Database: {db_name}, User: {db_user}")
        
        # Insert extracted text into the database
        conn = mysql.connector.connect(host=db_host, user=db_user, password=db_password, database=db_name)
        if conn.is_connected():
            print("Connection to RDS instance successful")
        else:
            print("Connection to RDS instance failed")
        cursor = conn.cursor()
        update_query = "UPDATE `postcard-media` SET extracted_text = %s WHERE document_url = %s"
        cursor.execute(update_query, (extracted_text, document_url))
        conn.commit()
        conn.close()
        
        # Return success
        return {
            'statusCode': 200,
            'body': 'Text extraction and database update successful.'
        }
    except Exception as e:
        # Log any errors that occur
        print("Error:", e)
        raise e
