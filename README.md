# Razorpay Billing Block by Appblocks Architecture

This Razorpay billing block provides developers with a generic code block for integrating billing functionality into their applications seamlessly.


## Setup for running using Docker

1. Copy `sample.ngrok.yml` to `ngrok.yml` and add your ngrok auth and IP. Set up an edge custom domain in the ngrok dashboard for Razorpay webhooks.

2. Update the domain in Razorpay with webhooks.

3. Copy `sample.env.function` to `env.function`.

4. Run the following commands:
    ```bash
    docker build .
    docker-compose up
    ```
   This will run the application on port 5000 and tunnel it to the configured ngrok domain.

### Postman Collection

Import the provided Postman collection (`RAZORPAY_BILLING_BLOCK.postman_collection.json`) to access all API collections conveniently in Postman.

## Setup Requirements For Manual Start

1. **Hashicorp Vault**: Ensure Hashicorp Vault is installed and running. Update its configuration in the environment file.

Hashicorp Vault installation reference

machine : https://developer.hashicorp.com/vault/tutorials/getting-started/getting-started-install

2. **Database Setup**: Navigate to `shared` and perform database migration and seeding using the following commands:

```
cd shared && npm run prisma:db:push && npm run prisma:seed:dev
```

## Starting the Block

To start the billing block, run the following command from the root directory:

```
bb start
```

## Razorpay Account

Developers must have an account on Razorpay. Make sure to obtain the necessary API credentials.

## Vault API Usage

Use Vault APIs for saving secrets into Vault. Ensure that the vendor name is passed to all APIs related to Razorpay. Refer to `shared/razorpay/module` for more details.

## Currency Setup

Developers need to set up currencies and default currency using the provided add currency APIs.

## Subscription APIs

Once the setup is complete, developers can try out all APIs related to subscription functionality.

