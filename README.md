# deals-api-demo

**Simple project for demonstrate "Deals" API  implementation for NodeJS.**

## Installation

```
git clone https://github.com/mushu-maxy/deals-api-demo.git
cd ./deals-api-demo
npm install
```

##  Run test
You must register on host application before run test

```
set deals_url=https://deals.dealssign.com
set user=user name
set pass=your password
set org_code=00000000
set signer=eMailSigner1@host.ua
set signer2=eMailSigner2@host.ua
set data_file=./testData/tst.PDF
set signature=./testData/tst.PDF.p7s
set signature2=./testData/tst.PDF.p7s

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
