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
set pass=yourPassword
set org_code=YourOrganizationCode
```
set signer=eMailSigner1@host.ua
set signer2=eMailSigner2@host.ua
set data_file=./testData/tst.PDF
set signature=./testData/tst.PDF.p7s
set signature2=./testData/tst.PDF.p7s

Run a tests

```
npm run test
```

 Where
- **deals_url** - URL address of deals
- **user** - Login of registered user
- **pass** - Password
- **org_code** - Code (EDRPO) of organization
- **data_file** - Path to data file

 Parameters for extended example
- **signer** - First signer login
- **signer2** - Second signer login
- **signature** - Path to signature 1 file
- **signature2** - Path to signature 2 file
- **org_code_for_invite** Code (EDRPO) of organization for invite
