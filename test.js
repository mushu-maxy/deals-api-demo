/*
* Created by xmax on 27.04.2018
*/
console.log('Deals API test - start')
const {DealsAPI} = require('@unitybase/deals-api')
const fs = require('fs')
const dealsUrl = process.env.deals_url || 'https://deals.dealssign.com'
const user = process.env.user
const pass = process.env.pwd
const orgCode = process.env.org_code

console.log('Deals URL:' + dealsUrl)
console.log('User:' + user)
console.log('Password:' + pass)
console.log('Organization code:' + orgCode)

const api = new DealsAPI({dealsUrl: dealsUrl, login: user, password: pass})
let dateFom = new Date()
dateFom.setFullYear(dateFom.getFullYear() - 1)
let docID

console.log('Get organization ID')
api.getOrganization({code: orgCode}).then(res => {
  console.log('Organization ID:' + res.ID)
  console.log('Get your deals list')
  return api.getDealsList({orgID: res.ID, dateFrom: dateFom, dateTo: new Date(), appendArchive: true})
})
  .then(res => {
    console.log('Deals list:')
    console.log(JSON.stringify(res, null, ' '))
    console.log('Add new deal')
    return api.addNewDeal({name: 'deal for test1', description: (new Date()).toLocaleString()})
  })
  .then(res => {
    console.log('Deal ID: ' + res.ID)
    console.log('Add new document')
    return api.addDocument({dealID: res.ID, document: {name: 'test.js', docType: 'ONE_SIDE_SIGNING', requireConfirm: false, notifyWhenComplete: true}})
  })
  .then(res => {
    docID = res[0]
    console.log('Document ID: ' + docID)
    console.log('Upload the document content')
    let bufferData = fs.readFileSync('./test.js')
    bufferData = bufferData.buffer.slice(bufferData.byteOffset, bufferData.byteOffset + bufferData.byteLength)
    return api.setDocumentContent({ ID: res[0], content: bufferData })
  })
  .then(res => {
    console.log('done')
    console.log('Get the document information')
    return api.getDocumentInfo({ ID: docID })
  })
  .then(res => {
    console.log(JSON.stringify(res, null, ' '))
    console.log('Get the document content')
    return api.getDocument({ ID: docID, resultType: 'FULL' })
  })
  .then(res => {
    console.log('Save response to result.zip')
    fs.writeFileSync('result.zip', Buffer.from(res), {encoding: 'binary'})
  })
.catch(err => console.log(err))
