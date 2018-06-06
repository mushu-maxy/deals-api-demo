# deals-api-demo

**Demonstration of using "Deals" API from NodeJS**

## Setup

```
git clone https://github.com/mushu-maxy/deals-api-demo.git
cd ./deals-api-demo
npm install
```

##  Run test

### Prerequirements
The user must be registered in the Deals system.
To register user use [Deals registration form](https://deals.dealssign.com/registerUser.html)

User name and password you enter during registration 

### Tests

Set environment variable deals_url to the Delas site address.

Set `user` `pwd` and `org_code` environment variables to values you enter during registration

```cmd
set deals_url=https://deals.dealssign.com
set user=yurUserName
set pwd=yourPassword
set org_code=YourOrganizationCode
```

Run a tests

```
npm run test
```
