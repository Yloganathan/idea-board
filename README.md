# idea-board
Deploying a web app using Lambda, API Gateway, DynamoDB and S3 with Serverless Framework

[Accompanying article](https://medium.com/@yloganathan/Deploying-a-web-app-using-Lambda,-API-Gateway,-DynamoDB-and-S3-with-Serverless-Framework-40e23ac04206)

# Commands
## Deploy AWS resources
Make sure you have an AWS account with a profile that has right permissions to create resources needed for this demo. 

1. `cd lambda`
2. Install serverless `npm install -g serverless`
3. `sls deploy` - this command will create S3 buckets, Dynamo-db table, Lambda and ApiGateway. NOTE: This might cause charges to your AWS account. Make sure to clean up after you are done.


## Deploy Static Site
1. `cd app-client`
2. Create the production site `npm run build`
3. Copy the site to S3 bucket. `aws s3 sync ./build s3://tp-idea-board`


## Clean up AWS resources
1. Clean up s3 bucket `aws s3 rm s3://tp-idea-board --recursive
2. Clean up resources `sls remove`

