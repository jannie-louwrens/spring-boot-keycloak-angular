# Grocery Shop

![Grocery Shop](images/shop.ico?raw=true "Grocery Shop")

This is the source code for my article on [how to securing a Angular frontend and a Spring Boot backend using Keycloak](https://www.linkedin.com/pulse/securing-java-rest-services-keycloak-part-4-jannie-louwrens/).

## Requirements

  - Keycloak 8.0.1.Final
  - Java 8
  - Spring Boot 2.2.2.RELEASE
  - Angular 8.2.14
  - Node.js 12.13.1
  - Yarn 1.19.2

## Installing and Configuring Keycloak
Download the standalone server distribution from the [Keycloak website](https://www.keycloak.org/), unpack it and start the server. Follow the [Getting Started](https://www.keycloak.org/docs/latest/getting_started/index.html#creating-the-admin-account) instructions to setup the administrator account.

There are two ways to configure the Keycloak realm for this application:
1. Import the [demo-realm.json](keycloak/demo-realm.json)
2. Follow the **Create Realm, Client and Users** guide

### Create Realm, Client and Users
>This section is only for those who wish to manually configure the Keycloak server.

#### 1. Create a realm
Follow the [create a realm](https://www.keycloak.org/docs/latest/getting_started/index.html#_create-realm) instructions and create a realm called: `demo`
#### 2. Create a client
Follow steps 1- 3 of the [creating and registering](https://www.keycloak.org/docs/latest/getting_started/index.html#creating-and-registering-the-client) guide and create a new client called: `my-app`

In the **Valid Redirect URIs** field enter the two URLs: `http://localhost:8081/*` and `http://localhost:4200/*`
> Note the asterisk (*) after the urls!

And in the **Web Origins** fields simply add a `*` (asterisk)
#### 3. Create roles and assign permissions
In the Keycloak administration console create two new roles, named: `user` and `admin`
Edit the `admin` role and enable the **Composite Roles** flag and choose `realm-management` from the **Client Roles** droplist. 
Highlight the `view-users` option in the **Available Roles** block and then click on the "Add selected" button.
#### 4. Create the following users:
| Username | Password | First Name | Last Name | Email | Roles |
| ------ | ------ | ------ | ------ | ------ | ------ |
| metalgear | password | Bob | Knight | `bob.knight@example.com` | ADMIN, USER |
| grilldad | password | Jim | Long | `jim.long@example.com` | USER |
| mythbuster | password | Kate | Wilson | `kate.wilson@example.com` | USER |
| spacehunter | password | Victor | Brown | `victor.brown@example.com` | USER |
> It is most important that you enter the username as provided in the table, because they are used in the Spring backend to link the customer orders with the user.

## Start the Spring Boot Application
Open a terminal and change to the directory where the code was checked out.
Next change to the `backend` directory and execure the following maven command:
```
mvn clean package spring-boot:run
```
## Build and Run the Angular Frontend Application
Open another terminal and change to the directory where the code was checked out.
Next change to the `frontend` directory abd execute the following commands:
```
yarn install
yarn start
```
## View the Application
Open an internet browser and navigate to the url: `http://localhost:4200`

You will be presented with the Keycloak login screen:

![Keycloak Login](images/keycloak_login.png?raw=true "Keycloak Login")

Enter one of the username and password combination created earlier to sign in. 

After a successful login you will see the product catalog page:
![Landing Page](images/shopapp.png?raw=true "Landing Page")
