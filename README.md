# Razorpay Billing Block by Appblocks Architecture

This Razorpay billing block provides developers with a generic code block for integrating billing functionality into their applications seamlessly.

## Setup Requirements

1. **Hashicorp Vault**: Ensure Hashicorp Vault is installed and running. Update its configuration in the environment file.

Hashicorp Vault installation reference

machine : https://developer.hashicorp.com/vault/tutorials/getting-started/getting-started-install

docker : https://hub.docker.com/_/vault/

2. **Database Setup**: Navigate to `shared/prisma` and perform database migration and seeding using the following commands:

```
cd shared/prisma
prisma migrate dev
npm run seed
```

## Starting the Block

To start the billing block, run the following command from the root directory:

```
bb start
```

## Razorpay Account

Developers must have an account on Razorpay. Make sure to obtain the necessary API credentials.

## Postman Collection

Import the provided Postman collection (`RAZORPAY_BILLING_BLOCK.postman_collection.json`) to access all API collections conveniently in Postman.

## Vault API Usage

Use Vault APIs for saving secrets into Vault. Ensure that the vendor name is passed to all APIs related to Razorpay. Refer to `shared/razorpay/module` for more details.

## Currency Setup

Developers need to set up currencies and default currency using the provided add currency APIs.

## Subscription APIs

Once the setup is complete, developers can try out all APIs related to subscription functionality.
