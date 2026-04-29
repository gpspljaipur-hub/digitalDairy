import validation from './validation.js'

export default function validate(fieldName, value, value2 = null) {
 let resp = ''
 function getMessage(m) {
  return typeof m === 'function' ? m() : m
 }
 if (validation.hasOwnProperty(fieldName)) {
  let v = validation[fieldName]
  if (value == '' || value == null) {
   resp = getMessage(v['presence']['message'])
  } else if (v.hasOwnProperty('format') && !v['format']['pattern'].test(value)) {
   resp = getMessage(v['format']['message'])
  } else if (v.hasOwnProperty('length')) {
   let l = v['length']
   if (l.hasOwnProperty('minimum') && value.length < l['minimum']) {
    resp = getMessage(l['message'])
   } else if (l.hasOwnProperty('maximum') && value.length > l['maximum']) {
    resp = getMessage(l['message'])
   } else {
    if (v.hasOwnProperty('match')) {
     let l = v['match']
     if (value != value2) {
      resp = getMessage(l['message'])
     } else {
     }
    } else {
    }
   }
  } else {
   resp = ''
  }
 } else {
  resp = ''
 }

 return resp
}
