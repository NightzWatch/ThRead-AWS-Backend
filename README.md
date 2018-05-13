# ThRead AWS Lambda Functions

## Getting Started

### Install NPM Dependencies

```
cd functions/chatkit;
npm install;
```

### Install APEX

Apex lets you build, deploy, and manage AWS Lambda functions with ease. With Apex you can use languages that are not natively supported by AWS Lambda, such as Golang, through the use of a Node.js shim injected into the build. A variety of workflow related tooling is provided for testing functions, rolling back deploys, viewing metrics, tailing logs, hooking into the build system and more.

```
curl https://raw.githubusercontent.com/apex/apex/master/install.sh | sudo sh
```

### Authenticating

Prefered method for authentication is via environment variables, you must specify the following:

- AWS_ACCESS_KEY_ID AWS account access key
- AWS_SECRET_ACCESS_KEY AWS account secret key
- AWS_REGION AWS region

Please ask Jordan Rios for the keys in order to deploy code updates to AWS

### Deployments

Run the following code after code merge. (PS. Will look into a GitHub integration to this automatically)

```
apex deploy
```


