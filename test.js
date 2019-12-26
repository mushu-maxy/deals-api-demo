/*
* Created by xmax on 27.04.2018
*/
console.log('Deals API test - start')
const {DealsAPI} = require('@unitybase/deals-api')
const fs = require('fs')
const dealsUrl = process.env.deals_url || 'https://deals-demo.dealssign.com'
const user = process.env.user || 'admin'
const pass = process.env.pass || 'admin'
const signer = process.env.signer
const signer2 = process.env.signer2
const signers = signer || (signer2 ? [signer, signer2] : [])
const approver = process.env.approver
const approver2 = process.env.approver2
const approvers = approver || (approver2 ? [approver, approver2] : [])
const orgCode = process.env.org_code || '00000000'
const orgCodeForInvite = process.env.org_code_for_invite
const dataFile = process.env.data_file
const signature = process.env.signature
const signature2 = process.env.signature2
const onlyAuthor = process.env.onlyAuthor === 'true'
const payForPartnerDeal = process.env.payForPartnerDeal === 'true'
const payForPartnerDoc = process.env.payForPartnerDoc === 'true'
const publicGroup = process.env.publicGroup
const moderator = process.env.moderator
const accessUser = process.env.accessUser
const accessGroup = process.env.accessGroup
const accessGroupFull = process.env.accessGroupFull
const accessType = (accessUser || accessGroup || accessGroupFull) ? 'LIMITED': 'GENERAL'


console.log('Deals URL:' + dealsUrl)
console.log('User:' + user)
console.log('Password:' + pass)
console.log('Organization code:' + orgCode)

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0

const api = new DealsAPI({dealsUrl: dealsUrl, login: user, password: pass})
let dateFom = new Date()
dateFom.setFullYear(dateFom.getFullYear() - 1)
let docID
let dealID

console.log('Get organization ID')
api.getOrganization({code: orgCode, confirmed: true}).then(res => {
  console.log('Organization ID:' + res.ID)
  console.log('Get your deals list')
  return api.getDealsList({orgID: res.ID, dateFrom: dateFom, dateTo: new Date(), appendArchive: true})
})
  .then(res => {
    console.log('Deals list:')
    console.log(JSON.stringify(res, null, ' '))
    console.log('Add new deal')
    return api.addNewDeal({
      name: 'deal for test' + (new Date()).getTime(),
      description: (new Date()).toLocaleString(),
      onlyAuthor: onlyAuthor,
      payForPartner: payForPartnerDeal,
      publicGroup: publicGroup,
      moderator: moderator,
      accessUser: accessUser,
      accessGroup: accessGroup,
      accessGroupFull: accessGroupFull,
      accessType: accessType
    })
  })
  .then(res => {
    console.log('Deal ID: ' + res.ID)
    dealID = res.ID
    console.log('Add new document')
    return api.addDocument({
      dealID: res.ID,
      document: {
        name: 'test.pdf',
        docType: 'ONE_SIDE_SIGNING',
        requireConfirm: false,
        notifyWhenComplete: true,
        payForPartner: payForPartnerDoc,
        signers: signers,
        approvers: approvers
      }
    })
  })
  .then(res => {
    console.log(res)
    docID = res[0]
    console.log('Document ID: ' + docID)
    console.log('Upload the document content')
    let bufferData = fs.readFileSync(dataFile)
    bufferData = bufferData.buffer.slice(bufferData.byteOffset, bufferData.byteOffset + bufferData.byteLength)
    return api.setDocumentContent({ ID: res[0], content: bufferData })
  })
  .then(res => {
    return
    if (!signature) return
    console.log('Upload the 1 signature content')
    let bufferData = fs.readFileSync(signature)
    bufferData = bufferData.buffer.slice(bufferData.byteOffset, bufferData.byteOffset + bufferData.byteLength)
    console.log({ ID: docID, signature: bufferData, user: signer })
    return api.addDocumentSignature({ ID: docID, user: signer, signature: bufferData })
  })
  .then(res => {
    return
    if (!signature2) return
    console.log('Upload the 2 signature content')
    let bufferData = fs.readFileSync(signature2)
    bufferData = bufferData.buffer.slice(bufferData.byteOffset, bufferData.byteOffset + bufferData.byteLength)
    console.log({ ID: docID, signature: bufferData, user: signer2 })
    return api.addDocumentSignature({ ID: docID, user: signer2, signature: bufferData })
  })
  .then(res => {
    console.log('done')
    console.log('Get the document information')
    return api.getDocumentInfo({ ID: docID })
  })
  .then(res => {
    console.log(JSON.stringify(res, null, ' '))
    console.log('Get the documents list')
    return api.getDealDocumentList({dealID: dealID})
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
  .then(res => {
    if (!orgCodeForInvite) return
    console.log('Invite partner to deal')
    return api.getOrganization({code: orgCodeForInvite})
  })
  .then(res => {
    if (!orgCodeForInvite) return
    console.log('Organization to invite ID:' + res.ID)
    return api.invitePartner({dealID: dealID, orgID: res.ID, invite: 'Let me invite you to organization'})
  })
  .then(res => {
    if (!orgCodeForInvite) return
    console.log('Invitation was sent')
  })
  .catch(err => console.log(err))
